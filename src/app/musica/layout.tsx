"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import MiniPlayer from "@/components/music/MiniPlayer";
import FullPlayer from "@/components/music/FullPlayer";
import NoDownload from "@/components/music/NoDownload";

function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === "/musica";
  const isGenre = pathname.startsWith("/musica/genero");
  const isMood = pathname.startsWith("/musica/mood");

  return (
    <aside className="hidden md:flex flex-col w-56 bg-black/50 border-r border-white/5 shrink-0">
      {/* Logo */}
      <div className="p-5 pb-4">
        <Link href="/musica" className="flex items-center gap-2.5">
          <span className="font-display text-xl font-semibold text-[#C9A96E] tracking-[0.25em] leading-none">VÉUS</span>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="px-3 space-y-0.5">
        <Link
          href="/musica"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            isHome ? "bg-white/10 text-[#F5F0E6] font-medium" : "text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/5"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 opacity-70">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          Explorar
        </Link>
      </nav>

      {/* Generos */}
      <div className="px-3 mt-6">
        <p className="text-[10px] uppercase tracking-widest text-[#666680] px-3 mb-2">Generos</p>
        <nav className="space-y-0.5">
          {[
            { slug: "organic", label: "Organico", color: "#4ade80" },
            { slug: "marrabenta", label: "Marrabenta", color: "#f59e0b" },
            { slug: "house", label: "House", color: "#ec4899" },
            { slug: "gospel", label: "Gospel", color: "#eab308" },
          ].map(g => (
            <Link
              key={g.slug}
              href={`/musica/genero/${g.slug}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === `/musica/genero/${g.slug}` ? "bg-white/10 text-[#F5F0E6]" : "text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/5"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
              {g.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Moods */}
      <div className="px-3 mt-6">
        <p className="text-[10px] uppercase tracking-widest text-[#666680] px-3 mb-2">Mood</p>
        <nav className="space-y-0.5">
          {[
            { slug: "whisper", label: "Sussurro", icon: "~" },
            { slug: "steady", label: "Constante", icon: "—" },
            { slug: "pulse", label: "Pulso", icon: "+" },
            { slug: "anthem", label: "Hino", icon: "!" },
            { slug: "raw", label: "Cru", icon: "*" },
          ].map(m => (
            <Link
              key={m.slug}
              href={`/musica/mood/${m.slug}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === `/musica/mood/${m.slug}` ? "bg-white/10 text-[#F5F0E6]" : "text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/5"
              }`}
            >
              <span className="text-xs font-mono text-[#666680] w-4 text-center">{m.icon}</span>
              {m.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Temas */}
      <div className="px-3 mt-6">
        <p className="text-[10px] uppercase tracking-widest text-[#666680] px-3 mb-2">Temas</p>
        <nav className="space-y-0.5">
          {[
            { slug: "auto-amor", label: "Auto-Amor" },
            { slug: "auto-poder", label: "Auto-Poder" },
            { slug: "limites", label: "Limites" },
            { slug: "raizes", label: "Raizes" },
            { slug: "corpo", label: "O Corpo" },
            { slug: "recomecar", label: "Recomecar" },
            { slug: "silencio", label: "O Silencio" },
          ].map(t => (
            <Link
              key={t.slug}
              href={`/musica/tema/${t.slug}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === `/musica/tema/${t.slug}` ? "bg-white/10 text-[#F5F0E6]" : "text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/5"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Back to site */}
      <div className="p-4 border-t border-white/5">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          seteveus.space
        </Link>
      </div>
    </aside>
  );
}

function MobileNav() {
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/5">
      <Link href="/musica" className="flex items-center gap-2">
        <span className="font-display text-base font-semibold text-[#C9A96E] tracking-[0.25em] leading-none">VÉUS</span>
      </Link>
      <Link href="/" className="text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors">
        seteveus.space
      </Link>
    </header>
  );
}

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return (
    <MusicPlayerProvider>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#0A0A14]">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <MobileNav />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
        <MiniPlayer />
      </div>
      <FullPlayer />
      <NoDownload />
    </MusicPlayerProvider>
  );
}
