"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import AudioPlayer from "@/components/AudioPlayer";

const praticas = [
  {
    name: "01_afirmacoes.mp3",
    label: "Afirmações",
    subtitle: "Desprogramar o Véu da Ilusão",
    desc: "Reprograma as crenças que te mantêm presa ao véu. Ouve de manhã, quando o dia ainda é promessa.",
    color: "#c9b896",
    icon: "&#9788;",
  },
  {
    name: "02_limpeza.mp3",
    label: "Limpeza",
    subtitle: "Soltar o que já não te serve",
    desc: "Um exercício guiado para soltar padrões antigos. Quando sentires que carregas peso que não é teu.",
    color: "#7a8c6e",
    icon: "&#9672;",
  },
  {
    name: "03_antes_de_dormir.mp3",
    label: "Antes de Dormir",
    subtitle: "Suave e restaurador",
    desc: "Para ouvir à noite, quando o dia termina. Deixa o corpo pousar. Deixa a mente aquietar.",
    color: "#8a7b9c",
    icon: "&#9790;",
  },
  {
    name: "04_escrita_guiada.mp3",
    label: "Escrita Guiada",
    subtitle: "Explorar o véu com palavras",
    desc: "Pega num caderno e segue a voz. Escreve sem julgar, sem corrigir, sem pensar. Apenas deixa sair.",
    color: "#b07a7a",
    icon: "&#9998;",
  },
];

export default function PraticasPage() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [hasFiles, setHasFiles] = useState(false);

  const loadUrls = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    if (!token) {
      setLoading(false);
      return;
    }

    const loaded: Record<string, string> = {};
    for (const p of praticas) {
      try {
        const res = await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: `praticas/${p.name}`, token }),
        });
        const data = await res.json();
        if (data.url) loaded[p.name] = data.url;
      } catch {
        // File not yet uploaded — graceful fallback
      }
    }
    setUrls(loaded);
    setHasFiles(Object.keys(loaded).length > 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
            Práticas em áudio
          </p>
          <h1 className="mt-3 font-serif text-3xl text-brown-900">
            Quatro rituais para o teu dia
          </h1>
          <p className="mx-auto mt-3 max-w-md font-serif text-base text-brown-500">
            Ouve quando sentires que é o momento. Sem pressa, sem regras. Apenas presença.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {praticas.map((p) => {
            const url = urls[p.name];

            return (
              <div
                key={p.name}
                className="overflow-hidden rounded-2xl border border-brown-100 bg-white shadow-sm"
              >
                <div className="flex items-start gap-4 p-5">
                  {/* Icon */}
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg text-white"
                    style={{ backgroundColor: p.color }}
                    dangerouslySetInnerHTML={{ __html: p.icon }}
                  />

                  <div className="flex-1">
                    <h3 className="font-serif text-base text-brown-800">{p.label}</h3>
                    <p className="font-sans text-[0.65rem] uppercase tracking-[0.15em]" style={{ color: p.color }}>
                      {p.subtitle}
                    </p>
                    <p className="mt-2 font-serif text-sm leading-relaxed text-brown-500">
                      {p.desc}
                    </p>
                  </div>
                </div>

                {/* Audio player or placeholder */}
                {loading ? (
                  <div className="border-t border-brown-50 px-5 py-3">
                    <div className="h-4 w-32 animate-pulse rounded bg-brown-50" />
                  </div>
                ) : url ? (
                  <div className="border-t border-brown-50 px-5 py-3">
                    <AudioPlayer src={url} title={p.label} />
                  </div>
                ) : !hasFiles ? (
                  <div className="border-t border-brown-50 px-5 py-3">
                    <p className="font-sans text-xs italic text-brown-300">
                      Áudio em preparação — disponível em breve
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
