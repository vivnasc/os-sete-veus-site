'use client'

import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useAccess } from '@/hooks/useAccess'
import { useNivelLeitura } from '@/hooks/useNivelLeitura'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { supabase } from '@/lib/supabase'
import livroData from '@/data/livro-7-veus.json'
import { glossario } from '@/data/livro-niveis/glossario'
import { veu1Niveis } from '@/data/livro-niveis/veu-1'
import { veu2Niveis } from '@/data/livro-niveis/veu-2'
import { veu3Niveis } from '@/data/livro-niveis/veu-3'
import { veu4Niveis } from '@/data/livro-niveis/veu-4'
import { veu5Niveis } from '@/data/livro-niveis/veu-5'
import { veu6Niveis } from '@/data/livro-niveis/veu-6'
import { veu7Niveis } from '@/data/livro-niveis/veu-7'
import type { NivelCapitulo } from '@/data/livro-niveis/types'
import ReflexoesDrawer from '@/components/ReflexoesDrawer'
import NivelSelector from '@/components/livro/NivelSelector'
import ResumoAcessivel from '@/components/livro/ResumoAcessivel'
import PerguntasOrientadoras from '@/components/livro/PerguntasOrientadoras'
import NotaContextual from '@/components/livro/NotaContextual'
import GlossarioTooltip from '@/components/livro/GlossarioTooltip'
import ExemplosConcretos from '@/components/livro/ExemplosConcretos'
import CrencasAMapear from '@/components/livro/CrencasAMapear'
import SinaisDoVeu from '@/components/livro/SinaisDoVeu'
import EspelhoPessoal from '@/components/livro/EspelhoPessoal'
import MascarasDoVeu from '@/components/livro/MascarasDoVeu'
import VeuDominante from '@/components/livro/VeuDominante'
import MensagemCentral from '@/components/livro/MensagemCentral'
import GuiaoEscrita from '@/components/livro/GuiaoEscrita'
import AudioPlayer from '@/components/livro/AudioPlayer'

// Companion data per veu
const niveisData: Record<number, NivelCapitulo[]> = {
  1: veu1Niveis,
  2: veu2Niveis,
  3: veu3Niveis,
  4: veu4Niveis,
  5: veu5Niveis,
  6: veu6Niveis,
  7: veu7Niveis,
}

