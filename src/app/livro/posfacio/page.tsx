'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useAccess } from '@/hooks/useAccess'
import livroData from '@/data/livro-7-veus.json'

type Section = 'carta' | 'referencias'

export default function PosfacioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    }>
      <PosfacioContent />
    </Suspense>
  )
}

function PosfacioContent() {
  const { user, loading } = useAuth()
  const { hasBookAccess, isLoading: accessLoading } = useAccess()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSection = searchParams.get('s') === 'referencias' ? 'referencias' : 'carta'
  const [seccaoAtiva, setSeccaoAtiva] = useState<Section>(initialSection as Section)

  useEffect(() => {
    if (!loading && !user) router.push('/entrar')
  }, [user, loading, router])

  useEffect(() => {
    if (!loading && !accessLoading && user && !hasBookAccess) router.push('/comprar')
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

  const seccoes: { key: Section; titulo: string }[] = [
    { key: 'carta', titulo: 'Carta ao Leitor' },
    { key: 'referencias', titulo: 'Fontes Inspiradoras' },
  ]

  const cartaRaw = (livroData as Record<string, unknown>).carta_ao_leitor as string || ''
  const referenciasRaw = (livroData as Record<string, unknown>).referencias as string || ''

  // Parse Carta ao Leitor — poetic format with *...* italic stanzas and \ line breaks
  const renderCarta = () => {
    // Split into stanzas/blocks by \n that separates *...* blocks
    const blocos = cartaRaw.split(/\n(?=\*|[A-Z])/).filter(b => b.trim().length > 0)

    return blocos.map((bloco, bi) => {
      const trimmed = bloco.trim()

      // Italic stanza: starts with * and ends with *
      if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
        const inner = trimmed.slice(1, -1)
        // Split on \<newline> for poetic line breaks
        const versos = inner.split(/\\\n/).map(v => v.trim()).filter(v => v.length > 0)
        return (
          <motion.div
            key={bi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: bi * 0.1 }}
            className="mb-8"
          >
            {versos.map((verso, vi) => (
              <p
                key={vi}
                className="text-lg md:text-xl leading-relaxed font-serif italic text-stone-700"
              >
                {verso}
              </p>
            ))}
          </motion.div>
        )
      }

      // Regular text (closing lines)
      const linhas = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0)
      return (
        <motion.div
          key={bi}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: bi * 0.1 }}
          className="mb-6"
        >
          {linhas.map((linha, li) => (
            <p
              key={li}
              className="text-lg md:text-xl leading-relaxed font-serif text-stone-800"
            >
              {linha}
            </p>
          ))}
        </motion.div>
      )
    })
  }

  // Parse Ecos e Fontes Inspiradoras
  const renderReferencias = () => {
    const linhas = referenciasRaw.split('\n')
    const intro: string[] = []
    const fontes: string[] = []
    const closing: string[] = []

    let section: 'intro' | 'fontes' | 'closing' = 'intro'

    for (const linha of linhas) {
      const trimmed = linha.trim()
      if (!trimmed) continue

      if (trimmed.startsWith('- ')) {
        section = 'fontes'
        fontes.push(trimmed.slice(2))
      } else if (section === 'fontes') {
        section = 'closing'
        closing.push(trimmed)
      } else if (section === 'closing') {
        closing.push(trimmed)
      } else {
        intro.push(trimmed)
      }
    }

    return (
      <div>
        {/* Intro paragraph */}
        {intro.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg leading-relaxed font-serif text-stone-800 mb-10"
          >
            {intro.join(' ')}
          </motion.p>
        )}

        {/* Source list */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10 space-y-2"
        >
          {fontes.map((fonte, i) => {
            // Separate author from title (split at first comma + space)
            const commaIdx = fonte.indexOf(', ')
            const autor = commaIdx > 0 ? fonte.slice(0, commaIdx) : fonte
            const obra = commaIdx > 0 ? fonte.slice(commaIdx + 2) : ''

            return (
              <div
                key={i}
                className="flex gap-3 py-1.5 border-b border-stone-100 last:border-0"
              >
                <span className="text-stone-400 mt-0.5 shrink-0">&#8212;</span>
                <p className="text-base font-serif text-stone-700">
                  <span className="font-medium text-stone-800">{autor}</span>
                  {obra && <>, <em className="text-stone-600">{obra}</em></>}
                </p>
              </div>
            )
          })}
        </motion.div>

        {/* Closing paragraph */}
        {closing.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg leading-relaxed font-serif text-stone-700 italic"
          >
            {closing.join(' ')}
          </motion.p>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-sm bg-white/50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/livro"
            className="text-sm text-stone-600 hover:underline"
          >
            &larr; Mandala
          </Link>

          <div className="flex items-center gap-2">
            {seccoes.map((s) => (
              <button
                key={s.key}
                onClick={() => {
                  setSeccaoAtiva(s.key)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  seccaoAtiva === s.key
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {s.titulo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          key={seccaoAtiva}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section title */}
          <div className="text-center mb-16">
            <p className="text-sm tracking-widest text-stone-500 mb-4 uppercase">
              {livroData.titulo}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
              {seccaoAtiva === 'carta' ? 'Carta ao Leitor' : 'Ecos e Fontes Inspiradoras'}
            </h1>
            {seccaoAtiva === 'carta' && (
              <p className="text-lg text-stone-500 italic">
                {livroData.autora}
              </p>
            )}
          </div>

          {/* Carta ao Leitor */}
          {seccaoAtiva === 'carta' && (
            <div className="max-w-lg mx-auto">
              {renderCarta()}
            </div>
          )}

          {/* Ecos e Fontes Inspiradoras */}
          {seccaoAtiva === 'referencias' && renderReferencias()}
        </motion.div>

        {/* Bottom navigation */}
        <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-center">
          {seccaoAtiva === 'referencias' ? (
            <button
              onClick={() => {
                setSeccaoAtiva('carta')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-sm text-stone-600 hover:underline"
            >
              &larr; Carta ao Leitor
            </button>
          ) : (
            <Link href="/livro/veu/7" className="text-sm text-stone-600 hover:underline">
              &larr; V&eacute;u 7
            </Link>
          )}

          {seccaoAtiva === 'carta' ? (
            <button
              onClick={() => {
                setSeccaoAtiva('referencias')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="px-8 py-3 rounded-full bg-stone-200 text-stone-800 hover:opacity-80 transition-opacity text-sm"
            >
              Fontes Inspiradoras &rarr;
            </button>
          ) : (
            <Link href="/livro">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm shadow-lg"
              >
                Mandala &rarr;
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
