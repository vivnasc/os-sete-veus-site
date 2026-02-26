"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Stats {
  totalMembers: number;
  activeMembers: number;
  totalPurchases: number;
  pendingPayments: number;
  totalEcos: number;
  totalReconhecimentos: number;
  unreadNotifications: number;
}

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

export default function AdminPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentNotifs, setRecentNotifs] = useState<{
    id: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    created_at: string;
  }[]>([]);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (user && isAdmin) {
      loadStats();
    }
  }, [user, isAdmin]);

  async function loadStats() {
    setLoading(true);

    try {
      // Get total members
      const { count: totalMembers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get active members
      const { count: activeMembers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("subscription_status", "active");

      // Get total purchases
      const { count: totalPurchases } = await supabase
        .from("purchases")
        .select("*", { count: "exact", head: true });

      // Get pending payments
      const { count: pendingPayments } = await supabase
        .from("payments")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Community stats
      const { count: totalEcos } = await supabase
        .from("ecos")
        .select("*", { count: "exact", head: true })
        .gt("expires_at", new Date().toISOString());

      const { count: totalReconhecimentos } = await supabase
        .from("reconhecimentos")
        .select("*", { count: "exact", head: true });

      // Unread notifications count
      const { count: unreadNotifications } = await supabase
        .from("admin_notifications")
        .select("*", { count: "exact", head: true })
        .eq("read", false);

      // Recent notifications (last 8)
      const { data: recentNotifsData } = await supabase
        .from("admin_notifications")
        .select("id, type, title, message, read, created_at")
        .order("created_at", { ascending: false })
        .limit(8);

      setRecentNotifs(recentNotifsData || []);

      setStats({
        totalMembers: totalMembers || 0,
        activeMembers: activeMembers || 0,
        totalPurchases: totalPurchases || 0,
        pendingPayments: pendingPayments || 0,
        totalEcos: totalEcos || 0,
        totalReconhecimentos: totalReconhecimentos || 0,
        unreadNotifications: unreadNotifications || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl text-forest">
                Painel da Autora
              </h1>
              <p className="mt-1 text-sage">
                Olá, Vivianne! ✨
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/membro"
                className="text-sm text-sage hover:text-forest transition-colors"
              >
                Ver como membro
              </Link>
              <button
                onClick={async () => {
                  try {
                    const { supabase: sb } = await import("@/lib/supabase");
                    await sb.auth.signOut();
                  } catch {}
                  window.location.href = "/";
                }}
                className="rounded border border-sage/30 px-3 py-1.5 text-sm text-sage transition-colors hover:bg-sage/10 hover:text-forest"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Membros Totais"
            value={loading ? "..." : stats?.totalMembers || 0}
            icon="👥"
            href="/admin/membros"
          />
          <StatCard
            title="Membros Ativos"
            value={loading ? "..." : stats?.activeMembers || 0}
            icon="⭐"
            href="/admin/membros"
          />
          <StatCard
            title="Compras"
            value={loading ? "..." : stats?.totalPurchases || 0}
            icon="🛒"
            href="/admin/vendas"
          />
          <StatCard
            title="Pagamentos Pendentes"
            value={loading ? "..." : stats?.pendingPayments || 0}
            icon="⏳"
            href="/admin/pagamentos"
            alert={stats?.pendingPayments ? stats.pendingPayments > 0 : false}
          />
          <StatCard
            title="Ecos Activos"
            value={loading ? "..." : stats?.totalEcos || 0}
            icon="~"
            href="/comunidade"
          />
          <StatCard
            title="Reconhecimentos"
            value={loading ? "..." : stats?.totalReconhecimentos || 0}
            icon="◇"
            href="/comunidade"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="mb-6 font-display text-2xl text-forest">
            Acções Rápidas
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              title="Livro Físico"
              description="Ver e editar página de vendas"
              href="/livros/edicao-fisica"
              icon="📖"
            />
            <ActionCard
              title="Pagamentos Pendentes"
              description="Aprovar transferências e pagamentos"
              href="/admin/pagamentos"
              icon="💳"
              badge={stats?.pendingPayments || 0}
            />
            <ActionCard
              title="Gestão de Membros"
              description="Ver e gerir todos os membros"
              href="/admin/membros"
              icon="👥"
            />
            <ActionCard
              title="Links Especiais"
              description="Criar links para venda directa"
              href="/admin/links-especiais"
              icon="🔗"
            />
            <ActionCard
              title="Ecos — Comunidade"
              description="Ver a comunidade e moderar ecos"
              href="/comunidade"
              icon="~"
            />
            <ActionCard
              title="Códigos de Acesso"
              description="Gerar e gerir códigos do livro"
              href="/autora/codigos"
              icon="🔑"
            />
            <ActionCard
              title="Conteúdo Pronto"
              description="Posts prontos com imagem + legenda + WhatsApp"
              href="/painel/marketing"
              icon="📱"
            />
            <ActionCard
              title="Criar Imagem"
              description="Gerador livre com mockups e capas"
              href="/painel/marketing/gerador"
              icon="🎨"
            />
            <ActionCard
              title="Notificacoes"
              description="Ver todas as notificacoes"
              href="/admin/notificacoes"
              icon="🔔"
              badge={stats?.unreadNotifications || 0}
            />
            <ActionCard
              title="Analytics"
              description="Métricas e estatísticas"
              href="/admin/analytics"
              icon="📊"
            />
            <ActionCard
              title="Configurações"
              description="Ajustes gerais do site"
              href="/admin/configuracoes"
              icon="⚙️"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl text-forest">
              Atividade Recente
            </h2>
            <Link
              href="/admin/notificacoes"
              className="text-sm text-sage hover:text-forest transition-colors"
            >
              Ver todas →
            </Link>
          </div>
          {recentNotifs.length === 0 ? (
            <div className="rounded-lg border border-sage/20 bg-white/50 p-8 text-center">
              <p className="text-sage">Nenhuma actividade recente.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentNotifs.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 rounded-lg border bg-white/50 px-4 py-3 ${
                    notif.read ? "border-sage/10 opacity-60" : "border-sage/25"
                  }`}
                >
                  {!notif.read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-forest">
                      {notif.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-sage">
                      {notif.message}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-sage/50">
                    {formatTimeAgo(notif.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "agora";
  if (mins < 60) return `${mins}min`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "short",
  });
}

function StatCard({
  title,
  value,
  icon,
  href,
  alert,
}: {
  title: string;
  value: string | number;
  icon: string;
  href?: string;
  alert?: boolean;
}) {
  const content = (
    <div className="rounded-lg border border-sage/20 bg-white/50 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-sage">{title}</p>
          <p className="mt-2 font-display text-3xl text-forest">{value}</p>
        </div>
        <div className="relative">
          <div className="text-4xl opacity-50">{icon}</div>
          {alert && (
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

function ActionCard({
  title,
  description,
  href,
  icon,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-lg border border-sage/20 bg-white/50 p-6 transition-all hover:border-sage/40 hover:shadow-md"
    >
      {badge !== undefined && badge > 0 && (
        <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
          {badge}
        </div>
      )}
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="font-display text-lg text-forest group-hover:text-sage transition-colors">
        {title}
      </h3>
      <p className="mt-1 text-sm text-sage/70">{description}</p>
    </Link>
  );
}
