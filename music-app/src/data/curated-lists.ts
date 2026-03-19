/**
 * Listas Curadas — Sete Veus Music
 *
 * Tres categorias:
 * - Generos (flavor): Organico, Marrabenta, House, Gospel
 * - Mood (energy): Sussurro, Constante, Pulso, Hino, Cru
 * - Temas: curadas manualmente por tema emocional
 */

import { ALL_ALBUMS, type AlbumTrack } from "./albums";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type TrackRef = {
  albumSlug: string;
  trackNumber: number;
};

export type CuratedList = {
  slug: string;
  title: string;
  subtitle: string;
  category: "genero" | "mood" | "tema";
  color: string;
  icon: string;
  tracks: TrackRef[];
};

export type ResolvedTrack = AlbumTrack & {
  albumSlug: string;
  albumTitle: string;
  albumColor: string;
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function allTracks(): Array<AlbumTrack & { albumSlug: string }> {
  return ALL_ALBUMS.flatMap(a =>
    a.tracks.map(t => ({ ...t, albumSlug: a.slug }))
  );
}

function byFlavor(flavor: string): TrackRef[] {
  return allTracks()
    .filter(t => t.flavor === flavor)
    .map(t => ({ albumSlug: t.albumSlug, trackNumber: t.number }));
}

function byEnergy(energy: string): TrackRef[] {
  return allTracks()
    .filter(t => t.energy === energy)
    .map(t => ({ albumSlug: t.albumSlug, trackNumber: t.number }));
}

// ─────────────────────────────────────────────
// GENEROS (by flavor)
// ─────────────────────────────────────────────

const GENERO_ORGANICO: CuratedList = {
  slug: "genero-organico",
  title: "Orgânico",
  subtitle: "O som base Loranne. Piano, cordas, pads, intimidade.",
  category: "genero",
  color: "#c9b896",
  icon: "leaf",
  tracks: byFlavor("organic"),
};

const GENERO_MARRABENTA: CuratedList = {
  slug: "genero-marrabenta",
  title: "Marrabenta",
  subtitle: "Ritmo moçambicano. Guitarra, shaker, groove quente.",
  category: "genero",
  color: "#e07a4a",
  icon: "flame",
  tracks: byFlavor("marrabenta"),
};

const GENERO_HOUSE: CuratedList = {
  slug: "genero-house",
  title: "House",
  subtitle: "Four-on-the-floor. Energia de pista com alma.",
  category: "genero",
  color: "#8aaaca",
  icon: "zap",
  tracks: byFlavor("house"),
};

const GENERO_GOSPEL: CuratedList = {
  slug: "genero-gospel",
  title: "Gospel",
  subtitle: "Coral, palmas, orgão. Hinos de libertação.",
  category: "genero",
  color: "#baaacc",
  icon: "sun",
  tracks: byFlavor("gospel"),
};

// ─────────────────────────────────────────────
// MOOD (by energy)
// ─────────────────────────────────────────────

const MOOD_SUSSURRO: CuratedList = {
  slug: "mood-sussurro",
  title: "Sussurro",
  subtitle: "Íntimo, contemplativo, antes de dormir.",
  category: "mood",
  color: "#666680",
  icon: "moon",
  tracks: byEnergy("whisper"),
};

const MOOD_CONSTANTE: CuratedList = {
  slug: "mood-constante",
  title: "Constante",
  subtitle: "Grounded, ritmo de caminhada, presença.",
  category: "mood",
  color: "#ab9375",
  icon: "footprints",
  tracks: byEnergy("steady"),
};

const MOOD_PULSO: CuratedList = {
  slug: "mood-pulso",
  title: "Pulso",
  subtitle: "Energia, movimento, para correr ou conduzir.",
  category: "mood",
  color: "#c08aaa",
  icon: "heart-pulse",
  tracks: byEnergy("pulse"),
};

const MOOD_HINO: CuratedList = {
  slug: "mood-hino",
  title: "Hino",
  subtitle: "Declarativo, forte, poder no peito.",
  category: "mood",
  color: "#C9A96E",
  icon: "crown",
  tracks: byEnergy("anthem"),
};

const MOOD_CRU: CuratedList = {
  slug: "mood-cru",
  title: "Cru",
  subtitle: "Sem filtro. Voz e verdade.",
  category: "mood",
  color: "#b07a7a",
  icon: "droplet",
  tracks: byEnergy("raw"),
};

// ─────────────────────────────────────────────
// TEMAS (curadas manualmente)
// ─────────────────────────────────────────────

const TEMA_AUTO_AMOR: CuratedList = {
  slug: "tema-auto-amor",
  title: "Auto-Amor",
  subtitle: "Ternura contigo mesma. Mereces sem provar.",
  category: "tema",
  color: "#c08aaa",
  icon: "heart",
  tracks: [
    { albumSlug: "espelho-culpa", trackNumber: 5 },     // Deserve
    { albumSlug: "espelho-culpa", trackNumber: 7 },     // Ternura
    { albumSlug: "espelho-ilusao", trackNumber: 6 },    // Honestidade Quieta
    { albumSlug: "espelho-identidade", trackNumber: 4 }, // Espelho Interior
    { albumSlug: "espelho-identidade", trackNumber: 7 }, // Eu Sem Justificacao
    { albumSlug: "espelho-desejo", trackNumber: 6 },    // Habitar o Desejo
    { albumSlug: "espelho-desejo", trackNumber: 7 },    // Inteira
    { albumSlug: "curso-pele-nua", trackNumber: 3 },    // Habitar
    { albumSlug: "curso-ouro-proprio", trackNumber: 7 }, // Abundancia
    { albumSlug: "no-heranca", trackNumber: 7 },        // O Fio Dourado
  ],
};

const TEMA_AUTO_PODER: CuratedList = {
  slug: "tema-auto-poder",
  title: "Auto-Poder",
  subtitle: "A força que já tens. Coroa, não armadura.",
  category: "tema",
  color: "#C9A96E",
  icon: "crown",
  tracks: [
    { albumSlug: "espelho-identidade", trackNumber: 7 }, // Eu Sem Justificacao
    { albumSlug: "espelho-medo", trackNumber: 6 },      // Ouco-te Mas Vou
    { albumSlug: "espelho-controlo", trackNumber: 6 },   // Largar
    { albumSlug: "espelho-culpa", trackNumber: 5 },      // Deserve
    { albumSlug: "espelho-ilusao", trackNumber: 7 },     // O Veu Cai
    { albumSlug: "espelho-separacao", trackNumber: 7 },  // Sete Veus
    { albumSlug: "curso-limite-sagrado", trackNumber: 3 }, // Dizer Nao
    { albumSlug: "curso-ouro-e-sombra", trackNumber: 7 }, // Soberania
    { albumSlug: "curso-brasa-viva", trackNumber: 3 },   // Fogo Controlado
    { albumSlug: "no-silencio", trackNumber: 5 },        // Voice
  ],
};

const TEMA_LIMITES: CuratedList = {
  slug: "tema-limites",
  title: "Limites",
  subtitle: "A muralha de luz que protege sem prender.",
  category: "tema",
  color: "#8aaaca",
  icon: "shield",
  tracks: [
    { albumSlug: "curso-limite-sagrado", trackNumber: 1 }, // Sem Muralha
    { albumSlug: "curso-limite-sagrado", trackNumber: 2 }, // A Linha
    { albumSlug: "curso-limite-sagrado", trackNumber: 3 }, // Dizer Nao
    { albumSlug: "curso-limite-sagrado", trackNumber: 4 }, // Com Porta
    { albumSlug: "espelho-controlo", trackNumber: 1 },     // Segurar
    { albumSlug: "espelho-controlo", trackNumber: 5 },     // Trust
    { albumSlug: "espelho-controlo", trackNumber: 6 },     // Largar
    { albumSlug: "espelho-medo", trackNumber: 6 },         // Ouco-te Mas Vou
    { albumSlug: "no-sacrificio", trackNumber: 4 },        // Boundary
    { albumSlug: "curso-brasa-viva", trackNumber: 3 },     // Fogo Controlado
  ],
};

const TEMA_RAIZES: CuratedList = {
  slug: "tema-raizes",
  title: "Raízes",
  subtitle: "O que veio antes de ti. Sangue, herança, pertença.",
  category: "tema",
  color: "#8b5c3e",
  icon: "tree-deciduous",
  tracks: [
    { albumSlug: "curso-sangue-e-seda", trackNumber: 1 }, // Raizes
    { albumSlug: "curso-sangue-e-seda", trackNumber: 2 }, // Seda
    { albumSlug: "curso-sangue-e-seda", trackNumber: 3 }, // Sangue
    { albumSlug: "curso-sangue-e-seda", trackNumber: 4 }, // Tecer
    { albumSlug: "espelho-culpa", trackNumber: 4 },       // Heranca
    { albumSlug: "espelho-ilusao", trackNumber: 2 },      // The Coat I Never Chose
    { albumSlug: "no-heranca", trackNumber: 1 },          // O Silencio de Helena
    { albumSlug: "no-heranca", trackNumber: 3 },          // Duas Mulheres
    { albumSlug: "curso-ouro-proprio", trackNumber: 3 },  // Heranca Financeira
    { albumSlug: "no-pertenca", trackNumber: 7 },         // O Lar Inventado
  ],
};

const TEMA_O_CORPO: CuratedList = {
  slug: "tema-o-corpo",
  title: "O Corpo",
  subtitle: "Voltar a habitar a pele. O corpo como casa.",
  category: "tema",
  color: "#C4745A",
  icon: "person-standing",
  tracks: [
    { albumSlug: "curso-pele-nua", trackNumber: 1 },     // Mapa do Corpo
    { albumSlug: "curso-pele-nua", trackNumber: 2 },     // Pele
    { albumSlug: "curso-pele-nua", trackNumber: 3 },     // Habitar
    { albumSlug: "curso-pele-nua", trackNumber: 4 },     // Nua
    { albumSlug: "espelho-ilusao", trackNumber: 5 },     // The Body Knows
    { albumSlug: "espelho-medo", trackNumber: 4 },       // O Estomago Sabe
    { albumSlug: "espelho-desejo", trackNumber: 3 },     // O Que o Corpo Pede
    { albumSlug: "espelho-controlo", trackNumber: 7 },   // Respirar
    { albumSlug: "curso-maos-cansadas", trackNumber: 2 }, // Pausa
    { albumSlug: "curso-pao-e-silencio", trackNumber: 1 }, // Fome
  ],
};

const TEMA_RECOMECAR: CuratedList = {
  slug: "tema-recomecar",
  title: "Recomeçar",
  subtitle: "Depois do fogo, nascem flores.",
  category: "tema",
  color: "#6b8e5a",
  icon: "sprout",
  tracks: [
    { albumSlug: "curso-depois-do-fogo", trackNumber: 1 }, // Cinza
    { albumSlug: "curso-depois-do-fogo", trackNumber: 2 }, // O Que Sobrou
    { albumSlug: "curso-depois-do-fogo", trackNumber: 3 }, // Broto
    { albumSlug: "curso-depois-do-fogo", trackNumber: 4 }, // Terra Nova
    { albumSlug: "espelho-separacao", trackNumber: 4 },    // Separar
    { albumSlug: "espelho-separacao", trackNumber: 5 },    // Rebuild
    { albumSlug: "espelho-separacao", trackNumber: 6 },    // Raizes no Ar
    { albumSlug: "espelho-separacao", trackNumber: 7 },    // Sete Veus
    { albumSlug: "no-pertenca", trackNumber: 6 },          // Criar
    { albumSlug: "curso-estacoes-partidas", trackNumber: 4 }, // Renovar
  ],
};

const TEMA_O_SILENCIO: CuratedList = {
  slug: "tema-o-silencio",
  title: "O Silêncio",
  subtitle: "O que vive no que não se diz.",
  category: "tema",
  color: "#666680",
  icon: "volume-x",
  tracks: [
    { albumSlug: "no-silencio", trackNumber: 1 },         // Dois Corpos Quietos
    { albumSlug: "no-silencio", trackNumber: 2 },         // O Que Cala
    { albumSlug: "no-silencio", trackNumber: 3 },         // Espaco Entre
    { albumSlug: "no-heranca", trackNumber: 1 },           // O Silencio de Helena
    { albumSlug: "no-heranca", trackNumber: 4 },           // O Que Nunca Foi Dito
    { albumSlug: "espelho-medo", trackNumber: 1 },         // Cuidado
    { albumSlug: "espelho-medo", trackNumber: 7 },         // Devagar
    { albumSlug: "curso-voz-de-dentro", trackNumber: 1 },  // Eco
    { albumSlug: "curso-voz-de-dentro", trackNumber: 2 },  // Escuta
    { albumSlug: "curso-silencio-que-grita", trackNumber: 1 }, // Mudo
  ],
};

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

export const GENEROS: CuratedList[] = [
  GENERO_ORGANICO,
  GENERO_MARRABENTA,
  GENERO_HOUSE,
  GENERO_GOSPEL,
];

export const MOODS: CuratedList[] = [
  MOOD_SUSSURRO,
  MOOD_CONSTANTE,
  MOOD_PULSO,
  MOOD_HINO,
  MOOD_CRU,
];

export const TEMAS: CuratedList[] = [
  TEMA_AUTO_AMOR,
  TEMA_AUTO_PODER,
  TEMA_LIMITES,
  TEMA_RAIZES,
  TEMA_O_CORPO,
  TEMA_RECOMECAR,
  TEMA_O_SILENCIO,
];

export const ALL_LISTS: CuratedList[] = [...GENEROS, ...MOODS, ...TEMAS];

/** Resolve track references to full track objects */
export function resolveList(list: CuratedList): ResolvedTrack[] {
  const albumMap = new Map(ALL_ALBUMS.map(a => [a.slug, a]));
  return list.tracks.flatMap(ref => {
    const album = albumMap.get(ref.albumSlug);
    if (!album) return [];
    const track = album.tracks.find(t => t.number === ref.trackNumber);
    if (!track) return [];
    return [{
      ...track,
      albumSlug: album.slug,
      albumTitle: album.title,
      albumColor: album.color,
    }];
  });
}
