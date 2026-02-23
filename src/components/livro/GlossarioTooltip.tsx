'use client'

import { useState, useRef, useEffect } from 'react'
import type { GlossarioEntry } from '@/data/livro-niveis/types'

type Props = {
  entry: GlossarioEntry
  children: React.ReactNode
  modoNoturno?: boolean
}

export default function GlossarioTooltip({ entry, children, modoNoturno = false }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <span ref={ref} className="relative inline">
      <span
        onClick={() => setOpen(!open)}
        className={`cursor-pointer border-b border-dotted transition-colors ${
          modoNoturno
            ? 'border-stone-500 hover:border-stone-300'
            : 'border-stone-400 hover:border-stone-600'
        }`}
      >
        {children}
      </span>

      {open && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 left-0 bottom-full mb-2 w-72 rounded-xl border shadow-xl p-4 text-left ${
            modoNoturno
              ? 'bg-stone-900 border-stone-700'
              : 'bg-white border-stone-200'
          }`}
        >
          <p className={`text-xs font-sans font-medium uppercase tracking-wide mb-1.5 ${
            modoNoturno ? 'text-stone-500' : 'text-stone-400'
          }`}>
            {entry.termo}
          </p>
          <p className={`text-sm font-sans leading-relaxed ${
            modoNoturno ? 'text-stone-300' : 'text-stone-700'
          }`}>
            {entry.definicao}
          </p>
          {entry.exemplo && (
            <p className={`text-xs font-sans mt-2 italic leading-relaxed ${
              modoNoturno ? 'text-stone-500' : 'text-stone-500'
            }`}>
              {entry.exemplo}
            </p>
          )}
        </div>
      )}
    </span>
  )
}
