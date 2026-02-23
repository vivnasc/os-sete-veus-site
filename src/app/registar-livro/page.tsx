"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function RegistarLivroContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, signIn } = useAuth();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const codeParam = searchParams.get("code");
    if (codeParam) {
      setCode(codeParam);
    }
  }, [searchParams]);

  // Se já estiver autenticado, redirecionar
  useEffect(() => {
    if (user) {
      router.push("/membro");
    }
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const trimmedCode = code.trim().toUpperCase();

    try {
      // Códigos LIVRO-XXXXX usam a API de livro codes
      // Outros códigos usam a API de special links
      const isLivroCode = trimmedCode.startsWith("LIVRO-");

      const endpoint = isLivroCode
        ? "/api/codes/redeem"
        : "/api/special-link/validate";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmedCode, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao validar código");
        setLoading(false);
        return;
      }

      setSuccess(true);

      // Auto-login com as credenciais
      await new Promise(resolve => setTimeout(resolve, 500));
      const { error: loginError } = await signIn(email, password);

      if (loginError) {
        // Se o auto-login falhar, redirecionar para a página de login
        router.push("/entrar?registered=true&email=" + encodeURIComponent(email));
      } else {
        router.push("/membro");
      }
    } catch {
      setError("Erro de conexão. Tenta novamente.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border border-sage/30 bg-sage/5 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10">
              <svg
                className="h-8 w-8 text-sage"
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
            <h1 className="font-serif text-2xl text-brown-900">
              Acesso concedido.
            </h1>
            <p className="mt-4 text-brown-700">
              A entrar automaticamente...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10">
            <svg
              className="h-8 w-8 text-sage"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h1 className="font-serif text-3xl text-brown-900">
            Registo do Livro Físico
          </h1>
          <p className="mt-3 text-brown-600">
            Compraste o livro físico? Excelente!
          </p>
          <p className="mt-2 text-sm text-brown-500">
            Ganha acesso gratuito à experiência digital completa.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="code"
              className="font-sans text-sm font-medium text-brown-700"
            >
              Código de Acesso
            </label>
            <input
              id="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
              placeholder="Insere o código que recebeste"
              className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-mono text-sm text-brown-900 placeholder:font-sans placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
            />
            <p className="mt-1 text-xs text-brown-400">
              Recebeste este código por email ou no teu livro físico.
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="font-sans text-sm font-medium text-brown-700"
            >
              O Teu Email
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

          <div>
            <label
              htmlFor="password"
              className="font-sans text-sm font-medium text-brown-700"
            >
              Cria uma password
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
              Para poderes voltar a entrar mais tarde
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading ? "opacity-60" : ""}`}
          >
            {loading ? "A validar..." : "Activar Acesso Gratuito"}
          </button>
        </form>

        <div className="mt-8 rounded-lg border border-brown-100 bg-white/50 p-6 text-center">
          <h3 className="font-sans text-sm font-medium text-brown-700">
            Nao tens um codigo?
          </h3>
          <p className="mt-2 text-sm text-brown-600">
            Se compraste o livro fisico mas nao recebeste o codigo,
            pede-o aqui:
          </p>
          <a
            href="/pedir-codigo"
            className="mt-3 inline-block rounded-lg border-2 border-sage bg-transparent px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-sage transition-all hover:bg-sage hover:text-white"
          >
            Pedir codigo de acesso
          </a>
        </div>
      </div>
    </section>
  );
}

export default function RegistarLivroPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <p className="text-brown-600">A carregar...</p>
        </div>
      }
    >
      <RegistarLivroContent />
    </Suspense>
  );
}
