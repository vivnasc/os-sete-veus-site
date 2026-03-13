"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useAccess } from "@/hooks/useAccess";
import { courses, getAvailableCourses, getUpcomingCourses } from "@/data/courses";
import { loadCourse, courseProgressKey } from "@/lib/content-registry";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import type { Lesson } from "@/data/courses";

type CourseProgress = {
  slug: string;
  lessons: Lesson[];
  completed: number;
  total: number;
  percent: number;
  nextLesson: Lesson;
};

export default function MemberCoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { hasCoursesAccess, isAdmin } = useAccess();

  const [courseData, setCourseData] = useState<CourseProgress[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    }
  }, [user, authLoading, router]);

  // Load course data
  useEffect(() => {
    const available = getAvailableCourses();
    Promise.all(
      available.map(async (c) => {
        const mod = await loadCourse(c.slug);
        return mod ? { slug: c.slug, lessons: mod.lessons } : null;
      })
    ).then((results) => {
      const valid = results.filter((r): r is { slug: string; lessons: Lesson[] } => r !== null);
      setCourseData(
        valid.map((r) => ({
          ...r,
          completed: 0,
          total: r.lessons.length,
          percent: 0,
          nextLesson: r.lessons[0],
        }))
      );
    });
  }, []);

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
        .like("chapter_slug", "curso-%");

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
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Compute progress per course
  const coursesWithProgress = courseData.map((cd) => {
    const completed = cd.lessons.filter(
      (l) => progress[courseProgressKey(cd.slug, l.slug)]
    ).length;
    const nextLesson = cd.lessons.find(
      (l) => !progress[courseProgressKey(cd.slug, l.slug)]
    ) || cd.lessons[0];
    return {
      ...cd,
      completed,
      percent: Math.round((completed / cd.total) * 100),
      nextLesson,
    };
  });

  const availableCourses = getAvailableCourses();
  const upcomingCourses = getUpcomingCourses();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/membro"
            className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400 transition-colors hover:text-brown-600"
          >
            &larr; Dashboard
          </Link>
          <p className="mt-4 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
            Ensino e mentoria
          </p>
          <h1 className="mt-3 font-serif text-3xl text-brown-900">
            Os teus cursos
          </h1>
          <p className="mt-2 font-serif text-base text-brown-500">
            Temas que cruzam veus, espelhos e nos. Pela Vivianne.
          </p>
        </div>

        {/* No access */}
        {!hasCoursesAccess && !isAdmin && !authLoading && (
          <div className="mt-10 rounded-2xl border-2 border-brown-100 bg-white p-8 text-center">
            <p className="font-serif text-lg text-brown-700">
              Ainda nao tens acesso a nenhum curso
            </p>
            <p className="mt-2 text-sm text-brown-500">
              Os cursos sao um produto separado dos Espelhos
            </p>
            <Link
              href="/cursos"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-sage px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-sage-dark"
            >
              Descobrir cursos
            </Link>
          </div>
        )}

        {/* Course cards */}
        {(hasCoursesAccess || isAdmin) && (
          <div className="mt-10 space-y-4">
            {availableCourses.map((course) => {
              const cp = coursesWithProgress.find((c) => c.slug === course.slug);
              return (
                <div
                  key={course.slug}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div
                      className="flex items-center justify-center px-8 py-8 sm:w-48"
                      style={{
                        background: `linear-gradient(135deg, ${course.color}40, ${course.color}20)`,
                      }}
                    >
                      <div className="text-center">
                        <div
                          className="mx-auto h-16 w-16 rounded-full"
                          style={{ backgroundColor: course.color + "30" }}
                        />
                        <p className="mt-2 font-sans text-[0.55rem] uppercase tracking-wider text-brown-500">
                          {course.lessons} licoes
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
                          Curso · {course.totalDuration}
                        </p>
                        <h2 className="mt-1 font-serif text-2xl text-brown-900">
                          {course.title}
                        </h2>
                        <p className="mt-1 font-serif text-sm italic text-brown-500">
                          {course.subtitle}
                        </p>
                        {!loading && cp && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-xs text-brown-400">
                              <span>
                                {cp.completed === 0
                                  ? "Pronta para comecar"
                                  : cp.completed === cp.total
                                    ? "Curso completo"
                                    : `${cp.completed} de ${cp.total} licoes`}
                              </span>
                              <span>{cp.percent}%</span>
                            </div>
                            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brown-50">
                              <div
                                className="h-full rounded-full transition-all duration-1000"
                                style={{
                                  width: `${cp.percent}%`,
                                  background: `linear-gradient(to right, ${course.color}, ${course.color}dd)`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/membro/cursos/${course.slug}/${cp?.nextLesson.slug || ""}`}
                        className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors"
                        style={{ backgroundColor: course.color }}
                      >
                        {!cp || cp.completed === 0
                          ? "Comecar"
                          : cp.completed === cp.total
                            ? "Rever"
                            : `Continuar — ${cp.nextLesson.title}`}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upcoming */}
        {(hasCoursesAccess || isAdmin) && upcomingCourses.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
              Proximos cursos
            </h3>
            <div className="space-y-3">
              {upcomingCourses.map((course) => (
                <div
                  key={course.slug}
                  className="flex items-center gap-4 rounded-2xl border border-brown-50 bg-white/60 p-4"
                >
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  <div className="flex-1">
                    <p className="font-serif text-base text-brown-700">
                      {course.title}
                    </p>
                    <p className="font-sans text-xs text-brown-400">
                      {course.subtitle}
                    </p>
                  </div>
                  <span className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-300">
                    {course.launchLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
