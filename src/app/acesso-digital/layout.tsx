import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acesso digital ~ Os 7 Veus do Despertar",
  description:
    "Activa o teu acesso digital ao livro Os 7 Veus do Despertar. Leitura interactiva, diario reflexivo, comunidade anonima e chatbot de apoio.",
  openGraph: {
    title: "Acesso digital ~ Os Sete Veus",
    description:
      "Activa o teu acesso ao livro digital. Leitura interactiva, diario reflexivo e comunidade anonima incluidos.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
