'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PedirCodigoPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    purchaseLocation: '',
    purchaseLocationOther: '',
  })
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string | null>(null)
  const [proofUrl, setProofUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/heic'].includes(file.type)) {
      setErrorMessage('Tipo de ficheiro não suportado. Usa JPG, PNG ou WebP.')
      return
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Ficheiro demasiado grande. Máximo 5MB.')
      return
    }

    setProofFile(file)
    setErrorMessage('')

    // Criar preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setProofPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeFile = () => {
    setProofFile(null)
    setProofPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const uploadProofPhoto = async (): Promise<string | null> => {
    if (!proofFile) return null

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', proofFile)

      const res = await fetch('/api/upload-proof', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao enviar foto')
      }

      return data.url
    } catch (error: any) {
      console.error('Erro ao enviar foto:', error)
      // Não bloquear o pedido se o upload falhar
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Upload da foto primeiro (se existir)
      let finalProofUrl = proofUrl
      if (proofFile) {
        const uploadedUrl = await uploadProofPhoto()
        if (uploadedUrl) {
          finalProofUrl = uploadedUrl
        }
      }

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
          proofUrl: finalProofUrl,
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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
              <svg className="h-7 w-7 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mt-6 font-serif text-3xl text-brown-900">
              Pedido recebido!
            </h1>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-brown-700">
              Obrigada, {formData.fullName}!
            </p>

            <div className="mt-6 space-y-2 text-left">
              <div className="flex items-start gap-3 rounded-lg bg-cream p-4">
                <span className="mt-0.5 text-sage">~</span>
                <div>
                  <p className="text-sm font-medium text-brown-900">
                    Vamos verificar a tua compra
                  </p>
                  <p className="text-xs text-brown-600">Normalmente em menos de 24h</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-cream p-4">
                <span className="mt-0.5 text-sage">~</span>
                <div>
                  <p className="text-sm font-medium text-brown-900">
                    Recebes o código por WhatsApp ou email
                  </p>
                  <p className="text-sm text-brown-600">{formData.email}</p>
                  {formData.whatsapp && (
                    <p className="text-sm text-brown-600">{formData.whatsapp}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-cream p-4">
                <span className="mt-0.5 text-sage">~</span>
                <div>
                  <p className="text-sm font-medium text-brown-900">
                    Usas o código para criar a tua conta
                  </p>
                  <p className="text-xs text-brown-600">Acesso imediato ao conteúdo digital</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-sage/10 p-4">
              <p className="text-sm font-medium text-sage-dark">
                Já tens um código?
              </p>
              <Link
                href="/registar-livro"
                className="mt-3 inline-block rounded-lg bg-sage px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
              >
                Registar código
              </Link>
            </div>

            <p className="mt-6 text-xs text-brown-500">
              Qualquer dúvida: +258 845 243 875
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-sage">
            Livro físico
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-brown-900 sm:text-5xl">
            Pede o teu código de acesso digital
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-brown-600">
            Se compraste o livro físico, tens direito a acesso gratuito
            ao conteúdo digital. Preenche o formulário abaixo.
          </p>
        </div>
      </section>

      {/* 3 passos visuais */}
      <section className="bg-cream px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="relative rounded-xl border-2 border-sage/30 bg-white p-5 text-center shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">
                1
              </div>
              <p className="mt-3 text-sm font-medium text-brown-900">Preenche o formulário</p>
              <p className="mt-1 text-xs text-brown-500">Nome, email e foto do livro</p>
            </div>
            <div className="rounded-xl border border-brown-100 bg-white p-5 text-center shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brown-200 text-sm font-bold text-brown-700">
                2
              </div>
              <p className="mt-3 text-sm font-medium text-brown-900">Verificamos a compra</p>
              <p className="mt-1 text-xs text-brown-500">Normalmente em menos de 24h</p>
            </div>
            <div className="rounded-xl border border-brown-100 bg-white p-5 text-center shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brown-200 text-sm font-bold text-brown-700">
                3
              </div>
              <p className="mt-3 text-sm font-medium text-brown-900">Recebes o código</p>
              <p className="mt-1 text-xs text-brown-500">Por WhatsApp ou email</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="bg-cream-dark px-6 pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl border-2 border-brown-200 bg-white shadow-lg">
            <div className="bg-sage px-6 py-4">
              <h2 className="font-serif text-xl text-white">Pedir código de acesso</h2>
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
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    required
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
                    <option value="whatsapp">Encomenda via WhatsApp</option>
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

                {/* Upload de comprovativo */}
                <div>
                  <label className="block text-sm font-medium text-brown-900">
                    Foto do livro ou recibo <span className="text-xs text-brown-400">(opcional mas ajuda)</span>
                  </label>
                  <p className="mt-1 text-xs text-brown-500">
                    Tira uma foto ao teu livro ou ao recibo de compra
                  </p>

                  {proofPreview ? (
                    <div className="mt-3">
                      <div className="relative inline-block rounded-lg border border-brown-200 overflow-hidden">
                        <img
                          src={proofPreview}
                          alt="Comprovativo"
                          className="h-40 w-auto object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeFile}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-green-600">
                        Foto pronta para enviar
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/heic"
                        capture="environment"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="proof-upload"
                      />
                      <div className="flex gap-3">
                        <label
                          htmlFor="proof-upload"
                          className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-brown-300 bg-brown-50 px-5 py-3 text-sm text-brown-700 transition-colors hover:border-sage hover:bg-sage/5"
                        >
                          <svg className="h-5 w-5 text-brown-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                          </svg>
                          Tirar foto ou escolher
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="mt-8 w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-sage-dark disabled:opacity-50"
              >
                {isUploading
                  ? 'A enviar foto...'
                  : isSubmitting
                    ? 'A enviar pedido...'
                    : 'Pedir código de acesso'}
              </button>
            </form>
          </div>

          {/* Ja tens codigo */}
          <div className="mt-6 rounded-xl border border-sage/30 bg-sage/5 p-6 text-center">
            <p className="text-sm font-medium text-brown-900">Já tens um código?</p>
            <p className="mt-1 text-xs text-brown-600">
              Se já recebeste o teu código LIVRO-XXXXX, regista-o directamente
            </p>
            <Link
              href="/registar-livro"
              className="mt-3 inline-block rounded-lg border-2 border-sage bg-transparent px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
            >
              Registar código
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-2xl text-brown-900">
            Perguntas frequentes
          </h2>
          <div className="mt-8 space-y-4">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="font-medium text-brown-900">Quanto tempo demora a receber o código?</p>
              <p className="mt-2 text-sm text-brown-600">
                Normalmente enviamos o código em até 24 horas (dias úteis). Se for urgente,
                contacta-nos por WhatsApp.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="font-medium text-brown-900">Preciso de enviar foto?</p>
              <p className="mt-2 text-sm text-brown-600">
                Não é obrigatório, mas ajuda a verificar mais rápido. Podes tirar uma foto
                ao teu livro ou ao recibo de compra.
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
              <p className="font-medium text-brown-900">O que recebo com o acesso digital?</p>
              <p className="mt-2 text-sm text-brown-600">
                Recebes acesso completo ao livro &ldquo;Os 7 Véus do Despertar&rdquo; em formato digital,
                incluindo a Comunidade dos Sete Véus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp alternativo */}
      <section className="bg-gradient-to-b from-brown-800 to-brown-900 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xl italic leading-relaxed text-cream">
            Preferes falar directamente?
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-brown-200">
            Contacta-nos e envia foto do livro ou recibo
          </p>
          <a
            href="https://wa.me/258845243875?text=Olá! Comprei o livro físico e quero o código de acesso digital"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-lg border-2 border-[#25D366] bg-[#25D366] px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#1ea952]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            +258 845 243 875
          </a>
        </div>
      </section>
    </>
  )
}
