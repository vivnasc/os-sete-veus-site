/**
 * Gerar Reflexões Narradas — uma por capítulo
 *
 * Uso:
 *   ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-reflexoes.ts
 *
 * Output: scripts/output/reflexoes/<livro>/cap-<n>-reflexao.mp3
 *
 * Cada ficheiro é a pergunta de reflexão do capítulo lida pela tua voz.
 * Ideal para pôr no final do capítulo áudio, ou como clip standalone.
 */

import * as fs from "fs";
import * as path from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY || "";
const VOICE_ID = process.env.VOICE_ID || "";
const PAUSE_MS = 1500;

if (!API_KEY || !VOICE_ID) {
  console.error(
    "Uso: ELEVENLABS_API_KEY=sk_... VOICE_ID=... npx tsx scripts/gerar-reflexoes.ts"
  );
  process.exit(1);
}

import { chapters as ilusaoChapters } from "../src/data/ebook";
import { chapters as medoChapters } from "../src/data/espelho-medo";
import { chapters as culpaChapters } from "../src/data/espelho-culpa";
import { chapters as identidadeChapters } from "../src/data/espelho-identidade";
import { chapters as controloChapters } from "../src/data/espelho-controlo";
import { chapters as desejoChapters } from "../src/data/espelho-desejo";
import { chapters as separacaoChapters } from "../src/data/espelho-separacao";
import { chapters as herancaChapters } from "../src/data/no-heranca";
import { chapters as silencioChapters } from "../src/data/no-silencio";
import { chapters as sacrificioChapters } from "../src/data/no-sacrificio";
import { chapters as vergonhaChapters } from "../src/data/no-vergonha";
import { chapters as solidaoChapters } from "../src/data/no-solidao";
import { chapters as vazioChapters } from "../src/data/no-vazio";
import { chapters as pertencaChapters } from "../src/data/no-pertenca";

const LIVROS = [
  { slug: "espelho-ilusao",     chapters: ilusaoChapters },
  { slug: "espelho-medo",       chapters: medoChapters },
  { slug: "espelho-culpa",      chapters: culpaChapters },
  { slug: "espelho-identidade", chapters: identidadeChapters },
  { slug: "espelho-controlo",   chapters: controloChapters },
  { slug: "espelho-desejo",     chapters: desejoChapters },
  { slug: "espelho-separacao",  chapters: separacaoChapters },
  { slug: "no-heranca",         chapters: herancaChapters },
  { slug: "no-silencio",        chapters: silencioChapters },
  { slug: "no-sacrificio",      chapters: sacrificioChapters },
  { slug: "no-vergonha",        chapters: vergonhaChapters },
  { slug: "no-solidao",         chapters: solidaoChapters },
  { slug: "no-vazio",           chapters: vazioChapters },
  { slug: "no-pertenca",        chapters: pertencaChapters },
];

// O texto narrado inclui uma pausa introdutória + a pergunta
function textoReflexao(prompt: string, journalQuestion: string): string {
  return `${prompt}\n\n${journalQuestion}`;
}

async function gerarAudio(texto: string): Promise<Buffer> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: texto,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.1, // mais calmo, mais contemplativo
        },
      }),
    }
  );

  if (!res.ok) {
    const erro = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${erro}`);
  }

  return Buffer.from(await res.arrayBuffer());
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  let gerados = 0;
  let saltados = 0;

  for (const livro of LIVROS) {
    const dir = path.join("scripts/output/reflexoes", livro.slug);
    fs.mkdirSync(dir, { recursive: true });

    console.log(`\n── ${livro.slug} ──`);

    for (const cap of livro.chapters) {
      const ficheiro = path.join(dir, `cap-${cap.number}-reflexao.mp3`);

      if (fs.existsSync(ficheiro)) {
        console.log(`  [ok] cap-${cap.number} — já existe`);
        saltados++;
        continue;
      }

      const texto = textoReflexao(
        cap.reflection.prompt,
        cap.reflection.journalQuestion
      );

      process.stdout.write(`  cap-${cap.number} (${texto.length} chars)... `);

      try {
        const audio = await gerarAudio(texto);
        fs.writeFileSync(ficheiro, audio);
        console.log(`✓`);
        gerados++;
        await sleep(PAUSE_MS);
      } catch (err) {
        console.error(`✗ ${(err as Error).message}`);
      }
    }
  }

  console.log(
    `\nConcluído. ${gerados} gerados, ${saltados} saltados.`
  );
  console.log(`Ficheiros em: scripts/output/reflexoes/`);
}

main().catch(console.error);
