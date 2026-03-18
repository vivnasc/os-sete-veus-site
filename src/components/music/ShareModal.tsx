"use client";

import { useState } from "react";
import type { Album, AlbumTrack } from "@/data/albums";

type Props = {
  track: AlbumTrack;
  album: Album;
  onClose: () => void;
};

export default function ShareModal({ track, album, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/musica/album/${album.slug}?faixa=${track.number}`
    : "";

  const shareText = `"${track.title}" do album "${album.title}" — Sete Ecos Music`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: track.title, text: shareText, url: shareUrl });
      } catch {
        // user cancelled
      }
    }
  }

  function shareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(url, "_blank");
  }

  function shareTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-sm bg-[#1A1A2E] rounded-t-2xl sm:rounded-2xl p-6 border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="font-display text-lg font-semibold text-[#F5F0E6] mb-1">Partilhar</h3>
        <p className="text-sm text-[#a0a0b0] mb-6 truncate">{track.title} — {album.title}</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              onClick={nativeShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-[#C9A96E]">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
              <span className="text-xs text-[#a0a0b0]">Partilhar</span>
            </button>
          )}

          <button
            onClick={shareWhatsApp}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="text-xs text-[#a0a0b0]">WhatsApp</span>
          </button>

          <button
            onClick={shareTwitter}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-[#F5F0E6]">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-xs text-[#a0a0b0]">X</span>
          </button>
        </div>

        <button
          onClick={copyLink}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-[#F5F0E6]"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-green-400">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Link copiado
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copiar link
            </>
          )}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 py-3 text-sm text-[#666680] hover:text-[#a0a0b0] transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
