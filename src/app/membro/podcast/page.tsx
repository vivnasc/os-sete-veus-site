"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import { useState } from "react";
import {
  getPublicEpisodes,
  getExclusiveEpisodes,
  PODCAST_META,
  type PodcastEpisode,
} from "@/data/podcast-series";

function EpisodeCard({
  ep,
  locked,
}: {
  ep: PodcastEpisode;
  locked?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow ${
        locked
          ? "border-dashed border-brown-200 opacity-80"
          : "border-brown-100 hover:shadow-md"
      }`}
    >
      <div className="flex items-stretch">
        <div
          className="w-1.5 shrink-0"
          style={{ background: locked ? "#d4cfc7" : ep.color }}
        />
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                {ep.type === "exclusive" ? "Exclusivo" : "Público"} ~{" "}
                {ep.durationEstimate}
              </p>
              <h3 className="mt-1 font-serif text-lg text-brown-900">
                {locked && (
                  <span className="mr-2 inline-block text-brown-300">
                    &#128274;
                  </span>
                )}
                {ep.title}
              </h3>
              <p className="mt-0.5 font-serif text-sm italic text-brown-500">
                {ep.subtitle}
              </p>
            </div>
            <span
              className="mt-1 shrink-0 rounded-full px-2.5 py-0.5 font-sans text-[0.55rem] uppercase tracking-wider text-white"
              style={{ background: locked ? "#d4cfc7" : ep.color }}
            >
              Véu {ep.veu}
            </span>
          </div>

          <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
            {ep.description}
          </p>

          {locked ? (
            <p className="mt-4 font-serif text-[0.75rem] italic text-brown-400">
              Disponível após completar o Espelho correspondente.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              <AudioPlayer
                src={ep.audioUrl}
                title={`Ep. ${ep.number} — ${ep.title}`}
              />
              <button
                onClick={() => setExpanded(!expanded)}
                className="font-sans text-[0.6rem] uppercase tracking-wider text-sage transition-colors hover:text-sage-dark"
              >
                {expanded ? "Fechar guião" : "Ler guião do episódio"}
              </button>
              {expanded && (
                <div className="max-h-64 overflow-y-auto rounded-lg bg-brown-50 p-4">
                  {ep.script.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="mb-3 font-serif text-sm leading-relaxed text-brown-700 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function MembroPodcastPage() {
  const { profile } = useAuth();
  const publicEps = getPublicEpisodes();
  const exclusiveEps = getExclusiveEpisodes();

  const hasMirrorsAccess =
    profile?.has_mirrors_access || profile?.is_admin;

  const [tab, setTab] = useState<"public" | "exclusive">("public");

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
          Podcast
        </p>
        <h1 className="mt-2 font-serif text-2xl text-brown-900 sm:text-3xl">
          {PODCAST_META.title}
        </h1>
        <p className="mt-2 font-serif text-base italic text-brown-500">
          {PODCAST_META.subtitle}
        </p>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 rounded-full bg-brown-100 p-1">
          <button
            onClick={() => setTab("public")}
            className={`flex-1 rounded-full px-4 py-2 font-sans text-[0.65rem] uppercase tracking-[0.12em] transition-colors ${
              tab === "public"
                ? "bg-white text-brown-900 shadow-sm"
                : "text-brown-500 hover:text-brown-700"
            }`}
          >
            Episódios públicos (7)
          </button>
          <button
            onClick={() => setTab("exclusive")}
            className={`flex-1 rounded-full px-4 py-2 font-sans text-[0.65rem] uppercase tracking-[0.12em] transition-colors ${
              tab === "exclusive"
                ? "bg-white text-brown-900 shadow-sm"
                : "text-brown-500 hover:text-brown-700"
            }`}
          >
            Por Trás do Véu (7)
          </button>
        </div>

        {/* Episode list */}
        <div className="mt-6 space-y-5">
          {tab === "public" ? (
            publicEps.map((ep) => <EpisodeCard key={ep.id} ep={ep} />)
          ) : hasMirrorsAccess ? (
            exclusiveEps.map((ep) => <EpisodeCard key={ep.id} ep={ep} />)
          ) : (
            <>
              <div className="rounded-2xl border border-dashed border-brown-200 bg-brown-50 p-6 text-center">
                <p className="font-serif text-sm text-brown-600">
                  Os episódios exclusivos estão disponíveis para quem tem acesso
                  aos Espelhos.
                </p>
                <Link
                  href="/experiencias"
                  className="mt-4 inline-block rounded-full bg-sage px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-sage-dark"
                >
                  Descobrir os Espelhos
                </Link>
              </div>
              {exclusiveEps.map((ep) => (
                <EpisodeCard key={ep.id} ep={ep} locked />
              ))}
            </>
          )}
        </div>

        {/* Char count info for admin */}
        {profile?.is_admin && (
          <div className="mt-12 rounded-lg border border-brown-100 bg-brown-50 p-4">
            <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
              Info admin — caracteres
            </p>
            <div className="mt-2 space-y-1 font-mono text-xs text-brown-600">
              {[...publicEps, ...exclusiveEps].map((ep) => (
                <div key={ep.id} className="flex justify-between">
                  <span>{ep.title}</span>
                  <span>{ep.charCount.toLocaleString()} chars</span>
                </div>
              ))}
              <div className="mt-2 border-t border-brown-200 pt-2 font-bold">
                <div className="flex justify-between">
                  <span>Total episódios</span>
                  <span>
                    {[...publicEps, ...exclusiveEps]
                      .reduce((s, e) => s + e.charCount, 0)
                      .toLocaleString()}{" "}
                    chars
                  </span>
                </div>
                <div className="flex justify-between text-brown-400">
                  <span>+ Intro/Outro</span>
                  <span>
                    {(
                      PODCAST_META.introScript.length +
                      PODCAST_META.outroScript.length
                    ).toLocaleString()}{" "}
                    chars
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
