import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { composition, paths } from '../config.js';
import type { ProcessedScene } from '../types/pipeline.js';

const execAsync = promisify(exec);

// ─── Check ffmpeg availability ──────────────────────────────────────────────

export async function checkFfmpeg(): Promise<boolean> {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch {
    return false;
  }
}

// ─── Build FFmpeg filter for crossfade transitions ──────────────────────────

function buildTransitionFilter(scenes: ProcessedScene[]): string {
  if (scenes.length <= 1) return '';

  const crossfadeDuration = 0.5; // seconds
  const filters: string[] = [];

  // First, set up the xfade chain
  // [0:v][1:v]xfade=transition=fade:duration=0.5:offset=T1[v01];
  // [v01][2:v]xfade=transition=fade:duration=0.5:offset=T2[v012]; ...

  let currentOffset = scenes[0].audioDuration - crossfadeDuration;
  let prevLabel = '0:v';

  for (let i = 1; i < scenes.length; i++) {
    const transition = scenes[i].transition === 'cut' ? 'fade' : scenes[i].transition || 'fade';
    const outLabel = i === scenes.length - 1 ? 'vout' : `v${i}`;
    filters.push(
      `[${prevLabel}][${i}:v]xfade=transition=${transition}:duration=${crossfadeDuration}:offset=${currentOffset.toFixed(2)}[${outLabel}]`
    );
    prevLabel = outLabel;
    currentOffset += scenes[i].audioDuration - crossfadeDuration;
  }

  return filters.join(';\n');
}

// ─── Compose final video from clips + audio ─────────────────────────────────

export async function composeVideo(
  courseId: string,
  moduleId: string,
  scenes: ProcessedScene[],
  backgroundMusicPath?: string,
): Promise<string> {
  const outputDir = resolve(paths.output, courseId);
  await mkdir(outputDir, { recursive: true });
  const outputPath = resolve(outputDir, `${moduleId}.mp4`);

  if (scenes.length === 0) {
    throw new Error('No scenes to compose');
  }

  // ─── Strategy: concat clips, then merge with concatenated audio ─────────

  // 1. Build concat file for simple approach (no transitions)
  //    For transition support, use complex filter graph
  const useTransitions = scenes.length > 1;

  if (!useTransitions) {
    // Single scene — simple merge
    const scene = scenes[0];
    const cmd = [
      'ffmpeg -y',
      `-i "${scene.clipPath}"`,
      `-i "${scene.audioPath}"`,
      '-c:v', composition.codec,
      '-crf', String(composition.crf),
      '-preset', composition.preset,
      '-c:a', composition.audio_codec,
      '-b:a', composition.audio_bitrate,
      '-shortest',
      `"${outputPath}"`,
    ].join(' ');

    await execAsync(cmd, { timeout: 120000 });
    return outputPath;
  }

  // 2. Multi-scene: concat all audio first, then overlay on concat'd video

  // Step A: Concat audio files
  const audioListPath = resolve(paths.cache, `concat-audio-${courseId}-${moduleId}.txt`);
  const audioList = scenes.map(s => `file '${s.audioPath}'`).join('\n');
  await writeFile(audioListPath, audioList, 'utf-8');

  const mergedAudioPath = resolve(paths.cache, `merged-audio-${courseId}-${moduleId}.mp3`);
  await execAsync(
    `ffmpeg -y -f concat -safe 0 -i "${audioListPath}" -c copy "${mergedAudioPath}"`,
    { timeout: 120000 },
  );

  // Step B: Concat video clips with crossfade transitions
  const transitionFilter = buildTransitionFilter(scenes);

  if (transitionFilter) {
    // Complex filter graph with xfade
    const inputs = scenes.map(s => `-i "${s.clipPath}"`).join(' ');
    const cmd = [
      `ffmpeg -y`,
      inputs,
      `-i "${mergedAudioPath}"`,
      `-filter_complex "${transitionFilter}"`,
      `-map "[vout]"`,
      `-map ${scenes.length}:a`,
      `-c:v ${composition.codec}`,
      `-crf ${composition.crf}`,
      `-preset ${composition.preset}`,
      `-c:a ${composition.audio_codec}`,
      `-b:a ${composition.audio_bitrate}`,
      `-r ${composition.fps}`,
      `-shortest`,
      `"${outputPath}"`,
    ].join(' ');

    await execAsync(cmd, { timeout: 600000 });
  } else {
    // Simple concat without transitions
    const videoListPath = resolve(paths.cache, `concat-video-${courseId}-${moduleId}.txt`);
    const videoList = scenes.map(s => `file '${s.clipPath}'`).join('\n');
    await writeFile(videoListPath, videoList, 'utf-8');

    const mergedVideoPath = resolve(paths.cache, `merged-video-${courseId}-${moduleId}.mp4`);
    await execAsync(
      `ffmpeg -y -f concat -safe 0 -i "${videoListPath}" -c copy "${mergedVideoPath}"`,
      { timeout: 300000 },
    );

    // Merge video + audio
    const cmd = [
      `ffmpeg -y`,
      `-i "${mergedVideoPath}"`,
      `-i "${mergedAudioPath}"`,
      `-c:v ${composition.codec}`,
      `-crf ${composition.crf}`,
      `-preset ${composition.preset}`,
      `-c:a ${composition.audio_codec}`,
      `-b:a ${composition.audio_bitrate}`,
      `-shortest`,
      `"${outputPath}"`,
    ].join(' ');

    await execAsync(cmd, { timeout: 300000 });
  }

  // Step C: Mix in background music if provided
  if (backgroundMusicPath && existsSync(backgroundMusicPath)) {
    const withMusicPath = resolve(outputDir, `${moduleId}-with-music.mp4`);
    // Background music at -20dB below narration
    const cmd = [
      `ffmpeg -y`,
      `-i "${outputPath}"`,
      `-i "${backgroundMusicPath}"`,
      `-filter_complex "[1:a]volume=0.1[bg];[0:a][bg]amix=inputs=2:duration=shortest[aout]"`,
      `-map 0:v -map "[aout]"`,
      `-c:v copy`,
      `-c:a ${composition.audio_codec}`,
      `-b:a ${composition.audio_bitrate}`,
      `"${withMusicPath}"`,
    ].join(' ');

    await execAsync(cmd, { timeout: 300000 });

    // Replace original with music version
    const { rename } = await import('fs/promises');
    await rename(withMusicPath, outputPath);
  }

  return outputPath;
}
