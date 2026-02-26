"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

function PayPalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [displayAmount, setDisplayAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [success, setSuccess] = useState(false);
  const [autoLoginFailed, setAutoLoginFailed] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const autoLoginAttempted = useRef(false);
  const tokenHashRef = useRef<string | null>(null);
  const emailRef = useRef<string>("");

  useEffect(() => {
    const id = searchParams.get("payment_id");
    if (!id) {
      router.push("/comprar/espelhos");
      return;
    }
    setPaymentId(id);

    const amount = searchParams.get("amount");
    if (amount) setDisplayAmount(amount);

    const product = searchParams.get("product");
    if (product) setProductName(product);

    const email = searchParams.get("email");
    if (email) emailRef.current = email;
  }, [searchParams, router]);

  // Auto-login when payment succeeds and we have a token
  useEffect(() => {
    if (!success || autoLoginAttempted.current) return;
    autoLoginAttempted.current = true;

    async function doAutoLogin() {
      const tokenHash = tokenHashRef.current;
      if (!tokenHash) {
        setAutoLoginFailed(true);
        return;
      }

      try {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "magiclink",
        });

        if (verifyError) {
          console.error("[PayPal] Auto-login verifyOtp error:", verifyError);
          setAutoLoginFailed(true);
          return;
        }

        // Login succeeded — redirect to member area
        router.push("/membro");
      } catch (e) {
        console.error("[PayPal] Auto-login error:", e);
        setAutoLoginFailed(true);
      }
    }

    doAutoLogin();
  }, [success, router]);

  if (!PAYPAL_CLIENT_ID) {
    return (
      <section className="bg-cream px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="font-serif text-2xl text-brown-900">
              PayPal indisponivel
            </h1>
            <p className="mt-4 text-sm text-brown-600">
              O pagamento via PayPal ainda nao esta configurado.
              Por favor escolhe outro metodo de pagamento.
            </p>
            <button
              onClick={() => router.push("/comprar/espelhos")}
              className="mt-6 rounded-lg bg-sage px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white hover:bg-sage-dark"
            >
              Voltar
            </button>
          </div>
        </div>
      </section>
    );
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
              Pagamento Confirmado
            </h1>

            {autoLoginFailed ? (
              <>
                <p className="mt-4 text-brown-700">
                  O teu acesso está activo. Entra com o teu email para começar.
                </p>
                <button
                  onClick={() => router.push("/entrar")}
                  className="mt-6 rounded-lg bg-sage px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white hover:bg-sage-dark"
                >
                  Entrar na minha área
                </button>
              </>
            ) : (
              <>
                <p className="mt-4 text-brown-700">
                  A preparar a tua área...
                </p>
                <div className="mt-6">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-sage/30 border-t-sage" />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center font-serif text-3xl text-brown-900">
          Pagamento via PayPal
        </h1>
        {productName && (
          <p className="mt-2 text-center font-sans text-sm text-brown-500">
            {productName}
          </p>
        )}

        {/* Order summary */}
        <div className="mt-8 rounded-xl border-2 border-sage/20 bg-white p-8">
          <h2 className="font-sans text-sm uppercase tracking-widest text-brown-400">
            Resumo
          </h2>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-brown-600">{productName || "Espelho"}</span>
              <span className="font-sans text-2xl font-bold text-sage">
                ${displayAmount} USD
              </span>
            </div>
          </div>

          {/* PayPal buttons */}
          <div className="mt-8">
            {processing && (
              <div className="mb-4 rounded-lg bg-sage/5 p-4 text-center">
                <p className="text-sm text-brown-600">A processar pagamento...</p>
              </div>
            )}

            <PayPalScriptProvider
              options={{
                clientId: PAYPAL_CLIENT_ID,
                currency: "USD",
                intent: "capture",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "pay",
                  height: 50,
                }}
                disabled={processing}
                createOrder={async () => {
                  setError("");
                  const res = await fetch("/api/paypal/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ payment_id: paymentId }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    setError(data.error || "Erro ao criar ordem PayPal");
                    throw new Error(data.error);
                  }

                  return data.orderID;
                }}
                onApprove={async (data) => {
                  setProcessing(true);
                  setError("");

                  try {
                    const res = await fetch("/api/paypal/capture-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        orderID: data.orderID,
                        payment_id: paymentId,
                      }),
                    });

                    const result = await res.json();

                    if (!res.ok) {
                      setError(result.error || "Erro ao processar pagamento");
                      setProcessing(false);
                      return;
                    }

                    // Store token for auto-login
                    if (result.token_hash) {
                      tokenHashRef.current = result.token_hash;
                    }
                    if (result.email) {
                      emailRef.current = result.email;
                    }

                    setSuccess(true);
                  } catch {
                    setError("Erro de conexao. Contacta-nos se o valor foi debitado.");
                    setProcessing(false);
                  }
                }}
                onError={(err) => {
                  console.error("[PayPal] Error:", err);
                  setError("Erro no PayPal. Tenta novamente.");
                  setProcessing(false);
                }}
                onCancel={() => {
                  setError("");
                  setProcessing(false);
                }}
              />
            </PayPalScriptProvider>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Alternative methods */}
        <div className="mt-6 text-center">
          <p className="text-xs text-brown-400">
            Preferes outro metodo?
          </p>
          <div className="mt-2 flex justify-center gap-3">
            <button
              onClick={() =>
                router.push(
                  `/pagamento/mpesa?payment_id=${paymentId}&product=${encodeURIComponent(productName)}`
                )
              }
              className="text-sm text-brown-500 underline hover:text-brown-700"
            >
              MPesa
            </button>
            <span className="text-brown-300">|</span>
            <button
              onClick={() =>
                router.push(
                  `/pagamento/bank_transfer?payment_id=${paymentId}&product=${encodeURIComponent(productName)}`
                )
              }
              className="text-sm text-brown-500 underline hover:text-brown-700"
            >
              Transferencia Bancaria
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PayPalPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <p className="text-brown-600">A carregar...</p>
        </div>
      }
    >
      <PayPalContent />
    </Suspense>
  );
}
