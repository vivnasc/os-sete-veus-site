'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'
import { VEU_NAMES, VEU_COLORS } from '@/lib/temas'

type Membro = {
  sombra_nome: string
  joined_at: string
}

type Fragmento = {
  id: string
  conteudo: string
  created_at: string
  sombra: string
  is_mine: boolean
}

type CirculoData = {
  id: string
  veu_numero: number
  expires_at: string
  minha_sombra: string
  membros: Membro[]
  fragmentos: Fragmento[]
}

export default function CirculoEspelho() {
  const { user } = useAuth()
  const [circulo, setCirculo] = useState<CirculoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [novoFragmento, setNovoFragmento] = useState('')
  const [joining, setJoining] = useState(false)
  const [selectedVeu, setSelectedVeu] = useState<number>(1)
  const [sending, setSending] = useState(false)

  const carregar = useCallback(async () => {
    const res = await fetch('/api/circulos')
    const data = await res.json()
    if (data.circulo) setCirculo(data.circulo)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) carregar()
  }, [user, carregar])

  async function entrarCirculo() {
    setJoining(true)
    const res = await fetch('/api/circulos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ veuNumero: selectedVeu }),
    })

    if (res.ok) {
      await carregar()
    }
    setJoining(false)
  }

  async function enviarFragmento() {
    if (!novoFragmento.trim() || !circulo) return

    setSending(true)
    const res = await fetch('/api/circulos/fragmento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        circuloId: circulo.id,
        conteudo: novoFragmento,
      }),
    })

    if (res.ok) {
      setNovoFragmento('')
      await carregar()
    }
    setSending(false)
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-brown-100 bg-white p-8">
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center font-serif text-sm italic text-brown-400"
        >
          A procurar o teu círculo...
        </motion.p>
      </div>
    )
  }

  // No active circle — show join flow
  if (!circulo) {
    return (
      <div className="rounded-2xl border border-brown-100 bg-white p-6">
        <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-brown-400">
          Círculos de Espelho
        </p>
        <h3 className="mt-2 font-serif text-xl text-brown-900">
          Encontra o teu círculo
        </h3>
        <p className="mt-2 font-serif text-sm text-brown-500">
          Grupos temporários de 3 a 7 pessoas que exploram o mesmo véu. Sem nomes reais.
          Apenas sombras que caminham juntas por um trecho.
        </p>

        {/* Veil selection */}
        <div className="mt-5">
          <p className="mb-2 font-sans text-xs text-brown-500">
            Que véu estás a explorar?
          </p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVeu(v)}
                className="rounded-full px-3 py-1.5 font-sans text-xs transition-all"
                style={{
                  backgroundColor: selectedVeu === v ? VEU_COLORS[v] : 'transparent',
                  color: selectedVeu === v ? 'white' : VEU_COLORS[v],
                  border: `1.5px solid ${VEU_COLORS[v]}`,
                }}
              >
                {v}. {VEU_NAMES[v]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={entrarCirculo}
          disabled={joining}
          className="mt-5 w-full rounded-lg bg-brown-900 py-3 font-sans text-xs uppercase tracking-wider text-white transition-colors hover:bg-brown-800 disabled:opacity-50"
        >
          {joining ? 'A encontrar o teu lugar...' : 'Entrar no círculo'}
        </button>
      </div>
    )
  }

  // Active circle
  const daysLeft = Math.ceil(
    (new Date(circulo.expires_at).getTime() - Date.now()) / 86400000
  )
  const veuColor = VEU_COLORS[circulo.veu_numero]

  return (
    <div className="rounded-2xl border border-brown-100 bg-white">
      {/* Header */}
      <div
        className="rounded-t-2xl px-6 py-5"
        style={{ backgroundColor: `${veuColor}15` }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-sans text-[0.55rem] uppercase tracking-[0.25em] text-brown-400">
              Círculo de Espelho · Véu {circulo.veu_numero}
            </p>
            <h3 className="mt-1 font-serif text-lg text-brown-900">
              {VEU_NAMES[circulo.veu_numero]}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-sans text-xs text-brown-500">
              {circulo.membros.length} sombras
            </p>
            <p className="font-sans text-[0.55rem] text-brown-400">
              dissolve-se em {daysLeft}d
            </p>
          </div>
        </div>

        {/* Members as shadow dots */}
        <div className="mt-3 flex gap-2">
          {circulo.membros.map((m, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-1.5 rounded-full bg-white/60 px-2.5 py-1"
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: veuColor }}
              />
              <span className="font-sans text-[0.6rem] text-brown-600">
                {m.sombra_nome}
                {m.sombra_nome === circulo.minha_sombra ? ' (tu)' : ''}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fragments */}
      <div className="max-h-80 overflow-y-auto p-6">
        {circulo.fragmentos.length === 0 ? (
          <p className="py-8 text-center font-serif text-sm italic text-brown-400">
            O silêncio é o primeiro passo. Quando estiveres pronta, partilha um fragmento.
          </p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {circulo.fragmentos.map((f) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-3 ${
                    f.is_mine ? 'bg-sage/5 ml-4' : 'bg-cream mr-4'
                  }`}
                >
                  <p className="font-body text-sm leading-relaxed text-brown-700">
                    {f.conteudo}
                  </p>
                  <p className="mt-1.5 font-sans text-[0.55rem] text-brown-400">
                    {f.sombra} · {getTimeAgo(f.created_at)}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-brown-100 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={novoFragmento}
            onChange={(e) => setNovoFragmento(e.target.value.slice(0, 300))}
            onKeyDown={(e) => e.key === 'Enter' && enviarFragmento()}
            placeholder="Partilha um fragmento..."
            className="flex-1 rounded-lg border border-brown-200 px-3 py-2 font-sans text-sm text-brown-700 placeholder:text-brown-300 focus:border-sage focus:outline-none"
          />
          <button
            onClick={enviarFragmento}
            disabled={!novoFragmento.trim() || sending}
            className="rounded-lg px-4 py-2 font-sans text-xs text-white transition-colors disabled:opacity-40"
            style={{ backgroundColor: veuColor }}
          >
            {sending ? '...' : 'Enviar'}
          </button>
        </div>
        <p className="mt-1 text-right font-sans text-[0.5rem] text-brown-300">
          {novoFragmento.length}/300
        </p>
      </div>
    </div>
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
  return `há ${days}d`
}
