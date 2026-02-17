"use client";

import { use, useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { loadEspelho, isEspelhoRegistered, espelhoProgressKey } from "@/lib/content-registry";
import { getExperience } from "@/data/experiences";
import { getNosForEspelho } from "@/data/nos-collection";
import { supabase } from "@/lib/supabase";
import InteractiveChecklist from "@/components/InteractiveChecklist";
import ReflectionJournal from "@/components/ReflectionJournal";
import BreathingExercise from "@/components/BreathingExercise";
import PartilhaTrecho from "@/components/PartilhaTrecho";
import { getReadingTime, formatReadingTime } from "@/lib/readingTime";
import Link from "next/link";
import type { Chapter } from "@/data/ebook";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

export default function EspelhoChapterPage({
  params,
}: {
  params: Promise<{ veu: string; capitulo: string }>;
}) {
  const { veu, capitulo } = use(params);
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [ready, setReady] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const isAdmin = profile?.is_admin || AUTHOR_EMAILS.includes(user?.email || "");
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;
  const hasNosIncluded = isAdmin || (profile?.purchased_products ?? []).some(
    (p) => p.type === "journey" || p.type === "pack3" || p.type === "jornada_completa"
  );

  const nosBook = getNosForEspelho(veu);

  // Load content
  useEffect(() => {
    if (!isEspelhoRegistered(veu)) return;
    loadEspelho(veu).then((mod) => {
      if (mod) {
        setChapters(mod.chapters);
        setReady(true);
      }
    });
  }, [veu]);

  const chapter = chapters.find((ch) => ch.slug === capitulo);
  const chapterIndex = chapters.findIndex((ch) => ch.slug === capitulo);
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;
  const progressKey = chapter ? espelhoProgressKey(veu, chapter.slug) : "";

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    } else if (!authLoading && user && !hasMirrorsAccess) {
      router.push("/membro");
    }
  }, [user, authLoading, hasMirrorsAccess, router]);

  // Night mode
  useEffect(() => {
    const saved = localStorage.getItem("reader-night-mode");
    if (saved === "true") setNightMode(true);
  }, []);

  const toggleNightMode = () => {
    const next = !nightMode;
    setNightMode(next);
    localStorage.setItem("reader-night-mode", String(next));
  };

  // Mark as read
  const markAsRead = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId || !chapter) return;

    await supabase.from("reading_progress").upsert(
      {
        user_id: userId,
        chapter_slug: progressKey,
        completed: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,chapter_slug" }
    );
    setCompleted(true);
  }, [chapter, progressKey]);

  // Load completion state
  useEffect(() => {
    if (!chapter || !progressKey) return;
    const load = async () => {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) return;

      const { data } = await supabase
        .from("reading_progress")
        .select("completed")
        .eq("user_id", userId)
        .eq("chapter_slug", progressKey)
        .single();

      if (data?.completed) setCompleted(true);
    };
    load();
  }, [chapter, progressKey]);

  // Scroll to bottom → show reflection
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

  if (authLoading || !hasMirrorsAccess || !ready) return null;

  if (!chapter) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="text-brown-600">Capitulo nao encontrado.</p>
        <Link href={`/membro/espelhos/${veu}`} className="mt-4 inline-block text-sage hover:underline">
          Voltar a leitura
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

      <ScrollProgress color={chapter.accentColor} />

      <article
        className="px-6 py-12 transition-colors duration-500"
        style={{
          backgroundColor: nightMode ? "#1e1b18" : chapter.accentBg,
        }}
      >
        <div className="mx-auto max-w-[640px]">
          {/* Chapter header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-between">
              <Link
                href={`/membro/espelhos/${veu}`}
                className={`font-sans text-[0.65rem] uppercase tracking-[0.15em] transition-colors ${nightMode ? "text-brown-500 hover:text-brown-400" : "text-brown-400 hover:text-brown-600"}`}
              >
                &larr; Todos os capitulos
              </Link>

              <button
                onClick={toggleNightMode}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${nightMode ? "bg-brown-800 text-amber-300 hover:bg-brown-700" : "bg-brown-100 text-brown-400 hover:bg-brown-200"}`}
                title={nightMode ? "Modo claro" : "Modo nocturno"}
              >
                {nightMode ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
            <p
              className="mt-8 font-sans text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ color: chapter.accentColor }}
            >
              {chapter.title}
            </p>
            <h1 className={`mt-2 font-serif text-3xl transition-colors ${nightMode ? "text-cream" : "text-brown-900"}`}>{chapter.subtitle}</h1>
            <p className={`mt-3 font-sans text-[0.65rem] tracking-wide ${nightMode ? "text-brown-600" : "text-brown-400"}`}>
              {formatReadingTime(getReadingTime(chapter.content))}
            </p>
            <div className="mx-auto mt-4 h-px w-16" style={{ backgroundColor: chapter.accentColor + "40" }} />
          </div>

          {/* Content */}
          <div className="space-y-0">
            {chapter.content.map((paragraph, i) => {
              if (paragraph === "***") {
                return (
                  <div key={i} className="flex items-center justify-center py-8">
                    <span className="mx-2 text-brown-300" style={{ color: chapter.accentColor + "60" }}>&#10045;</span>
                    <span className="mx-2 text-brown-300" style={{ color: chapter.accentColor + "40" }}>&#10045;</span>
                    <span className="mx-2 text-brown-300" style={{ color: chapter.accentColor + "60" }}>&#10045;</span>
                  </div>
                );
              }

              const isDialogue = paragraph.startsWith("\u2014") || paragraph.startsWith("—");
              const isShortLine = paragraph.length < 60;

              const textColor = nightMode
                ? isShortLine ? "text-brown-400" : "text-[#d4cfc7]"
                : isShortLine ? "text-brown-600" : "text-brown-800";

              return (
                <p
                  key={i}
                  className={`leading-[1.9] transition-colors duration-500 ${
                    isDialogue
                      ? `py-1 font-serif text-[1.05rem] ${textColor}`
                      : isShortLine
                        ? `py-3 text-center font-serif text-[1.05rem] italic ${textColor}`
                        : `py-2 font-serif text-[1.05rem] ${textColor}`
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

          {/* End marker */}
          <div ref={endRef} className="h-4" />

          {/* Reflection section */}
          <div
            className={`mt-16 space-y-6 transition-all duration-1000 ${
              showReflection ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center py-4">
              <div className="h-px flex-1" style={{ backgroundColor: chapter.accentColor + "30" }} />
              <span className="px-4 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-brown-400">
                Pausa
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: chapter.accentColor + "30" }} />
            </div>

            {showReflection && (
              <>
                <BreathingExercise accentColor={chapter.accentColor} />

                <ReflectionJournal
                  chapterSlug={progressKey}
                  prompt={chapter.reflection.prompt}
                  journalQuestion={chapter.reflection.journalQuestion}
                  accentColor={chapter.accentColor}
                />

                <InteractiveChecklist
                  chapterSlug={progressKey}
                  items={chapter.checklist}
                  accentColor={chapter.accentColor}
                />

                <PartilhaTrecho
                  chapterSlug={progressKey}
                  accentColor={chapter.accentColor}
                />
              </>
            )}
          </div>

          {/* Navigation */}
          <nav className={`mt-16 flex items-center justify-between border-t pt-8 ${nightMode ? "border-brown-800" : "border-brown-100"}`}>
            {prevChapter ? (
              <Link
                href={`/membro/espelhos/${veu}/${prevChapter.slug}`}
                className="group flex items-center gap-2 font-sans text-sm text-brown-400 transition-colors hover:text-brown-700"
              >
                <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
                <span>{prevChapter.subtitle}</span>
              </Link>
            ) : (
              <Link
                href={`/membro/espelhos/${veu}`}
                className="font-sans text-sm text-brown-400 hover:text-brown-700"
              >
                &larr; Indice
              </Link>
            )}

            {nextChapter ? (
              <Link
                href={`/membro/espelhos/${veu}/${nextChapter.slug}`}
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

          {/* No — last chapter */}
          {nosBook && !nextChapter && showReflection && (
            <div className={`mt-10 rounded-2xl border-2 border-[#c9a87c]/30 p-8 text-center transition-colors duration-500 ${nightMode ? "bg-[#2a2520]" : "bg-white shadow-sm"}`}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a87c]/10 text-2xl">
                &#10023;
              </div>
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[#c9a87c]">
                {hasNosIncluded ? "Desbloqueado" : "Continuacao disponivel"}
              </p>
              <h3 className={`mt-2 font-serif text-xl ${nightMode ? "text-cream" : "text-brown-900"}`}>
                {nosBook.title}
              </h3>
              <p className={`mt-1 font-serif text-sm italic ${nightMode ? "text-brown-500" : "text-brown-500"}`}>
                {nosBook.subtitle}
              </p>
              <p className={`mx-auto mt-3 max-w-sm text-sm leading-relaxed ${nightMode ? "text-brown-500" : "text-brown-500"}`}>
                {nosBook.description}
              </p>
              {nosBook.status !== "available" ? (
                <p className="mt-4 font-sans text-xs text-brown-400">
                  Em breve
                </p>
              ) : hasNosIncluded ? (
                <Link
                  href="/membro/nos"
                  className="mt-5 inline-block rounded-full bg-[#c9a87c] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b89a6c]"
                >
                  Desatar este nó &rarr;
                </Link>
              ) : (
                <div className="mt-5 space-y-2">
                  <Link
                    href={`/comprar/nos/${nosBook.slug}`}
                    className="inline-block rounded-full bg-[#c9a87c] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b89a6c]"
                  >
                    Desatar este nó · ${nosBook.priceUSD}
                  </Link>
                  <p className={`font-sans text-[0.6rem] ${nightMode ? "text-brown-600" : "text-brown-400"}`}>
                    Incluído gratuitamente no Pack ou Jornada Completa
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </>
  );
}

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

  void color;
  return null;
}
