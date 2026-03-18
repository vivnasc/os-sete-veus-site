/**
 * Mapeamento de imagens da Loranne por espelho.
 *
 * Loranne.png  — retrato principal (hero)
 * Loranne-velas.png — cenario cinematografico com velas (livro)
 * Loranne2.png — corpo inteiro, movimento, danca (Controlo — libertar)
 * Loranne3.png — contemplativa, oracao (Culpa — sacrificio)
 * Loranne4.png — coberta, misteriosa, escondida (Medo — silencio)
 * Loranne5.png — intima, deitada, vulneravel (Desejo — entrega)
 * Loranne6.png — close-ups introspectivos (Identidade — espelho)
 * Loranne7.png — retratos refinados, 4 poses (Ilusao — primeira revelacao)
 * Loranne8.png — close-ups finais, revelacao (Separacao — despedida)
 * Loranne-veus-coloridos.png — referencia visual das cores por espelho
 */

import type { Album } from "@/data/albums";

// Nomes dos espelhos (sem prefixo "Véu" ou "Espelho")
export const ESPELHO_NAMES: Record<number, string> = {
  1: "Ilusão",
  2: "Medo",
  3: "Culpa",
  4: "Identidade",
  5: "Controlo",
  6: "Desejo",
  7: "Separação",
};

// Nomes como array indexado (posicao 0 vazia para alinhar com veu 1-7)
export const ESPELHO_NAMES_ARRAY = ["", "Ilusão", "Medo", "Culpa", "Identidade", "Controlo", "Desejo", "Separação"];

const ESPELHO_COVERS: Record<number, string> = {
  1: "/Loranne7.png",  // Ilusao — retratos refinados, ver pela primeira vez
  2: "/Loranne4.png",  // Medo — coberta, escondida, silenciosa
  3: "/Loranne3.png",  // Culpa — contemplativa, oracao, sacrificio
  4: "/Loranne6.png",  // Identidade — introspectiva, procura de si
  5: "/Loranne2.png",  // Controlo — movimento, danca, libertar
  6: "/Loranne5.png",  // Desejo — intima, vulneravel, entrega
  7: "/Loranne8.png",  // Separacao — close-ups finais, revelacao
};

// Cursos rodam pelas imagens
const CURSO_COVERS = [
  "/Loranne.png",
  "/Loranne2.png",
  "/Loranne3.png",
  "/Loranne4.png",
  "/Loranne5.png",
  "/Loranne6.png",
  "/Loranne7.png",
  "/Loranne8.png",
];

export function getAlbumCover(album: Album): string {
  if (album.veu && ESPELHO_COVERS[album.veu]) {
    return ESPELHO_COVERS[album.veu];
  }
  if (album.product === "livro") {
    return "/Loranne-velas.png";
  }
  if (album.product === "curso") {
    let hash = 0;
    for (let i = 0; i < album.slug.length; i++) {
      hash = ((hash << 5) - hash + album.slug.charCodeAt(i)) | 0;
    }
    return CURSO_COVERS[Math.abs(hash) % CURSO_COVERS.length];
  }
  return "/Loranne.png";
}

/** Label para o badge do album — so o nome, sem prefixo */
export function getAlbumBadge(album: Album): string | null {
  if (!album.veu) return null;
  return ESPELHO_NAMES[album.veu] || null;
}
