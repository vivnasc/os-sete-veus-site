'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'

type Faisca = {
  id: string
  conteudo: string
  created_at: string
}

type FogueiraData = {
  id: string
  titulo: string
  descricao: string
  starts_at: string
  ends_at: string
  activa: boolean
  frase_abertura: string | null
  frase_fecho: string | null
  fogueira_faiscas: Faisca[]
}

export default function Fogueira() {
  const { user } = useAuth()
  const [fogueira, setFogueira] = useState<FogueiraData | null>(null)
  const [estado, setEstado] = useState<string>('nenhuma')
  const [loading, setLoading] = useState(true)
  const [novaFaisca, setNovaFaisca] = useState('')
  const [sending, setSending] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in')
  const [showBreathing, setShowBreathing] = useState(true)

  const carregar = useCallback(async () => {
    try {
      const res = await fetch('/api/fogueira')
      const data = await res.json()
      if (data.fogueira) setFogueira(data.fogueira)
      setEstado(data.estado || 'nenhuma')
    } catch {
      setEstado('nenhuma')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) carregar()
  }, [user, carregar])

  // Breathing animation cycle
  useEffect(() => {
    if (!showBreathing || estado !== 'activa') return
    const interval = setInterval(() => {
      setBreathPhase((p) => (p === 'in' ? 'out' : 'in'))
    }, 4000)
    return () => clearInterval(interval)
  }, [showBreathing, estado])

  async function enviarFaisca() {
    if (!novaFaisca.trim() || !fogueira) return

    setSending(true)
    const res = await fetch('/api/fogueira', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fogueiraId: fogueira.id,
        conteudo: novaFaisca,
      }),
    })

    if (res.ok) {
      setNovaFaisca('')
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
          A acender a fogueira...
        </motion.p>
      </div>
    )
  }

  // No fogueira scheduled — show atmospheric preview
  if (estado === 'nenhuma') {
    return (
      <div className="rounded-2xl border border-brown-100 bg-gradient-to-b from-brown-900 to-[#2a2420] p-8">
        <div className="text-center">
          {/* Animated ember */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <motion.div
              animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-12 w-12 rounded-full bg-gradient-to-t from-[#c9b896] to-[#e8d5b0]"
              style={{ filter: 'blur(8px)' }}
            />
          </div>

          <p className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-cream/30">
            Fogueira
          </p>
          <h3 className="mt-2 font-serif text-xl text-cream/80">
            A fogueira descansa.
          </h3>
          <p className="mx-auto mt-3 max-w-xs font-serif text-sm italic leading-relaxed text-cream/40">
            &ldquo;As brasas ainda estão quentes. Quando a próxima sessão de contemplação colectiva
            for marcada, sentirás o calor.&rdquo;
          </p>
        </div>

        {/* What the fogueira is — explanation */}
        <div className="mt-8 rounded-xl border border-white/5 bg-white/5 p-5">
          <p className="font-sans text-[0.55rem] uppercase tracking-[0.25em] text-cream/30">
            O que é a Fogueira
          </p>
          <div className="mt-3 space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-cream/20">~</span>
              <p className="font-serif text-sm leading-relaxed text-cream/50">
                Um momento de contemplação colectiva — em silêncio, com quem caminha contigo.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-cream/20">~</span>
              <p className="font-serif text-sm leading-relaxed text-cream/50">
                Começa com uma respiração guiada. Depois, partilhas faíscas — pensamentos curtos, sem nome.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-sm text-cream/20">~</span>
              <p className="font-serif text-sm leading-relaxed text-cream/50">
                A fogueira acende-se em datas especiais. Quando estiver activa, sentirás o convite.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Upcoming fogueira
  if (estado === 'agendada' && fogueira) {
    const startDate = new Date(fogueira.starts_at)

    return (
      <div className="rounded-2xl border border-brown-100 bg-gradient-to-b from-brown-900 to-[#2a2420] p-8 text-center">
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mx-auto mb-4 h-10 w-10 rounded-full bg-gradient-to-t from-[#c9b896] to-[#e8d5b0]"
          style={{ filter: 'blur(6px)' }}
        />
        <p className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-cream/40">
          Próxima Fogueira
        </p>
        <h3 className="mt-2 font-serif text-xl text-cream/90">
          {fogueira.titulo}
        </h3>
        {fogueira.descricao && (
          <p className="mt-2 font-serif text-sm italic text-cream/50">
            {fogueira.descricao}
          </p>
        )}
        <p className="mt-4 font-sans text-sm text-gold">
          {startDate.toLocaleDateString('pt-PT', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
          {' · '}
          {startDate.toLocaleTimeString('pt-PT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    )
  }

  // Active fogueira
  if (estado === 'activa' && fogueira) {
    return (
      <div className="overflow-hidden rounded-2xl border border-brown-100 bg-gradient-to-b from-brown-900 to-[#2a2420]">
        {/* Breathing exercise opening */}
        <AnimatePresence>
          {showBreathing && (
            <motion.div
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-white/5 p-8 text-center"
            >
              <motion.div
                animate={{
                  scale: breathPhase === 'in' ? 1.4 : 0.8,
                  opacity: breathPhase === 'in' ? 1 : 0.4,
                }}
                transition={{ duration: 4, ease: 'easeInOut' }}
                className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-t from-[#c9b896] to-[#e8d5b0]"
                style={{ filter: 'blur(8px)' }}
              />
              <p className="font-serif text-sm text-cream/60">
                {breathPhase === 'in' ? 'Inspira...' : 'Expira...'}
              </p>

              {fogueira.frase_abertura && (
                <p className="mt-4 font-serif text-base italic text-cream/70">
                  &ldquo;{fogueira.frase_abertura}&rdquo;
                </p>
              )}

              <button
                onClick={() => setShowBreathing(false)}
                className="mt-6 font-sans text-xs text-cream/30 transition-colors hover:text-cream/50"
              >
                Entrar na fogueira
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fogueira space */}
        {!showBreathing && (
          <>
            {/* Header */}
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-cream/30">
                    Fogueira
                  </p>
                  <h3 className="mt-1 font-serif text-lg text-cream/90">
                    {fogueira.titulo}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-[#c9b896]"
                  />
                  <span className="font-sans text-[0.6rem] text-cream/40">
                    Ao vivo
                  </span>
                </div>
              </div>
            </div>

            {/* Sparks */}
            <div className="max-h-80 overflow-y-auto p-6">
              <div className="space-y-4">
                <AnimatePresence>
                  {(fogueira.fogueira_faiscas || []).map((faisca, i) => (
                    <motion.div
                      key={faisca.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl bg-white/5 px-4 py-3"
                    >
                      <p className="font-serif text-sm leading-relaxed text-cream/80">
                        {faisca.conteudo}
                      </p>
                      <p className="mt-1 font-sans text-[0.5rem] text-cream/20">
                        {getTimeAgo(faisca.created_at)}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-white/5 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={novaFaisca}
                  onChange={(e) => setNovaFaisca(e.target.value.slice(0, 200))}
                  onKeyDown={(e) => e.key === 'Enter' && enviarFaisca()}
                  placeholder="Uma faísca..."
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-sans text-sm text-cream placeholder:text-cream/20 focus:border-gold/30 focus:outline-none"
                />
                <button
                  onClick={enviarFaisca}
                  disabled={!novaFaisca.trim() || sending}
                  className="rounded-lg bg-gold/20 px-4 py-2 font-sans text-xs text-gold transition-colors hover:bg-gold/30 disabled:opacity-40"
                >
                  {sending ? '...' : '~'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  return null
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'agora'
  if (minutes < 60) return `há ${minutes}m`
  return `há ${Math.floor(diff / 3600000)}h`
}
