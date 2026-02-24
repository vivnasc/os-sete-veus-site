'use client'

import { motion } from 'framer-motion'

type AudioPlayerProps = {
  isPlaying: boolean
  isPaused: boolean
  currentIndex: number
  total: number
  rate: number
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
  onRateChange: (rate: number) => void
  onClose: () => void
  modoNoturno: boolean
}

const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2]

export default function AudioPlayer({
  isPlaying,
  isPaused,
  currentIndex,
  total,
  rate,
  onPlay,
  onPause,
  onStop,
  onNext,
  onPrevious,
  onRateChange,
  onClose,
  modoNoturno,
}: AudioPlayerProps) {
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

        {/* Speed + Progress */}
        <div className="flex items-center gap-3">
          <button
            onClick={nextRate}
            className={`text-xs font-mono px-2.5 py-1 rounded-full border transition-colors ${
              modoNoturno
                ? 'border-stone-700 text-stone-400 hover:bg-stone-800'
                : 'border-stone-300 text-stone-500 hover:bg-stone-50'
            }`}
            aria-label="Alterar velocidade"
          >
            {rate}x
          </button>

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
