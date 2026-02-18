"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function BankTransferContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [displayAmount, setDisplayAmount] = useState("1.885");
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
              <p className="text-xs text-brown-500">Contacto WhatsApp</p>
              <a
                href="https://wa.me/258845243875"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-lg font-medium text-sage hover:underline"
              >
                +258 845 243 875
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
