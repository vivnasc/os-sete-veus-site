import { ALL_ALBUMS as ALBUMS } from "@/data/albums";
import AlbumCard from "@/components/music/AlbumCard";
import Image from "next/image";

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
      {/* Hero — like Apple Music */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#C9A96E]/10 via-[#0D0D1A] to-transparent">
        <div className="relative flex flex-col items-center text-center px-6 pt-16 pb-14">
          <Image
            src="/Loranne.png"
            alt="Loranne"
            width={300}
            height={400}
            className="h-56 sm:h-72 md:h-80 w-auto rounded-2xl shadow-2xl"
            priority
          />
          <Image
            src="/logo-veus.png"
            alt="Véus"
            width={200}
            height={80}
            className="h-10 sm:h-14 w-auto mt-8"
          />
          <p className="mt-2 text-sm text-[#C9A96E] tracking-widest">by Loranne</p>
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
