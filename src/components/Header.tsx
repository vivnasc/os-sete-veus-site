"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

const navLinks: { href: string; label: string; highlight?: boolean; featured?: boolean }[] = [
  { href: "/cursos", label: "Cursos", featured: true },
  { href: "/os-sete-veus", label: "Universo" },
  { href: "/podcast", label: "Podcast" },
  { href: "/livro-fisico", label: "Livro" },
  { href: "/sobre", label: "Sobre" },
  { href: "/comunidade", label: "Ecos", highlight: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile } = useAuth();
  const pathname = usePathname();
  const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];
  const isAdmin = profile?.is_admin === true || ADMIN_EMAILS.includes(user?.email || "");

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brown-100 bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-espiral.png.jpeg"
            alt="Os Sete Véus"
            width={44}
            height={44}
            className="rounded-full"
          />
          <span className="font-serif text-xl tracking-wide text-brown-900">
            Os Sete Véus
          </span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) =>
            link.featured ? (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md bg-brown-700 px-4 py-2 font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-brown-800"
              >
                {link.label}
              </Link>
            ) : link.highlight ? (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-center gap-1.5 rounded-full border border-sage/30 bg-sage/8 px-3.5 py-1 font-sans text-[0.8rem] uppercase tracking-[0.12em] text-sage-dark transition-all hover:border-sage/50 hover:bg-sage/15 hover:text-sage-dark"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage" />
                </span>
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[0.8rem] uppercase tracking-[0.12em] text-brown-600 transition-colors hover:text-brown-900"
              >
                {link.label}
              </Link>
            )
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-md border border-brown-700/40 bg-brown-700/10 px-3 py-1.5 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-brown-700 transition-colors hover:bg-brown-700/20"
            >
              Painel
            </Link>
          )}
          {user ? (
            <Link
              href="/membro"
              className="rounded-md bg-sage px-5 py-2 font-sans text-[0.75rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
            >
              Minha Área
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/entrar"
                className="font-sans text-[0.8rem] uppercase tracking-[0.12em] text-brown-600 transition-colors hover:text-brown-900"
              >
                Entrar
              </Link>
              <Link
                href="/registar"
                className="rounded-md bg-sage px-5 py-2 font-sans text-[0.75rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
              >
                Criar conta
              </Link>
            </div>
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className={`h-0.5 w-6 bg-brown-700 transition-all duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-brown-700 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-brown-700 transition-all duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <nav
        className={`fixed right-0 top-0 z-40 h-full w-[85%] max-w-sm transform bg-cream shadow-xl transition-transform duration-300 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-8 pb-8 pt-24">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) =>
              link.featured ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-brown-700 px-5 py-3.5 text-center font-sans text-sm font-medium uppercase tracking-[0.1em] text-cream transition-colors hover:bg-brown-800"
                >
                  {link.label}
                </Link>
              ) : link.highlight ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex w-fit items-center gap-2 rounded-full border border-sage/30 bg-sage/8 px-4 py-2 font-sans text-sm uppercase tracking-[0.1em] text-sage-dark transition-colors hover:bg-sage/15"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage" />
                  </span>
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-base uppercase tracking-[0.1em] text-brown-600 transition-colors hover:text-brown-900"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-brown-200/50" />

          {/* Auth section */}
          <div className="flex flex-col gap-4">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-brown-700/40 bg-brown-700/10 px-5 py-3 text-center font-sans text-sm uppercase tracking-[0.1em] text-brown-700 transition-colors hover:bg-brown-700/20"
              >
                Painel
              </Link>
            )}
            {user ? (
              <Link
                href="/membro"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-sage px-5 py-3.5 text-center font-sans text-sm font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-sage-dark"
              >
                Minha Área
              </Link>
            ) : (
              <>
                <Link
                  href="/registar"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-sage px-5 py-3.5 text-center font-sans text-sm font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-sage-dark"
                >
                  Criar conta
                </Link>
                <Link
                  href="/entrar"
                  onClick={() => setIsOpen(false)}
                  className="text-center font-sans text-sm text-brown-500 transition-colors hover:text-brown-700"
                >
                  Já tens conta? Entra aqui
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
