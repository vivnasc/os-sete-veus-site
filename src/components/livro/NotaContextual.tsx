'use client'

import { motion } from 'framer-motion'

type Props = {
  texto: string
  modoNoturno?: boolean
}

export default function NotaContextual({ texto, modoNoturno = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`my-4 rounded-lg border-l-2 border-dashed px-5 py-3 ${
        modoNoturno
          ? 'border-stone-600 bg-stone-800/40'
          : 'border-stone-300 bg-stone-50/80'
      }`}
    >
      <p className={`text-xs font-sans uppercase tracking-wide mb-1.5 ${
        modoNoturno ? 'text-stone-500' : 'text-stone-400'
      }`}>
        Na pratica
      </p>
      <p className={`text-sm font-sans leading-relaxed ${
        modoNoturno ? 'text-stone-400' : 'text-stone-600'
      }`}>
        {texto}
      </p>
    </motion.div>
  )
}
