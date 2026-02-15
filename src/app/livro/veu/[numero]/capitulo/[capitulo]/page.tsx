'use client'

import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useAccess } from '@/hooks/useAccess'
import livroData from '@/data/livro-7-veus.json'
import ReflexoesDrawer from '@/components/ReflexoesDrawer'

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

export default function CapituloPage() {
  const { user, loading } = useAuth()
  const { hasBookAccess, isLoading: accessLoading } = useAccess()
  const router = useRouter()
  const params = useParams()
  const numeroVeu = parseInt(params.numero as string)
  const numeroCapitulo = parseInt(params.capitulo as string)

  const veu = livroData.veus[numeroVeu - 1]
  const capitulo = veu?.capitulos.find(c => c.numero === numeroCapitulo)

  const [modoLeitura, setModoLeitura] = useState<'contemplativo' | 'normal'>('contemplativo')
  const [modoNoturno, setModoNoturno] = useState(false)
  const [mostrarPausa, setMostrarPausa] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(0)

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

  // Agrupar parágrafos em "páginas" para o modo contemplativo
  // Cada página tem ~3-5 parágrafos (até ~1800 chars), com quebra nos subtítulos
  const paginas = useMemo(() => {
    const result: { texto: string; tipo: 'paragrafo' | 'subtitulo' }[][] = []
    let paginaActual: { texto: string; tipo: 'paragrafo' | 'subtitulo' }[] = []
    let charsNaPagina = 0

    for (let i = 0; i < paragrafos.length; i++) {
      const item = paragrafos[i]

      // Subtítulo inicia nova página (se a página actual tem conteúdo)
      if (item.tipo === 'subtitulo' && paginaActual.length > 0) {
        result.push(paginaActual)
        paginaActual = []
        charsNaPagina = 0
      }

      paginaActual.push(item)
      charsNaPagina += item.texto.length

      // Fechar página se atingiu ~1800 chars e tem pelo menos 3 itens
      if (charsNaPagina >= 1800 && paginaActual.length >= 3) {
        result.push(paginaActual)
        paginaActual = []
        charsNaPagina = 0
      }
    }

    if (paginaActual.length > 0) {
      result.push(paginaActual)
    }

    return result
  }, [paragrafos])

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

  // Mostrar pausa a cada 3 páginas
  useEffect(() => {
    if (paginaAtual > 0 && paginaAtual % 3 === 0 && modoLeitura === 'contemplativo') {
      setMostrarPausa(true)
      const timer = setTimeout(() => setMostrarPausa(false), 10000) // 10 segundos
      return () => clearTimeout(timer)
    }
  }, [paginaAtual, modoLeitura])

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

  // Próxima página
  const proximaPagina = () => {
    if (paginaAtual < paginas.length - 1) {
      setPaginaAtual(paginaAtual + 1)
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
          <div className="space-y-6">
            {paragrafos.map((item, index) => (
              item.tipo === 'subtitulo' ? (
                <motion.h2
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`mt-12 mb-2 text-xl md:text-2xl font-serif font-semibold ${modoNoturno ? cores.textDark : cores.text}`}
                >
                  {item.texto}
                </motion.h2>
              ) : (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`text-lg md:text-xl leading-relaxed ${modoNoturno ? cores.textDark : cores.text} font-serif`}
                >
                  {item.texto}
                </motion.p>
              )
            ))}
          </div>
        ) : (
          // Modo Contemplativo: Página por página (3-5 parágrafos agrupados)
          <div className="min-h-[60vh] flex flex-col justify-between">
            <motion.div
              key={paginaAtual}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {paginas[paginaAtual]?.map((item, idx) => (
                item.tipo === 'subtitulo' ? (
                  <h2
                    key={idx}
                    className={`text-xl md:text-3xl font-serif font-semibold ${idx > 0 ? 'mt-8' : ''} ${modoNoturno ? cores.textDark : cores.text}`}
                  >
                    {item.texto}
                  </h2>
                ) : (
                  <p
                    key={idx}
                    className={`text-lg md:text-2xl leading-relaxed ${modoNoturno ? cores.textDark : cores.text} font-serif`}
                  >
                    {item.texto}
                  </p>
                )
              ))}
            </motion.div>

            {/* Progresso */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm ${modoNoturno ? 'text-stone-500' : 'text-stone-600'}`}>
                  {paginaAtual + 1} de {paginas.length}
                </span>
                {paginaAtual < paginas.length - 1 ? (
                  <button
                    onClick={proximaPagina}
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
                  animate={{ width: `${((paginaAtual + 1) / paginas.length) * 100}%` }}
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
