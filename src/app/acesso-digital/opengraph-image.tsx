import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Acesso digital ~ Os Sete Veus do Despertar";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Do livro fisico ao digital",
    title: "Acesso digital gratuito",
    subtitle:
      "Compraste o livro fisico? Tens direito ao conteudo digital. Diario, comunidade e recursos exclusivos.",
    url: "seteveus.space/acesso-digital",
  });
}
