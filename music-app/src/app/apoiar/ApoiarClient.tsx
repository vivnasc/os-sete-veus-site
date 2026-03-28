"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MPESA_NUMBER = "851006473";
const PAYPAL_EMAIL = "viv.saraiva@gmail.com";
const SITE_URL = "https://seteveus.space";

const AMOUNTS = [100, 250, 500, 1000]; // MZN

export default function ApoiarClient() {
  const [method, setMethod] = useState<"mpesa" | "paypal" | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  async function copyMpesa() {
    try {
      await navigator.clipboard.writeText(MPESA_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  }

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col items-center px-6 py-12">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[#C9A96E] blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        {/* Back button */}
        <Link
          href="/"
          className="self-start mb-6 flex items-center gap-1.5 text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </Link>

        {/* Logo */}
        <div className="mb-8">
          <Image src="/music_veus_faicon.png" alt="Veus" width={48} height={48} />
        </div>

        {/* Message */}
        <h1 className="font-display text-2xl font-bold text-[#F5F0E6] mb-3">
          Apoiar a Loranne
        </h1>
        <p className="text-sm text-[#a0a0b0] leading-relaxed mb-2">
          Toda a música é gratuita. Sempre será.
        </p>
        <p className="text-sm text-[#a0a0b0] leading-relaxed mb-8">
          Se alguma faixa te tocou, podes deixar o teu apoio.
          Cada contribuição ajuda a criar mais música e a manter tudo aberto.
        </p>

        {!method ? (
          <>
            {/* Method selection */}
            <div className="w-full space-y-3 mb-8">
              <button
                onClick={() => setMethod("mpesa")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E21B24]/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[#E21B24]">M</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F5F0E6]">M-Pesa</p>
                  <p className="text-xs text-[#666680]">Envia para {MPESA_NUMBER}</p>
                </div>
              </button>

              <button
                onClick={() => setMethod("paypal")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0070BA]/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[#0070BA]">P</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F5F0E6]">PayPal</p>
                  <p className="text-xs text-[#666680]">Envia para {PAYPAL_EMAIL}</p>
                </div>
              </button>
            </div>
          </>
        ) : method === "mpesa" ? (
          <div className="w-full mb-8">
            <button
              onClick={() => setMethod(null)}
              className="mb-6 text-xs text-[#666680] hover:text-[#a0a0b0]"
            >
              &larr; Voltar
            </button>

            {/* Amount suggestions */}
            <p className="text-[10px] uppercase tracking-widest text-[#666680] mb-3">Valor sugerido (MZN)</p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {AMOUNTS.map(a => (
                <button
                  key={a}
                  onClick={() => setSelectedAmount(a)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedAmount === a
                      ? "bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30"
                      : "bg-white/[0.04] text-[#a0a0b0] border border-white/5 hover:bg-white/[0.08]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            {/* MPesa instructions */}
            <div className="w-full rounded-2xl bg-white/[0.04] border border-white/5 p-5 text-left space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#666680] mb-1">Número M-Pesa</p>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-bold text-[#F5F0E6] tracking-wider">{MPESA_NUMBER}</p>
                  <button
                    onClick={copyMpesa}
                    className="px-3 py-1 rounded-lg bg-white/5 text-xs text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
                  >
                    {copied ? "Copiado" : "Copiar"}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#666680] mb-1">Nome</p>
                <p className="text-sm text-[#F5F0E6]">Vivianne dos Santos</p>
              </div>
              {selectedAmount && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#666680] mb-1">Valor</p>
                  <p className="text-sm text-[#F5F0E6]">{selectedAmount} MZN</p>
                </div>
              )}
              <div className="pt-2 border-t border-white/5">
                <p className="text-xs text-[#666680]">
                  Envia via M-Pesa para o número acima.
                  Qualquer valor é bem-vindo. Obrigada.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mb-8">
            <button
              onClick={() => setMethod(null)}
              className="mb-6 text-xs text-[#666680] hover:text-[#a0a0b0]"
            >
              &larr; Voltar
            </button>

            {/* PayPal */}
            <div className="w-full rounded-2xl bg-white/[0.04] border border-white/5 p-5 text-left space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#666680] mb-1">PayPal</p>
                <p className="text-sm text-[#F5F0E6]">{PAYPAL_EMAIL}</p>
              </div>
              <a
                href={`https://paypal.me/vivsaraiva`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl bg-[#0070BA] text-white text-sm font-medium text-center transition-all hover:bg-[#005EA6] active:scale-[0.98]"
              >
                Abrir PayPal
              </a>
              <p className="text-xs text-[#666680] text-center">
                Qualquer valor. Sem mínimo.
              </p>
            </div>
          </div>
        )}

        {/* Gratitude */}
        <div className="w-full rounded-2xl bg-white/[0.02] border border-white/5 p-5 mb-8">
          <p className="text-xs text-[#666680] italic text-center leading-relaxed">
            &ldquo;Cada nota que escrevo é um pedaço de mim que decido partilhar.
            O teu apoio não paga a música — paga a coragem de continuar.&rdquo;
          </p>
          <p className="text-[10px] text-[#666680] text-center mt-2">— Loranne</p>
        </div>

        {/* Funnel to main site */}
        <div className="w-full space-y-3">
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-sm text-center text-[#a0a0b0] hover:text-[#F5F0E6] transition-all"
          >
            Conhecer Os Sete Véus
          </a>
          <Link
            href="/"
            className="block w-full py-3 text-sm text-center text-[#666680] hover:text-[#a0a0b0] transition-colors"
          >
            Voltar a ouvir
          </Link>
        </div>

        {/* Branding */}
        <div className="mt-12 flex items-center gap-2 opacity-40">
          <Image src="/music_veus_faicon.png" alt="Veus" width={16} height={16} />
          <span className="text-[10px] text-[#666680] tracking-widest">VEUS BY LORANNE</span>
        </div>
      </div>
    </div>
  );
}
