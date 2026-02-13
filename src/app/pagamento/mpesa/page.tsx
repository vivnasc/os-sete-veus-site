"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function MpesaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [mpesaReference, setMpesaReference] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const id = searchParams.get("payment_id");
    if (!id) {
      router.push("/comprar-colecao");
      return;
    }
    setPaymentId(id);
  }, [searchParams, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!paymentId) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/payment/submit-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: paymentId,
          mpesa_reference: mpesaReference,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao enviar comprovativo");
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
              Comprovativo Enviado! ✓
            </h1>
            <p className="mt-4 text-brown-700">
              Obrigada! O teu pagamento está em análise.
            </p>
            <p className="mt-2 text-sm text-brown-600">
              Receberás um email assim que for confirmado (normalmente em 24h).
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 rounded-lg bg-sage px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white hover:bg-sage-dark"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center font-serif text-3xl text-brown-900">
          Pagamento via MPesa
        </h1>

        {/* MPesa Instructions */}
        <div className="mt-8 rounded-xl border-2 border-sage/20 bg-white p-8">
          <h2 className="font-sans text-sm uppercase tracking-widest text-brown-400">
            Instruções
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <p className="text-xs text-brown-500">Valor a pagar</p>
              <p className="font-sans text-2xl font-bold text-sage">
                2.500 MZN
              </p>
            </div>

            <div>
              <p className="text-xs text-brown-500">Número MPesa</p>
              <p className="font-mono text-xl font-medium text-brown-900">
                +258 851 006 473
              </p>
            </div>

            <div className="rounded-lg bg-sage/5 p-4">
              <p className="mb-3 text-sm font-medium text-brown-900">
                Como pagar:
              </p>
              <ol className="space-y-2 text-sm text-brown-700">
                <li className="flex gap-2">
                  <span className="font-medium">1.</span>
                  <span>
                    Abre a app MPesa ou marca *150#
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">2.</span>
                  <span>
                    Escolhe "Enviar Dinheiro"
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">3.</span>
                  <span>
                    Insere o número: <strong>+258 851 006 473</strong>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">4.</span>
                  <span>
                    Insere o valor: <strong>2.500 MZN</strong>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">5.</span>
                  <span>
                    Confirma e guarda o número de referência
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">6.</span>
                  <span>
                    Preenche o formulário abaixo
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="mpesa-ref"
              className="font-sans text-sm font-medium text-brown-700"
            >
              Referência MPesa *
            </label>
            <input
              id="mpesa-ref"
              type="text"
              required
              value={mpesaReference}
              onChange={(e) => setMpesaReference(e.target.value)}
              disabled={loading}
              placeholder="Ex: MP123456789"
              className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-mono text-sm text-brown-900 placeholder:font-sans placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
            />
            <p className="mt-1 text-xs text-brown-400">
              Recebeste esta referência por SMS após o pagamento.
            </p>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="font-sans text-sm font-medium text-brown-700"
            >
              Notas adicionais (opcional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
              placeholder="Informações adicionais..."
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
            className={`w-full rounded-lg bg-sage px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading ? "opacity-60" : ""}`}
          >
            {loading ? "A enviar..." : "Confirmar Pagamento"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function MpesaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <p className="text-brown-600">A carregar...</p>
        </div>
      }
    >
      <MpesaContent />
    </Suspense>
  );
}
