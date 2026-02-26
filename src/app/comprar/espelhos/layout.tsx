import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colecção Espelhos ~ Experiência digital",
  description:
    "7 histórias de ficção psicológica onde te reconheces. Leitura interactiva com diário reflexivo, respiração guiada e comunidade anónima. A partir de $29 USD.",
  openGraph: {
    title: "Colecção Espelhos ~ Os Sete Véus",
    description:
      "Ficção psicológica com leitura interactiva, diário reflexivo e comunidade anónima. A experiência que te devolve a ti mesma. A partir de $29.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
