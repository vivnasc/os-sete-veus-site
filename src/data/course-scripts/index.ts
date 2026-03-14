/**
 * Course Scripts — Escola dos Véus
 *
 * 241 sub-aulas across 10 courses.
 * Each sub-lesson has:
 *   - Voice script (narration for ElevenLabs TTS)
 *   - Video script (visual directions for ThinkDiffusion/ComfyUI)
 *
 * Structure per voice script:
 *   1. Pergunta inicial (hook, 15-30s)
 *   2. Situacao humana (recognition, 2-3 min)
 *   3. Revelacao do padrao (what's underneath, 2-3 min)
 *   4. Gesto de consciencia (small action, 1-2 min)
 *   5. Frase final (stays with you, 15-30s)
 */

export { OURO_PROPRIO_SCRIPTS } from "./01-ouro-proprio";
export { SANGUE_E_SEDA_SCRIPTS } from "./02-sangue-e-seda";
export { A_ARTE_DA_INTEIREZA_SCRIPTS } from "./03-a-arte-da-inteireza";
export { DEPOIS_DO_FOGO_SCRIPTS } from "./04-depois-do-fogo";
export { OLHOS_ABERTOS_SCRIPTS } from "./05-olhos-abertos";
export { A_PELE_LEMBRA_SCRIPTS } from "./06-a-pele-lembra";
export { LIMITE_SAGRADO_SCRIPTS } from "./07-limite-sagrado";
export { FLORES_NO_ESCURO_SCRIPTS } from "./08-flores-no-escuro";
export { O_PESO_E_O_CHAO_SCRIPTS } from "./09-o-peso-e-o-chao";
export { VOZ_DE_DENTRO_SCRIPTS } from "./10-voz-de-dentro";

import type { CourseScripts } from "@/types/course-script";
import { OURO_PROPRIO_SCRIPTS } from "./01-ouro-proprio";
import { SANGUE_E_SEDA_SCRIPTS } from "./02-sangue-e-seda";
import { A_ARTE_DA_INTEIREZA_SCRIPTS } from "./03-a-arte-da-inteireza";
import { DEPOIS_DO_FOGO_SCRIPTS } from "./04-depois-do-fogo";
import { OLHOS_ABERTOS_SCRIPTS } from "./05-olhos-abertos";
import { A_PELE_LEMBRA_SCRIPTS } from "./06-a-pele-lembra";
import { LIMITE_SAGRADO_SCRIPTS } from "./07-limite-sagrado";
import { FLORES_NO_ESCURO_SCRIPTS } from "./08-flores-no-escuro";
import { O_PESO_E_O_CHAO_SCRIPTS } from "./09-o-peso-e-o-chao";
import { VOZ_DE_DENTRO_SCRIPTS } from "./10-voz-de-dentro";

export const ALL_COURSE_SCRIPTS: CourseScripts[] = [
  OURO_PROPRIO_SCRIPTS,
  SANGUE_E_SEDA_SCRIPTS,
  A_ARTE_DA_INTEIREZA_SCRIPTS,
  DEPOIS_DO_FOGO_SCRIPTS,
  OLHOS_ABERTOS_SCRIPTS,
  A_PELE_LEMBRA_SCRIPTS,
  LIMITE_SAGRADO_SCRIPTS,
  FLORES_NO_ESCURO_SCRIPTS,
  O_PESO_E_O_CHAO_SCRIPTS,
  VOZ_DE_DENTRO_SCRIPTS,
];

/** Get scripts for a specific course by slug */
export function getCourseScripts(slug: string): CourseScripts | undefined {
  return ALL_COURSE_SCRIPTS.find((c) => c.cursoSlug === slug);
}

/** Get a specific sub-lesson script */
export function getSubLessonScript(
  slug: string,
  modulo: number,
  letra: string
) {
  const course = getCourseScripts(slug);
  if (!course) return undefined;
  return course.scripts.find(
    (s) => s.modulo === modulo && s.letra === letra
  );
}

/** Total count of all sub-lesson scripts */
export function getTotalScriptCount(): number {
  return ALL_COURSE_SCRIPTS.reduce((sum, c) => sum + c.scripts.length, 0);
}
