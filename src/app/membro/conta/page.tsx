"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { chapters } from "@/data/ebook";
import { experiences } from "@/data/experiences";
import Link from "next/link";

type Purchase = {
  product: string;
  created_at: string;
};

export default function ContaPage() {
  const { user, signOut } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [readingProgress, setReadingProgress] = useState<Record<string, boolean>>({});
  const [journalCount, setJournalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      const [purchasesRes, readingRes, journalRes] = await Promise.all([
        supabase
          .from("purchases")
          .select("product, created_at")
          .eq("user_id", userId),
        supabase
          .from("reading_progress")
          .select("chapter_slug, completed")
          .eq("user_id", userId),
        supabase
          .from("journal_entries")
          .select("chapter_slug")
          .eq("user_id", userId)
          .neq("content", ""),
      ]);

      if (purchasesRes.data) setPurchases(purchasesRes.data);
      if (readingRes.data) {
        const map: Record<string, boolean> = {};
        readingRes.data.forEach((row) => { map[row.chapter_slug] = row.completed; });
        setReadingProgress(map);
      }
      if (journalRes.data) setJournalCount(journalRes.data.length);
    } catch {
      // Falha na ligacao ao Supabase
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const completedChapters = chapters.filter((ch) => readingProgress[ch.slug]).length;
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const purchasedProducts = purchases.map((p) => p.product);
  const hasAllAccess = purchasedProducts.length >= 7;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-brown-900">A tua conta</h1>
          <p className="mt-2 font-serif text-sm italic text-brown-500">
            Tudo sobre o teu acesso e progresso
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {/* Profile */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                Perfil
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-brown-500">Email</span>
                  <span className="font-sans text-sm font-medium text-brown-800">
                    {user?.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-brown-500">Membro desde</span>
                  <span className="font-sans text-sm font-medium text-brown-800">
                    {memberSince}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-brown-500">Tipo de acesso</span>
                  <span className="inline-block rounded-full bg-sage/10 px-3 py-0.5 font-sans text-xs font-medium text-sage">
                    {hasAllAccess ? "Jornada Completa" : `${purchases.length} experiência${purchases.length !== 1 ? "s" : ""}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-brown-500">Acesso</span>
                  <span className="font-sans text-sm font-medium text-sage">
                    Permanente (sem prazo)
                  </span>
                </div>
              </div>
            </div>

            {/* Experiences purchased */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                As tuas experiências
              </p>
              <div className="mt-4 space-y-2">
                {experiences.map((exp) => {
                  const owned = purchasedProducts.some(
                    (p) => p.includes(exp.slug.replace("veu-", "").replace("da-", "").replace("do-", ""))
                  );
                  return (
                    <div
                      key={exp.slug}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                        owned ? "bg-sage/5" : "bg-brown-50/50"
                      }`}
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{
                          backgroundColor: owned ? exp.color : exp.color + "40",
                        }}
                      >
                        {exp.number}
                      </span>
                      <div className="flex-1">
                        <p
                          className={`font-serif text-sm ${
                            owned ? "text-brown-800" : "text-brown-400"
                          }`}
                        >
                          {exp.title}
                        </p>
                      </div>
                      {owned ? (
                        <span className="font-sans text-[0.6rem] font-medium uppercase tracking-wider text-sage">
                          Desbloqueada
                        </span>
                      ) : exp.status === "available" ? (
                        <Link
                          href={`/experiencias/${exp.slug}`}
                          className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400 hover:text-sage"
                        >
                          Adquirir
                        </Link>
                      ) : (
                        <span className="font-sans text-[0.6rem] text-brown-300">
                          {exp.launchLabel}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {!hasAllAccess && (
                <div className="mt-4 rounded-xl border border-sage/20 bg-sage/5 px-4 py-3 text-center">
                  <p className="font-sans text-xs text-brown-600">
                    Queres todas as experiências?{" "}
                    <Link
                      href="/experiencias#precos"
                      className="font-medium text-sage underline"
                    >
                      Upgrade para a Jornada Completa
                    </Link>{" "}
                    — o valor já pago é descontado.
                  </p>
                </div>
              )}
            </div>

            {/* Security */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                Segurança
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans text-sm font-medium text-brown-700">
                      Alterar senha
                    </p>
                    <p className="mt-0.5 font-sans text-xs text-brown-400">
                      Cria uma nova senha para a tua conta
                    </p>
                  </div>
                  <Link
                    href="/recuperar-senha"
                    className="shrink-0 rounded-lg border border-sage bg-white px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-sage transition-colors hover:bg-sage/5"
                  >
                    Alterar
                  </Link>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-brown-400">
                O teu progresso
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-serif text-2xl text-[#c9b896]">
                    {completedChapters}/{chapters.length}
                  </p>
                  <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                    capítulos lidos
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-[#7a8c6e]">{journalCount}</p>
                  <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                    reflexões escritas
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-[#baaacc]">
                    {Math.round((completedChapters / chapters.length) * 100)}%
                  </p>
                  <p className="font-sans text-[0.6rem] uppercase tracking-wider text-brown-400">
                    completo
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/membro"
                className="flex-1 rounded-lg bg-sage px-6 py-3 text-center font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
              >
                Voltar ao início
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.href = "/";
                }}
                className="flex-1 rounded-lg border border-brown-200 px-6 py-3 text-center font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-brown-500 transition-colors hover:border-brown-400 hover:text-brown-700"
              >
                Terminar sessão
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
