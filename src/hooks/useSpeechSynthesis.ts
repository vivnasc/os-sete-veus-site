import { useState, useEffect, useCallback, useRef } from 'react'

export function useSpeechSynthesis(paragrafos: string[]) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rate, setRate] = useState(1)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  // Refs for stable callbacks (avoid stale closures in utterance handlers)
  const rateRef = useRef(rate)
  const voiceRef = useRef(selectedVoice)
  const indexRef = useRef(currentIndex)
  const paragrafosRef = useRef(paragrafos)
  const isPlayingRef = useRef(false)
  const isPausedRef = useRef(false)

  rateRef.current = rate
  voiceRef.current = selectedVoice
  indexRef.current = currentIndex
  paragrafosRef.current = paragrafos
  isPlayingRef.current = isPlaying
  isPausedRef.current = isPaused

  // Check browser support
  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  // Load available voices
  useEffect(() => {
    if (!isSupported) return

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices()
      if (available.length === 0) return

      const ptVoices = available.filter(v => v.lang.startsWith('pt'))
      setVoices(ptVoices.length > 0 ? ptVoices : available)

      if (!voiceRef.current) {
        const ptPT = available.find(v => v.lang === 'pt-PT')
        const ptBR = available.find(v => v.lang === 'pt-BR')
        const anyPt = available.find(v => v.lang.startsWith('pt'))
        setSelectedVoice(ptPT || ptBR || anyPt || available[0])
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [isSupported])

  // Load saved rate
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tts-rate')
      if (saved) setRate(parseFloat(saved))
    }
  }, [])

  // Persist rate
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tts-rate', rate.toString())
    }
  }, [rate])

  // Core speak function — uses refs for stability across utterance callbacks
  const speakAt = useCallback((index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    if (index < 0 || index >= paragrafosRef.current.length) {
      setIsPlaying(false)
      setIsPaused(false)
      return
    }

    const text = paragrafosRef.current[index]
    if (!text || text.trim().length === 0) {
      const next = index + 1
      setCurrentIndex(next)
      if (next < paragrafosRef.current.length) {
        setTimeout(() => speakAt(next), 50)
      } else {
        setIsPlaying(false)
      }
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = voiceRef.current?.lang || 'pt-PT'
    utterance.rate = rateRef.current
    if (voiceRef.current) utterance.voice = voiceRef.current

    utterance.onend = () => {
      const next = indexRef.current + 1
      if (next < paragrafosRef.current.length) {
        setCurrentIndex(next)
        setTimeout(() => speakAt(next), 150)
      } else {
        setIsPlaying(false)
        setIsPaused(false)
      }
    }

    utterance.onerror = (event) => {
      if (event.error !== 'canceled') {
        console.error('TTS error:', event.error)
        setIsPlaying(false)
        setIsPaused(false)
      }
    }

    setCurrentIndex(index)
    setIsPlaying(true)
    setIsPaused(false)
    window.speechSynthesis.speak(utterance)
  }, [])

  const play = useCallback(() => {
    if (!isSupported) return
    if (isPausedRef.current) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }
    speakAt(indexRef.current)
  }, [isSupported, speakAt])

  const pause = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.pause()
    setIsPaused(true)
    setIsPlaying(false)
  }, [isSupported])

  const stop = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentIndex(0)
  }, [isSupported])

  const next = useCallback(() => {
    const nextIdx = Math.min(indexRef.current + 1, paragrafosRef.current.length - 1)
    if (isPlayingRef.current || isPausedRef.current) {
      speakAt(nextIdx)
    } else {
      setCurrentIndex(nextIdx)
    }
  }, [speakAt])

  const previous = useCallback(() => {
    const prevIdx = Math.max(indexRef.current - 1, 0)
    if (isPlayingRef.current || isPausedRef.current) {
      speakAt(prevIdx)
    } else {
      setCurrentIndex(prevIdx)
    }
  }, [speakAt])

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= paragrafosRef.current.length) return
    if (isPlayingRef.current || isPausedRef.current) {
      speakAt(index)
    } else {
      setCurrentIndex(index)
    }
  }, [speakAt])

  // Restart current utterance when rate or voice changes during playback
  useEffect(() => {
    if (isPlayingRef.current && !isPausedRef.current) {
      speakAt(indexRef.current)
    }
  }, [rate, selectedVoice, speakAt])

  // Chrome workaround: speechSynthesis silently stops after ~15s
  // Keep alive by pausing/resuming periodically
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause()
        window.speechSynthesis.resume()
      }
    }, 12000)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return {
    isSupported,
    isPlaying,
    isPaused,
    currentIndex,
    rate,
    setRate,
    voices,
    selectedVoice,
    setSelectedVoice,
    play,
    pause,
    stop,
    next,
    previous,
    goTo,
    total: paragrafos.length,
  }
}
