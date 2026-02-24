'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AudioPlayerProps = {
  isPlaying: boolean
  isPaused: boolean
  currentIndex: number
  total: number
  rate: number
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
  onRateChange: (rate: number) => void
  onVoiceChange: (voice: SpeechSynthesisVoice) => void
  onClose: () => void
  modoNoturno: boolean
}

const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2]

// Friendly display name for a voice
function voiceLabel(voice: SpeechSynthesisVoice): string {
  // e.g. "Google português do Brasil" → "Google pt-BR"
  // or "Microsoft Francisca - Portuguese (Brazil)" → "Francisca pt-BR"
  const name = voice.name
    .replace(/Microsoft\s+/, '')
    .replace(/Google\s+/, 'Google ')
    .replace(/\s*-\s*Portuguese.*$/, '')
    .replace(/\s*\(.*\)$/, '')
  return `${name} (${voice.lang})`
}

export default function AudioPlayer({
  isPlaying,
  isPaused,
  currentIndex,
  total,
  rate,
  voices,
  selectedVoice,
  onPlay,
  onPause,
  onStop,
  onNext,
  onPrevious,
  onRateChange,
  onVoiceChange,
  onClose,
  modoNoturno,
}: AudioPlayerProps) {
  const [showVoices, setShowVoices] = useState(false)
  const voiceMenuRef = useRef<HTMLDivElement>(null)

  // Close voice menu on outside click
  useEffect(() => {
    if (!showVoices) return
    const handler = (e: MouseEvent) => {
      if (voiceMenuRef.current && !voiceMenuRef.current.contains(e.target as Node)) {
        setShowVoices(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showVoices])

  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0

  const nextRate = () => {
    const idx = VELOCIDADES.indexOf(rate)
    const next = idx >= 0 ? VELOCIDADES[(idx + 1) % VELOCIDADES.length] : 1
    onRateChange(next)
  }

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`fixed bottom-0 left-0 right-0 z-50 ${
        modoNoturno
          ? 'bg-stone-900/95 border-t border-stone-700/50'
          : 'bg-white/95 border-t border-stone-200'
      } backdrop-blur-md`}
    >
      {/* Progress bar */}
      <div className={`h-0.5 w-full ${modoNoturno ? 'bg-stone-800' : 'bg-stone-200'}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-stone-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Transport controls */}
        <div className="flex items-center gap-1">
          {/* Previous */}
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-colors ${
              currentIndex === 0
                ? 'opacity-25 cursor-not-allowed'
                : modoNoturno
                  ? 'hover:bg-stone-800 text-stone-400'
                  : 'hover:bg-stone-100 text-stone-500'
            }`}
            aria-label="Paragrafo anterior"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            onClick={isPlaying ? onPause : onPlay}
            className={`p-3 rounded-full transition-colors ${
              modoNoturno
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
            aria-label={isPlaying ? 'Pausar' : 'Ouvir'}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            disabled={currentIndex >= total - 1}
            className={`p-2 rounded-full transition-colors ${
              currentIndex >= total - 1
                ? 'opacity-25 cursor-not-allowed'
                : modoNoturno
                  ? 'hover:bg-stone-800 text-stone-400'
                  : 'hover:bg-stone-100 text-stone-500'
            }`}
            aria-label="Proximo paragrafo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Speed + Voice + Progress */}
        <div className="flex items-center gap-2">
          {/* Speed: show all options inline so user sees available speeds */}
          <div className={`flex items-center rounded-full border ${
            modoNoturno ? 'border-stone-700' : 'border-stone-300'
          }`}>
            {VELOCIDADES.map((v) => (
              <button
                key={v}
                onClick={() => onRateChange(v)}
                className={`text-xs font-mono px-2 py-1 transition-colors first:rounded-l-full last:rounded-r-full ${
                  v === rate
                    ? modoNoturno
                      ? 'bg-stone-700 text-stone-100'
                      : 'bg-stone-800 text-white'
                    : modoNoturno
                      ? 'text-stone-500 hover:bg-stone-800'
                      : 'text-stone-400 hover:bg-stone-100'
                }`}
                aria-label={`Velocidade ${v}x`}
              >
                {v}x
              </button>
            ))}
          </div>

          {/* Voice selector */}
          {voices.length > 1 && (
            <div className="relative" ref={voiceMenuRef}>
              <button
                onClick={() => setShowVoices(!showVoices)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors max-w-[120px] truncate ${
                  modoNoturno
                    ? 'border-stone-700 text-stone-400 hover:bg-stone-800'
                    : 'border-stone-300 text-stone-500 hover:bg-stone-50'
                }`}
                aria-label="Escolher voz"
              >
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                  {selectedVoice ? voiceLabel(selectedVoice) : 'Voz'}
                </span>
              </button>

              <AnimatePresence>
                {showVoices && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute bottom-full mb-2 right-0 min-w-[220px] max-h-[240px] overflow-y-auto rounded-xl border shadow-lg ${
                      modoNoturno
                        ? 'bg-stone-900 border-stone-700'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <div className="p-1.5">
                      {voices.map((voice, i) => (
                        <button
                          key={`${voice.name}-${i}`}
                          onClick={() => {
                            onVoiceChange(voice)
                            setShowVoices(false)
                          }}
                          className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors ${
                            selectedVoice?.name === voice.name
                              ? modoNoturno
                                ? 'bg-stone-800 text-stone-200'
                                : 'bg-stone-100 text-stone-900'
                              : modoNoturno
                                ? 'text-stone-400 hover:bg-stone-800 hover:text-stone-300'
                                : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                          }`}
                        >
                          {voiceLabel(voice)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <span className={`text-xs tabular-nums ${
            modoNoturno ? 'text-stone-500' : 'text-stone-400'
          }`}>
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Close */}
        <button
          onClick={() => {
            onStop()
            onClose()
          }}
          className={`p-2 rounded-full transition-colors ${
            modoNoturno
              ? 'hover:bg-stone-800 text-stone-600 hover:text-stone-400'
              : 'hover:bg-stone-100 text-stone-400 hover:text-stone-600'
          }`}
          aria-label="Fechar leitor de audio"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
