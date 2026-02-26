import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acesso digital ~ Os 7 Véus do Despertar",
  description:
    "Activa o teu acesso digital ao livro Os 7 Véus do Despertar. Leitura interactiva, diário reflexivo, comunidade anónima e chatbot de apoio.",
  openGraph: {
    title: "Acesso digital ~ Os Sete Véus",
    description:
      "Activa o teu acesso ao livro digital. Leitura interactiva, diário reflexivo e comunidade anónima incluídos.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
