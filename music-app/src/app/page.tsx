import { ALL_ALBUMS as ALBUMS } from "@/data/albums";
import AlbumCard from "@/components/music/AlbumCard";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/music/NavBar";

export const metadata = {
  title: "Véus",
  description: "Música original do universo Sete Véus. 35 álbums, 200+ faixas.",
};

export default function MusicHomePage() {
  const espelhos = ALBUMS.filter(a => a.product === "espelho");
  const nos = ALBUMS.filter(a => a.product === "no");
  const livro = ALBUMS.filter(a => a.product === "livro");
  const cursos = ALBUMS.filter(a => a.product === "curso");

  return (
    <div className="min-h-screen">
      {/* Nav bar */}
      <NavBar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/Loranne.png"
            alt=""
            fill
            className="object-cover object-top opacity-40 blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1A]/60 via-[#0D0D1A]/70 to-[#0D0D1A]" />
        </div>

        <div className="relative flex flex-col items-center text-center px-6 pt-8 pb-14">
          <Image
            src="/Loranne.png"
            alt="Loranne"
            width={400}
            height={500}
            className="h-64 sm:h-80 md:h-96 w-auto rounded-2xl shadow-2xl ring-1 ring-white/10"
            priority
          />
          <Image
            src="/music_veus_logoname.png"
            alt="Véus"
            width={400}
            height={160}
            className="h-20 sm:h-24 md:h-28 w-auto mt-8"
          />
          <p className="mt-3 text-base text-[#C9A96E] tracking-widest font-display">by Loranne</p>
          <p className="mt-2 text-sm text-[#666680] max-w-md">
            Música original do universo Sete Véus. 35 álbums, 200+ faixas.
          </p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 space-y-14 pb-32">
        {/* Quick access - Shorts */}
        <section>
          <Link
            href="/shorts"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F5F0E6] font-medium">Shorts</p>
              <p className="text-xs text-[#666680]">Fragmentos de letras em formato vertical.</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="#666680" strokeWidth="2" className="h-5 w-5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Espelhos */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-2">Espelhos</h2>
          <p className="text-sm text-[#666680] mb-6">Um álbum por véu. A banda sonora da tua transformação interior.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {espelhos.map(album => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </div>
        </section>

        {/* Nós */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-2">Nós</h2>
          <p className="text-sm text-[#666680] mb-6">O que se passa entre duas pessoas quando um véu cai.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {nos.map(album => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </div>
        </section>

        {/* Livro */}
        {livro.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-4">Livro Filosófico</h2>
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
            <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-2">Cursos</h2>
            <p className="text-sm text-[#666680] mb-6">A música dos 20 territórios da Escola dos Véus.</p>
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
