"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/alterar-senha`,
        }
      );

      if (resetError) {
        setError("Erro ao enviar email. Verifica o endereço e tenta novamente.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Erro de ligação. Tenta novamente.");
    }

    setLoading(false);
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-brown-900">
            Recuperar senha
          </h1>
          <p className="mt-3 text-brown-600">
            Vamos enviar-te um link para criares uma nova senha.
          </p>
        </div>

        {sent ? (
          <div className="mt-8 rounded-lg border border-sage/30 bg-sage/5 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10">
              <svg
                className="h-6 w-6 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <p className="font-sans text-sm font-medium text-sage">
              Email enviado!
            </p>
            <p className="mt-2 font-sans text-sm text-brown-700">
              Verifica o teu email. Enviámos um link para recuperares a tua senha.
            </p>
            <p className="mt-1 font-sans text-xs text-brown-400">
              Não te esqueças de verificar a pasta de spam.
            </p>
            <div className="mt-6">
              <Link
                href="/entrar"
                className="font-sans text-sm font-medium text-sage underline"
              >
                Voltar para entrar
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="font-sans text-sm font-medium text-brown-700"
              >
                O teu email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="o-teu@email.com"
                className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading ? "opacity-60" : ""}`}
            >
              {loading ? "A enviar..." : "Enviar link de recuperação"}
            </button>

            <div className="text-center">
              <Link
                href="/entrar"
                className="font-sans text-sm text-brown-400 underline transition-colors hover:text-brown-600"
              >
                Voltar para entrar
              </Link>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
