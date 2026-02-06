"use client";

import { useEffect, useRef, useState } from "react";

const PAYPAL_CLIENT_ID =
  "Afx27sTKwo_i7kvOAPaAjsAobOnXHZUhQ5EmC7LQ70cUE62P-QZSO5hIiT4V_RqEihsJFUKomoM9yaoo";

export default function PayPalButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "success" | "error">("idle");

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
                  description: "Os 7 Véus do Despertar — Ebook",
                  amount: {
                    value: "19.00",
                    currency_code: "USD",
                  },
                },
              ],
            });
          },
          onApprove: (
            _data: Record<string, unknown>,
            actions: { order: { capture: () => Promise<Record<string, unknown>> } }
          ) => {
            return actions.order.capture().then(() => {
              setStatus("success");
            });
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
        <p className="mt-3 leading-relaxed text-brown-600">
          O teu ebook está pronto. Clica no botão abaixo para descarregar.
        </p>
        <a
          href="/downloads/os-7-veus-do-despertar.pdf"
          download
          className="mt-5 inline-block rounded-md bg-sage px-8 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
        >
          Descarregar Ebook
        </a>
        <p className="mt-4 text-sm text-brown-400">
          Guarda este ficheiro — é teu para sempre.
        </p>
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

// PayPal SDK types
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => {
        render: (container: HTMLElement) => void;
      };
    };
  }
}
