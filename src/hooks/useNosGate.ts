/**
 * Hook para verificar se o utilizador pode aceder aos Nos
 *
 * O No so desbloqueia quando:
 * 1. TODOS os capitulos do Espelho correspondente estao completos
 * 2. O utilizador comprou o No (individual, pack3, ou jornada)
 *
 * Admin/autora bypassa o gate.
 *
 * Aceita espelhoSlug opcional — por omissao usa "veu-da-ilusao".
 *
 * Uso:
 * const { espelhoCompleto, canAccessNos, hasNosPurchased, loading } = useNosGate();
 * const { espelhoCompleto } = useNosGate("veu-do-medo");
 */

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { chapters as ilusaoChapters } from "@/data/ebook";
import { getNosForEspelho } from "@/data/nos-collection";
import { loadEspelho, espelhoProgressKey, loadNos, nosProgressKey } from "@/lib/content-registry";
import { supabase } from "@/lib/supabase";
import type { Chapter } from "@/data/ebook";
import { ADMIN_EMAILS } from "@/lib/constants";

export function useNosGate(espelhoSlug = "veu-da-ilusao") {
  const { user, profile, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [espelhoChapters, setEspelhoChapters] = useState<Chapter[]>(ilusaoChapters);
  const [nosChapters, setNosChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;

  // Verificar se o No esta incluido (pack3/jornada) ou comprado individualmente
  const nosBook = getNosForEspelho(espelhoSlug);
  const purchasedProducts = profile?.purchased_products ?? [];
  const hasNosIncluded = isAdmin || purchasedProducts.some(
    (p) => p.type === "journey" || p.type === "pack3" || p.type === "jornada_completa"
  );
  const hasNosPurchasedIndividually = purchasedProducts.some(
    (p) => p.type === `no-individual` && p.code === nosBook?.slug
  ) || purchasedProducts.some(
    (p) => p.type === nosBook?.slug
  );
  const hasNosPurchased = hasNosIncluded || hasNosPurchasedIndividually;

  // Load chapters for the specified espelho
  useEffect(() => {
    if (espelhoSlug === "veu-da-ilusao") {
      setEspelhoChapters(ilusaoChapters);
      return;
    }
    loadEspelho(espelhoSlug).then((mod) => {
      if (mod) setEspelhoChapters(mod.chapters);
    });
  }, [espelhoSlug]);

  // Load chapters for the corresponding nos
  useEffect(() => {
    if (!nosBook?.slug) return;
    loadNos(nosBook.slug).then((mod) => {
      if (mod) setNosChapters(mod.chapters);
    });
  }, [nosBook?.slug]);

  const loadProgress = useCallback(async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("reading_progress")
        .select("chapter_slug, completed")
        .eq("user_id", userId);

      if (error) {
        console.error("[useNosGate] Error loading progress:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const map: Record<string, boolean> = {};
        data.forEach((row) => {
          map[row.chapter_slug] = row.completed;
        });
        setProgress(map);
      }
    } catch (err) {
      console.error("[useNosGate] Unexpected error:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const espelhoCompleto = espelhoChapters.every(
    (ch) => progress[espelhoProgressKey(espelhoSlug, ch.slug)]
  );
  const canAccessNos = isAdmin || (espelhoCompleto && hasNosPurchased);

  const espelhoCompletedCount = espelhoChapters.filter(
    (ch) => progress[espelhoProgressKey(espelhoSlug, ch.slug)]
  ).length;

  const nosSlug = nosBook?.slug || "no-da-heranca";
  const nosCompletedCount = nosChapters.filter(
    (ch) => progress[nosProgressKey(nosSlug, ch.slug)]
  ).length;

  return {
    espelhoCompleto,
    canAccessNos,
    hasNosPurchased,
    hasNosIncluded,
    nosBook,
    espelhoCompletedCount,
    espelhoTotalCount: espelhoChapters.length,
    nosCompletedCount,
    nosTotalCount: nosChapters.length,
    progress,
    isAdmin,
    hasMirrorsAccess,
    authLoading,
    loading,
    user,
  };
}
