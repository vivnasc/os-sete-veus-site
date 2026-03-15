"use client";

import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import {
  getPublicEpisodes,
  PODCAST_META,
} from "@/data/podcast-series";

export default function PodcastContent() {
  const episodes = getPublicEpisodes();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brown-50 to-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
            Podcast
          </p>
          <h1 className="mt-3 font-serif text-3xl text-brown-900 sm:text-5xl">
            {PODCAST_META.title}
          </h1>
          <p className="mt-4 font-serif text-base italic text-brown-500 sm:text-lg">
            {PODCAST_META.subtitle}
          </p>
          <p className="mx-auto mt-6 max-w-xl font-serif text-sm leading-relaxed text-brown-600">
            {PODCAST_META.description}
          </p>
        </div>
      </section>

      {/* Episode list */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
            Temporada 1 ~ 7 episódios
          </p>
          <div className="mt-8 space-y-6">
            {episodes.map((ep) => (
              <article
                key={ep.id}
                className="overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-stretch">
                  <div
                    className="w-1.5 shrink-0"
                    style={{ background: ep.color }}
                  />
                  <div className="flex-1 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                          Episódio {ep.number} ~ {ep.durationEstimate}
                        </p>
                        <h2 className="mt-1 font-serif text-lg text-brown-900 sm:text-xl">
                          {ep.title}
                        </h2>
                        <p className="mt-0.5 font-serif text-sm italic text-brown-500">
                          {ep.subtitle}
                        </p>
                      </div>
                      <span
                        className="mt-1 shrink-0 rounded-full px-2.5 py-0.5 font-sans text-[0.55rem] uppercase tracking-wider text-white"
                        style={{ background: ep.color }}
                      >
                        Véu {ep.veu}
                      </span>
                    </div>
                    <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
                      {ep.description}
                    </p>
                    <div className="mt-4">
                      <AudioPlayer
                        src={ep.audioUrl}
                        title={`Ep. ${ep.number} — ${ep.title}`}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive teaser */}
      <section className="bg-brown-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-400">
            Episódios exclusivos
          </p>
          <h2 className="mt-3 font-serif text-2xl text-brown-900">
            Por Trás do Véu
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-serif text-sm leading-relaxed text-brown-600">
            Para cada véu, existe um episódio mais profundo — uma reflexão
            íntima disponível apenas para quem leu o Espelho correspondente.
            Sete episódios. Sete reflexões. Só para quem viveu.
          </p>
          <Link
            href="/experiencias"
            className="mt-8 inline-block rounded-full bg-sage px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-sage-dark"
          >
            Descobrir os Espelhos
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-brown-100 bg-white p-6 sm:p-8">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
              Sobre o podcast
            </p>
            <h3 className="mt-2 font-serif text-lg text-brown-900">
              Quem é a Vivianne?
            </h3>
            <p className="mt-3 font-serif text-sm leading-relaxed text-brown-600">
              Vivianne dos Santos é economista, escritora e criadora da
              plataforma Os Sete Véus do Despertar. Moçambicana, traz uma voz
              que mistura rigor e ternura, análise e poesia. Nesta série, partilha
              as histórias que a levaram a escrever os Espelhos — e convida-te a
              olhar para os teus.
            </p>
            <Link
              href="/sobre"
              className="mt-4 inline-block font-sans text-[0.65rem] uppercase tracking-wider text-sage transition-colors hover:text-sage-dark"
            >
              Saber mais sobre a autora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
