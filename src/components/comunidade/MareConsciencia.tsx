'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'
import { TEMA_LABELS, TEMA_COLORS, VEU_NAMES, VEU_COLORS } from '@/lib/temas'

type MareData = {
  temas: Record<string, number>
  recentTemas: Record<string, number>
  veus: Record<number, number>
  total: number
  leitoras: number
}

export default function MareConsciencia() {
  const { user } = useAuth()
  const [mare, setMare] = useState<MareData | null>(null)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!user) return

    async function carregar() {
      const res = await fetch('/api/mare')
      const data = await res.json()
      if (data.mare) setMare(data.mare)
      setLoading(false)
    }

    carregar()
  }, [user])

  // Animated wave canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !mare) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width = canvas.offsetWidth * 2
    const height = canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    const temas = Object.entries(mare.temas)
    if (temas.length === 0) return

    let frame = 0

    function draw() {
      if (!ctx || !canvas) return
      const w = width / 2
      const h = height / 2

      ctx.clearRect(0, 0, w, h)

      temas.forEach(([tema, count], i) => {
        const color = TEMA_COLORS[tema] || '#a09a90'
        const amplitude = Math.min(count * 3, h * 0.3)
        const frequency = 0.01 + i * 0.003
        const speed = 0.02 + i * 0.005
        const yOffset = (h / (temas.length + 1)) * (i + 1)

        ctx.beginPath()
        ctx.moveTo(0, yOffset)

        for (let x = 0; x <= w; x += 2) {
          const y = yOffset + Math.sin(x * frequency + frame * speed) * amplitude
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.4 + (count / Math.max(...temas.map(([, c]) => c))) * 0.4
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      frame++
      requestAnimationFrame(draw)
    }

    const animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [mare])

  if (loading) {
    return (
      <div className="rounded-2xl border border-brown-100 bg-white p-8">
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center font-serif text-sm italic text-brown-400"
        >
          A sentir a maré...
        </motion.p>
      </div>
    )
  }

  if (!mare || mare.total === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-brown-200 p-8 text-center">
        <p className="font-serif text-brown-500">
          A maré ainda está calma.
        </p>
        <p className="mt-1 font-sans text-xs text-brown-400">
          Quando as primeiras reflexões forem partilhadas, o oceano colectivo começará a mover-se.
        </p>
      </div>
    )
  }

  const maxTema = Math.max(...Object.values(mare.temas))

  return (
    <div className="space-y-4">
      {/* Visualization canvas */}
      <div className="relative overflow-hidden rounded-2xl border border-brown-100 bg-gradient-to-b from-cream to-white">
        <canvas
          ref={canvasRef}
          className="h-48 w-full"
        />

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-brown-400/80">
            Maré de Consciência
          </p>
          <p className="mt-1 font-serif text-3xl text-brown-700/60">
            {mare.total}
          </p>
          <p className="font-sans text-[0.6rem] text-brown-400/60">
            {mare.total === 1 ? 'eco a flutuar' : 'ecos a flutuar'}
          </p>
        </div>
      </div>

      {/* Theme bars */}
      <div className="rounded-2xl border border-brown-100 bg-white p-5">
        <p className="mb-4 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
          O que a comunidade está a sentir
        </p>

        <div className="space-y-3">
          {Object.entries(mare.temas)
            .sort(([, a], [, b]) => b - a)
            .map(([tema, count]) => (
              <div key={tema}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-sans text-xs text-brown-600">
                    {TEMA_LABELS[tema] || tema}
                  </span>
                  <span className="font-sans text-[0.6rem] text-brown-400">
                    {count}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-brown-100/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxTema) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: TEMA_COLORS[tema] || '#a09a90' }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Veil activity */}
      <div className="rounded-2xl border border-brown-100 bg-white p-5">
        <p className="mb-4 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
          Véus em exploração
        </p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((v) => {
            const count = mare.veus[v] || 0
            const maxVeu = Math.max(...Object.values(mare.veus), 1)
            const opacity = count > 0 ? 0.3 + (count / maxVeu) * 0.7 : 0.1

            return (
              <div key={v} className="flex-1 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xs font-medium text-white"
                  style={{
                    backgroundColor: VEU_COLORS[v],
                    opacity,
                  }}
                >
                  {v}
                </motion.div>
                <p className="mt-1 font-sans text-[0.5rem] text-brown-400">
                  {VEU_NAMES[v]}
                </p>
                {count > 0 && (
                  <p className="font-sans text-[0.55rem] text-brown-500">
                    {count}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Active readers */}
      {mare.leitoras > 0 && (
        <p className="text-center font-sans text-xs text-brown-400">
          {mare.leitoras} {mare.leitoras === 1 ? 'alma' : 'almas'} a partilhar ecos
        </p>
      )}
    </div>
  )
}
