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

  // Corrigir caracteres corrompidos da conversão DOCX (ligaduras fi/fl/qu perdidas)
  const corrigirTexto = (t: string): string => {
    return t
      // "fl" — padrões específicos (antes de "qu" para evitar conflito)
      .replace(/supér\u0000uo/g, 'supérfluo')
      .replace(/\u0000uid/g, 'fluid')
      .replace(/\u0000uir/g, 'fluir')
      .replace(/\u0000ux/g, 'flux')
      .replace(/\u0000l/g, 'fl')
      // "qu" — todas as combinações de vogal
      .replace(/\u0000ue/g, 'que')
      .replace(/\u0000ua/g, 'qua')
      .replace(/\u0000ui/g, 'qui')
      .replace(/\u0000uo/g, 'quo')
      .replace(/\u0000u[éê]/g, (m: string) => 'qu' + m[2])
      .replace(/\u0000u[íì]/g, (m: string) => 'qu' + m[2])
      // "fi" — tudo o resto
      .replace(/\u0000/g, 'fi')
  }

  // Dividir parágrafos longos em pontos de frase naturais
  const dividirParagrafoLongo = (texto: string, maxChars: number): string[] => {
    if (texto.length <= maxChars) return [texto]

    const resultado: string[] = []
    let restante = texto

    while (restante.length > maxChars) {
      const meio = Math.floor(maxChars * 0.75)
      let melhorCorte = -1

      for (let i = Math.min(restante.length - 1, maxChars); i >= meio - 100; i--) {
        if (restante[i] === '.' && restante[i + 1] === ' ') {
          melhorCorte = i + 1
          break
        }
      }

      if (melhorCorte === -1) {
        for (let i = maxChars; i < restante.length; i++) {
          if (restante[i] === '.' && restante[i + 1] === ' ') {
            melhorCorte = i + 1
            break
          }
        }
      }

      if (melhorCorte === -1) {
        resultado.push(restante)
        restante = ''
      } else {
        resultado.push(restante.substring(0, melhorCorte).trim())
        restante = restante.substring(melhorCorte).trim()
      }
    }

    if (restante.length > 0) resultado.push(restante)
    return resultado
  }

  // Preparar dedicatória — poesia: juntar wraps DOCX, separar por frases
  const prepararDedicatoria = (texto: string): string[] => {
    let limpo = corrigirTexto(texto)
    // Remover trailing backslash
    limpo = limpo.replace(/\\+\s*$/, '')
    // Juntar todos os \n (são wraps DOCX a ~70 chars, não versos intencionais)
    const textoInteiro = limpo
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .join(' ')
    // Separar destinatário ("Para Nana") do resto
    const match = textoInteiro.match(/^(Para\s+\S+)\s+(.+)$/)
    if (!match) return [textoInteiro]
    const destinatario = match[1]
    const corpo = match[2]
    // Cada frase completa é um verso (separar em ". " ou final)
    const versos = corpo.split(/(?<=\.)\s+/).filter(v => v.trim().length > 0)
    return [destinatario, ...versos]
  }

  // Preparar nota de abertura e introdução — parágrafos com respiro
  type TextoItem = { texto: string; tipo: 'paragrafo' | 'subtitulo' }

  const prepararTextoLongo = (texto: string): TextoItem[] => {
    let limpo = corrigirTexto(texto)

    // Remover prefixos de título embutidos (capitulares decorativas do DOCX)
    limpo = limpo
      .replace(/^([A-Z])Nota de Abertura\n/i, (_m, cap) => cap)
      .replace(/^([A-Z])Introdução\n/i, (_m, cap) => cap)

    // Corrigir capitulares duplicadas (ex: "OO Processo..." → "O Processo...")
    limpo = limpo.replace(/^([A-Z])\1/gm, '$1')

    // Separar por dupla quebra de linha
    const blocos = limpo.split('\n\n').filter(b => b.trim().length > 0)

    const resultado: TextoItem[] = []

    for (const bloco of blocos) {
      const linhas = bloco.split('\n')
      const primeiraLinha = linhas[0].trim()
      const resto = linhas.slice(1).join(' ').trim()

      // Subtítulo: bloco curto sozinho (ex: "O Processo de Dissolução") OU
      // linha curta seguida de corpo de texto
      const ehLinhaSubtitulo = primeiraLinha.length < 60
        && primeiraLinha.length > 3
        && !primeiraLinha.endsWith('.')
        && !primeiraLinha.endsWith('?')
        && !primeiraLinha.endsWith('"')
        && /^[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(primeiraLinha)

      const ehSubtituloComTexto = ehLinhaSubtitulo && resto.length > 0
      const ehSubtituloSozinho = ehLinhaSubtitulo && resto.length === 0 && linhas.length === 1

      if (ehSubtituloComTexto || ehSubtituloSozinho) {
        resultado.push({ texto: primeiraLinha, tipo: 'subtitulo' })
        if (resto.length > 0) {
          const textoLimpo = resto.replace(/\s{2,}/g, ' ').trim()
          for (const parte of dividirParagrafoLongo(textoLimpo, 450)) {
            resultado.push({ texto: parte, tipo: 'paragrafo' })
          }
        }
      } else {
        // Juntar linhas do bloco (wraps DOCX)
        const textoLimpo = bloco
          .split('\n')
          .map(l => l.trim())
          .filter(l => l.length > 0)
          .join(' ')
          .replace(/\s{2,}/g, ' ')
          .trim()

        if (textoLimpo.length > 0) {
          for (const parte of dividirParagrafoLongo(textoLimpo, 450)) {
            resultado.push({ texto: parte, tipo: 'paragrafo' })
          }
        }
      }
    }

    return resultado
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

          {/* Dedicatória — formato poesia, linha a linha */}
          {seccaoAtiva === 'dedicatoria' && (
            <div className="space-y-3 max-w-lg mx-auto">
              {prepararDedicatoria(livroData.dedicatoria).map((linha, index) => {
                // Primeira linha (destinatário) — destaque
                const ehDestinatario = index === 0 && linha.startsWith('Para ')
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`text-lg leading-relaxed font-serif text-center italic ${
                      ehDestinatario
                        ? 'text-stone-800 font-medium text-xl mb-6'
                        : 'text-stone-600'
                    }`}
                  >
                    {linha}
                  </motion.p>
                )
              })}
            </div>
          )}

          {/* Nota de Abertura — parágrafos com respiro */}
          {seccaoAtiva === 'nota_abertura' && (
            <div className="space-y-6">
              {prepararTextoLongo(livroData.nota_abertura).map((item, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  className="text-lg leading-relaxed font-serif text-stone-800"
                >
                  {item.texto}
                </motion.p>
              ))}
            </div>
          )}

          {/* Introdução — parágrafos com respiro, secção dos véus, subtítulos visíveis */}
          {seccaoAtiva === 'introducao' && (() => {
            const itens = prepararTextoLongo(livroData.introducao)
            // Encontrar onde inserir a secção dos 7 véus (antes de "O Processo de Dissolução")
            const idxProcesso = itens.findIndex(
              i => i.tipo === 'subtitulo' && i.texto.includes('Processo')
            )
            const antes = idxProcesso >= 0 ? itens.slice(0, idxProcesso) : itens
            const depois = idxProcesso >= 0 ? itens.slice(idxProcesso) : []

            const coresVeu = [
              'text-red-700 border-red-200 bg-red-50/50',
              'text-orange-700 border-orange-200 bg-orange-50/50',
              'text-amber-700 border-amber-200 bg-amber-50/50',
              'text-green-700 border-green-200 bg-green-50/50',
              'text-sky-700 border-sky-200 bg-sky-50/50',
              'text-indigo-700 border-indigo-200 bg-indigo-50/50',
              'text-purple-700 border-purple-200 bg-purple-50/50',
            ]

            return (
              <div className="space-y-6">
                {/* Texto antes dos véus */}
                {antes.map((item, index) => (
                  <motion.div
                    key={`a-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.5) }}
                  >
                    {item.tipo === 'subtitulo' ? (
                      <h2 className="mt-12 mb-4 text-2xl md:text-3xl font-serif font-semibold text-stone-900">
                        {item.texto}
                      </h2>
                    ) : (
                      <p className="text-lg leading-relaxed font-serif text-stone-800">
                        {item.texto}
                      </p>
                    )}
                  </motion.div>
                ))}

                {/* Os 7 Véus do Despertar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-16 mb-16"
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-900 text-center mb-12">
                    Os 7 Véus do Despertar
                  </h2>
                  <div className="space-y-6">
                    {livroData.veus.map((veu, vi) => (
                      <motion.div
                        key={veu.numero}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + vi * 0.08 }}
                        className={`border-l-2 pl-6 py-4 rounded-r-lg ${coresVeu[vi]}`}
                      >
                        <h3 className="text-lg font-serif font-semibold mb-2">
                          {veu.numero}. {veu.nome}
                        </h3>
                        <p className="text-sm font-serif italic text-stone-600 mb-3">
                          {veu.citacao}
                        </p>
                        <div className="flex flex-col gap-1 text-sm text-stone-700">
                          <p><span className="font-medium">Encobre:</span> {veu.encobre}</p>
                          <p><span className="font-medium">Revela:</span> {veu.revela}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Texto depois (O Processo de Dissolução...) */}
                {depois.map((item, index) => (
                  <motion.div
                    key={`d-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(0.6 + index * 0.03, 1.2) }}
                  >
                    {item.tipo === 'subtitulo' ? (
                      <h2 className="mt-12 mb-4 text-2xl md:text-3xl font-serif font-semibold text-stone-900">
                        {item.texto}
                      </h2>
                    ) : (
                      <p className="text-lg leading-relaxed font-serif text-stone-800">
                        {item.texto}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )
          })()}
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
