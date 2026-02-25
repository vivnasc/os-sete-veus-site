import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Registar codigo do livro fisico ~ Os Sete Veus";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Os Sete Veus do Despertar",
    title: "Registar o teu codigo",
    subtitle:
      "Insere o codigo LIVRO-XXXXX e activa o acesso digital gratuito. Acesso imediato.",
    url: "seteveus.space/registar-livro",
  });
}
