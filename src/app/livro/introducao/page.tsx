'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useAccess } from '@/hooks/useAccess'
import livroData from '@/data/livro-7-veus.json'

type Section = 'dedicatoria' | 'nota_abertura' | 'introducao'

export default function IntroducaoPage() {
  const { user, loading } = useAuth()
  const { hasBookAccess, isLoading: accessLoading } = useAccess()
  const router = useRouter()
  const [seccaoAtiva, setSeccaoAtiva] = useState<Section>('dedicatoria')

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

  const seccoes: { key: Section; titulo: string }[] = [
    { key: 'dedicatoria', titulo: 'Dedicatória' },
    { key: 'nota_abertura', titulo: 'Nota de Abertura' },
    { key: 'introducao', titulo: 'Introdução' },
  ]

  const proximaSeccao = (): Section | null => {
    const idx = seccoes.findIndex(s => s.key === seccaoAtiva)
    return idx < seccoes.length - 1 ? seccoes[idx + 1].key : null
  }

  const seccaoAnterior = (): Section | null => {
    const idx = seccoes.findIndex(s => s.key === seccaoAtiva)
    return idx > 0 ? seccoes[idx - 1].key : null
  }

  // Corrigir caracteres corrompidos da conversão DOCX (ligaduras fi/fl/q perdidas)
  const corrigirTexto = (t: string): string => {
    return t
      .replace(/\u0000ue/g, 'que')
      .replace(/\u0000ua/g, 'qua')
      .replace(/\u0000uil/g, 'quil')
      .replace(/\u0000uin/g, 'quin')
      .replace(/\u0000uit/g, 'quit')
      .replace(/\u0000uid/g, 'fluid')
      .replace(/\u0000uir/g, 'fluir')
      .replace(/\u0000ux/g, 'flux')
      .replace(/\u0000l/g, 'fl')
      .replace(/\u0000/g, 'fi')
  }

  // Limpar texto: corrigir caracteres e remover prefixos de título do raw text
  const limparTexto = (texto: string): string[] => {
    let limpo = corrigirTexto(texto)

    // Remover prefixos de título embutidos no texto (capitulares decorativas do DOCX)
    // Ex: "ENota de Abertura\nste livro..." → "Este livro..."
    // Ex: "VIntrodução\nivemos..." → "Vivemos..."
    limpo = limpo
      .replace(/^[A-Z]?Nota de Abertura\n/i, '')
      .replace(/^[A-Z]?Introdução\n/i, '')
      // Corrigir capitulares partidas (E+ste, V+ivemos, O+despertar)
      .replace(/^([A-Z])([A-Z])/gm, (_match, _cap, rest) => rest)

    // Corrigir subtítulos embutidos (ex: "OO Processo..." → "O Processo...")
    limpo = limpo.replace(/^([A-Z])\1/gm, '$1')

    return limpo
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0)
  }

  const textoAtual = (): string[] => {
    switch (seccaoAtiva) {
      case 'dedicatoria':
        return limparTexto(livroData.dedicatoria)
      case 'nota_abertura':
        return limparTexto(livroData.nota_abertura)
      case 'introducao':
        return limparTexto(livroData.introducao)
    }
  }

  const tituloAtual = seccoes.find(s => s.key === seccaoAtiva)?.titulo ?? ''

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

          {/* Navegação entre secções */}
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

      {/* Conteúdo */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          key={seccaoAtiva}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Título da secção */}
          <div className="text-center mb-16">
            <p className="text-sm tracking-widest text-stone-500 mb-4 uppercase">
              {livroData.titulo}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
              {tituloAtual}
            </h1>
            {seccaoAtiva === 'dedicatoria' && (
              <p className="text-lg text-stone-500 italic">
                {livroData.autora}
              </p>
            )}
          </div>

          {/* Texto */}
          <div className="space-y-6">
            {textoAtual().map((paragrafo, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`text-lg leading-relaxed font-serif ${
                  seccaoAtiva === 'dedicatoria'
                    ? 'text-stone-700 text-center italic'
                    : 'text-stone-800'
                }`}
              >
                {paragrafo}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Navegação inferior */}
        <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-center">
          {seccaoAnterior() ? (
            <button
              onClick={() => {
                const prev = seccaoAnterior()
                if (prev) {
                  setSeccaoAtiva(prev)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="text-sm text-stone-600 hover:underline"
            >
              &larr; {seccoes.find(s => s.key === seccaoAnterior())?.titulo}
            </button>
          ) : (
            <Link href="/livro" className="text-sm text-stone-600 hover:underline">
              &larr; Mandala
            </Link>
          )}

          {proximaSeccao() ? (
            <button
              onClick={() => {
                const next = proximaSeccao()
                if (next) {
                  setSeccaoAtiva(next)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="px-8 py-3 rounded-full bg-stone-200 text-stone-800 hover:opacity-80 transition-opacity text-sm"
            >
              {seccoes.find(s => s.key === proximaSeccao())?.titulo} &rarr;
            </button>
          ) : (
            <Link href="/livro/veu/1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm shadow-lg"
              >
                Iniciar Travessia &rarr;
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
