"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/os-sete-veus", label: "Os Sete Véus" },
  { href: "/sobre", label: "A Vivianne" },
  { href: "/recursos", label: "Recursos" },
  { href: "/artigos", label: "Artigos" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-warm-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-serif text-xl tracking-wide text-warm-800">
          Os Sete Véus
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-warm-600 transition-colors hover:text-warm-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`h-0.5 w-6 bg-warm-700 transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-warm-700 transition-opacity ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-warm-700 transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="border-t border-warm-200 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base text-warm-600 transition-colors hover:text-warm-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
