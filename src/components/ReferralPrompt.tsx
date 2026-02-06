"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  /** Show only after this many completed chapters */
  minChapters?: number;
  /** Current completed chapter count */
  chaptersCompleted: number;
};

/**
 * ReferralPrompt — Appears after a positive engagement moment.
 * Generates a unique referral link and lets users share via
 * WhatsApp, Instagram, or copy link.
 */
export default function ReferralPrompt({ minChapters = 3, chaptersCompleted }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const generateReferral = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) return;

    const code = `ECOS-${userId.substring(0, 8).toUpperCase()}`;
    const url = `https://seteecos.com/recursos/teste?ref=${code}`;
    setReferralCode(code);
    setShareUrl(url);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("referral-dismissed")) {
      setDismissed(true);
      return;
    }

    if (chaptersCompleted >= minChapters) {
      const timer = setTimeout(() => {
        setVisible(true);
        generateReferral();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [chaptersCompleted, minChapters, generateReferral]);

  if (dismissed || !visible) return null;

  function handleDismiss() {
    setDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("referral-dismissed", "true");
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      logShare("copy");
    } catch {
      // Fallback
    }
  }

  async function logShare(platform: string) {
    try {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) return;

      await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, platform, referralCode }),
      });
      setShared(true);
    } catch {
      // Silent fail
    }
  }

  const whatsappText = encodeURIComponent(
    `Descobri algo que me está a ajudar a reconectar-me comigo mesma. Faz este teste gratuito — leva 3 minutos:\n${shareUrl}`
  );

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-veu-7/30 bg-gradient-to-r from-veu-7/5 to-transparent p-6 transition-all duration-500">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-veu-7">
            Partilha
          </p>
          <h3 className="mt-2 font-serif text-lg text-brown-900">
            {shared
              ? "Obrigada por partilhares!"
              : "Conheces alguém que precisa de se ouvir?"}
          </h3>
          {shared ? (
            <p className="mt-2 text-sm leading-relaxed text-brown-600">
              A tua partilha pode ser o primeiro passo de alguém. Obrigada por fazeres
              parte deste ecossistema.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm leading-relaxed text-brown-600">
                Se esta experiência está a fazer sentido para ti, partilha o teste
                gratuito com alguém que também mereça parar e ouvir-se.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logShare("whatsapp")}
                  className="flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white transition hover:bg-[#20bd5a]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <button
                  onClick={handleCopy}
                  className="rounded-lg border border-veu-7/30 px-5 py-2.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] text-brown-600 transition hover:bg-veu-7/10"
                >
                  {copied ? "Link copiado!" : "Copiar link"}
                </button>
              </div>
              {shareUrl && (
                <p className="mt-3 font-mono text-[0.65rem] text-brown-300">
                  {shareUrl}
                </p>
              )}
            </>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="ml-4 shrink-0 text-brown-300 transition hover:text-brown-500"
          aria-label="Fechar"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
}
