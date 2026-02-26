"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { chapters as ilusaoChapters } from "@/data/ebook";
import { chapters as nosChapters } from "@/data/no-heranca";
import { experiences } from "@/data/experiences";
import { getNosForEspelho } from "@/data/nos-collection";
import { loadEspelho, espelhoProgressKey } from "@/lib/content-registry";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import VeilMap from "@/components/VeilMap";
import UpsellBridge from "@/components/UpsellBridge";
import ReferralPrompt from "@/components/ReferralPrompt";
import livro7Veus from "@/data/livro-7-veus.json";
import type { Chapter } from "@/data/ebook";

type EspelhoInfo = {
  slug: string;
  chapters: Chapter[];
};

export default function MembroDashboard() {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const router = useRouter();
  const [readingProgress, setReadingProgress] = useState<Record<string, boolean>>({});
  const [journalCount, setJournalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [espelhoData, setEspelhoData] = useState<EspelhoInfo[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [syncAttempted, setSyncAttempted] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    }
  }, [user, authLoading, router]);

  // Load all available espelho chapter data
  useEffect(() => {
    const available = experiences.filter((e) => e.status === "available");
    Promise.all(
      available.map(async (exp) => {
        const mod = await loadEspelho(exp.slug);
        return mod ? { slug: exp.slug, chapters: mod.chapters } : null;
      })
    ).then((results) => {
      setEspelhoData(results.filter((r): r is EspelhoInfo => r !== null));
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

      const [readingRes, journalRes] = await Promise.all([
        supabase
          .from("reading_progress")
          .select("chapter_slug, completed")
          .eq("user_id", userId),
        supabase
          .from("journal_entries")
          .select("chapter_slug")
          .eq("user_id", userId)
          .neq("content", ""),
      ]);

      if (readingRes.data) {
        const map: Record<string, boolean> = {};
        readingRes.data.forEach((row) => {
          map[row.chapter_slug] = row.completed;
        });
        setReadingProgress(map);
      }

      if (journalRes.data) {
        setJournalCount(journalRes.data.length);
      }
    } catch {
      // Falha na ligacao ao Supabase
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Auto-sync: se o utilizador tem sessao mas o perfil nao tem acesso,
  // verificar e reparar via API (resolve perfis partidos apos registo de codigo)
  useEffect(() => {
    if (authLoading || !user || syncAttempted) return;
    const hasAnyAccess = profile?.has_book_access || profile?.has_mirrors_access || profile?.is_admin;
    if (hasAnyAccess) return;

    // Perfil sem acesso — tentar sincronizar
    setSyncing(true);
    setSyncAttempted(true);
    fetch("/api/profile/sync", { method: "POST" })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.ok && data.action !== "no_repair_needed") {
          // Perfil reparado — recarregar
          await refreshProfile();
        }
      })
      .catch(() => {})
      .finally(() => setSyncing(false));
  }, [authLoading, user, profile, syncAttempted, refreshProfile]);

  // Compute progress for each espelho
  function getEspelhoProgress(slug: string, chapters: Chapter[]) {
    const completed = chapters.filter(
      (ch) => readingProgress[espelhoProgressKey(slug, ch.slug)]
    ).length;
    return {
      completed,
      total: chapters.length,
      percent: Math.round((completed / chapters.length) * 100),
      isComplete: completed === chapters.length,
      nextChapter: chapters.find(
        (ch) => !readingProgress[espelhoProgressKey(slug, ch.slug)]
      ) || chapters[0],
    };
  }

  // Ilusao progress (for Nos gate — backwards compat)
  const ilusaoProgress = getEspelhoProgress("veu-da-ilusao", ilusaoChapters);
  const totalCompletedChapters = espelhoData.reduce(
    (sum, e) => sum + getEspelhoProgress(e.slug, e.chapters).completed,
    0
  );

  // Nos progress
  const nosCompletedChapters = nosChapters.filter((ch) => readingProgress[`nos-${ch.slug}`]).length;
  const nosProgressPercent = Math.round((nosCompletedChapters / nosChapters.length) * 100);
  const nextNosChapter = nosChapters.find((ch) => !readingProgress[`nos-${ch.slug}`]) || nosChapters[0];

  // Access
  const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
  const isAdmin = profile?.is_admin || AUTHOR_EMAILS.includes(user?.email || "");
  const hasBookAccess = isAdmin || profile?.has_book_access || false;
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;
  const hasNosIncluded = isAdmin || (profile?.purchased_products ?? []).some(
    (p) => p.type === "journey" || p.type === "pack3" || p.type === "jornada_completa"
  );

  // Available and upcoming espelhos
  const availableExperiences = experiences.filter((e) => e.status === "available");
  const upcomingExperiences = experiences.filter((e) => e.status !== "available");

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Admin bar */}
        {isAdmin && (
          <div className="mb-6 flex gap-2">
            <Link
              href="/admin"
              className="flex flex-1 items-center justify-between rounded-lg bg-sage/10 px-4 py-3 text-sm text-sage transition-colors hover:bg-sage/20"
            >
              <span>Painel Autora</span>
              <span className="font-medium">&rarr;</span>
            </Link>
            <Link
              href="/painel/marketing"
              className="flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-3 text-sm text-gold-dark transition-colors hover:bg-gold/20"
            >
              <span className="font-medium">Conteúdo Pronto</span>
            </Link>
          </div>
        )}

        {/* Welcome */}
        <div className="text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
            Bem-vinda de volta
          </p>
          <h1 className="mt-3 font-serif text-3xl text-brown-900">
            A tua experiência
          </h1>
          <p className="mt-2 font-serif text-base text-brown-500">
            Vai ao teu ritmo. Sem pressa. Sem expectativas. Apenas presença.
          </p>
        </div>

        {/* LIVRO FILOSOFICO - Os 7 Veus do Despertar */}
        {hasBookAccess && (
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
              <div className="flex items-center justify-center bg-gradient-to-br from-[#6b5b4a] to-[#4a3f35] px-8 py-8 sm:w-48">
                <Image
                  src="/images/mandala-7veus.png"
                  alt="Os 7 Véus do Despertar"
                  width={120}
                  height={180}
                  className="rounded shadow-lg"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
                    Livro Filosófico
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-brown-900">{livro7Veus.titulo}</h2>
                  <p className="mt-1 font-serif text-sm italic text-brown-500">
                    {livro7Veus.subtitulo}
                  </p>
                  {!loading && (
                    <div className="mt-4">
                      <p className="text-xs text-brown-400">
                        {livro7Veus.veus.length} Veus · Filosofia e práticas de despertar
                      </p>
                    </div>
                  )}
                </div>
                <Link
                  href="/livro"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6b5b4a] to-[#8b7355] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-all hover:opacity-90"
                >
                  Começar a ler
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ESPELHOS — Dynamic cards for all available espelhos */}
        {hasMirrorsAccess && espelhoData.map((espelho) => {
          const exp = experiences.find((e) => e.slug === espelho.slug);
          if (!exp) return null;
          const prog = getEspelhoProgress(espelho.slug, espelho.chapters);
          const nosBook = getNosForEspelho(espelho.slug);

          return (
            <div key={espelho.slug}>
              {/* Espelho card */}
              <div className={`${hasBookAccess || espelhoData.indexOf(espelho) > 0 ? 'mt-6' : 'mt-10'} overflow-hidden rounded-2xl bg-white shadow-sm`}>
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="flex items-center justify-center px-8 py-8 sm:w-48"
                    style={{
                      background: `linear-gradient(135deg, ${exp.color}40, ${exp.color}20)`,
                    }}
                  >
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      width={90}
                      height={120}
                      className="rounded shadow-lg"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
                        Espelho {exp.number} · Ficção
                      </p>
                      <h2 className="mt-1 font-serif text-2xl text-brown-900">{exp.title}</h2>
                      <p className="mt-1 font-serif text-sm italic text-brown-500">
                        {exp.subtitle}
                      </p>
                      {!loading && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs text-brown-400">
                            <span>
                              {prog.completed === 0
                                ? "Pronta para começar"
                                : prog.isComplete
                                  ? "Leitura completa"
                                  : `${prog.completed} de ${prog.total} capítulos`}
                            </span>
                            <span>{prog.percent}%</span>
                          </div>
                          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brown-50">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${prog.percent}%`,
                                background: `linear-gradient(to right, ${exp.color}, ${exp.color}dd)`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/membro/espelhos/${espelho.slug}/${prog.nextChapter.slug}`}
                      className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors"
                      style={{ backgroundColor: exp.color }}
                    >
                      {prog.completed === 0
                        ? "Começar a ler"
                        : prog.isComplete
                          ? "Reler desde o início"
                          : `Continuar — ${prog.nextChapter.subtitle}`}
                    </Link>
                  </div>
                </div>
              </div>

              {/* No teaser (locked — espelho nao completo) */}
              {nosBook && !prog.isComplete && prog.completed > 0 && nosBook.status === "available" && (
                <div className="mt-3 overflow-hidden rounded-2xl border-2 border-dashed border-[#c9a87c]/25 bg-[#c9a87c]/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a87c]/10">
                      <svg className="h-5 w-5 text-[#c9a87c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a87c]">
                        Colecção Nós
                      </p>
                      <p className="mt-1 font-serif text-base text-brown-800">{nosBook.title}</p>
                      <p className="mt-1 font-sans text-xs text-brown-400">
                        Disponível ao completar {exp.title}
                        {!hasNosIncluded && ` · $${nosBook.priceUSD}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* No — espelho completo */}
              {nosBook && prog.isComplete && nosBook.status === "available" && (
                <div className="mt-3 overflow-hidden rounded-2xl border border-[#c9a87c]/40 bg-gradient-to-br from-[#faf7f2] to-white shadow-sm">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex items-center justify-center bg-gradient-to-br from-[#5a4d3e] to-[#3d3428] px-8 py-8 sm:w-48">
                      <Image
                        src={nosBook.image}
                        alt={nosBook.title}
                        width={90}
                        height={135}
                        className="rounded shadow-lg"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[#c9a87c]">
                          Nó · Ficção Relacional
                        </p>
                        <h2 className="mt-1 font-serif text-2xl text-brown-900">{nosBook.title}</h2>
                        <p className="mt-1 font-serif text-sm italic text-brown-500">
                          {nosBook.subtitle}
                        </p>
                        {!loading && hasNosIncluded && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-xs text-brown-400">
                              <span>
                                {nosCompletedChapters === 0
                                  ? nosBook.characters
                                  : nosCompletedChapters === nosChapters.length
                                    ? "Leitura completa"
                                    : `${nosCompletedChapters} de ${nosChapters.length} partes`}
                              </span>
                              <span>{nosProgressPercent}%</span>
                            </div>
                            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brown-50">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#c9a87c] to-[#a08060] transition-all duration-1000"
                                style={{ width: `${nosProgressPercent}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {!loading && !hasNosIncluded && (
                          <p className="mt-3 font-serif text-sm leading-relaxed text-brown-500">
                            {nosBook.description}
                          </p>
                        )}
                      </div>
                      {hasNosIncluded ? (
                        <Link
                          href={`/membro/nos/${nextNosChapter.slug}`}
                          className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c9a87c] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b8975b]"
                        >
                          {nosCompletedChapters === 0
                            ? "Desatar este nó"
                            : nosCompletedChapters === nosChapters.length
                              ? "Reler desde o início"
                              : `Continuar — ${nextNosChapter.subtitle}`}
                        </Link>
                      ) : (
                        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                          <Link
                            href={`/comprar/nos/${nosBook.slug}`}
                            className="inline-flex items-center justify-center rounded-full bg-[#c9a87c] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b8975b]"
                          >
                            Desatar este nó · ${nosBook.priceUSD}
                          </Link>
                          <Link
                            href="/comprar/espelhos"
                            className="font-sans text-[0.6rem] text-brown-400 underline hover:text-brown-600"
                          >
                            Incluído no Pack ou Jornada
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Upcoming espelhos */}
        {hasMirrorsAccess && upcomingExperiences.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
              Próximos Espelhos
            </h3>
            <div className="space-y-3">
              {upcomingExperiences.map((exp) => (
                <div
                  key={exp.slug}
                  className="flex items-center gap-4 rounded-2xl border border-brown-50 bg-white/60 p-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                    style={{ backgroundColor: exp.color + "60" }}
                  >
                    {exp.number}
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-base text-brown-700">{exp.title}</p>
                    <p className="font-sans text-xs text-brown-400">{exp.subtitle}</p>
                  </div>
                  <span className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-300">
                    {exp.launchLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Convite para os Espelhos — para quem so tem acesso ao livro */}
        {hasBookAccess && !hasMirrorsAccess && !loading && (
          <div className="mt-8 rounded-2xl border border-[#c9b896]/30 bg-[#c9b896]/[0.04] p-6 text-center">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-[#c9b896]">
              Colecção Espelhos
            </p>
            <p className="mt-2 font-serif text-base text-brown-700">
              Sete histórias. Sete véus. Sete formas de voltar a ti mesma.
            </p>
            <p className="mt-1 font-serif text-sm text-brown-400">
              Ficção contemplativa que acompanha a jornada filosófica.
            </p>
            <Link
              href="/comprar/espelhos"
              className="mt-4 inline-flex items-center justify-center rounded-full border-2 border-[#c9b896] px-6 py-2 font-sans text-[0.65rem] uppercase tracking-[0.15em] text-[#c9b896] transition-all hover:bg-[#c9b896] hover:text-white"
            >
              Descobrir Espelhos
            </Link>
          </div>
        )}

        {/* No access message */}
        {!hasBookAccess && !hasMirrorsAccess && !authLoading && (
          <div className="mt-10 rounded-2xl border-2 border-brown-100 bg-white p-8 text-center">
            {syncing ? (
              <>
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
                <p className="mt-4 font-serif text-base text-brown-500">
                  A verificar o teu acesso...
                </p>
              </>
            ) : (
              <>
                <p className="font-serif text-lg text-brown-700">
                  Ainda não tens acesso a nenhum conteúdo
                </p>
                <p className="mt-2 text-sm text-brown-500">
                  Regista o teu código do livro físico ou adquire uma experiência digital
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/registar-livro"
                    className="rounded-lg bg-sage px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
                  >
                    Registar código
                  </Link>
                  <Link
                    href="/comprar/espelhos"
                    className="rounded-lg border-2 border-sage bg-transparent px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
                  >
                    Ver Espelhos
                  </Link>
                </div>
                {syncAttempted && (
                  <button
                    onClick={async () => {
                      setSyncing(true);
                      try {
                        const res = await fetch("/api/profile/sync", { method: "POST" });
                        const data = await res.json();
                        if (data.ok && data.action !== "no_repair_needed") {
                          await refreshProfile();
                        }
                      } catch {}
                      setSyncing(false);
                    }}
                    className="mt-4 text-sm text-brown-400 underline hover:text-brown-600"
                  >
                    Ja registei um código — verificar de novo
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Veil Map — so para quem tem acesso ao livro */}
        {!loading && hasBookAccess && (
          <div className="mt-6">
            <VeilMap progress={readingProgress} />
          </div>
        )}

        {/* Secondary cards — so aparecem se o utilizador tem algum acesso */}
        {(hasBookAccess || hasMirrorsAccess) && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {hasBookAccess && (
              <Link
                href="/livro"
                className="group rounded-2xl border border-brown-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-veu-1 to-veu-4 text-lg text-white">
                    &#10047;
                  </span>
                  <div>
                    <h3 className="font-serif text-base text-brown-800">Experiência Filosófica</h3>
                    <p className="mt-0.5 font-sans text-xs text-brown-400">
                      Mandala dos 7 véus
                    </p>
                  </div>
                </div>
              </Link>
            )}


            {hasBookAccess && (
              <Link
                href="/livro/espelho"
                className="group rounded-2xl border border-brown-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#c9b896] to-[#7a8c6e] text-lg text-white">
                    &#9826;
                  </span>
                  <div>
                    <h3 className="font-serif text-base text-brown-800">O Teu Espelho</h3>
                    <p className="mt-0.5 font-sans text-xs text-brown-400">
                      {journalCount > 0
                        ? `${journalCount} reflexões escritas`
                        : "As tuas reflexões reunidas"}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            <Link
              href="/comunidade"
              className="group rounded-2xl border border-brown-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-veu-3 to-veu-7 text-lg text-white">
                  ~
                </span>
                <div>
                  <h3 className="font-serif text-base text-brown-800">Ecos</h3>
                  <p className="mt-0.5 font-sans text-xs text-brown-400">
                    Comunidade de ressonância
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Upsell Bridge */}
        {!loading && (
          <UpsellBridge
            journalCount={journalCount}
            chaptersCompleted={totalCompletedChapters}
          />
        )}

        {/* Referral Prompt */}
        {!loading && (
          <ReferralPrompt chaptersCompleted={totalCompletedChapters} />
        )}

        {/* Gentle quote */}
        <div className="mt-10 text-center">
          <p className="font-serif text-sm italic text-brown-400">
            &ldquo;Porque perguntar, mesmo tarde, é o primeiro gesto de se escolher.&rdquo;
          </p>
        </div>

        <p className="mt-6 text-center font-sans text-xs text-brown-300">
          {user?.email}
        </p>
      </div>
    </section>
  );
}
