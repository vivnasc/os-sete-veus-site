import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qual veu te esconde? ~ Teste de autoconhecimento",
  description:
    "3 minutos. 7 perguntas. Descobre qual dos 7 veus mais te influencia neste momento. Teste gratuito, sem registo.",
  openGraph: {
    title: "Qual veu te esconde? ~ Teste gratuito",
    description:
      "3 minutos. 7 perguntas. Descobre qual veu te esconde. Teste de autoconhecimento gratuito d'Os Sete Veus do Despertar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qual veu te esconde? ~ Teste gratuito",
    description:
      "3 minutos. 7 perguntas. Descobre qual dos 7 veus mais te influencia. Gratuito, sem registo.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
