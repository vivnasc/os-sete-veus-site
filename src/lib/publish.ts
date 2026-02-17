/**
 * Sistema de publicação automática baseado no calendário
 *
 * Lógica:
 * - Cada Espelho tem uma launchDate em experiences.ts
 * - Donors/early access recebem conteúdo 7 dias antes
 * - O status é calculado dinamicamente com base na data actual
 * - O Nó correspondente acompanha o status do Espelho
 */

import { experiences, type Experience, type ExperienceStatus } from "@/data/experiences";
import { nosCollection, type NosBook } from "@/data/nos-collection";

export const EARLY_ACCESS_DAYS = 7;

/**
 * Calcula o status efectivo de um Espelho com base na data actual
 */
export function getEffectiveStatus(
  experience: Experience,
  hasEarlyAccess = false
): ExperienceStatus {
  // Já disponível estaticamente
  if (experience.status === "available") return "available";

  // Sem data de lançamento → mantém status original
  if (!experience.launchDate) return experience.status;

  const now = new Date();
  const launch = new Date(experience.launchDate);

  // Early access: disponível X dias antes
  if (hasEarlyAccess) {
    const earlyDate = new Date(launch);
    earlyDate.setDate(earlyDate.getDate() - EARLY_ACCESS_DAYS);
    if (now >= earlyDate) return "available";
  }

  // Público: disponível na data de lançamento
  if (now >= launch) return "available";

  return experience.status;
}

/**
 * Calcula o status efectivo de um Nó (segue o Espelho correspondente)
 */
export function getEffectiveNosStatus(
  nos: NosBook,
  hasEarlyAccess = false
): "available" | "coming_soon" {
  if (nos.status === "available") return "available";

  // Sem dataFile → ainda não escrito, nunca disponível
  if (!nos.dataFile) return "coming_soon";

  // Segue o status do Espelho correspondente
  const espelho = experiences.find((e) => e.slug === nos.espelhoSlug);
  if (!espelho) return "coming_soon";

  const espelhoStatus = getEffectiveStatus(espelho, hasEarlyAccess);
  return espelhoStatus === "available" ? "available" : "coming_soon";
}

/**
 * Retorna todos os Espelhos com status calculado dinamicamente
 */
export function getEffectiveExperiences(hasEarlyAccess = false): Experience[] {
  return experiences.map((e) => ({
    ...e,
    status: getEffectiveStatus(e, hasEarlyAccess),
  }));
}

/**
 * Retorna todos os Nós com status calculado dinamicamente
 */
export function getEffectiveNos(hasEarlyAccess = false): NosBook[] {
  return nosCollection.map((n) => ({
    ...n,
    status: getEffectiveNosStatus(n, hasEarlyAccess),
  }));
}

/**
 * Espelhos que vão ser lançados nos próximos N dias
 */
export function getLaunchingSoon(daysAhead: number): Experience[] {
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + daysAhead);

  return experiences.filter((e) => {
    if (e.status === "available" || !e.launchDate) return false;
    const launch = new Date(e.launchDate);
    return launch > now && launch <= future;
  });
}

/**
 * Espelhos que foram lançados hoje (para notificação pública)
 */
export function getLaunchedToday(): Experience[] {
  const now = new Date();
  const today = now.toISOString().split("T")[0]; // YYYY-MM-DD

  return experiences.filter((e) => {
    if (e.status === "available" || !e.launchDate) return false;
    return e.launchDate === today;
  });
}

/**
 * Espelhos que entram em early access hoje (7 dias antes do lançamento)
 */
export function getEarlyAccessToday(): Experience[] {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  return experiences.filter((e) => {
    if (e.status === "available" || !e.launchDate) return false;
    const earlyDate = new Date(e.launchDate);
    earlyDate.setDate(earlyDate.getDate() - EARLY_ACCESS_DAYS);
    return earlyDate.toISOString().split("T")[0] === today;
  });
}

/**
 * Dias até o próximo lançamento
 */
export function daysUntilNextLaunch(): number | null {
  const now = new Date();
  const upcoming = experiences
    .filter((e) => e.status !== "available" && e.launchDate)
    .map((e) => new Date(e.launchDate!))
    .filter((d) => d > now)
    .sort((a, b) => a.getTime() - b.getTime());

  if (upcoming.length === 0) return null;

  const diff = upcoming[0].getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
