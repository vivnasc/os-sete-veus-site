"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  chapterSlug: string;
  prompt: string;
  journalQuestion: string;
  accentColor: string;
};

export default function ReflectionJournal({
  chapterSlug,
  prompt,
  journalQuestion,
  accentColor,
}: Props) {
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(true);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const loadEntry = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) return;

    const { data } = await supabase
      .from("journal_entries")
      .select("content, updated_at")
      .eq("user_id", userId)
      .eq("chapter_slug", chapterSlug)
      .single();

    if (data) {
      setContent(data.content || "");
      setLastSaved(data.updated_at);
    }
  }, [chapterSlug]);

  useEffect(() => {
    loadEntry();
  }, [loadEntry]);

  const saveEntry = useCallback(
    async (text: string) => {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) return;

      await supabase.from("journal_entries").upsert(
        {
          user_id: userId,
          chapter_slug: chapterSlug,
          content: text,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,chapter_slug" }
      );

      setSaved(true);
      setLastSaved(new Date().toISOString());
    },
    [chapterSlug]
  );

  const handleChange = (text: string) => {
    setContent(text);
    setSaved(false);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveEntry(text), 1500);
  };

  return (
    <div className="rounded-2xl border border-brown-100 bg-white p-6 shadow-sm">
      {/* Reflection prompt */}
      <div
        className="mb-6 rounded-xl px-5 py-4"
        style={{ backgroundColor: accentColor + "12", borderLeft: `3px solid ${accentColor}` }}
      >
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brown-400">
          Pausa para reflexão
        </p>
        <p className="mt-2 font-serif text-lg italic leading-relaxed text-brown-800">
          {prompt}
        </p>
      </div>

      {/* Journal */}
      <div>
        <h3 className="mb-1 font-serif text-lg text-brown-900">O teu diário</h3>
        <p className="mb-4 font-sans text-sm text-brown-400">{journalQuestion}</p>

        <textarea
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Escreve aqui... Este espaço é só teu."
          className="min-h-[160px] w-full resize-y rounded-xl border border-brown-100 bg-cream/50 px-4 py-3 font-serif text-base leading-relaxed text-brown-800 placeholder:text-brown-300 focus:border-brown-200 focus:outline-none focus:ring-1 focus:ring-brown-200"
        />

        <div className="mt-2 flex items-center justify-between">
          <span className="font-sans text-xs text-brown-300">
            {content.length > 0 && `${content.split(/\s+/).filter(Boolean).length} palavras`}
          </span>
          <span className="font-sans text-xs text-brown-300">
            {!saved
              ? "A guardar..."
              : lastSaved
                ? `Guardado · ${new Date(lastSaved).toLocaleDateString("pt-PT", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`
                : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
