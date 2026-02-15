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

// Sample ecos shown when the community is still empty
const ECOS_EXEMPLO: Eco[] = [
  {
    id: 'demo-1',
    veu_numero: 1,
    capitulo: 1,
    conteudo: 'ok isto bateu forte. acordei hoje e fiz exactamente a mesma coisa que faço há 3 anos. o mesmo café, o mesmo caminho, a mesma cara no espelho. e pensei: quando foi a ultima vez que fiz algo diferente? tipo... realmente diferente?',
    temas: ['automatismo', 'despertar'],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reconhecimentos_count: 7,
    reconhecido_por_mim: false,
    is_mine: false,
  },
  {
    id: 'demo-2',
    veu_numero: 1,
    capitulo: 3,
    conteudo: 'chorei no banho. outra vez. mas desta vez não foi por tristeza, foi por reconhecimento. a personagem do capítulo 3 sou EU. literalmente eu. assustador.',
    temas: ['vulnerabilidade', 'identidade'],
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    reconhecimentos_count: 12,
    reconhecido_por_mim: false,
    is_mine: false,
  },
  {
    id: 'demo-3',
    veu_numero: 1,
    capitulo: 2,
    conteudo: 'o meu marido perguntou-me ontem "estás bem?" e eu disse que sim. automaticamente. nem pensei. e depois fiquei a noite toda acordada a perguntar-me se estava mesmo',
    temas: ['automatismo', 'relacoes'],
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    reconhecimentos_count: 9,
    reconhecido_por_mim: false,
    is_mine: false,
  },
  {
    id: 'demo-4',
    veu_numero: 2,
    capitulo: 5,
    conteudo: 'a minha mãe nunca me disse que tinha orgulho de mim. e eu passo a vida a tentar ouvir isso de toda a gente. do chefe, das amigas, do meu namorado. é cansativo.',
    temas: ['relacoes', 'desejo'],
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    reconhecimentos_count: 15,
    reconhecido_por_mim: false,
    is_mine: false,
  },
  {
    id: 'demo-5',
    veu_numero: 1,
    capitulo: 7,
    conteudo: 'acabei o espelho e não sei o que fazer comigo. tipo. estou a olhar para a minha sala e tudo parece igual mas eu não sou igual. que sensação estranha.',
    temas: ['despertar', 'impermanencia'],
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    reconhecimentos_count: 6,
    reconhecido_por_mim: false,
    is_mine: false,
  },
  {
    id: 'demo-6',
    veu_numero: 3,
    capitulo: 10,
    conteudo: 'fiz a prática de respiração e consegui ficar parada 2 minutos sem pegar no telemóvel. parece patético mas para mim foi ENORME. 2 minutos de silêncio. uau.',
    temas: ['presenca'],
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    reconhecimentos_count: 11,
    reconhecido_por_mim: false,
    is_mine: false,
  },
]

export default function EcosFeed() {
  const { user } = useAuth()
  const [ecos, setEcos] = useState<Eco[]>([])
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)
  const [selectedVeu, setSelectedVeu] = useState<number | null>(null)
  const [sussurroEcoId, setSussurroEcoId] = useState<string | null>(null)
  const [fioInvisivel, setFioInvisivel] = useState<string | null>(null)
  const [guardados, setGuardados] = useState<Set<string>>(new Set())

  const carregarEcos = useCallback(async () => {
    const url = selectedVeu ? `/api/ecos?veu=${selectedVeu}` : '/api/ecos'
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (data.ecos && data.ecos.length > 0) {
        setEcos(data.ecos)
        setIsDemo(false)
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
      } else {
        // Show sample ecos when community is empty
        const filtered = selectedVeu
          ? ECOS_EXEMPLO.filter((e) => e.veu_numero === selectedVeu)
          : ECOS_EXEMPLO
        setEcos(filtered)
        setIsDemo(true)
      }
    } catch {
      // Fallback to sample data on network error
      setEcos(ECOS_EXEMPLO)
      setIsDemo(true)
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

      {/* Demo mode banner */}
      {!loading && isDemo && ecos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-sage/20 bg-sage/5 px-5 py-4 text-center"
        >
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-sage">
            Pré-visualização
          </p>
          <p className="mt-1 font-serif text-sm text-brown-500">
            Estes são exemplos do que encontrarás aqui. Quando libertares uma reflexão como eco, ela junta-se a este espaço — anónima e impermanente.
          </p>
        </motion.div>
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
              isDemo={isDemo}
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
