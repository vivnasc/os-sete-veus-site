'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './AuthProvider'
import LibertarEcoButton from './comunidade/LibertarEcoButton'

type Reflexao = {
  id: string
  veu_numero: number
  capitulo: number
  conteudo: string
  created_at: string
}

type Props = {
  veuNumero: number
  capituloNumero: number
}

export default function ReflexoesDrawer({ veuNumero, capituloNumero }: Props) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [reflexoes, setReflexoes] = useState<Reflexao[]>([])
  const [novaReflexao, setNovaReflexao] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && isOpen) {
      carregarReflexoes()
    }
  }, [user, isOpen, veuNumero, capituloNumero])

  const carregarReflexoes = async () => {
    const response = await fetch(`/api/reflexoes?veu=${veuNumero}&capitulo=${capituloNumero}`)
    const data = await response.json()
    if (data.reflexoes) {
      setReflexoes(data.reflexoes)
    }
  }

  const guardarReflexao = async () => {
    if (!novaReflexao.trim()) return

    setLoading(true)
    const response = await fetch('/api/reflexoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        veuNumero,
        capitulo: capituloNumero,
        conteudo: novaReflexao,
      }),
    })

    if (response.ok) {
      setNovaReflexao('')
      await carregarReflexoes()
    }
    setLoading(false)
  }

  if (!user) return null

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 z-40 w-14 h-14 bg-purple-900 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl"
        title="Abrir Reflexões"
      >
        💭
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white dark:bg-stone-900 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-200 dark:border-stone-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-serif text-stone-900 dark:text-stone-100">
                      Reflexões
                    </h2>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                      Véu {veuNumero} • Capítulo {capituloNumero}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-stone-500 hover:text-stone-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Nova Reflexão */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    O que este capítulo despertou em ti?
                  </label>
                  <textarea
                    value={novaReflexao}
                    onChange={(e) => setNovaReflexao(e.target.value)}
                    placeholder="Escreve aqui as tuas reflexões..."
                    className="w-full h-32 px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                  <button
                    onClick={guardarReflexao}
                    disabled={loading || !novaReflexao.trim()}
                    className="mt-3 w-full px-6 py-3 bg-purple-900 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Guardando...' : 'Guardar Reflexão'}
                  </button>
                </div>

                {/* Reflexões Anteriores */}
                {reflexoes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                      Reflexões anteriores:
                    </h3>
                    <div className="space-y-3">
                      {reflexoes.map((reflexao) => (
                        <div
                          key={reflexao.id}
                          className="p-4 bg-stone-50 dark:bg-stone-800 rounded-lg"
                        >
                          <p className="text-stone-800 dark:text-stone-200 text-sm leading-relaxed whitespace-pre-wrap">
                            {reflexao.conteudo}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-stone-500 dark:text-stone-400">
                              {new Date(reflexao.created_at).toLocaleDateString('pt-PT', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <LibertarEcoButton
                            veuNumero={reflexao.veu_numero}
                            capituloNumero={reflexao.capitulo}
                            reflexaoConteudo={reflexao.conteudo}
                            reflexaoId={reflexao.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
