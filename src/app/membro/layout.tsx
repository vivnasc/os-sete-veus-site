"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const memberNav = [
  { href: "/membro", label: "Início" },
  { href: "/membro/espelhos/veu-da-ilusao", label: "Espelhos" },
  { href: "/membro/nos", label: "Nós" },
  { href: "/membro/praticas", label: "Práticas" },
  { href: "/membro/espelho", label: "Espelho" },
  { href: "/membro/conclusao", label: "Cerimónia" },
  { href: "/membro/conta", label: "Conta" },
];

const AUTHOR_EMAILS = ["viv.saraiva@gmail.com"];

export default function MembroLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [loadingLento, setLoadingLento] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoadingLento(true), 3000);
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <section className="bg-cream px-6 py-32 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
        {loadingLento && (
          <div className="mt-6">
            <p className="text-sm text-brown-400">A ligação está mais lenta do que o habitual...</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm text-sage underline hover:text-sage-dark"
            >
              Recarregar página
            </button>
          </div>
        )}
      </section>
    );
  }

  if (!user) {
    router.push("/entrar");
    return null;
  }

  const isAuthor = AUTHOR_EMAILS.includes(user.email || "");

  return (
    <div className="min-h-screen bg-cream">
      {/* Member navigation bar */}
      <div className="border-b border-sage/20 bg-[#e8f0e8]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
            {memberNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[0.75rem] uppercase tracking-[0.1em] text-brown-600 transition-colors hover:text-sage"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={async () => {
                try {
                  await signOut();
                } catch {
                  // Continuar mesmo se signOut falhar
                }
                // Hard redirect para limpar todo o estado
                window.location.href = "/";
              }}
              className="rounded px-3 py-1.5 font-sans text-[0.75rem] uppercase tracking-[0.1em] text-brown-500 transition-colors hover:bg-brown-100 hover:text-brown-700"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
