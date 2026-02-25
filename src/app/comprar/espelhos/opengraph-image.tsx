import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Coleccao Espelhos ~ Experiencia digital de leitura";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Coleccao Espelhos",
    title: "A experiencia que te devolve a ti mesma",
    subtitle:
      "Ficcao psicologica com leitura interactiva, diario reflexivo e comunidade anonima. A partir de $29.",
    url: "seteveus.space/comprar/espelhos",
  });
}
