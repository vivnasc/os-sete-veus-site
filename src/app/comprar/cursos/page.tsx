"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { courses, getCourse, COURSE_PRICING } from "@/data/courses";
import type { Course } from "@/data/courses";

type PaymentMethod = "mpesa" | "paypal";

export default function ComprarCursosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const preselectedSlug = searchParams.get("curso");
  const preselected = preselectedSlug ? getCourse(preselectedSlug) : null;

  const [purchasing, setPurchasing] = useState<Course | null>(preselected || null);
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [moeda, setMoeda] = useState<"MZN" | "USD">("MZN");

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const available = courses.filter((c) => c.status === "available");

  async function handlePayment() {
    if (!purchasing || !email || !paymentMethod) {
      setError("Preenche todos os campos obrigatorios");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const isPayPal = paymentMethod === "paypal";
      const amount = isPayPal ? purchasing.priceUSD : purchasing.priceMT;
      const currency = isPayPal ? "USD" : "MZN";

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          access_type_code: purchasing.accessTypeCode,
          payment_method: paymentMethod,
          amount,
          currency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao criar pedido");
        setLoading(false);
        return;
      }

      const params = new URLSearchParams({
        payment_id: data.payment_id,
        amount: String(amount),
        product: purchasing.title,
        email,
      });
      router.push(`/pagamento/${paymentMethod}?${params.toString()}`);
    } catch {
      setError("Erro de conexao. Tenta novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-stone-100">
      {/* Header */}
      <div className="bg-gradient-to-b from-brown-800 to-brown-900 py-12 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-brown-300">
            Comprar curso
          </p>
          <h1 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
            Ensino e mentoria
          </h1>

          {/* Currency toggle */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-lg bg-white/10 p-1">
              <button
                onClick={() => setMoeda("MZN")}
                className={`rounded-md px-6 py-2 transition-all ${
                  moeda === "MZN"
                    ? "bg-white font-bold text-brown-900"
                    : "text-white hover:bg-white/20"
                }`}
              >
                MZN
              </button>
              <button
                onClick={() => setMoeda("USD")}
                className={`rounded-md px-6 py-2 transition-all ${
                  moeda === "USD"
                    ? "bg-white font-bold text-brown-900"
                    : "text-white hover:bg-white/20"
                }`}
              >
                USD
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Course selection */}
        <div className="space-y-4">
          {available.map((course) => (
            <button
              key={course.slug}
              type="button"
              onClick={() => {
                setPurchasing(course);
                setError("");
              }}
              className={`w-full rounded-2xl border-2 bg-white p-6 text-left transition-all ${
                purchasing?.slug === course.slug
                  ? "border-sage shadow-lg"
                  : "border-brown-100 hover:border-brown-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-4 w-4 rounded-full border-2 ${
                        purchasing?.slug === course.slug
                          ? "border-sage bg-sage"
                          : "border-brown-200"
                      }`}
                    />
                    <div>
                      <h3 className="font-serif text-lg text-brown-900">
                        {course.title}
                      </h3>
                      <p className="font-sans text-xs text-brown-400">
                        {course.subtitle} · {course.lessons} licoes · {course.totalDuration}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="font-serif text-xl font-bold text-brown-900">
                  {moeda === "MZN"
                    ? `${course.priceMT.toLocaleString()} MZN`
                    : `$${course.priceUSD}`}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Pack info */}
        <div className="mt-6 rounded-xl border border-brown-100 bg-white/50 p-4 text-center text-sm text-brown-500">
          Pack 3 cursos: {moeda === "MZN" ? `${COURSE_PRICING.pack3.mt.toLocaleString()} MZN` : `$${COURSE_PRICING.pack3.usd}`} ({COURSE_PRICING.pack3Savings}% desconto)
          &nbsp;·&nbsp;
          Todos os cursos: {moeda === "MZN" ? `${COURSE_PRICING.allCourses.mt.toLocaleString()} MZN` : `$${COURSE_PRICING.allCourses.usd}`} ({COURSE_PRICING.allSavings}% desconto)
        </div>

        {/* Checkout form */}
        {purchasing && (
          <div className="mt-8 rounded-2xl border-2 border-sage/30 bg-white p-8 shadow-lg">
            <div className="text-center">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sage">
                Finalizar compra
              </p>
              <h2 className="mt-2 font-serif text-2xl text-brown-900">
                {purchasing.title}
              </h2>
              <p className="mt-2 font-serif text-3xl font-bold text-brown-900">
                {purchasing.priceMT.toLocaleString()} MZN
                <span className="ml-2 text-base font-normal text-brown-400">
                  / ${purchasing.priceUSD} USD
                </span>
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="checkout-email" className="font-sans text-sm font-medium text-brown-700">
                  Email *
                </label>
                <input
                  id="checkout-email"
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
                <label htmlFor="checkout-phone" className="font-sans text-sm font-medium text-brown-700">
                  Telemovel (opcional)
                </label>
                <input
                  id="checkout-phone"
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
                  Metodo de Pagamento *
                </p>
                <div className="mt-3 space-y-2">
                  {([
                    { key: "mpesa" as const, label: "MPesa", desc: "Pagamento via telemovel" },
                    { key: "paypal" as const, label: "PayPal / Cartao", desc: "Pagamento internacional" },
                  ]).map((pm) => (
                    <button
                      key={pm.key}
                      type="button"
                      onClick={() => setPaymentMethod(pm.key)}
                      className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                        paymentMethod === pm.key
                          ? "border-sage bg-sage/5"
                          : "border-brown-100 bg-white hover:border-brown-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-4 w-4 rounded-full border-2 ${
                            paymentMethod === pm.key ? "border-sage bg-sage" : "border-brown-200"
                          }`}
                        />
                        <div>
                          <p className="font-sans text-sm font-medium text-brown-900">{pm.label}</p>
                          <p className="text-xs text-brown-500">{pm.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="button"
                onClick={handlePayment}
                disabled={loading || !paymentMethod}
                className={`w-full rounded-lg bg-sage px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark ${
                  loading || !paymentMethod ? "opacity-60" : ""
                }`}
              >
                {loading ? "A processar..." : "Continuar para Pagamento"}
              </button>

              <button
                type="button"
                onClick={() => setPurchasing(null)}
                className="w-full text-center font-sans text-xs text-brown-400 hover:text-brown-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
