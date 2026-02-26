import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Entra na tua conta Os Sete Véus. Acede a leitura interactiva, diário reflexivo e comunidade.",
  openGraph: {
    title: "Entrar ~ Os Sete Véus",
    description:
      "Entra na tua conta e continua a tua jornada de autoconhecimento.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
