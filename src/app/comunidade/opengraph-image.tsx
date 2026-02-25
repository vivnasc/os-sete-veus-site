import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Comunidade Ecos ~ Reflexoes anonimas e impermanentes";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Comunidade Ecos",
    title: "Onde as vozes se encontram",
    subtitle:
      "Reflexoes anonimas e impermanentes. Reconhecimentos silenciosos. Tudo e anonimo. Tudo desaparece.",
    url: "seteveus.space/comunidade",
    accentColor: "#a89278",
  });
}
