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

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const cursoSlug = params.curso as string;
  const licaoSlug = params.licao as string;
  const { user, loading: authLoading } = useAuth();
  const { hasCoursesAccess, isAdmin } = useAccess();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [journalContent, setJournalContent] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const course = getCourse(cursoSlug);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!authLoading && user && !hasCoursesAccess && !isAdmin) {
      router.push(`/cursos`);
    }
  }, [user, authLoading, hasCoursesAccess, isAdmin, router]);

  useEffect(() => {
    if (cursoSlug) {
      loadCourse(cursoSlug).then((mod) => {
        if (mod) {
          setLessons(mod.lessons);
          const found = mod.lessons.find((l) => l.slug === licaoSlug);
          setLesson(found || null);
        }
      });
    }
  }, [cursoSlug, licaoSlug]);

  const loadData = useCallback(async () => {
    try {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      const progressKey = courseProgressKey(cursoSlug, licaoSlug);

      const [progressRes, journalRes] = await Promise.all([
        supabase
          .from("reading_progress")
          .select("chapter_slug, completed")
          .eq("user_id", userId)
          .like("chapter_slug", `curso-${cursoSlug}/%`),
        supabase
          .from("journal_entries")
          .select("content")
          .eq("user_id", userId)
          .eq("chapter_slug", progressKey)
          .maybeSingle(),
      ]);

      if (progressRes.data) {
        const map: Record<string, boolean> = {};
        progressRes.data.forEach((row) => {
          map[row.chapter_slug] = row.completed;
        });
        setProgress(map);
      }

      if (journalRes.data?.content) {
        setJournalContent(journalRes.data.content);
      }
    } catch {
      // Connection error
    }
    setLoading(false);
  }, [cursoSlug, licaoSlug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Night mode from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("reader-night-mode");
    if (stored === "true") setNightMode(true);
  }, []);

  async function markComplete() {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) return;

    const progressKey = courseProgressKey(cursoSlug, licaoSlug);

    await supabase.from("reading_progress").upsert(
      {
        user_id: userId,
        chapter_slug: progressKey,
        completed: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,chapter_slug" }
    );

    setProgress((prev) => ({ ...prev, [progressKey]: true }));
  }

  async function saveJournal() {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) return;

    setSaving(true);
    const progressKey = courseProgressKey(cursoSlug, licaoSlug);

    await supabase.from("journal_entries").upsert(
      {
        user_id: userId,
        chapter_slug: progressKey,
        content: journalContent,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,chapter_slug" }
    );

    setSaving(false);
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 2000);
  }

  if (!course || !lesson) {
    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
        </div>
      );
    }
    return (
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-brown-900">Licao nao encontrada</h1>
          <Link href={`/membro/cursos/${cursoSlug}`} className="mt-4 inline-block text-sm text-sage">
            Voltar ao curso
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = lessons.findIndex((l) => l.slug === licaoSlug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const progressKey = courseProgressKey(cursoSlug, licaoSlug);
  const isCompleted = progress[progressKey];

  return (
    <section
      className={`min-h-screen px-6 py-12 transition-colors ${
        nightMode ? "bg-[#1a1a1a] text-[#e0d5c8]" : "bg-cream"
      }`}
    >
      <div className="mx-auto max-w-2xl">
        {/* Top nav */}
        <div className="flex items-center justify-between">
          <Link
            href={`/membro/cursos/${cursoSlug}`}
            className={`font-sans text-[0.6rem] uppercase tracking-[0.2em] transition-colors ${
              nightMode ? "text-[#8a7e6e] hover:text-[#c9b896]" : "text-brown-400 hover:text-brown-600"
            }`}
          >
            &larr; {course.title}
          </Link>
          <button
            onClick={() => {
              setNightMode(!nightMode);
              localStorage.setItem("reader-night-mode", String(!nightMode));
            }}
            className={`rounded-full px-3 py-1 font-sans text-[0.6rem] transition-colors ${
              nightMode
                ? "bg-[#2a2a2a] text-[#8a7e6e]"
                : "bg-brown-50 text-brown-400"
            }`}
          >
            {nightMode ? "Modo claro" : "Modo noturno"}
          </button>
        </div>

        {/* Lesson header */}
        <div className="mt-10 text-center">
          <div
            className="mx-auto h-1 w-12 rounded-full"
            style={{ backgroundColor: course.color }}
          />
          <p
            className={`mt-4 font-sans text-[0.6rem] uppercase tracking-[0.25em] ${
              nightMode ? "text-[#8a7e6e]" : "text-brown-400"
            }`}
          >
            Licao {lesson.number} de {lessons.length} · {lesson.duration}
          </p>
          <h1
            className={`mt-2 font-serif text-3xl ${
              nightMode ? "text-[#e0d5c8]" : "text-brown-900"
            }`}
          >
            {lesson.title}
          </h1>
          <p
            className={`mt-1 font-serif text-base italic ${
              nightMode ? "text-[#8a7e6e]" : "text-brown-500"
            }`}
          >
            {lesson.subtitle}
          </p>
        </div>

        {/* Audio player placeholder */}
        {(lesson.type === "audio" || lesson.type === "video") && (
          <div
            className={`mt-8 rounded-2xl border p-6 text-center ${
              nightMode
                ? "border-[#333] bg-[#222]"
                : "border-brown-100 bg-white"
            }`}
          >
            {lesson.audioUrl ? (
              <audio controls className="w-full" src={lesson.audioUrl}>
                O teu browser nao suporta audio.
              </audio>
            ) : (
              <div>
                <p
                  className={`font-sans text-sm ${
                    nightMode ? "text-[#8a7e6e]" : "text-brown-400"
                  }`}
                >
                  Audio em preparacao
                </p>
                <p
                  className={`mt-1 font-sans text-xs ${
                    nightMode ? "text-[#6a5e4e]" : "text-brown-300"
                  }`}
                >
                  A Vivianne esta a gravar esta licao
                </p>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="mt-8 space-y-6">
          {lesson.content
            .filter((p) => !p.startsWith("//"))
            .map((paragraph, i) => (
              <p
                key={i}
                className={`font-serif text-base leading-[1.9] ${
                  nightMode ? "text-[#c9b896]" : "text-brown-700"
                }`}
              >
                {paragraph}
              </p>
            ))}
        </div>

        {/* Exercise */}
        {lesson.exercise && (
          <div
            className={`mt-10 rounded-2xl border p-6 ${
              nightMode
                ? "border-[#333] bg-[#1f1f1f]"
                : "border-sage/20 bg-sage/[0.04]"
            }`}
          >
            <p
              className={`font-sans text-[0.6rem] uppercase tracking-[0.25em] ${
                nightMode ? "text-[#8a7e6e]" : "text-sage"
              }`}
            >
              Exercicio pratico
            </p>
            <p
              className={`mt-3 font-serif text-sm leading-relaxed ${
                nightMode ? "text-[#c9b896]" : "text-brown-700"
              }`}
            >
              {lesson.exercise.prompt}
            </p>
          </div>
        )}

        {/* Journal */}
        {lesson.exercise?.journalQuestion && (
          <div
            className={`mt-6 rounded-2xl border p-6 ${
              nightMode
                ? "border-[#333] bg-[#1f1f1f]"
                : "border-brown-100 bg-white"
            }`}
          >
            <p
              className={`font-sans text-[0.6rem] uppercase tracking-[0.25em] ${
                nightMode ? "text-[#8a7e6e]" : "text-brown-400"
              }`}
            >
              Diario reflexivo
            </p>
            <p
              className={`mt-2 font-serif text-sm italic ${
                nightMode ? "text-[#c9b896]" : "text-brown-600"
              }`}
            >
              {lesson.exercise.journalQuestion}
            </p>
            <textarea
              value={journalContent}
              onChange={(e) => setJournalContent(e.target.value)}
              placeholder="Escreve aqui, ao teu ritmo..."
              rows={5}
              className={`mt-4 w-full resize-none rounded-lg border px-4 py-3 font-serif text-sm leading-relaxed focus:outline-none focus:ring-2 ${
                nightMode
                  ? "border-[#333] bg-[#2a2a2a] text-[#c9b896] placeholder:text-[#555] focus:ring-[#555]"
                  : "border-brown-100 bg-cream text-brown-700 placeholder:text-brown-300 focus:ring-sage/30"
              }`}
            />
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={saveJournal}
                disabled={saving || !journalContent.trim()}
                className={`rounded-lg px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-colors ${
                  saving || !journalContent.trim()
                    ? "opacity-40"
                    : ""
                } ${
                  nightMode
                    ? "bg-[#333] text-[#8a7e6e] hover:bg-[#444]"
                    : "bg-sage/10 text-sage hover:bg-sage/20"
                }`}
              >
                {saving ? "A guardar..." : journalSaved ? "Guardado" : "Guardar reflexao"}
              </button>
              {journalContent.length > 0 && (
                <span
                  className={`font-sans text-xs ${
                    nightMode ? "text-[#555]" : "text-brown-300"
                  }`}
                >
                  {journalContent.split(/\s+/).filter(Boolean).length} palavras
                </span>
              )}
            </div>
          </div>
        )}

        {/* Mark complete */}
        {!isCompleted && (
          <div className="mt-8 text-center">
            <button
              onClick={markComplete}
              className="inline-flex items-center justify-center rounded-full px-8 py-3 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors"
              style={{ backgroundColor: course.color }}
            >
              Marcar licao como concluida
            </button>
          </div>
        )}

        {isCompleted && (
          <div className="mt-8 text-center">
            <p
              className={`font-sans text-xs ${
                nightMode ? "text-[#8a7e6e]" : "text-brown-400"
              }`}
            >
              Licao concluida
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between border-t border-brown-100 pt-6">
          {prevLesson ? (
            <Link
              href={`/membro/cursos/${cursoSlug}/${prevLesson.slug}`}
              className={`font-sans text-xs ${
                nightMode ? "text-[#8a7e6e] hover:text-[#c9b896]" : "text-brown-400 hover:text-brown-600"
              }`}
            >
              &larr; {prevLesson.title}
            </Link>
          ) : (
            <span />
          )}
          {nextLesson ? (
            <Link
              href={`/membro/cursos/${cursoSlug}/${nextLesson.slug}`}
              className={`font-sans text-xs ${
                nightMode ? "text-[#8a7e6e] hover:text-[#c9b896]" : "text-brown-400 hover:text-brown-600"
              }`}
            >
              {nextLesson.title} &rarr;
            </Link>
          ) : (
            <Link
              href={`/membro/cursos/${cursoSlug}`}
              className={`font-sans text-xs ${
                nightMode ? "text-[#8a7e6e] hover:text-[#c9b896]" : "text-brown-400 hover:text-brown-600"
              }`}
            >
              Voltar ao curso &rarr;
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
