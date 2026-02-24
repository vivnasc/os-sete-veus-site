'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GuiaoEscrita as GuiaoEscritaType } from '@/data/livro-niveis/types'

type Props = {
  guiao: GuiaoEscritaType
  modoNoturno?: boolean
}

export default function GuiaoEscrita({ guiao, modoNoturno = false }: Props) {
  const [aberto, setAberto] = useState(false)
  const [passoAtual, setPassoAtual] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`mb-10 rounded-xl overflow-hidden ${
        modoNoturno ? 'bg-stone-800/50' : 'bg-stone-50/90'
      }`}
    >
      {/* Header — sempre visivel */}
      <button
        onClick={() => setAberto(!aberto)}
        className={`w-full text-left px-6 py-5 transition-colors ${
          modoNoturno ? 'hover:bg-stone-800/70' : 'hover:bg-stone-100/80'
        }`}
      >
        <p className={`text-xs font-sans uppercase tracking-wide mb-1 ${
          modoNoturno ? 'text-stone-500' : 'text-stone-400'
        }`}>
          Exercicio de escrita guiada
        </p>
        <p className={`text-sm font-serif italic leading-relaxed ${
          modoNoturno ? 'text-stone-300' : 'text-stone-600'
        }`}>
          {guiao.contexto}
        </p>
        <p className={`text-xs font-sans mt-2 ${
          modoNoturno ? 'text-stone-500' : 'text-stone-400'
        }`}>
          {guiao.tempo_sugerido} · {guiao.passos.length} passos · {aberto ? 'Fechar' : 'Comecar'}
        </p>
      </button>

      {/* Conteudo expandido */}
      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-6 pb-6 border-t ${
              modoNoturno ? 'border-stone-700' : 'border-stone-200'
            }`}>
              {/* Passos */}
              <div className="mt-5 space-y-3">
                {guiao.passos.map((passo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                      passoAtual === i
                        ? modoNoturno
                          ? 'bg-stone-700/50'
                          : 'bg-white'
                        : ''
                    }`}
                    onClick={() => setPassoAtual(i)}
                  >
                    <span className={`mt-0.5 text-xs font-sans font-medium flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      passoAtual >= i
                        ? modoNoturno
                          ? 'bg-stone-600 text-stone-200'
                          : 'bg-stone-400 text-white'
                        : modoNoturno
                          ? 'bg-stone-700 text-stone-500'
                          : 'bg-stone-200 text-stone-400'
                    }`}>
                      {i + 1}
                    </span>
                    <p className={`text-sm font-serif leading-relaxed ${
                      passoAtual === i
                        ? modoNoturno ? 'text-stone-200' : 'text-stone-800'
                        : modoNoturno ? 'text-stone-400' : 'text-stone-600'
                    }`}>
                      {passo}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Nota final */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: guiao.passos.length * 0.1 + 0.2 }}
                className={`mt-5 text-xs font-sans italic px-4 ${
                  modoNoturno ? 'text-stone-500' : 'text-stone-400'
                }`}
              >
                {guiao.nota_final}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
