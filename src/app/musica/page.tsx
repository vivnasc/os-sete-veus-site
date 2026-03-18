import { ALL_ALBUMS as ALBUMS } from "@/data/albums";
import AlbumCard from "@/components/music/AlbumCard";

export const metadata = {
  title: "Sete Ecos Music",
  description: "Musica original do universo Sete Veus.",
};

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2 className="font-display text-lg font-semibold text-[#F5F0E6] mb-1">{title}</h2>
      {subtitle && <p className="text-xs text-[#666680] mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </section>
  );
}

export default function MusicHomePage() {
  const espelhos = ALBUMS.filter(a => a.product === "espelho");
  const nos = ALBUMS.filter(a => a.product === "no");
  const livro = ALBUMS.filter(a => a.product === "livro");
  const cursos = ALBUMS.filter(a => a.product === "curso");

  return (
    <div className="px-6 py-8 max-w-screen-xl mx-auto space-y-10">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F0E6]">
          Boa noite
        </h1>
        <p className="text-sm text-[#a0a0b0] mt-1">
          35 albums. 200+ faixas. A banda sonora do teu despertar.
        </p>
      </div>

      {/* Espelhos */}
      <Section id="espelhos" title="Espelhos" subtitle="Um album por veu. A banda sonora da transformacao interior.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {espelhos.map(album => (
            <AlbumCard key={album.slug} album={album} />
          ))}
        </div>
      </Section>

      {/* Nos */}
      <Section id="nos" title="Nos" subtitle="O que se passa entre duas pessoas quando um veu cai.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {nos.map(album => (
            <AlbumCard key={album.slug} album={album} />
          ))}
        </div>
      </Section>

      {/* Livro */}
      {livro.length > 0 && (
        <Section id="livro" title="Livro Filosofico">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {livro.map(album => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </div>
        </Section>
      )}

      {/* Cursos */}
      {cursos.length > 0 && (
        <Section id="cursos" title="Cursos" subtitle="A musica dos 20 territorios da Escola dos Veus.">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cursos.map(album => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
