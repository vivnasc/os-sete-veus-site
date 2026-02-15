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

export function useAccess() {
  const { profile, user } = useAuth();

  const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];
  const hasBookAccess = profile?.has_book_access ?? false;
  const hasMirrorsAccess = profile?.has_mirrors_access ?? false;
  const hasAudiobookAccess = profile?.has_audiobook_access ?? false;
  const isAdmin = profile?.is_admin || AUTHOR_EMAILS.includes(user?.email || "");

  // Admin tem acesso a tudo
  const hasAnyAccess = isAdmin || hasBookAccess || hasMirrorsAccess || hasAudiobookAccess;

  return {
    hasBookAccess: isAdmin || hasBookAccess,
    hasMirrorsAccess: isAdmin || hasMirrorsAccess,
    hasAudiobookAccess: isAdmin || hasAudiobookAccess,
    hasAnyAccess,
    isAdmin,
    isLoading: !user && !profile,
    purchasedProducts: profile?.purchased_products ?? [],
  };
}
