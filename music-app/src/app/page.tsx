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
      <div className="relative overflow-hidden bg-gradient-to-b from-[#C9A96E]/10 via-[#0D0D1A] to-transparent">
        <div className="relative flex flex-col items-center text-center px-6 pt-8 pb-14">
          <Image
            src="/Loranne.png"
            alt="Loranne"
            width={400}
            height={500}
            className="h-64 sm:h-80 md:h-96 w-auto rounded-2xl shadow-2xl"
            priority
          />
          <Image
            src="/logo-veus.png"
            alt="Véus"
            width={400}
            height={160}
            className="h-24 sm:h-32 md:h-36 w-auto mt-8"
          />
          <p className="mt-3 text-base text-[#C9A96E] tracking-widest font-display">by Loranne</p>
          <p className="mt-2 text-sm text-[#666680] max-w-md">
            Música original do universo Sete Véus. 35 álbums, 200+ faixas.
          </p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 space-y-14 pb-32">
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
