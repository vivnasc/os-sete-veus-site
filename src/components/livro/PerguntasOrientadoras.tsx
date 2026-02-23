'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { NivelLeitura } from '@/hooks/useNivelLeitura'

type Props = {
  perguntas: string[]
  nivel: NivelLeitura
  modoNoturno?: boolean
}

export default function PerguntasOrientadoras({ perguntas, nivel, modoNoturno = false }: Props) {
  const [expandido, setExpandido] = useState(nivel === 'semente')

  if (nivel === 'arvore') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`mb-10 rounded-xl px-6 py-4 ${
        modoNoturno ? 'bg-stone-800/30' : 'bg-stone-50/70'
      }`}
    >
      <button
        onClick={() => setExpandido(!expandido)}
        className={`w-full text-left flex items-center justify-between ${
          modoNoturno ? 'text-stone-400' : 'text-stone-500'
        }`}
      >
        <p className="text-xs font-sans uppercase tracking-wide">
          Antes de ler — perguntas para acompanhar
        </p>
        <span className="text-xs">
          {expandido ? '−' : '+'}
        </span>
      </button>

      {expandido && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 space-y-3"
        >
          {perguntas.map((p, i) => (
            <p
              key={i}
              className={`text-base italic leading-relaxed font-serif ${
                modoNoturno ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {p}
            </p>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
