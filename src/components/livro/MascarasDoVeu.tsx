'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  mascaras: string[]
  modoNoturno?: boolean
}

export default function MascarasDoVeu({ mascaras, modoNoturno = false }: Props) {
  const [reveladas, setReveladas] = useState<Set<number>>(new Set())

  if (mascaras.length === 0) return null

  const toggleMascara = (index: number) => {
    setReveladas(prev => {
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
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`mb-10 rounded-xl px-6 py-5 ${
        modoNoturno ? 'bg-stone-800/40' : 'bg-stone-50/80'
      }`}
    >
      <p className={`text-xs font-sans uppercase tracking-wide mb-1 ${
        modoNoturno ? 'text-stone-500' : 'text-stone-400'
      }`}>
        Mascaras que este veu activa
      </p>
      <p className={`text-sm font-sans mb-4 ${
        modoNoturno ? 'text-stone-400' : 'text-stone-500'
      }`}>
        Reconheces alguma destas versoes de ti?
      </p>
      <div className="space-y-2.5">
        {mascaras.map((mascara, i) => (
          <button
            key={i}
            onClick={() => toggleMascara(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-start gap-3 ${
              reveladas.has(i)
                ? modoNoturno
                  ? 'border-stone-500 bg-stone-700/50'
                  : 'border-stone-400 bg-white'
                : modoNoturno
                  ? 'border-stone-700 hover:border-stone-600'
                  : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <span className={`mt-0.5 text-sm flex-shrink-0 ${
              reveladas.has(i)
                ? modoNoturno ? 'text-stone-300' : 'text-stone-700'
                : modoNoturno ? 'text-stone-600' : 'text-stone-300'
            }`}>
              {reveladas.has(i) ? '◆' : '◇'}
            </span>
            <span className={`text-sm font-serif leading-relaxed ${
              reveladas.has(i)
                ? modoNoturno ? 'text-stone-200' : 'text-stone-800'
                : modoNoturno ? 'text-stone-400' : 'text-stone-600'
            }`}>
              {mascara}
            </span>
          </button>
        ))}
      </div>
      {reveladas.size > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-xs font-sans italic ${
            modoNoturno ? 'text-stone-500' : 'text-stone-400'
          }`}
        >
          A mascara nao e o inimigo. Foi proteccao. Reconhece-la e o primeiro passo para escolher quando a vestir — e quando a pousar.
        </motion.p>
      )}
    </motion.div>
  )
}
