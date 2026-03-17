import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Cursos de autoconhecimento por Vivianne dos Santos. Dez jornadas de transformacao interior, cada uma com modulo gratuito.",
  openGraph: {
    title: "Cursos ~ Sete Ecos",
    description:
      "Dez cursos de autoconhecimento. Cada um comeca com um modulo gratuito. Por Vivianne dos Santos.",
  },
};

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mundo-bg text-mundo-creme">
      {children}
    </div>
  );
}
