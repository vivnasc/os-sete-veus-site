import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidade Ecos",
  description:
    "Reflexões anónimas, impermanentes. Reconhecimentos silenciosos. Sussurros de uma só via. A comunidade onde as vozes se encontram sem se conhecerem.",
  openGraph: {
    title: "Comunidade Ecos ~ Os Sete Véus",
    description:
      "Reflexões anónimas e impermanentes. Aqui, a conexão acontece por reconhecimento, não por interacção. Tudo é anónimo. Tudo desaparece.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
