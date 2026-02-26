import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt =
  "Os Sete Véus do Despertar ~ Histórias que te devolvem a ti mesma";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Por Vivianne dos Santos",
    title: "Os Sete Véus do Despertar",
    subtitle:
      "Histórias que te devolvem a ti mesma. Leitura integrada, diário reflexivo, comunidade anónima.",
    url: "seteveus.space",
  });
}
