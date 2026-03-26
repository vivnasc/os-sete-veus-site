import { NextRequest, NextResponse } from "next/server";

/**
 * Short URL redirect: /o/pele-7 → /partilha/cosmic-romance/7
 *
 * Format: /o/{shortName}-{trackNumber}
 * Maps short album names to full slugs for cleaner share URLs.
 */

const SHORT_TO_SLUG: Record<string, string> = {
  // Romance
  "pele": "cosmic-romance",
  "carta": "romance-carta",
  "saudade": "romance-saudade",
  "fogo": "romance-fogo-lento",
  "ninho": "romance-ninho",
  // Cosmic
  "viagem": "cosmic-viagem",
  "orbita": "cosmic-orbita",
  "poeira": "cosmic-poeira",
  "vasto": "cosmic-vasto",
  "sinal": "cosmic-sinal",
  "eter": "cosmic-eter",
  // Espelhos
  "ilusao": "espelho-ilusao",
  "medo": "espelho-medo",
  "culpa": "espelho-culpa",
  "identidade": "espelho-identidade",
  "controlo": "espelho-controlo",
  "desejo": "espelho-desejo",
  "separacao": "espelho-separacao",
  // Nos
  "heranca": "no-heranca",
  "silencio": "no-silencio",
  "sacrificio": "no-sacrificio",
  "vergonha": "no-vergonha",
  "solidao": "no-solidao",
  "vazio": "no-vazio",
  "pertenca": "no-pertenca",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  // Parse: "pele-7" → shortName="pele", track=7
  const match = code.match(/^(.+)-(\d+)$/);
  if (!match) {
    return NextResponse.redirect(new URL("/", _req.url));
  }

  const [, shortName, trackStr] = match;
  const slug = SHORT_TO_SLUG[shortName];

  if (!slug) {
    // Fallback: try using the shortName as-is (might be the full slug)
    return NextResponse.redirect(
      new URL(`/partilha/${shortName}/${trackStr}`, _req.url)
    );
  }

  return NextResponse.redirect(
    new URL(`/partilha/${slug}/${trackStr}`, _req.url)
  );
}
