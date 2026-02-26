import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Colecção Espelhos ~ Experiência digital de leitura";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Colecção Espelhos",
    title: "A experiência que te devolve a ti mesma",
    subtitle:
      "Ficção psicológica com leitura interactiva, diário reflexivo e comunidade anónima. A partir de $29.",
    url: "seteveus.space/comprar/espelhos",
  });
}
