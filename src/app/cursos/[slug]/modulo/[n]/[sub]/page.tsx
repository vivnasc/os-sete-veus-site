"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type LessonData = {
  courseTitle: string;
  moduleNumber: number;
  moduleTitle: string;
  letter: string;
  title: string;
  description: string;
  prev: { n: number; sub: string } | null;
  next: { n: number; sub: string } | null;
};

export default function LessonPage() {
  const { slug, n, sub } = useParams<{ slug: string; n: string; sub: string }>();
  const { user, profile, loading: authLoading } = useAuth();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  const moduleNum = parseInt(n, 10);
  const subLetter = sub.toUpperCase();

  useEffect(() => {
    async function loadLesson() {
      try {
        const { getCourseBySlug } = await import("@/data/courses");
        const course = getCourseBySlug(slug);
        if (!course) return;

        const mod = course.modules.find((m) => m.number === moduleNum);
        if (!mod) return;

        const subLesson = mod.subLessons.find((s) => s.letter === subLetter);
        if (!subLesson) return;

        // Compute prev/next navigation
        const allLessons: { n: number; sub: string }[] = [];
        for (const m of course.modules) {
          for (const s of m.subLessons) {
            allLessons.push({ n: m.number, sub: s.letter.toLowerCase() });
          }
        }
        const currentIdx = allLessons.findIndex(
          (l) => l.n === moduleNum && l.sub === subLetter.toLowerCase()
        );

        setLesson({
          courseTitle: course.title,
          moduleNumber: mod.number,
          moduleTitle: mod.title,
          letter: subLesson.letter,
          title: subLesson.title,
          description: subLesson.description,
          prev: currentIdx > 0 ? allLessons[currentIdx - 1] : null,
          next:
            currentIdx < allLessons.length - 1
              ? allLessons[currentIdx + 1]
              : null,
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
        }
      } catch {
        // Data file not available yet
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) loadLesson();
  }, [slug, moduleNum, subLetter, user, authLoading]);

  // Load video content via API
  useEffect(() => {
    async function loadVideo() {
      if (!user || !lesson) return;
      if (!enrolled) return;

      try {
        const res = await fetch(
          `/api/courses/lesson?slug=${slug}&module=${moduleNum}&sub=${subLetter}`
        );
        if (res.ok) {
          const data = await res.json();
          setVideoUrl(data.url);
        }
      } catch {
        // Video not available
      }
    }

    loadVideo();
  }, [user, lesson, enrolled, slug, moduleNum, subLetter]);

  const markCompleted = useCallback(async () => {
    if (!user) return;
    const lessonId = `${slug}-m${moduleNum}-${subLetter.toLowerCase()}`;

    await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        status: "completed",
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    );

    setCompleted(true);

    // Update progress via API
    await fetch("/api/courses/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseSlug: slug }),
    });
  }, [user, slug, moduleNum, subLetter]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-mundo-bg flex items-center justify-center">
        <p className="text-mundo-muted">A carregar...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-mundo-bg flex items-center justify-center">
        <p className="text-mundo-muted">Sub-aula não encontrada.</p>
      </div>
    );
  }

  const isLocked = !enrolled && !profile?.is_admin;

  if (!user) {
    return (
      <div className="min-h-screen bg-mundo-bg flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl text-white mb-4">
            Entra na tua conta
          </h1>
          <p className="text-mundo-muted mb-8">
            Precisas de estar autenticada para ver esta aula.
          </p>
          <Link
            href="/entrar"
            className="inline-block bg-mundo-violeta text-white px-8 py-3 rounded-lg font-sans hover:bg-mundo-violeta/80 transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="min-h-screen bg-mundo-bg flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl text-white mb-4">
            Módulo bloqueado
          </h1>
          <p className="text-mundo-muted mb-8">
            Esta sub-aula faz parte do módulo {lesson.moduleNumber}. Inscreve-te
            no curso completo para desbloquear.
          </p>
          <Link
            href={`/cursos/${slug}/dashboard?checkout=true`}
            className="inline-block bg-mundo-violeta text-white px-8 py-3 rounded-lg font-sans hover:bg-mundo-violeta/80 transition-colors"
          >
            Inscrever-me
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mundo-bg text-mundo-creme-suave">
      {/* Breadcrumb */}
      <div className="px-6 pt-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-mundo-muted font-sans">
          <Link href={`/cursos/${slug}/dashboard`} className="hover:underline">
            {lesson.courseTitle}
          </Link>
          <span>/</span>
          <span>
            Módulo {lesson.moduleNumber}: {lesson.moduleTitle}
          </span>
          <span>/</span>
          <span className="text-mundo-creme-suave">
            {lesson.letter}) {lesson.title}
          </span>
        </div>
      </div>

      {/* Video player */}
      <section className="px-6 py-8 max-w-4xl mx-auto">
        <div className="aspect-video bg-mundo-bg-surface rounded-xl flex items-center justify-center overflow-hidden">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-contain"
              controlsList="nodownload"
            />
          ) : (
            <div className="text-center p-8">
              <p className="text-[#606070] font-sans text-sm">
                Vídeo em produção
              </p>
              <p className="text-[#404050] font-sans text-xs mt-2">
                Em breve disponível
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lesson info */}
      <section className="px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-2xl text-white mb-2">
          {lesson.letter}) {lesson.title}
        </h1>
        <p className="text-mundo-muted leading-relaxed">{lesson.description}</p>
      </section>

      {/* Actions */}
      <section className="px-6 py-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        {!completed ? (
          <button
            onClick={markCompleted}
            className="bg-mundo-violeta text-white px-6 py-3 rounded-lg font-sans hover:bg-mundo-violeta/80 transition-colors"
          >
            Marcar como concluída
          </button>
        ) : (
          <span className="text-mundo-violeta font-sans flex items-center gap-2">
            <span className="w-5 h-5 bg-mundo-violeta rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </span>
            Concluída
          </span>
        )}

        <Link
          href={`/cursos/${slug}/dashboard`}
          className="text-mundo-muted text-sm font-sans hover:underline"
        >
          Voltar ao dashboard
        </Link>
      </section>

      {/* Navigation */}
      <section className="px-6 pb-16 max-w-4xl mx-auto flex justify-between">
        {lesson.prev ? (
          <Link
            href={`/cursos/${slug}/modulo/${lesson.prev.n}/${lesson.prev.sub}`}
            className="text-mundo-violeta text-sm font-sans hover:underline"
          >
            ← Anterior
          </Link>
        ) : (
          <span />
        )}
        {lesson.next ? (
          <Link
            href={`/cursos/${slug}/modulo/${lesson.next.n}/${lesson.next.sub}`}
            className="text-mundo-violeta text-sm font-sans hover:underline"
          >
            Próxima →
          </Link>
        ) : (
          <span />
        )}
      </section>
    </div>
  );
}
