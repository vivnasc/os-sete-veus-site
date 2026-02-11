"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";

export default function EntrarPage() {
  const { user, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [showPasswordFallback, setShowPasswordFallback] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  if (user) {
    router.push("/membro");
    return null;
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setMagicLinkSent(false);

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
      });

      if (otpError) {
        setError("Erro ao enviar o link. Tenta novamente.");
      } else {
        setMagicLinkSent(true);
      }
    } catch {
      setError("Erro de ligação. Tenta novamente.");
    }

    setLoading(false);
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordLoading(true);

    const { error: err } = await signIn(email, password);
    if (err) {
      setPasswordError("Email ou password incorrectos. Tenta novamente.");
      setPasswordLoading(false);
    } else {
      router.push("/membro");
    }
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-serif text-3xl text-brown-900">
          Entrar na tua área
        </h1>
        <p className="mt-3 text-center text-brown-600">
          Acede à tua experiência — audiobook, práticas, módulos.
        </p>

        {magicLinkSent ? (
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
              Link enviado!
            </p>
            <p className="mt-2 font-sans text-sm text-brown-700">
              Enviámos um link para o teu email. Clica nele para entrar.
            </p>
            <p className="mt-1 font-sans text-xs text-brown-400">
              Verifica também a pasta de spam.
            </p>
            <button
              type="button"
              onClick={() => {
                setMagicLinkSent(false);
                setEmail("");
              }}
              className="mt-4 font-sans text-sm font-medium text-sage underline"
            >
              Usar outro email
            </button>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="magic-email"
                className="font-sans text-sm font-medium text-brown-700"
              >
                O teu email
              </label>
              <input
                id="magic-email"
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
              {loading ? "A enviar..." : "Entrar com link mágico"}
            </button>
          </form>
        )}

        {/* Divider */}
        {!magicLinkSent && (
          <>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-brown-100" />
              <span className="font-sans text-xs uppercase tracking-widest text-brown-300">
                ou
              </span>
              <div className="h-px flex-1 bg-brown-100" />
            </div>

            {/* Password fallback - collapsed by default */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowPasswordFallback(!showPasswordFallback)}
                className="flex w-full items-center justify-center gap-2 font-sans text-sm text-brown-400 transition-colors hover:text-brown-600"
              >
                Entrar com password
                <svg
                  className={`h-4 w-4 transition-transform ${showPasswordFallback ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {showPasswordFallback && (
                <form
                  onSubmit={handlePasswordLogin}
                  className="mt-4 space-y-4 rounded-lg border border-brown-100 bg-white/50 p-5"
                >
                  <div>
                    <label
                      htmlFor="fallback-email"
                      className="font-sans text-sm font-medium text-brown-700"
                    >
                      Email
                    </label>
                    <input
                      id="fallback-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={passwordLoading}
                      className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fallback-password"
                      className="font-sans text-sm font-medium text-brown-700"
                    >
                      Password
                    </label>
                    <input
                      id="fallback-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={passwordLoading}
                      className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                    />
                  </div>

                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className={`w-full rounded-lg border border-sage bg-white px-8 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-sage transition-colors hover:bg-sage/5 ${passwordLoading ? "opacity-60" : ""}`}
                  >
                    {passwordLoading ? "A entrar..." : "Entrar"}
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
