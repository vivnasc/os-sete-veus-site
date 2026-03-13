"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useAccess } from "@/hooks/useAccess";
import { getCourse } from "@/data/courses";
import { loadCourse, courseProgressKey } from "@/lib/content-registry";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import type { Lesson } from "@/data/courses";

export default function CourseHubPage() {
  const params = useParams();
  const router = useRouter();
  const cursoSlug = params.curso as string;
  const { user, loading: authLoading } = useAuth();
  const { hasCoursesAccess, isAdmin } = useAccess();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courseMeta, setCourseMeta] = useState<{ title: string; subtitle: string; author: string; intro: string } | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const course = getCourse(cursoSlug);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (cursoSlug) {
      loadCourse(cursoSlug).then((mod) => {
        if (mod) {
          setLessons(mod.lessons);
          setCourseMeta(mod.courseMeta);
        }
      });
    }
  }, [cursoSlug]);

  const loadProgress = useCallback(async () => {
    try {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("reading_progress")
        .select("chapter_slug, completed")
        .eq("user_id", userId)
        .like("chapter_slug", `curso-${cursoSlug}/%`);

      if (data) {
        const map: Record<string, boolean> = {};
        data.forEach((row) => {
          map[row.chapter_slug] = row.completed;
        });
        setProgress(map);
      }
    } catch {
      // Connection error
    }
    setLoading(false);
  }, [cursoSlug]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  if (!course) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-brown-900">Curso nao encontrado</h1>
          <Link href="/cursos" className="mt-4 inline-block text-sm text-sage hover:text-sage-dark">
            Ver todos os cursos
          </Link>
        </div>
      </section>
    );
  }

  if (!hasCoursesAccess && !isAdmin) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-lg text-center">
          <div
            className="mx-auto mb-6 h-1 w-16 rounded-full"
            style={{ backgroundColor: course.color }}
          />
          <h1 className="font-serif text-3xl text-brown-900">{course.title}</h1>
          <p className="mt-2 font-serif text-base italic text-brown-500">
            {course.subtitle}
          </p>
          <p className="mt-6 font-serif text-sm leading-relaxed text-brown-600">
            {course.longDescription}
          </p>
          <Link
            href={`/comprar/cursos?curso=${course.slug}`}
            className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors"
            style={{ backgroundColor: course.color }}
          >
            Adquirir este curso · ${course.priceUSD}
          </Link>
        </div>
      </section>
    );
  }

  const completedCount = lessons.filter(
    (l) => progress[courseProgressKey(cursoSlug, l.slug)]
  ).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/membro/cursos"
            className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400 transition-colors hover:text-brown-600"
          >
            &larr; Todos os cursos
          </Link>
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full"
            style={{ backgroundColor: course.color }}
          />
          <p className="mt-4 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
            Curso · {course.lessons} licoes
          </p>
          <h1 className="mt-2 font-serif text-3xl text-brown-900">
            {course.title}
          </h1>
          <p className="mt-1 font-serif text-base italic text-brown-500">
            {course.subtitle}
          </p>
        </div>

        {/* Intro */}
        {courseMeta && (
          <div className="mt-8 rounded-2xl border border-brown-100 bg-white p-6">
            <p className="font-serif text-sm leading-relaxed text-brown-600">
              {courseMeta.intro}
            </p>
          </div>
        )}

        {/* Progress bar */}
        {!loading && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-brown-400">
              <span>
                {completedCount === 0
                  ? "Pronta para comecar"
                  : completedCount === lessons.length
                    ? "Curso completo"
                    : `${completedCount} de ${lessons.length} licoes`}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brown-50">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${progressPercent}%`,
                  background: `linear-gradient(to right, ${course.color}, ${course.color}dd)`,
                }}
              />
            </div>
          </div>
        )}

        {/* Lessons list */}
        <div className="mt-8 space-y-3">
          {lessons.map((lesson, index) => {
            const key = courseProgressKey(cursoSlug, lesson.slug);
            const isCompleted = progress[key];
            const prevCompleted = index === 0 || progress[courseProgressKey(cursoSlug, lessons[index - 1].slug)];
            const isLocked = index > 0 && !prevCompleted && !isAdmin;
            const isNext = !isCompleted && prevCompleted;

            return (
              <div key={lesson.slug}>
                {isLocked ? (
                  <div className="flex items-center gap-4 rounded-2xl border border-brown-50 bg-white/60 p-5 opacity-50">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white/70"
                      style={{ backgroundColor: course.color + "60" }}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-serif text-base text-brown-400">
                        {lesson.title}
                      </p>
                      <p className="font-sans text-xs text-brown-300">
                        {lesson.subtitle}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/membro/cursos/${cursoSlug}/${lesson.slug}`}
                    className={`flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${
                      isNext ? "border-sage/30" : "border-brown-50"
                    }`}
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                      style={{ backgroundColor: isCompleted ? course.color : course.color + "80" }}
                    >
                      {isCompleted ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        lesson.number
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-serif text-base text-brown-800">
                        {lesson.title}
                      </p>
                      <p className="font-sans text-xs text-brown-400">
                        {lesson.subtitle} · {lesson.duration}
                      </p>
                    </div>
                    <span className="font-sans text-xs text-brown-300">
                      {isCompleted ? "Rever" : isNext ? "Comecar" : ""}
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Transversal themes */}
        <div className="mt-8 rounded-2xl border border-brown-100 bg-white/50 p-6 text-center">
          <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-brown-400">
            Temas transversais deste curso
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {course.themes.map((theme) => (
              <span
                key={theme}
                className="rounded-full border px-3 py-1 font-sans text-xs"
                style={{ borderColor: course.color + "40", color: course.color }}
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
