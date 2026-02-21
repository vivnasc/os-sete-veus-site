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

type ApprovedInfo = {
  requestId: string
  code: string
  email: string
  fullName: string
  whatsapp?: string
}

export default function AutoraCodigosPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [pendingRequests, setPendingRequests] = useState<CodeRequest[]>([])
  const [allRequests, setAllRequests] = useState<CodeRequest[]>([])
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
  const [recentlyApproved, setRecentlyApproved] = useState<ApprovedInfo | null>(null)

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
        setAllRequests(requestsData.requests)
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

  const buildWhatsAppUrl = (phone: string, code: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9+]/g, '').replace(/^\+/, '')
    const message = encodeURIComponent(
      `Ola ${name}!\n\n` +
      `O teu pedido de codigo de acesso digital foi aprovado.\n\n` +
      `O teu codigo: *${code}*\n\n` +
      `Para activar o acesso:\n` +
      `1. Vai a seteveus.space/registar-livro\n` +
      `2. Insere o codigo ${code}\n` +
      `3. Coloca o teu email e cria uma password\n` +
      `4. Acesso imediato!\n\n` +
      `Qualquer duvida, estou aqui.`
    )
    return `https://wa.me/${cleanPhone}?text=${message}`
  }

  const buildEmailBody = (code: string, name: string) => {
    const subject = encodeURIComponent('O teu codigo de acesso digital - Os Sete Veus')
    const body = encodeURIComponent(
      `Ola ${name},\n\n` +
      `O teu pedido de codigo de acesso digital foi aprovado.\n\n` +
      `O teu codigo: ${code}\n\n` +
      `Para activar o acesso:\n` +
      `1. Vai a seteveus.space/registar-livro\n` +
      `2. Insere o codigo ${code}\n` +
      `3. Coloca o teu email e cria uma password\n` +
      `4. Acesso imediato!\n\n` +
      `Qualquer duvida, responde a este email.\n\n` +
      `Com carinho,\nVivianne`
    )
    return `mailto:?subject=${subject}&body=${body}`
  }

  const handleApprove = async (request: CodeRequest) => {
    if (!confirm(`Aprovar pedido de ${request.full_name} e gerar codigo?`)) return

    try {
      const res = await fetch('/api/codes/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: request.id }),
      })

      const data = await res.json()

      if (data.success) {
        setRecentlyApproved({
          requestId: request.id,
          code: data.code.code,
          email: request.email,
          fullName: request.full_name,
          whatsapp: request.whatsapp,
        })
        loadData()
      } else {
        alert('Erro ao aprovar: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao aprovar:', error)
      alert('Erro ao aprovar pedido')
    }
  }

  const handleReject = async (requestId: string) => {
    const reason = prompt('Motivo da rejeicao (opcional):')
    if (reason === null) return // Cancelou

    try {
      const res = await fetch('/api/codes/approve', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, reason }),
      })

      const data = await res.json()

      if (data.success) {
        loadData()
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
        loadData()
      } else {
        alert('Erro ao gerar codigo: ' + data.error)
      }
    } catch (error) {
      console.error('Erro ao gerar codigo:', error)
      alert('Erro ao gerar codigo')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
            Gestao de Codigos
          </h1>
          <p className="mt-2 text-sm text-brown-600">
            Pedidos de codigo de acesso ao livro digital
          </p>
        </div>

        {/* Codigo aprovado — painel de envio */}
        {recentlyApproved && (
          <div className="mb-8 rounded-2xl border-2 border-green-300 bg-green-50 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-serif text-lg text-green-900">
                  Codigo gerado para {recentlyApproved.fullName}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <code className="rounded bg-white px-4 py-2 font-mono text-xl font-bold text-brown-900 shadow-sm">
                    {recentlyApproved.code}
                  </code>
                  <button
                    onClick={() => copyToClipboard(recentlyApproved.code)}
                    className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-brown-700 shadow-sm transition-colors hover:bg-brown-50"
                  >
                    Copiar
                  </button>
                </div>
              </div>
              <button
                onClick={() => setRecentlyApproved(null)}
                className="text-green-600 hover:text-green-800"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-green-800">Envia o codigo:</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {recentlyApproved.whatsapp && (
                <a
                  href={buildWhatsAppUrl(recentlyApproved.whatsapp, recentlyApproved.code, recentlyApproved.fullName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 font-sans text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1ea952]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar por WhatsApp ({recentlyApproved.whatsapp})
                </a>
              )}
              <a
                href={buildEmailBody(recentlyApproved.code, recentlyApproved.fullName) + '&to=' + encodeURIComponent(recentlyApproved.email)}
                className="inline-flex items-center gap-2 rounded-lg bg-brown-700 px-5 py-2.5 font-sans text-sm font-bold text-white shadow-sm transition-all hover:bg-brown-800"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Enviar por email ({recentlyApproved.email})
              </a>
            </div>

            <div className="mt-4 rounded-lg bg-white/60 p-3">
              <p className="text-xs text-green-700">
                Link directo para registo: seteveus.space/registar-livro?code={recentlyApproved.code}
              </p>
              <button
                onClick={() => copyToClipboard(`https://seteveus.space/registar-livro?code=${recentlyApproved.code}`)}
                className="mt-1 text-xs font-medium text-green-800 underline hover:text-green-900"
              >
                Copiar link completo
              </button>
            </div>
          </div>
        )}

        {/* Estatisticas */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-brown-600">Total Codigos</p>
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
        <div className="mb-6 flex gap-2 overflow-x-auto border-b border-brown-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`whitespace-nowrap px-6 py-3 font-sans text-sm font-medium transition-colors ${
              activeTab === 'pending'
                ? 'border-b-2 border-sage text-sage'
                : 'text-brown-600 hover:text-brown-900'
            }`}
          >
            Pedidos Pendentes ({stats.pending})
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`whitespace-nowrap px-6 py-3 font-sans text-sm font-medium transition-colors ${
              activeTab === 'manual'
                ? 'border-b-2 border-sage text-sage'
                : 'text-brown-600 hover:text-brown-900'
            }`}
          >
            Gerar Manual
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`whitespace-nowrap px-6 py-3 font-sans text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'border-b-2 border-sage text-sage'
                : 'text-brown-600 hover:text-brown-900'
            }`}
          >
            Todos os Codigos
          </button>
        </div>

        {/* Tab: Pedidos Pendentes */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <p className="text-brown-600">Nenhum pedido pendente</p>
                <p className="mt-2 text-sm text-brown-400">Os novos pedidos aparecem aqui automaticamente</p>
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-lg border border-brown-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-medium text-brown-900">
                          {request.full_name}
                        </p>
                        <span className="text-xs text-brown-400">
                          {formatDate(request.created_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-brown-600">
                        {request.email}
                      </p>
                      {request.whatsapp && (
                        <p className="mt-1 text-sm text-brown-600">
                          WhatsApp: {request.whatsapp}
                        </p>
                      )}
                      {request.purchase_location && (
                        <p className="mt-1 text-sm text-brown-600">
                          Comprou em: {request.purchase_location}
                        </p>
                      )}
                      {request.proof_url && (
                        <a
                          href={request.proof_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 rounded bg-brown-50 px-3 py-1.5 text-sm text-sage hover:bg-brown-100"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6.75v14.25A2.25 2.25 0 003.75 21z" />
                          </svg>
                          Ver comprovativo
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(request)}
                        className="rounded-lg bg-green-600 px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-green-700"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="rounded-lg border border-red-300 bg-white px-4 py-2 font-sans text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Rejeitar
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
                Gerar codigo manualmente
              </h2>
              <p className="mt-2 text-sm text-brown-600">
                Para clientes que contactaram via WhatsApp ou pessoalmente
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
                  {isGenerating ? 'Gerando...' : 'Gerar codigo unico'}
                </button>
              </form>

              {generatedCode && (
                <div className="mt-6 rounded-lg border-2 border-green-200 bg-green-50 p-6">
                  <p className="text-sm font-medium text-green-900">
                    Codigo gerado com sucesso!
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <code className="flex-1 rounded bg-white px-4 py-3 font-mono text-lg font-bold text-brown-900">
                      {generatedCode}
                    </code>
                    <button
                      onClick={() => copyToClipboard(generatedCode)}
                      className="rounded-lg bg-sage px-4 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-sage-dark"
                    >
                      Copiar
                    </button>
                  </div>
                  <div className="mt-4 rounded-lg bg-white/60 p-3">
                    <p className="text-xs text-green-700">
                      Link directo: seteveus.space/registar-livro?code={generatedCode}
                    </p>
                    <button
                      onClick={() => copyToClipboard(`https://seteveus.space/registar-livro?code=${generatedCode}`)}
                      className="mt-1 text-xs font-medium text-green-800 underline hover:text-green-900"
                    >
                      Copiar link completo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Todos os Codigos */}
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
                Nao usados
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

            {/* Tabela de codigos */}
            <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-brown-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-brown-700">
                      Codigo
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
                        Nenhum codigo gerado ainda
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
                            {code.email || '\u2014'}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {code.status === 'used' && (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Usado
                              </span>
                            )}
                            {code.status === 'unused' && (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                Pendente
                              </span>
                            )}
                            {code.status === 'expired' && (
                              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                Expirado
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
