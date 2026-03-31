import Anthropic from '@anthropic-ai/sdk';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { api, claude, paths, masterPalette } from '../config.js';
import type { Scene, CourseStyle } from '../types/pipeline.js';

// ─── System prompt for scene decomposition ──────────────────────────────────

const SYSTEM_PROMPT = `És um director de cinematografia especializado em conteúdo educacional transformacional. O teu trabalho é decompor scripts narrativos em cenas visuais para geração por IA de vídeo.

CONTEXTO VISUAL — O Mundo dos Véus:
- Céu: azul-marinho profundo (${masterPalette.background})
- Silhueta sem rosto: terracota (${masterPalette.silhouette}) com brilho dourado (${masterPalette.gold})
- Acentos: violeta (${masterPalette.accent})
- Texto: creme (${masterPalette.text})
- Luz: dourado quente (${masterPalette.warmLight})
- Estilo: artístico, atmosférico, luz quente, texturas orgânicas. Pensa em Terrence Malick + Hayao Miyazaki.
- NÃO é corporativo. NÃO é cartoon. NÃO é wellness/lotus.

REGRAS:
1. Cada cena deve ter entre 8-16 segundos de duração visual.
2. A personagem-guia é uma silhueta feminina sem rosto, pele morena, em terracota com brilho dourado. Mantém-na consistente.
3. Cada prompt visual deve incluir: sujeito, acção, ambiente, iluminação, ângulo de câmara, mood.
4. Para cenas sem personagem (conceitos abstractos), usa metáforas visuais poéticas (ex: "véu de seda flutuando ao vento dourado").
5. Agrupa o texto narrativo de forma que cada cena tenha 2-4 frases de narração (ritmo natural de fala ~150 palavras/minuto).
6. A primeira cena deve ser sempre uma abertura: o céu do Mundo dos Véus, câmara desce ao território, título aparece.
7. A última cena deve ser sempre um fecho: território dissolve-se no céu, frase final, fade para escuro.
8. Transições entre cenas: usa "dissolve" por defeito, "fade" para momentos de pausa, "cut" apenas para impacto.
9. Vocabulário corporal da silhueta: de pé (presença), curvada (peso/medo), sentada (reflexão), mãos no peito (auto-conexão), mãos abertas (recepção), a caminhar (avanço), de costas (contemplação), mão estendida (coragem).

Responde APENAS com JSON válido. Um array de objectos com esta estrutura exacta:
{
  "id": string,           // "{courseId}-m{XX}-s{YY}" (XX = módulo, YY = cena sequencial 01, 02...)
  "order": number,        // 1, 2, 3...
  "narration_text": string, // Texto exacto que será narrado (PT)
  "visual_prompt": string,  // Prompt cinematográfico em inglês para o gerador de vídeo
  "duration_seconds": number, // 8-16
  "character_refs": string[], // ["guia"] se a silhueta aparece, [] se não
  "mood": string,          // ex: "contemplativo", "intenso", "esperançoso", "solene"
  "camera": string,        // ex: "wide shot", "close-up", "slow pan right", "overhead"
  "transition": string     // "dissolve", "fade", "cut"
}`;

// ─── Build user prompt from lesson script sections ──────────────────────────

function buildUserPrompt(
  courseId: string,
  moduleNumber: number,
  subLetter: string,
  title: string,
  sections: {
    perguntaInicial: string;
    situacaoHumana: string;
    revelacaoPadrao: string;
    gestoConsciencia: string;
    fraseFinal: string;
  },
  style?: CourseStyle,
): string {
  const styleContext = style
    ? `\nEstilo do curso "${style.name}": Território — ${style.territory}. Mood — ${style.mood}. Palavras-chave visuais: ${style.visual_keywords.join(', ')}. Paleta: fundo ${style.palette.background}, primário ${style.palette.primary}, secundário ${style.palette.secondary}, acento ${style.palette.accent}.`
    : '';

  return `Curso: ${courseId}
Módulo: ${moduleNumber}, Sub-aula: ${subLetter}
Título: "${title}"
${styleContext}

ID base para as cenas: "${courseId}-m${String(moduleNumber).padStart(2, '0')}"

─── SCRIPT ───

[PERGUNTA INICIAL]
${sections.perguntaInicial}

[SITUAÇÃO HUMANA]
${sections.situacaoHumana}

[REVELAÇÃO DO PADRÃO]
${sections.revelacaoPadrao}

[GESTO DE CONSCIÊNCIA]
${sections.gestoConsciencia}

[FRASE FINAL]
${sections.fraseFinal}

─── FIM DO SCRIPT ───

Decompõe este script em cenas visuais cinematográficas. Inclui a abertura (céu → território → título) e o fecho (território → céu → frase final → logo). Responde apenas com o array JSON.`;
}

// ─── Load course style ──────────────────────────────────────────────────────

async function loadCourseStyle(courseId: string): Promise<CourseStyle | undefined> {
  const stylePath = resolve(paths.characters, 'styles', `${courseId}.json`);
  if (!existsSync(stylePath)) return undefined;
  const raw = await readFile(stylePath, 'utf-8');
  return JSON.parse(raw) as CourseStyle;
}

// ─── Parse and validate scenes ──────────────────────────────────────────────

