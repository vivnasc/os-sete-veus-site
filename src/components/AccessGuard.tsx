/**
 * AccessGuard - Protege rotas baseado no tipo de acesso
 *
 * Uso:
 * <AccessGuard requiredAccess="book">
 *   <ConteudoDoLivro />
 * </AccessGuard>
 */

"use client";

import { useAccess } from "@/hooks/useAccess";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

type AccessType = "book" | "mirrors" | "audiobook" | "any";

interface AccessGuardProps {
  requiredAccess: AccessType;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AccessGuard({ requiredAccess, children, fallback }: AccessGuardProps) {
  const { user } = useAuth();
  const { hasBookAccess, hasMirrorsAccess, hasAudiobookAccess, hasAnyAccess, isLoading } = useAccess();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent"></div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <div className="max-w-md text-center">
          <h2 className="font-serif text-2xl text-brown-900">Acesso Restrito</h2>
          <p className="mt-4 text-brown-600">
            Precisas de fazer login para aceder a este conteúdo.
          </p>
          <Link
            href="/entrar"
            className="mt-6 inline-block rounded-lg bg-sage px-8 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
          >
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  // Check access
  let hasAccess = false;
  let accessName = "";

  switch (requiredAccess) {
    case "book":
      hasAccess = hasBookAccess;
      accessName = "livro digital";
      break;
    case "mirrors":
      hasAccess = hasMirrorsAccess;
      accessName = "espelhos contemplativos";
      break;
    case "audiobook":
      hasAccess = hasAudiobookAccess;
      accessName = "audiobook";
      break;
    case "any":
      hasAccess = hasAnyAccess;
      accessName = "qualquer produto";
      break;
  }

  // No access - show fallback or default message
  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <div className="max-w-md text-center">
          <h2 className="font-serif text-2xl text-brown-900">Acesso Não Disponível</h2>
          <p className="mt-4 text-brown-600">
            Precisas de acesso ao <strong>{accessName}</strong> para ver este conteúdo.
          </p>
          <Link
            href="/comprar"
            className="mt-6 inline-block rounded-lg bg-sage px-8 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-sage-dark"
          >
            Ver Opções de Compra
          </Link>
        </div>
      </div>
    );
  }

  // Has access - render children
  return <>{children}</>;
}
