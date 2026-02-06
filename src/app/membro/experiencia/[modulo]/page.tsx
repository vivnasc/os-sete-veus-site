"use client";

import { use, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import AudioPlayer from "@/components/AudioPlayer";
import Link from "next/link";

type ModuloInfo = {
  dia: string;
  nome: string;
  files: { name: string; label: string; type: "pdf" | "audio" | "image" }[];
};

const modulosData: Record<string, ModuloInfo> = {
  "modulo-0": {
    dia: "Boas-vindas",
    nome: "Materiais Completos",
    files: [
      { name: "0_bem_vinda.mp3", label: "Bem-vinda à Experiência", type: "audio" },
      { name: "mini_guia.pdf", label: "Mini-Guia Os 7 Véus", type: "pdf" },
      { name: "ebook.pdf", label: "O Véu da Ilusão — Ebook", type: "pdf" },
      { name: "planner_7_dias.pdf", label: "Planner dos 7 Dias", type: "pdf" },
    ],
  },
  "modulo-1": {
    dia: "Dia 1",
    nome: "O Véu da Conformidade",
    files: [
      { name: "afirmacoes.mp3", label: "Afirmações — Desprogramar o Véu", type: "audio" },
      { name: "dia_1_carta.pdf", label: "Carta do Dia 1", type: "pdf" },
      { name: "dia_1_checklist.pdf", label: "Checklist do Dia 1", type: "pdf" },
      { name: "dia_1_nota.pdf", label: "Nota Introdutória", type: "pdf" },
    ],
  },
  "modulo-2": {
    dia: "Dia 2",
    nome: "O Véu da Repetição",
    files: [
      { name: "limpeza.mp3", label: "Limpeza — Soltar o Véu da Ilusão", type: "audio" },
      { name: "dia_2_carta.pdf", label: "Carta do Dia 2", type: "pdf" },
      { name: "dia_2_checklist.pdf", label: "Checklist do Dia 2", type: "pdf" },
      { name: "dia_2_nota.pdf", label: "Nota Introdutória", type: "pdf" },
    ],
  },
  "modulo-3": {
    dia: "Dia 3",
    nome: "O Véu do Silenciamento",
    files: [
      { name: "escrita_guiada.mp3", label: "Escrita Guiada — O Véu da Ilusão", type: "audio" },
      { name: "dia_3_carta.pdf", label: "Carta do Dia 3", type: "pdf" },
      { name: "dia_3_checklist.pdf", label: "Checklist do Dia 3", type: "pdf" },
      { name: "dia_3_nota.pdf", label: "Nota Introdutória", type: "pdf" },
    ],
  },
  "modulo-4": {
    dia: "Dia 4",
    nome: "O Véu da Agradabilidade",
    files: [
      { name: "dia_4_carta.pdf", label: "Carta do Dia 4", type: "pdf" },
      { name: "dia_4_checklist.pdf", label: "Checklist do Dia 4", type: "pdf" },
      { name: "dia_4_nota.pdf", label: "Nota Introdutória", type: "pdf" },
    ],
  },
  "modulo-5": {
    dia: "Dia 5",
    nome: "O Véu da Neutralidade",
    files: [
      { name: "dia_5_carta.pdf", label: "Carta do Dia 5", type: "pdf" },
      { name: "dia_5_checklist.pdf", label: "Checklist do Dia 5", type: "pdf" },
      { name: "dia_5_nota.pdf", label: "Nota Introdutória", type: "pdf" },
    ],
  },
  "modulo-6": {
    dia: "Dia 6",
    nome: "O Véu da Falsa Escolha",
    files: [
      { name: "dia_6_carta.pdf", label: "Carta do Dia 6", type: "pdf" },
      { name: "dia_6_checklist.pdf", label: "Checklist do Dia 6", type: "pdf" },
      { name: "dia_6_nota.pdf", label: "Nota Introdutória", type: "pdf" },
    ],
  },
  "modulo-7": {
    dia: "Dia 7",
    nome: "O Véu do Esquecimento",
    files: [
      { name: "dia_7_carta.pdf", label: "Carta do Dia 7", type: "pdf" },
      { name: "dia_7_checklist.pdf", label: "Checklist do Dia 7", type: "pdf" },
      { name: "dia_7_nota.pdf", label: "Nota Introdutória", type: "pdf" },
    ],
  },
};

export default function ModuloPage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo } = use(params);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loadingFiles, setLoadingFiles] = useState(true);

  const info = modulosData[modulo];

  const loadUrls = useCallback(async () => {
    if (!info) return;
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    if (!token) return;

    const loaded: Record<string, string> = {};

    for (const file of info.files) {
      const path = `experiencia/${modulo}/${file.name}`;
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, token }),
      });
      const data = await res.json();
      if (data.url) loaded[file.name] = data.url;
    }

    setUrls(loaded);
    setLoadingFiles(false);
  }, [info, modulo]);

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  if (!info) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="text-brown-600">Módulo não encontrado.</p>
      </section>
    );
  }

  const modNum = modulo.replace("modulo-", "");

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/membro/experiencia"
          className="font-sans text-[0.75rem] uppercase tracking-[0.1em] text-sage hover:underline"
        >
          &larr; Todos os módulos
        </Link>

        <p className="mt-6 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brown-400">
          Módulo {modNum} — {info.dia}
        </p>
        <h1 className="mt-2 font-serif text-3xl text-brown-900">{info.nome}</h1>

        {loadingFiles ? (
          <div className="mt-12 flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
            <span className="ml-3 text-sm text-brown-400">A carregar conteúdo...</span>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {info.files.map((file) => {
              const url = urls[file.name];
              if (!url) return null;

              if (file.type === "audio") {
                return <AudioPlayer key={file.name} src={url} title={file.label} />;
              }

              return (
                <a
                  key={file.name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-brown-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream-dark font-sans text-xs font-bold uppercase text-brown-400">
                    PDF
                  </span>
                  <span className="flex-1 font-sans text-sm text-brown-800">{file.label}</span>
                  <span className="font-sans text-[0.65rem] uppercase tracking-wider text-sage">
                    Abrir
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
