import { generateOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Qual veu te esconde? ~ Teste de autoconhecimento gratuito";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    label: "Teste gratuito ~ 3 minutos",
    title: "Qual veu te esconde?",
    subtitle:
      "7 perguntas. Descobre qual dos 7 veus mais te influencia neste momento. Sem registo.",
    url: "seteveus.space/recursos/teste",
    accentColor: "#8b9e8b",
  });
}
