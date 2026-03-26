/**
 * Share URL utilities — short URLs for cleaner sharing.
 *
 * music.seteveus.space/o/pele-7  instead of
 * music.seteveus.space/partilha/cosmic-romance/7
 */

const SLUG_TO_SHORT: Record<string, string> = {
  // Romance
  "cosmic-romance": "pele",
  "romance-carta": "carta",
  "romance-saudade": "saudade",
  "romance-fogo-lento": "fogo",
  "romance-ninho": "ninho",
  // Cosmic
  "cosmic-viagem": "viagem",
  "cosmic-orbita": "orbita",
  "cosmic-poeira": "poeira",
  "cosmic-vasto": "vasto",
  "cosmic-sinal": "sinal",
  "cosmic-eter": "eter",
  // Espelhos
  "espelho-ilusao": "ilusao",
  "espelho-medo": "medo",
  "espelho-culpa": "culpa",
  "espelho-identidade": "identidade",
  "espelho-controlo": "controlo",
  "espelho-desejo": "desejo",
  "espelho-separacao": "separacao",
  // Nos
  "no-heranca": "heranca",
  "no-silencio": "silencio",
  "no-sacrificio": "sacrificio",
  "no-vergonha": "vergonha",
  "no-solidao": "solidao",
  "no-vazio": "vazio",
  "no-pertenca": "pertenca",
};

/** Build the short share path: /o/pele-7 */
export function getSharePath(albumSlug: string, trackNumber: number): string {
  const short = SLUG_TO_SHORT[albumSlug];
  if (short) {
    return `/o/${short}-${trackNumber}`;
  }
  // Fallback for unmapped albums: use slug directly
  return `/o/${albumSlug}-${trackNumber}`;
}

/** Build the full share URL */
export function getShareUrl(albumSlug: string, trackNumber: number): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${getSharePath(albumSlug, trackNumber)}`;
}
