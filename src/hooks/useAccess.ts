/**
 * Hook para verificar acessos do utilizador
 *
 * Uso:
 * const { hasBookAccess, hasMirrorsAccess, hasAnyAccess } = useAccess();
 *
 * if (!hasBookAccess) {
 *   return <UpsellPage />;
 * }
 */

import { useAuth } from "@/components/AuthProvider";
import { ADMIN_EMAILS } from "@/lib/constants";

export function useAccess() {
  const { profile, user, loading } = useAuth();
  const hasBookAccess = profile?.has_book_access ?? false;
  const hasMirrorsAccess = profile?.has_mirrors_access ?? false;
  const hasAudiobookAccess = profile?.has_audiobook_access ?? false;
  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  // Early access: donors (jornada completa, pack3) ou flag explícita no perfil
  const hasEarlyAccess =
    isAdmin ||
    profile?.has_early_access === true ||
    hasJourneyOrPackPurchase(profile?.purchased_products);

  // Admin tem acesso a tudo
  const hasAnyAccess = isAdmin || hasBookAccess || hasMirrorsAccess || hasAudiobookAccess;

  return {
    hasBookAccess: isAdmin || hasBookAccess,
    hasMirrorsAccess: isAdmin || hasMirrorsAccess,
    hasAudiobookAccess: isAdmin || hasAudiobookAccess,
    hasEarlyAccess,
    hasAnyAccess,
    isAdmin,
    isLoading: loading,
    purchasedProducts: profile?.purchased_products ?? [],
  };
}

/**
 * Verifica se o utilizador comprou Jornada Completa ou Pack 3
 * (donors que recebem early access)
 */
function hasJourneyOrPackPurchase(
  products?: Array<{ type: string; date: string; code?: string }>
): boolean {
  if (!products) return false;
  return products.some(
    (p) => p.type === "journey" || p.type === "pack3" || p.type === "jornada_completa"
  );
}
