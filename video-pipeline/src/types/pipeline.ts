// ─── Scene (output of decomposer) ───────────────────────────────────────────

export interface Scene {
  id: string;                    // "ouro-proprio-m01-s01"
  order: number;
  narration_text: string;        // Text to be narrated (for ElevenLabs)
  visual_prompt: string;         // Cinematic prompt for Runway
  duration_seconds: number;      // Estimated duration based on text
  character_refs: string[];      // Character IDs that appear
  mood: string;                  // "contemplativo", "intenso", "esperançoso"
  camera: string;                // "close-up", "wide shot", "slow pan"
  transition: string;            // "fade", "cut", "dissolve"
}

// ─── Processed scene (after generation) ─────────────────────────────────────

export interface ProcessedScene extends Scene {
  clipPath: string;
  audioPath: string;
  audioDuration: number;         // Real audio duration in seconds
}

// ─── Audio segment ──────────────────────────────────────────────────────────

export interface AudioSegment {
  path: string;
  duration: number;              // seconds
}

// ─── Pipeline state (persisted to JSON) ─────────────────────────────────────

export interface SceneState {
  decomposed: boolean;
  clip_generated: boolean;
  clip_path?: string;
  audio_generated: boolean;
  audio_path?: string;
  audio_duration?: number;
  error?: string;
  retries: number;
}

export interface CostEstimate {
  runway_credits: number;
  elevenlabs_characters: number;
  claude_tokens: number;
}

export interface PipelineState {
  courseId: string;
  moduleId: string;
  status: 'pending' | 'decomposing' | 'generating_audio' | 'generating_visuals' | 'composing' | 'done' | 'error';
  scenes: Record<string, SceneState>;
  sceneOrder: string[];          // Ordered scene IDs for composition
  started_at: string;
  updated_at: string;
  cost_estimate: CostEstimate;
  output_path?: string;
}

// ─── Course style config ────────────────────────────────────────────────────

export interface CourseStyle {
  courseId: string;
  name: string;
  territory: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  mood: string;
  visual_keywords: string[];
}

// ─── CLI command types ──────────────────────────────────────────────────────

export interface GenerateOptions {
  course: string;
  module?: string;
  all?: boolean;
  dryRun?: boolean;
}

export interface RegenerateOptions {
  scene: string;
}

// ─── Script input types ─────────────────────────────────────────────────────

export interface LessonScript {
  moduleNumber: number;
  subLetter: string;
  title: string;
  perguntaInicial: string;
  situacaoHumana: string;
  revelacaoPadrao: string;
  gestoConsciencia: string;
  fraseFinal: string;
  status: string;
  notes?: string;
}

// ─── FFmpeg composition settings ────────────────────────────────────────────

export interface CompositionSettings {
  codec: string;
  crf: number;
  preset: string;
  audio_codec: string;
  audio_bitrate: string;
  resolution: string;
  fps: number;
}
