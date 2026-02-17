"use client";

import { use, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { loadEspelho, isEspelhoRegistered, espelhoProgressKey } from "@/lib/content-registry";
import { getExperience } from "@/data/experiences";
import { getNosForEspelho } from "@/data/nos-collection";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import type { ContentModule } from "@/lib/content-registry";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

export default function EspelhoHubPage({ params }: { params: Promise<{ veu: string }> }) {
  const { veu } = use(params);
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState<ContentModule | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.is_admin || AUTHOR_EMAILS.includes(user?.email || "");
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;

  const experience = getExperience(veu);
  const nosBook = getNosForEspelho(veu);

  // Load espelho content from registry
  useEffect(() => {
    if (!isEspelhoRegistered(veu)) return;
    loadEspelho(veu).then((mod) => {
      if (mod) setContent(mod);
    });
  }, [veu]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    } else if (!authLoading && user && !hasMirrorsAccess) {
      router.push("/membro");
    }
  }, [user, authLoading, hasMirrorsAccess, router]);

  const loadProgress = useCallback(async () => {
    if (!content) return;
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
  }, [content]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  if (authLoading || !hasMirrorsAccess) return null;

  if (!isEspelhoRegistered(veu) || !content) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="text-brown-600">Espelho nao encontrado.</p>
        <Link href="/membro" className="mt-4 inline-block text-sage hover:underline">
          Voltar
        </Link>
      </section>
    );
  }

  const { chapters, bookMeta } = content;
  const accentColor = experience?.color || "#c9b896";

  const completedCount = chapters.filter(
    (ch) => progress[espelhoProgressKey(veu, ch.slug)]
  ).length;
  const espelhoCompleto = completedCount === chapters.length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Back */}
        <Link
          href="/membro"
          className="inline-block font-sans text-[0.65rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
        >
          &larr; A tua experiencia
        </Link>

        {/* Book header */}
        <div className="mb-10 mt-6 text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
            {bookMeta.author}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-brown-900">{bookMeta.title}</h1>
          <p className="mt-2 font-serif text-lg italic text-brown-500">{bookMeta.subtitle}</p>
          <p className="mx-auto mt-6 max-w-md font-serif text-sm leading-relaxed text-brown-500 whitespace-pre-line">
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
                  ? "Pronta para comecar?"
                  : espelhoCompleto
                    ? "Leitura completa"
                    : `${completedCount} de ${chapters.length} capitulos`}
            </span>
            <span className="font-sans text-xs text-brown-400">
              {progressPercent}%
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-brown-50">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(to right, ${accentColor}, ${accentColor}dd)`,
              }}
            />
          </div>
        </div>

        {/* Intro text */}
        <div
          className="mb-8 rounded-2xl bg-white px-6 py-5 shadow-sm"
          style={{ borderLeft: `3px solid ${accentColor}` }}
        >
          {bookMeta.intro.map((p, i) => (
            <p key={i} className="mt-3 font-serif text-sm leading-relaxed text-brown-600 first:mt-0">
              {p}
            </p>
          ))}
        </div>

        {/* Chapter list */}
        <div className="space-y-3">
          {chapters.map((chapter) => {
            const key = espelhoProgressKey(veu, chapter.slug);
            const isCompleted = progress[key];
            const isFirst = chapter.number === 1;
            const prevCompleted =
              chapter.number <= 1 ||
              progress[espelhoProgressKey(veu, chapters[chapter.number - 2]?.slug)];
            const isAccessible = isFirst || prevCompleted || isCompleted;

            return (
              <Link
                key={chapter.slug}
                href={isAccessible ? `/membro/espelhos/${veu}/${chapter.slug}` : "#"}
                className={`group flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all ${
                  isAccessible
                    ? "border-brown-100 hover:shadow-md"
                    : "cursor-default border-brown-50 opacity-50"
                }`}
              >
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

        {/* No teaser (locked) */}
        {nosBook && !loading && !espelhoCompleto && completedCount > 0 && (
          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-dashed border-[#c9a87c]/30 bg-[#c9a87c]/[0.03] p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a87c]/10 text-[#c9a87c]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <div>
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a87c]">
                  Coleccao Nos
                </p>
                <p className="mt-1 font-serif text-lg text-brown-800">{nosBook.title}</p>
                <p className="mt-2 font-serif text-sm italic leading-relaxed text-brown-500">
                  {nosBook.subtitle}
                </p>
                <p className="mt-3 font-sans text-xs text-brown-400">
                  Disponivel ao completar este espelho.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No unlocked */}
        {nosBook && !loading && espelhoCompleto && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#c9a87c]/40 bg-gradient-to-br from-[#faf7f2] to-white p-6 shadow-sm">
            <div className="text-center">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-[#7a8c6e]">
                &#10003; {bookMeta.title} — Completo
              </p>
            </div>
            <div className="mt-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c9a87c]/15">
                <span className="font-serif text-xl text-[#c9a87c]">&#8734;</span>
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg text-brown-800">{nosBook.title}</p>
                <p className="mt-0.5 font-sans text-xs text-[#c9a87c]">{nosBook.characters}</p>
                <p className="mt-2 font-serif text-sm leading-relaxed text-brown-600">
                  {nosBook.description}
                </p>
                {nosBook.status === "available" ? (
                  <Link
                    href="/membro/nos"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#c9a87c] px-5 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b8975b]"
                  >
                    Desatar este no &rarr;
                  </Link>
                ) : (
                  <p className="mt-3 font-sans text-xs text-brown-400">
                    Em breve
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Espelho journal link */}
        {completedCount > 0 && (
          <div className="mt-6 text-center">
            <Link
              href="/membro/espelho"
              className="inline-block rounded-full border px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] transition-all hover:text-white"
              style={{
                borderColor: accentColor,
                color: accentColor,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = accentColor;
                (e.target as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
                (e.target as HTMLElement).style.color = accentColor;
              }}
            >
              O Teu Espelho — Ver as tuas reflexoes
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
