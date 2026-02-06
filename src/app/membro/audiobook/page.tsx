"use client";

import Link from "next/link";

export default function AudiobookRedirect() {
  return (
    <section className="px-6 py-16 text-center">
      <div className="mx-auto max-w-md">
        <h1 className="font-serif text-2xl text-brown-900">Audiobook</h1>
        <p className="mt-4 font-serif text-base text-brown-500">
          O audiobook está em preparação. Entretanto, podes ler O Véu da Ilusão
          directamente no reader integrado.
        </p>
        <Link
          href="/membro/leitura"
          className="mt-6 inline-block rounded-full bg-[#c9b896] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white hover:bg-[#b8a785]"
        >
          Ir para a leitura
        </Link>
      </div>
    </section>
  );
}
