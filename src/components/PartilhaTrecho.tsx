"use client"

import { useState, useMemo } from "react"
import { getCitacoesForChapter } from "@/data/citacoes-partilha"
import type { CitacaoPartilha } from "@/data/citacoes-partilha"
import QuoteShareCard from "./QuoteShareCard"

type Props = {
  chapterSlug: string
  accentColor: string
}

/**
 * Shows a shareable quote section after chapter reading.
 * Picks a random curated quote for the current chapter.
 * Opens QuoteShareCard modal when clicked.
 */
export default function PartilhaTrecho({ chapterSlug, accentColor }: Props) {
  const [selected, setSelected] = useState<CitacaoPartilha | null>(null)

  const citacoes = useMemo(() => getCitacoesForChapter(chapterSlug), [chapterSlug])

  if (citacoes.length === 0) return null

  // Show max 2 quotes per chapter
  const displayed = citacoes.slice(0, 2)

  return (
    <>
      <div className="mt-8 space-y-4">
        {/* Section header */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: accentColor + "25" }} />
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
            Partilhar um trecho
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: accentColor + "25" }} />
        </div>

        {/* Quote cards */}
        <div className="space-y-3">
          {displayed.map((citacao, i) => (
            <button
              key={i}
              onClick={() => setSelected(citacao)}
              className="group w-full rounded-xl border border-brown-100 bg-white/60 px-5 py-4 text-left transition-all hover:border-brown-200 hover:bg-white hover:shadow-sm"
            >
              <p className="font-serif text-[0.95rem] leading-relaxed italic text-brown-700 transition-colors group-hover:text-brown-900">
                &ldquo;{citacao.texto}&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="font-sans text-[0.55rem] uppercase tracking-[0.15em] text-brown-400">
                  {citacao.contexto}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] uppercase tracking-[0.1em] transition-colors"
                  style={{ color: accentColor }}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Partilhar
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Share modal */}
      {selected && (
        <QuoteShareCard
          texto={selected.texto}
          veuNumero={selected.veu}
          fonte={selected.fonte}
          contexto={selected.contexto}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
