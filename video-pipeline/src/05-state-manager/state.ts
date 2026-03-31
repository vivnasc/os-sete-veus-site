import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { paths } from '../config.js';
import type { PipelineState, SceneState, Scene } from '../types/pipeline.js';

function statePath(courseId: string, moduleId: string): string {
  return resolve(paths.state, `${courseId}-${moduleId}.json`);
}

export async function loadState(courseId: string, moduleId: string): Promise<PipelineState | null> {
  const fp = statePath(courseId, moduleId);
  if (!existsSync(fp)) return null;
  const raw = await readFile(fp, 'utf-8');
  return JSON.parse(raw) as PipelineState;
}

export async function saveState(state: PipelineState): Promise<void> {
  await mkdir(paths.state, { recursive: true });
  state.updated_at = new Date().toISOString();
  const fp = statePath(state.courseId, state.moduleId);
  await writeFile(fp, JSON.stringify(state, null, 2), 'utf-8');
}

export function createState(courseId: string, moduleId: string): PipelineState {
  return {
    courseId,
    moduleId,
    status: 'pending',
    scenes: {},
    sceneOrder: [],
    started_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    cost_estimate: {
      runway_credits: 0,
      elevenlabs_characters: 0,
      claude_tokens: 0,
    },
  };
}

export function initScenes(state: PipelineState, scenes: Scene[]): void {
  state.sceneOrder = scenes.map(s => s.id);
  for (const scene of scenes) {
    state.scenes[scene.id] = {
      decomposed: true,
      clip_generated: false,
      audio_generated: false,
      retries: 0,
    };
  }
}

export function updateScene(state: PipelineState, sceneId: string, update: Partial<SceneState>): void {
  const existing = state.scenes[sceneId];
  if (!existing) throw new Error(`Scene ${sceneId} not found in state`);
  Object.assign(existing, update);
}

export function isSceneComplete(state: PipelineState, sceneId: string): boolean {
  const s = state.scenes[sceneId];
  return !!s && s.clip_generated && s.audio_generated;
}

export function allScenesComplete(state: PipelineState): boolean {
  return state.sceneOrder.every(id => isSceneComplete(state, id));
}

export function getIncompleteScenes(state: PipelineState): string[] {
  return state.sceneOrder.filter(id => !isSceneComplete(state, id));
}

export function addCost(state: PipelineState, type: keyof PipelineState['cost_estimate'], amount: number): void {
  state.cost_estimate[type] += amount;
}

export function formatCostReport(state: PipelineState): string {
  const { runway_credits, elevenlabs_characters, claude_tokens } = state.cost_estimate;
  const runwayCost = runway_credits * 0.01;
  const elevenCost = (elevenlabs_characters / 1000) * 0.30;
  const claudeCost = (claude_tokens / 1000) * 0.015;
  const total = runwayCost + elevenCost + claudeCost;

  return [
    `Cost Report — ${state.courseId} / ${state.moduleId}`,
    `─────────────────────────────────`,
    `Runway:     ${runway_credits} credits → $${runwayCost.toFixed(2)}`,
    `ElevenLabs: ${elevenlabs_characters} chars → $${elevenCost.toFixed(2)}`,
    `Claude:     ${claude_tokens} tokens → $${claudeCost.toFixed(2)}`,
    `─────────────────────────────────`,
    `Total:      $${total.toFixed(2)}`,
  ].join('\n');
}
