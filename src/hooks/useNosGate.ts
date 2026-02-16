/**
 * Hook para verificar se o utilizador pode aceder aos Nós
 *
 * O Nó só desbloqueia quando TODOS os capítulos do Espelho correspondente
 * estão completos. Admin/autora bypassa o gate.
 *
 * Uso:
 * const { espelhoCompleto, canAccessNos, espelhoProgress, nosProgress, loading } = useNosGate();
 */

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { chapters as espelhoChapters } from "@/data/ebook";
import { chapters as nosChapters } from "@/data/no-heranca";
import { supabase } from "@/lib/supabase";

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

export function useNosGate() {
  const { user, profile, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const isAdmin =
    profile?.is_admin || AUTHOR_EMAILS.includes(user?.email || "");
  const hasMirrorsAccess = isAdmin || profile?.has_mirrors_access || false;

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

  const espelhoCompleto = espelhoChapters.every((ch) => progress[ch.slug]);
  const canAccessNos = isAdmin || espelhoCompleto;

  const espelhoCompletedCount = espelhoChapters.filter(
    (ch) => progress[ch.slug]
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
