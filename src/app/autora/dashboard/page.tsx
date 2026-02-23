'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Stats = {
  totalLeitores: number
  totalReflexoes: number
  reflexoesPorVeu: Record<number, number>
  leitoresPorVeu: Record<number, number>
}

const ADMIN_EMAILS = ["viv.saraiva@gmail.com", "vivianne.saraiva@outlook.com"];

export default function AutoraDashboardPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/entrar')
    } else if (user && isAdmin) {
      carregarStats()
    }
  }, [user, isAdmin, loading, router])

  const carregarStats = async () => {
    // Aqui farias chamadas à API para obter estatísticas
    // Por agora, dados mock
    setStats({
      totalLeitores: 42,
      totalReflexoes: 387,
      reflexoesPorVeu: {
        1: 89,
        2: 76,
        3: 64,
        4: 52,
        5: 41,
        6: 35,
        7: 30,
      },
      leitoresPorVeu: {
        1: 42,
        2: 38,
        3: 33,
        4: 28,
        5: 22,
        6: 18,
        7: 12,
      },
    })
    setLoadingStats(false)
  }

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin text-6xl mb-4">⚬</div>
          <p className="text-stone-600">Carregando...</p>
        </div>
      </div>
    )
  }

  const nomeVeus = [
    "Permanência",
    "Memória",
    "Turbilhão",
    "Esforço",
    "Desolação",
    "Horizonte",
    "Dualidade"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-100 p-6">
      <div className="max-w-7xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-serif text-stone-900 mb-4">
            Olá, Vivianne 💚
          </h1>
          <p className="text-xl text-stone-600">
            Bem-vinda ao teu painel de autora
          </p>
        </motion.div>

        {/* Stats Cards */}
        {loadingStats ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-6xl">⚬</div>
          </div>
        ) : (
          <>
            {/* Stats Principais */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-sm uppercase tracking-wide text-stone-600 mb-2">
                  Total de Leitores
                </h3>
                <p className="text-6xl font-bold text-purple-900 mb-2">
                  {stats?.totalLeitores}
                </p>
                <p className="text-sm text-stone-500">
                  Pessoas a fazer a travessia
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-sm uppercase tracking-wide text-stone-600 mb-2">
                  Total de Reflexões
                </h3>
                <p className="text-6xl font-bold text-purple-900 mb-2">
                  {stats?.totalReflexoes}
                </p>
                <p className="text-sm text-stone-500">
                  Palavras escritas pelos leitores
                </p>
              </motion.div>
            </div>

            {/* Stats por Véu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-12"
            >
              <h2 className="text-2xl font-serif text-stone-900 mb-6">
                Travessia pelos Véus
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map((veuNum) => (
                  <div key={veuNum} className="border-b border-stone-200 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-stone-800">
                        Véu {veuNum}: {nomeVeus[veuNum - 1]}
                      </h3>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-stone-600">
                          👥 {stats?.leitoresPorVeu[veuNum]} leitores
                        </span>
                        <span className="text-stone-600">
                          💭 {stats?.reflexoesPorVeu[veuNum]} reflexões
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-900 to-purple-600 h-full"
                        style={{
                          width: `${(stats?.leitoresPorVeu[veuNum] || 0) / (stats?.totalLeitores || 1) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ações Rápidas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <Link href="/livro">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="text-4xl mb-4">📖</div>
                  <h3 className="text-lg font-medium text-stone-900 mb-2">
                    Ver Mandala
                  </h3>
                  <p className="text-sm text-stone-600">
                    Navegar pela experiência digital
                  </p>
                </div>
              </Link>

              <Link href="/ecossistema">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="text-4xl mb-4">🌿</div>
                  <h3 className="text-lg font-medium text-stone-900 mb-2">
                    Ecossistema
                  </h3>
                  <p className="text-sm text-stone-600">
                    Ver todos os recursos
                  </p>
                </div>
              </Link>

              <Link href="/comunidade">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="text-4xl mb-4">~</div>
                  <h3 className="text-lg font-medium text-stone-900 mb-2">
                    Ecos — Comunidade
                  </h3>
                  <p className="text-sm text-stone-600">
                    Ver a comunidade de ressonância
                  </p>
                </div>
              </Link>

              <Link href="/">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="text-4xl mb-4">🏠</div>
                  <h3 className="text-lg font-medium text-stone-900 mb-2">
                    Site Principal
                  </h3>
                  <p className="text-sm text-stone-600">
                    Voltar à homepage
                  </p>
                </div>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
