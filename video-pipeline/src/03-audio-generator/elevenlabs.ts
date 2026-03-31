import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { ElevenLabsClient } from 'elevenlabs';
import { api, elevenlabs as elevenConfig, paths, pipeline as pipelineConfig } from '../config.js';
import type { Scene, AudioSegment } from '../types/pipeline.js';

const execFileAsync = promisify(execFile);

// ─── Get audio duration via ffprobe ─────────────────────────────────────────

async function getAudioDuration(filePath: string): Promise<number> {
  try {
    const { stdout } = await execFileAsync('ffprobe', [
      '-v', 'quiet',
      '-show_entries', 'format=duration',
      '-of', 'csv=p=0',
      filePath,
    ]);
    return parseFloat(stdout.trim());
  } catch {
    // Fallback: estimate from text length (~150 words/min, ~5 chars/word)
    return 10;
  }
}

// ─── Generate narration for a single scene ──────────────────────────────────

export async function generateNarration(scene: Scene): Promise<AudioSegment> {
  const audioPath = resolve(paths.audio, `${scene.id}.mp3`);

  // Check cache
  if (existsSync(audioPath)) {
    const duration = await getAudioDuration(audioPath);
    return { path: audioPath, duration };
  }

  await mkdir(paths.audio, { recursive: true });

  const client = new ElevenLabsClient({ apiKey: api.elevenlabsKey });

  const audioStream = await client.textToSpeech.convert(api.elevenlabsVoiceId, {
    text: scene.narration_text,
    model_id: elevenConfig.model,
    voice_settings: {
      stability: elevenConfig.stability,
      similarity_boost: elevenConfig.similarityBoost,
      style: elevenConfig.style,
    },
  });

  // Collect stream chunks into buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk));
  }
  const buffer = Buffer.concat(chunks);

  await writeFile(audioPath, buffer);

  const duration = await getAudioDuration(audioPath);

  return { path: audioPath, duration };
}

// ─── Generate narration for all scenes with retry ───────────────────────────

export async function generateAllNarrations(
  scenes: Scene[],
  onProgress?: (sceneId: string, status: 'start' | 'done' | 'error', detail?: string) => void,
): Promise<Map<string, AudioSegment>> {
  const results = new Map<string, AudioSegment>();

  for (const scene of scenes) {
    onProgress?.(scene.id, 'start');
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= pipelineConfig.maxRetries; attempt++) {
      try {
        const segment = await generateNarration(scene);
        results.set(scene.id, segment);
        onProgress?.(scene.id, 'done', `${segment.duration.toFixed(1)}s`);
        lastError = null;
        break;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (attempt < pipelineConfig.maxRetries) {
          const delay = pipelineConfig.retryBaseDelay * Math.pow(2, attempt - 1);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }

    if (lastError) {
      onProgress?.(scene.id, 'error', lastError.message);
      throw new Error(`Failed to generate audio for ${scene.id} after ${pipelineConfig.maxRetries} attempts: ${lastError.message}`);
    }
  }

  return results;
}

// ─── Estimate audio cost ────────────────────────────────────────────────────

export function estimateAudioCost(scenes: Scene[]): { totalChars: number; estimatedCost: number } {
  const totalChars = scenes.reduce((sum, s) => sum + s.narration_text.length, 0);
  const estimatedCost = (totalChars / 1000) * 0.30;
  return { totalChars, estimatedCost };
}
