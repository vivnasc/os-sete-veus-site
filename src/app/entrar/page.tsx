"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";

function EntrarContent() {
  const { user, signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [showPasswordFallback, setShowPasswordFallback] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setShowSuccessMessage(true);
      const emailParam = searchParams.get("email");
      if (emailParam) {
        setEmail(decodeURIComponent(emailParam));
        setShowPasswordFallback(true);
      }
    }
  }, [searchParams]);

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
    setPasswordLoading(false);

    if (err) {
      setPasswordError("Email ou password incorrectos. Tenta novamente.");
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

        {showSuccessMessage && (
          <div className="mt-6 rounded-lg border border-sage/30 bg-sage/5 p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sage/10">
              <svg
                className="h-5 w-5 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="font-sans text-sm font-medium text-sage">
              Conta criada com sucesso! 🎉
            </p>
            <p className="mt-1 font-sans text-xs text-brown-600">
              Agora faz login abaixo com a tua password
            </p>
          </div>
        )}

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
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="fallback-password"
                        className="font-sans text-sm font-medium text-brown-700"
                      >
                        Password
                      </label>
                      <Link
                        href="/recuperar-senha"
                        className="font-sans text-xs text-sage hover:underline"
                      >
                        Esqueci minha senha
                      </Link>
                    </div>
                    <div className="relative mt-1">
                      <input
                        id="fallback-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={passwordLoading}
                        className="w-full rounded-lg border border-brown-100 bg-white px-4 py-3 pr-12 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600"
                      >
                        {showPassword ? (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
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

        {/* Link to register */}
        <div className="mt-8 text-center">
          <p className="font-sans text-sm text-brown-600">
            Não tens conta?{" "}
            <Link
              href="/registar"
              className="font-medium text-sage hover:underline"
            >
              Regista-te aqui
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function EntrarPage() {
  return (
    <Suspense fallback={
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-md text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent mx-auto"></div>
        </div>
      </section>
    }>
      <EntrarContent />
    </Suspense>
  );
}
