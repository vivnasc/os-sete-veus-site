import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Entrar ~ Os Sete Véus do Despertar";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Os Sete Véus do Despertar",
    title: "Entra no teu espaço",
    subtitle: "Leitura, diário reflexivo, comunidade e recursos exclusivos.",
    url: "seteveus.space/entrar",
  });
}
