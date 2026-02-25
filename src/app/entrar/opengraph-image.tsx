import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Entrar ~ Os Sete Veus do Despertar";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Os Sete Veus do Despertar",
    title: "Entra no teu espaco",
    subtitle: "Leitura, diario reflexivo, comunidade e recursos exclusivos.",
    url: "seteveus.space/entrar",
  });
}
