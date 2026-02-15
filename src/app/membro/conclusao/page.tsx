"use client";

import { useEffect, useState, useCallback } from "react";
import { chapters } from "@/data/ebook";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ShareCard from "@/components/ShareCard";
import CeremonyUpsell from "@/components/CeremonyUpsell";

export default function ConclusaoPage() {
  const [readCount, setReadCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [checklistCount, setChecklistCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const loadStats = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) {
      setLoading(false);
      return;
    }

    const [readRes, journalRes, checkRes] = await Promise.all([
      supabase
        .from("reading_progress")
        .select("chapter_slug")
        .eq("user_id", userId)
        .eq("completed", true),
      supabase
        .from("journal_entries")
        .select("chapter_slug")
        .eq("user_id", userId)
        .neq("content", ""),
      supabase
        .from("checklist_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("checked", true),
    ]);

    setReadCount(readRes.data?.length || 0);
    setJournalCount(journalRes.data?.length || 0);
    setChecklistCount(checkRes.data?.length || 0);
    setLoading(false);

    // Trigger animation after load
    setTimeout(() => setShowContent(true), 300);
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const allRead = readCount === chapters.length;

  // Veil colors for the mandala
  const veilColors = [
    "#c9b896", "#7a8c6e", "#b8956c", "#8a7b6b",
    "#b07a7a", "#6e8c7a", "#c9b896",
  ];

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
          </div>
        ) : !allRead ? (
          /* Not yet complete */
          <div className="py-16 text-center">
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
              Ainda não chegaste aqui
            </p>
            <h1 className="mt-4 font-serif text-3xl text-brown-900">
              A cerimónia espera por ti
            </h1>
            <p className="mx-auto mt-4 max-w-md font-serif text-base text-brown-500">
              Quando terminares a leitura de todos os capítulos, esta página ganha vida.
              Vai ao teu ritmo. Sem pressa.
            </p>
            <p className="mt-6 font-sans text-sm text-brown-400">
              {readCount} de {chapters.length} capítulos lidos
            </p>
            <div className="mx-auto mt-2 h-2 w-48 overflow-hidden rounded-full bg-brown-50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#c9b896] to-[#7a8c6e] transition-all"
                style={{ width: `${(readCount / chapters.length) * 100}%` }}
              />
            </div>
            <Link
              href="/membro/leitura"
              className="mt-8 inline-block rounded-full bg-[#c9b896] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white hover:bg-[#b8a785]"
            >
              Continuar a ler
            </Link>
          </div>
        ) : (
          /* Ceremony */
          <div className={`transition-all duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
            {/* Mandala of unveiled veils */}
            <div className="py-12 text-center">
              <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
                {veilColors.map((color, i) => {
                  const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
                  const radius = 70;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={i}
                      className="absolute h-10 w-10 rounded-full transition-all duration-1000"
                      style={{
                        backgroundColor: color,
                        transform: `translate(${x}px, ${y}px)`,
                        opacity: showContent ? 1 : 0,
                        transitionDelay: `${i * 200}ms`,
                        boxShadow: `0 0 20px ${color}40`,
                      }}
                    />
                  );
                })}
                {/* Center */}
                <div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-1000"
                  style={{
                    opacity: showContent ? 1 : 0,
                    transitionDelay: "1600ms",
                    transform: showContent ? "scale(1)" : "scale(0.5)",
                  }}
                >
                  <span className="text-2xl">&#10024;</span>
                </div>
              </div>
            </div>

            <div
              className="text-center transition-all duration-1000"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: "2000ms" }}
            >
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-[#7a8c6e]">
                Cerimónia de conclusão
              </p>
              <h1 className="mt-4 font-serif text-4xl text-brown-900">
                O véu caiu.
              </h1>
              <p className="mt-2 font-serif text-lg italic text-brown-500">
                E debaixo dele encontraste-te a ti.
              </p>
            </div>

            {/* Message */}
            <div
              className="mt-12 rounded-2xl border-l-[3px] border-[#7a8c6e] bg-white px-6 py-6 shadow-sm transition-all duration-1000"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: "2500ms" }}
            >
              <p className="font-serif text-base leading-relaxed text-brown-700">
                Terminaste a leitura de O Espelho da Ilusão. Não é pouco. Muitas pessoas começam
                coisas que exigem presença e desistem a meio — não por fraqueza, mas porque
                olhar para dentro é o acto mais corajoso que existe.
              </p>
              <p className="mt-4 font-serif text-base leading-relaxed text-brown-700">
                Tu ficaste. Tu leste. Tu escreveste. Tu permitiste-te sentir.
              </p>
              <p className="mt-4 font-serif text-base leading-relaxed text-brown-700">
                E isso, por mais pequeno que pareça, muda tudo.
              </p>
              <p className="mt-6 font-serif text-sm italic text-brown-500">
                — Vivianne
              </p>
            </div>

            {/* Stats */}
            <div
              className="mt-8 grid grid-cols-3 gap-4 transition-all duration-1000"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: "3000ms" }}
            >
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="font-serif text-2xl text-[#c9b896]">{readCount}</p>
                <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-brown-400">
                  capítulos lidos
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="font-serif text-2xl text-[#7a8c6e]">{journalCount}</p>
                <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-brown-400">
                  reflexões escritas
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="font-serif text-2xl text-[#b07a7a]">{checklistCount}</p>
                <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-brown-400">
                  itens completados
                </p>
              </div>
            </div>

            {/* Actions */}
            <div
              className="mt-10 flex flex-col items-center gap-4 transition-all duration-1000"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: "3500ms" }}
            >
              <Link
                href="/membro/espelho"
                className="inline-block rounded-full bg-[#7a8c6e] px-8 py-3 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#6a7c5e]"
              >
                Ver O Teu Espelho
              </Link>
              <Link
                href="/membro/leitura"
                className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
              >
                Reler desde o início
              </Link>
            </div>

            {/* Share card */}
            <div
              className="mt-12 transition-all duration-1000"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: "4000ms" }}
            >
              <ShareCard
                veilTitle="O Espelho da Ilusão"
                veilColor="#c9b896"
                chaptersRead={readCount}
                reflectionsWritten={journalCount}
                itemsCompleted={checklistCount}
              />
            </div>

            {/* Upsell — next experience */}
            <div
              className="mt-12 transition-all duration-1000"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: "4500ms" }}
            >
              <CeremonyUpsell completedVeilSlug="veu-da-ilusao" />
            </div>

            {/* Convite Semente */}
            <div
              className="mt-12 transition-all duration-1000"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: "5500ms" }}
            >
              <div className="rounded-2xl border border-sage/20 bg-sage/5 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10">
                  <span className="text-xl">&#127793;</span>
                </div>
                <p className="font-serif text-base text-brown-700">
                  Este trabalho existe porque alguém acreditou que merecia existir.
                </p>
                <p className="mx-auto mt-2 max-w-sm font-serif text-sm text-brown-500">
                  Se esta experiência te tocou, podes plantar uma semente —
                  um gesto que permite que este trabalho chegue a mais pessoas.
                </p>
                <Link
                  href="/semente"
                  className="mt-5 inline-block rounded-full bg-sage px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-sage-dark"
                >
                  Plantar uma Semente
                </Link>
              </div>
            </div>

            {/* Final quote */}
            <div
              className="mt-16 text-center transition-all duration-1000"
              style={{ opacity: showContent ? 1 : 0, transitionDelay: "6000ms" }}
            >
              <p className="font-serif text-sm italic text-brown-400">
                &ldquo;Há mais para ti do que aquilo que tens vivido.&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
