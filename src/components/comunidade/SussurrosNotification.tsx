'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'

type Sussurro = {
  id: string
  conteudo: string
  lido: boolean
  created_at: string
}

export default function SussurrosNotification() {
  const { user } = useAuth()
  const [sussurros, setSussurros] = useState<Sussurro[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!user) return

    async function carregarSussurros() {
      const res = await fetch('/api/sussurros')
      const data = await res.json()
      if (data.sussurros?.length > 0) {
        setSussurros(data.sussurros)
        setIsVisible(true)
      }
    }

    carregarSussurros()
  }, [user])

  async function marcarComoLido() {
    const sussurro = sussurros[currentIndex]
    if (!sussurro) return

    await fetch('/api/sussurros', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sussurroId: sussurro.id }),
    })

    if (currentIndex < sussurros.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      setIsVisible(false)
    }
  }

  if (!user || sussurros.length === 0) return null

  const current = sussurros[currentIndex]

  return (
    <AnimatePresence>
      {isVisible && current && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={marcarComoLido}
            className="fixed inset-0 z-50 bg-brown-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-x-4 bottom-8 z-50 mx-auto max-w-sm"
          >
            <div className="rounded-2xl border border-brown-100 bg-white p-6 shadow-2xl">
              {/* Header */}
              <p className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-brown-400">
                Sussurro
              </p>

              {/* Content */}
              <motion.p
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 font-serif text-lg italic text-brown-700"
              >
                &ldquo;{current.conteudo}&rdquo;
              </motion.p>

              {/* Counter */}
              {sussurros.length > 1 && (
                <p className="mt-3 font-sans text-[0.6rem] text-brown-300">
                  {currentIndex + 1} de {sussurros.length}
                </p>
              )}

              {/* Dismiss */}
              <button
                onClick={marcarComoLido}
                className="mt-4 w-full rounded-lg bg-cream-dark py-2.5 font-sans text-xs text-brown-500 transition-colors hover:bg-cream-mid"
              >
                {currentIndex < sussurros.length - 1 ? 'Próximo sussurro' : 'Deixar ir'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
