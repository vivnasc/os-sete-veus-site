'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import livroData from '@/data/livro-7-veus.json'

export default function PortalVeuPage() {
  const params = useParams()
  const { user, loading } = useAuth()
  const router = useRouter()
  const numeroVeu = parseInt(params.numero as string)
  const veu = livroData.veus[numeroVeu - 1]

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/livro/veu/${numeroVeu}`)
    }
  }, [user, loading, router, numeroVeu])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-stone-600">A carregar...</p>
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

  // Cores por véu
  const coresVeu = [
    { bg: 'from-stone-50 to-stone-100', text: 'text-stone-900', accent: 'text-stone-700' },
    { bg: 'from-amber-50 to-stone-100', text: 'text-amber-900', accent: 'text-amber-700' },
    { bg: 'from-sky-50 to-stone-100', text: 'text-sky-900', accent: 'text-sky-700' },
    { bg: 'from-purple-50 to-stone-100', text: 'text-purple-900', accent: 'text-purple-700' },
    { bg: 'from-gray-50 to-gray-200', text: 'text-gray-900', accent: 'text-gray-600' },
    { bg: 'from-indigo-50 to-purple-100', text: 'text-indigo-900', accent: 'text-indigo-700' },
    { bg: 'from-purple-100 to-white', text: 'text-purple-900', accent: 'text-purple-600' }
  ]

  const cores = coresVeu[numeroVeu - 1]

  return (
    <div className={`min-h-screen bg-gradient-to-b ${cores.bg} flex flex-col items-center justify-center p-6`}>
      {/* Respiração Inicial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.3, 0.7, 1] }}
        className="absolute inset-0 flex items-center justify-center bg-black/90 z-50 pointer-events-none"
      >
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: 0 }}
            className="text-white text-2xl mb-4"
          >
            ⚬
          </motion.div>
          <p className="text-white/80 text-lg">Respira. Depois, avança.</p>
        </div>
      </motion.div>

      {/* Conteúdo Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Número do Véu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className={`text-sm tracking-widest ${cores.accent} mb-4`}
        >
          VÉU {numeroVeu}
        </motion.div>

        {/* Nome do Véu */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.3 }}
          className={`text-5xl md:text-6xl font-serif ${cores.text} mb-8`}
        >
          {veu.nome}
        </motion.h1>

        {/* Citação */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.6 }}
          className={`text-xl md:text-2xl italic ${cores.accent} mb-16 leading-relaxed max-w-2xl mx-auto`}
        >
          "{veu.citacao}"
        </motion.blockquote>

        {/* Separador */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 6, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mb-12"
        />

        {/* O que encobre / O que revela */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.5 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="text-left">
            <h3 className={`text-sm uppercase tracking-wide ${cores.accent} mb-3`}>
              O que este véu encobre:
            </h3>
            <p className={`text-lg ${cores.text} leading-relaxed`}>
              {veu.encobre}
            </p>
          </div>
          <div className="text-left">
            <h3 className={`text-sm uppercase tracking-wide ${cores.accent} mb-3`}>
              O que revela ao dissolver:
            </h3>
            <p className={`text-lg ${cores.text} leading-relaxed`}>
              {veu.revela}
            </p>
          </div>
        </motion.div>

        {/* Separador */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 7, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mb-12"
        />

        {/* Informação */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.5 }}
          className={`text-sm ${cores.accent} mb-12`}
        >
          {veu.capitulos.length} capítulos<br />
          <span className="italic">
            (Mas não há pressa. Leva o tempo que precisares.)
          </span>
        </motion.div>

        {/* Botão Começar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 8 }}
        >
          <Link href={`/livro/veu/${numeroVeu}/capitulo/${veu.capitulos[0].numero}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-12 py-4 bg-gradient-to-r ${cores.bg.replace('from-', 'from-').replace('to-', 'to-')} border-2 border-stone-400 ${cores.text} rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all`}
            >
              Começar a Travessia
            </motion.button>
          </Link>
        </motion.div>

        {/* Voltar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.5 }}
          className="mt-8"
        >
          <Link href="/livro" className={`text-sm ${cores.accent} hover:underline`}>
            ← Voltar à Mandala
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
