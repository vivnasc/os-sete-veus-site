'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import livroData from '@/data/livro-7-veus.json'
import ReflexoesDrawer from '@/components/ReflexoesDrawer'
import { useAuth } from '@/components/AuthProvider'

export default function CapituloPage() {
  const params = useParams()
  const router = useRouter()
  const numeroVeu = parseInt(params.numero as string)
  const numeroCapitulo = parseInt(params.capitulo as string)
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const veu = livroData.veus[numeroVeu - 1]
  const capitulo = veu?.capitulos.find(c => c.numero === numeroCapitulo)

  const [modoLeitura, setModoLeitura] = useState<'contemplativo' | 'normal'>('contemplativo')
  const [modoNoturno, setModoNoturno] = useState(false)
  const [mostrarPausa, setMostrarPausa] = useState(false)
  const [secaoAtual, setSecaoAtual] = useState(0)
  const [paragrafoAtual, setParagrafoAtual] = useState(0)

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

  if (!veu || !capitulo) {
    return <div>Capítulo não encontrado</div>
  }

  // Dividir conteúdo em parágrafos
  const paragrafos = capitulo.conteudo
    .split('\n\n')
    .filter(p => p.trim().length > 0)
    .map(p => p.trim())

  // Cores por véu
  const coresVeu = [
    { bg: 'bg-stone-50', bgDark: 'bg-stone-900', text: 'text-stone-900', textDark: 'text-stone-100' },
    { bg: 'bg-amber-50', bgDark: 'bg-amber-950', text: 'text-amber-900', textDark: 'text-amber-100' },
    { bg: 'bg-sky-50', bgDark: 'bg-sky-950', text: 'text-sky-900', textDark: 'text-sky-100' },
    { bg: 'bg-purple-50', bgDark: 'bg-purple-950', text: 'text-purple-900', textDark: 'text-purple-100' },
    { bg: 'bg-gray-100', bgDark: 'bg-gray-950', text: 'text-gray-900', textDark: 'text-gray-100' },
    { bg: 'bg-indigo-50', bgDark: 'bg-indigo-950', text: 'text-indigo-900', textDark: 'text-indigo-100' },
    { bg: 'bg-purple-100', bgDark: 'bg-purple-950', text: 'text-purple-900', textDark: 'text-purple-100' }
  ]

  const cores = coresVeu[numeroVeu - 1]

  // Mostrar pausa a cada 3 parágrafos
  useEffect(() => {
    if (paragrafoAtual > 0 && paragrafoAtual % 3 === 0 && modoLeitura === 'contemplativo') {
      setMostrarPausa(true)
      const timer = setTimeout(() => setMostrarPausa(false), 10000) // 10 segundos
      return () => clearTimeout(timer)
    }
  }, [paragrafoAtual, modoLeitura])

  // Próximo parágrafo
  const proximoParagrafo = () => {
    if (paragrafoAtual < paragrafos.length - 1) {
      setParagrafoAtual(paragrafoAtual + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Próximo capítulo
  const proximoCapitulo = () => {
    const indexCapAtual = veu.capitulos.findIndex(c => c.numero === numeroCapitulo)
    if (indexCapAtual < veu.capitulos.length - 1) {
      return `/livro/veu/${numeroVeu}/capitulo/${veu.capitulos[indexCapAtual + 1].numero}`
    }
    // Último capítulo do véu - ir para página de transição
    return `/livro/veu/${numeroVeu}/transicao`
  }

  return (
    <div className={`min-h-screen ${modoNoturno ? cores.bgDark : cores.bg} transition-colors duration-500`}>
      {/* Header com controles */}
      <div className="sticky top-0 z-40 backdrop-blur-sm bg-white/50 dark:bg-black/50 border-b border-stone-200 dark:border-stone-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/livro/veu/${numeroVeu}`}
              className="text-sm text-stone-600 dark:text-stone-400 hover:underline"
            >
              ← Véu {numeroVeu}
            </Link>
            <span className="text-sm text-stone-400">|</span>
            <span className="text-sm text-stone-600 dark:text-stone-400">
              Capítulo {numeroCapitulo}: {capitulo.titulo}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Modo Leitura */}
            <button
              onClick={() => setModoLeitura(m => m === 'contemplativo' ? 'normal' : 'contemplativo')}
              className="text-xs px-3 py-1 rounded-full border border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              {modoLeitura === 'contemplativo' ? '🧘 Contemplativo' : '📖 Normal'}
            </button>

            {/* Modo Noturno */}
            <button
              onClick={() => setModoNoturno(!modoNoturno)}
              className="text-xs px-3 py-1 rounded-full border border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              {modoNoturno ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      {/* Pausa Contemplativa */}
      <AnimatePresence>
        {mostrarPausa && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-white text-4xl mb-6"
              >
                ⚬
              </motion.div>
              <p className="text-white text-xl mb-2">Pausa para integrar</p>
              <p className="text-white/60 text-sm italic">Respira.</p>
              <button
                onClick={() => setMostrarPausa(false)}
                className="mt-8 text-white/40 text-xs hover:text-white/60 transition-colors"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo Principal */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Título do Capítulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-widest ${modoNoturno ? 'text-stone-500' : 'text-stone-600'} mb-4`}>
            CAPÍTULO {numeroCapitulo}
          </p>
          <h1 className={`text-4xl md:text-5xl font-serif ${modoNoturno ? cores.textDark : cores.text} mb-4`}>
            {capitulo.titulo}
          </h1>
        </motion.div>

        {/* Texto do Capítulo */}
        {modoLeitura === 'normal' ? (
          // Modo Normal: Todo o texto de uma vez
          <div className="space-y-8">
            {paragrafos.map((paragrafo, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-lg md:text-xl leading-relaxed ${modoNoturno ? cores.textDark : cores.text} font-serif`}
              >
                {paragrafo}
              </motion.p>
            ))}
          </div>
        ) : (
          // Modo Contemplativo: Parágrafo por parágrafo
          <div className="min-h-[60vh] flex flex-col justify-between">
            <motion.div
              key={paragrafoAtual}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <p className={`text-lg md:text-2xl leading-relaxed ${modoNoturno ? cores.textDark : cores.text} font-serif`}>
                {paragrafos[paragrafoAtual]}
              </p>
            </motion.div>

            {/* Progresso */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm ${modoNoturno ? 'text-stone-500' : 'text-stone-600'}`}>
                  {paragrafoAtual + 1} de {paragrafos.length}
                </span>
                {paragrafoAtual < paragrafos.length - 1 ? (
                  <button
                    onClick={proximoParagrafo}
                    className={`px-6 py-2 rounded-full ${modoNoturno ? 'bg-stone-800 text-stone-200' : 'bg-stone-200 text-stone-800'} hover:opacity-80 transition-opacity`}
                  >
                    Continuar →
                  </button>
                ) : (
                  <Link href={proximoCapitulo()}>
                    <button
                      className={`px-6 py-2 rounded-full ${modoNoturno ? 'bg-purple-800 text-purple-200' : 'bg-purple-200 text-purple-800'} hover:opacity-80 transition-opacity`}
                    >
                      Próximo Capítulo →
                    </button>
                  </Link>
                )}
              </div>
              <div className="w-full h-1 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((paragrafoAtual + 1) / paragrafos.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-stone-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navegação (Modo Normal) */}
        {modoLeitura === 'normal' && (
          <div className="mt-16 flex justify-between items-center">
            <Link
              href={`/livro/veu/${numeroVeu}`}
              className={`text-sm ${modoNoturno ? 'text-stone-400' : 'text-stone-600'} hover:underline`}
            >
              ← Voltar ao Véu {numeroVeu}
            </Link>
            <Link href={proximoCapitulo()}>
              <button
                className={`px-8 py-3 rounded-full ${modoNoturno ? 'bg-purple-800 text-purple-200' : 'bg-purple-200 text-purple-800'} hover:opacity-80 transition-opacity`}
              >
                Próximo Capítulo →
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Drawer de Reflexões */}
      <ReflexoesDrawer veuNumero={numeroVeu} capituloNumero={numeroCapitulo} />
    </div>
  )
}
