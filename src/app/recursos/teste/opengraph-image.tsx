import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Qual Espelho combina contigo? ~ Teste de autoconhecimento gratuito";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Teste gratuito ~ 3 minutos",
    title: "Qual Espelho combina contigo?",
    subtitle:
      "7 perguntas. Descobre qual dos 7 Espelhos faz mais sentido para ti neste momento. Sem registo.",
    url: "seteveus.space/recursos/teste",
    accentColor: "#8b9e8b",
  });
}
