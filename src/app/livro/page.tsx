'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'
import { useAccess } from '@/hooks/useAccess'
import { useNivelLeitura } from '@/hooks/useNivelLeitura'
import NivelOnboarding from '@/components/livro/NivelOnboarding'

export default function LivroMandalaPage() {
  const { user, loading } = useAuth()
  const { hasBookAccess, isLoading: accessLoading } = useAccess()
  const { isFirstVisit, setNivel, loaded: nivelLoaded } = useNivelLeitura()
  const router = useRouter()
  const [hoveredVeu, setHoveredVeu] = useState<number | null>(null)

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

  const veus = [
    {
      numero: 1,
      nome: "Permanência",
      cor: "#C1502E", // Vermelho-Terra (Raiz)
      angulo: 0,
      descricao: "A crença num 'eu' fixo"
    },
    {
      numero: 2,
      nome: "Memória",
      cor: "#FF8C42", // Laranja-Âmbar (Emoção)
      angulo: 51.4,
      descricao: "As histórias do passado"
    },
    {
      numero: 3,
      nome: "Turbilhão",
      cor: "#FFD700", // Amarelo-Dourado (Mente)
      angulo: 102.8,
      descricao: "A identificação com pensamentos"
    },
    {
      numero: 4,
      nome: "Esforço",
      cor: "#6ABF69", // Verde-Suave (Coração)
      angulo: 154.2,
      descricao: "A busca incessante"
    },
    {
      numero: 5,
      nome: "Desolação",
      cor: "#2E86AB", // Azul-Profundo (Garganta)
      angulo: 205.6,
      descricao: "O medo do vazio"
    },
    {
      numero: 6,
      nome: "Horizonte",
      cor: "#4B4E9D", // Índigo (Terceiro Olho)
      angulo: 257,
      descricao: "A ilusão do fim"
    },
    {
      numero: 7,
      nome: "Dualidade",
      cor: "#9B59B6", // Violeta-Luz (Coroa)
      angulo: 308.4,
      descricao: "A separação eu/mundo"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col items-center justify-center p-6">
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-6xl font-serif text-stone-900 mb-3 md:mb-4">
          Os 7 Véus do Despertar
        </h1>
        <p className="text-base md:text-xl text-stone-600 max-w-2xl mx-auto italic">
          &ldquo;Aquilo que chamas de &lsquo;eu&rsquo; não se esgota no nome, na função ou na história.&rdquo;
        </p>
      </motion.div>

      {/* Mobile: Lista vertical dos véus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="md:hidden w-full max-w-sm mb-8"
      >
        <div className="space-y-2">
          {veus.map((veu) => (
            <motion.div
              key={veu.numero}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + veu.numero * 0.08 }}
            >
              <Link href={`/livro/veu/${veu.numero}`}>
                <div className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/70 hover:bg-white transition-colors shadow-sm">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-md"
                    style={{ backgroundColor: veu.cor }}
                  >
                    <span className="text-white text-sm font-bold">{veu.numero}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-medium text-stone-800">{veu.nome}</p>
                    <p className="text-xs text-stone-500">{veu.descricao}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-stone-400 ml-auto">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Desktop: Mandala Central */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="relative w-[500px] h-[500px] mb-12 hidden md:block"
      >
        {/* Imagem da Mandala — pointer-events-none para não bloquear links */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/images/mandala-7veus.png"
            alt="Mandala dos 7 Véus"
            width={400}
            height={400}
            className="opacity-20"
          />
        </div>

        {/* Véus clicáveis */}
        {veus.map((veu) => {
          const radianos = (veu.angulo * Math.PI) / 180
          const raio = 180
          const x = Math.cos(radianos) * raio
          const y = Math.sin(radianos) * raio

          return (
            <motion.div
              key={veu.numero}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + veu.numero * 0.1 }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
              }}
            >
              <Link href={`/livro/veu/${veu.numero}`}>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredVeu(veu.numero)}
                  onHoverEnd={() => setHoveredVeu(null)}
                  className="relative group cursor-pointer"
                >
                  {/* Círculo do Véu */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-all"
                    style={{
                      backgroundColor: veu.cor,
                      boxShadow: hoveredVeu === veu.numero
                        ? `0 0 30px ${veu.cor}`
                        : '0 4px 6px rgba(0,0,0,0.3)'
                    }}
                  >
                    <span className="text-white text-2xl font-bold drop-shadow-lg">
                      {veu.numero}
                    </span>
                  </div>

                  {/* Label do Véu */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <p className="text-sm font-medium text-stone-700 group-hover:underline underline-offset-2">
                      {veu.nome}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}

        {/* Centro da Mandala */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-stone-100 border-4 border-white shadow-xl flex items-center justify-center">
            <p className="text-xs text-center text-stone-600 px-2 leading-tight">
              O Despertar
            </p>
          </div>
        </div>
      </motion.div>

      {/* Descrição do véu hovereado (desktop only) */}
      <motion.div
        className="h-16 hidden md:flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredVeu !== null && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-stone-600 italic"
          >
            VÉU {hoveredVeu}: {veus[hoveredVeu - 1].descricao}
          </motion.p>
        )}
      </motion.div>

      {/* Botão de Início */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 md:mt-8"
      >
        <Link href="/livro/veu/1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 md:px-12 py-3.5 md:py-4 bg-purple-600 text-white rounded-full text-base md:text-lg font-medium shadow-xl hover:shadow-2xl hover:bg-purple-700 transition-all"
          >
            Iniciar Travessia
          </motion.button>
        </Link>
      </motion.div>

      {/* Links para introdução e posfácio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-4 flex flex-col items-center gap-2"
      >
        <Link href="/livro/introducao" className="text-sm text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-4">
          Dedicatória, Nota de Abertura &amp; Introdução
        </Link>
        <Link href="/livro/posfacio" className="text-sm text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-4">
          Carta ao Leitor &amp; Fontes Inspiradoras
        </Link>
      </motion.div>

      {/* Texto de orientação */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-6 md:mt-8 text-sm text-stone-500 text-center max-w-md"
      >
        Esta não é uma leitura. É uma travessia.<br />
        Não há pressa. Há presença.<br />
        <span className="italic">Respira. Depois, avança.</span>
      </motion.p>

      {/* Onboarding de nivel de leitura (primeira visita) */}
      {nivelLoaded && (
        <NivelOnboarding open={isFirstVisit} onSelect={setNivel} />
      )}
    </div>
  )
}
