"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ModuleProgress = {
  moduleNumber: number;
  title: string;
  isFree: boolean;
  subLessons: {
    letter: string;
    title: string;
    completed: boolean;
  }[];
};

export default function CourseDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const { user, loading: authLoading } = useAuth();
  const [courseData, setCourseData] = useState<{
    title: string;
    subtitle: string;
    modules: ModuleProgress[];
  } | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const { getCourseBySlug } = await import("@/data/courses");
        const course = getCourseBySlug(slug);
        if (!course) return;

        // Build module progress
        const modules: ModuleProgress[] = course.modules.map((mod) => ({
          moduleNumber: mod.number,
          title: mod.title,
          isFree: mod.isFree,
          subLessons: mod.subLessons.map((sub) => ({
            letter: sub.letter,
            title: sub.title,
            completed: false,
          })),
        }));

        setCourseData({
          title: course.title,
          subtitle: course.subtitle,
          modules,
        });

        // Check enrollment
        if (user) {
          const { data: enrollment } = await supabase
            .from("enrollments")
            .select("id")
            .eq("user_id", user.id)
            .eq("course_id", slug)
            .maybeSingle();
          setEnrolled(!!enrollment);

          // Load lesson progress
          const { data: progress } = await supabase
            .from("lesson_progress")
            .select("lesson_id, status")
            .eq("user_id", user.id);

          if (progress && progress.length > 0) {
            const completedCount = progress.filter(
              (p) => p.status === "completed"
            ).length;
            const totalLessons = modules.reduce(
              (a, m) => a + m.subLessons.length,
              0
            );
            setOverallProgress(
              totalLessons > 0
                ? Math.round((completedCount / totalLessons) * 100)
                : 0
            );
          }
        }
      } catch {
        // Data file not available yet
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) loadData();
  }, [slug, user, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <p className="text-[#a0a0b0]">A carregar...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl text-white mb-4">
            Entra na tua conta
          </h1>
          <p className="text-[#a0a0b0] mb-8">
            Precisas de estar autenticada para aceder ao curso.
          </p>
          <Link
            href="/entrar"
            className="inline-block bg-[#8B5CF6] text-white px-8 py-3 rounded-lg font-sans hover:bg-[#7c4ee4] transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <p className="text-[#a0a0b0]">Curso nao encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#e0e0e8]">
      {/* Header */}
      <section className="px-6 pt-12 pb-8 max-w-4xl mx-auto">
        <Link
          href={`/cursos/${slug}`}
          className="text-[#8B5CF6] text-sm font-sans hover:underline"
        >
          ← Voltar ao curso
        </Link>
        <h1 className="font-serif text-3xl text-white mt-4">
          {courseData.title}
        </h1>
        <p className="text-[#C9A96E] mt-1">{courseData.subtitle}</p>
      </section>

      {/* Progress bar */}
      <section className="px-6 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-[#252547] rounded-full h-3 overflow-hidden">
            <div
              className="bg-[#8B5CF6] h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="text-sm font-sans text-[#a0a0b0]">
            {overallProgress}%
          </span>
        </div>
        {overallProgress === 100 && (
          <div className="mt-4 bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xl p-4 text-center">
            <p className="text-[#C9A96E] font-serif">
              Curso concluido. O teu certificado esta disponivel.
            </p>
          </div>
        )}
      </section>

      {/* Modules */}
      <section className="px-6 pb-16 max-w-4xl mx-auto space-y-4">
        {courseData.modules.map((mod) => {
          const isLocked = !mod.isFree && !enrolled;
          const completedInModule = mod.subLessons.filter(
            (s) => s.completed
          ).length;

          return (
            <div
              key={mod.moduleNumber}
              className={`bg-[#252547] rounded-xl overflow-hidden ${
                isLocked ? "opacity-60" : ""
              }`}
            >
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[#8B5CF6] font-sans text-sm font-medium w-8">
                    {String(mod.moduleNumber).padStart(2, "0")}
                  </span>
                  <span className="text-white font-serif">{mod.title}</span>
                  {mod.isFree && (
                    <span className="text-xs bg-[#C9A96E]/20 text-[#C9A96E] px-2 py-0.5 rounded font-sans">
                      Gratuito
                    </span>
                  )}
                  {isLocked && (
                    <span className="text-xs text-[#606070] font-sans">
                      Bloqueado
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#a0a0b0] font-sans">
                  {completedInModule}/{mod.subLessons.length}
                </span>
              </div>
              {!isLocked && (
                <div className="px-6 pb-5 space-y-2">
                  {mod.subLessons.map((sub) => (
                    <Link
                      key={sub.letter}
                      href={`/cursos/${slug}/modulo/${mod.moduleNumber}/${sub.letter.toLowerCase()}`}
                      className="flex items-center gap-3 text-sm py-2 px-3 rounded-lg hover:bg-[#1a1a2e] transition-colors"
                    >
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                          sub.completed
                            ? "bg-[#8B5CF6] border-[#8B5CF6] text-white"
                            : "border-[#606070] text-[#606070]"
                        }`}
                      >
                        {sub.completed ? "✓" : sub.letter}
                      </span>
                      <span
                        className={
                          sub.completed ? "text-[#a0a0b0]" : "text-[#e0e0e8]"
                        }
                      >
                        {sub.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Enroll CTA (if not enrolled) */}
      {!enrolled && (
        <section className="px-6 pb-16 max-w-4xl mx-auto text-center">
          <div className="bg-[#252547] border border-[#8B5CF6]/20 rounded-xl p-8">
            <h2 className="font-serif text-xl text-white mb-2">
              Desbloqueia o curso completo
            </h2>
            <p className="text-[#a0a0b0] text-sm mb-6">
              O Modulo 1 e gratuito. Para aceder aos modulos 2-
              {courseData.modules.length}, manual e cadernos de exercicios:
            </p>
            <button
              onClick={async () => {
                const res = await fetch("/api/courses/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ courseSlug: slug }),
                });
                const data = await res.json();
                if (data.url) window.location.href = data.url;
              }}
              className="inline-block bg-[#8B5CF6] text-white px-8 py-3 rounded-lg font-sans hover:bg-[#7c4ee4] transition-colors"
            >
              Inscrever-me — $49
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
