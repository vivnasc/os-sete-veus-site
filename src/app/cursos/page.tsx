import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursos de Autoconhecimento",
  description:
    "Dez cursos de autoconhecimento por Vivianne dos Santos. Cada curso comeca com um modulo gratuito. Jornadas de transformacao interior sobre dinheiro, relacoes, limites, perda, corpo e voz.",
};

const COURSE_LIST = [
  {
    slug: "ouro-proprio",
    number: 1,
    title: "Ouro Proprio",
    subtitle: "A relacao com dinheiro como espelho de ti",
  },
  {
    slug: "sangue-e-seda",
    number: 2,
    title: "Sangue e Seda",
    subtitle: "A heranca invisivel entre maes e filhas",
  },
  {
    slug: "a-arte-da-inteireza",
    number: 3,
    title: "A Arte da Inteireza",
    subtitle: "Amar sem te perderes no outro",
  },
  {
    slug: "depois-do-fogo",
    number: 4,
    title: "Depois do Fogo",
    subtitle: "Quando a vida te pede para comecar de novo",
  },
  {
    slug: "olhos-abertos",
    number: 5,
    title: "Olhos Abertos",
    subtitle: "Decidir a partir de clareza, nao de medo",
  },
  {
    slug: "a-pele-lembra",
    number: 6,
    title: "A Pele Lembra",
    subtitle: "Aprender a ouvir o corpo antes de a mente racionalizar",
  },
  {
    slug: "limite-sagrado",
    number: 7,
    title: "Limite Sagrado",
    subtitle: "Limites, o preco de agradar, a culpa da recusa",
  },
  {
    slug: "flores-no-escuro",
    number: 8,
    title: "Flores no Escuro",
    subtitle: "As perdas que nao sao morte mas doem como se fossem",
  },
  {
    slug: "o-peso-e-o-chao",
    number: 9,
    title: "O Peso e o Chao",
    subtitle: "Quando descansar nao resolve",
  },
  {
    slug: "voz-de-dentro",
    number: 10,
    title: "Voz de Dentro",
    subtitle: "Dizer o que precisas de dizer a quem mais importa",
  },
];

export default function CursosPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pb-12 pt-24 text-center sm:pt-32">
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-[#C9A96E]">
          Sete Ecos
        </p>
        <h1 className="font-serif text-4xl font-semibold text-gray-50 sm:text-5xl lg:text-6xl">
          Cursos
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400 sm:text-lg">
          Dez jornadas de transformacao interior. Cada uma comeca com um modulo
          gratuito -- para que sintas antes de decidires.
        </p>
        <div className="mx-auto mt-8 h-px w-16 bg-[#8B5CF6]/40" />
      </section>

      {/* Course grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSE_LIST.map((course) => (
            <Link
              key={course.slug}
              href={`/cursos/${course.slug}`}
              className="group relative flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#8B5CF6]/30 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(139,92,246,0.08)]"
            >
              {/* Course number */}
              <span className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#8B5CF6]/70">
                Curso {String(course.number).padStart(2, "0")}
              </span>

              {/* Title */}
              <h2 className="font-serif text-xl font-semibold text-gray-100 transition-colors group-hover:text-[#C9A96E]">
                {course.title}
              </h2>

              {/* Subtitle */}
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-gray-400">
                {course.subtitle}
              </p>

              {/* Footer: badge */}
              <div className="mt-6 flex items-center justify-between">
                <span className="inline-block rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-wider text-[#8B5CF6]">
                  Modulo 1 gratuito
                </span>
                <span className="font-sans text-xs text-gray-500 transition-colors group-hover:text-gray-300">
                  Explorar →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
