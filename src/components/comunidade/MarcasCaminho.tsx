'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'
import { VEU_NAMES, VEU_COLORS } from '@/lib/temas'

type Marca = {
  id: string
  veu_numero: number
  conteudo: string
  created_at: string
}

type Props = {
  veuNumero?: number
}

export default function MarcasCaminho({ veuNumero }: Props) {
  const { user } = useAuth()
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function carregar() {
      const url = veuNumero ? `/api/marcas?veu=${veuNumero}` : '/api/marcas'
      const res = await fetch(url)
      const data = await res.json()
      if (data.marcas) setMarcas(data.marcas)
      setLoading(false)
    }

    carregar()
  }, [user, veuNumero])

  if (loading || marcas.length === 0) return null

  return (
    <div className="rounded-2xl border border-brown-100 bg-white p-5">
      <p className="mb-4 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
        Marcas no Caminho
      </p>
      <p className="mb-5 font-serif text-xs italic text-brown-400">
        Frases deixadas por quem já passou por aqui.
      </p>

      <div className="space-y-4">
        <AnimatePresence>
          {marcas.map((marca, i) => (
            <motion.div
              key={marca.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative pl-5"
            >
              {/* Trail dot */}
              <div
                className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: VEU_COLORS[marca.veu_numero],
                  opacity: 1 - i * 0.15,
                }}
              />

              {/* Connecting line */}
              {i < marcas.length - 1 && (
                <div
                  className="absolute bottom-0 left-[4.5px] top-4 w-px"
                  style={{
                    backgroundColor: VEU_COLORS[marca.veu_numero],
                    opacity: 0.2,
                  }}
                />
              )}

              <blockquote
                className="font-serif text-sm italic leading-relaxed text-brown-600"
                style={{ opacity: 1 - i * 0.1 }}
              >
                &ldquo;{marca.conteudo}&rdquo;
              </blockquote>
              <p className="mt-1 font-sans text-[0.55rem] text-brown-300">
                Véu {marca.veu_numero} · {VEU_NAMES[marca.veu_numero]}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
