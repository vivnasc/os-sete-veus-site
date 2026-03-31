#!/usr/bin/env node
import { readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { paths } from './config.js';
import { decomposeScript, estimateDecomposition } from './01-scene-decomposer/decomposer.js';
import { generateAllNarrations, estimateAudioCost } from './03-audio-generator/elevenlabs.js';
import { generateAllClips, estimateVisualCost } from './02-visual-generator/runway.js';
import { composeVideo, checkFfmpeg } from './04-compositor/ffmpeg.js';
import {
  loadState, saveState, createState, initScenes,
  updateScene, allScenesComplete, getIncompleteScenes,
  addCost, formatCostReport,
} from './05-state-manager/state.js';
import type { Scene, ProcessedScene, LessonScript } from './types/pipeline.js';

// ─── CLI argument parsing ───────────────────────────────────────────────────

function parseArgs(): {
  command: string;
  course?: string;
  module?: string;
  scene?: string;
  all?: boolean;
  dryRun?: boolean;
} {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const flags: Record<string, string> = {};

  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      if (args[i + 1] && !args[i + 1].startsWith('--')) {
        flags[key] = args[++i];
      } else {
        flags[key] = 'true';
      }
    }
  }

  return {
    command,
    course: flags.course,
    module: flags.module,
    scene: flags.scene,
    all: flags.all === 'true',
    dryRun: flags['dry-run'] === 'true',
  };
}

// ─── Load lesson scripts from the main project ─────────────────────────────

async function loadLessonScripts(courseId: string): Promise<Record<string, LessonScript>> {
  // Try to load from the main project's course-scripts directory
  const scriptPath = resolve(paths.root, '..', 'src', 'data', 'course-scripts', `${courseId}.ts`);

  if (!existsSync(scriptPath)) {
    throw new Error(`Course scripts not found: ${scriptPath}`);
  }

  // Dynamic import of TypeScript module via tsx
  const mod = await import(scriptPath);

  // Convention: export name is COURSE_SLUG_SCRIPTS in UPPER_SNAKE_CASE
  const exportName = Object.keys(mod).find(k => k.endsWith('_SCRIPTS'));
  if (!exportName) {
    throw new Error(`No *_SCRIPTS export found in ${scriptPath}`);
  }

  return mod[exportName] as Record<string, LessonScript>;
}

// ─── Get scripts for a specific module ──────────────────────────────────────

function getModuleScripts(
  allScripts: Record<string, LessonScript>,
  moduleNumber: number,
): LessonScript[] {
  return Object.values(allScripts)
    .filter(s => s.moduleNumber === moduleNumber)
    .sort((a, b) => a.subLetter.localeCompare(b.subLetter));
}

// ─── Log helper ─────────────────────────────────────────────────────────────

function log(msg: string): void {
  console.log(`[pipeline] ${msg}`);
}

function logStep(step: string, detail: string): void {
  console.log(`  ├─ ${step}: ${detail}`);
}

// ─── GENERATE command ───────────────────────────────────────────────────────

