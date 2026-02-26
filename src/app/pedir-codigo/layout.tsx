import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pede o teu código de acesso digital",
  description:
    "Compraste o livro físico Os 7 Véus do Despertar? Tens direito a acesso digital gratuito. Preenche o formulário e recebe o teu código em até 24 horas.",
  openGraph: {
    title: "Pede o teu código de acesso digital ~ Os Sete Véus",
    description:
      "Se já compraste o livro físico, o acesso digital é gratuito. Diário reflexivo, comunidade anónima e conteúdo exclusivo. Código em até 24h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pede o teu código de acesso digital ~ Os Sete Véus",
    description:
      "Compraste o livro físico? O acesso digital é gratuito. Preenche o formulário e recebe o teu código em até 24h.",
  },
};

export default function PedirCodigoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
