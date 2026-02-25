import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidade Ecos",
  description:
    "Reflexoes anonimas, impermanentes. Reconhecimentos silenciosos. Sussurros de uma so via. A comunidade onde as vozes se encontram sem se conhecerem.",
  openGraph: {
    title: "Comunidade Ecos ~ Os Sete Veus",
    description:
      "Reflexoes anonimas e impermanentes. Aqui, a conexao acontece por reconhecimento, nao por interaccao. Tudo e anonimo. Tudo desaparece.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
