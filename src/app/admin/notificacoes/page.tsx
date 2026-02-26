"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type AdminNotification = {
  id: string;
  type: string;
  title: string;
  message: string;
  details: Record<string, string | number | null>;
  read: boolean;
  created_at: string;
};

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

const TYPE_LABELS: Record<string, string> = {
  payment_proof: "Comprovativo",
  payment_created: "Novo Pagamento",
  payment_confirmed: "Confirmado",
  payment_rejected: "Rejeitado",
  code_request: "Pedido Codigo",
  code_redeemed: "Codigo Resgatado",
  special_link_used: "Link Especial",
  new_member: "Novo Membro",
  espelho_completed: "Espelho Completo",
  general: "Geral",
};

const TYPE_COLORS: Record<string, string> = {
  payment_proof: "bg-amber-100 text-amber-800",
  payment_created: "bg-blue-100 text-blue-800",
  payment_confirmed: "bg-green-100 text-green-800",
  payment_rejected: "bg-red-100 text-red-800",
  code_request: "bg-purple-100 text-purple-800",
  code_redeemed: "bg-emerald-100 text-emerald-800",
  special_link_used: "bg-indigo-100 text-indigo-800",
  new_member: "bg-teal-100 text-teal-800",
  espelho_completed: "bg-rose-100 text-rose-800",
  general: "bg-gray-100 text-gray-800",
};

const FILTER_OPTIONS = [
  { value: "all", label: "Todas" },
  { value: "unread", label: "Nao lidas" },
  { value: "payment_proof", label: "Comprovativos" },
  { value: "payment_created", label: "Pagamentos" },
  { value: "payment_confirmed", label: "Confirmados" },
  { value: "payment_rejected", label: "Rejeitados" },
  { value: "code_request", label: "Pedidos Codigo" },
  { value: "code_redeemed", label: "Codigos" },
  { value: "special_link_used", label: "Links" },
  { value: "new_member", label: "Novos Membros" },
  { value: "espelho_completed", label: "Espelhos" },
];

export default function NotificacoesPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("admin_notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (filter === "unread") {
        query = query.eq("read", false);
      } else if (filter !== "all") {
        query = query.eq("type", filter);
      }

      const { data } = await query;
      setNotifications((data as AdminNotification[]) || []);

      // Contar nao lidas
      const { count } = await supabase
        .from("admin_notifications")
        .select("*", { count: "exact", head: true })
        .eq("read", false);
      setUnreadCount(count || 0);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (user && isAdmin) {
      loadNotifications();
    }
  }, [user, isAdmin, loadNotifications]);

  async function markAsRead(id: string) {
    await supabase
      .from("admin_notifications")
      .update({ read: true })
      .eq("id", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }

  async function markAllAsRead() {
    await supabase
      .from("admin_notifications")
      .update({ read: true })
      .eq("read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return "agora mesmo";
    if (mins < 60) return `ha ${mins}min`;
    if (hours < 24) return `ha ${hours}h`;
    if (days < 7) return `ha ${days}d`;
    return date.toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "short",
    });
  }

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin"
                className="mb-2 inline-block text-sm text-sage hover:text-forest transition-colors"
              >
                ← Painel
              </Link>
              <h1 className="font-display text-3xl text-forest">
                Notificacoes
              </h1>
              {unreadCount > 0 && (
                <p className="mt-1 text-sage">
                  {unreadCount} nao {unreadCount === 1 ? "lida" : "lidas"}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="rounded border border-sage/30 px-4 py-2 text-sm text-sage transition-colors hover:bg-sage/10 hover:text-forest"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Filtros */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filter === opt.value
                  ? "bg-forest text-white"
                  : "bg-white/50 text-sage hover:bg-sage/10 border border-sage/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-lg border border-sage/20 bg-white/50 p-12 text-center">
            <p className="text-sage">Nenhuma notificacao encontrada.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`rounded-lg border bg-white/50 p-5 transition-all ${
                  notif.read
                    ? "border-sage/10 opacity-70"
                    : "border-sage/30 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          TYPE_COLORS[notif.type] || TYPE_COLORS.general
                        }`}
                      >
                        {TYPE_LABELS[notif.type] || notif.type}
                      </span>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                      )}
                      <span className="text-xs text-sage/60">
                        {formatDate(notif.created_at)}
                      </span>
                    </div>
                    <p className="font-medium text-forest">{notif.title}</p>
                    <p className="mt-1 text-sm text-sage">{notif.message}</p>
                    {notif.details &&
                      Object.keys(notif.details).length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                          {Object.entries(notif.details).map(
                            ([key, value]) =>
                              value != null && (
                                <span
                                  key={key}
                                  className="text-xs text-sage/70"
                                >
                                  <span className="font-medium">{key}:</span>{" "}
                                  {String(value)}
                                </span>
                              )
                          )}
                        </div>
                      )}
                  </div>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="shrink-0 rounded border border-sage/20 px-2 py-1 text-xs text-sage transition-colors hover:bg-sage/10"
                      title="Marcar como lida"
                    >
                      Lida
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