function parseScenes(raw: string): Scene[] {
  // Extract JSON array from response (handle markdown code fences)
  let jsonStr = raw.trim();
  const fenceMatch = jsonStr.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch) {
    jsonStr = fenceMatch[1].trim();
  }

  const scenes = JSON.parse(jsonStr) as Scene[];

  if (!Array.isArray(scenes) || scenes.length === 0) {
    throw new Error('Decomposer returned empty or non-array result');
  }

  for (const scene of scenes) {
    if (!scene.id || !scene.narration_text || !scene.visual_prompt) {
      throw new Error(`Invalid scene: missing required fields in ${JSON.stringify(scene).slice(0, 100)}`);
    }
    if (scene.duration_seconds < 4 || scene.duration_seconds > 20) {
      scene.duration_seconds = Math.max(8, Math.min(16, scene.duration_seconds));
    }
  }

  // Ensure order is sequential
  scenes.sort((a, b) => a.order - b.order);
  scenes.forEach((s, i) => { s.order = i + 1; });

  return scenes;
}

// ─── Main decompose function ────────────────────────────────────────────────

export interface DecomposeInput {
  courseId: string;
  moduleNumber: number;
  subLetter: string;
  title: string;
  perguntaInicial: string;
  situacaoHumana: string;
  revelacaoPadrao: string;
  gestoConsciencia: string;
  fraseFinal: string;
}

export interface DecomposeResult {
  scenes: Scene[];
  inputTokens: number;
  outputTokens: number;
  cached: boolean;
}

export async function decomposeScript(input: DecomposeInput): Promise<DecomposeResult> {
  const cacheKey = `${input.courseId}-m${String(input.moduleNumber).padStart(2, '0')}${input.subLetter.toLowerCase()}`;
  const cachePath = resolve(paths.scenes, `${cacheKey}.json`);

  // Check cache
  if (existsSync(cachePath)) {
    const cached = JSON.parse(await readFile(cachePath, 'utf-8')) as Scene[];
    return { scenes: cached, inputTokens: 0, outputTokens: 0, cached: true };
  }

  // Load course style if available
  const style = await loadCourseStyle(input.courseId);

  // Build prompt
  const userPrompt = buildUserPrompt(
    input.courseId,
    input.moduleNumber,
    input.subLetter,
    input.title,
    {
      perguntaInicial: input.perguntaInicial,
      situacaoHumana: input.situacaoHumana,
      revelacaoPadrao: input.revelacaoPadrao,
      gestoConsciencia: input.gestoConsciencia,
      fraseFinal: input.fraseFinal,
    },
    style,
  );

  // Call Claude API
  const client = new Anthropic({ apiKey: api.anthropicKey });

  const response = await client.messages.create({
    model: claude.model,
    max_tokens: claude.maxTokens,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  // Extract text
  const textBlock = response.content.find(b => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  // Parse scenes
  const scenes = parseScenes(textBlock.text);

  // Cache result
  await mkdir(paths.scenes, { recursive: true });
  await writeFile(cachePath, JSON.stringify(scenes, null, 2), 'utf-8');

  return {
    scenes,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
    cached: false,
  };
}

// ─── Decompose from raw markdown text (for testing / generic scripts) ───────

export async function decomposeRawText(
  courseId: string,
  moduleId: string,
  text: string,
): Promise<DecomposeResult> {
  const cacheKey = `${courseId}-${moduleId}`;
  const cachePath = resolve(paths.scenes, `${cacheKey}.json`);

  if (existsSync(cachePath)) {
    const cached = JSON.parse(await readFile(cachePath, 'utf-8')) as Scene[];
    return { scenes: cached, inputTokens: 0, outputTokens: 0, cached: true };
  }

  const client = new Anthropic({ apiKey: api.anthropicKey });

  const response = await client.messages.create({
    model: claude.model,
    max_tokens: claude.maxTokens,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Curso: ${courseId}\nMódulo: ${moduleId}\nID base para as cenas: "${courseId}-${moduleId}"\n\n─── SCRIPT ───\n\n${text}\n\n─── FIM DO SCRIPT ───\n\nDecompõe este script em cenas visuais cinematográficas. Inclui abertura e fecho. Responde apenas com o array JSON.`,
    }],
  });

  const textBlock = response.content.find(b => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  const scenes = parseScenes(textBlock.text);

  await mkdir(paths.scenes, { recursive: true });
  await writeFile(cachePath, JSON.stringify(scenes, null, 2), 'utf-8');

  return {
    scenes,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
    cached: false,
  };
}

// ─── Estimate decomposition (dry run) ───────────────────────────────────────

export function estimateDecomposition(scriptText: string): {
  estimatedScenes: number;
  estimatedTokens: number;
} {
  const wordCount = scriptText.split(/\s+/).length;
  // ~150 words/minute speech rate, ~12s average per scene
  const estimatedDuration = (wordCount / 150) * 60; // seconds
  const estimatedScenes = Math.ceil(estimatedDuration / 12) + 2; // +2 for opening/closing
  // System prompt ~500 tokens + script ~wordCount tokens + output ~estimatedScenes*150 tokens
  const estimatedTokens = 500 + Math.ceil(wordCount * 1.3) + estimatedScenes * 150;

  return { estimatedScenes, estimatedTokens };
}
