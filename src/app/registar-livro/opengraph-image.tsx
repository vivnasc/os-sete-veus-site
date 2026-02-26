import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Registar código do livro físico ~ Os Sete Véus";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Os Sete Véus do Despertar",
    title: "Registar o teu código",
    subtitle:
      "Insere o código LIVRO-XXXXX e activa o acesso digital gratuito. Acesso imediato.",
    url: "seteveus.space/registar-livro",
  });
}
