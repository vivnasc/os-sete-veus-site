"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";

const chapters = [
  { name: "01_abertura.mp3", label: "Abertura" },
  { name: "02_parte_i.mp3", label: "Parte I" },
  { name: "03_parte_ii.mp3", label: "Parte II" },
  { name: "04_parte_iii.mp3", label: "Parte III" },
  { name: "05_parte_iv.mp3", label: "Parte IV" },
  { name: "06_parte_v.mp3", label: "Parte V" },
  { name: "07_parte_vi.mp3", label: "Parte VI" },
  { name: "08_epilogo.mp3", label: "Epílogo" },
];

export default function AudiobookPage() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const loadUrls = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    if (!token) return;

    const loaded: Record<string, string> = {};
    for (const ch of chapters) {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: `audiobook/${ch.name}`, token }),
      });
      const data = await res.json();
      if (data.url) loaded[ch.name] = data.url;
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
        <div className="items-center gap-8 md:flex">
          <Image
            src="/images/veu-1-ilusao.png.png"
            alt="O Véu da Ilusão"
            width={150}
            height={225}
            className="shrink-0 rounded-lg shadow-md"
          />
          <div className="mt-6 md:mt-0">
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-sage">
              Audiobook
            </p>
            <h1 className="mt-2 font-serif text-3xl text-brown-900">
              O Véu da Ilusão
            </h1>
            <p className="mt-2 font-serif italic text-brown-500">
              Narrado por Vivianne dos Santos
            </p>
            <p className="mt-3 text-sm text-brown-600">
              8 capítulos para ouvir onde quiseres. Fecha os olhos, respira fundo, e deixa a história chegar.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
            <span className="ml-3 text-sm text-brown-400">A carregar capítulos...</span>
          </div>
        ) : (
          <div className="mt-10 space-y-3">
            {chapters.map((ch, i) => {
              const url = urls[ch.name];
              if (!url) return null;
              return (
                <div key={ch.name}>
                  <p className="mb-1 font-sans text-[0.65rem] uppercase tracking-wider text-brown-400">
                    Capítulo {i + 1}
                  </p>
                  <AudioPlayer src={url} title={ch.label} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
