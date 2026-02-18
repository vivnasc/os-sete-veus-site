// Sharing utilities for quote cards
// Hashtags, share text generation, social URLs

import { VEU_NAMES } from './temas'

// ─── Hashtags ────────────────────────────────────────────────

const BASE_HASHTAGS = ['#OsSeteVéus', '#SeteEcos', '#Despertar']

const VEU_HASHTAGS: Record<number, string[]> = {
  1: ['#Identidade', '#QuemSouEu', '#Permanência'],
  2: ['#Memória', '#SoltarOPassado', '#Narrativa'],
  3: ['#Presença', '#Silêncio', '#Turbilhão'],
  4: ['#Descansar', '#Autocuidado', '#Pausa'],
  5: ['#Vazio', '#Coragem', '#Renascer'],
  6: ['#SemFim', '#Horizonte', '#Intuição'],
  7: ['#Unidade', '#Centro', '#Inteireza'],
}

const ESPELHO_HASHTAGS = ['#EspelhoDaIlusão', '#FicçãoQueAcorda']

export function getHashtags(veuNumero: number, isEspelho = false): string[] {
  const tags = [...BASE_HASHTAGS, ...(VEU_HASHTAGS[veuNumero] || [])]
  if (isEspelho) tags.push(...ESPELHO_HASHTAGS)
  return tags
}

export function getHashtagString(veuNumero: number, isEspelho = false): string {
  return getHashtags(veuNumero, isEspelho).join(' ')
}

// ─── Share text ──────────────────────────────────────────────

export function getShareText(
  quote: string,
  veuNumero: number,
  source?: string,
  isEspelho = false,
): string {
  const hashtags = getHashtagString(veuNumero, isEspelho)
  const attribution = source || `Os Sete Véus do Despertar — Véu ${veuNumero}: ${VEU_NAMES[veuNumero]}`
  return `"${quote}"\n\n— ${attribution}\n\n${hashtags}\n\nDescobre o teu véu: seteveus.space/recursos/teste`
}

// ─── Social URLs ─────────────────────────────────────────────

const SITE_URL = 'https://seteveus.space/recursos/teste'

export function getWhatsAppUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function getTwitterUrl(text: string): string {
  // Twitter has a 280 char limit — truncate if needed
  const truncated = text.length > 260 ? text.slice(0, 257) + '...' : text
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(truncated)}&url=${encodeURIComponent(SITE_URL)}`
}