async function cmdGenerate(course: string, moduleStr: string | undefined, all: boolean, dryRun: boolean): Promise<void> {
  const scripts = await loadLessonScripts(course);
  const moduleNumbers = all
    ? [...new Set(Object.values(scripts).map(s => s.moduleNumber))].sort()
    : moduleStr
      ? [parseInt(moduleStr, 10)]
      : (() => { throw new Error('Specify --module XX or --all'); })();

  for (const modNum of moduleNumbers) {
    const moduleId = `m${String(modNum).padStart(2, '0')}`;
    log(`\n═══ ${course} / ${moduleId} ═══`);

    const lessons = getModuleScripts(scripts, modNum);
    if (lessons.length === 0) {
      log(`No scripts found for module ${modNum}. Skipping.`);
      continue;
    }

    // ─── Load or create state ─────────────────────────────────────────
    let state = await loadState(course, moduleId) || createState(course, moduleId);

    // ─── Step 1: Decompose each sub-lesson into scenes ────────────────
    state.status = 'decomposing';
    await saveState(state);
    log('Step 1/4: Decomposing scripts into scenes...');

    const allScenes: Scene[] = [];

    for (const lesson of lessons) {
      const subKey = `${moduleId}${lesson.subLetter.toLowerCase()}`;

      if (dryRun) {
        const fullText = [lesson.perguntaInicial, lesson.situacaoHumana, lesson.revelacaoPadrao, lesson.gestoConsciencia, lesson.fraseFinal].join(' ');
        const est = estimateDecomposition(fullText);
        logStep(subKey, `~${est.estimatedScenes} scenes, ~${est.estimatedTokens} tokens`);
        continue;
      }

      const result = await decomposeScript({
        courseId: course,
        moduleNumber: modNum,
        subLetter: lesson.subLetter,
        title: lesson.title,
        perguntaInicial: lesson.perguntaInicial,
        situacaoHumana: lesson.situacaoHumana,
        revelacaoPadrao: lesson.revelacaoPadrao,
        gestoConsciencia: lesson.gestoConsciencia,
        fraseFinal: lesson.fraseFinal,
      });

      logStep(subKey, `${result.scenes.length} scenes${result.cached ? ' (cached)' : `, ${result.inputTokens + result.outputTokens} tokens`}`);
      allScenes.push(...result.scenes);

      if (!result.cached) {
        addCost(state, 'claude_tokens', result.inputTokens + result.outputTokens);
      }
    }

    if (dryRun) {
      const fullText = lessons.map(l => [l.perguntaInicial, l.situacaoHumana, l.revelacaoPadrao, l.gestoConsciencia, l.fraseFinal].join(' ')).join(' ');
      const est = estimateDecomposition(fullText);
      const mockScenes = Array.from({ length: est.estimatedScenes }, (_, i) => ({
        duration_seconds: 12,
        narration_text: 'x'.repeat(200),
      })) as Scene[];
      const audioCost = estimateAudioCost(mockScenes);
      const visualCost = estimateVisualCost(mockScenes);

      log(`\nDry run estimate for ${course}/${moduleId}:`);
      log(`  Scenes:    ~${est.estimatedScenes}`);
      log(`  Claude:    ~${est.estimatedTokens} tokens → ~$${((est.estimatedTokens / 1000) * 0.015).toFixed(2)}`);
      log(`  ElevenLabs: ~${audioCost.totalChars} chars → ~$${audioCost.estimatedCost.toFixed(2)}`);
      log(`  Runway:    ~${visualCost.totalCredits} credits → ~$${visualCost.estimatedCost.toFixed(2)}`);
      log(`  TOTAL:     ~$${(((est.estimatedTokens / 1000) * 0.015) + audioCost.estimatedCost + visualCost.estimatedCost).toFixed(2)}`);
      continue;
    }

    if (allScenes.length === 0) {
      log('No scenes generated. Skipping.');
      continue;
    }

    initScenes(state, allScenes);
    await saveState(state);

    // ─── Step 2: Generate audio (FIRST — duration determines clip length)
    state.status = 'generating_audio';
    await saveState(state);
    log(`Step 2/4: Generating narration (${allScenes.length} scenes)...`);

    const audioResults = await generateAllNarrations(allScenes, (id, status, detail) => {
      logStep(id, `audio ${status}${detail ? ` — ${detail}` : ''}`);
    });

    for (const [sceneId, segment] of audioResults) {
      updateScene(state, sceneId, {
        audio_generated: true,
        audio_path: segment.path,
        audio_duration: segment.duration,
      });
      addCost(state, 'elevenlabs_characters',
        allScenes.find(s => s.id === sceneId)!.narration_text.length);
    }
    await saveState(state);

    // ─── Step 3: Generate visual clips ────────────────────────────────
    state.status = 'generating_visuals';
    await saveState(state);
    log(`Step 3/4: Generating visual clips (${allScenes.length} scenes, max ${3} concurrent)...`);

    const audioDurations = new Map<string, number>();
    for (const [id, seg] of audioResults) {
      audioDurations.set(id, seg.duration);
    }

    const clipResults = await generateAllClips(allScenes, audioDurations, (id, status, detail) => {
      logStep(id, `visual ${status}${detail ? ` — ${detail}` : ''}`);
    });

    for (const [sceneId, clip] of clipResults) {
      updateScene(state, sceneId, {
        clip_generated: true,
        clip_path: clip.path,
      });
      addCost(state, 'runway_credits', clip.creditsUsed);
    }
    await saveState(state);

    // ─── Step 4: Compose final video ──────────────────────────────────
    if (!allScenesComplete(state)) {
      const incomplete = getIncompleteScenes(state);
      log(`Cannot compose: ${incomplete.length} scenes incomplete: ${incomplete.join(', ')}`);
      state.status = 'error';
      await saveState(state);
      continue;
    }

    state.status = 'composing';
    await saveState(state);

    const hasFfmpeg = await checkFfmpeg();
    if (!hasFfmpeg) {
      log('ffmpeg not found. Skipping composition. Install ffmpeg to compose videos.');
      state.status = 'error';
      await saveState(state);
      continue;
    }

    log('Step 4/4: Composing final video...');

    const processedScenes: ProcessedScene[] = allScenes.map(scene => {
      const ss = state.scenes[scene.id];
      const audio = audioResults.get(scene.id)!;
      return {
        ...scene,
        clipPath: ss.clip_path!,
        audioPath: ss.audio_path!,
        audioDuration: audio.duration,
      };
    });

    const outputPath = await composeVideo(course, moduleId, processedScenes);

    state.status = 'done';
    state.output_path = outputPath;
    await saveState(state);

    log(`\nDone! Output: ${outputPath}`);
    log(formatCostReport(state));
  }
}

