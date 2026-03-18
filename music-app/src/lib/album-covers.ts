/**
 * Mapeamento de imagens da Loranne por espelho.
 *
 * Todas as collages foram cropadas em poses individuais em /poses/.
 * 63 poses extraidas + 1 hero = 64 imagens individuais.
 *
 * Collages originais (mantidas como referencia):
 * Loranne.png  — retrato principal (hero, ja individual)
 * Loranne2.png — 9 poses: corpo inteiro, movimento, danca
 * Loranne3.png — 9 poses: contemplativa, oracao
 * Loranne4.png — 9 poses: coberta, misteriosa, escondida
 * Loranne5.png — 8 poses: intima, deitada, vulneravel
 * Loranne6.png — 9 poses: close-ups introspectivos
 * Loranne7.png — 4 poses: retratos refinados
 * Loranne8.png — 4 poses: close-ups finais, revelacao
 * Loranne-velas.png — 4 poses: cenario cinematografico com velas
 * Loranne-veus-coloridos.png — 6 poses: cores por espelho
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

// Capa principal de cada espelho (melhor pose individual)
const ESPELHO_COVERS: Record<number, string> = {
  1: "/poses/loranne7-01.png",   // Ilusao — mao no rosto, revelacao elegante
  2: "/poses/loranne4-05.png",   // Medo — completamente coberta, de pe
  3: "/poses/loranne3-05.png",   // Culpa — oracao, maos juntas
  4: "/poses/loranne6-05.png",   // Identidade — sentada, maos no colo, introspectiva
  5: "/poses/loranne2-03.png",   // Controlo — danca com braco alto
  6: "/poses/loranne5-02.png",   // Desejo — intima, deitada, veu fluindo
  7: "/poses/loranne8-02.png",   // Separacao — mao no rosto, veu a soltar
};

// Todas as poses disponiveis por serie (para rodar nos cursos e faixas)
export const ALL_POSES = [
  // Hero
  "/poses/loranne-hero.png",
  // Loranne2: movimento, danca (9 poses)
  "/poses/loranne2-01.png", "/poses/loranne2-02.png", "/poses/loranne2-03.png",
  "/poses/loranne2-04.png", "/poses/loranne2-05.png", "/poses/loranne2-06.png",
  "/poses/loranne2-07.png", "/poses/loranne2-08.png", "/poses/loranne2-09.png",
  // Loranne3: contemplacao, oracao (9 poses)
  "/poses/loranne3-01.png", "/poses/loranne3-02.png", "/poses/loranne3-03.png",
  "/poses/loranne3-04.png", "/poses/loranne3-05.png", "/poses/loranne3-06.png",
  "/poses/loranne3-07.png", "/poses/loranne3-08.png", "/poses/loranne3-09.png",
  // Loranne4: misteriosa, coberta (9 poses)
  "/poses/loranne4-01.png", "/poses/loranne4-02.png", "/poses/loranne4-03.png",
  "/poses/loranne4-04.png", "/poses/loranne4-05.png", "/poses/loranne4-06.png",
  "/poses/loranne4-07.png", "/poses/loranne4-08.png", "/poses/loranne4-09.png",
  // Loranne5: intima, vulneravel (8 poses)
  "/poses/loranne5-01.png", "/poses/loranne5-02.png", "/poses/loranne5-03.png",
  "/poses/loranne5-04.png", "/poses/loranne5-05.png", "/poses/loranne5-06.png",
  "/poses/loranne5-07.png", "/poses/loranne5-08.png",
  // Loranne6: close-ups introspectivos (9 poses)
  "/poses/loranne6-01.png", "/poses/loranne6-02.png", "/poses/loranne6-03.png",
  "/poses/loranne6-04.png", "/poses/loranne6-05.png", "/poses/loranne6-06.png",
  "/poses/loranne6-07.png", "/poses/loranne6-08.png", "/poses/loranne6-09.png",
  // Loranne7: retratos refinados (4 poses)
  "/poses/loranne7-01.png", "/poses/loranne7-02.png",
  "/poses/loranne7-03.png", "/poses/loranne7-04.png",
  // Loranne8: revelacao final (4 poses)
  "/poses/loranne8-01.png", "/poses/loranne8-02.png",
  "/poses/loranne8-03.png", "/poses/loranne8-04.png",
  // Velas: cenario cinematografico (4 poses)
  "/poses/velas-01.png", "/poses/velas-02.png",
  "/poses/velas-03.png", "/poses/velas-04.png",
  // Coloridos: cores por espelho (6 poses)
  "/poses/coloridos-01.png", "/poses/coloridos-02.png", "/poses/coloridos-03.png",
  "/poses/coloridos-04.png", "/poses/coloridos-05.png", "/poses/coloridos-06.png",
];

export function getAlbumCover(album: Album): string {
  if (album.veu && ESPELHO_COVERS[album.veu]) {
    return ESPELHO_COVERS[album.veu];
  }
  if (album.product === "livro") {
    return "/poses/velas-02.png";
  }
  if (album.product === "curso") {
    // Rotate through all poses based on slug hash
    let hash = 0;
    for (let i = 0; i < album.slug.length; i++) {
      hash = ((hash << 5) - hash + album.slug.charCodeAt(i)) | 0;
    }
    return ALL_POSES[Math.abs(hash) % ALL_POSES.length];
  }
  return "/poses/loranne-hero.png";
}

/** Label para o badge do album — so o nome, sem prefixo */
export function getAlbumBadge(album: Album): string | null {
  if (!album.veu) return null;
  return ESPELHO_NAMES[album.veu] || null;
}
