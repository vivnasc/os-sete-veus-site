"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ShareCard from "@/components/ShareCard";
import { experiences } from "@/data/experiences";

export default function JornadaCompletaPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
  }, []);

  // Full journey stats (would come from Supabase in real implementation)
  const totalChapters = 49;
  const totalReflections = 49;
  const totalItems = 147;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Grand mandala — all 7 veils */}
        <div className="py-16 text-center">
          <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
            {experiences.map((exp, i) => {
              const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
              const radius = 90;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={exp.slug}
                  className="absolute flex flex-col items-center transition-all duration-1000"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    opacity: showContent ? 1 : 0,
                    transitionDelay: `${i * 300}ms`,
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                    style={{
                      backgroundColor: exp.color,
                      boxShadow: `0 0 24px ${exp.color}50`,
                    }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}

            {/* Center — golden */}
            <div
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#c9b896] via-[#7a8c6e] to-[#baaacc] shadow-xl transition-all duration-1000"
              style={{
                opacity: showContent ? 1 : 0,
                transitionDelay: "2400ms",
                transform: showContent ? "scale(1)" : "scale(0.3)",
              }}
            >
              <span className="text-3xl text-white">&#10024;</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          className="text-center transition-all duration-1000"
          style={{ opacity: showContent ? 1 : 0, transitionDelay: "3000ms" }}
        >
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-sage">
            Cerimónia da Jornada Completa
          </p>
          <h1 className="mt-4 font-serif text-4xl text-brown-900 sm:text-5xl">
            Todos os véus caíram.
          </h1>
          <p className="mt-3 font-serif text-lg italic text-brown-500">
            E o que ficou foi a pessoa mais real que alguma vez foste.
          </p>
        </div>

        {/* Letter from Vivianne */}
        <div
          className="mt-12 rounded-2xl bg-white px-8 py-8 shadow-sm transition-all duration-1000"
          style={{
            opacity: showContent ? 1 : 0,
            transitionDelay: "3500ms",
            borderLeft: "3px solid #7a8c6e",
          }}
        >
          <p className="font-serif text-base leading-relaxed text-brown-700">
            Não sei exactamente quem eras quando começaste esta jornada. Mas sei
            quem te tornaste ao longo dela — porque o escreveste. Está tudo no
            teu Espelho.
          </p>
          <p className="mt-4 font-serif text-base leading-relaxed text-brown-700">
            Sete véus. Sete histórias. Sete formas de te esconderes de ti
            mesma. E tu, com gentileza e coragem, olhaste para cada uma.
          </p>
          <p className="mt-4 font-serif text-base leading-relaxed text-brown-700">
            Não há diploma para isto. Não há certificado. Mas há algo mais
            valioso: a certeza silenciosa de que, agora, te conheces melhor. E
            essa é a coisa mais corajosa que alguém pode fazer.
          </p>
          <p className="mt-4 font-serif text-base leading-relaxed text-brown-700">
            O que fazes com isso é contigo. Mas quero que saibas: é suficiente.
            Tu és suficiente. Sempre foste.
          </p>
          <p className="mt-6 font-serif text-sm italic text-brown-500">
            Com tudo o que sou — Vivianne
          </p>
        </div>

        {/* The 7 veils completed */}
        <div
          className="mt-8 space-y-2 transition-all duration-1000"
          style={{ opacity: showContent ? 1 : 0, transitionDelay: "4000ms" }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.slug}
              className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs text-white"
                style={{ backgroundColor: exp.color }}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <div className="flex-1">
                <p className="font-serif text-sm text-brown-800">
                  {exp.title}
                </p>
              </div>
              <p className="font-sans text-[0.6rem] text-brown-400">
                {exp.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Grand stats */}
        <div
          className="mt-8 grid grid-cols-3 gap-4 transition-all duration-1000"
          style={{ opacity: showContent ? 1 : 0, transitionDelay: "4500ms" }}
        >
          <div className="rounded-2xl bg-gradient-to-br from-[#c9b896]/10 to-[#c9b896]/20 p-5 text-center">
            <p className="font-serif text-3xl text-[#c9b896]">
              {totalChapters}
            </p>
            <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-brown-400">
              capítulos vividos
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#7a8c6e]/10 to-[#7a8c6e]/20 p-5 text-center">
            <p className="font-serif text-3xl text-[#7a8c6e]">
              {totalReflections}
            </p>
            <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-brown-400">
              reflexões escritas
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#baaacc]/10 to-[#baaacc]/20 p-5 text-center">
            <p className="font-serif text-3xl text-[#baaacc]">
              {totalItems}
            </p>
            <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-brown-400">
              passos completados
            </p>
          </div>
        </div>

        {/* Share — journey complete card */}
        <div
          className="mt-12 transition-all duration-1000"
          style={{ opacity: showContent ? 1 : 0, transitionDelay: "5000ms" }}
        >
          <ShareCard
            veilTitle="A Jornada Completa"
            veilColor="#7a8c6e"
            chaptersRead={totalChapters}
            reflectionsWritten={totalReflections}
            itemsCompleted={totalItems}
          />
        </div>

        {/* Actions */}
        <div
          className="mt-10 flex flex-col items-center gap-4 transition-all duration-1000"
          style={{ opacity: showContent ? 1 : 0, transitionDelay: "5500ms" }}
        >
          <Link
            href="/membro/espelho"
            className="inline-block rounded-full bg-gradient-to-r from-[#c9b896] to-[#7a8c6e] px-8 py-3 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white shadow-lg transition-transform hover:scale-105"
          >
            O Teu Espelho Completo
          </Link>
          <Link
            href="/membro"
            className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
          >
            Voltar à minha área
          </Link>
        </div>

        {/* Final */}
        <div
          className="mt-16 text-center transition-all duration-1000"
          style={{ opacity: showContent ? 1 : 0, transitionDelay: "6000ms" }}
        >
          <p className="font-serif italic text-brown-400">
            &ldquo;O fim é apenas o início de tudo o que escolhes a partir de
            agora.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
