'use client'

import { useState } from 'react'

export default function SeedPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<string>('')
  const [checkResult, setCheckResult] = useState<string>('')

  async function handleSeed() {
    setStatus('loading')
    setResult('')
    try {
      const res = await fetch('/api/admin/seed-comunidade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'seed-sete-veus-2025' }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('success')
        setResult(
          `Ghost users: ${data.summary.ghostUsers}\n` +
          `Ecos inseridos: ${data.summary.ecos}\n` +
          `Reconhecimentos: ${data.summary.reconhecimentos}\n` +
          `Marcas: ${data.summary.marcas}`
        )
      } else {
        setStatus('error')
        setResult(data.error || 'Erro desconhecido')
      }
    } catch (err) {
      setStatus('error')
      setResult('Erro de rede: ' + String(err))
    }
  }

  async function handleCheck() {
    try {
      const res = await fetch('/api/admin/seed-comunidade')
      const data = await res.json()
      setCheckResult(`Ecos activos: ${data.ecosActivos}\nGhost users: ${data.ghostUsers}`)
    } catch {
      setCheckResult('Erro ao verificar')
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Seed da Comunidade</h1>

      <p style={{ marginBottom: '20px', color: '#666' }}>
        Isto vai criar utilizadores fictícios e popular a comunidade com ecos realistas.
        Só precisa de correr <strong>uma vez</strong>.
      </p>

      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={handleCheck}
          style={{
            padding: '10px 20px',
            background: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Verificar estado actual
        </button>
        {checkResult && (
          <pre style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '6px' }}>
            {checkResult}
          </pre>
        )}
      </div>

      <div>
        <button
          onClick={handleSeed}
          disabled={status === 'loading'}
          style={{
            padding: '14px 28px',
            background: status === 'loading' ? '#ccc' : status === 'success' ? '#4a9' : '#8b6f47',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: status === 'loading' ? 'wait' : 'pointer',
            fontSize: '16px',
          }}
        >
          {status === 'loading' ? 'A criar ecos...' : status === 'success' ? 'Feito!' : 'Popular comunidade'}
        </button>

        {result && (
          <pre style={{
            marginTop: '15px',
            padding: '15px',
            background: status === 'error' ? '#fee' : '#efe',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
          }}>
            {result}
          </pre>
        )}
      </div>

      <p style={{ marginTop: '30px', fontSize: '12px', color: '#999' }}>
        Depois de correr, podes apagar esta p&aacute;gina. Os ecos expiram naturalmente ap&oacute;s 30 dias.
      </p>
    </div>
  )
}
