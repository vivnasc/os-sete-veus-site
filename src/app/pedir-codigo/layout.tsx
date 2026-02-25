import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pede o teu codigo de acesso digital",
  description:
    "Compraste o livro fisico Os 7 Veus do Despertar? Tens direito a acesso digital gratuito. Preenche o formulario e recebe o teu codigo em ate 24 horas.",
  openGraph: {
    title: "Pede o teu codigo de acesso digital ~ Os Sete Veus",
    description:
      "Se ja compraste o livro fisico, o acesso digital e gratuito. Diario reflexivo, comunidade anonima e conteudo exclusivo. Codigo em ate 24h.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Os Sete Veus do Despertar — Pede o teu codigo de acesso digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pede o teu codigo de acesso digital ~ Os Sete Veus",
    description:
      "Compraste o livro fisico? O acesso digital e gratuito. Preenche o formulario e recebe o teu codigo em ate 24h.",
    images: ["/og-image.png"],
  },
};

export default function PedirCodigoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
