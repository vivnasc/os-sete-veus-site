"use client";

import Link from "next/link";

const modulos = [
  { slug: "modulo-0", dia: "Boas-vindas", nome: "Materiais Completos", color: "bg-brown-800" },
  { slug: "modulo-1", dia: "Dia 1", nome: "O Véu da Conformidade", color: "bg-veu-1" },
  { slug: "modulo-2", dia: "Dia 2", nome: "O Véu da Repetição", color: "bg-veu-2" },
  { slug: "modulo-3", dia: "Dia 3", nome: "O Véu do Silenciamento", color: "bg-veu-3" },
  { slug: "modulo-4", dia: "Dia 4", nome: "O Véu da Agradabilidade", color: "bg-veu-4" },
  { slug: "modulo-5", dia: "Dia 5", nome: "O Véu da Neutralidade", color: "bg-veu-5" },
  { slug: "modulo-6", dia: "Dia 6", nome: "O Véu da Falsa Escolha", color: "bg-veu-6" },
  { slug: "modulo-7", dia: "Dia 7", nome: "O Véu do Esquecimento", color: "bg-veu-7" },
];

export default function ExperienciaPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
          Experiência dos 7 Véus
        </p>
        <h1 className="mt-2 font-serif text-3xl text-brown-900">
          7 Dias, 7 Véus
        </h1>
        <p className="mt-3 leading-relaxed text-brown-600">
          Cada dia é um convite a olhar para uma camada diferente. Vai ao teu ritmo.
          Cada módulo tem uma carta, uma checklist, uma nota introdutória e, em alguns,
          uma prática em áudio.
        </p>

        <div className="mt-10 space-y-3">
          {modulos.map((mod, i) => (
            <Link
              key={mod.slug}
              href={`/membro/experiencia/${mod.slug}`}
              className="flex items-center gap-4 rounded-xl border border-brown-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${mod.color} font-sans text-sm font-bold text-white`}>
                {i}
              </span>
              <div>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.15em] text-brown-400">
                  {mod.dia}
                </p>
                <h2 className="font-serif text-lg text-brown-900">{mod.nome}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
