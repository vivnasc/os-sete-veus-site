"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import MiniPlayer from "@/components/music/MiniPlayer";
import FullPlayer from "@/components/music/FullPlayer";
import NoDownload from "@/components/music/NoDownload";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 bg-black/40 border-r border-white/5 p-4 gap-6">
      {/* Logo */}
      <Link href="/musica" className="flex items-center gap-2.5 px-2 py-1">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#8B5CF6] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <span className="font-display text-base font-semibold text-[#F5F0E6]">Sete Ecos</span>
      </Link>

      {/* Nav */}
      <nav className="space-y-1">
        <Link
          href="/musica"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname === "/musica"
              ? "bg-white/10 text-[#F5F0E6] font-medium"
              : "text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/5"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          Inicio
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/5 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar ao site
        </Link>
      </nav>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Collections */}
      <div className="flex-1 overflow-y-auto space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-[#666680] px-3 mb-2">Coleccoes</p>
        {[
          { label: "Espelhos", href: "/musica#espelhos" },
          { label: "Nos", href: "/musica#nos" },
          { label: "Livro", href: "/musica#livro" },
          { label: "Cursos", href: "/musica#cursos" },
        ].map(item => (
          <Link
            key={item.label}
            href={item.href}
            className="block px-3 py-1.5 rounded text-sm text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/5 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

function MobileNav() {
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5">
      <Link href="/musica" className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#8B5CF6] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <span className="font-display text-sm font-semibold text-[#F5F0E6]">Sete Ecos</span>
      </Link>
      <Link
        href="/"
        className="text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors"
      >
        Voltar ao site
      </Link>
    </header>
  );
}

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return (
    <MusicPlayerProvider>
      {/* Full-screen app shell — hides main site Header/Footer */}
      <div className="fixed inset-0 z-50 flex flex-col bg-[#0A0A14]">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <MobileNav />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
        <MiniPlayer />
      </div>
      <FullPlayer />
      <NoDownload />
    </MusicPlayerProvider>
  );
}
