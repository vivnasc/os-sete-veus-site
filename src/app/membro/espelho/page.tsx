"use client";

import { useEffect, useState, useCallback } from "react";
import { chapters } from "@/data/ebook";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type JournalEntry = {
  chapter_slug: string;
  content: string;
  updated_at: string;
};

export default function EspelhoPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("journal_entries")
      .select("chapter_slug, content, updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: true });

    if (data) {
      setEntries(data.filter((e) => e.content && e.content.trim().length > 0));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link
            href="/membro/leitura"
            className="inline-block font-sans text-[0.65rem] uppercase tracking-[0.15em] text-brown-400 hover:text-brown-600"
          >
            &larr; Voltar à leitura
          </Link>
          <h1 className="mt-8 font-serif text-4xl text-brown-900">O Teu Espelho</h1>
          <p className="mt-3 font-serif text-base italic text-brown-500">
            Tudo o que escreveste durante a leitura, reunido aqui. As tuas palavras. O teu caminho.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-[#c9b896]" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl bg-white px-8 py-12 text-center shadow-sm">
            <p className="font-serif text-lg text-brown-600">
              O teu espelho está vazio — por enquanto.
            </p>
            <p className="mt-3 font-sans text-sm text-brown-400">
              À medida que leres e escreveres no diário de reflexão, as tuas palavras aparecerão aqui.
            </p>
            <Link
              href="/membro/leitura"
              className="mt-6 inline-block rounded-full bg-[#c9b896] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b8a785]"
            >
              Começar a ler
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {entries.map((entry) => {
              const chapter = chapters.find((ch) => ch.slug === entry.chapter_slug);
              if (!chapter) return null;

              return (
                <div
                  key={entry.chapter_slug}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                  style={{ borderLeft: `3px solid ${chapter.accentColor}` }}
                >
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
                    {chapter.title} — {chapter.subtitle}
                  </p>
                  <p className="mt-1 mb-4 font-serif text-sm italic text-brown-500">
                    {chapter.reflection.journalQuestion}
                  </p>
                  <div className="whitespace-pre-wrap font-serif text-base leading-relaxed text-brown-800">
                    {entry.content}
                  </div>
                  <p className="mt-4 font-sans text-[0.6rem] text-brown-300">
                    {new Date(entry.updated_at).toLocaleDateString("pt-PT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              );
            })}

            {/* Closing message */}
            <div className="rounded-2xl border border-[#7a8c6e]/20 bg-[#7a8c6e]/5 px-8 py-8 text-center">
              <p className="font-serif text-lg text-brown-700">
                Estas são as tuas palavras. A tua verdade. O teu caminho.
              </p>
              <p className="mt-3 font-serif text-sm italic text-brown-500">
                Há mais para ti do que aquilo que tens vivido.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
