"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AnalyticsData = {
  totalMembers: number;
  activeSubscribers: number;
  trialUsers: number;
  cancelledUsers: number;
};

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const [total, active, trial, cancelled] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("subscription_status", "active"),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("subscription_status", "trial"),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("subscription_status", "cancelled"),
    ]);

    setData({
      totalMembers: total.count ?? 0,
      activeSubscribers: active.count ?? 0,
      trialUsers: trial.count ?? 0,
      cancelledUsers: cancelled.count ?? 0,
    });
  }

  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl font-semibold text-escola-creme">
        Analytics
      </h2>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Total membros" value={data?.totalMembers ?? "..."} />
        <MetricCard label="Subscritores activos" value={data?.activeSubscribers ?? "..."} />
        <MetricCard label="Em trial" value={data?.trialUsers ?? "..."} />
        <MetricCard label="Cancelados" value={data?.cancelledUsers ?? "..."} />
      </div>

      {/* Placeholder for charts */}
      <div className="rounded-xl border border-escola-border bg-escola-card p-8 text-center">
        <p className="text-sm text-escola-creme-50">
          Graficos de crescimento, retencao e receita em breve.
        </p>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border border-escola-border bg-escola-card p-4">
      <p className="text-2xl font-semibold text-escola-dourado">{value}</p>
      <p className="mt-1 text-xs text-escola-creme-50">{label}</p>
    </div>
  );
}
