"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

const memberNav = [
  { href: "/membro", label: "Início" },
  { href: "/membro/leitura", label: "Leitura" },
  { href: "/membro/praticas", label: "Práticas" },
  { href: "/membro/espelho", label: "Espelho" },
  { href: "/membro/conclusao", label: "Cerimónia" },
];

export default function MembroLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <section className="bg-cream px-6 py-32 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brown-200 border-t-sage" />
      </section>
    );
  }

  if (!user) {
    router.push("/entrar");
    return null;
  }

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
            <Link
              href="/painel"
              className="font-sans text-[0.7rem] uppercase tracking-[0.1em] text-sage transition-colors hover:text-sage-dark"
            >
              Marketing
            </Link>
            <button
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
              className="font-sans text-[0.7rem] uppercase tracking-[0.1em] text-brown-400 transition-colors hover:text-brown-700"
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
