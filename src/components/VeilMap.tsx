"use client";

import { chapters } from "@/data/ebook";
import Link from "next/link";

type Props = {
  progress: Record<string, boolean>;
};

export default function VeilMap({ progress }: Props) {
  const completedCount = chapters.filter((ch) => progress[ch.slug]).length;
  const allComplete = completedCount === chapters.length;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg text-brown-900">Mapa do Desvelar</h3>
        <span className="font-sans text-xs text-brown-400">
          {completedCount} de {chapters.length}
        </span>
      </div>

      {/* Visual map */}
      <div className="flex items-center justify-center py-6">
        <div className="relative flex h-44 w-44 items-center justify-center">
          {chapters.map((chapter, i) => {
            const angle = (i / chapters.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 60;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isCompleted = progress[chapter.slug];

            return (
              <Link
                key={chapter.slug}
                href={`/membro/leitura/${chapter.slug}`}
                className="group absolute flex flex-col items-center"
                style={{ transform: `translate(${x}px, ${y}px)` }}
                title={`${chapter.title} — ${chapter.subtitle}`}
              >
                {/* Veil circle */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
                  style={{
                    backgroundColor: isCompleted ? chapter.accentColor : "#e8e4dd",
                    boxShadow: isCompleted ? `0 0 16px ${chapter.accentColor}30` : "none",
                  }}
                >
                  {isCompleted ? (
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="font-serif text-xs text-brown-400">{chapter.number}</span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Center element */}
          {allComplete ? (
            <Link
              href="/membro/conclusao"
              className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#c9b896] to-[#7a8c6e] shadow-lg transition-transform hover:scale-110"
            >
              <span className="text-xl text-white">&#10024;</span>
            </Link>
          ) : (
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brown-50">
              <span className="font-serif text-xs text-brown-300">
                {Math.round((completedCount / chapters.length) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Chapter names below */}
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {chapters.map((chapter) => {
          const isCompleted = progress[chapter.slug];
          return (
            <span
              key={chapter.slug}
              className="font-sans text-[0.55rem] uppercase tracking-wider"
              style={{ color: isCompleted ? chapter.accentColor : "#c4bfb6" }}
            >
              {chapter.number === 7 ? "Ep" : `${chapter.number}`}
            </span>
          );
        })}
      </div>

      {allComplete && (
        <Link
          href="/membro/conclusao"
          className="mt-4 block text-center font-sans text-[0.65rem] uppercase tracking-[0.15em] text-[#7a8c6e] hover:underline"
        >
          Ver cerimónia de conclusão &rarr;
        </Link>
      )}
    </div>
  );
}
