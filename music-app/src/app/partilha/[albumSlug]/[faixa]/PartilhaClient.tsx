"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const PREVIEW_SECONDS = 60;

type Props = {
  albumSlug: string;
  albumTitle: string;
  albumColor: string;
  trackNumber: number;
  trackTitle: string;
  trackDescription: string;
  audioUrl: string | null;
  coverSrc: string;
};

export default function PartilhaClient({
  albumSlug, albumTitle, albumColor,
  trackNumber, trackTitle, trackDescription,
  audioUrl, coverSrc,
}: Props) {
  const [isSubscriber, setIsSubscriber] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsSubscriber(!!data.user);
    });
  }, []);

  useEffect(() => {
    if (isSubscriber) {
      window.location.href = `/album/${albumSlug}?faixa=${trackNumber}`;
    }
  }, [isSubscriber, albumSlug, trackNumber]);

  useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    setAudioEl(audio);

    const onTime = () => {
      if (audio.currentTime >= PREVIEW_SECONDS) {
        audio.pause();
        setPlaying(false);
        setEnded(true);
        setProgress(100);
        setCurrentTime(PREVIEW_SECONDS);
      } else {
        setProgress((audio.currentTime / PREVIEW_SECONDS) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const onEnded = () => { setPlaying(false); setEnded(true); setProgress(100); };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioUrl]);

  function togglePlay() {
    if (!audioEl || ended) return;
    if (playing) {
      audioEl.pause();
      setPlaying(false);
    } else {
      audioEl.play();
      setPlaying(true);
    }
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  if (isSubscriber) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D1A]">
        <p className="text-sm text-[#666680] animate-pulse">A abrir na tua conta...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col items-center justify-center px-6 py-12">
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center top, ${albumColor}40 0%, transparent 70%)` }}
      />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        {/* Album cover */}
        <div className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-2xl mb-8">
          <Image src={coverSrc} alt={albumTitle} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Track info */}
        <p className="text-xs uppercase tracking-widest text-[#666680] mb-2">{albumTitle}</p>
        <h1 className="font-display text-2xl font-bold text-[#F5F0E6] mb-1">{trackTitle}</h1>
        <p className="text-sm text-[#a0a0b0] mb-8">{trackDescription}</p>

        {/* Player */}
        {audioUrl ? (
          <div className="w-full mb-8">
            {/* Progress bar */}
            <div className="w-full h-1 rounded-full bg-white/10 mb-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: albumColor }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#666680] tabular-nums mb-4">
              <span>{fmt(currentTime)}</span>
              <span>{fmt(PREVIEW_SECONDS)}</span>
            </div>

            {!ended ? (
              <button
                onClick={togglePlay}
                className="mx-auto flex items-center justify-center w-16 h-16 rounded-full transition-transform hover:scale-105"
                style={{ backgroundColor: albumColor }}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="#0D0D1A" className="h-7 w-7">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="#0D0D1A" className="h-7 w-7 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-[#a0a0b0]">O preview terminou.</p>
                <p className="text-sm text-[#F5F0E6]">Queres ouvir a faixa completa?</p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full mb-8 py-6 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-sm text-[#666680]">Em breve.</p>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/album/${albumSlug}?faixa=${trackNumber}`}
          className="w-full py-4 rounded-xl font-medium text-sm text-center transition-colors hover:opacity-90"
          style={{ backgroundColor: albumColor, color: "#0D0D1A" }}
        >
          Ouvir completo no Veus
        </Link>

        <Link
          href="/"
          className="mt-3 text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors"
        >
          Explorar mais música
        </Link>

        {/* Branding */}
        <div className="mt-12 flex items-center gap-2 opacity-50">
          <Image src="/music_veus_faicon.png" alt="Veus" width={20} height={20} />
          <span className="text-xs text-[#666680] tracking-wider">VEUS</span>
        </div>
      </div>
    </div>
  );
}
