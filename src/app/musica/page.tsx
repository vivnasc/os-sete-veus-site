import { ALL_ALBUMS as ALBUMS } from "@/data/albums";
import AlbumCard from "@/components/music/AlbumCard";

export const metadata = {
  title: "Musica — Sete Ecos",
  description: "Musica original do universo Sete Veus.",
};

export default function MusicHomePage() {
  const espelhos = ALBUMS.filter(a => a.product === "espelho");
  const nos = ALBUMS.filter(a => a.product === "no");
  const livro = ALBUMS.filter(a => a.product === "livro");
  const cursos = ALBUMS.filter(a => a.product === "curso");

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-12 space-y-12">
      {/* Titulo */}
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0E6]">
          Musica
        </h1>
        <p className="mt-2 text-[#a0a0b0] max-w-md">
          Cada album acompanha a leitura dos Espelhos, dos Nos e dos Cursos.
        </p>
      </div>

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
  );
}
