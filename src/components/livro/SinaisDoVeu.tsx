'use client'

import { motion } from 'framer-motion'

type Props = {
  sinais: string[]
  modoNoturno?: boolean
}

export default function SinaisDoVeu({ sinais, modoNoturno = false }: Props) {
  if (sinais.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`mb-10 rounded-xl border-l-4 px-6 py-5 ${
        modoNoturno
          ? 'border-stone-600 bg-stone-800/30'
          : 'border-stone-300 bg-stone-50/60'
      }`}
    >
      <p className={`text-xs font-sans uppercase tracking-wide mb-3 ${
        modoNoturno ? 'text-stone-500' : 'text-stone-400'
      }`}>
        Este véu está activo em ti quando...
      </p>
      <ul className="space-y-2">
        {sinais.map((sinal, i) => (
          <li
            key={i}
            className={`text-sm font-serif leading-relaxed flex items-start gap-2 ${
              modoNoturno ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            <span className={`mt-1 flex-shrink-0 text-xs ${
              modoNoturno ? 'text-stone-600' : 'text-stone-300'
            }`}>
              —
            </span>
            {sinal}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
