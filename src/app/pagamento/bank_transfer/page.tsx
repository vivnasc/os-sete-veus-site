"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function BankTransferContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [displayAmount, setDisplayAmount] = useState("1.200");
  const [productName, setProductName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const id = searchParams.get("payment_id");
    if (!id) {
      router.push("/comprar/espelhos");
      return;
    }
    setPaymentId(id);

    const amount = searchParams.get("amount");
    if (amount) {
      setDisplayAmount(Number(amount).toLocaleString("pt-MZ"));
    }

    const product = searchParams.get("product");
    if (product) {
      setProductName(product);
    }
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
          transaction_id: transactionId,
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
          Transferência Bancária
        </h1>
        {productName && (
          <p className="mt-2 text-center font-sans text-sm text-brown-500">
            {productName}
          </p>
        )}

        {/* Bank Details */}
        <div className="mt-8 rounded-xl border-2 border-sage/20 bg-white p-8">
          <h2 className="font-sans text-sm uppercase tracking-widest text-brown-400">
            Dados Bancários
          </h2>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs text-brown-500">Banco</p>
              <p className="font-sans text-lg font-medium text-brown-900">
                [Adiciona o nome do teu banco]
              </p>
            </div>
            <div>
              <p className="text-xs text-brown-500">Titular</p>
              <p className="font-sans text-lg font-medium text-brown-900">
                Viviane Saraiva
              </p>
            </div>
            <div>
              <p className="text-xs text-brown-500">NIB / IBAN</p>
              <p className="font-mono text-lg font-medium text-brown-900">
                [Adiciona o teu NIB/IBAN aqui]
              </p>
            </div>
            <div>
              <p className="text-xs text-brown-500">Contacto Telegram</p>
              <a
                href="https://t.me/viviannedossantos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-lg font-medium text-sage hover:underline"
              >
                @viviannedossantos
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
            <div>
              <p className="text-xs text-brown-500">Valor</p>
              <p className="font-sans text-2xl font-bold text-sage">
                {displayAmount} MZN
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-sage/5 p-4">
            <p className="text-sm text-brown-700">
              ⚠️{" "}
              <strong>Importante:</strong> Após fazeres a transferência, preenche o
              formulário abaixo com o número de transação.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="transaction-id"
              className="font-sans text-sm font-medium text-brown-700"
            >
              Número de Transação *
            </label>
            <input
              id="transaction-id"
              type="text"
              required
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              disabled={loading}
              placeholder="Ex: TRX123456789"
              className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-mono text-sm text-brown-900 placeholder:font-sans placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
            />
            <p className="mt-1 text-xs text-brown-400">
              Encontras este número no comprovativo da transferência.
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
              placeholder="Informações adicionais sobre o pagamento..."
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

export default function BankTransferPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <p className="text-brown-600">A carregar...</p>
        </div>
      }
    >
      <BankTransferContent />
    </Suspense>
  );
}
