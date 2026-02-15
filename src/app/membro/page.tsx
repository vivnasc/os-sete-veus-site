"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { chapters } from "@/data/ebook";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import VeilMap from "@/components/VeilMap";
import UpsellBridge from "@/components/UpsellBridge";
import ReferralPrompt from "@/components/ReferralPrompt";
import livro7Veus from "@/data/livro-7-veus.json";

export default function MembroDashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [readingProgress, setReadingProgress] = useState<Record<string, boolean>>({});
  const [journalCount, setJournalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    }
  }, [user, authLoading, router]);

  const loadProgress = useCallback(async () => {
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

    setLoading(false);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const completedChapters = chapters.filter((ch) => readingProgress[ch.slug]).length;
  const progressPercent = Math.round((completedChapters / chapters.length) * 100);

  // Find next unread chapter
  const nextChapter = chapters.find((ch) => !readingProgress[ch.slug]) || chapters[0];

  // Determine which book to show based on access — admin/autora has full access
  const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
  const isAdmin = profile?.is_admin || AUTHOR_EMAILS.includes(user?.email || "");
  const hasBookAccess = isAdmin || profile?.has_book_access || false;
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Admin bar */}
        {isAdmin && (
          <Link
            href="/admin"
            className="mb-6 flex items-center justify-between rounded-lg bg-sage/10 px-5 py-3 text-sm text-sage transition-colors hover:bg-sage/20"
          >
            <span>Estás a ver como membro</span>
            <span className="font-medium">Ir para Painel Autora &rarr;</span>
          </Link>
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

        {/* LIVRO FILOSÓFICO - Os 7 Véus do Despertar */}
        {hasBookAccess && (
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row">
              {/* Book cover */}
              <div className="flex items-center justify-center bg-gradient-to-br from-[#6b5b4a] to-[#4a3f35] px-8 py-8 sm:w-48">
                <Image
                  src="/images/mandala-7veus.png"
                  alt="Os 7 Véus do Despertar"
                  width={120}
                  height={180}
                  className="rounded shadow-lg"
                />
              </div>

              {/* Reading info */}
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
                        {livro7Veus.veus.length} Véus · Filosofia e práticas de despertar
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

        {/* ESPELHOS - Ficção (O Espelho da Ilusão) */}
        {hasMirrorsAccess && (
          <div className={`${hasBookAccess ? 'mt-6' : 'mt-10'} overflow-hidden rounded-2xl bg-white shadow-sm`}>
            <div className="flex flex-col sm:flex-row">
              {/* Book cover */}
              <div className="flex items-center justify-center bg-gradient-to-br from-[#4a433b] to-[#3d3630] px-8 py-8 sm:w-48">
                <Image
                  src="/images/espelho-1-ilusao.png"
                  alt="Espelho da Ilusão"
                  width={120}
                  height={180}
                  className="rounded shadow-lg"
                />
              </div>

              {/* Reading info */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
                    Espelho · Ficção
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-brown-900">Espelho da Ilusão</h2>
                  <p className="mt-1 font-serif text-sm italic text-brown-500">
                    Histórias de Quem Acordou a Meio
                  </p>

                  {!loading && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-brown-400">
                        <span>
                          {completedChapters === 0
                            ? "Pronta para começar"
                            : completedChapters === chapters.length
                              ? "Leitura completa"
                              : `${completedChapters} de ${chapters.length} capítulos`}
                        </span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brown-50">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#c9b896] to-[#7a8c6e] transition-all duration-1000"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href={`/membro/leitura/${nextChapter.slug}`}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c9b896] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b8a785]"
                >
                  {completedChapters === 0
                    ? "Começar a ler"
                    : completedChapters === chapters.length
                      ? "Reler desde o início"
                      : `Continuar — ${nextChapter.subtitle}`}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* No access message */}
        {!hasBookAccess && !hasMirrorsAccess && !authLoading && (
          <div className="mt-10 rounded-2xl border-2 border-brown-100 bg-white p-8 text-center">
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
          </div>
        )}

        {/* Veil Map */}
        {!loading && (
          <div className="mt-6">
            <VeilMap progress={readingProgress} />
          </div>
        )}

        {/* Secondary cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Experiência Filosófica */}
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

          {/* Práticas em Áudio */}
          <Link
            href="/membro/praticas"
            className="group rounded-2xl border border-brown-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-veu-5 to-veu-7 text-lg text-white">
                &#9835;
              </span>
              <div>
                <h3 className="font-serif text-base text-brown-800">Práticas em Áudio</h3>
                <p className="mt-0.5 font-sans text-xs text-brown-400">
                  4 práticas guiadas
                </p>
              </div>
            </div>
          </Link>

          {/* O Teu Espelho */}
          <Link
            href="/membro/espelho"
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
        </div>

        {/* Upsell Bridge — contextual suggestion */}
        {!loading && (
          <UpsellBridge
            journalCount={journalCount}
            chaptersCompleted={completedChapters}
          />
        )}

        {/* Referral Prompt — appears after engagement */}
        {!loading && (
          <ReferralPrompt chaptersCompleted={completedChapters} />
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
