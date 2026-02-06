"use client";

import { use, useEffect, useState, useCallback, useRef } from "react";
import { chapters } from "@/data/ebook";
import { supabase } from "@/lib/supabase";
import InteractiveChecklist from "@/components/InteractiveChecklist";
import ReflectionJournal from "@/components/ReflectionJournal";
import Link from "next/link";

export default function ChapterPage({ params }: { params: Promise<{ capitulo: string }> }) {
  const { capitulo } = use(params);
  const chapter = chapters.find((ch) => ch.slug === capitulo);
  const chapterIndex = chapters.findIndex((ch) => ch.slug === capitulo);
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  const [showReflection, setShowReflection] = useState(false);
  const [completed, setCompleted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Track reading progress
  const markAsRead = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId || !chapter) return;

    await supabase.from("reading_progress").upsert(
      {
        user_id: userId,
        chapter_slug: chapter.slug,
        completed: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,chapter_slug" }
    );
    setCompleted(true);
  }, [chapter]);

  // Load completion state
  useEffect(() => {
    if (!chapter) return;
    const load = async () => {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) return;

      const { data } = await supabase
        .from("reading_progress")
        .select("completed")
        .eq("user_id", userId)
        .eq("chapter_slug", chapter.slug)
        .single();

      if (data?.completed) setCompleted(true);
    };
    load();
  }, [chapter]);

  // Detect scroll to bottom to show reflection
  useEffect(() => {
    if (!endRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowReflection(true);
          if (!completed) markAsRead();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(endRef.current);
    return () => observer.disconnect();
  }, [completed, markAsRead]);

  if (!chapter) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="text-brown-600">Capítulo não encontrado.</p>
        <Link href="/membro/leitura" className="mt-4 inline-block text-sage hover:underline">
          Voltar à leitura
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1" style={{ backgroundColor: chapter.accentColor + "20" }}>
        <div
          id="reading-progress"
          className="h-full transition-all duration-150"
          style={{ backgroundColor: chapter.accentColor, width: "0%" }}
        />
      </div>

      {/* Scroll progress tracker */}
      <ScrollProgress color={chapter.accentColor} />

      <article className="px-6 py-12" style={{ backgroundColor: chapter.accentBg }}>
        <div className="mx-auto max-w-[640px]">
          {/* Chapter header */}
          <div className="mb-12 text-center">
            <Link
              href="/membro/leitura"
              className="inline-block font-sans text-[0.65rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
            >
              &larr; Todos os capítulos
            </Link>
            <p
              className="mt-8 font-sans text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ color: chapter.accentColor }}
            >
              {chapter.title}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-brown-900">{chapter.subtitle}</h1>
            <div className="mx-auto mt-6 h-px w-16" style={{ backgroundColor: chapter.accentColor + "40" }} />
          </div>

          {/* Content */}
          <div className="space-y-0">
            {chapter.content.map((paragraph, i) => {
              if (paragraph === "***") {
                return (
                  <div key={i} className="flex items-center justify-center py-8">
                    <span className="mx-2 text-brown-300" style={{ color: chapter.accentColor + "60" }}>
                      &#10045;
                    </span>
                    <span className="mx-2 text-brown-300" style={{ color: chapter.accentColor + "40" }}>
                      &#10045;
                    </span>
                    <span className="mx-2 text-brown-300" style={{ color: chapter.accentColor + "60" }}>
                      &#10045;
                    </span>
                  </div>
                );
              }

              const isDialogue = paragraph.startsWith("—") || paragraph.startsWith("—");
              const isShortLine = paragraph.length < 60;

              return (
                <p
                  key={i}
                  className={`leading-[1.9] ${
                    isDialogue
                      ? "py-1 font-serif text-[1.05rem] text-brown-800"
                      : isShortLine
                        ? "py-3 text-center font-serif text-[1.05rem] italic text-brown-600"
                        : "py-2 font-serif text-[1.05rem] text-brown-800"
                  }`}
                  style={{
                    textIndent: !isDialogue && !isShortLine && i > 0 ? "1.5em" : undefined,
                  }}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* End marker for intersection observer */}
          <div ref={endRef} className="h-4" />

          {/* Reflection section (appears after reading) */}
          <div
            className={`mt-16 space-y-6 transition-all duration-1000 ${
              showReflection ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Divider */}
            <div className="flex items-center justify-center py-4">
              <div className="h-px flex-1" style={{ backgroundColor: chapter.accentColor + "30" }} />
              <span className="px-4 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-brown-400">
                Pausa
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: chapter.accentColor + "30" }} />
            </div>

            {showReflection && (
              <>
                <ReflectionJournal
                  chapterSlug={chapter.slug}
                  prompt={chapter.reflection.prompt}
                  journalQuestion={chapter.reflection.journalQuestion}
                  accentColor={chapter.accentColor}
                />

                <InteractiveChecklist
                  chapterSlug={chapter.slug}
                  items={chapter.checklist}
                  accentColor={chapter.accentColor}
                />
              </>
            )}
          </div>

          {/* Navigation */}
          <nav className="mt-16 flex items-center justify-between border-t border-brown-100 pt-8">
            {prevChapter ? (
              <Link
                href={`/membro/leitura/${prevChapter.slug}`}
                className="group flex items-center gap-2 font-sans text-sm text-brown-400 transition-colors hover:text-brown-700"
              >
                <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
                <span>{prevChapter.subtitle}</span>
              </Link>
            ) : (
              <Link
                href="/membro/leitura"
                className="font-sans text-sm text-brown-400 hover:text-brown-700"
              >
                &larr; Índice
              </Link>
            )}

            {nextChapter ? (
              <Link
                href={`/membro/leitura/${nextChapter.slug}`}
                className="group flex items-center gap-2 font-sans text-sm text-brown-400 transition-colors hover:text-brown-700"
              >
                <span>{nextChapter.subtitle}</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            ) : (
              <Link
                href="/membro/espelho"
                className="group flex items-center gap-2 font-sans text-sm transition-colors"
                style={{ color: chapter.accentColor }}
              >
                <span>O Teu Espelho</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </>
  );
}

// Scroll progress component
function ScrollProgress({ color }: { color: string }) {
  useEffect(() => {
    const handleScroll = () => {
      const bar = document.getElementById("reading-progress");
      if (!bar) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // This component only adds the scroll listener, renders nothing
  void color;
  return null;
}
