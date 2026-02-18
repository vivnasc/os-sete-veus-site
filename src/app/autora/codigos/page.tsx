'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

type CodeRequest = {
  id: string
  full_name: string
  email: string
  whatsapp?: string
  purchase_location?: string
  proof_url?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

type Code = {
  id: string
  code: string
  email?: string
  status: 'unused' | 'used' | 'expired'
  generated_at: string
  used_at?: string
  created_by: string
  notes?: string
}

export default function AutoraCodigosPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [pendingRequests, setPendingRequests] = useState<CodeRequest[]>([])
  const [allCodes, setAllCodes] = useState<Code[]>([])
  const [stats, setStats] = useState({
    total: 0,
    used: 0,
    pending: 0,
    today: 0,
  })
  const [manualEmail, setManualEmail] = useState('')
  const [manualNotes, setManualNotes] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'pending' | 'manual' | 'all'>('pending')
  const [filter, setFilter] = useState<'all' | 'unused' | 'used'>('all')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/entrar')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      // Carregar pedidos pendentes
      const requestsRes = await fetch('/api/codes/request')
      const requestsData = await requestsRes.json()
      let pending: CodeRequest[] = []

      if (requestsData.success) {
        pending = requestsData.requests.filter(
          (r: CodeRequest) => r.status === 'pending'
        )
        setPendingRequests(pending)
      }

      // Carregar todos os codigos e stats reais
      try {
        const codesRes = await fetch('/api/codes/list')
        if (codesRes.ok) {
          const codesData = await codesRes.json()
          if (codesData.success) {
            setAllCodes(codesData.codes || [])
            setStats({
              total: codesData.stats.total,
              used: codesData.stats.used,
              pending: pending.length,
              today: codesData.stats.today,
            })
            return
          }
        }
      } catch {
        // Fallback se a API falhar
      }

      setStats({
        total: 0,
        used: 0,
        pending: pending.length,
        today: 0,
      })
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const handleApprove = async (requestId: string) => {
    if (!confirm('Aprovar este pedido e gerar código?')) return

    try {
      const res = await fetch('/api/codes/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      })

      const data = await res.json()

      if (data.success) {
        alert(`Código gerado: ${data.code.code}\n\nEmail enviado para ${data.code.email}`)
        loadData() // Recarregar dados
      } else {
        alert('Erro ao aprovar: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao aprovar:', error)
      alert('Erro ao aprovar pedido')
    }
  }

  const handleReject = async (requestId: string) => {
    const reason = prompt('Motivo da rejeição (opcional):')
    if (reason === null) return // Cancelou

    try {
      const res = await fetch('/api/codes/approve', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, reason }),
      })

      const data = await res.json()

      if (data.success) {
        alert('Pedido rejeitado')
        loadData() // Recarregar dados
      } else {
        alert('Erro ao rejeitar: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao rejeitar:', error)
      alert('Erro ao rejeitar pedido')
    }
  }

  const handleGenerateManual = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setGeneratedCode('')

    try {
      const res = await fetch('/api/codes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: manualEmail || null,
          notes: manualNotes || null,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setGeneratedCode(data.code.code)
        setManualEmail('')
        setManualNotes('')
        loadData() // Recarregar dados
      } else {
        alert('Erro ao gerar código: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao gerar código:', error)
      alert('Erro ao gerar código')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copiado!')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-brown-600">Carregando...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-brown-900">
            Gestão de Códigos
          </h1>
          <p className="mt-2 text-sm text-brown-600">
            Painel de administração dos códigos de acesso ao livro digital
          </p>
        </div>

        {/* Estatísticas */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-brown-600">Total Códigos</p>
            <p className="mt-2 font-serif text-3xl font-bold text-brown-900">
              {stats.total}
            </p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-brown-600">Usados</p>
            <p className="mt-2 font-serif text-3xl font-bold text-green-600">
              {stats.used}
            </p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-brown-600">Pedidos Pendentes</p>
            <p className="mt-2 font-serif text-3xl font-bold text-orange-600">
              {stats.pending}
            </p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-brown-600">Hoje</p>
            <p className="mt-2 font-serif text-3xl font-bold text-sage">
              {stats.today}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-brown-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 font-sans text-sm font-medium transition-colors ${
              activeTab === 'pending'
                ? 'border-b-2 border-sage text-sage'
                : 'text-brown-600 hover:text-brown-900'
            }`}
          >
            📬 Pedidos Pendentes ({stats.pending})
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-3 font-sans text-sm font-medium transition-colors ${
              activeTab === 'manual'
                ? 'border-b-2 border-sage text-sage'
                : 'text-brown-600 hover:text-brown-900'
            }`}
          >
            ➕ Gerar Manual
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-sans text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'border-b-2 border-sage text-sage'
                : 'text-brown-600 hover:text-brown-900'
            }`}
          >
            📊 Todos os Códigos
          </button>
        </div>

        {/* Tab: Pedidos Pendentes */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <p className="text-brown-600">Nenhum pedido pendente 🎉</p>
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-lg border border-brown-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-brown-900">
                          👤 {request.full_name}
                        </p>
                        <span className="text-xs text-brown-400">
                          {formatDate(request.created_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-brown-600">
                        📧 {request.email}
                      </p>
                      {request.whatsapp && (
                        <p className="mt-1 text-sm text-brown-600">
                          📱 {request.whatsapp}
                        </p>
                      )}
                      {request.purchase_location && (
                        <p className="mt-1 text-sm text-brown-600">
                          🏪 Comprou: {request.purchase_location}
                        </p>
                      )}
                      {request.proof_url && (
                        <p className="mt-1 text-sm">
                          📸{' '}
                          <a
                            href={request.proof_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sage hover:underline"
                          >
                            Ver comprovativo
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="rounded-lg bg-green-600 px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-green-700"
                      >
                        ✅ Aprovar
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="rounded-lg border border-red-300 bg-white px-4 py-2 font-sans text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        ❌ Rejeitar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab: Gerar Manual */}
        {activeTab === 'manual' && (
          <div className="max-w-2xl">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="font-serif text-xl text-brown-900">
                Gerar código manualmente
              </h2>
              <p className="mt-2 text-sm text-brown-600">
                Para clientes que contactaram via WhatsApp
              </p>

              <form onSubmit={handleGenerateManual} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brown-900"
                  >
                    Email do cliente (opcional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-brown-300 px-4 py-3 text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-brown-900"
                  >
                    Notas (opcional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={manualNotes}
                    onChange={(e) => setManualNotes(e.target.value)}
                    placeholder="Ex: Gerado para Maria via WhatsApp"
                    className="mt-2 w-full rounded-lg border border-brown-300 px-4 py-3 text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full rounded-lg bg-sage px-6 py-3 font-sans text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-sage-dark disabled:opacity-50"
                >
                  {isGenerating ? 'Gerando...' : 'Gerar código único'}
                </button>
              </form>

              {generatedCode && (
                <div className="mt-6 rounded-lg border-2 border-green-200 bg-green-50 p-6">
                  <p className="text-sm font-medium text-green-900">
                    ✅ Código gerado com sucesso!
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <code className="flex-1 rounded bg-white px-4 py-3 font-mono text-lg font-bold text-brown-900">
                      {generatedCode}
                    </code>
                    <button
                      onClick={() => copyToClipboard(generatedCode)}
                      className="rounded-lg bg-sage px-4 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-sage-dark"
                    >
                      📋 Copiar
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-green-700">
                    {manualEmail
                      ? `Email enviado para ${manualEmail}`
                      : 'Envia este código manualmente ao cliente'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Todos os Códigos */}
        {activeTab === 'all' && (
          <div>
            {/* Filtros */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-sage text-white'
                    : 'bg-white text-brown-700 hover:bg-brown-50'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('unused')}
                className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
                  filter === 'unused'
                    ? 'bg-sage text-white'
                    : 'bg-white text-brown-700 hover:bg-brown-50'
                }`}
              >
                Não usados
              </button>
              <button
                onClick={() => setFilter('used')}
                className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
                  filter === 'used'
                    ? 'bg-sage text-white'
                    : 'bg-white text-brown-700 hover:bg-brown-50'
                }`}
              >
                Usados
              </button>
            </div>

            {/* Tabela de códigos */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-brown-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-brown-700">
                      Código
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-brown-700">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-brown-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-brown-700">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brown-100">
                  {allCodes.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-brown-600">
                        Nenhum código gerado ainda
                      </td>
                    </tr>
                  ) : (
                    allCodes
                      .filter((code) => filter === 'all' || code.status === filter)
                      .map((code) => (
                        <tr key={code.id} className="hover:bg-brown-50">
                          <td className="px-4 py-3 font-mono text-sm font-medium text-brown-900">
                            {code.code}
                          </td>
                          <td className="px-4 py-3 text-sm text-brown-700">
                            {code.email || '—'}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {code.status === 'used' && (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                ✅ Usado
                              </span>
                            )}
                            {code.status === 'unused' && (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                ⏳ Pendente
                              </span>
                            )}
                            {code.status === 'expired' && (
                              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                ❌ Expirado
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-brown-600">
                            {formatDate(code.generated_at)}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
