'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './AuthProvider'
import { useAccess } from '@/hooks/useAccess'
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
  guiaoReflexao?: string[]
  hasFloatingPlayer?: boolean
  capituloCompleto?: boolean
}

export default function ReflexoesDrawer({ veuNumero, capituloNumero, guiaoReflexao, hasFloatingPlayer, capituloCompleto }: Props) {
  const { user } = useAuth()
  const { hasBookAccess } = useAccess()
  const [isOpen, setIsOpen] = useState(false)
  const [reflexoes, setReflexoes] = useState<Reflexao[]>([])
  const [novaReflexao, setNovaReflexao] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [perguntaEspelho, setPerguntaEspelho] = useState<string | null>(null)
  const [loadingEspelho, setLoadingEspelho] = useState(false)

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
      const textoGuardado = novaReflexao
      setNovaReflexao('')
      await carregarReflexoes()
      // Pedir pergunta-espelho à IA apenas para membros premium
      if (hasBookAccess) {
        pedirPerguntaEspelho(textoGuardado)
      } else {
        setPerguntaEspelho(null)
      }
    }
    setLoading(false)
  }

  const pedirPerguntaEspelho = async (texto: string) => {
    setLoadingEspelho(true)
    setPerguntaEspelho(null)
    try {
      const res = await fetch('/api/diario-espelho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reflexao: texto, veuNumero }),
      })
      if (res.ok) {
        const data = await res.json()
        setPerguntaEspelho(data.pergunta)
      }
    } catch {
      // Silencioso — o espelho é opcional
    }
    setLoadingEspelho(false)
  }

  // Show hint when chapter is completed — persist until user opens drawer
  useEffect(() => {
    if (capituloCompleto && !isOpen) {
      setShowHint(true)
    }
    if (isOpen) {
      setShowHint(false)
    }
  }, [capituloCompleto, isOpen])

  if (!user) return null

  return (
    <>
      {/* Banner visivel apos completar capitulo */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className={`fixed left-4 right-4 z-40 ${hasFloatingPlayer ? 'bottom-24' : 'bottom-6'}`}
          >
            <button
              onClick={() => { setIsOpen(true); setShowHint(false) }}
              className="w-full max-w-xl mx-auto flex items-center gap-4 px-6 py-4 rounded-2xl bg-purple-900 text-white shadow-2xl hover:bg-purple-800 transition-colors"
            >
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Capítulo completo</p>
                <p className="text-xs text-purple-300 mt-0.5">O que este capítulo despertou em ti?</p>
              </div>
              <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/20 whitespace-nowrap">
                Reflectir
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botao Flutuante (quando nao ha banner) */}
      {!showHint && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setIsOpen(true); setShowHint(false) }}
          className={`fixed right-6 z-40 bg-purple-900 text-white w-14 h-14 text-2xl rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ${
            hasFloatingPlayer ? 'bottom-24' : 'bottom-6'
          }`}
          title="Abrir Reflexões"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </motion.button>
      )}

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

                  {/* Guiao de reflexao — prompts que ticam a escrita */}
                  {guiaoReflexao && guiaoReflexao.length > 0 && (
                    <div className="mb-3 space-y-1.5">
                      <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                        Para te guiar:
                      </p>
                      {guiaoReflexao.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => setNovaReflexao(prev => prev ? prev + '\n\n' + prompt + '\n' : prompt + '\n')}
                          className="w-full text-left text-xs px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors font-serif italic"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

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

                {/* Pergunta Espelho (Diário Espelho com IA) — Premium */}
                {hasBookAccess ? (
                  <AnimatePresence>
                    {(loadingEspelho || perguntaEspelho) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-xl border-l-[3px] border-purple-400 bg-purple-50 dark:bg-purple-900/20 p-4"
                      >
                        <p className="text-[0.6rem] uppercase tracking-wider text-purple-500 dark:text-purple-400 mb-2">
                          Diário Espelho
                        </p>
                        {loadingEspelho ? (
                          <motion.p
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="font-serif text-sm italic text-stone-500"
                          >
                            O espelho observa...
                          </motion.p>
                        ) : (
                          <p className="font-serif text-sm italic leading-relaxed text-stone-700 dark:text-stone-300">
                            &ldquo;{perguntaEspelho}&rdquo;
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : (
                  <div className="rounded-xl border-l-[3px] border-stone-300 bg-stone-50 dark:bg-stone-800/40 p-4">
                    <p className="text-[0.6rem] uppercase tracking-wider text-stone-400 mb-2">
                      Diário Espelho
                    </p>
                    <p className="font-serif text-sm italic leading-relaxed text-stone-500 dark:text-stone-400">
                      Cada reflexão tua pode receber uma pergunta-espelho da IA — uma presença que devolve perguntas, nunca respostas.
                    </p>
                    <a
                      href="/comprar"
                      className="mt-3 inline-block text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 transition-colors"
                    >
                      Desbloquear Diário Espelho &rarr;
                    </a>
                  </div>
                )}

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
