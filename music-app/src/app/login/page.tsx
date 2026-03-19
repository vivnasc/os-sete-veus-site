"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "register") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      setLoading(false);
      if (signUpError) {
        setError(signUpError.message);
      } else {
        // Supabase may auto-confirm or require email confirmation depending on settings
        // Try signing in immediately
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (!signInError) {
          router.push("/library");
        } else {
          // Account created but needs email confirmation
          setError("Conta criada. Verifica o teu email para confirmar e depois volta para entrar.");
        }
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Email ou password incorrectos.");
        } else {
          setError(signInError.message);
        }
      } else {
        router.push("/library");
      }
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

      <div className="max-w-sm w-full">
        <h1 className="font-display text-2xl font-semibold text-[#F5F0E6] text-center mb-2">
          {mode === "login" ? "Entra na tua biblioteca" : "Cria a tua conta"}
        </h1>
        <p className="text-sm text-[#666680] text-center mb-8">
          {mode === "login"
            ? "Guarda favoritos, ouve offline e reencontra o que ja ouviste."
            : "Cria uma conta para guardar os teus favoritos e ouvir offline."
          }
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

          <div>
            <label htmlFor="password" className="block text-xs text-[#a0a0b0] mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={mode === "register" ? "Minimo 6 caracteres" : "A tua password"}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F5F0E6] placeholder-[#666680] focus:outline-none focus:border-[#C9A96E]/50 transition-colors"
              autoComplete={mode === "register" ? "new-password" : "current-password"}
            />
          </div>

          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-3 rounded-xl bg-[#C9A96E] text-[#0D0D1A] font-medium text-sm hover:bg-[#d4b87a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "A processar..." : mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="mt-6 text-center">
          {mode === "login" ? (
            <p className="text-sm text-[#666680]">
              Ainda nao tens conta?{" "}
              <button
                onClick={() => { setMode("register"); setError(""); }}
                className="text-[#C9A96E] hover:underline"
              >
                Cria aqui
              </button>
            </p>
          ) : (
            <p className="text-sm text-[#666680]">
              Ja tens conta?{" "}
              <button
                onClick={() => { setMode("login"); setError(""); }}
                className="text-[#C9A96E] hover:underline"
              >
                Entra aqui
              </button>
            </p>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-[#666680] hover:text-[#a0a0b0] transition-colors"
          >
            Voltar a explorar
          </Link>
        </div>
      </div>
    </div>
  );
}
