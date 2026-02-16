"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/comprar/espelhos", label: "Espelhos" },
  { href: "/comprar", label: "Comprar" },
  { href: "/comunidade", label: "Ecos", highlight: true },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre", label: "Sobre" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="w-full border-b border-brown-100 bg-cream">
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
            link.highlight ? (
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
          <Link
            href={user ? "/membro" : "/entrar"}
            className="rounded-md bg-sage px-5 py-2 font-sans text-[0.75rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-sage-dark"
          >
            {user ? "Minha Área" : "Entrar"}
          </Link>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className={`h-0.5 w-6 bg-brown-700 transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-brown-700 transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-brown-700 transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-brown-100 bg-cream px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) =>
              link.highlight ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex w-fit items-center gap-2 rounded-full border border-sage/30 bg-sage/8 px-4 py-1.5 font-sans text-sm uppercase tracking-[0.1em] text-sage-dark transition-colors hover:bg-sage/15"
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
                  className="font-sans text-sm uppercase tracking-[0.1em] text-brown-600 transition-colors hover:text-brown-900"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href={user ? "/membro" : "/entrar"}
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-sage px-5 py-3 text-center font-sans text-sm uppercase tracking-[0.1em] text-white"
            >
              {user ? "Minha Área" : "Entrar"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
