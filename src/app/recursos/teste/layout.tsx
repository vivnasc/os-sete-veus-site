import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qual veu te esconde? ~ Teste de autoconhecimento",
  description:
    "3 minutos. 7 perguntas. Descobre qual dos 7 veus mais te influencia neste momento. Teste gratuito, sem registo.",
  openGraph: {
    title: "Qual veu te esconde? ~ Teste gratuito",
    description:
      "3 minutos. 7 perguntas. Descobre qual veu te esconde. Teste de autoconhecimento gratuito d'Os Sete Veus do Despertar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Qual veu te esconde? — Teste de autoconhecimento Os Sete Veus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qual veu te esconde? ~ Teste gratuito",
    description:
      "3 minutos. 7 perguntas. Descobre qual dos 7 veus mais te influencia. Gratuito, sem registo.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
