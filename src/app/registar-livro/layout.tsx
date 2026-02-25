import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registar codigo do livro fisico",
  description:
    "Insere o teu codigo LIVRO-XXXXX para activar o acesso digital gratuito a Os 7 Veus do Despertar. Acesso imediato ao conteudo digital e comunidade.",
  openGraph: {
    title: "Registar codigo do livro ~ Os Sete Veus",
    description:
      "Insere o teu codigo LIVRO-XXXXX e activa o acesso digital gratuito. Leitura interactiva, diario reflexivo e comunidade.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Os Sete Veus do Despertar — Registar codigo de acesso",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
