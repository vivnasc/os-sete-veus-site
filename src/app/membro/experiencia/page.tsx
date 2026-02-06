"use client";

import Link from "next/link";

const modulos = [
  {
    slug: "modulo-0",
    dia: "Boas-vindas",
    nome: "Materiais Completos",
    desc: "Mini-guia, ebook e planner para a tua jornada.",
    color: "#4a433b",
  },
  {
    slug: "modulo-1",
    dia: "Dia 1",
    nome: "O Véu da Conformidade",
    desc: "Quando fazer o que é esperado se tornou mais natural do que perguntar o que queres.",
    color: "#c9b896",
  },
  {
    slug: "modulo-2",
    dia: "Dia 2",
    nome: "O Véu da Repetição",
    desc: "Os padrões que se repetem sem seres tu a escolhê-los.",
    color: "#7a8c6e",
  },
  {
    slug: "modulo-3",
    dia: "Dia 3",
    nome: "O Véu do Silenciamento",
    desc: "As vozes que calaste — incluindo a tua.",
    color: "#b07a7a",
  },
  {
    slug: "modulo-4",
    dia: "Dia 4",
    nome: "O Véu da Agradabilidade",
    desc: "O preço de ser sempre agradável. O que custa agradar a todos.",
    color: "#8a7b6b",
  },
  {
    slug: "modulo-5",
    dia: "Dia 5",
    nome: "O Véu da Neutralidade",
    desc: "Quando deixaste de sentir para poder continuar a funcionar.",
    color: "#6e8c7a",
  },
  {
    slug: "modulo-6",
    dia: "Dia 6",
    nome: "O Véu da Falsa Escolha",
    desc: "As decisões que pareciam tuas mas nasceram de expectativas.",
    color: "#b8956c",
  },
  {
    slug: "modulo-7",
    dia: "Dia 7",
    nome: "O Véu do Esquecimento",
    desc: "Esqueceste quem eras antes de te moldares. É hora de lembrar.",
    color: "#8a7b9c",
  },
];

export default function ExperienciaPage() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
            Experiência dos 7 Véus
          </p>
          <h1 className="mt-3 font-serif text-3xl text-brown-900">7 Dias, 7 Véus</h1>
          <p className="mx-auto mt-3 max-w-md font-serif text-base text-brown-500">
            Cada dia é um convite a olhar para uma camada diferente.
            Vai ao teu ritmo. Sem pressa. Sem expectativas.
          </p>
        </div>

        {/* Info box */}
        <div className="mt-8 rounded-2xl border-l-[3px] border-[#7a8c6e] bg-white px-5 py-4 shadow-sm">
          <p className="font-serif text-sm leading-relaxed text-brown-600">
            Esta experiência está em construção. Cada módulo terá uma carta da Vivianne,
            um checklist interactivo, uma reflexão guiada e, em alguns dias, uma prática em áudio.
            Os primeiros módulos estarão disponíveis em breve.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {modulos.map((mod, i) => (
            <div
              key={mod.slug}
              className="flex items-start gap-4 rounded-2xl border border-brown-100 bg-white p-5 shadow-sm"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-sans text-sm font-bold text-white"
                style={{ backgroundColor: mod.color }}
              >
                {i}
              </span>
              <div className="flex-1">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                  {mod.dia}
                </p>
                <h2 className="font-serif text-base text-brown-800">{mod.nome}</h2>
                <p className="mt-1 font-serif text-sm text-brown-400">{mod.desc}</p>
              </div>
              <span className="mt-1 font-sans text-[0.55rem] uppercase tracking-wider text-brown-300">
                Em breve
              </span>
            </div>
          ))}
        </div>

        {/* CTA to reader */}
        <div className="mt-10 text-center">
          <p className="font-serif text-sm text-brown-500">
            Enquanto os módulos são preparados, começa pela leitura:
          </p>
          <Link
            href="/membro/leitura"
            className="mt-3 inline-block rounded-full bg-[#c9b896] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white hover:bg-[#b8a785]"
          >
            Ir para a leitura
          </Link>
        </div>
      </div>
    </section>
  );
}
