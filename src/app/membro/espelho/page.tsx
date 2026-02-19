"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { chapters } from "@/data/ebook";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type JournalEntry = {
  chapter_slug: string;
  content: string;
  updated_at: string;
};

// Thematic interpretation: detect themes in what the user wrote
const themePatterns: {
  theme: string;
  keywords: string[];
  insight: string;
  color: string;
}[] = [
  {
    theme: "Automatismo",
    keywords: ["rotina", "automátic", "sem pensar", "sempre fiz", "hábito", "costume", "repet", "igual"],
    insight: "Reconheceste padrões automáticos na tua vida. Esse reconhecimento é o primeiro passo — não para mudar tudo, mas para começar a escolher com consciência.",
    color: "#c9b896",
  },
  {
    theme: "Vulnerabilidade",
    keywords: ["medo", "difícil", "vulnerável", "vergonha", "escond", "proteg", "não consigo", "frágil"],
    insight: "Tocaste em lugares vulneráveis. Isso requer coragem. O facto de teres escrito sobre isso mostra que estás pronta para ser vista — por ti mesma.",
    color: "#8b9b8e",
  },
  {
    theme: "Desejo autêntico",
    keywords: ["quero", "desejo", "sonho", "gostava", "escolh", "minha", "verdade", "genuín"],
    insight: "Há desejos genuínos nas tuas palavras. Não os ignores. Cada vez que identificas o que queres de verdade, estás a reconstruir a tua bússola interior.",
    color: "#7a8c6e",
  },
  {
    theme: "Relações",
    keywords: ["alguém", "família", "mãe", "filh", "amig", "marido", "relação", "espera", "outr"],
    insight: "As tuas reflexões tocam em relações importantes. Os véus que usamos muitas vezes formam-se na presença dos outros — reconhecê-los é um acto de amor próprio.",
    color: "#c08aaa",
  },
  {
    theme: "Despertar",
    keywords: ["perceb", "agora sei", "nunca tinha", "primeira vez", "mudou", "diferente", "novo", "descobr"],
    insight: "Há um despertar nas tuas palavras. Algo se moveu. Nem sempre é confortável, mas é real — e o real é o único lugar de onde se pode partir.",
    color: "#baaacc",
  },
];

function detectThemes(entries: JournalEntry[]) {
  const allText = entries.map((e) => e.content.toLowerCase()).join(" ");
  return themePatterns.filter((t) =>
    t.keywords.some((kw) => allText.includes(kw))
  );
}

function getWordCount(entries: JournalEntry[]) {
  return entries.reduce((acc, e) => acc + e.content.trim().split(/\s+/).length, 0);
}

export default function EspelhoPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/entrar");
    }
  }, [user, authLoading, router]);

  const loadEntries = useCallback(async () => {
    try {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("journal_entries")
        .select("chapter_slug, content, updated_at")
        .eq("user_id", userId)
        .order("updated_at", { ascending: true });

      if (error) {
        console.error("[EspelhoPage] Error loading journal entries:", error);
        setLoading(false);
        return;
      }

      if (data) {
        setEntries(data.filter((e) => e.content && e.content.trim().length > 0));
      }
    } catch (err) {
      console.error("[EspelhoPage] Unexpected error:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const themes = detectThemes(entries);
  const wordCount = getWordCount(entries);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link
            href="/membro/espelhos/veu-da-ilusao"
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
              href="/membro/espelhos/veu-da-ilusao"
              className="mt-6 inline-block rounded-full bg-[#c9b896] px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#b8a785]"
            >
              Começar a ler
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats overview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                <p className="font-serif text-2xl text-[#c9b896]">{entries.length}</p>
                <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                  reflexões
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                <p className="font-serif text-2xl text-[#7a8c6e]">{wordCount}</p>
                <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                  palavras tuas
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                <p className="font-serif text-2xl text-[#baaacc]">{themes.length}</p>
                <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                  temas tocados
                </p>
              </div>
            </div>

            {/* Thematic interpretation */}
            {themes.length > 0 && (
              <div className="rounded-2xl border border-sage/20 bg-sage/5 p-6">
                <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-sage">
                  O que o teu espelho reflecte
                </p>
                <p className="mt-1 font-sans text-xs text-brown-500">
                  Baseado nos temas que emergiram das tuas reflexões
                </p>
                <div className="mt-5 space-y-4">
                  {themes.map((theme) => (
                    <div key={theme.theme} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold text-white"
                        style={{ backgroundColor: theme.color }}
                      >
                        {theme.theme[0]}
                      </span>
                      <div>
                        <p className="font-sans text-xs font-medium text-brown-700">
                          {theme.theme}
                        </p>
                        <p className="mt-0.5 font-serif text-sm italic leading-relaxed text-brown-600">
                          {theme.insight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Journal entries */}
            <div>
              <p className="mb-4 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                As tuas reflexões, capítulo a capítulo
              </p>
              <div className="space-y-6">
                {entries.map((entry) => {
                  const chapter = chapters.find(
                    (ch) => ch.slug === entry.chapter_slug
                  );
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
              </div>
            </div>

            {/* Reflective closing — adapts to progress */}
            <div className="rounded-2xl border border-[#7a8c6e]/20 bg-[#7a8c6e]/5 px-8 py-8 text-center">
              <p className="font-serif text-lg text-brown-700">
                {entries.length >= 5
                  ? "Escreveste muito. Cada palavra foi um acto de coragem. Este espelho é teu — volta quando quiseres reler-te."
                  : entries.length >= 3
                    ? "Estás a construir algo bonito. Cada reflexão é uma peça do puzzle que és tu."
                    : "O teu espelho está a ganhar forma. Continua a ler e a escrever — há mais de ti para descobrir."}
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
