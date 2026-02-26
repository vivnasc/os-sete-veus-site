'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  crencas: string[]
  modoNoturno?: boolean
}

export default function CrencasAMapear({ crencas, modoNoturno = false }: Props) {
  const [marcadas, setMarcadas] = useState<Set<number>>(new Set())

  if (crencas.length === 0) return null

  const toggleCrencia = (index: number) => {
    setMarcadas(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className={`mb-10 rounded-xl px-6 py-5 ${
        modoNoturno ? 'bg-stone-800/40' : 'bg-stone-50/80'
      }`}
    >
      <p className={`text-xs font-sans uppercase tracking-wide mb-1 ${
        modoNoturno ? 'text-stone-500' : 'text-stone-400'
      }`}>
        Mapeamento pessoal
      </p>
      <p className={`text-sm font-sans mb-4 ${
        modoNoturno ? 'text-stone-400' : 'text-stone-500'
      }`}>
        Reconheces alguma destas crenças em ti?
      </p>
      <div className="space-y-2.5">
        {crencas.map((crenca, i) => (
          <button
            key={i}
            onClick={() => toggleCrencia(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-start gap-3 ${
              marcadas.has(i)
                ? modoNoturno
                  ? 'border-stone-500 bg-stone-700/50'
                  : 'border-stone-400 bg-white'
                : modoNoturno
                  ? 'border-stone-700 hover:border-stone-600'
                  : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <span className={`mt-0.5 text-sm flex-shrink-0 ${
              marcadas.has(i)
                ? modoNoturno ? 'text-stone-300' : 'text-stone-700'
                : modoNoturno ? 'text-stone-600' : 'text-stone-300'
            }`}>
              {marcadas.has(i) ? '●' : '○'}
            </span>
            <span className={`text-sm font-serif leading-relaxed ${
              marcadas.has(i)
                ? modoNoturno ? 'text-stone-200' : 'text-stone-800'
                : modoNoturno ? 'text-stone-400' : 'text-stone-600'
            }`}>
              {crenca}
            </span>
          </button>
        ))}
      </div>
      {marcadas.size > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-xs font-sans italic ${
            modoNoturno ? 'text-stone-500' : 'text-stone-400'
          }`}
        >
          Não há juízo nisto. Apenas reconhecimento. Cada crença marcada é um véu que já começaste a ver.
        </motion.p>
      )}
    </motion.div>
  )
}
