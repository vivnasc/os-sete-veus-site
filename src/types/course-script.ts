/**
 * Types for course video-lesson scripts — Escola dos Véus
 *
 * Each sub-lesson has two scripts:
 * 1. voiceScript — narration text for ElevenLabs TTS (Vivianne voice clone)
 * 2. videoScript — visual directions for ThinkDiffusion/ComfyUI animation
 */

export type VoiceScript = {
  /** Opening hook question (15-30s) */
  perguntaInicial: string;
  /** Recognizable human situation (2-3 min) */
  situacaoHumana: string;
  /** Reveal the hidden pattern (2-3 min) */
  revelacaoPadrao: string;
  /** Small actionable gesture (1-2 min) */
  gestoConsciencia: string;
  /** Closing phrase that stays (15-30s) */
  fraseFinal: string;
  /** Full narration text with [pause] tags for ElevenLabs */
  textoCompleto: string;
};

export type SceneDirection = {
  /** Scene description for image/video generation */
  descricao: string;
  /** Silhouette pose (ControlNet reference) */
  poseSilhueta:
    | "de-pe-imovel"
    | "curvada"
    | "sentada"
    | "maos-no-peito"
    | "maos-abertas"
    | "a-caminhar"
    | "de-costas"
    | "mao-estendida"
    | "duas-silhuetas-juntas"
    | "duas-silhuetas-separadas"
    | "adulta-crianca"
    | "a-segurar-peso"
    | "a-soltar-algo"
    | "a-abrir-porta";
  /** Symbolic elements in scene */
  elementosSimbolicos: string[];
  /** On-screen text overlay (key phrase) */
  textoEcra?: string;
};

export type VideoScript = {
  /** Territory landscape stage (1-4, maps to modules 1-2, 3-4, 5-6, 7-8) */
  estagioTerritorio: 1 | 2 | 3 | 4;
  /** Scene directions (4-6 scenes per sub-lesson) */
  cenas: SceneDirection[];
  /** Opening title card text */
  cartaoAbertura: string;
  /** Closing title card text */
  cartaoFecho: string;
};

export type SubLessonScript = {
  /** Course slug */
  cursoSlug: string;
  /** Module number (1-8) */
  modulo: number;
  /** Sub-lesson letter (A, B, C) */
  letra: string;
  /** Sub-lesson title */
  titulo: string;
  /** Voice narration script */
  voz: VoiceScript;
  /** Video visual directions */
  video: VideoScript;
};

export type CourseScripts = {
  cursoSlug: string;
  cursoTitulo: string;
  cursoNumero: number;
  /** Territory name from Mundo dos Véus */
  territorio: string;
  /** Territory accent color */
  corTerritorio: string;
  scripts: SubLessonScript[];
};
