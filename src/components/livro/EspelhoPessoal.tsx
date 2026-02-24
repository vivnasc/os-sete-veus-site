'use client'

import { motion } from 'framer-motion'

type Props = {
  texto: string
  modoNoturno?: boolean
}

export default function EspelhoPessoal({ texto, modoNoturno = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`mt-16 mb-8 text-center px-8 py-6 rounded-xl ${
        modoNoturno ? 'bg-stone-800/30' : 'bg-stone-50/60'
      }`}
    >
      <p className={`text-xs font-sans uppercase tracking-widest mb-4 ${
        modoNoturno ? 'text-stone-600' : 'text-stone-300'
      }`}>
        Espelho
      </p>
      <p className={`text-lg md:text-xl font-serif italic leading-relaxed ${
        modoNoturno ? 'text-stone-300' : 'text-stone-600'
      }`}>
        {texto}
      </p>
    </motion.div>
  )
}
