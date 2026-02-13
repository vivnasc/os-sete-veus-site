'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import livroData from '@/data/livro-7-veus.json'

export default function PraticasPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const numeroVeu = parseInt(params.numero as string)
  const veu = livroData.veus[numeroVeu - 1]

  const [timerMinutos, setTimerMinutos] = useState(5)
  const [timerAtivo, setTimerAtivo] = useState(false)
  const [tempoRestante, setTempoRestante] = useState(timerMinutos * 60)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!veu) {
    return <div>Véu não encontrado</div>
  }

  // Práticas específicas por véu
  const praticas = [
    {
      // Véu 1
      titulo: "Prática da Observação do Eu",
      descricao: "Observa os teus pensamentos sem te identificares com eles.",
      passos: [
        "Senta-te confortavelmente",
        "Fecha os olhos",
        "Observa os pensamentos que surgem",
        "Pergunta: 'Quem está a observar este pensamento?'",
        "Deixa que a resposta surja sem esforço"
      ]
    },
    {
      // Véu 2
      titulo: "Prática da Libertação de Narrativas",
      descricao: "Liberta-te das histórias que te definem.",
      passos: [
        "Escreve uma história sobre ti que sempre acreditaste ser verdade",
        "Pergunta: 'Isto é realmente quem eu sou?'",
        "Imagina-te sem essa história",
        "Sente a leveza que emerge",
        "Respira nesse espaço vazio"
      ]
    },
    {
      // Véu 3
      titulo: "Prática do Silêncio Mental",
      descricao: "Encontra o espaço entre os pensamentos.",
      passos: [
        "Senta-te em silêncio",
        "Observa o espaço entre uma expiração e a próxima inspiração",
        "Observa o espaço entre um pensamento e outro",
        "Descansa nesse espaço",
        "Deixa que o silêncio te envolva"
      ]
    },
    {
      // Véu 4
      titulo: "Prática do Não-Fazer",
      descricao: "Descansa no ser, não no fazer.",
      passos: [
        "Senta-te sem objetivo",
        "Não tentes meditar, não tentes relaxar",
        "Simplesmente está",
        "Sente o peso do corpo",
        "Deixa tudo ser como é"
      ]
    },
    {
      // Véu 5
      titulo: "Prática do Vazio Fértil",
      descricao: "Abraça o vazio como espaço de criação.",
      passos: [
        "Senta-te em silêncio",
        "Sente o vazio dentro de ti",
        "Não o preenchas com nada",
        "Observa o que emerge naturalmente",
        "Confia no vazio"
      ]
    },
    {
      // Véu 6
      titulo: "Prática do Fluxo Infinito",
      descricao: "Dissolve a ilusão de fim.",
      passos: [
        "Imagina-te como um rio",
        "Sem começo, sem fim",
        "Apenas fluindo",
        "Sente a continuidade",
        "Não há onde chegar"
      ]
    },
    {
      // Véu 7
      titulo: "Prática da Unidade",
      descricao: "Dissolve a separação eu/mundo.",
      passos: [
        "Fecha os olhos",
        "Sente a tua respiração",
        "Sente o ar à tua volta",
        "Percebe: não há fronteira",
        "Tu és o espaço que contém tudo"
      ]
    }
  ]

  const pratica = praticas[numeroVeu - 1]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-100 p-6">
      <div className="max-w-3xl mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-widest text-stone-600 mb-4">
            PRÁTICA DO VÉU {numeroVeu}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">
            {pratica.titulo}
          </h1>
          <p className="text-xl text-stone-600 italic">
            {pratica.descricao}
          </p>
        </motion.div>

        {/* Passos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-serif text-stone-900 mb-6">Passos:</h2>
          <ol className="space-y-4">
            {pratica.passos.map((passo, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <p className="text-lg text-stone-700 pt-1">{passo}</p>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Timer Contemplativo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-serif text-stone-900 mb-6">Timer Contemplativo</h2>

          {!timerAtivo ? (
            <div className="text-center">
              <p className="text-stone-600 mb-6">Quanto tempo queres dedicar?</p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => setTimerMinutos(Math.max(1, timerMinutos - 1))}
                  className="w-12 h-12 bg-stone-200 rounded-full text-2xl hover:bg-stone-300 transition-colors"
                >
                  −
                </button>
                <span className="text-6xl font-bold text-purple-900">{timerMinutos}</span>
                <button
                  onClick={() => setTimerMinutos(timerMinutos + 1)}
                  className="w-12 h-12 bg-stone-200 rounded-full text-2xl hover:bg-stone-300 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-stone-500 mb-6">minutos</p>
              <button
                onClick={() => {
                  setTimerAtivo(true)
                  setTempoRestante(timerMinutos * 60)
                }}
                className="px-8 py-3 bg-purple-900 text-white rounded-full font-medium hover:bg-purple-800 transition-colors"
              >
                Começar Prática
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-8xl font-bold text-purple-900 mb-6">
                {Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, '0')}
              </div>
              <button
                onClick={() => setTimerAtivo(false)}
                className="px-8 py-3 bg-stone-200 text-stone-800 rounded-full font-medium hover:bg-stone-300 transition-colors"
              >
                Parar
              </button>
            </div>
          )}
        </motion.div>

        {/* Navegação */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col gap-4"
        >
          <Link href={`/livro/veu/${numeroVeu}/transicao`}>
            <button className="w-full px-8 py-4 bg-gradient-to-r from-purple-900 to-stone-800 text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
              Continuar →
            </button>
          </Link>
          <Link href={`/livro/veu/${numeroVeu}`}>
            <button className="w-full px-8 py-4 bg-stone-200 text-stone-800 rounded-full text-lg font-medium hover:bg-stone-300 transition-colors">
              ← Voltar ao Véu {numeroVeu}
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
