"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLibrary } from "@/hooks/useLibrary";
import { useSubscriptionGate } from "@/contexts/SubscriptionContext";
import NavBar from "@/components/music/NavBar";

export default function ContaPage() {
  const router = useRouter();
  const { userId, favorites, recents } = useLibrary();
  const { status: subStatus, isPremium, requestPlay } = useSubscriptionGate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email || null);
      if (!data.user) {
        router.replace("/login");
      }
    });
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  if (!userId) return null;

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="max-w-md mx-auto px-6 pt-12 pb-32">
        <h1 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-8">A tua conta</h1>

        {/* Email */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-4">
          <p className="text-xs text-[#666680] mb-1">Email</p>
          <p className="text-sm text-[#F5F0E6]">{email || "..."}</p>
        </div>

        {/* Subscription */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-4">
          <p className="text-xs text-[#666680] mb-1">Subscricao</p>
          {isPremium ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-sm text-[#F5F0E6]">Veus Music — Activa</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-[#a0a0b0] mb-2">Plano gratuito — 1 faixa por album</p>
              <button
                onClick={() => requestPlay(2, undefined, "#C9A96E")}
                className="text-sm text-[#C9A96E] hover:underline"
              >
                Subscrever Veus Music
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-2xl font-semibold text-[#C9A96E]">{favorites.length}</p>
            <p className="text-xs text-[#666680] mt-1">Favoritos</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-2xl font-semibold text-[#C9A96E]">{recents.length}</p>
            <p className="text-xs text-[#666680] mt-1">Ouvidos recentemente</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Link
            href="/library"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm text-[#F5F0E6]">A tua biblioteca</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-red-500/10 transition-colors text-left"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="1.5" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span className="text-sm text-red-400">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}
