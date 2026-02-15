'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  veuNumero: number
  capituloNumero: number
  reflexaoConteudo: string
  reflexaoId?: string
}

export default function LibertarEcoButton({
  veuNumero,
  capituloNumero,
  reflexaoConteudo,
  reflexaoId,
}: Props) {
  const [estado, setEstado] = useState<'idle' | 'confirming' | 'sending' | 'done'>('idle')

  async function libertar() {
    setEstado('sending')

    const res = await fetch('/api/ecos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        veuNumero,
        capitulo: capituloNumero,
        conteudo: reflexaoConteudo,
        reflexaoId,
      }),
    })

    if (res.ok) {
      setEstado('done')
    } else {
      setEstado('idle')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {estado === 'idle' && (
        <motion.button
          key="idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setEstado('confirming')}
          className="mt-2 flex items-center gap-1.5 rounded-full border border-brown-200 px-3 py-1 font-sans text-[0.65rem] text-brown-400 transition-colors hover:border-sage hover:text-sage"
        >
          <span className="text-xs">~</span>
          Libertar como eco
        </motion.button>
      )}

      {estado === 'confirming' && (
        <motion.div
          key="confirming"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 overflow-hidden rounded-lg border border-sage/20 bg-sage/5 p-3"
        >
          <p className="font-sans text-xs text-brown-600">
            Esta reflexão será partilhada anonimamente na comunidade.
            Desaparecerá após 30 dias.
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setEstado('idle')}
              className="rounded-md border border-brown-200 px-3 py-1 font-sans text-[0.65rem] text-brown-500 hover:bg-cream"
            >
              Cancelar
            </button>
            <button
              onClick={libertar}
              className="rounded-md bg-sage px-3 py-1 font-sans text-[0.65rem] text-white hover:bg-sage-dark"
            >
              Libertar
            </button>
          </div>
        </motion.div>
      )}

      {estado === 'sending' && (
        <motion.div
          key="sending"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2"
        >
          <motion.p
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="font-sans text-xs italic text-sage"
          >
            A libertar...
          </motion.p>
        </motion.div>
      )}

      {estado === 'done' && (
        <motion.div
          key="done"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 flex items-center gap-1.5"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            className="text-sage"
          >
            ◆
          </motion.span>
          <span className="font-sans text-xs text-sage">
            Eco libertado
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
