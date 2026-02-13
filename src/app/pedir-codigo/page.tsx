'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import Link from 'next/link'

export default function PedirCodigoPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    purchaseLocation: '',
    purchaseLocationOther: '',
    proofUrl: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const purchaseLocation =
        formData.purchaseLocation === 'other'
          ? formData.purchaseLocationOther
          : formData.purchaseLocation

      const response = await fetch('/api/codes/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          purchaseLocation,
          proofUrl: formData.proofUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar pedido')
      }

      setSubmitStatus('success')
    } catch (error: any) {
      console.error('Erro ao enviar pedido:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Erro ao enviar pedido. Tenta novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-cream px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-2xl border-2 border-green-200 bg-white p-10 shadow-lg">
            <div className="text-6xl">✅</div>
            <h1 className="mt-6 font-serif text-3xl text-brown-900">
              Pedido recebido!
            </h1>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-700">
              Obrigada, {formData.fullName}!
            </p>
            <p className="mx-auto mt-4 text-sm text-brown-600">
              Recebemos o teu pedido de código. Vais receber:
            </p>
            <div className="mt-6 space-y-2 text-left">
              <div className="flex items-start gap-3 rounded-lg bg-cream p-4">
                <span className="text-xl">📧</span>
                <div>
                  <p className="text-sm font-medium text-brown-900">
                    Confirmação neste email:
                  </p>
                  <p className="text-sm text-brown-600">{formData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-cream p-4">
                <span className="text-xl">🔐</span>
                <div>
                  <p className="text-sm font-medium text-brown-900">
                    Código em até 24h
                  </p>
                  <p className="text-xs text-brown-500">(dias úteis)</p>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-lg bg-sage/10 p-4">
              <p className="text-sm font-medium text-sage-dark">
                Enquanto isso, conhece os ESPELHOS:
              </p>
              <Link
                href="/comprar/espelhos"
                className="mt-3 inline-block rounded-lg bg-sage px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
              >
                Ver Coleção Espelhos
              </Link>
            </div>
            <p className="mt-6 text-xs text-brown-500">
              Qualquer dúvida: +258 851 006 473
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight text-brown-900 sm:text-5xl">
            📦 Compraste o livro físico?
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-600">
            Pede o teu código de acesso digital grátis
          </p>
          <p className="mx-auto mt-4 text-sm text-brown-500">
            O teu livro físico inclui acesso à experiência digital completa. Precisamos apenas
            verificar a tua compra para te enviar o código.
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="bg-cream-dark px-6 pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl border-2 border-brown-200 bg-white shadow-lg">
            <div className="bg-sage px-6 py-4">
              <h2 className="font-serif text-xl text-white">Pedir código</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8">
              {submitStatus === 'error' && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-5">
                {/* Nome completo */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-brown-900">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-brown-300 px-4 py-3 text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brown-900">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-brown-300 px-4 py-3 text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-brown-900">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    placeholder="+258 ..."
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-brown-300 px-4 py-3 text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  />
                </div>

                {/* Onde compraste */}
                <div>
                  <label
                    htmlFor="purchaseLocation"
                    className="block text-sm font-medium text-brown-900"
                  >
                    Onde compraste o livro?
                  </label>
                  <select
                    id="purchaseLocation"
                    value={formData.purchaseLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, purchaseLocation: e.target.value })
                    }
                    className="mt-2 w-full rounded-lg border border-brown-300 px-4 py-3 text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  >
                    <option value="">Seleciona...</option>
                    <option value="livraria">Livraria</option>
                    <option value="online">Online</option>
                    <option value="evento">Evento/Lançamento</option>
                    <option value="other">Outro</option>
                  </select>
                  {formData.purchaseLocation === 'other' && (
                    <input
                      type="text"
                      placeholder="Especifica onde..."
                      value={formData.purchaseLocationOther}
                      onChange={(e) =>
                        setFormData({ ...formData, purchaseLocationOther: e.target.value })
                      }
                      className="mt-2 w-full rounded-lg border border-brown-300 px-4 py-3 text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                    />
                  )}
                </div>

                {/* Comprovativo (opcional) */}
                <div>
                  <label htmlFor="proofUrl" className="block text-sm font-medium text-brown-900">
                    Comprovativo de compra (opcional)
                  </label>
                  <p className="mt-1 text-xs text-brown-500">
                    Link para foto do recibo ou do livro (ex: Google Drive, Dropbox)
                  </p>
                  <input
                    type="url"
                    id="proofUrl"
                    placeholder="https://..."
                    value={formData.proofUrl}
                    onChange={(e) => setFormData({ ...formData, proofUrl: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-brown-300 px-4 py-3 text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-sage-dark disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Pedir código'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Vais receber */}
      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-2xl text-brown-900">⚡ Vais receber:</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-5 text-center shadow-sm">
              <div className="text-3xl">✅</div>
              <p className="mt-3 text-sm font-medium text-brown-900">Confirmação imediata</p>
              <p className="mt-1 text-xs text-brown-600">Por email</p>
            </div>
            <div className="rounded-lg bg-white p-5 text-center shadow-sm">
              <div className="text-3xl">🔐</div>
              <p className="mt-3 text-sm font-medium text-brown-900">Código em até 24h</p>
              <p className="mt-1 text-xs text-brown-600">(dias úteis)</p>
            </div>
            <div className="rounded-lg bg-white p-5 text-center shadow-sm">
              <div className="text-3xl">📖</div>
              <p className="mt-3 text-sm font-medium text-brown-900">Instruções de registo</p>
              <p className="mt-1 text-xs text-brown-600">Passo a passo</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-2xl text-brown-900">
            ❓ Perguntas frequentes
          </h2>
          <div className="mt-8 space-y-4">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="font-medium text-brown-900">Quanto tempo demora?</p>
              <p className="mt-2 text-sm text-brown-600">
                Normalmente enviamos o código em até 24 horas (dias úteis). Se for urgente,
                contacta-nos por WhatsApp.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="font-medium text-brown-900">Preciso do recibo?</p>
              <p className="mt-2 text-sm text-brown-600">
                Não é obrigatório, mas ajuda na verificação rápida. Podes também enviar foto do
                livro que compraste.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="font-medium text-brown-900">E se comprei há muito tempo?</p>
              <p className="mt-2 text-sm text-brown-600">
                Sem problema! Todos os livros físicos têm direito ao acesso digital, não importa
                quando compraste.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="font-medium text-brown-900">Posso pedir para outra pessoa?</p>
              <p className="mt-2 text-sm text-brown-600">
                Sim, desde que tenhas o livro físico. Coloca o email da pessoa que vai usar o
                código.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preferência WhatsApp */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xl italic leading-relaxed text-cream">
            📱 Preferência por WhatsApp?
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-brown-200">
            Contacta diretamente e envia foto do livro ou recibo
          </p>
          <a
            href="https://wa.me/258851006473?text=Olá! Comprei o livro físico e quero o código de acesso digital"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-lg border-2 border-[#25D366] bg-[#25D366] px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#1ea952]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            +258 851 006 473
          </a>
        </div>
      </section>
    </>
  )
}
