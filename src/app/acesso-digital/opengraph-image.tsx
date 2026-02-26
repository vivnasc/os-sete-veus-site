import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Acesso digital ~ Os Sete Véus do Despertar";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Do livro físico ao digital",
    title: "Acesso digital gratuito",
    subtitle:
      "Compraste o livro físico? Tens direito ao conteúdo digital. Diário, comunidade e recursos exclusivos.",
    url: "seteveus.space/acesso-digital",
  });
}
