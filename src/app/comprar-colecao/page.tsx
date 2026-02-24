"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

type PaymentMethod = "paypal" | "mpesa";

export default function ComprarColecaoPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleContinue() {
    if (!email || !paymentMethod) {
      setError("Preenche todos os campos obrigatórios");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          access_type_code: "colecao-sete-veus",
          payment_method: paymentMethod,
          amount: 9685, // MZN (149 USD x 65)
          currency: "MZN",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao criar pedido");
        setLoading(false);
        return;
      }

      // Redirecionar para a página de pagamento correspondente
      router.push(
        `/pagamento/${paymentMethod}?payment_id=${data.payment_id}`
      );
    } catch {
      setError("Erro de conexão. Tenta novamente.");
      setLoading(false);
    }
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-brown-900">
            Coleção Os 7 Véus
          </h1>
          <p className="mt-4 text-lg text-brown-700">
            Experiência completa de transformação e autoconhecimento
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-12 rounded-xl border-2 border-sage/20 bg-white p-8">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-sans text-sm uppercase tracking-widest text-brown-400">
                Investimento
              </p>
              <p className="mt-2 font-serif text-5xl text-brown-900">
                9.685<span className="text-2xl"> MZN</span>
              </p>
              <p className="mt-1 text-sm text-brown-500">≈ 149 USD</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-brown-700">
                Acesso às 7 experiências completas de véus
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-brown-700">
                Práticas guiadas de autoconhecimento
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-brown-700">
                Módulos interativos e audiobooks
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-brown-700">Acesso vitalício</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="font-sans text-sm font-medium text-brown-700"
            >
              Email *
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
              htmlFor="phone"
              className="font-sans text-sm font-medium text-brown-700"
            >
              Telemóvel (opcional)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              placeholder="+258 ..."
              className="mt-1 w-full rounded-lg border border-brown-100 bg-white px-4 py-3 font-sans text-sm text-brown-900 placeholder:text-brown-300 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
            />
          </div>

          <div>
            <p className="font-sans text-sm font-medium text-brown-700">
              Método de Pagamento *
            </p>
            <div className="mt-3 space-y-3">
              {/* PayPal */}
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  paymentMethod === "paypal"
                    ? "border-sage bg-sage/5"
                    : "border-brown-100 bg-white hover:border-brown-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      paymentMethod === "paypal"
                        ? "border-sage bg-sage"
                        : "border-brown-200"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-sans text-sm font-medium text-brown-900">
                      PayPal / Cartão de Crédito
                    </p>
                    <p className="text-xs text-brown-500">
                      Pagamento instantâneo
                    </p>
                  </div>
                </div>
              </button>

              {/* MPesa */}
              <button
                type="button"
                onClick={() => setPaymentMethod("mpesa")}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  paymentMethod === "mpesa"
                    ? "border-sage bg-sage/5"
                    : "border-brown-100 bg-white hover:border-brown-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      paymentMethod === "mpesa"
                        ? "border-sage bg-sage"
                        : "border-brown-200"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-sans text-sm font-medium text-brown-900">
                      MPesa
                    </p>
                    <p className="text-xs text-brown-500">
                      Aguarda confirmação manual
                    </p>
                  </div>
                </div>
              </button>

            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleContinue}
            disabled={loading || !paymentMethod}
            className={`w-full rounded-lg bg-sage px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${loading || !paymentMethod ? "opacity-60" : ""}`}
          >
            {loading ? "A processar..." : "Continuar para Pagamento"}
          </button>
        </div>
      </div>
    </section>
  );
}
