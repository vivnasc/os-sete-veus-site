"use client";

import Link from "next/link";
import { COURSES, getCourseBySlug } from "@/data/courses";
import { COURSE_CATEGORIES } from "@/data/course-categories";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();
  const { allProgress, loading: progressLoading } = useProgress();

  const loading = authLoading || progressLoading;

  // Courses in progress (sorted by last activity)
  const inProgress = allProgress.filter((p) => !p.completed_at);
  const completed = allProgress.filter((p) => p.completed_at);

  const showDashboard = user && allProgress.length > 0;

  return (
    <div className="mx-auto max-w-lg px-4 pt-12 pb-8">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-semibold text-escola-dourado">
          Escola dos Veus
        </h1>
        <p className="mt-2 text-sm text-escola-creme-50">
          Ve o que estava invisivel.
        </p>
      </header>

      {loading ? (
        <div className="py-12 text-center text-sm text-escola-creme-50">
          A carregar...
        </div>
      ) : showDashboard ? (
        <StudentDashboard
          inProgress={inProgress}
          completed={completed}
        />
      ) : (
        <CourseCatalog />
      )}
    </div>
  );
}

function StudentDashboard({
  inProgress,
  completed,
}: {
  inProgress: Array<{ course_slug: string; current_module: number; current_sublesson: string; modules_completed: number[]; last_activity_at: string }>;
  completed: Array<{ course_slug: string; completed_at: string | null }>;
}) {
  return (
    <>
      {/* Continue where you left off */}
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
              const progressPct = Math.round((completedModules / totalModules) * 100);

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
                        Modulo {p.current_module}, Sub-aula {p.current_sublesson}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-escola-dourado">
                      {progressPct}%
                    </span>
                  </div>

                  {/* Progress bar */}
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

      {/* Completed courses */}
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
                    <svg className="h-5 w-5 shrink-0 text-escola-dourado" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-serif text-sm text-escola-creme">
                      {course.title}
                    </span>
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

      {/* Explore more */}
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

function CourseCatalog() {
  return (
    <>
      {COURSE_CATEGORIES.map((category) => (
        <section key={category.slug} className="mb-10">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-medium text-escola-creme">
              {category.title}
            </h2>
            <p className="text-xs text-escola-creme-50">{category.subtitle}</p>
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
