import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Pede o teu codigo de acesso digital ~ Os Sete Veus";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Os Sete Veus do Despertar",
    title: "Pede o teu codigo",
    subtitle:
      "Compraste o livro fisico? O acesso digital e gratuito. Preenche o formulario e recebe o teu codigo em ate 24h.",
    url: "seteveus.space/pedir-codigo",
  });
}
