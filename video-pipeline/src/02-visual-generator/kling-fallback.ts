/**
 * Kling AI fallback via Fal.ai
 *
 * Used when Runway Gen-4 fails 3 times for a scene.
 * Pay-as-you-go: ~$0.90 per 10s video clip.
 *
 * NOTE: This is a stub. Implement when Fal.ai SDK is added.
 * The interface matches runway.ts so the orchestrator can swap seamlessly.
 */

import type { Scene } from '../types/pipeline.js';
import type { ClipResult } from './runway.js';

export async function generateClipKling(
  scene: Scene,
  targetDuration?: number,
): Promise<ClipResult> {
  // TODO: Implement Kling via Fal.ai when needed
  // import { fal } from '@fal-ai/client';
  // const result = await fal.subscribe('fal-ai/kling-video/v2/master/text-to-video', {
  //   input: { prompt: scene.visual_prompt, duration: targetDuration },
  // });
  throw new Error(`Kling fallback not yet implemented. Scene: ${scene.id}`);
}
