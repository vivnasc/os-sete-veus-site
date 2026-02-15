'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PRESETS = [
  'Ouvi-te.',
  'Também eu.',
  'Não estás sozinha.',
  'Obrigada.',
  'Reconheço-me.',
]

type Props = {
  ecoId: string | null
  onClose: () => void
}

export default function SussurroModal({ ecoId, onClose }: Props) {
  const [conteudo, setConteudo] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (ecoId) {
      setConteudo('')
      setEnviado(false)
      setErro(null)
    }
  }, [ecoId])

  async function enviar() {
    if (!conteudo.trim() || !ecoId) return

    setLoading(true)
    setErro(null)

    const res = await fetch('/api/sussurros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ecoId, conteudo }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setErro(data.error)
      return
    }

    setEnviado(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {ecoId && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {enviado ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10 text-sage"
                  >
                    <span className="text-2xl">~</span>
                  </motion.div>
                  <p className="font-serif text-lg text-brown-700">
                    Sussurro enviado
                  </p>
                  <p className="mt-1 font-sans text-xs text-brown-400">
                    Chegará em silêncio. E depois desaparecerá.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <h3 className="font-serif text-xl text-brown-900">
                    Sussurrar
                  </h3>
                  <p className="mt-1 font-sans text-xs text-brown-400">
                    Um único sopro. Sem conversa. Sem resposta. Presença pura.
                  </p>

                  {/* Preset options */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setConteudo(preset)}
                        className={`rounded-full border px-3 py-1.5 font-sans text-xs transition-all ${
                          conteudo === preset
                            ? 'border-sage bg-sage/10 text-sage'
                            : 'border-brown-200 text-brown-500 hover:border-brown-300'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  {/* Custom input */}
                  <div className="mt-3">
                    <input
                      type="text"
                      value={conteudo}
                      onChange={(e) => setConteudo(e.target.value.slice(0, 100))}
                      placeholder="Ou escreve o teu sussurro..."
                      className="w-full rounded-lg border border-brown-200 px-4 py-2.5 font-sans text-sm text-brown-700 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                    <p className="mt-1 text-right font-sans text-[0.6rem] text-brown-300">
                      {conteudo.length}/100
                    </p>
                  </div>

                  {/* Error */}
                  {erro && (
                    <p className="mt-2 font-sans text-xs text-red-500">{erro}</p>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 rounded-lg border border-brown-200 px-4 py-2.5 font-sans text-xs text-brown-500 transition-colors hover:bg-cream"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={enviar}
                      disabled={!conteudo.trim() || loading}
                      className="flex-1 rounded-lg bg-brown-900 px-4 py-2.5 font-sans text-xs text-white transition-colors hover:bg-brown-800 disabled:opacity-40"
                    >
                      {loading ? 'Enviando...' : 'Sussurrar'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
