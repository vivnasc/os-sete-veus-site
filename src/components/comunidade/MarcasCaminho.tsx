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

// Sample marcas shown when the community is still growing
const MARCAS_EXEMPLO: Marca[] = [
  {
    id: 'demo-m1',
    veu_numero: 1,
    conteudo: 'saí do modo automático. não sei para onde vou mas pelo menos estou acordada.',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-m2',
    veu_numero: 1,
    conteudo: 'a vida que eu tinha não era minha. agora assusta mas é real.',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-m3',
    veu_numero: 1,
    conteudo: 'terminei o espelho e sinto que algo se partiu. no bom sentido. tipo, uma casca.',
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-m4',
    veu_numero: 2,
    conteudo: 'chorei tudo o que precisava. o passado ficou mais leve.',
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export default function MarcasCaminho({ veuNumero }: Props) {
  const { user } = useAuth()
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [isDemo, setIsDemo] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function carregar() {
      try {
        const url = veuNumero ? `/api/marcas?veu=${veuNumero}` : '/api/marcas'
        const res = await fetch(url)
        const data = await res.json()
        if (data.marcas && data.marcas.length > 0) {
          setMarcas(data.marcas)
          setIsDemo(false)
        } else {
          const filtered = veuNumero
            ? MARCAS_EXEMPLO.filter((m) => m.veu_numero === veuNumero)
            : MARCAS_EXEMPLO
          setMarcas(filtered)
          setIsDemo(true)
        }
      } catch {
        setMarcas(MARCAS_EXEMPLO)
        setIsDemo(true)
      }
      setLoading(false)
    }

    carregar()
  }, [user, veuNumero])

  if (loading || marcas.length === 0) return null

  return (
    <div className="rounded-2xl border border-brown-100 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
          Marcas no Caminho
        </p>
        {isDemo && (
          <span className="rounded-full bg-sage/10 px-2 py-0.5 font-sans text-[0.5rem] uppercase tracking-wider text-sage">
            Pré-visualização
          </span>
        )}
      </div>
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
