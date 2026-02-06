"use client";

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import Image from "next/image";

export default function MembroDashboard() {
  const { user } = useAuth();

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
          Bem-vinda de volta
        </p>
        <h1 className="mt-2 font-serif text-3xl text-brown-900">
          A tua experiência
        </h1>
        <p className="mt-3 text-brown-600">
          Tudo o que precisas está aqui. Vai ao teu ritmo, sem pressa.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Experiência 7 Dias */}
          <Link
            href="/membro/experiencia"
            className="group overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="bg-gradient-to-br from-veu-1 to-veu-3 px-6 py-8">
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/70">
                7 módulos
              </p>
              <h2 className="mt-2 font-serif text-xl text-white">
                Experiência 7 Dias
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-brown-600">
                Um véu por dia. Carta, checklist, nota introdutória e práticas em áudio.
              </p>
            </div>
          </Link>

          {/* Audiobook */}
          <Link
            href="/membro/audiobook"
            className="group overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="bg-gradient-to-br from-veu-4 to-veu-6 px-6 py-8">
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/70">
                8 capítulos
              </p>
              <h2 className="mt-2 font-serif text-xl text-white">
                Audiobook
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-brown-600">
                O Véu da Ilusão narrado pela Vivianne. Ouve onde quiseres.
              </p>
            </div>
          </Link>

          {/* Práticas */}
          <Link
            href="/membro/praticas"
            className="group overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="bg-gradient-to-br from-veu-5 to-veu-7 px-6 py-8">
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/70">
                4 práticas
              </p>
              <h2 className="mt-2 font-serif text-xl text-white">
                Práticas em Áudio
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-brown-600">
                Afirmações, limpeza, antes de dormir e escrita guiada.
              </p>
            </div>
          </Link>
        </div>

        {/* Quick access to ebook */}
        <div className="mt-10 rounded-2xl border border-brown-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <Image
              src="/images/veu-1-ilusao.png.png"
              alt="O Véu da Ilusão"
              width={60}
              height={90}
              className="shrink-0 rounded"
            />
            <div className="flex-1">
              <h3 className="font-serif text-lg text-brown-900">O Véu da Ilusão — Ebook</h3>
              <p className="mt-1 text-sm text-brown-500">PDF para ler em qualquer dispositivo</p>
            </div>
            <a
              href="/downloads/Os_7_Veus_ebook.pdf"
              download
              className="shrink-0 rounded-md bg-sage px-5 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-sage-dark"
            >
              Descarregar
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-brown-400">
          Sessão iniciada como {user?.email}
        </p>
      </div>
    </section>
  );
}
