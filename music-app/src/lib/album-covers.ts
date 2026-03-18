/**
 * Mapeamento de imagens da Loranne por veu.
 *
 * Loranne.png  — retrato principal (hero/livro)
 * Loranne2.png — corpo inteiro, movimento, danca (Controlo — libertar)
 * Loranne3.png — contemplativa, oracao (Culpa — sacrificio)
 * Loranne4.png — coberta, misteriosa, escondida (Medo — silencio)
 * Loranne5.png — intima, deitada, vulneravel (Desejo — entrega)
 * Loranne6.png — close-ups introspectivos (Identidade — espelho)
 * Loranne7.png — retratos refinados, 4 poses (Ilusao — primeira revelacao)
 * Loranne8.png — close-ups finais, revelacao (Separacao — despedida)
 */

import type { Album } from "@/data/albums";

const VEU_COVERS: Record<number, string> = {
  1: "/Loranne7.png",  // Ilusao — retratos refinados, ver pela primeira vez
  2: "/Loranne4.png",  // Medo — coberta, escondida, silenciosa
  3: "/Loranne3.png",  // Culpa — contemplativa, oracao, sacrificio
  4: "/Loranne6.png",  // Identidade — introspectiva, procura de si
  5: "/Loranne2.png",  // Controlo — movimento, danca, libertar
  6: "/Loranne5.png",  // Desejo — intima, vulneravel, entrega
  7: "/Loranne8.png",  // Separacao — close-ups finais, revelacao
};

// Cursos rodam pelas 8 imagens
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
  if (album.veu && VEU_COVERS[album.veu]) {
    return VEU_COVERS[album.veu];
  }
  if (album.product === "livro") {
    return "/Loranne.png";
  }
  if (album.product === "curso") {
    // Rotate through images based on slug hash
    let hash = 0;
    for (let i = 0; i < album.slug.length; i++) {
      hash = ((hash << 5) - hash + album.slug.charCodeAt(i)) | 0;
    }
    return CURSO_COVERS[Math.abs(hash) % CURSO_COVERS.length];
  }
  return "/Loranne.png";
}
