'use client'

import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import livroData from '@/data/livro-7-veus.json'

export default function TransicaoVeuPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const numeroVeu = parseInt(params.numero as string)
  const veu = livroData.veus[numeroVeu - 1]

  useEffect(() => {
    if (!loading && !user) {
      router.push('/entrar')
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

  const proximoVeu = numeroVeu < 7 ? numeroVeu + 1 : null
  const isFinalVeu = numeroVeu === 7

  // Cores por véu
  const coresVeu = [
    { bg: 'from-stone-50 to-stone-100', text: 'text-stone-900' },
    { bg: 'from-amber-50 to-stone-100', text: 'text-amber-900' },
    { bg: 'from-sky-50 to-stone-100', text: 'text-sky-900' },
    { bg: 'from-purple-50 to-stone-100', text: 'text-purple-900' },
    { bg: 'from-gray-50 to-gray-200', text: 'text-gray-900' },
    { bg: 'from-indigo-50 to-purple-100', text: 'text-indigo-900' },
    { bg: 'from-purple-100 to-white', text: 'text-purple-900' }
  ]

  const cores = coresVeu[numeroVeu - 1]

  return (
    <div className={`min-h-screen bg-gradient-to-b ${cores.bg} flex flex-col items-center justify-center p-6`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Símbolo de Dissolução */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 3, delay: 0.5 }}
          className="mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-8xl text-stone-400"
          >
            ⚬
          </motion.div>
        </motion.div>

        {/* Mensagem de Dissolução */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-6"
        >
          <h1 className={`text-4xl md:text-5xl font-serif ${cores.text}`}>
            {veu.nome} dissolveu-se
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className={`text-xl md:text-2xl italic ${cores.text} opacity-70`}
          >
            {isFinalVeu ? (
              "Agora que nada resta, há tudo."
            ) : (
              `O que permanece quando ${veu.nome.toLowerCase()} se desfaz?`
            )}
          </motion.p>
        </motion.div>

        {/* Separador */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 2, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent my-16"
        />

        {/* Opções */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="space-y-4"
        >
          {/* Ver Reflexões */}
          <Link href={`/livro/veu/${numeroVeu}/reflexoes`}>
            <button className={`w-full px-8 py-4 ${cores.bg.replace('from-', 'bg-').split(' ')[0]} border-2 border-stone-400 ${cores.text} rounded-full text-lg font-medium hover:shadow-xl transition-all`}>
              Ver Reflexões deste Véu
            </button>
          </Link>

          {/* Próximo Véu ou Espelho */}
          {isFinalVeu ? (
            <Link href="/livro/espelho">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-900 to-stone-800 text-white rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
              >
                Ver Espelho de Consciência →
              </motion.button>
            </Link>
          ) : (
            <Link href={`/livro/veu/${proximoVeu}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-900 to-stone-800 text-white rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
              >
                Continuar para Véu {proximoVeu} →
              </motion.button>
            </Link>
          )}

          {/* Voltar à Mandala */}
          <Link href="/livro">
            <button className={`w-full px-8 py-4 ${cores.bg.replace('from-', 'bg-').split(' ')[0]} border border-stone-300 ${cores.text} opacity-60 rounded-full text-lg font-medium hover:opacity-100 transition-all`}>
              ← Voltar à Mandala
            </button>
          </Link>
        </motion.div>

        {/* Sugestão de Pausa */}
        {!isFinalVeu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-12"
          >
            <p className={`text-sm ${cores.text} opacity-50 italic`}>
              Deixa este véu assentar.<br />
              Volta amanhã, ou quando estiveres pronta.
            </p>
            <p className={`text-xs ${cores.text} opacity-40 mt-2`}>
              (Mas podes continuar agora se quiseres)
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
