'use client'

import { motion } from 'framer-motion'

type Props = {
  mensagem: string
  modoNoturno?: boolean
}

export default function MensagemCentral({ mensagem, modoNoturno = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`mb-10 rounded-xl border-l-4 px-6 py-5 ${
        modoNoturno
          ? 'border-stone-500 bg-stone-800/40'
          : 'border-stone-400 bg-stone-50/90'
      }`}
    >
      <p className={`text-xs font-sans uppercase tracking-wide mb-3 ${
        modoNoturno ? 'text-stone-500' : 'text-stone-400'
      }`}>
        O que este capítulo te está a dizer
      </p>
      <p className={`text-base md:text-lg font-serif leading-relaxed ${
        modoNoturno ? 'text-stone-200' : 'text-stone-700'
      }`}>
        {mensagem}
      </p>
    </motion.div>
  )
}
