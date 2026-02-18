"use client";

import { useRef, useState } from "react";

type Props = {
  veilTitle: string;
  veilColor: string;
  chaptersRead: number;
  reflectionsWritten: number;
  itemsCompleted: number;
};

export default function ShareCard({
  veilTitle,
  veilColor,
  chaptersRead,
  reflectionsWritten,
  itemsCompleted,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const text = `Completei ${veilTitle} — ${chaptersRead} capítulos, ${reflectionsWritten} reflexões, ${itemsCompleted} passos. Uma experiência de Os Sete Véus.\n\nDescobre o teu véu: seteveus.space/recursos/teste`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Completei ${veilTitle}`,
          text,
          url: "https://seteveus.space/recursos/teste",
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div className="space-y-4">
      {/* Visual card */}
      <div
        ref={cardRef}
        className="mx-auto max-w-sm overflow-hidden rounded-2xl shadow-lg"
        style={{ background: `linear-gradient(135deg, #3d3630, ${veilColor}40)` }}
      >
        <div className="px-8 py-10 text-center">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-brown-400">
            Os Sete Véus
          </p>
          <p className="mt-6 font-serif text-2xl text-cream">
            Completei
          </p>
          <p
            className="mt-1 font-serif text-3xl font-bold"
            style={{ color: veilColor }}
          >
            {veilTitle}
          </p>

          <div className="mx-auto mt-8 flex max-w-xs justify-center gap-6">
            <div>
              <p className="font-serif text-2xl text-cream">{chaptersRead}</p>
              <p className="font-sans text-[0.55rem] uppercase tracking-wider text-brown-400">
                capítulos
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-cream">{reflectionsWritten}</p>
              <p className="font-sans text-[0.55rem] uppercase tracking-wider text-brown-400">
                reflexões
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-cream">{itemsCompleted}</p>
              <p className="font-sans text-[0.55rem] uppercase tracking-wider text-brown-400">
                passos
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 h-px w-12 bg-brown-600" />

          <p className="mt-4 font-serif text-sm italic text-brown-300">
            &ldquo;Há mais para ti do que aquilo que tens vivido.&rdquo;
          </p>

          <p className="mt-4 font-sans text-[0.6rem] tracking-wider text-brown-500">
            seteveus.space/recursos/teste
          </p>
        </div>
      </div>

      {/* Share button */}
      <div className="text-center">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full border border-brown-200 bg-white px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.12em] text-brown-700 shadow-sm transition-all hover:border-sage hover:text-sage"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {copied ? "Copiado!" : "Partilhar a minha jornada"}
        </button>
      </div>
    </div>
  );
}
