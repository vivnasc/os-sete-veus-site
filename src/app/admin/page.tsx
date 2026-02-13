"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const ADMIN_EMAIL = "viv.saraiva@gmail.com";

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

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed">("pending");

  useEffect(() => {
    if (!authLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/entrar");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      loadPayments();
    }
  }, [user, filter]);

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

  if (authLoading || !user || user.email !== ADMIN_EMAIL) {
    return null;
  }

  return (
    <section className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-brown-900">
            Painel Admin
          </h1>
          <p className="mt-2 text-brown-600">Olá, Viviane! 👋</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/links-especiais"
            className="group rounded-lg border-2 border-brown-100 bg-white p-6 transition-all hover:border-sage hover:bg-sage/5"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sage/10 p-3">
                <svg
                  className="h-6 w-6 text-sage"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-brown-900">
                  Links Especiais
                </p>
                <p className="text-xs text-brown-500">Criar para livro físico</p>
              </div>
            </div>
          </Link>

          <div className="rounded-lg border-2 border-brown-100 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-50 p-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-sans text-xl font-bold text-brown-900">
                  {payments.filter((p) => p.status === "pending").length}
                </p>
                <p className="text-xs text-brown-500">Pagamentos pendentes</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-brown-100 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-50 p-3">
                <svg
                  className="h-6 w-6 text-green-600"
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
              <div>
                <p className="font-sans text-xl font-bold text-brown-900">
                  {payments.filter((p) => p.status === "confirmed").length}
                </p>
                <p className="text-xs text-brown-500">Pagamentos confirmados</p>
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
                : "bg-white text-brown-700 hover:bg-brown-50"
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter("confirmed")}
            className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
              filter === "confirmed"
                ? "bg-sage text-white"
                : "bg-white text-brown-700 hover:bg-brown-50"
            }`}
          >
            Confirmados
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-sage text-white"
                : "bg-white text-brown-700 hover:bg-brown-50"
            }`}
          >
            Todos
          </button>
        </div>

        {/* Payments List */}
        <div className="rounded-lg border border-brown-100 bg-white">
          {loading ? (
            <div className="p-12 text-center text-brown-500">
              A carregar...
            </div>
          ) : payments.length === 0 ? (
            <div className="p-12 text-center text-brown-500">
              Nenhum pagamento encontrado
            </div>
          ) : (
            <div className="divide-y divide-brown-100">
              {payments.map((payment) => (
                <div key={payment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-sans text-lg font-medium text-brown-900">
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

                      <div className="mt-3 grid gap-2 text-sm text-brown-600 sm:grid-cols-2">
                        <div>
                          <span className="text-brown-400">Método:</span>{" "}
                          {payment.payment_method === "bank_transfer"
                            ? "Transferência"
                            : payment.payment_method === "mpesa"
                              ? "MPesa"
                              : "PayPal"}
                        </div>
                        <div>
                          <span className="text-brown-400">Valor:</span>{" "}
                          {payment.amount} {payment.currency}
                        </div>
                        {payment.transaction_id && (
                          <div className="sm:col-span-2">
                            <span className="text-brown-400">Nº Transação:</span>{" "}
                            <code className="rounded bg-brown-50 px-2 py-0.5">
                              {payment.transaction_id}
                            </code>
                          </div>
                        )}
                        {payment.mpesa_reference && (
                          <div className="sm:col-span-2">
                            <span className="text-brown-400">Ref MPesa:</span>{" "}
                            <code className="rounded bg-brown-50 px-2 py-0.5">
                              {payment.mpesa_reference}
                            </code>
                          </div>
                        )}
                        {payment.notes && (
                          <div className="sm:col-span-2">
                            <span className="text-brown-400">Notas:</span>{" "}
                            {payment.notes}
                          </div>
                        )}
                        <div className="text-xs text-brown-400">
                          {new Date(payment.created_at).toLocaleString("pt-PT")}
                        </div>
                      </div>
                    </div>

                    {payment.status === "pending" && (
                      <div className="ml-4 flex gap-2">
                        <button
                          onClick={() => handleConfirm(payment.id)}
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                          ✓ Confirmar
                        </button>
                        <button
                          onClick={() => handleReject(payment.id)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
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
