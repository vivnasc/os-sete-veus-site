import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Pede o teu código de acesso digital ~ Os Sete Véus";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Os Sete Véus do Despertar",
    title: "Pede o teu código",
    subtitle:
      "Compraste o livro físico? O acesso digital é gratuito. Preenche o formulário e recebe o teu código em até 24h.",
    url: "seteveus.space/pedir-codigo",
  });
}
