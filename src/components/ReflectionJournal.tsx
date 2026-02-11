"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  chapterSlug: string;
  prompt: string;
  journalQuestion: string;
  accentColor: string;
};

// Starter phrases that help people begin writing
const starterPhrases = [
  "O que me vem à cabeça é...",
  "Isto fez-me lembrar de...",
  "Nunca tinha pensado que...",
  "Se for honesta comigo mesma...",
  "O que sinto agora é...",
  "Reconheço que...",
];

// Follow-up nudges shown after user starts writing
const nudges = [
  "E se fores mais fundo — o que está por baixo disso?",
  "Há alguma emoção que sentiste ao escrever isto?",
  "Imagina que estás a falar com a tua versão de há 10 anos. O que lhe dirias?",
];

export default function ReflectionJournal({
  chapterSlug,
  prompt,
  journalQuestion,
  accentColor,
}: Props) {
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(true);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const nudgeShown = useRef(false);

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

    // Show a nudge after user writes ~30 words for the first time
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount >= 30 && !nudgeShown.current) {
      nudgeShown.current = true;
      setShowNudge(true);
      setTimeout(() => setShowNudge(false), 8000);
    }

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveEntry(text), 1500);
  };

  const insertStarter = (phrase: string) => {
    const newContent = content ? `${content}\n\n${phrase} ` : `${phrase} `;
    setContent(newContent);
    handleChange(newContent);
    // Focus the textarea
    const textarea = document.querySelector<HTMLTextAreaElement>(`#journal-${chapterSlug}`);
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(newContent.length, newContent.length);
    }
  };

  const words = content.trim().split(/\s+/).filter(Boolean).length;

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
        <p className="mb-4 font-sans text-sm text-brown-500">{journalQuestion}</p>

        {/* Starter phrases — shown when textarea is empty */}
        {content.length === 0 && (
          <div className="mb-4">
            <p className="mb-2 font-sans text-xs text-brown-400">
              Não sabes por onde começar? Escolhe uma frase:
            </p>
            <div className="flex flex-wrap gap-2">
              {starterPhrases.map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => insertStarter(phrase)}
                  className="rounded-full border border-brown-100 bg-cream/50 px-3 py-1.5 font-serif text-xs italic text-brown-600 transition-all hover:border-sage/40 hover:bg-sage/5 hover:text-sage"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        )}

        <textarea
          id={`journal-${chapterSlug}`}
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Escreve aqui... Este espaço é só teu. Não há respostas certas — apenas as tuas."
          className="min-h-[180px] w-full resize-y rounded-xl border border-brown-100 bg-cream/50 px-4 py-3 font-serif text-base leading-relaxed text-brown-800 placeholder:text-brown-300 focus:border-brown-200 focus:outline-none focus:ring-1 focus:ring-brown-200"
        />

        {/* Nudge — appears after ~30 words */}
        {showNudge && (
          <div
            className="mt-3 rounded-lg px-4 py-3 transition-all"
            style={{ backgroundColor: accentColor + "10", borderLeft: `2px solid ${accentColor}` }}
          >
            <p className="font-serif text-sm italic text-brown-600">
              {nudges[Math.floor(Math.random() * nudges.length)]}
            </p>
          </div>
        )}

        {/* More starters — shown after writing starts but feels stuck */}
        {content.length > 0 && words < 50 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Continua...", "E sinto que...", "O que mais me surpreende é..."].map(
              (phrase) => (
                <button
                  key={phrase}
                  onClick={() => insertStarter(phrase)}
                  className="rounded-full border border-dashed border-brown-200 px-2.5 py-1 font-serif text-[0.65rem] italic text-brown-400 transition-all hover:border-sage/40 hover:text-sage"
                >
                  {phrase}
                </button>
              )
            )}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between">
          <span className="font-sans text-xs text-brown-300">
            {words > 0 && (
              <>
                {words} {words === 1 ? "palavra" : "palavras"}
                {words >= 50 && " — estás a ir fundo"}
                {words >= 100 && " — que lindo"}
              </>
            )}
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
