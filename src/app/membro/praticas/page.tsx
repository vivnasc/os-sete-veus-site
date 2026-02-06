"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import AudioPlayer from "@/components/AudioPlayer";

const praticas = [
  {
    name: "01_afirmacoes.mp3",
    label: "Afirmações — Desprogramar o Véu da Ilusão",
    desc: "Reprograma as crenças que te mantêm presa ao véu.",
  },
  {
    name: "02_limpeza.mp3",
    label: "Limpeza — Soltar o Véu da Ilusão",
    desc: "Um exercício guiado para soltar o que já não te serve.",
  },
  {
    name: "03_antes_de_dormir.mp3",
    label: "Antes de Dormir — O Véu da Ilusão",
    desc: "Para ouvir antes de adormecer. Suave e restaurador.",
  },
  {
    name: "04_escrita_guiada.mp3",
    label: "Escrita Guiada — O Véu da Ilusão",
    desc: "Uma prática de escrita guiada para explorar o véu.",
  },
];

export default function PraticasPage() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const loadUrls = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    if (!token) return;

    const loaded: Record<string, string> = {};
    for (const p of praticas) {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: `praticas/${p.name}`, token }),
      });
      const data = await res.json();
      if (data.url) loaded[p.name] = data.url;
    }
    setUrls(loaded);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
          Práticas em áudio
        </p>
        <h1 className="mt-2 font-serif text-3xl text-brown-900">
          Práticas do Véu da Ilusão
        </h1>
        <p className="mt-3 leading-relaxed text-brown-600">
          Quatro práticas para te acompanhar ao longo do dia. Ouve quando sentires
          que é o momento. Sem pressa, sem regras.
        </p>

        {loading ? (
          <div className="mt-12 flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
            <span className="ml-3 text-sm text-brown-400">A carregar práticas...</span>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {praticas.map((p) => {
              const url = urls[p.name];
              if (!url) return null;
              return (
                <div key={p.name}>
                  <p className="mb-1 text-sm text-brown-600">{p.desc}</p>
                  <AudioPlayer src={url} title={p.label} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
