'use client'

import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useAccess } from '@/hooks/useAccess'
import { supabase } from '@/lib/supabase'
import livroData from '@/data/livro-7-veus.json'

export default function PortalVeuPage() {
  const { user, loading } = useAuth()
  const { hasBookAccess, isLoading: accessLoading } = useAccess()
  const router = useRouter()
  const params = useParams()
  const numeroVeu = parseInt(params.numero as string)
  const veu = livroData.veus[numeroVeu - 1]

  // Carregar progresso dos capitulos (Supabase + localStorage fallback)
  const [capitulosCompletos, setCapitulosCompletos] = useState<Set<number>>(new Set())
  const [progressLoaded, setProgressLoaded] = useState(false)

  useEffect(() => {
    if (!veu) return

    // 1. Carregar de localStorage primeiro (rapido)
    const localSet = new Set<number>()
    for (const cap of veu.capitulos) {
      const key = `reader-complete-v${numeroVeu}-c${cap.numero}`
      if (typeof window !== 'undefined' && localStorage.getItem(key) === 'true') {
        localSet.add(cap.numero)
      }
    }
    if (localSet.size > 0) setCapitulosCompletos(localSet)

    // 2. Carregar de Supabase (cross-device)
    const loadFromSupabase = async () => {
      try {
        const session = await supabase.auth.getSession()
        const userId = session.data.session?.user?.id
        if (!userId) { setProgressLoaded(true); return }

        const slugs = veu.capitulos.map(c => `livro-veu-${numeroVeu}-cap-${c.numero}`)
        const { data } = await supabase
          .from('reading_progress')
          .select('chapter_slug, completed')
          .eq('user_id', userId)
          .in('chapter_slug', slugs)

        if (data) {
          const supaSet = new Set(localSet)
          for (const row of data) {
            if (row.completed) {
              const match = row.chapter_slug.match(/cap-(\d+)$/)
              if (match) {
                const capNum = parseInt(match[1])
                supaSet.add(capNum)
                // Sync to localStorage
                localStorage.setItem(`reader-complete-v${numeroVeu}-c${capNum}`, 'true')
              }
            }
          }
          setCapitulosCompletos(supaSet)
        }
      } catch {
        // Usar localStorage como fallback
      }
      setProgressLoaded(true)
    }
    loadFromSupabase()
  }, [user, veu, numeroVeu])

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
    return <div>Véu não encontrado</div>
  }

  // Cores por véu — alinhadas com a mandala (progressao chakra)
  const coresVeu = [
    { bg: 'from-red-50 to-stone-100', text: 'text-red-950', accent: 'text-red-800' },
    { bg: 'from-orange-50 to-stone-100', text: 'text-orange-950', accent: 'text-orange-800' },
    { bg: 'from-amber-50 to-stone-100', text: 'text-amber-950', accent: 'text-amber-800' },
    { bg: 'from-green-50 to-stone-100', text: 'text-green-950', accent: 'text-green-800' },
    { bg: 'from-sky-50 to-stone-100', text: 'text-sky-950', accent: 'text-sky-800' },
    { bg: 'from-indigo-50 to-stone-100', text: 'text-indigo-950', accent: 'text-indigo-800' },
    { bg: 'from-purple-50 to-stone-100', text: 'text-purple-950', accent: 'text-purple-800' }
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

        {/* Lista de capitulos com progresso */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.5 }}
          className="w-full max-w-md mb-12"
        >
          <p className={`text-sm ${cores.accent} mb-4 text-center`}>
            {veu.capitulos.length} capitulos
            {capitulosCompletos.size > 0 && (
              <span className="ml-2 text-stone-500">
                ({capitulosCompletos.size} de {veu.capitulos.length} completos)
              </span>
            )}
          </p>
          <div className="space-y-2">
            {veu.capitulos.map((cap) => {
              const completo = capitulosCompletos.has(cap.numero)
              return (
                <Link
                  key={cap.numero}
                  href={`/livro/veu/${numeroVeu}/capitulo/${cap.numero}`}
                >
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    completo
                      ? 'bg-stone-200/50 hover:bg-stone-200'
                      : 'bg-white/60 hover:bg-white'
                  }`}>
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                      completo
                        ? 'bg-stone-700 text-white'
                        : 'border-2 border-stone-300 text-stone-400'
                    }`}>
                      {completo ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      ) : cap.numero}
                    </span>
                    <span className={`text-sm ${completo ? 'text-stone-500' : 'text-stone-700'}`}>
                      {cap.titulo}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* Botao Comecar / Continuar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 8 }}
        >
          {(() => {
            // Encontrar primeiro capitulo nao completo
            const proximoCap = veu.capitulos.find(c => !capitulosCompletos.has(c.numero))
            const capLink = proximoCap
              ? `/livro/veu/${numeroVeu}/capitulo/${proximoCap.numero}`
              : `/livro/veu/${numeroVeu}/capitulo/${veu.capitulos[0].numero}`
            const label = capitulosCompletos.size === 0
              ? 'Comecar a Travessia'
              : capitulosCompletos.size >= veu.capitulos.length
                ? 'Reler a Travessia'
                : `Continuar — Cap. ${proximoCap?.numero}`
            return (
              <Link href={capLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-12 py-4 bg-gradient-to-r ${cores.bg.replace('from-', 'from-').replace('to-', 'to-')} border-2 border-stone-400 ${cores.text} rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all`}
                >
                  {label}
                </motion.button>
              </Link>
            )
          })()}
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
