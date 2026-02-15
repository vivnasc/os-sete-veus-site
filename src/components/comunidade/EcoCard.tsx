'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VEU_NAMES, VEU_COLORS, TEMA_LABELS, TEMA_COLORS } from '@/lib/temas'

type Eco = {
  id: string
  veu_numero: number
  capitulo: number | null
  conteudo: string
  temas: string[]
  created_at: string
  reconhecimentos_count: number
  reconhecido_por_mim: boolean
  is_mine: boolean
}

type Props = {
  eco: Eco
  onReconhecer: (ecoId: string) => void
  onSussurrar: (ecoId: string) => void
}

export default function EcoCard({ eco, onReconhecer, onSussurrar }: Props) {
  const [isReconhecido, setIsReconhecido] = useState(eco.reconhecido_por_mim)
  const [count, setCount] = useState(eco.reconhecimentos_count)
  const [showSussurro, setShowSussurro] = useState(false)

  const veuColor = VEU_COLORS[eco.veu_numero] || '#c9b896'
  const timeAgo = getTimeAgo(eco.created_at)

  async function handleReconhecer() {
    if (eco.is_mine || isReconhecido) return

    setIsReconhecido(true)
    setCount((c) => c + 1)
    onReconhecer(eco.id)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="relative rounded-2xl border border-brown-100 bg-white p-6 shadow-sm"
    >
      {/* Veil indicator — subtle colored line */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
        style={{ backgroundColor: veuColor }}
      />

      {/* Meta */}
      <div className="ml-4 flex items-center gap-2 text-xs text-brown-400">
        <span
          className="inline-block rounded-full px-2 py-0.5 text-white"
          style={{ backgroundColor: veuColor, fontSize: '0.65rem' }}
        >
          Véu {eco.veu_numero} · {VEU_NAMES[eco.veu_numero]}
        </span>
        <span className="opacity-60">{timeAgo}</span>
      </div>

      {/* Content */}
      <p className="ml-4 mt-3 font-body text-base leading-relaxed text-brown-700 whitespace-pre-wrap">
        {eco.conteudo}
      </p>

      {/* Themes */}
      {eco.temas.length > 0 && (
        <div className="ml-4 mt-3 flex flex-wrap gap-1.5">
          {eco.temas.map((tema) => (
            <span
              key={tema}
              className="rounded-full px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white/90"
              style={{ backgroundColor: TEMA_COLORS[tema] || '#a09a90' }}
            >
              {TEMA_LABELS[tema] || tema}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="ml-4 mt-4 flex items-center gap-4">
        {/* Reconheço-me button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleReconhecer}
          disabled={eco.is_mine}
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-sans text-xs transition-all ${
            isReconhecido
              ? 'bg-sage/20 text-sage'
              : eco.is_mine
                ? 'cursor-default bg-brown-100/50 text-brown-300'
                : 'bg-cream-dark text-brown-500 hover:bg-sage/10 hover:text-sage'
          }`}
        >
          <motion.span
            animate={isReconhecido ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {isReconhecido ? '◆' : '◇'}
          </motion.span>
          <span>
            {isReconhecido ? 'Reconhecido' : 'Reconheço-me'}
          </span>
          {count > 0 && (
            <span className="ml-1 opacity-60">{count}</span>
          )}
        </motion.button>

        {/* Sussurrar button */}
        {!eco.is_mine && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowSussurro(!showSussurro)
              onSussurrar(eco.id)
            }}
            className="flex items-center gap-1.5 rounded-full px-3 py-2 font-sans text-xs text-brown-400 transition-colors hover:bg-cream-dark hover:text-brown-600"
          >
            <span className="text-sm">~</span>
            <span>Sussurrar</span>
          </motion.button>
        )}
      </div>

      {/* Own eco indicator */}
      <AnimatePresence>
        {eco.is_mine && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-4 top-4 font-sans text-[0.55rem] uppercase tracking-wider text-brown-300"
          >
            o teu eco
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'agora'
  if (minutes < 60) return `há ${minutes}m`
  if (hours < 24) return `há ${hours}h`
  if (days < 30) return `há ${days}d`
  return 'há mais de um mês'
}
