"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function PayPalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("payment_id");
    if (!id) {
      router.push("/comprar-colecao");
      return;
    }
    setPaymentId(id);
  }, [searchParams, router]);

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center font-serif text-3xl text-brown-900">
          Pagamento via PayPal
        </h1>

        <div className="mt-8 rounded-xl border-2 border-sage/20 bg-white p-8">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
              <svg
                className="h-10 w-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.52a.77.77 0 0 1 .76-.64h8.78c2.886 0 5.175 2.29 5.175 5.175 0 6.852-7.284 9.282-10.593 9.282h-1.88l-1.11 5zm5.403-13.517h-2.61l-.896 4.522h1.794c1.638 0 3.356-.956 3.356-2.746 0-.958-.78-1.776-1.644-1.776zm6.284 0h-2.61l-.896 4.522h1.794c1.638 0 3.356-.956 3.356-2.746 0-.958-.78-1.776-1.644-1.776z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-brown-900">
              PayPal + Cartão de Crédito
            </h2>
            <p className="mt-3 text-brown-600">
              Integração PayPal em desenvolvimento
            </p>

            <div className="mt-8 rounded-lg bg-sage/5 p-6 text-left">
              <p className="mb-4 text-sm font-medium text-brown-900">
                Por enquanto, podes pagar via:
              </p>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    router.push(`/pagamento/bank_transfer?payment_id=${paymentId}`)
                  }
                  className="w-full rounded-lg border-2 border-brown-100 bg-white px-6 py-3 text-left font-sans text-sm font-medium text-brown-900 transition-colors hover:border-sage hover:bg-sage/5"
                >
                  💳 Transferência Bancária
                </button>
                <button
                  onClick={() =>
                    router.push(`/pagamento/mpesa?payment_id=${paymentId}`)
                  }
                  className="w-full rounded-lg border-2 border-brown-100 bg-white px-6 py-3 text-left font-sans text-sm font-medium text-brown-900 transition-colors hover:border-sage hover:bg-sage/5"
                >
                  📱 MPesa
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                📧{" "}
                <strong>Ou envia pagamento direto para:</strong>
                <br />
                <a
                  href="mailto:viv.saraiva@gmail.com"
                  className="font-medium text-blue-600 hover:underline"
                >
                  viv.saraiva@gmail.com
                </a>{" "}
                via PayPal
              </p>
            </div>
          </div>
        </div>

        {/* TODO: Implementar PayPal SDK
        <div id="paypal-button-container" className="mt-6"></div>
        */}
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
