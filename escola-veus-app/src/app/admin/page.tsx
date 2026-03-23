"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Stats = {
  totalProfiles: number;
  activeSubscribers: number;
  totalCourses: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const [profilesRes, subscribersRes] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("subscription_status", "active"),
    ]);

    setStats({
      totalProfiles: profilesRes.count ?? 0,
      activeSubscribers: subscribersRes.count ?? 0,
      totalCourses: 20,
    });
  }

  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl font-semibold text-escola-creme">
        Dashboard
      </h2>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        <StatCard
          label="Membros"
          value={stats?.totalProfiles ?? "..."}
        />
        <StatCard
          label="Subscritores"
          value={stats?.activeSubscribers ?? "..."}
        />
        <StatCard
          label="Cursos"
          value={stats?.totalCourses ?? 20}
        />
      </div>

      {/* Quick actions */}
      <h3 className="mb-3 text-sm font-medium text-escola-creme">
        Accoes rapidas
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <QuickAction href="/admin/conteudo" label="Publicar conteudo" />
        <QuickAction href="/admin/cursos" label="Gerir cursos" />
        <QuickAction href="/admin/analytics" label="Ver analytics" />
        <QuickAction href="/" label="Ver site" />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-escola-border bg-escola-card p-4 text-center">
      <p className="text-2xl font-semibold text-escola-dourado">{value}</p>
      <p className="mt-1 text-xs text-escola-creme-50">{label}</p>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-lg border border-escola-border bg-escola-card px-4 py-3 text-center text-sm text-escola-creme transition-colors hover:border-escola-dourado/40"
    >
      {label}
    </a>
  );
}
