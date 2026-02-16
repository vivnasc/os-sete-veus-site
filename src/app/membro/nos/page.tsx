"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { chapters, bookMeta } from "@/data/no-heranca";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

export default function NosLeituraPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.is_admin || AUTHOR_EMAILS.includes(user?.email || "");
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    } else if (!authLoading && user && !hasMirrorsAccess) {
      router.push("/membro");
    }
  }, [user, authLoading, hasMirrorsAccess, router]);

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

  const completedCount = chapters.filter((ch) => progress[`nos-${ch.slug}`]).length;

  if (authLoading || !hasMirrorsAccess) return null;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Back to member area */}
        <Link
          href="/membro"
          className="inline-block font-sans text-[0.65rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
        >
          &larr; A tua experiência
        </Link>

        {/* Book header */}
        <div className="mb-10 mt-6 text-center">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[#c9a87c]">
            Colecção Nós · Livro 1
          </p>
          <h1 className="mt-3 font-serif text-4xl text-brown-900">{bookMeta.title}</h1>
          <p className="mt-2 font-serif text-lg italic text-brown-500">{bookMeta.subtitle}</p>
          <p className="mx-auto mt-6 max-w-md font-serif text-sm leading-relaxed text-brown-500">
            {bookMeta.dedication}
          </p>
        </div>

        {/* Eco link — connection to Espelho */}
        <div className="mb-8 rounded-2xl border border-[#c9a87c]/20 bg-[#c9a87c]/5 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9a87c]/20 font-serif text-xs text-[#c9a87c]">
              ~
            </span>
            <div className="flex-1">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a87c]">
                Eco do Espelho da Ilusão
              </p>
              <p className="mt-0.5 font-serif text-sm text-brown-600">
                Este nó nasce do mesmo véu. Sara acordou — agora precisa de falar com Helena.
              </p>
            </div>
            <Link
              href="/membro/leitura"
              className="shrink-0 font-sans text-[0.6rem] uppercase tracking-wider text-[#c9a87c] hover:text-[#b8975b]"
            >
              Ver Espelho &rarr;
            </Link>
          </div>
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
                    : `${completedCount} de ${chapters.length} partes`}
            </span>
            <span className="font-sans text-xs text-brown-400">
              {Math.round((completedCount / chapters.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-brown-50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#c9a87c] to-[#a08060] transition-all duration-1000"
              style={{ width: `${(completedCount / chapters.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Intro text */}
        <div className="mb-8 rounded-2xl border-l-[3px] border-[#c9a87c] bg-white px-6 py-5 shadow-sm">
          {bookMeta.intro.map((p, i) => (
            <p key={i} className="mt-3 font-serif text-sm leading-relaxed text-brown-600 first:mt-0">
              {p}
            </p>
          ))}
        </div>

        {/* Chapter list */}
        <div className="space-y-3">
          {chapters.map((chapter) => {
            const chapterKey = `nos-${chapter.slug}`;
            const isCompleted = progress[chapterKey];
            const isFirst = chapter.number === 1;
            const prevCompleted =
              chapter.number <= 1 || progress[`nos-${chapters[chapter.number - 2]?.slug}`];
            const isAccessible = isFirst || prevCompleted || isCompleted;

            return (
              <Link
                key={chapter.slug}
                href={isAccessible ? `/membro/nos/${chapter.slug}` : "#"}
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
                    backgroundColor: isCompleted ? "#a08060" : chapter.accentColor,
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

        {/* Link to community */}
        {completedCount > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/comunidade"
              className="inline-block rounded-full border border-[#c9a87c] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-[#c9a87c] transition-all hover:bg-[#c9a87c] hover:text-white"
            >
              Ecos — Partilhar na comunidade
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
