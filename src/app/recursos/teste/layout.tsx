import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qual Espelho combina contigo? ~ Teste de autoconhecimento",
  description:
    "3 minutos. 7 perguntas. Descobre qual dos 7 Espelhos faz mais sentido para ti neste momento. Teste gratuito, sem registo.",
  openGraph: {
    title: "Qual Espelho combina contigo? ~ Teste gratuito",
    description:
      "3 minutos. 7 perguntas. Descobre qual Espelho combina contigo. Teste de autoconhecimento gratuito d'Os Sete Véus do Despertar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qual Espelho combina contigo? ~ Teste gratuito",
    description:
      "3 minutos. 7 perguntas. Descobre qual dos 7 Espelhos faz mais sentido para ti. Gratuito, sem registo.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
