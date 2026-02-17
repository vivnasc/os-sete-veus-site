/**
 * Registo de conteúdos: mapeia slugs de Espelhos/Nós aos seus módulos de dados
 *
 * Quando um novo Espelho ou Nó é publicado, basta:
 * 1. Criar o ficheiro de dados em src/data/ (ex: espelho-medo.ts)
 * 2. Adicionar a entrada aqui
 * 3. O reader carrega automaticamente
 */

import type { Chapter } from "@/data/ebook";

export type ContentModule = {
  chapters: Chapter[];
  bookMeta: {
    title: string;
    subtitle: string;
    author: string;
    dedication: string;
    intro: string[];
  };
};

// Registo de Espelhos (slug → import dinâmico)
const espelhoRegistry: Record<string, () => Promise<ContentModule>> = {
  "veu-da-ilusao": () => import("@/data/ebook").then((m) => ({
    chapters: m.chapters,
    bookMeta: m.bookMeta,
  })),
  "veu-do-medo": () => import("@/data/espelho-medo").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  "veu-da-culpa": () => import("@/data/espelho-culpa").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  "veu-da-identidade": () => import("@/data/espelho-identidade").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  "veu-do-controlo": () => import("@/data/espelho-controlo").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  "veu-do-desejo": () => import("@/data/espelho-desejo").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  "veu-da-separacao": () => import("@/data/espelho-separacao").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
};

// Registo de Nós (slug → import dinâmico)
const nosRegistry: Record<string, () => Promise<ContentModule>> = {
  "no-da-heranca": () => import("@/data/no-heranca").then((m) => ({
    chapters: m.chapters,
    bookMeta: m.bookMeta,
  })),
  // Próximos Nós — descomentar à medida que são publicados:
  // "no-do-silencio": () => import("@/data/no-silencio").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  // "no-do-sacrificio": () => import("@/data/no-sacrificio").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  // "no-da-vergonha": () => import("@/data/no-vergonha").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  // "no-da-solidao": () => import("@/data/no-solidao").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  // "no-do-vazio": () => import("@/data/no-vazio").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
  // "no-da-pertenca": () => import("@/data/no-pertenca").then(m => ({ chapters: m.chapters, bookMeta: m.bookMeta })),
};

export async function loadEspelho(slug: string): Promise<ContentModule | null> {
  const loader = espelhoRegistry[slug];
  if (!loader) return null;
  return loader();
}

export async function loadNos(slug: string): Promise<ContentModule | null> {
  const loader = nosRegistry[slug];
  if (!loader) return null;
  return loader();
}

export function isEspelhoRegistered(slug: string): boolean {
  return slug in espelhoRegistry;
}

export function isNosRegistered(slug: string): boolean {
  return slug in nosRegistry;
}

/**
 * Gera a chave de progresso para um capítulo de um Espelho.
 * Ilusão usa slugs bare (compatibilidade com leitoras existentes).
 * Os restantes usam "espelhoSlug/chapterSlug".
 */
export function espelhoProgressKey(espelhoSlug: string, chapterSlug: string): string {
  if (espelhoSlug === "veu-da-ilusao") return chapterSlug;
  return `${espelhoSlug}/${chapterSlug}`;
}

/**
 * Lista de todos os slugs de espelhos registados.
 */
export function getRegisteredEspelhoSlugs(): string[] {
  return Object.keys(espelhoRegistry);
}