// Glossary term replacement for Semente and Raiz levels
function aplicarGlossario(
  texto: string,
  termosCapitulo: string[],
  modoNoturno: boolean
): React.ReactNode {
  if (termosCapitulo.length === 0) return texto

  // Build set of glossary entries for this chapter
  const entradas = termosCapitulo
    .map(t => glossario.find(g => g.termo.toLowerCase() === t.toLowerCase()))
    .filter(Boolean) as typeof glossario

  if (entradas.length === 0) return texto

  // Sort by length descending to match longer terms first
  const sorted = [...entradas].sort((a, b) => b.termo.length - a.termo.length)

  // Build regex with word boundaries
  const pattern = new RegExp(
    `\\b(${sorted.map(e => e.termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
    'gi'
  )

  const parts = texto.split(pattern)
  if (parts.length === 1) return texto

  return parts.map((part, i) => {
    const entry = sorted.find(e => e.termo.toLowerCase() === part.toLowerCase())
    if (entry) {
      return (
        <GlossarioTooltip key={i} entry={entry} modoNoturno={modoNoturno}>
          {part}
        </GlossarioTooltip>
      )
    }
    return part
  })
}

// Corrigir caracteres corrompidos da conversão DOCX (ligaduras fi/fl/qu perdidas)
function corrigirTexto(texto: string): string {
  return texto
    // "fl" — padrões específicos (antes de "qu" para evitar conflito com \x00uo)
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
    .replace(/\u0000u[éê]/g, (m) => 'qu' + m[2])
    .replace(/\u0000u[íì]/g, (m) => 'qu' + m[2])
    // "fi" — tudo o resto (fixo, fissura, final, firme, ficou, etc.)
    .replace(/\u0000/g, 'fi')
}

// Dividir parágrafos longos em pontos de frase naturais
function dividirParagrafoLongo(texto: string, maxChars: number): string[] {
  if (texto.length <= maxChars) return [texto]

  const resultado: string[] = []
  let restante = texto

  while (restante.length > maxChars) {
    // Procurar ponto final + espaço perto do meio
    const meio = Math.floor(maxChars * 0.75)
    let melhorCorte = -1

    // Procurar de trás para frente a partir do maxChars
    for (let i = Math.min(restante.length - 1, maxChars); i >= meio - 100; i--) {
      if (restante[i] === '.' && restante[i + 1] === ' ') {
        melhorCorte = i + 1
        break
      }
    }

    if (melhorCorte === -1) {
      // Se não encontrar ponto, procurar para a frente
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

// Renderizar texto com *italico* e glossário
function renderTextoComFormato(
  texto: string,
  termosCapitulo: string[],
  modoNoturno: boolean,
  comGlossario: boolean
): React.ReactNode {
  // Split on *word* patterns
  const parts = texto.split(/(\*[^*]+\*)/)

  if (parts.length === 1) {
    return comGlossario
      ? aplicarGlossario(texto, termosCapitulo, modoNoturno)
      : texto
  }

  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    if (comGlossario) {
      return <React.Fragment key={i}>{aplicarGlossario(part, termosCapitulo, modoNoturno)}</React.Fragment>
    }
    return part
  })
}

export default function CapituloPage() {
  const { user, loading } = useAuth()
  const { hasBookAccess, isLoading: accessLoading } = useAccess()
  const router = useRouter()
  const params = useParams()
  const numeroVeu = parseInt(params.numero as string)
  const numeroCapitulo = parseInt(params.capitulo as string)

  const veu = livroData.veus[numeroVeu - 1]
  const capitulo = veu?.capitulos.find(c => c.numero === numeroCapitulo)

  // Companion data for the current chapter (if available)
  const nivelCapitulo = niveisData[numeroVeu]?.find(n => n.capitulo_numero === numeroCapitulo) ?? null

  const { nivel, setNivel } = useNivelLeitura()
  const [modoNoturno, setModoNoturno] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('reader-night-mode') === 'true'
    }
    return false
  })
  const endOfTextRef = useRef<HTMLDivElement>(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const [showCapitulos, setShowCapitulos] = useState(false)
  const [showCompanion, setShowCompanion] = useState(false)
  const completionKey = `reader-complete-v${numeroVeu}-c${numeroCapitulo}`
  const progressSlug = `livro-veu-${numeroVeu}-cap-${numeroCapitulo}`
  const [capituloCompleto, setCapituloCompleto] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(completionKey) === 'true'
    }
    return false
  })

  // Load completion status from Supabase (cross-device sync)
  useEffect(() => {
    if (!user || capituloCompleto) return
    const loadProgress = async () => {
      try {
        const session = await supabase.auth.getSession()
        const userId = session.data.session?.user?.id
        if (!userId) return

        const { data } = await supabase
          .from('reading_progress')
          .select('completed')
          .eq('user_id', userId)
          .eq('chapter_slug', progressSlug)
          .single()

        if (data?.completed) {
          setCapituloCompleto(true)
          localStorage.setItem(completionKey, 'true')
        }
      } catch {
        // Falha na ligacao — usar localStorage como fallback
      }
    }
    loadProgress()
  }, [user, progressSlug, completionKey, capituloCompleto])

  // Dividir conteúdo em parágrafos limpos
  const paragrafos = useMemo(() => {
    if (!capitulo) return [] as { texto: string; tipo: 'paragrafo' | 'subtitulo' }[]

    let texto = capitulo.conteudo

    // 1. Corrigir caracteres corrompidos (ligaduras fi/fl/q perdidas na conversão DOCX)
    texto = corrigirTexto(texto)

    // 2. Remover título do capítulo duplicado no início
    //    Ex: "Capítulo 1 — Quando o Eu Começa a\nVacilar\n"
    texto = texto.replace(/^Capítulo\s+\d+\s*[—–-]\s*[^\n]*(?:\n[^\n]{1,60})?\n/, '')

    // 3. Capitalizar a primeira letra (pode ficar minúscula se a capitular decorativa DOCX foi consumida pelo título)
    texto = texto.replace(/^\s*([a-záàâãéèêíïóôõöúçñ])/, (_m, c) => c.toUpperCase())

    // 4. Separar por parágrafo (dupla quebra de linha)
    const blocos = texto.split('\n\n').filter(b => b.trim().length > 0)

    const resultado: { texto: string; tipo: 'paragrafo' | 'subtitulo' }[] = []

    for (const bloco of blocos) {
      // Detectar subtítulos de secção: linha curta no início seguida de corpo
      const linhas = bloco.split('\n')
      const primeiraLinha = linhas[0].trim()
      const resto = linhas.slice(1).join(' ').trim()

      // É subtítulo se: linha curta (<60 chars), sem ponto final, e seguida de texto
      const ehSubtitulo = primeiraLinha.length < 60
        && !primeiraLinha.endsWith('.')
        && !primeiraLinha.endsWith('?')
        && !primeiraLinha.endsWith('"')
        && resto.length > 0
        && /^[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(primeiraLinha)

      if (ehSubtitulo) {
        resultado.push({ texto: primeiraLinha, tipo: 'subtitulo' })
        const textoLimpo = resto.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim()
        if (textoLimpo.length > 0) {
          // Dividir se muito longo (>600 chars)
          for (const parte of dividirParagrafoLongo(textoLimpo, 600)) {
            resultado.push({ texto: parte, tipo: 'paragrafo' })
          }
        }
      } else {
        // Juntar \n como espaços
        const textoLimpo = bloco.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim()
        if (textoLimpo.length > 0) {
          for (const parte of dividirParagrafoLongo(textoLimpo, 600)) {
            resultado.push({ texto: parte, tipo: 'paragrafo' })
          }
        }
      }
    }

    return resultado
  }, [capitulo])

  // TTS: extract plain text from paragraphs
  const textosParaTTS = useMemo(() => paragrafos.map(p => p.texto), [paragrafos])
  const tts = useSpeechSynthesis(textosParaTTS)

  // Mark chapter complete when reaching the end
  const marcarCompleto = useCallback(async () => {
    if (capituloCompleto) return
    setCapituloCompleto(true)
    localStorage.setItem(completionKey, 'true')

    // Sync to Supabase for cross-device persistence
    try {
      const session = await supabase.auth.getSession()
      const userId = session.data.session?.user?.id
      if (!userId) return

      await supabase.from('reading_progress').upsert(
        {
          user_id: userId,
          chapter_slug: progressSlug,
          completed: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,chapter_slug' }
      )
    } catch {
      // Falha na ligacao — localStorage ja guardou localmente
    }
  }, [capituloCompleto, completionKey, progressSlug])

  // Mark complete when scrolling to end of text
  useEffect(() => {
    if (!endOfTextRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) marcarCompleto() },
      { threshold: 0.5 }
    )
    observer.observe(endOfTextRef.current)
    return () => observer.disconnect()
  }, [marcarCompleto])

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('reader-night-mode', String(modoNoturno))
  }, [modoNoturno])

  // Cores por véu — tons visivelmente distintos (nao usar -950, sao todos preto)
  const coresVeu = [
    { bg: 'bg-red-50', bgDark: 'bg-red-950', text: 'text-red-800', textDark: 'text-red-300' },
    { bg: 'bg-orange-50', bgDark: 'bg-orange-950', text: 'text-orange-700', textDark: 'text-orange-300' },
    { bg: 'bg-amber-50', bgDark: 'bg-amber-950', text: 'text-amber-700', textDark: 'text-amber-300' },
    { bg: 'bg-green-50', bgDark: 'bg-green-950', text: 'text-green-700', textDark: 'text-green-300' },
    { bg: 'bg-sky-50', bgDark: 'bg-sky-950', text: 'text-sky-700', textDark: 'text-sky-300' },
    { bg: 'bg-indigo-50', bgDark: 'bg-indigo-950', text: 'text-indigo-700', textDark: 'text-indigo-300' },
    { bg: 'bg-purple-50', bgDark: 'bg-purple-950', text: 'text-purple-700', textDark: 'text-purple-300' }
  ]

  const cores = coresVeu[numeroVeu - 1]

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

  if (!veu || !capitulo) {
    return <div>Capítulo não encontrado</div>
  }

  // Capitulo anterior
  const capituloAnterior = () => {
    const indexCapAtual = veu.capitulos.findIndex(c => c.numero === numeroCapitulo)
    if (indexCapAtual > 0) {
      return `/livro/veu/${numeroVeu}/capitulo/${veu.capitulos[indexCapAtual - 1].numero}`
    }
    return null
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
    <div className={`min-h-screen ${modoNoturno ? 'bg-stone-950' : 'bg-stone-50'} transition-colors duration-500 ${showPlayer ? 'pb-20' : ''}`}>
      {/* Header com controles */}
      <div className={`sticky top-0 z-40 backdrop-blur-sm border-b ${modoNoturno ? 'bg-stone-950/80 border-stone-800' : 'bg-white/80 border-stone-200'}`}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-2 md:py-3">
          {/* Linha 1: navegacao + titulo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Link
                href={`/livro/veu/${numeroVeu}`}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs md:text-sm shrink-0 transition-colors ${
                  modoNoturno
                    ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                <span className="hidden md:inline">Véu {numeroVeu}</span>
              </Link>
              {/* Chapter selector dropdown */}
              <div className="relative min-w-0">
                <button
                  onClick={() => setShowCapitulos(!showCapitulos)}
                  className={`text-xs md:text-sm hover:underline flex items-center gap-1 truncate ${modoNoturno ? 'text-stone-400' : 'text-stone-600'}`}
                >
                  <span className="truncate">Cap. {numeroCapitulo}: {capitulo.titulo}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 transition-transform ${showCapitulos ? 'rotate-180' : ''}`}>
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
                <AnimatePresence>
                  {showCapitulos && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full mt-1 left-0 min-w-[240px] rounded-xl border shadow-lg z-50 ${
                        modoNoturno
                          ? 'bg-stone-900 border-stone-700'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="p-1.5">
                        {veu.capitulos.map((cap) => (
                          <Link
                            key={cap.numero}
                            href={`/livro/veu/${numeroVeu}/capitulo/${cap.numero}`}
                            scroll={true}
                            onClick={() => { setShowCapitulos(false); window.scrollTo(0, 0) }}
                          >
                            <div className={`text-xs px-3 py-2 rounded-lg transition-colors ${
                              cap.numero === numeroCapitulo
                                ? modoNoturno
                                  ? 'bg-stone-800 text-stone-200'
                                  : 'bg-stone-100 text-stone-900'
                                : modoNoturno
                                  ? 'text-stone-400 hover:bg-stone-800'
                                  : 'text-stone-600 hover:bg-stone-50'
                            }`}>
                              Cap. {cap.numero}: {cap.titulo}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop: controles */}
            <div className="hidden md:flex items-center gap-3">
              <NivelSelector nivel={nivel} onSelect={setNivel} modoNoturno={modoNoturno} />
              <button
                onClick={() => setModoNoturno(!modoNoturno)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${modoNoturno ? 'border-stone-600 hover:bg-stone-800' : 'border-stone-300 hover:bg-stone-100'}`}
              >
                {modoNoturno ? 'Dia' : 'Noite'}
              </button>
              {tts.isSupported && (
                <button
                  onClick={() => {
                    if (showPlayer) { tts.stop(); setShowPlayer(false) }
                    else { setShowPlayer(true); tts.play() }
                  }}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    showPlayer
                      ? modoNoturno ? 'border-purple-500/50 bg-purple-900/30 text-purple-300' : 'border-purple-400 bg-purple-50 text-purple-700'
                      : modoNoturno ? 'border-stone-600 hover:bg-stone-800' : 'border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {showPlayer ? 'A ouvir' : 'Ouvir'}
                </button>
              )}
            </div>
          </div>

          {/* Linha 2 (mobile only): controles como icones */}
          <div className="flex md:hidden items-center justify-between mt-1.5 pt-1.5 border-t border-stone-200/50 dark:border-stone-700/50">
            <NivelSelector nivel={nivel} onSelect={setNivel} modoNoturno={modoNoturno} />
            <div className="flex items-center gap-1">
              {/* Modo noturno icon */}
              <button
                onClick={() => setModoNoturno(!modoNoturno)}
                className={`p-2 rounded-full transition-colors ${modoNoturno ? 'text-stone-400 hover:bg-stone-800' : 'text-stone-500 hover:bg-stone-100'}`}
                title={modoNoturno ? 'Modo Dia' : 'Modo Noite'}
              >
                {modoNoturno ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
              {/* TTS icon */}
              {tts.isSupported && (
                <button
                  onClick={() => {
                    if (showPlayer) { tts.stop(); setShowPlayer(false) }
                    else { setShowPlayer(true); tts.play() }
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    showPlayer
                      ? modoNoturno ? 'text-purple-300 bg-purple-900/30' : 'text-purple-700 bg-purple-50'
                      : modoNoturno ? 'text-stone-400 hover:bg-stone-800' : 'text-stone-500 hover:bg-stone-100'
                  }`}
                  title={showPlayer ? 'Parar audio' : 'Ouvir'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />{showPlayer && <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />}
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

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
          <h1 className={`text-3xl md:text-5xl font-serif mb-4 ${modoNoturno ? cores.textDark : cores.text}`}>
            {capitulo.titulo}
          </h1>
        </motion.div>

        {/* Conteudo complementar (Semente / Raiz) — collapsible */}
        {nivel !== 'arvore' && nivelCapitulo && (
          <div className="mb-10">
            <button
              onClick={() => setShowCompanion(!showCompanion)}
              className={`w-full flex items-center justify-between px-5 py-3 rounded-xl transition-colors ${
                modoNoturno
                  ? 'bg-stone-800/40 hover:bg-stone-800/60 text-stone-400'
                  : 'bg-stone-100/60 hover:bg-stone-100 text-stone-500'
              }`}
            >
              <span className="text-sm font-sans tracking-wide">
                {nivel === 'semente' ? 'Guia de leitura' : 'Notas e aprofundamento'}
              </span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                className={`transition-transform duration-200 ${showCompanion ? 'rotate-180' : ''}`}
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            <AnimatePresence>
              {showCompanion && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-0">
                    {nivel === 'semente' && (
                      <ResumoAcessivel
                        paragrafos={nivelCapitulo.resumo_acessivel}
                        modoNoturno={modoNoturno}
                      />
                    )}

                    <PerguntasOrientadoras
                      perguntas={nivelCapitulo.perguntas_orientadoras}
                      nivel={nivel}
                      modoNoturno={modoNoturno}
                    />

                    {nivel === 'semente' && nivelCapitulo.exemplos_concretos.length > 0 && (
                      <ExemplosConcretos
                        exemplos={nivelCapitulo.exemplos_concretos}
                        modoNoturno={modoNoturno}
                      />
                    )}

                    {nivelCapitulo.sinais_do_veu && nivelCapitulo.sinais_do_veu.length > 0 && (
                      <SinaisDoVeu
                        sinais={nivelCapitulo.sinais_do_veu}
                        modoNoturno={modoNoturno}
                      />
                    )}

                    {nivelCapitulo.crencas_a_mapear && nivelCapitulo.crencas_a_mapear.length > 0 && (
                      <CrencasAMapear
                        crencas={nivelCapitulo.crencas_a_mapear}
                        modoNoturno={modoNoturno}
                      />
                    )}

                    {nivelCapitulo.mascaras && nivelCapitulo.mascaras.length > 0 && (
                      <MascarasDoVeu
                        mascaras={nivelCapitulo.mascaras}
                        modoNoturno={modoNoturno}
                      />
                    )}

                    {nivelCapitulo.veu_dominante_sinais && nivelCapitulo.veu_dominante_sinais.length > 0 && (
                      <VeuDominante
                        sinais={nivelCapitulo.veu_dominante_sinais}
                        modoNoturno={modoNoturno}
                      />
                    )}

                    {nivelCapitulo.mensagem_central && (
                      <MensagemCentral
                        mensagem={nivelCapitulo.mensagem_central}
                        modoNoturno={modoNoturno}
                      />
                    )}

                    {nivelCapitulo.guiao_escrita && (
                      <GuiaoEscrita
                        guiao={nivelCapitulo.guiao_escrita}
                        modoNoturno={modoNoturno}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Aviso quando conteudo complementar ainda nao existe */}
        {!nivelCapitulo && nivel !== 'arvore' && (
          <div className={`mb-10 rounded-xl px-6 py-4 text-center ${
            modoNoturno ? 'bg-stone-800/30' : 'bg-stone-50/70'
          }`}>
            <p className={`text-sm font-sans italic ${
              modoNoturno ? 'text-stone-500' : 'text-stone-400'
            }`}>
              Conteudo complementar em preparacao para este capitulo.
            </p>
          </div>
        )}

        {/* Texto do Capítulo — scroll contínuo */}
        <div className="space-y-6">
          {paragrafos.map((item, index) => (
            <React.Fragment key={index}>
              {item.tipo === 'subtitulo' ? (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.6) }}
                  className={`mt-12 mb-2 text-xl md:text-2xl font-serif font-semibold ${modoNoturno ? 'text-stone-200' : 'text-stone-800'} ${
                    showPlayer && tts.currentIndex === index
                      ? modoNoturno ? 'bg-stone-700/30 -mx-3 px-3 py-1 rounded-lg' : 'bg-stone-200/40 -mx-3 px-3 py-1 rounded-lg'
                      : ''
                  } transition-colors duration-300`}
                >
                  {item.texto}
                </motion.h2>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.6) }}
                  className={`text-xl md:text-xl leading-relaxed ${modoNoturno ? 'text-stone-300' : 'text-stone-700'} font-serif ${
                    showPlayer && tts.currentIndex === index
                      ? modoNoturno ? 'bg-stone-700/30 -mx-3 px-3 py-1 rounded-lg' : 'bg-stone-200/40 -mx-3 px-3 py-1 rounded-lg'
                      : ''
                  } transition-colors duration-300`}
                >
                  {renderTextoComFormato(
                    item.texto,
                    nivelCapitulo?.termos_destacados ?? [],
                    modoNoturno,
                    nivel !== 'arvore' && !!nivelCapitulo
                  )}
                </motion.p>
              )}
              {/* Notas contextuais (Raiz) */}
              {nivel === 'raiz' && nivelCapitulo?.notas_contextuais
                .filter(n => n.paragrafo_indice === index)
                .map((nota, ni) => (
                  <NotaContextual key={`nota-${index}-${ni}`} texto={nota.texto} modoNoturno={modoNoturno} />
                ))
              }
            </React.Fragment>
          ))}
          {/* Sentinel for completion detection */}
          <div ref={endOfTextRef} className="h-1" />
        </div>

        {/* Espelho pessoal — provocacao intima no final do capitulo */}
        {nivelCapitulo?.espelho_pessoal && nivel !== 'arvore' && (
          <EspelhoPessoal texto={nivelCapitulo.espelho_pessoal} modoNoturno={modoNoturno} />
        )}

        {/* Navegação */}
        <div className="mt-16 space-y-4">
          {/* Capitulo anterior / proximo */}
          <div className="flex justify-between items-center">
            {capituloAnterior() ? (
              <Link
                href={capituloAnterior()!}
                scroll={true}
                onClick={() => window.scrollTo(0, 0)}
                className={`px-5 py-2 rounded-full text-sm ${modoNoturno ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'} transition-colors`}
              >
                ← Cap. anterior
              </Link>
            ) : <span />}
            <Link href={proximoCapitulo()} scroll={true} onClick={() => window.scrollTo(0, 0)}>
              <span
                className={`inline-block px-6 py-2.5 rounded-full text-sm ${modoNoturno ? 'bg-purple-800 text-purple-200' : 'bg-purple-200 text-purple-800'} hover:opacity-80 transition-opacity`}
              >
                Proximo Capitulo →
              </span>
            </Link>
          </div>
          {/* Links para veu e mandala */}
          <div className="flex items-center justify-center gap-6">
            <Link href={`/livro/veu/${numeroVeu}`}>
              <span className={`text-xs ${modoNoturno ? 'text-stone-600 hover:text-stone-400' : 'text-stone-400 hover:text-stone-600'} transition-colors`}>
                Veu {numeroVeu}
              </span>
            </Link>
            <span className={`text-xs ${modoNoturno ? 'text-stone-700' : 'text-stone-300'}`}>|</span>
            <Link href="/livro">
              <span className={`text-xs ${modoNoturno ? 'text-stone-600 hover:text-stone-400' : 'text-stone-400 hover:text-stone-600'} transition-colors`}>
                Mandala
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Drawer de Reflexões */}
      <ReflexoesDrawer
        veuNumero={numeroVeu}
        capituloNumero={numeroCapitulo}
        guiaoReflexao={nivel !== 'arvore' ? nivelCapitulo?.guiao_reflexao : undefined}
        hasFloatingPlayer={showPlayer}
        capituloCompleto={capituloCompleto}
      />

      {/* Audio Player flutuante */}
      <AnimatePresence>
        {showPlayer && (
          <AudioPlayer
            isPlaying={tts.isPlaying}
            isPaused={tts.isPaused}
            currentIndex={tts.currentIndex}
            total={tts.total}
            rate={tts.rate}
            voices={tts.voices}
            selectedVoice={tts.selectedVoice}
            onPlay={tts.play}
            onPause={tts.pause}
            onStop={tts.stop}
            onNext={tts.next}
            onPrevious={tts.previous}
            onRateChange={tts.setRate}
            onVoiceChange={tts.setSelectedVoice}
            onClose={() => setShowPlayer(false)}
            modoNoturno={modoNoturno}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
