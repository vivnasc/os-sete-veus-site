import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coleccao Espelhos ~ Experiencia digital",
  description:
    "7 historias de ficcao psicologica onde te reconheces. Leitura interactiva com diario reflexivo, respiracao guiada e comunidade anonima. A partir de $29 USD.",
  openGraph: {
    title: "Coleccao Espelhos ~ Os Sete Veus",
    description:
      "Ficcao psicologica com leitura interactiva, diario reflexivo e comunidade anonima. A experiencia que te devolve a ti mesma. A partir de $29.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
