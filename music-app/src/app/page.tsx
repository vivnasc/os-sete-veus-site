import { ALL_ALBUMS as ALBUMS } from "@/data/albums";
import AlbumCard from "@/components/music/AlbumCard";
import Link from "next/link";

export const metadata = {
  title: "Véus",
  description: "Musica original do universo Sete Veus. 35 albums, 200+ faixas.",
};

export default function MusicHomePage() {
  const espelhos = ALBUMS.filter(a => a.product === "espelho");
  const nos = ALBUMS.filter(a => a.product === "no");
  const livro = ALBUMS.filter(a => a.product === "livro");
  const cursos = ALBUMS.filter(a => a.product === "curso");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A96E]/15 via-transparent to-transparent" />
        <div className="relative px-6 pt-16 pb-12 max-w-screen-lg mx-auto">
          <a href="https://seteveus.space" className="inline-flex items-center gap-2 text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            seteveus.space
          </a>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F0E6] leading-tight tracking-widest">
            VÉUS
          </h1>
          <p className="mt-4 text-[#a0a0b0] max-w-md leading-relaxed">
            Musica original do universo Sete Veus. Cada album e uma viagem sonora
            que acompanha a leitura dos Espelhos, dos Nos e dos Cursos.
          </p>
          <Link
            href="/upload"
            className="mt-4 inline-flex items-center gap-2 text-xs text-[#666680] hover:text-[#C9A96E] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            Carregar musicas
          </Link>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 space-y-12 pb-12">
        {/* Espelhos */}
        <section>
          <h2 className="font-display text-xl font-semibold text-[#F5F0E6] mb-4">Espelhos</h2>
          <p className="text-sm text-[#666680] mb-6">Um album por veu. A banda sonora da tua transformacao interior.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {espelhos.map(album => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </div>
        </section>

        {/* Nos */}
        <section>
          <h2 className="font-display text-xl font-semibold text-[#F5F0E6] mb-4">Nos</h2>
          <p className="text-sm text-[#666680] mb-6">O que se passa entre duas pessoas quando um veu cai.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {nos.map(album => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </div>
        </section>

        {/* Livro */}
        {livro.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold text-[#F5F0E6] mb-4">Livro Filosofico</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {livro.map(album => (
                <AlbumCard key={album.slug} album={album} />
              ))}
            </div>
          </section>
        )}

        {/* Cursos */}
        {cursos.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold text-[#F5F0E6] mb-4">Cursos</h2>
            <p className="text-sm text-[#666680] mb-6">A musica dos 20 territorios da Escola dos Veus.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cursos.map(album => (
                <AlbumCard key={album.slug} album={album} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
