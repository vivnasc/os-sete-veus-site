"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Payment {
  id: string;
  user_email: string;
  user_phone: string | null;
  access_type_code: string;
  payment_method: string;
  amount: number;
  currency: string;
  status: string;
  transaction_id: string | null;
  mpesa_reference: string | null;
  notes: string | null;
  created_at: string;
}

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

export default function PagamentosPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed">("pending");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (user && isAdmin) {
      loadPayments();
    }
  }, [user, isAdmin, filter]);

  async function loadPayments() {
    setLoading(true);

    let query = supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading payments:", error);
    } else {
      setPayments(data || []);
    }

    setLoading(false);
  }

  async function handleConfirm(paymentId: string) {
    if (!confirm("Confirmar este pagamento?")) return;

    try {
      const response = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id: paymentId, action: "confirm" }),
      });

      if (response.ok) {
        alert("Pagamento confirmado!");
        loadPayments();
      } else {
        alert("Erro ao confirmar pagamento");
      }
    } catch {
      alert("Erro de conexão");
    }
  }

  async function handleReject(paymentId: string) {
    const reason = prompt("Motivo da rejeição:");
    if (!reason) return;

    try {
      const response = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: paymentId,
          action: "reject",
          rejection_reason: reason,
        }),
      });

      if (response.ok) {
        alert("Pagamento rejeitado");
        loadPayments();
      } else {
        alert("Erro ao rejeitar pagamento");
      }
    } catch {
      alert("Erro de conexão");
    }
  }

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-forest">
              Gestão de Pagamentos
            </h1>
            <p className="mt-2 text-sage">
              Aprovar transferências bancárias e pagamentos MPesa
            </p>
          </div>
          <Link
            href="/admin"
            className="text-sm text-sage hover:text-forest transition-colors"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-sage/20 bg-white/50 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-50 p-3">
                <span className="text-2xl">⏳</span>
              </div>
              <div>
                <p className="text-2xl font-display text-forest">
                  {payments.filter((p) => p.status === "pending").length}
                </p>
                <p className="text-sm text-sage">Pendentes</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-sage/20 bg-white/50 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-50 p-3">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <p className="text-2xl font-display text-forest">
                  {payments.filter((p) => p.status === "confirmed").length}
                </p>
                <p className="text-sm text-sage">Confirmados</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-sage/20 bg-white/50 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-50 p-3">
                <span className="text-2xl">✗</span>
              </div>
              <div>
                <p className="text-2xl font-display text-forest">
                  {payments.filter((p) => p.status === "rejected").length}
                </p>
                <p className="text-sm text-sage">Rejeitados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter("pending")}
            className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
              filter === "pending"
                ? "bg-sage text-white"
                : "bg-white text-forest hover:bg-sage/10"
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter("confirmed")}
            className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
              filter === "confirmed"
                ? "bg-sage text-white"
                : "bg-white text-forest hover:bg-sage/10"
            }`}
          >
            Confirmados
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-sage text-white"
                : "bg-white text-forest hover:bg-sage/10"
            }`}
          >
            Todos
          </button>
        </div>

        {/* Payments List */}
        <div className="rounded-lg border border-sage/20 bg-white/50">
          {loading ? (
            <div className="p-12 text-center text-sage">
              A carregar...
            </div>
          ) : payments.length === 0 ? (
            <div className="p-12 text-center text-sage">
              Nenhum pagamento encontrado
            </div>
          ) : (
            <div className="divide-y divide-sage/10">
              {payments.map((payment) => (
                <div key={payment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-display text-lg text-forest">
                          {payment.user_email}
                        </p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            payment.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : payment.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {payment.status === "pending"
                            ? "Pendente"
                            : payment.status === "confirmed"
                              ? "Confirmado"
                              : "Rejeitado"}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-2 text-sm text-sage sm:grid-cols-2">
                        <div>
                          <span className="text-sage/70">Método:</span>{" "}
                          {payment.payment_method === "bank_transfer"
                            ? "Transferência Bancária"
                            : payment.payment_method === "mpesa"
                              ? "MPesa"
                              : "PayPal"}
                        </div>
                        <div>
                          <span className="text-sage/70">Valor:</span>{" "}
                          <strong>{payment.amount} {payment.currency}</strong>
                        </div>
                        {payment.transaction_id && (
                          <div className="sm:col-span-2">
                            <span className="text-sage/70">Nº Transação:</span>{" "}
                            <code className="rounded bg-sage/10 px-2 py-0.5 text-forest">
                              {payment.transaction_id}
                            </code>
                          </div>
                        )}
                        {payment.mpesa_reference && (
                          <div className="sm:col-span-2">
                            <span className="text-sage/70">Ref MPesa:</span>{" "}
                            <code className="rounded bg-sage/10 px-2 py-0.5 text-forest">
                              {payment.mpesa_reference}
                            </code>
                          </div>
                        )}
                        {payment.notes && (
                          <div className="sm:col-span-2">
                            <span className="text-sage/70">Notas:</span>{" "}
                            {payment.notes}
                          </div>
                        )}
                        <div className="text-xs text-sage/50">
                          {new Date(payment.created_at).toLocaleString("pt-PT")}
                        </div>
                      </div>
                    </div>

                    {payment.status === "pending" && (
                      <div className="ml-4 flex gap-2">
                        <button
                          onClick={() => handleConfirm(payment.id)}
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                        >
                          ✓ Confirmar
                        </button>
                        <button
                          onClick={() => handleReject(payment.id)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                        >
                          ✗ Rejeitar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