// ─── STATUS command ─────────────────────────────────────────────────────────

async function cmdStatus(course: string): Promise<void> {
  const stateDir = paths.state;
  if (!existsSync(stateDir)) {
    log('No pipeline state found.');
    return;
  }

  const files = await readdir(stateDir);
  const courseFiles = files.filter(f => f.startsWith(course) && f.endsWith('.json'));

  if (courseFiles.length === 0) {
    log(`No state found for course: ${course}`);
    return;
  }

  for (const file of courseFiles.sort()) {
    const raw = await readFile(resolve(stateDir, file), 'utf-8');
    const state = JSON.parse(raw) as import('./types/pipeline.js').PipelineState;
    const total = state.sceneOrder.length;
    const complete = state.sceneOrder.filter(id => {
      const s = state.scenes[id];
      return s?.clip_generated && s?.audio_generated;
    }).length;

    console.log(`\n${state.courseId}/${state.moduleId}: ${state.status} (${complete}/${total} scenes)`);
    if (state.output_path) console.log(`  Output: ${state.output_path}`);
    console.log(`  Updated: ${state.updated_at}`);
  }
}

// ─── ESTIMATE command ───────────────────────────────────────────────────────

async function cmdEstimate(course: string): Promise<void> {
  return cmdGenerate(course, undefined, true, true);
}

// ─── HELP ───────────────────────────────────────────────────────────────────

function cmdHelp(): void {
  console.log(`
Video Pipeline — Escola dos Véus

Usage:
  npx tsx src/index.ts <command> [options]

Commands:
  generate    Generate video for a module
  status      Show pipeline status
  estimate    Estimate costs for a course
  help        Show this help

Generate options:
  --course <id>     Course slug (e.g. ouro-proprio)
  --module <num>    Module number (e.g. 01)
  --all             Process all modules
  --dry-run         Show plan without spending credits

Examples:
  npx tsx src/index.ts generate --course ouro-proprio --module 01
  npx tsx src/index.ts generate --course ouro-proprio --module 01 --dry-run
  npx tsx src/index.ts generate --course ouro-proprio --all
  npx tsx src/index.ts status --course ouro-proprio
  npx tsx src/index.ts estimate --course ouro-proprio
`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = parseArgs();

  switch (args.command) {
    case 'generate':
      if (!args.course) { console.error('Missing --course'); process.exit(1); }
      await cmdGenerate(args.course, args.module, !!args.all, !!args.dryRun);
      break;

    case 'status':
      if (!args.course) { console.error('Missing --course'); process.exit(1); }
      await cmdStatus(args.course);
      break;

    case 'estimate':
      if (!args.course) { console.error('Missing --course'); process.exit(1); }
      await cmdEstimate(args.course);
      break;

    case 'help':
    default:
      cmdHelp();
  }
}

main().catch(err => {
  console.error('\n[pipeline] Fatal error:', err.message);
  process.exit(1);
});
