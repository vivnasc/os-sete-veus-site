'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'
import EcoCard from './EcoCard'
import SussurroModal from './SussurroModal'
import { VEU_NAMES, VEU_COLORS } from '@/lib/temas'

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

export default function EcosFeed() {
  const { user } = useAuth()
  const [ecos, setEcos] = useState<Eco[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVeu, setSelectedVeu] = useState<number | null>(null)
  const [sussurroEcoId, setSussurroEcoId] = useState<string | null>(null)
  const [fioInvisivel, setFioInvisivel] = useState<string | null>(null)
  const [guardados, setGuardados] = useState<Set<string>>(new Set())

  const carregarEcos = useCallback(async () => {
    const url = selectedVeu ? `/api/ecos?veu=${selectedVeu}` : '/api/ecos'
    const res = await fetch(url)
    const data = await res.json()
    if (data.ecos) {
      setEcos(data.ecos)

      // O Fio Invisível — detect if someone shares your themes
      detectarFioInvisivel(data.ecos)

      // Carregar ecos guardados
      const ecoIds = data.ecos.map((e: Eco) => e.id)
      if (ecoIds.length > 0) {
        try {
          const guardadosRes = await fetch(`/api/ecos/guardar?ids=${ecoIds.join(',')}`)
          const guardadosData = await guardadosRes.json()
          if (guardadosData.guardados) {
            setGuardados(new Set(guardadosData.guardados))
          }
        } catch {
          // Silencioso — funcionalidade opcional
        }
      }
    }
    setLoading(false)
  }, [selectedVeu])

  useEffect(() => {
    if (user) carregarEcos()
  }, [user, carregarEcos])

  function detectarFioInvisivel(ecosData: Eco[]) {
    // Find ecos that are not mine but share themes with my ecos
    const meusEcos = ecosData.filter((e) => e.is_mine)
    const outrosEcos = ecosData.filter((e) => !e.is_mine)

    if (meusEcos.length === 0 || outrosEcos.length === 0) return

    const meusTemas = new Set(meusEcos.flatMap((e) => e.temas))

    for (const eco of outrosEcos) {
      const temasComuns = eco.temas.filter((t) => meusTemas.has(t))
      if (temasComuns.length > 0) {
        setFioInvisivel(
          'Alguém que não conheces está a sentir algo parecido ao que escreveste.'
        )
        break
      }
    }
  }

  async function handleReconhecer(ecoId: string) {
    await fetch('/api/ecos/reconhecer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ecoId }),
    })
  }

  async function handleGuardar(ecoId: string) {
    setGuardados((prev) => new Set([...prev, ecoId]))
    await fetch('/api/ecos/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ecoId }),
    })
  }

  if (!user) return null

  return (
    <div>
      {/* Veil filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedVeu(null)}
          className={`rounded-full px-3 py-1.5 font-sans text-xs transition-all ${
            selectedVeu === null
              ? 'bg-brown-900 text-white'
              : 'bg-cream-dark text-brown-500 hover:bg-brown-100'
          }`}
        >
          Todos os véus
        </button>
        {[1, 2, 3, 4, 5, 6, 7].map((v) => (
          <button
            key={v}
            onClick={() => setSelectedVeu(v === selectedVeu ? null : v)}
            className="rounded-full px-3 py-1.5 font-sans text-xs transition-all"
            style={{
              backgroundColor: selectedVeu === v ? VEU_COLORS[v] : undefined,
              color: selectedVeu === v ? 'white' : VEU_COLORS[v],
              border: `1px solid ${VEU_COLORS[v]}`,
            }}
          >
            {v}. {VEU_NAMES[v]}
          </button>
        ))}
      </div>

      {/* O Fio Invisível */}
      <AnimatePresence>
        {fioInvisivel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="rounded-xl border border-sage/20 bg-sage/5 px-5 py-4 text-center">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-sage">
                O Fio Invisível
              </p>
              <p className="mt-2 font-serif text-sm italic text-brown-600">
                &ldquo;{fioInvisivel}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading */}
      {loading && (
        <div className="py-20 text-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-serif text-sm italic text-brown-400"
          >
            A ouvir os ecos...
          </motion.div>
        </div>
      )}

      {/* Empty state */}
      {!loading && ecos.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-brown-200 py-16 text-center">
          <p className="font-serif text-lg text-brown-500">
            Ainda não há ecos neste espaço.
          </p>
          <p className="mt-2 font-sans text-sm text-brown-400">
            Quando libertares uma reflexão como eco, ela aparecerá aqui — anónima, impermanente.
          </p>
        </div>
      )}

      {/* Ecos list */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {ecos.map((eco) => (
            <EcoCard
              key={eco.id}
              eco={eco}
              onReconhecer={handleReconhecer}
              onSussurrar={(id) => setSussurroEcoId(id)}
              guardado={guardados.has(eco.id)}
              onGuardar={handleGuardar}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Sussurro modal */}
      <SussurroModal
        ecoId={sussurroEcoId}
        onClose={() => setSussurroEcoId(null)}
      />
    </div>
  )
}
