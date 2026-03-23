"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EntrarPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/conta`,
      },
    });

    setLoading(false);

    if (authError) {
      setError("Erro ao enviar o link. Tenta novamente.");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto flex min-h-[60dvh] max-w-sm flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-2xl font-semibold text-escola-creme">
          Verifica o teu email
        </h1>
        <p className="mt-3 text-sm text-escola-creme-50">
          Enviamos um link magico para <strong className="text-escola-creme">{email}</strong>.
          Clica no link para entrar.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-sm flex-col items-center justify-center px-4">
      <h1 className="mb-2 font-serif text-2xl font-semibold text-escola-creme">
        Entrar
      </h1>
      <p className="mb-8 text-center text-sm text-escola-creme-50">
        Usa o teu email para entrar ou criar conta.
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="o.teu@email.com"
          required
          className="w-full rounded-lg border border-escola-border bg-escola-card px-4 py-3 text-sm text-escola-creme placeholder:text-escola-creme-50 focus:border-escola-dourado focus:outline-none"
        />

        {error && <p className="text-xs text-escola-terracota">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-escola-dourado px-4 py-3 text-sm font-medium text-escola-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "A enviar..." : "Enviar link magico"}
        </button>
      </form>
    </div>
  );
}
