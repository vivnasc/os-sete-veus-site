'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { NivelLeitura } from '@/hooks/useNivelLeitura'

const opcoes: {
  value: NivelLeitura
  titulo: string
  descricao: string
  icon: string
}[] = [
  {
    value: 'semente',
    titulo: 'Semente',
    descricao: 'Sou nova nestas ideias. Gostaria de um guia gentil que me ajude a compreender.',
    icon: '○',
  },
  {
    value: 'raiz',
    titulo: 'Raiz',
    descricao: 'Conheco alguns conceitos. Quero o texto com notas de contexto.',
    icon: '◎',
  },
  {
    value: 'arvore',
    titulo: 'Arvore',
    descricao: 'Quero o texto original, puro, sem interrupcoes.',
    icon: '●',
  },
]

type Props = {
  open: boolean
  onSelect: (nivel: NivelLeitura) => void
}

export default function NivelOnboarding({ open, onSelect }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-8 pt-8 pb-4 text-center">
              <p className="text-sm tracking-widest text-stone-400 mb-4">
                ANTES DE COMECAR
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-3">
                Como queres receber este texto?
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed max-w-sm mx-auto">
                Este livro e denso e filosofico. Para que a travessia seja tua,
                escolhe o teu ritmo. Podes mudar a qualquer momento.
              </p>
            </div>

            <div className="px-6 pb-8 space-y-3">
              {opcoes.map((opcao) => (
                <button
                  key={opcao.value}
                  onClick={() => onSelect(opcao.value)}
                  className="w-full text-left px-5 py-4 rounded-xl border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5 text-stone-400 group-hover:text-stone-600 transition-colors">
                      {opcao.icon}
                    </span>
                    <div>
                      <p className="font-medium text-stone-900 mb-1">
                        {opcao.titulo}
                      </p>
                      <p className="text-sm text-stone-500 leading-relaxed">
                        {opcao.descricao}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
