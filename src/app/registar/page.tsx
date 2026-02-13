"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function RegistarPage() {
  const { user, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  if (user) {
    router.push("/membro");
    return null;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta. Tenta novamente.");
        setLoading(false);
        return;
      }

      // Account created successfully! Now auto-login
      setSuccess(true);

      // Wait a moment for account to be fully created
      await new Promise(resolve => setTimeout(resolve, 500));

      // Auto-login with the credentials
      const { error: loginError } = await signIn(email, password);

      if (loginError) {
        // Login failed, redirect to login page with success message
        router.push("/entrar?registered=true&email=" + encodeURIComponent(email));
      } else {
        // Login successful! Redirect to member area
        router.push("/membro");
      }
    } catch {
      setError("Erro de ligação. Tenta novamente.");
      setLoading(false);
    }
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-serif text-3xl text-brown-900">
          Criar conta
        </h1>
        <p className="mt-3 text-center text-brown-600">
          Regista-te para acederes às experiências e conteúdos.
        </p>

        {success ? (
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
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="font-sans text-sm font-medium text-sage">
              Conta criada com sucesso!
            </p>
            <p className="mt-2 font-sans text-sm text-brown-700">
              A entrar automaticamente...
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="mt-8 space-y-5">
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
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-sans text-sm font-medium text-brown-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Mínimo 8 caracteres"
                className="w-full rounded-lg border border-brown-100 bg-white px-4 py-3 pr-12 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
                autoComplete="new-password"
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
            <p className="mt-1 font-sans text-xs text-brown-400">
              A password será guardada no teu navegador
            </p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading ? "opacity-60" : ""}`}
          >
            {loading ? "A criar conta..." : "Criar conta"}
          </button>
        </form>
        )}

        {!success && (
        <div className="mt-6 text-center">
          <p className="font-sans text-sm text-brown-600">
            Já tens conta?{" "}
            <Link
              href="/entrar"
              className="font-medium text-sage hover:underline"
            >
              Entra aqui
            </Link>
          </p>
        </div>
        )}
      </div>
    </section>
  );
}
