"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function RegistarLivroContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ code: trimmedCode, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao validar código");
        setLoading(false);
        return;
      }

      setSuccess(true);
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
              Enviámos um link mágico para o teu email{" "}
              <strong>{email}</strong>
            </p>
            <p className="mt-2 text-sm text-brown-600">
              Clica no link para fazeres login e aceder ao teu conteúdo
              exclusivo.
            </p>
            <p className="mt-4 text-xs text-brown-400">
              (Verifica também a pasta de spam)
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

        <div className="mt-8 rounded-lg border border-brown-100 bg-white/50 p-6">
          <h3 className="font-sans text-sm font-medium text-brown-700">
            Não tens um código?
          </h3>
          <p className="mt-2 text-sm text-brown-600">
            Se compraste o livro físico mas não recebeste o código, envia email
            para:{" "}
            <a
              href="mailto:viv.saraiva@gmail.com"
              className="font-medium text-sage hover:underline"
            >
              viv.saraiva@gmail.com
            </a>
          </p>
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
