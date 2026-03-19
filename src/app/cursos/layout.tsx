import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Cursos de autoconhecimento por Vivianne dos Santos. Dez jornadas de transformação interior, cada uma com módulo gratuito.",
  openGraph: {
    title: "Cursos ~ Sete Ecos",
    description:
      "Dez cursos de autoconhecimento. Cada um começa com um módulo gratuito. Por Vivianne dos Santos.",
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
