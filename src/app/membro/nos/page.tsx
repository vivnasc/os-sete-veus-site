"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// espelhoChapters not needed — useNosGate loads dynamically
import { chapters, bookMeta } from "@/data/no-heranca";
import { getNosBook } from "@/data/nos-collection";
import { useNosGate } from "@/hooks/useNosGate";
import Image from "next/image";
import Link from "next/link";

const nosMeta = getNosBook("no-da-heranca");

export default function NosLeituraPage() {
  const {
    espelhoCompleto,
    canAccessNos,
    hasNosPurchased,
    nosBook: nosBookMeta,
    espelhoCompletedCount,
    espelhoTotalCount,
    nosCompletedCount: completedCount,
    progress,
    isAdmin,
    hasMirrorsAccess,
    authLoading,
    loading,
    user,
  } = useNosGate();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    } else if (!authLoading && user && !hasMirrorsAccess) {
      router.push("/membro");
    }
  }, [user, authLoading, hasMirrorsAccess, router]);

  if (authLoading || !hasMirrorsAccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  // Gate 1: Espelho not complete
  if (!loading && !espelhoCompleto && !isAdmin) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/membro/espelhos/veu-da-ilusao"
            className="inline-block font-sans text-[0.65rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
          >
            &larr; Voltar ao Espelho da Ilusão
          </Link>

          <div className="mt-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c9a87c]/10">
              <svg className="h-8 w-8 text-[#c9a87c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="mt-6 font-serif text-3xl text-brown-900">O Nó da Herança</h1>
            <p className="mt-2 font-serif text-base italic text-brown-500">
              O que a mãe guardou, a filha carregou
            </p>
            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#c9a87c]/20 bg-[#c9a87c]/5 px-6 py-5">
              <p className="font-serif text-sm leading-relaxed text-brown-600">
                Este nó só se desata depois de viveres o Espelho da Ilusão por completo.
                Sara precisa de acordar antes de poder falar com Helena.
              </p>
              <p className="mt-4 font-sans text-xs text-brown-400">
                {espelhoCompletedCount} de {espelhoTotalCount} capítulos lidos
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-brown-50">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c9b896] to-[#7a8c6e] transition-all duration-1000"
                  style={{
                    width: `${(espelhoCompletedCount / espelhoTotalCount) * 100}%`,
                  }}
                />
              </div>
            </div>
            <Link
              href="/membro/espelhos/veu-da-ilusao"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c9b896] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b8a785]"
            >
              Continuar o Espelho da Ilusão &rarr;
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Gate 2: Espelho complete but No not purchased
  if (!loading && espelhoCompleto && !hasNosPurchased && !isAdmin && nosBookMeta) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/membro"
            className="inline-block font-sans text-[0.65rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
          >
            &larr; A tua experiência
          </Link>

          <div className="mt-12 text-center">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-[#7a8c6e]">
              &#10003; Espelho da Ilusão — Completo
            </p>
            <div className="mx-auto mt-6">
              <Image
                src={nosBookMeta.image}
                alt={nosBookMeta.title}
                width={140}
                height={210}
                className="mx-auto rounded-lg shadow-xl"
              />
            </div>
            <h1 className="mt-4 font-serif text-3xl text-brown-900">{nosBookMeta.title}</h1>
            <p className="mt-2 font-serif text-base italic text-brown-500">
              {nosBookMeta.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-md font-serif text-sm leading-relaxed text-brown-600">
              {nosBookMeta.description}
            </p>
            <div className="mx-auto mt-8 max-w-sm space-y-3">
              <Link
                href={`/comprar/nos/${nosBookMeta.slug}`}
                className="block rounded-full bg-[#c9a87c] px-6 py-3 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b8975b]"
              >
                Desatar este nó · ${nosBookMeta.priceUSD}
              </Link>
              <Link
                href="/comprar/espelhos"
                className="block font-sans text-xs text-brown-400 underline hover:text-brown-600"
              >
                Incluído gratuitamente no Pack ou Jornada Completa
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          {nosMeta && (
            <div className="mt-4">
              <Image
                src={nosMeta.image}
                alt={nosMeta.title}
                width={160}
                height={240}
                className="mx-auto rounded-lg shadow-xl"
              />
            </div>
          )}
          <h1 className="mt-3 font-serif text-4xl text-brown-900">{bookMeta.title}</h1>
          <p className="mt-2 font-serif text-lg italic text-brown-500">{bookMeta.subtitle}</p>
          {nosMeta && (
            <p className="mx-auto mt-4 max-w-md font-serif text-sm leading-relaxed text-brown-500">
              {nosMeta.description}
            </p>
          )}
          <p className="mx-auto mt-4 max-w-md font-serif text-sm leading-relaxed text-brown-400">
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
              href="/membro/espelhos/veu-da-ilusao"
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
