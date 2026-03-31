import { resolve } from 'path';
import { config as loadEnv } from 'dotenv';
import type { CompositionSettings } from './types/pipeline.js';

loadEnv({ path: resolve(import.meta.dirname, '..', '.env') });

function required(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

function optional(name: string, fallback: string): string {
  return process.env[name] || fallback;
}

// ─── API Keys (lazy — only fail when actually used) ─────────────────────────

export const api = {
  get anthropicKey() { return required('ANTHROPIC_API_KEY'); },
  get runwayKey() { return required('RUNWAY_API_KEY'); },
  get elevenlabsKey() { return required('ELEVENLABS_API_KEY'); },
  get elevenlabsVoiceId() { return required('ELEVENLABS_VOICE_ID'); },
};

// ─── Runway config ──────────────────────────────────────────────────────────

export const runway = {
  model: optional('RUNWAY_MODEL', 'gen-4-turbo'),
  resolution: '1080p' as const,
  aspectRatio: '16:9' as const,
  defaultDuration: parseInt(optional('DEFAULT_CLIP_DURATION', '10'), 10),
  maxConcurrent: 3,
  maxClipDuration: 16,
  creditsPerSecond: 5, // Gen-4 Turbo
};

// ─── Paths ──────────────────────────────────────────────────────────────────

const pipelineRoot = resolve(import.meta.dirname, '..');

export const paths = {
  root: pipelineRoot,
  cache: resolve(pipelineRoot, optional('CACHE_DIR', './cache')),
  output: resolve(pipelineRoot, optional('OUTPUT_DIR', './output')),
  scenes: resolve(pipelineRoot, optional('CACHE_DIR', './cache'), 'scenes'),
  clips: resolve(pipelineRoot, optional('CACHE_DIR', './cache'), 'clips'),
  audio: resolve(pipelineRoot, optional('CACHE_DIR', './cache'), 'audio'),
  characters: resolve(pipelineRoot, 'characters'),
  scripts: resolve(pipelineRoot, 'scripts'),
  state: resolve(pipelineRoot, optional('CACHE_DIR', './cache'), 'state'),
};

// ─── Pipeline defaults ──────────────────────────────────────────────────────

export const pipeline = {
  maxRetries: parseInt(optional('MAX_RETRIES', '3'), 10),
  retryBaseDelay: 2000, // ms
  pollingInterval: 5000, // ms for Runway task polling
};

// ─── FFmpeg composition ─────────────────────────────────────────────────────

export const composition: CompositionSettings = {
  codec: 'libx264',
  crf: 18,
  preset: 'slow',
  audio_codec: 'aac',
  audio_bitrate: '192k',
  resolution: '1920x1080',
  fps: 30,
};

// ─── Claude API config ──────────────────────────────────────────────────────

export const claude = {
  model: 'claude-sonnet-4-20250514',
  maxTokens: 8192,
};

// ─── ElevenLabs config ──────────────────────────────────────────────────────

export const elevenlabs = {
  model: 'eleven_multilingual_v2',
  stability: 0.7,
  similarityBoost: 0.8,
  style: 0.5,
};

// ─── Visual palette (master) ────────────────────────────────────────────────

export const masterPalette = {
  background: '#1A1A2E',
  silhouette: '#C4745A',
  gold: '#C9A96E',
  accent: '#8B5CF6',
  text: '#F5F0E6',
  warmLight: '#D4A853',
};

// ─── Cost rates (USD) ───────────────────────────────────────────────────────

export const costs = {
  runway: {
    creditCostUsd: 0.01,
    creditsPerSecond: 5, // Gen-4 Turbo
  },
  elevenlabs: {
    costPer1kChars: 0.30, // approximate
  },
  claude: {
    inputPer1kTokens: 0.003,
    outputPer1kTokens: 0.015,
  },
};
