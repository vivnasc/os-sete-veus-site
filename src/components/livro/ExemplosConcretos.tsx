'use client'

import { motion } from 'framer-motion'
import type { ExemploConcreto } from '@/data/livro-niveis/types'

type Props = {
  exemplos: ExemploConcreto[]
  modoNoturno?: boolean
}

export default function ExemplosConcretos({ exemplos, modoNoturno = false }: Props) {
  if (exemplos.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-10 space-y-4"
    >
      {exemplos.map((ex, i) => (
        <div
          key={i}
          className={`rounded-xl px-6 py-4 ${
            modoNoturno ? 'bg-stone-800/40' : 'bg-stone-50/80'
          }`}
        >
          <p className={`text-xs font-sans uppercase tracking-wide mb-2 ${
            modoNoturno ? 'text-stone-500' : 'text-stone-400'
          }`}>
            {ex.contexto}
          </p>
          <p className={`text-base font-serif leading-relaxed italic ${
            modoNoturno ? 'text-stone-300' : 'text-stone-600'
          }`}>
            {ex.texto}
          </p>
        </div>
      ))}
    </motion.div>
  )
}
