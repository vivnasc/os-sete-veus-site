'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'

type Reflexao = {
  id: string
  veu_numero: number
  capitulo: number
  conteudo: string
  created_at: string
}

export default function EspelhoPage() {
  const { user } = useAuth()
  const [reflexoes, setReflexoes] = useState<Reflexao[]>([])
  const [reflexoesPorVeu, setReflexoesPorVeu] = useState<Record<number, Reflexao[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      carregarTodasReflexoes()
    }
  }, [user])

  const carregarTodasReflexoes = async () => {
    setLoading(true)
    const response = await fetch('/api/reflexoes')
    const data = await response.json()

    if (data.reflexoes) {
      setReflexoes(data.reflexoes)

      // Organizar por véu
      const porVeu: Record<number, Reflexao[]> = {}
      data.reflexoes.forEach((ref: Reflexao) => {
        if (!porVeu[ref.veu_numero]) {
          porVeu[ref.veu_numero] = []
        }
        porVeu[ref.veu_numero].push(ref)
      })
      setReflexoesPorVeu(porVeu)
    }
    setLoading(false)
  }

  const nomeVeus = [
    "Permanência",
    "Memória",
    "Turbilhão",
    "Esforço",
    "Desolação",
    "Horizonte",
    "Dualidade"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-stone-900 text-white p-6">
      <div className="max-w-4xl mx-auto py-16">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="text-9xl mb-8"
          >
            ✨
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-serif mb-6">
            Espelho de Consciência
          </h1>
          <p className="text-2xl italic opacity-80">
            O que permanece quando os sete véus se dissolvem?
          </p>
        </motion.div>

        {/* Mensagem Contemplativa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 text-center"
        >
          <p className="text-xl leading-relaxed">
            Atravessaste os sete véus.<br />
            Não como quem conquista, mas como quem se dissolve.<br />
            Cada véu revelou não o que ganhas, mas o que já eras.<br />
            <br />
            <span className="text-2xl italic">
              Agora, olha para trás.<br />
              Vê a tua travessia.
            </span>
          </p>
        </motion.div>

        {/* Reflexões por Véu */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-6xl">⚬</div>
            <p className="mt-4 text-white/60">Carregando tua travessia...</p>
          </div>
        ) : reflexoes.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <p className="text-xl">
              Ainda não tens reflexões guardadas.<br />
              <span className="text-white/60">Volta aos capítulos e escreve o que despertou em ti.</span>
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {[1, 2, 3, 4, 5, 6, 7].map((veuNum) => {
              const reflexoesVeu = reflexoesPorVeu[veuNum] || []
              if (reflexoesVeu.length === 0) return null

              return (
                <motion.div
                  key={veuNum}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + veuNum * 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
                >
                  <h2 className="text-3xl font-serif mb-6">
                    Véu {veuNum}: {nomeVeus[veuNum - 1]}
                  </h2>
                  <div className="space-y-4">
                    {reflexoesVeu.map((reflexao) => (
                      <div key={reflexao.id} className="bg-black/20 rounded-lg p-4">
                        <p className="text-white/90 leading-relaxed whitespace-pre-wrap mb-2">
                          {reflexao.conteudo}
                        </p>
                        <p className="text-xs text-white/50">
                          Capítulo {reflexao.capitulo} •{' '}
                          {new Date(reflexao.created_at).toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'long',
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Mensagem Final */}
        {reflexoes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-16 text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12">
              <p className="text-3xl font-serif mb-6">
                Estas palavras são tuas.
              </p>
              <p className="text-xl leading-relaxed opacity-80">
                São a prova de que estiveste presente.<br />
                De que olhaste para dentro.<br />
                De que te atreveste a ver.<br />
                <br />
                <span className="italic">
                  Agora que nada resta,<br />
                  há tudo.
                </span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Navegação */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="mt-12 flex flex-col gap-4"
        >
          <Link href="/livro">
            <button className="w-full px-8 py-4 bg-white text-purple-900 rounded-full text-lg font-medium hover:bg-white/90 transition-colors">
              ← Voltar à Mandala
            </button>
          </Link>
          <Link href="/">
            <button className="w-full px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full text-lg font-medium hover:bg-white/20 transition-colors">
              Explorar Ecossistema
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
