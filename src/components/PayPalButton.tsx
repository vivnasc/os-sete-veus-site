"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const PAYPAL_CLIENT_ID =
  "Afx27sTKwo_i7kvOAPaAjsAobOnXHZUhQ5EmC7LQ70cUE62P-QZSO5hIiT4V_RqEihsJFUKomoM9yaoo";

type AccountInfo = {
  password?: string;
  existing?: boolean;
  message: string;
} | null;

export default function PayPalButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "success" | "error">("idle");
  const [account, setAccount] = useState<AccountInfo>(null);
  const [creatingAccount, setCreatingAccount] = useState(false);

  useEffect(() => {
    if (status !== "idle") return;
    setStatus("loading");

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;

    script.onload = () => {
      if (!containerRef.current || !window.paypal) return;
      setStatus("ready");

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "pay",
            height: 50,
          },
          createOrder: (
            _data: Record<string, unknown>,
            actions: { order: { create: (opts: Record<string, unknown>) => Promise<string> } }
          ) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Os 7 Véus do Despertar — Ebook + Experiência Completa",
                  amount: {
                    value: "19.00",
                    currency_code: "USD",
                  },
                },
              ],
            });
          },
          onApprove: async (
            _data: Record<string, unknown>,
            actions: {
              order: {
                capture: () => Promise<{
                  payer?: { email_address?: string };
                }>;
              };
            }
          ) => {
            const details = await actions.order.capture();
            const payerEmail = details?.payer?.email_address;

            setStatus("success");

            if (payerEmail) {
              setCreatingAccount(true);
              try {
                const res = await fetch("/api/create-account", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: payerEmail }),
                });
                const data = await res.json();
                if (data.ok) {
                  setAccount(data);
                  // Auto-login if new account
                  if (!data.existing && data.password) {
                    await supabase.auth.signInWithPassword({
                      email: payerEmail,
                      password: data.password,
                    });
                  }
                }
              } catch {
                // Account creation failed but payment succeeded
              } finally {
                setCreatingAccount(false);
              }
            }
          },
          onError: () => {
            setStatus("error");
          },
        })
        .render(containerRef.current);
    };

    script.onerror = () => setStatus("error");
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [status]);

  if (status === "success") {
    return (
      <div className="rounded-xl bg-sage/10 px-8 py-8 text-center">
        <p className="font-serif text-2xl text-brown-900">Obrigada pela tua compra!</p>

        {creatingAccount ? (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
            <span className="text-sm text-brown-500">A criar a tua conta...</span>
          </div>
        ) : account ? (
          <div className="mt-4">
            {account.existing ? (
              <p className="text-sm text-brown-600">
                Já tens uma conta. Faz login para aceder à tua experiência completa.
              </p>
            ) : account.password ? (
              <div className="space-y-3">
                <p className="text-sm text-brown-600">
                  A tua conta foi criada! Guarda estes dados:
                </p>
                <div className="mx-auto max-w-xs rounded-lg bg-white p-4 text-left">
                  <p className="text-sm text-brown-500">Password temporária:</p>
                  <p className="mt-1 font-mono text-lg font-bold text-brown-900">
                    {account.password}
                  </p>
                </div>
                <p className="text-xs text-brown-400">
                  Podes alterar a password depois de entrar.
                </p>
              </div>
            ) : null}
            <a
              href="/membro"
              className="mt-5 inline-block rounded-md bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
            >
              Entrar na minha área
            </a>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm text-brown-600">
              O teu ebook está pronto. Clica abaixo para descarregar.
            </p>
            <a
              href="/downloads/Os_7_Veus_ebook.pdf"
              download
              className="mt-5 inline-block rounded-md bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
            >
              Descarregar Ebook
            </a>
          </div>
        )}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-xl bg-red-50 px-8 py-6 text-center">
        <p className="text-brown-700">
          Ocorreu um erro com o pagamento. Por favor, tenta novamente ou contacta-nos por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div>
      {status === "loading" && (
        <div className="flex items-center justify-center py-6">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => {
        render: (container: HTMLElement) => void;
      };
    };
  }
}
