import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt =
  "Os Sete Veus do Despertar ~ Historias que te devolvem a ti mesma";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Por Vivianne dos Santos",
    title: "Os Sete Veus do Despertar",
    subtitle:
      "Historias que te devolvem a ti mesma. Leitura integrada, diario reflexivo, comunidade anonima.",
    url: "seteveus.space",
  });
}
