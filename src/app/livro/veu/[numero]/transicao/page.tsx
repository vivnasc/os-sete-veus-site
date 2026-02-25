'use client'

import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useAccess } from '@/hooks/useAccess'
import livroData from '@/data/livro-7-veus.json'

export default function TransicaoVeuPage() {
  const { user, loading } = useAuth()
  const { hasBookAccess, isLoading: accessLoading } = useAccess()
  const router = useRouter()
  const params = useParams()
  const numeroVeu = parseInt(params.numero as string)
  const veu = livroData.veus[numeroVeu - 1]

  useEffect(() => {
    if (!loading && !user) {
      router.push('/entrar')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!loading && !accessLoading && user && !hasBookAccess) {
      router.push('/comprar')
    }
  }, [user, loading, accessLoading, hasBookAccess, router])

  if (loading || accessLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    )
  }

  if (!user || !hasBookAccess) {
    return null
  }

  if (!veu) {
    return <div>V&eacute;u n&atilde;o encontrado</div>
  }

  const proximoVeu = numeroVeu < 7 ? numeroVeu + 1 : null
  const isFinalVeu = numeroVeu === 7

  const coresVeu = [
    { bg: 'from-red-50 to-stone-100', text: 'text-red-800', accent: 'text-red-700' },
    { bg: 'from-orange-50 to-stone-100', text: 'text-orange-700', accent: 'text-orange-600' },
    { bg: 'from-amber-50 to-stone-100', text: 'text-amber-700', accent: 'text-amber-600' },
    { bg: 'from-green-50 to-stone-100', text: 'text-green-700', accent: 'text-green-600' },
    { bg: 'from-sky-50 to-stone-100', text: 'text-sky-700', accent: 'text-sky-600' },
    { bg: 'from-indigo-50 to-stone-100', text: 'text-indigo-700', accent: 'text-indigo-600' },
    { bg: 'from-purple-50 to-stone-100', text: 'text-purple-700', accent: 'text-purple-600' }
  ]

  const cores = coresVeu[numeroVeu - 1]

  // Final do livro — experiência de fecho completa
  if (isFinalVeu) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-stone-50 to-stone-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Simbolo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6] }}
            transition={{ duration: 3, delay: 0.5 }}
            className="mb-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="text-7xl text-stone-400"
            >
              &#9702;
            </motion.div>
          </motion.div>

          {/* Mensagem de conclusao */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-6 mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
              Os sete v&eacute;us dissolveram-se
            </h1>
            <p className="text-xl md:text-2xl italic text-stone-600 leading-relaxed">
              N&atilde;o como quem conquista, mas como quem se lembra.<br />
              Aquilo que procuravas &mdash; sempre esteve aqui.
            </p>
          </motion.div>

          {/* Separador */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 2, duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mb-16"
          />

          {/* Reflexoes — o espelho da travessia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="mb-12"
          >
            <p className="text-lg text-stone-700 mb-6 leading-relaxed font-serif">
              Ao longo desta travessia, deixaste palavras tuas em cada v&eacute;u.<br />
              Elas s&atilde;o o espelho do teu caminho.
            </p>
            <Link href="/livro/espelho">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full max-w-md mx-auto px-8 py-4 bg-purple-900 text-white rounded-full text-lg font-medium shadow-xl hover:bg-purple-800 transition-colors"
              >
                Ver as tuas Reflex&otilde;es &rarr;
              </motion.button>
            </Link>
          </motion.div>

          {/* Carta ao Leitor + Fontes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="space-y-3 mb-12"
          >
            <Link href="/livro/posfacio">
              <div className="px-6 py-4 bg-white/70 hover:bg-white rounded-xl transition-colors text-left">
                <p className="text-base font-serif text-stone-800 font-medium">Carta ao Leitor</p>
                <p className="text-sm text-stone-500">Uma carta da autora para ti</p>
              </div>
            </Link>
            <Link href="/livro/posfacio?s=referencias">
              <div className="px-6 py-4 bg-white/70 hover:bg-white rounded-xl transition-colors text-left">
                <p className="text-base font-serif text-stone-800 font-medium">Ecos e Fontes Inspiradoras</p>
                <p className="text-sm text-stone-500">As vozes que acompanharam esta escrita</p>
              </div>
            </Link>
          </motion.div>

          {/* Separador */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 3.5, duration: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mb-12"
          />

          {/* Voltar a Mandala */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8 }}
            className="space-y-4"
          >
            <Link href="/livro">
              <button className="w-full max-w-md mx-auto px-8 py-3 bg-stone-100 border border-stone-300 text-stone-700 rounded-full text-base font-medium hover:bg-stone-200 transition-colors">
                &larr; Voltar &agrave; Mandala
              </button>
            </Link>
          </motion.div>

          {/* Frase de fecho */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.2 }}
            className="mt-16 text-sm text-stone-500 italic font-serif"
          >
            Agora que nada resta, h&aacute; tudo.
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // Transicao entre veus (nao o final)
  return (
    <div className={`min-h-screen bg-gradient-to-b ${cores.bg} flex flex-col items-center justify-center p-6`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Simbolo de Dissolucao */}
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
            &#9702;
          </motion.div>
        </motion.div>

        {/* Mensagem de Dissolucao */}
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
            className={`text-xl md:text-2xl italic ${cores.accent} opacity-80`}
          >
            O que permanece quando {veu.nome.toLowerCase()} se desfaz?
          </motion.p>
        </motion.div>

        {/* Separador */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 2, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent my-16"
        />

        {/* Opcoes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="space-y-4"
        >
          {/* Ver Reflexoes */}
          <Link href="/livro/espelho">
            <button className={`w-full px-8 py-4 bg-white/60 border border-stone-300 ${cores.text} rounded-full text-lg font-medium hover:bg-white transition-all`}>
              Ver as tuas Reflex&otilde;es
            </button>
          </Link>

          {/* Proximo Veu */}
          {proximoVeu && (
            <Link href={`/livro/veu/${proximoVeu}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-900 to-stone-800 text-white rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
              >
                Continuar para V&eacute;u {proximoVeu} &rarr;
              </motion.button>
            </Link>
          )}

          {/* Voltar a Mandala */}
          <Link href="/livro">
            <button className={`w-full px-8 py-4 bg-white/40 border border-stone-300 ${cores.text} opacity-60 rounded-full text-lg font-medium hover:opacity-100 transition-all`}>
              &larr; Voltar &agrave; Mandala
            </button>
          </Link>
        </motion.div>

        {/* Sugestao de Pausa */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-12"
        >
          <p className={`text-sm ${cores.accent} opacity-50 italic`}>
            Deixa este v&eacute;u assentar.<br />
            Volta amanh&atilde;, ou quando estiveres pronta.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
