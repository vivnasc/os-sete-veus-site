"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/library`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col items-center justify-center px-6">
      <Link href="/" className="mb-10">
        <Image
          src="/music_veus_faicon.png"
          alt="Veus"
          width={48}
          height={48}
          className="h-12 w-12"
        />
      </Link>

      {sent ? (
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-3">
            Verifica o teu email
          </h1>
          <p className="text-sm text-[#a0a0b0] mb-2">
            Enviamos um link magico para
          </p>
          <p className="text-sm text-[#C9A96E] font-medium mb-6">{email}</p>
          <p className="text-xs text-[#666680]">
            Clica no link no email para entrar. Se nao apareceu, verifica o spam.
          </p>
          <button
            onClick={() => { setSent(false); setEmail(""); }}
            className="mt-8 text-sm text-[#666680] hover:text-[#a0a0b0] transition-colors"
          >
            Usar outro email
          </button>
        </div>
      ) : (
        <div className="max-w-sm w-full">
          <h1 className="font-display text-2xl font-semibold text-[#F5F0E6] text-center mb-2">
            Entra na tua biblioteca
          </h1>
          <p className="text-sm text-[#666680] text-center mb-8">
            Guarda favoritos, ouve offline e reencontra o que ja ouviste.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs text-[#a0a0b0] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="o-teu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F5F0E6] placeholder-[#666680] focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
                autoComplete="email"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-3 rounded-xl bg-[#C9A96E] text-[#0D0D1A] font-medium text-sm hover:bg-[#d4b87a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "A enviar..." : "Continuar com magic link"}
            </button>
          </form>

          <p className="text-xs text-[#666680] text-center mt-6">
            Sem password. Enviamos um link seguro para o teu email.
          </p>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-sm text-[#666680] hover:text-[#a0a0b0] transition-colors"
            >
              Voltar a explorar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
