'use client'

import { motion } from 'framer-motion'

type Props = {
  paragrafos: string[]
  corBorda?: string
  modoNoturno?: boolean
}

export default function ResumoAcessivel({ paragrafos, corBorda = 'border-stone-300', modoNoturno = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`mb-12 rounded-xl border-l-4 ${corBorda} px-6 py-5 ${
        modoNoturno ? 'bg-stone-800/50' : 'bg-stone-50'
      }`}
    >
      <p className={`text-xs font-sans uppercase tracking-wide mb-3 ${
        modoNoturno ? 'text-stone-500' : 'text-stone-400'
      }`}>
        Resumo acessivel
      </p>
      <div className="space-y-3">
        {paragrafos.map((p, i) => (
          <p
            key={i}
            className={`text-base leading-relaxed font-serif ${
              modoNoturno ? 'text-stone-300' : 'text-stone-700'
            }`}
          >
            {p}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
