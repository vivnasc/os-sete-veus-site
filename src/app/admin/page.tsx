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
}

export default function AdminPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !profile?.is_admin)) {
      router.push("/entrar");
    }
  }, [user, profile, authLoading, router]);

  useEffect(() => {
    if (user && profile?.is_admin) {
      loadStats();
    }
  }, [user, profile]);

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

      setStats({
        totalMembers: totalMembers || 0,
        activeMembers: activeMembers || 0,
        totalPurchases: totalPurchases || 0,
        pendingPayments: pendingPayments || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || !user || !profile?.is_admin) {
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
            <Link
              href="/membro"
              className="text-sm text-sage hover:text-forest transition-colors"
            >
              Ver como membro →
            </Link>
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
          <h2 className="mb-6 font-display text-2xl text-forest">
            Atividade Recente
          </h2>
          <div className="rounded-lg border border-sage/20 bg-white/50 p-8">
            <p className="text-sage text-center">
              📈 Dashboard em desenvolvimento...
              <br />
              <span className="text-sm">
                Aqui verás: novos membros, compras recentes, downloads, comentários
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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
