"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { toPng } from "html-to-image"
import { VEU_NAMES, VEU_COLORS } from "@/lib/temas"
import { getShareText, getWhatsAppUrl, getTwitterUrl, getHashtagString } from "@/lib/partilha"

type Props = {
  texto: string
  veuNumero: number
  fonte: "livro" | "espelho"
  contexto?: string
  onClose: () => void
}

export default function QuoteShareCard({ texto, veuNumero, fonte, contexto, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  const color = VEU_COLORS[veuNumero] || "#c9b896"
  const veuName = VEU_NAMES[veuNumero] || "Permanência"
  const isEspelho = fonte === "espelho"
  const sourceLabel = isEspelho
    ? "O Espelho da Ilusão"
    : `Véu ${veuNumero}: ${veuName}`

  const shareText = getShareText(texto, veuNumero, contexto || sourceLabel, isEspelho)
  const hashtags = getHashtagString(veuNumero, isEspelho)

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  // Generate PNG blob from card DOM
  const generatePng = useCallback(async (): Promise<Blob | null> => {
    if (!cardRef.current) return null
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 3,
        backgroundColor: "#2a2520",
      })
      const res = await fetch(dataUrl)
      return await res.blob()
    } catch (err) {
      console.error("Error generating image:", err)
      return null
    }
  }, [])

  const handleDownload = useCallback(async () => {
    setDownloading(true)
    const blob = await generatePng()
    if (blob) {
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = `sete-veus-${isEspelho ? "espelho" : `veu-${veuNumero}`}.png`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    }
    setDownloading(false)
  }, [generatePng, veuNumero, isEspelho])

  // Instagram: share image via Web Share API (files), fallback to download
  const [sharingIG, setSharingIG] = useState(false)
  const handleInstagram = useCallback(async () => {
    setSharingIG(true)
    const blob = await generatePng()
    if (!blob) { setSharingIG(false); return }

    const file = new File([blob], "sete-veus.png", { type: "image/png" })

    // Try native share with file (opens share sheet → Instagram Stories/Feed)
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Os Sete Véus do Despertar",
          text: hashtags,
        })
        setSharingIG(false)
        return
      } catch { /* user cancelled */ }
    }

    // Fallback: download the image
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "sete-veus-instagram.png"
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
    setSharingIG(false)
  }, [generatePng, hashtags])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md space-y-5" style={{ animation: "fadeIn 0.3s ease-out" }}>
        {/* Close */}
        <div className="text-right">
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm text-white/60 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        {/* ─── The Card (exported as image) ─────────────────── */}
        <div
          ref={cardRef}
          className="overflow-hidden rounded-2xl"
          style={{
            background: `linear-gradient(160deg, #2a2520 0%, #3d3630 40%, ${color}18 100%)`,
          }}
        >
          <div className="px-8 pb-8 pt-10">
            {/* Brand label */}
            <p
              className="font-sans text-[0.55rem] uppercase tracking-[0.35em]"
              style={{ color }}
            >
              Os Sete Véus do Despertar
            </p>

            {/* Accent line */}
            <div className="mt-4 h-px w-10" style={{ backgroundColor: color + "60" }} />

            {/* Quote */}
            <p className="mt-6 font-serif text-xl leading-relaxed italic text-[#f7f5f0]">
              &ldquo;{texto}&rdquo;
            </p>

            {/* Attribution */}
            <p
              className="mt-6 font-sans text-[0.65rem] uppercase tracking-[0.2em]"
              style={{ color: color + "cc" }}
            >
              &mdash; {contexto || sourceLabel}
            </p>
            <p className="mt-1 font-sans text-[0.55rem] tracking-wide text-[#a09a90]">
              {sourceLabel} &middot; Vivianne dos Santos
            </p>

            {/* Divider */}
            <div className="mt-6 h-px w-full" style={{ backgroundColor: color + "20" }} />

            {/* Hashtags */}
            <p className="mt-4 font-sans text-[0.5rem] leading-relaxed tracking-wide text-[#a09a90]">
              {hashtags}
            </p>

            {/* Site URL */}
            <p
              className="mt-2 font-sans text-[0.55rem] tracking-[0.15em]"
              style={{ color: color + "90" }}
            >
              seteecos.com
            </p>
          </div>
        </div>

        {/* ─── Share Actions ─────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Download image */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-brown-700 shadow-sm transition-all hover:bg-cream disabled:opacity-50"
          >
            <DownloadIcon />
            {downloading ? "A gerar..." : "Guardar imagem"}
          </button>

          {/* Instagram (share image via native share or download) */}
          <button
            onClick={handleInstagram}
            disabled={sharingIG}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#833AB4]/20 via-[#E1306C]/20 to-[#F77737]/20 px-5 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-[#E1306C] transition-all hover:from-[#833AB4]/30 hover:via-[#E1306C]/30 hover:to-[#F77737]/30 disabled:opacity-50"
          >
            <InstagramIcon />
            {sharingIG ? "A gerar..." : "Instagram"}
          </button>

          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl(shareText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 px-5 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-[#25D366] transition-all hover:bg-[#25D366]/25"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>

          {/* Twitter/X */}
          <a
            href={getTwitterUrl(shareText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-white/70 transition-all hover:bg-white/20 hover:text-white"
          >
            <XIcon />
            X
          </a>

          {/* Copy text */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-white/70 transition-all hover:bg-white/20 hover:text-white"
          >
            <CopyIcon />
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        {/* Hint */}
        <p className="text-center font-sans text-[0.6rem] tracking-wide text-white/30">
          Guarda a imagem e partilha nas stories ou no feed
        </p>
      </div>
    </div>
  )
}

// ─── SVG Icons (inline to avoid deps) ──────────────────────

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}
