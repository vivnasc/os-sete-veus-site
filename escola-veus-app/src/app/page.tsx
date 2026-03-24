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

  if (user) {
    const inProgress = allProgress.filter((p) => !p.completed_at);
    const completed = allProgress.filter((p) => p.completed_at);

    return (
      <div className="min-h-dvh">
        <div className="mx-auto max-w-screen-lg px-6 pt-8 pb-32">
          {/* Header */}
          <header className="mb-10 text-center">
            <div className="relative mx-auto mb-6 h-32 w-32 sm:h-40 sm:w-40">
              <Image
                src="/Escola-dos-veus-logo.png"
                alt="Escola dos Véus"
                fill
                className="object-contain drop-shadow-[0_0_24px_rgba(201,169,110,0.3)]"
                priority
              />
            </div>
          </header>

          {/* Continuar */}
          {inProgress.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-xs uppercase tracking-widest text-escola-dourado/60">
                Continuar
              </h2>
              <div className="space-y-3">
                {inProgress.map((p) => {
                  const course = getCourseBySlug(p.course_slug);
                  if (!course) return null;
                  const totalModules = course.modules.length;
                  const completedModules = p.modules_completed?.length ?? 0;
                  const pct = Math.round((completedModules / totalModules) * 100);
                  return (
                    <Link
                      key={p.course_slug}
                      href={`/cursos/${p.course_slug}/${p.current_module}/${p.current_sublesson.toLowerCase()}`}
                      className="block rounded-xl border border-escola-dourado/30 bg-escola-card p-5 transition-colors hover:border-escola-dourado/50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-lg font-medium text-escola-creme">
                            {course.title}
                          </h3>
                          <p className="mt-1 text-xs text-escola-creme-50">
                            Módulo {p.current_module}, Sub-aula {p.current_sublesson}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-escola-dourado">{pct}%</span>
                      </div>
                      <div className="mt-3 h-1 rounded-full bg-escola-border">
                        <div className="h-full rounded-full bg-escola-dourado" style={{ width: `${pct}%` }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Completos */}
          {completed.length > 0 && (
            <section className="mb-12">
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
                        <svg className="h-5 w-5 text-escola-dourado" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-serif text-sm text-escola-creme">{course.title}</span>
                      </div>
                      <span className="text-[10px] text-escola-creme-50">
                        {p.completed_at && new Date(p.completed_at).toLocaleDateString("pt-PT", { day: "numeric", month: "short" })}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Catálogo por categoria */}
          {COURSE_CATEGORIES.map((cat) => (
            <section key={cat.slug} className="mb-12">
              <h2 className="font-serif text-xl font-semibold text-escola-creme mb-1">
                {cat.title}
              </h2>
              <p className="text-sm text-escola-creme-50 mb-4">{cat.subtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.courses.map((slug) => {
                  const course = getCourseBySlug(slug);
                  if (!course) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/cursos/${slug}`}
                      className="group block rounded-xl border border-escola-border bg-white/[0.03] p-4 transition-colors hover:border-escola-dourado/40 hover:bg-white/[0.06]"
                    >
                      <h3 className="font-serif text-base font-medium text-escola-creme">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs text-escola-creme-50 leading-relaxed">
                        {course.subtitle}
                      </p>
                      <p className="mt-2 text-[10px] text-escola-dourado/50">
                        {course.modules.length} módulos
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════
     VISITANTE (não autenticado)
     Hero compacto + catálogo + CTA entrar/registar
     ═══════════════════════════════════════════════ */
  return (
    <div className="min-h-dvh">
      {/* Hero */}
      <div className="flex flex-col items-center text-center px-6 pt-12 pb-14">
        <div className="relative h-48 w-48 sm:h-60 sm:w-60 mb-6">
          <Image
            src="/Escola-dos-veus-logo.png"
            alt="Escola dos Véus"
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(201,169,110,0.35)]"
            priority
          />
        </div>
        <p className="font-serif text-xl sm:text-2xl text-escola-creme/70 italic mb-8">
          Vê o que estava invisível.
        </p>
        <div className="w-full max-w-xs space-y-3">
          <Link
            href="/entrar"
            className="block w-full rounded-lg bg-escola-dourado px-4 py-3.5 text-center text-sm font-medium text-escola-bg transition-opacity hover:opacity-90"
          >
            Entrar
          </Link>
          <Link
            href="/registar"
            className="block w-full rounded-lg border border-escola-dourado/30 px-4 py-3.5 text-center text-sm text-escola-creme-50 transition-colors hover:border-escola-dourado/60 hover:text-escola-creme"
          >
            Criar conta
          </Link>
        </div>
      </div>

      {/* Catálogo */}
      <div className="max-w-screen-lg mx-auto px-6 space-y-12 pb-32">
        <p className="text-center text-sm text-escola-creme-50">
          20 cursos de autoconhecimento. 4 territórios.
        </p>

        {COURSE_CATEGORIES.map((cat) => (
          <section key={cat.slug}>
            <h2 className="font-serif text-xl font-semibold text-escola-creme mb-1">
              {cat.title}
            </h2>
            <p className="text-sm text-escola-creme-50 mb-4">{cat.subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.courses.map((slug) => {
                const course = getCourseBySlug(slug);
                if (!course) return null;
                return (
                  <div
                    key={slug}
                    className="rounded-xl border border-escola-border bg-white/[0.03] p-4"
                  >
                    <h3 className="font-serif text-base font-medium text-escola-creme">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-escola-creme-50 leading-relaxed">
                      {course.subtitle}
                    </p>
                    <p className="mt-2 text-[10px] text-escola-dourado/50">
                      {course.modules.length} módulos
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* CTA final */}
        <div className="text-center pt-4 pb-8">
          <Link
            href="/entrar"
            className="inline-block rounded-lg bg-escola-dourado px-8 py-3 text-sm font-medium text-escola-bg transition-opacity hover:opacity-90"
          >
            Entrar na escola
          </Link>
          <p className="mt-4 text-[11px] text-escola-creme-50/40">
            Uma escola de autoconhecimento criada por Vivianne dos Santos.
          </p>
        </div>
      </div>
    </div>
  );
}
