'use client'

import { useState, useRef, useEffect } from 'react'
import type { NivelLeitura } from '@/hooks/useNivelLeitura'

const niveis: { value: NivelLeitura; label: string; icon: string }[] = [
  { value: 'semente', label: 'Semente', icon: '○' },
  { value: 'raiz', label: 'Raiz', icon: '◎' },
  { value: 'arvore', label: 'Arvore', icon: '●' },
]

type Props = {
  nivel: NivelLeitura
  onSelect: (nivel: NivelLeitura) => void
  modoNoturno?: boolean
}

export default function NivelSelector({ nivel, onSelect, modoNoturno = false }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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

  const current = niveis.find(n => n.value === nivel)!

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`text-xs px-3 py-1 rounded-full border transition-colors ${
          modoNoturno
            ? 'border-stone-600 hover:bg-stone-800 text-stone-300'
            : 'border-stone-300 hover:bg-stone-100 text-stone-600'
        }`}
        title="Nivel de leitura"
      >
        {current.icon} {current.label}
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full mt-2 w-56 rounded-xl border shadow-xl z-50 ${
            modoNoturno
              ? 'bg-stone-900 border-stone-700'
              : 'bg-white border-stone-200'
          }`}
        >
          <div className={`px-3 py-2 border-b ${modoNoturno ? 'border-stone-700' : 'border-stone-100'}`}>
            <p className={`text-xs font-sans ${modoNoturno ? 'text-stone-500' : 'text-stone-400'}`}>
              Nivel de leitura
            </p>
          </div>
          {niveis.map((n) => (
            <button
              key={n.value}
              onClick={() => { onSelect(n.value); setOpen(false) }}
              className={`w-full text-left px-3 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                nivel === n.value
                  ? modoNoturno
                    ? 'bg-stone-800 text-stone-100'
                    : 'bg-stone-50 text-stone-900'
                  : modoNoturno
                    ? 'text-stone-400 hover:bg-stone-800'
                    : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span className="text-base">{n.icon}</span>
              <div>
                <span className="font-medium">{n.label}</span>
                <p className={`text-xs mt-0.5 ${modoNoturno ? 'text-stone-500' : 'text-stone-400'}`}>
                  {n.value === 'semente' && 'Guia gentil para quem esta a comecar'}
                  {n.value === 'raiz' && 'Texto original com notas de contexto'}
                  {n.value === 'arvore' && 'Texto original, puro, sem interrupcoes'}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
