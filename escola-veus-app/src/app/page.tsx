"use client";

import Link from "next/link";
import Image from "next/image";
import { getCourseBySlug } from "@/data/courses";
import { COURSE_CATEGORIES } from "@/data/course-categories";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();
  const { allProgress, loading: progressLoading } = useProgress();

  const loading = authLoading || progressLoading;

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="text-sm text-escola-creme-50">A carregar...</div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  const inProgress = allProgress.filter((p) => !p.completed_at);
  const completed = allProgress.filter((p) => p.completed_at);
  const showDashboard = allProgress.length > 0;

  return (
    <div className="mx-auto max-w-lg px-4 pt-12 pb-8">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-semibold text-escola-dourado">
          Escola dos Veus
        </h1>
        <p className="mt-2 text-sm text-escola-creme-50">
          Ve o que estava invisivel.
        </p>
      </header>

      {showDashboard ? (
        <StudentDashboard inProgress={inProgress} completed={completed} />
      ) : (
        <CourseCatalog />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LANDING PAGE (unauthenticated)
   ═══════════════════════════════════════════════ */

function LandingPage() {
  // Pick 4 highlighted courses to show
  const highlightSlugs = [
    "ouro-proprio",
    "sangue-e-seda",
    "a-arte-da-inteireza",
    "depois-do-fogo",
  ];
  const highlights = highlightSlugs
    .map((s) => getCourseBySlug(s))
    .filter(Boolean);

  return (
    <div className="min-h-dvh">
      {/* ─── HERO ─── */}
      <section className="flex min-h-[85dvh] flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="relative mb-6 h-44 w-44 sm:h-56 sm:w-56">
          <Image
            src="/Escola-dos-veus-logo.png"
            alt="Escola dos Veus"
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(201,169,110,0.3)]"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="mb-10 max-w-sm font-serif text-xl leading-relaxed text-escola-creme sm:text-2xl">
          Ha coisas que toda a gente sente
          <br />
          e quase ninguem diz.
        </p>

        <p className="mb-10 max-w-xs text-sm leading-relaxed text-escola-creme-50">
          Cursos de autoconhecimento que comecam pelo corpo, passam pela vida
          real e ficam contigo.
        </p>

        {/* CTA */}
        <div className="w-full max-w-xs space-y-3">
          <Link
            href="/entrar"
            className="block w-full rounded-lg bg-escola-dourado px-4 py-3.5 text-center text-sm font-medium text-escola-bg transition-opacity hover:opacity-90"
          >
            Comecar a jornada
          </Link>
          <Link
            href="/entrar"
            className="block w-full rounded-lg border border-escola-dourado/30 px-4 py-3.5 text-center text-sm text-escola-creme-50 transition-colors hover:border-escola-dourado/60 hover:text-escola-creme"
          >
            Ja tenho conta — entrar
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 animate-bounce text-escola-creme-50/40">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ─── O QUE E ─── */}
      <section className="border-t border-escola-border/50 px-6 py-20">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-6 font-serif text-2xl font-medium text-escola-creme sm:text-3xl">
            O que e a Escola dos Veus?
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-escola-creme-50">
            Nao e terapia. Nao e coaching. Nao e espiritualidade. E um lugar
            onde entras para ver o que sempre esteve la mas nunca foi nomeado.
          </p>
          <p className="mb-8 text-sm leading-relaxed text-escola-creme-50">
            Cada curso e um territorio — uma zona da tua vida que precisas de
            atravessar com mais clareza. Os temas sao a vida real. O metodo e o
            corpo. A voz e de quem ja esteve onde tu estas.
          </p>
          <div className="mx-auto flex max-w-sm flex-col gap-4 sm:flex-row sm:gap-8">
            <Principle label="Comecar pelo corpo" desc="nao pela mente" />
            <Principle label="Vida real" desc="nao teoria" />
            <Principle label="Honestidade" desc="sem brutalidade" />
          </div>
        </div>
      </section>

      {/* ─── TERRITORIOS / CATEGORIAS ─── */}
      <section className="border-t border-escola-border/50 px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-serif text-2xl font-medium text-escola-creme sm:text-3xl">
              20 cursos. 4 territorios.
            </h2>
            <p className="text-sm text-escola-creme-50">
              Cada territorio agrupa cursos por zona de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COURSE_CATEGORIES.map((cat) => (
              <div
                key={cat.slug}
                className="rounded-xl border border-escola-border bg-escola-card/50 p-6"
              >
                <h3 className="mb-1 font-serif text-lg font-medium text-escola-dourado">
                  {cat.title}
                </h3>
                <p className="mb-4 text-xs text-escola-creme-50">
                  {cat.subtitle}
                </p>
                <ul className="space-y-1.5">
                  {cat.courses.map((slug) => {
                    const c = getCourseBySlug(slug);
                    if (!c) return null;
                    return (
                      <li
                        key={slug}
                        className="text-sm text-escola-creme/80"
                      >
                        {c.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURSOS EM DESTAQUE ─── */}
      <section className="border-t border-escola-border/50 px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-serif text-2xl font-medium text-escola-creme sm:text-3xl">
              Por onde comecar
            </h2>
            <p className="text-sm text-escola-creme-50">
              Quatro portas de entrada. Escolhe a que te chama.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((course) => {
              if (!course) return null;
              return (
                <div
                  key={course.slug}
                  className="group rounded-xl border border-escola-border bg-escola-card p-6 transition-colors hover:border-escola-dourado/40"
                >
                  <span className="mb-3 block text-[10px] uppercase tracking-widest text-escola-dourado/50">
                    {course.modules.length} modulos
                  </span>
                  <h3 className="mb-2 font-serif text-xl font-medium text-escola-creme">
                    {course.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-escola-creme-50">
                    {course.subtitle}
                  </p>
                  <p className="text-xs leading-relaxed text-escola-creme-50/70">
                    {course.diferencial}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section className="border-t border-escola-border/50 px-6 py-20">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-10 font-serif text-2xl font-medium text-escola-creme sm:text-3xl">
            Como funciona
          </h2>
          <div className="space-y-8 text-left">
            <Step
              n="1"
              title="Escolhe um curso"
              desc="Cada curso tem 8 modulos com video-aulas curtas. O modulo 1 e sempre gratuito."
            />
            <Step
              n="2"
              title="Assiste e sente"
              desc="Os exercicios sao experiencias, nao tarefas. Comecam no corpo, nao na mente."
            />
            <Step
              n="3"
              title="Escreve no teu caderno"
              desc="Cada modulo tem um caderno de exercicios. O teu espaco de reflexao."
            />
            <Step
              n="4"
              title="Avanca ao teu ritmo"
              desc="Sem prazos, sem pressao. O teu ritmo e o ritmo certo."
            />
          </div>
        </div>
      </section>

      {/* ─── SOBRE A VIVIANNE ─── */}
      <section className="border-t border-escola-border/50 px-6 py-20">
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-4 text-[10px] uppercase tracking-widest text-escola-dourado/50">
            Quem esta por detras
          </p>
          <h2 className="mb-6 font-serif text-2xl font-medium text-escola-creme">
            Vivianne dos Santos
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-escola-creme-50">
            Economista, escritora, mocambicana. Autora de <em>Os Sete Veus do
            Despertar</em> e da coleccao <em>Espelhos</em> — livros de ficcao
            transformativa onde a leitora se reconhece.
          </p>
          <p className="text-sm leading-relaxed text-escola-creme-50">
            A Escola dos Veus nasce da mesma visao: dar nome ao que sempre se
            sentiu mas nunca se disse. Com voz calma, sem jargao, ao ritmo de
            quem escuta.
          </p>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="border-t border-escola-border/50 px-6 py-24">
        <div className="mx-auto max-w-sm text-center">
          <div className="relative mx-auto mb-8 h-20 w-20">
            <Image
              src="/Escola-dos-veus-favicon.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <p className="mb-8 font-serif text-xl text-escola-creme">
            Ve o que estava invisivel.
          </p>
          <Link
            href="/entrar"
            className="inline-block rounded-lg bg-escola-dourado px-8 py-3.5 text-sm font-medium text-escola-bg transition-opacity hover:opacity-90"
          >
            Comecar agora
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-escola-border/30 px-6 py-8">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-[11px] text-escola-creme-50/40">
            Escola dos Veus — Vivianne dos Santos
          </p>
          <p className="mt-1 text-[10px] text-escola-creme-50/30">
            Os cursos desta escola nao substituem acompanhamento psicologico ou
            psiquiatrico.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Small components ─── */

function Principle({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex-1">
      <p className="text-sm font-medium text-escola-creme">{label},</p>
      <p className="text-xs text-escola-creme-50">{desc}.</p>
    </div>
  );
}

function Step({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-escola-dourado/30 font-serif text-sm text-escola-dourado">
        {n}
      </span>
      <div>
        <h3 className="mb-1 text-sm font-medium text-escola-creme">{title}</h3>
        <p className="text-sm leading-relaxed text-escola-creme-50">{desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   STUDENT DASHBOARD (authenticated + has courses)
   ═══════════════════════════════════════════════ */

function StudentDashboard({
  inProgress,
  completed,
}: {
  inProgress: Array<{
    course_slug: string;
    current_module: number;
    current_sublesson: string;
    modules_completed: number[];
    last_activity_at: string;
  }>;
  completed: Array<{ course_slug: string; completed_at: string | null }>;
}) {
  return (
    <>
      {inProgress.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-escola-dourado/60">
            Continuar
          </h2>
          <div className="space-y-3">
            {inProgress.map((p) => {
              const course = getCourseBySlug(p.course_slug);
              if (!course) return null;
              const totalModules = course.modules.length;
              const completedModules = p.modules_completed?.length ?? 0;
              const progressPct = Math.round(
                (completedModules / totalModules) * 100
              );

              return (
                <Link
                  key={p.course_slug}
                  href={`/cursos/${p.course_slug}/${p.current_module}/${p.current_sublesson.toLowerCase()}`}
                  className="block rounded-xl border border-escola-dourado/30 bg-escola-card p-5 transition-colors hover:border-escola-dourado/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-medium text-escola-creme">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs text-escola-creme-50">
                        Modulo {p.current_module}, Sub-aula{" "}
                        {p.current_sublesson}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-escola-dourado">
                      {progressPct}%
                    </span>
                  </div>

                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-escola-border">
                    <div
                      className="h-full rounded-full bg-escola-dourado transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <p className="mt-2 text-right text-[10px] text-escola-creme-50">
                    Continuar &rarr;
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-escola-dourado/60">
            Completos
          </h2>
          <div className="space-y-2">
            {completed.map((p) => {
              const course = getCourseBySlug(p.course_slug);
              if (!course) return null;
              return (
                <Link
                  key={p.course_slug}
                  href={`/cursos/${p.course_slug}/completo`}
                  className="flex items-center justify-between rounded-xl border border-escola-border bg-escola-card p-4 transition-colors hover:border-escola-dourado/40"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-escola-dourado"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-serif text-sm text-escola-creme">
                      {course.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-escola-creme-50">
                    {p.completed_at &&
                      new Date(p.completed_at).toLocaleDateString("pt-PT", {
                        day: "numeric",
                        month: "short",
                      })}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <Link
          href="/cursos"
          className="block rounded-xl border border-escola-border bg-escola-card p-4 text-center text-sm text-escola-creme-50 transition-colors hover:border-escola-dourado/40 hover:text-escola-creme"
        >
          Explorar mais cursos
        </Link>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════
   COURSE CATALOG (authenticated, no courses yet)
   ═══════════════════════════════════════════════ */

function CourseCatalog() {
  return (
    <>
      {COURSE_CATEGORIES.map((category) => (
        <section key={category.slug} className="mb-10">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-medium text-escola-creme">
              {category.title}
            </h2>
            <p className="text-xs text-escola-creme-50">
              {category.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            {category.courses.map((courseSlug) => {
              const course = getCourseBySlug(courseSlug);
              if (!course) return null;
              return (
                <Link
                  key={course.slug}
                  href={`/cursos/${course.slug}`}
                  className="block rounded-xl border border-escola-border bg-escola-card p-4 transition-colors hover:border-escola-dourado/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-medium text-escola-creme">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-escola-creme-50">
                        {course.subtitle}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-escola-dourado/60">
                      {course.modules.length} modulos
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
