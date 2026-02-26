import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registar código do livro físico",
  description:
    "Insere o teu código LIVRO-XXXXX para activar o acesso digital gratuito a Os 7 Véus do Despertar. Acesso imediato ao conteúdo digital e comunidade.",
  openGraph: {
    title: "Registar código do livro ~ Os Sete Véus",
    description:
      "Insere o teu código LIVRO-XXXXX e activa o acesso digital gratuito. Leitura interactiva, diário reflexivo e comunidade.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
