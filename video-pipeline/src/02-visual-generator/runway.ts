import RunwayML from '@runwayml/sdk';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { api, runway as runwayConfig, paths, pipeline as pipelineConfig } from '../config.js';
import type { Scene } from '../types/pipeline.js';

// ─── Character reference management ────────────────────────────────────────

function loadCharacterRef(): string | null {
  const refPath = resolve(paths.characters, 'guia-feminina.png');
  if (!existsSync(refPath)) return null;
  const buffer = readFileSync(refPath);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

// ─── Generate a single visual clip ──────────────────────────────────────────

export interface ClipResult {
  path: string;
  duration: number;
  creditsUsed: number;
}

export async function generateClip(
  scene: Scene,
  targetDuration?: number,
): Promise<ClipResult> {
  const clipPath = resolve(paths.clips, `${scene.id}.mp4`);

  // Check cache
  if (existsSync(clipPath)) {
    return {
      path: clipPath,
      duration: targetDuration || scene.duration_seconds,
      creditsUsed: 0,
    };
  }

  await mkdir(paths.clips, { recursive: true });

  const client = new RunwayML({ apiKey: api.runwayKey });

  const duration = Math.min(
    targetDuration || scene.duration_seconds,
    runwayConfig.maxClipDuration,
  );

  // Build generation params
  const params: {
    model: string;
    promptText: string;
    duration: number;
    ratio: string;
    referenceImage?: string;
  } = {
    model: runwayConfig.model,
    promptText: scene.visual_prompt,
    duration,
    ratio: runwayConfig.aspectRatio,
  };

  // Add character reference if available and scene uses guide character
  if (scene.character_refs.includes('guia')) {
    const charRef = loadCharacterRef();
    if (charRef) {
      params.referenceImage = charRef;
    }
  }

  // Create generation task
  // Note: actual API shape may vary — adapt to @runwayml/sdk docs
  const task = await (client as any).textToVideo.create(params);

  // Poll for completion
  let result = task;
  while (result.status === 'PROCESSING' || result.status === 'PENDING') {
    await new Promise(r => setTimeout(r, pipelineConfig.pollingInterval));
    result = await (client as any).tasks.retrieve(result.id);
  }

  if (result.status === 'FAILED') {
    throw new Error(`Runway generation failed for ${scene.id}: ${result.error || 'unknown error'}`);
  }

  // Download the output
  const outputUrl = result.output?.[0] || result.outputUrl;
  if (!outputUrl) {
    throw new Error(`No output URL from Runway for ${scene.id}`);
  }

  const response = await fetch(outputUrl);
  if (!response.ok) {
    throw new Error(`Failed to download clip for ${scene.id}: ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(clipPath, buffer);

  const creditsUsed = duration * runwayConfig.creditsPerSecond;

  return { path: clipPath, duration, creditsUsed };
}

// ─── Generate clips for all scenes with concurrency control ─────────────────

export async function generateAllClips(
  scenes: Scene[],
  audioDurations: Map<string, number>,
  onProgress?: (sceneId: string, status: 'start' | 'done' | 'error', detail?: string) => void,
): Promise<Map<string, ClipResult>> {
  const results = new Map<string, ClipResult>();
  const queue = [...scenes];
  const active = new Set<string>();

  async function processScene(scene: Scene): Promise<void> {
    active.add(scene.id);
    onProgress?.(scene.id, 'start');

    const targetDuration = audioDurations.get(scene.id) || scene.duration_seconds;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= pipelineConfig.maxRetries; attempt++) {
      try {
        const clip = await generateClip(scene, targetDuration);
        results.set(scene.id, clip);
        onProgress?.(scene.id, 'done', `${clip.duration}s, ${clip.creditsUsed} credits`);
        lastError = null;
        break;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        onProgress?.(scene.id, 'error', `attempt ${attempt}: ${lastError.message}`);
        if (attempt < pipelineConfig.maxRetries) {
          const delay = pipelineConfig.retryBaseDelay * Math.pow(2, attempt - 1);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }

    if (lastError) {
      throw new Error(`Failed to generate clip for ${scene.id}: ${lastError.message}`);
    }

    active.delete(scene.id);
  }

  // Process with max concurrency
  const executing: Promise<void>[] = [];

  while (queue.length > 0 || executing.length > 0) {
    while (queue.length > 0 && active.size < runwayConfig.maxConcurrent) {
      const scene = queue.shift()!;
      const p = processScene(scene).then(
        () => { executing.splice(executing.indexOf(p), 1); },
        (err) => { executing.splice(executing.indexOf(p), 1); throw err; },
      );
      executing.push(p);
    }

    if (executing.length > 0) {
      await Promise.race(executing);
    }
  }

  return results;
}

// ─── Estimate visual generation cost ────────────────────────────────────────

export function estimateVisualCost(scenes: Scene[]): {
  totalSeconds: number;
  totalCredits: number;
  estimatedCost: number;
} {
  const totalSeconds = scenes.reduce((sum, s) => sum + Math.min(s.duration_seconds, runwayConfig.maxClipDuration), 0);
  const totalCredits = totalSeconds * runwayConfig.creditsPerSecond;
  const estimatedCost = totalCredits * 0.01 * 1.5; // ×1.5 for retries buffer
  return { totalSeconds, totalCredits, estimatedCost };
}
