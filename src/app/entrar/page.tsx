"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function EntrarPage() {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerResult, setRegisterResult] = useState<{
    password?: string;
    existing?: boolean;
    message: string;
  } | null>(null);

  if (user) {
    router.push("/membro");
    return null;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError("Email ou password incorrectos. Tenta novamente.");
      setLoading(false);
    } else {
      router.push("/membro");
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setRegisterResult(null);

    try {
      const res = await fetch("/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao criar conta");
      } else if (data.existing) {
        setRegisterResult({ existing: true, message: data.message });
      } else {
        setRegisterResult({
          password: data.password,
          message: "Conta criada com sucesso!",
        });
      }
    } catch {
      setError("Erro de ligação. Tenta novamente.");
    }
    setLoading(false);
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-serif text-3xl text-brown-900">
          {mode === "login" ? "Entrar na tua área" : "Criar a tua conta"}
        </h1>
        <p className="mt-3 text-center text-brown-600">
          {mode === "login"
            ? "Acede à tua experiência — audiobook, práticas, módulos."
            : "Cria a tua conta em segundos. Só precisas do teu email."}
        </p>

        {/* Mode toggle */}
        <div className="mt-8 flex rounded-lg bg-brown-50 p-1">
          <button
            onClick={() => { setMode("login"); setError(""); setRegisterResult(null); }}
            className={`flex-1 rounded-md py-2.5 font-sans text-[0.75rem] uppercase tracking-[0.1em] transition-all ${
              mode === "login"
                ? "bg-white text-brown-900 shadow-sm"
                : "text-brown-400 hover:text-brown-600"
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); setRegisterResult(null); }}
            className={`flex-1 rounded-md py-2.5 font-sans text-[0.75rem] uppercase tracking-[0.1em] transition-all ${
              mode === "register"
                ? "bg-white text-brown-900 shadow-sm"
                : "text-brown-400 hover:text-brown-600"
            }`}
          >
            Criar conta
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label htmlFor="login-email" className="font-sans text-sm font-medium text-brown-700">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="font-sans text-sm font-medium text-brown-700">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading ? "opacity-60" : ""}`}
            >
              {loading ? "A entrar..." : "Entrar"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <div>
              <label htmlFor="reg-email" className="font-sans text-sm font-medium text-brown-700">
                O teu email
              </label>
              <input
                id="reg-email"
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

            {registerResult ? (
              <div className="rounded-lg border border-sage/30 bg-sage/5 p-5">
                {registerResult.existing ? (
                  <>
                    <p className="font-sans text-sm text-brown-700">
                      {registerResult.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => { setMode("login"); setRegisterResult(null); }}
                      className="mt-3 font-sans text-sm font-medium text-sage underline"
                    >
                      Ir para login
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-sans text-sm font-medium text-sage">
                      Conta criada!
                    </p>
                    <p className="mt-2 font-sans text-sm text-brown-700">
                      A tua password temporária:
                    </p>
                    <p className="mt-1 rounded bg-white px-3 py-2 font-mono text-base font-bold text-brown-900">
                      {registerResult.password}
                    </p>
                    <p className="mt-2 font-sans text-xs text-brown-500">
                      Guarda esta password. Usa-a para entrar na tua área.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setMode("login"); setRegisterResult(null); }}
                      className="mt-4 w-full rounded-lg bg-sage px-6 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
                    >
                      Entrar agora
                    </button>
                  </>
                )}
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading ? "opacity-60" : ""}`}
              >
                {loading ? "A criar..." : "Criar conta grátis"}
              </button>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
