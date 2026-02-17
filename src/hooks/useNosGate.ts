/**
 * Hook para verificar se o utilizador pode aceder aos Nos
 *
 * O No so desbloqueia quando TODOS os capitulos do Espelho correspondente
 * estao completos. Admin/autora bypassa o gate.
 *
 * Aceita espelhoSlug opcional — por omissao usa "veu-da-ilusao".
 *
 * Uso:
 * const { espelhoCompleto, canAccessNos, espelhoProgress, nosProgress, loading } = useNosGate();
 * const { espelhoCompleto } = useNosGate("veu-do-medo");
 */

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { chapters as ilusaoChapters } from "@/data/ebook";
import { chapters as nosChapters } from "@/data/no-heranca";
import { loadEspelho, espelhoProgressKey } from "@/lib/content-registry";
import { supabase } from "@/lib/supabase";
import type { Chapter } from "@/data/ebook";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

export function useNosGate(espelhoSlug = "veu-da-ilusao") {
  const { user, profile, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [espelhoChapters, setEspelhoChapters] = useState<Chapter[]>(ilusaoChapters);
  const [loading, setLoading] = useState(true);

  const isAdmin =
    profile?.is_admin || AUTHOR_EMAILS.includes(user?.email || "");
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;

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

  const loadProgress = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("reading_progress")
      .select("chapter_slug, completed")
      .eq("user_id", userId);

    if (data) {
      const map: Record<string, boolean> = {};
      data.forEach((row) => {
        map[row.chapter_slug] = row.completed;
      });
      setProgress(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const espelhoCompleto = espelhoChapters.every(
    (ch) => progress[espelhoProgressKey(espelhoSlug, ch.slug)]
  );
  const canAccessNos = isAdmin || espelhoCompleto;

  const espelhoCompletedCount = espelhoChapters.filter(
    (ch) => progress[espelhoProgressKey(espelhoSlug, ch.slug)]
  ).length;
  const nosCompletedCount = nosChapters.filter(
    (ch) => progress[`nos-${ch.slug}`]
  ).length;

  return {
    espelhoCompleto,
    canAccessNos,
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
