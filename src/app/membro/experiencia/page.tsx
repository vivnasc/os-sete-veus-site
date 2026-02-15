"use client";

import Link from "next/link";

const modulos = [
  {
    slug: "veu-da-ilusao",
    numero: 1,
    nome: "O Espelho da Ilusão",
    desc: "Quando a vida que tens não foi a que escolheste.",
    color: "#c9b896",
    disponivel: true,
  },
  {
    slug: "veu-do-medo",
    numero: 2,
    nome: "O Espelho do Medo",
    desc: "Quando o medo decide por ti.",
    color: "#7a8c6e",
    disponivel: false,
  },
  {
    slug: "veu-do-desejo",
    numero: 3,
    nome: "O Espelho do Desejo",
    desc: "Quando desejas tudo menos o que precisas.",
    color: "#b07a7a",
    disponivel: false,
  },
  {
    slug: "veu-do-controlo",
    numero: 4,
    nome: "O Espelho do Controlo",
    desc: "Quando segurar é a única forma que conheces.",
    color: "#8a7b6b",
    disponivel: false,
  },
  {
    slug: "veu-da-culpa",
    numero: 5,
    nome: "O Espelho da Culpa",
    desc: "Quando te castigas por querer mais.",
    color: "#6e8c7a",
    disponivel: false,
  },
  {
    slug: "veu-da-identidade",
    numero: 6,
    nome: "O Espelho da Identidade",
    desc: "Quando já não sabes quem és sem os outros.",
    color: "#b8956c",
    disponivel: false,
  },
  {
    slug: "veu-da-separacao",
    numero: 7,
    nome: "O Espelho da Separação",
    desc: "Quando te afastas de ti mesma para pertencer.",
    color: "#8a7b9c",
    disponivel: false,
  },
];

export default function ExperienciaPage() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
            As Tuas Experiências
          </p>
          <h1 className="mt-3 font-serif text-3xl text-brown-900">Os Sete Véus</h1>
          <p className="mx-auto mt-3 max-w-md font-serif text-base text-brown-500">
            Sete histórias. Sete véus. Sete formas de voltar a ti mesma.
            Vai ao teu ritmo. Sem pressa. Sem expectativas.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {modulos.map((mod) => (
            <div
              key={mod.slug}
              className="flex items-start gap-4 rounded-2xl border border-brown-100 bg-white p-5 shadow-sm"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-sans text-sm font-bold text-white"
                style={{ backgroundColor: mod.color }}
              >
                {mod.numero}
              </span>
              <div className="flex-1">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brown-400">
                  Espelho {mod.numero} de 7
                </p>
                <h2 className="font-serif text-base text-brown-800">{mod.nome}</h2>
                <p className="mt-1 font-serif text-sm text-brown-400">{mod.desc}</p>
              </div>
              {mod.disponivel ? (
                <Link
                  href="/membro/leitura"
                  className="mt-1 shrink-0 rounded-full bg-sage px-4 py-1.5 font-sans text-[0.6rem] uppercase tracking-wider text-white hover:bg-sage-dark"
                >
                  Ler
                </Link>
              ) : (
                <span className="mt-1 shrink-0 font-sans text-[0.55rem] uppercase tracking-wider text-brown-300">
                  Em breve
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/membro/leitura"
            className="inline-block rounded-full bg-[#c9b896] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white hover:bg-[#b8a785]"
          >
            Continuar a leitura
          </Link>
        </div>
      </div>
    </section>
  );
}
