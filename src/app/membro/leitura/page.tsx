"use client";

import { useEffect, useState, useCallback } from "react";
import { chapters, bookMeta } from "@/data/ebook";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LeituraPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("reading_progress")
      .select("chapter_slug, completed")
      .eq("user_id", userId);

    if (data) {
      const map: Record<string, boolean> = {};
      data.forEach((row) => {
        map[row.chapter_slug] = row.completed;
      });
      setProgress(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const completedCount = chapters.filter((ch) => progress[ch.slug]).length;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Book header */}
        <div className="mb-10 text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
            {bookMeta.author}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-brown-900">{bookMeta.title}</h1>
          <p className="mt-2 font-serif text-lg italic text-brown-500">{bookMeta.subtitle}</p>
          <p className="mx-auto mt-6 max-w-md font-serif text-sm leading-relaxed text-brown-500">
            {bookMeta.dedication}
          </p>
        </div>

        {/* Progress overview */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-brown-600">
              {loading
                ? "A carregar..."
                : completedCount === 0
                  ? "Pronta para começar?"
                  : completedCount === chapters.length
                    ? "Leitura completa"
                    : `${completedCount} de ${chapters.length} capítulos`}
            </span>
            <span className="font-sans text-xs text-brown-400">
              {Math.round((completedCount / chapters.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-brown-50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#c9b896] to-[#7a8c6e] transition-all duration-1000"
              style={{ width: `${(completedCount / chapters.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Intro text */}
        <div className="mb-8 rounded-2xl border-l-[3px] border-[#c9b896] bg-white px-6 py-5 shadow-sm">
          {bookMeta.intro.map((p, i) => (
            <p key={i} className="mt-3 font-serif text-sm leading-relaxed text-brown-600 first:mt-0">
              {p}
            </p>
          ))}
        </div>

        {/* Chapter list */}
        <div className="space-y-3">
          {chapters.map((chapter, idx) => {
            const isCompleted = progress[chapter.slug];
            const isFirst = idx === 0;
            const prevCompleted =
              idx === 0 || progress[chapters[idx - 1]?.slug];
            const isAccessible = isFirst || prevCompleted || isCompleted;

            return (
              <Link
                key={chapter.slug}
                href={isAccessible ? `/membro/leitura/${chapter.slug}` : "#"}
                className={`group flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all ${
                  isAccessible
                    ? "border-brown-100 hover:shadow-md"
                    : "cursor-default border-brown-50 opacity-50"
                }`}
              >
                {/* Chapter number circle */}
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: isCompleted ? "#7a8c6e" : chapter.accentColor,
                    opacity: isAccessible ? 1 : 0.4,
                  }}
                >
                  {isCompleted ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    chapter.number
                  )}
                </span>

                <div className="flex-1">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                    {chapter.title}
                  </p>
                  <p className="font-serif text-base text-brown-800">{chapter.subtitle}</p>
                </div>

                {isAccessible && (
                  <span className="font-sans text-xs text-brown-300 transition-colors group-hover:text-brown-500">
                    {isCompleted ? "Reler" : "Ler"}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Espelho link (only show if some chapters completed) */}
        {completedCount > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/membro/espelho"
              className="inline-block rounded-full border border-[#7a8c6e] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-[#7a8c6e] transition-all hover:bg-[#7a8c6e] hover:text-white"
            >
              O Teu Espelho — Ver as tuas reflexões
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
