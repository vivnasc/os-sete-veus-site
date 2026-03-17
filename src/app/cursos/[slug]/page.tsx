import Link from "next/link";
import type { Metadata } from "next";

const COURSE_LIST: Record<
  string,
  {
    number: number;
    title: string;
    subtitle: string;
    arcoEmocional: string;
    diferencial: string;
    modules: {
      number: number;
      title: string;
      description: string;
      subLessons: { letter: string; title: string }[];
      workbook: string | null;
    }[];
    youtubeHooks: { title: string; durationMin: number }[];
  }
> = {
  "ouro-proprio": {
    number: 1,
    title: "Ouro Próprio",
    subtitle: "A relação com dinheiro como espelho de ti",
    arcoEmocional:
      "Começa pelo desconforto de olhar para números. Passa pela descoberta dos padrões herdados. Atravessa a vergonha, a culpa de querer mais, o medo de perder. Chega à reconstrução. Termina com direcção.",
    diferencial:
      "Não é um curso de finanças pessoais. Ensina a desfazer o nó emocional que impede a mulher de ganhar, guardar e gastar de forma alinhada com quem ela realmente é.",
    modules: [
      {
        number: 1,
        title: "O Extracto como Espelho",
        description: "A relação com dinheiro começa por olhar.",
        subLessons: [
          { letter: "A", title: "O medo de olhar" },
          { letter: "B", title: "Ler o extracto como um diário" },
          { letter: "C", title: "O corpo e o dinheiro" },
        ],
        workbook: "Mapa financeiro emocional",
      },
    ],
    youtubeHooks: [],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSE_LIST[slug];
  const title = course?.title ?? "Curso";
  return {
    title: `${title} — A Escola dos Véus`,
    description: course?.subtitle,
  };
}

export default async function CourseLandingPage({ params }: PageProps) {
  const { slug } = await params;

  let course;
  try {
    const { getCourseBySlug } = await import("@/data/courses");
    course = getCourseBySlug(slug);
  } catch {
    course = COURSE_LIST[slug];
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-mundo-muted">Curso não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mundo-bg text-mundo-creme-suave">
      {/* Hero */}
      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto text-center">
        <p className="text-mundo-violeta text-sm font-sans tracking-widest uppercase mb-4">
          Curso {course.number}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
          {course.title}
        </h1>
        <p className="text-xl text-mundo-dourado mb-8">{course.subtitle}</p>
        <p className="text-mundo-muted max-w-2xl mx-auto leading-relaxed">
          {course.arcoEmocional}
        </p>
      </section>

      {/* CTA */}
      <section className="px-6 pb-12 max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`/cursos/${slug}/dashboard`}
          className="inline-block bg-mundo-violeta text-white px-8 py-3 rounded-lg font-sans text-center hover:bg-mundo-violeta/80 transition-colors"
        >
          Inscrever-me neste curso
        </Link>
        <a
          href="#modulos"
          className="inline-block border border-[#C9A96E] text-mundo-dourado px-8 py-3 rounded-lg font-sans text-center hover:bg-[#C9A96E]/10 transition-colors"
        >
          Ver módulos
        </a>
      </section>

      {/* What's included */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-mundo-bg-surface rounded-xl p-6">
            <p className="text-2xl font-serif text-white">
              {course.modules?.length ?? 8}
            </p>
            <p className="text-sm text-mundo-muted mt-1">Módulos</p>
          </div>
          <div className="bg-mundo-bg-surface rounded-xl p-6">
            <p className="text-2xl font-serif text-white">
              {course.modules?.reduce(
                (a: number, m: { subLessons: unknown[] }) =>
                  a + m.subLessons.length,
                0
              ) ?? "~24"}
            </p>
            <p className="text-sm text-mundo-muted mt-1">Vídeos curtos</p>
          </div>
          <div className="bg-mundo-bg-surface rounded-xl p-6">
            <p className="text-2xl font-serif text-white">1</p>
            <p className="text-sm text-mundo-muted mt-1">Manual PDF</p>
          </div>
          <div className="bg-mundo-bg-surface rounded-xl p-6">
            <p className="text-2xl font-serif text-white">
              {course.modules?.length ?? 8}
            </p>
            <p className="text-sm text-mundo-muted mt-1">
              Cadernos de exercícios
            </p>
          </div>
        </div>
      </section>

      {/* Modules list */}
      <section id="modulos" className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl text-white mb-8">
          O que vais explorar
        </h2>
        <div className="space-y-4">
          {(course.modules ?? []).map(
            (mod: {
              number: number;
              title: string;
              description: string;
              subLessons: { letter: string; title: string }[];
              workbook: string | null;
            }) => (
              <details
                key={mod.number}
                className="group bg-mundo-bg-surface rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                  <div className="flex items-center gap-4">
                    <span className="text-mundo-violeta font-sans text-sm font-medium w-8">
                      {String(mod.number).padStart(2, "0")}
                    </span>
                    <span className="text-white font-serif">{mod.title}</span>
                  </div>
                  <span className="text-mundo-muted group-open:rotate-180 transition-transform">
                    &#9662;
                  </span>
                </summary>
                <div className="px-6 pb-5 border-t border-[#1a1a2e]">
                  <p className="text-mundo-muted text-sm mt-4 mb-3">
                    {mod.description}
                  </p>
                  <ul className="space-y-2">
                    {mod.subLessons.map(
                      (sub: { letter: string; title: string }) => (
                        <li
                          key={sub.letter}
                          className="flex items-center gap-3 text-sm"
                        >
                          <span className="text-mundo-violeta font-sans font-medium">
                            {sub.letter})
                          </span>
                          <span className="text-[#c0c0d0]">{sub.title}</span>
                        </li>
                      )
                    )}
                  </ul>
                  {mod.workbook && (
                    <p className="text-xs text-mundo-dourado mt-3">
                      Caderno: {mod.workbook}
                    </p>
                  )}
                </div>
              </details>
            )
          )}
        </div>
      </section>

      {/* YouTube hooks */}
      {course.youtubeHooks && course.youtubeHooks.length > 0 && (
        <section className="px-6 py-12 max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl text-white mb-6">
            Vídeos gratuitos no YouTube
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {course.youtubeHooks.map(
              (hook: { title: string; durationMin: number }, i: number) => (
                <div key={i} className="bg-mundo-bg-surface rounded-xl p-5">
                  <p className="text-mundo-creme-suave text-sm mb-2">{hook.title}</p>
                  <p className="text-xs text-mundo-muted">
                    {hook.durationMin} min
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Diferencial */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <div className="bg-mundo-bg-surface border border-[#8B5CF6]/20 rounded-xl p-8">
          <h2 className="font-serif text-xl text-white mb-4">
            O que torna este curso diferente
          </h2>
          <p className="text-mundo-muted leading-relaxed">{course.diferencial}</p>
        </div>
      </section>

      {/* Pricing + CTA */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <p className="text-mundo-muted text-sm mb-2">
          Curso completo:
        </p>
        <p className="text-4xl font-serif text-white mb-2">$49</p>
        <p className="text-sm text-mundo-muted mb-8">USD / ~3100 MZN</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/cursos/${slug}/dashboard`}
            className="inline-block bg-mundo-violeta text-white px-8 py-3 rounded-lg font-sans hover:bg-mundo-violeta/80 transition-colors"
          >
            Inscrever-me
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <p className="text-xs text-[#606070] text-center">
          Este curso não substitui acompanhamento psicológico ou psiquiátrico.
        </p>
      </section>
    </div>
  );
}
