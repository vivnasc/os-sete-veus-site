'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import EcosFeed from '@/components/comunidade/EcosFeed'
import MareConsciencia from '@/components/comunidade/MareConsciencia'
import MarcasCaminho from '@/components/comunidade/MarcasCaminho'
import CirculoEspelho from '@/components/comunidade/CirculoEspelho'
import Fogueira from '@/components/comunidade/Fogueira'
import SussurrosNotification from '@/components/comunidade/SussurrosNotification'

type Tab = 'ecos' | 'mare' | 'circulo' | 'fogueira'

export default function ComunidadePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('ecos')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/entrar')
    }
  }, [user, authLoading, router])

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-serif text-sm italic text-brown-400"
        >
          A abrir o espaço...
        </motion.p>
      </div>
    )
  }

  const tabs: { id: Tab; label: string; sublabel: string }[] = [
    { id: 'ecos', label: 'Ecos', sublabel: 'Reflexões anónimas' },
    { id: 'mare', label: 'Maré', sublabel: 'Consciência colectiva' },
    { id: 'circulo', label: 'Círculo', sublabel: 'Espelho partilhado' },
    { id: 'fogueira', label: 'Fogueira', sublabel: 'Contemplação' },
  ]

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-sage"
          >
            Comunidade
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-serif text-4xl text-brown-900"
          >
            Ecos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 font-serif text-base text-brown-500"
          >
            Aqui, a conexão acontece por reconhecimento. Não por interação.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-1 font-serif text-sm italic text-brown-400"
          >
            Tudo é anónimo. Tudo é impermanente. Como os véus.
          </motion.p>
        </div>

        {/* Navigation tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-1 rounded-2xl bg-cream-dark p-1.5"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 rounded-xl px-3 py-3 text-center transition-all ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-white/50'
              }`}
            >
              <span
                className={`block font-sans text-xs font-medium ${
                  activeTab === tab.id ? 'text-brown-900' : 'text-brown-500'
                }`}
              >
                {tab.label}
              </span>
              <span
                className={`mt-0.5 block font-sans text-[0.5rem] ${
                  activeTab === tab.id ? 'text-brown-400' : 'text-brown-300'
                }`}
              >
                {tab.sublabel}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {activeTab === 'ecos' && (
              <motion.div
                key="ecos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Marcas no Caminho — shown alongside ecos */}
                <div className="mb-6">
                  <MarcasCaminho />
                </div>
                <EcosFeed />
              </motion.div>
            )}

            {activeTab === 'mare' && (
              <motion.div
                key="mare"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <MareConsciencia />
              </motion.div>
            )}

            {activeTab === 'circulo' && (
              <motion.div
                key="circulo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CirculoEspelho />
              </motion.div>
            )}

            {activeTab === 'fogueira' && (
              <motion.div
                key="fogueira"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Fogueira />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-serif text-sm italic text-brown-400">
            &ldquo;Não precisas de mudar tudo. Precisas apenas de começar a ouvir-te.&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Sussurros notification (appears when you have unread whispers) */}
      <SussurrosNotification />
    </section>
  )
}
