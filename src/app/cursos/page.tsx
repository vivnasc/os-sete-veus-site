import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursos de Autoconhecimento — A Escola dos Véus",
  description:
    "Vinte cursos de autoconhecimento por Vivianne dos Santos. Jornadas de transformação interior sobre dinheiro, relações, limites, perda, corpo, voz, raiva, maternidade, trabalho, tempo e poder.",
};

const COURSE_LIST = [
  {
    slug: "ouro-proprio",
    number: 1,
    title: "Ouro Próprio",
    subtitle: "A relação com dinheiro como espelho de ti",
    tag: "Em breve",
  },
  {
    slug: "sangue-e-seda",
    number: 2,
    title: "Sangue e Seda",
    subtitle: "A herança invisível entre mães e filhas",
    tag: null,
  },
  {
    slug: "a-arte-da-inteireza",
    number: 3,
    title: "A Arte da Inteireza",
    subtitle: "Amar sem te perderes no outro",
    tag: null,
  },
  {
    slug: "depois-do-fogo",
    number: 4,
    title: "Depois do Fogo",
    subtitle: "Quando a vida te pede para começar de novo",
    tag: null,
  },
  {
    slug: "olhos-abertos",
    number: 5,
    title: "Olhos Abertos",
    subtitle: "Decidir a partir de clareza, não de medo",
    tag: null,
  },
  {
    slug: "pele-nua",
    number: 6,
    title: "Pele Nua",
    subtitle: "Aprender a ouvir o corpo antes de a mente racionalizar",
    tag: null,
  },
  {
    slug: "limite-sagrado",
    number: 7,
    title: "Limite Sagrado",
    subtitle: "Limites, o preço de agradar, a culpa da recusa",
    tag: null,
  },
  {
    slug: "flores-no-escuro",
    number: 8,
    title: "Flores no Escuro",
    subtitle: "As perdas que não são morte mas doem como se fossem",
    tag: null,
  },
  {
    slug: "o-peso-e-o-chao",
    number: 9,
    title: "O Peso e o Chão",
    subtitle: "Quando descansar não resolve",
    tag: null,
  },
  {
    slug: "voz-de-dentro",
    number: 10,
    title: "Voz de Dentro",
    subtitle: "Dizer o que precisas de dizer a quem mais importa",
    tag: null,
  },
  {
    slug: "o-fio-invisivel",
    number: 11,
    title: "O Fio Invisível",
    subtitle: "A ligação entre todos nós e como a tua cura toca o todo",
    tag: null,
  },
  {
    slug: "o-espelho-do-outro",
    number: 12,
    title: "O Espelho do Outro",
    subtitle: "O que te incomoda no outro vive em ti",
    tag: null,
  },
  {
    slug: "o-silencio-que-grita",
    number: 13,
    title: "O Silêncio que Grita",
    subtitle: "O que a tua família nunca disse vive no teu corpo",
    tag: null,
  },
  {
    slug: "a-teia",
    number: 14,
    title: "A Teia",
    subtitle: "Pertencer sem desaparecer",
    tag: null,
  },
  {
    slug: "a-chama",
    number: 15,
    title: "A Chama",
    subtitle: "A raiva que nunca te deixaram sentir",
    tag: null,
  },
  {
    slug: "a-mulher-antes-de-mae",
    number: 16,
    title: "A Mulher Antes de Mãe",
    subtitle: "Quem eras antes de seres de alguém",
    tag: null,
  },
  {
    slug: "o-oficio-de-ser",
    number: 17,
    title: "O Ofício de Ser",
    subtitle: "Quando o trabalho te define e o propósito te escapa",
    tag: null,
  },
  {
    slug: "o-relogio-partido",
    number: 18,
    title: "O Relógio Partido",
    subtitle: "A relação com o tempo que te rouba o presente",
    tag: null,
  },
  {
    slug: "a-coroa-escondida",
    number: 19,
    title: "A Coroa Escondida",
    subtitle: "O poder que tens e te assusta",
    tag: null,
  },
  {
    slug: "a-fome",
    number: 20,
    title: "A Fome",
    subtitle: "O que comes quando não tens fome de comida",
    tag: null,
  },
];

export default function CursosPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pb-12 pt-24 text-center sm:pt-32">
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-[#C9A96E]">
          A Escola dos Véus
        </p>
        <h1 className="font-serif text-4xl font-semibold text-gray-50 sm:text-5xl lg:text-6xl">
          Cursos
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400 sm:text-lg">
          Vinte jornadas de transformação interior. Cada uma é um território
          — uma zona da tua vida que precisas de atravessar com mais clareza.
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

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between">
                {course.tag ? (
                  <span className="inline-block rounded-full border border-[#C9A96E]/20 bg-[#C9A96E]/10 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-wider text-[#C9A96E]">
                    {course.tag}
                  </span>
                ) : (
                  <span />
                )}
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
