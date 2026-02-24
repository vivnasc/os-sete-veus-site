'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  sinais: string[]
  modoNoturno?: boolean
}

export default function VeuDominante({ sinais, modoNoturno = false }: Props) {
  const [marcados, setMarcados] = useState<Set<number>>(new Set())

  if (sinais.length === 0) return null

  const toggleSinal = (index: number) => {
    setMarcados(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const total = sinais.length
  const contagem = marcados.size
  const eDominante = contagem >= Math.ceil(total * 0.6)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className={`mb-10 rounded-xl border px-6 py-5 ${
        eDominante
          ? modoNoturno
            ? 'border-stone-500 bg-stone-800/60'
            : 'border-stone-400 bg-stone-50'
          : modoNoturno
            ? 'border-stone-700/50 bg-stone-800/30'
            : 'border-stone-200/80 bg-stone-50/50'
      }`}
    >
      <p className={`text-xs font-sans uppercase tracking-wide mb-1 ${
        modoNoturno ? 'text-stone-500' : 'text-stone-400'
      }`}>
        Este e o teu veu dominante?
      </p>
      <p className={`text-sm font-sans mb-4 ${
        modoNoturno ? 'text-stone-400' : 'text-stone-500'
      }`}>
        Marca o que reconheces em ti — nao o que pensas, mas o que sentes.
      </p>
      <div className="space-y-2">
        {sinais.map((sinal, i) => (
          <button
            key={i}
            onClick={() => toggleSinal(i)}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-start gap-3 ${
              marcados.has(i)
                ? modoNoturno
                  ? 'bg-stone-700/60'
                  : 'bg-stone-100'
                : modoNoturno
                  ? 'hover:bg-stone-800/40'
                  : 'hover:bg-stone-50'
            }`}
          >
            <span className={`mt-0.5 text-sm flex-shrink-0 ${
              marcados.has(i)
                ? modoNoturno ? 'text-stone-300' : 'text-stone-700'
                : modoNoturno ? 'text-stone-600' : 'text-stone-300'
            }`}>
              {marcados.has(i) ? '●' : '○'}
            </span>
            <span className={`text-sm font-serif leading-relaxed ${
              marcados.has(i)
                ? modoNoturno ? 'text-stone-200' : 'text-stone-800'
                : modoNoturno ? 'text-stone-400' : 'text-stone-600'
            }`}>
              {sinal}
            </span>
          </button>
        ))}
      </div>
      {contagem > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          {eDominante ? (
            <p className={`text-sm font-serif italic leading-relaxed ${
              modoNoturno ? 'text-stone-300' : 'text-stone-700'
            }`}>
              Reconheceste {contagem} de {total} sinais. Este veu pode ser central na tua jornada. Nao e sentenca — e mapa. Agora que o ves, ele ja comecou a perder forca.
            </p>
          ) : (
            <p className={`text-xs font-sans italic ${
              modoNoturno ? 'text-stone-500' : 'text-stone-400'
            }`}>
              {contagem} de {total} — este veu esta presente, mas pode nao ser o dominante. Continua a explorar.
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
