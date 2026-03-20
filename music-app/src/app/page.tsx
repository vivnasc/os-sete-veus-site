import { ALL_ALBUMS, type AlbumTrack, type Album } from "@/data/albums";
import { GENEROS, MOODS, TEMAS, ALL_LISTS, resolveList } from "@/data/curated-lists";
import AlbumCard from "@/components/music/AlbumCard";
import FraseDoDia from "@/components/music/FraseDoDia";
import TopTracksSection from "@/components/music/TopTracksSection";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/music/NavBar";

export const metadata = {
  title: "Veus",
  description: "Musica original do universo Sete Veus. Banda sonora para a tua transformacao.",
};

function allTracks(): { track: AlbumTrack; album: Album }[] {
  return ALL_ALBUMS.flatMap(album =>
    album.tracks.map(track => ({ track, album }))
  );
}

export default function MusicHomePage() {
  const espelhos = ALL_ALBUMS.filter(a => a.product === "espelho");
  const nos = ALL_ALBUMS.filter(a => a.product === "no");
  const livro = ALL_ALBUMS.filter(a => a.product === "livro");
  const cursos = ALL_ALBUMS.filter(a => a.product === "curso");

  const all = allTracks();
  const whisper = all.filter(t => t.track.energy === "whisper").slice(0, 8);
  const marrabenta = all.filter(t => t.track.flavor === "marrabenta").slice(0, 8);
  const anthems = all.filter(t => t.track.energy === "anthem").slice(0, 8);

  // Featured: mix of energies
  const featured = [
    ...all.filter(t => t.track.energy === "anthem").slice(0, 3),
    ...all.filter(t => t.track.energy === "raw").slice(0, 2),
    ...all.filter(t => t.track.flavor === "marrabenta").slice(0, 3),
  ].slice(0, 8);

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <div className="relative overflow-hidden">
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
            Cada faixa nasceu de um veu. Musica original para a tua transformacao.
          </p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 space-y-14 pb-32">

        {/* Frase do Dia */}
        <FraseDoDia />

        {/* Mais Ouvidas (personalizado, so aparece se autenticado com dados) */}
        <TopTracksSection />

        {/* Quick picks — Generos + Moods */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-4">Explora por mood</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...MOODS, ...GENEROS].map(list => (
              <Link
                key={list.slug}
                href={`/lista/${list.slug}`}
                className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg overflow-hidden transition-colors group"
              >
                <div
                  className="h-14 w-14 shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: `${list.color}20` }}
                >
                  <QuickPickIcon color={list.color} />
                </div>
                <div className="min-w-0 pr-3">
                  <p className="text-sm font-medium text-[#F5F0E6] truncate">{list.title}</p>
                  <p className="text-[10px] text-[#666680]">{list.tracks.length} faixas</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Temas */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-2">Temas</h2>
          <p className="text-sm text-[#666680] mb-6">Listas curadas por tema emocional.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEMAS.map(list => (
              <Link
                key={list.slug}
                href={`/lista/${list.slug}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${list.color}15`, border: `1px solid ${list.color}25` }}
                >
                  <QuickPickIcon color={list.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F0E6] font-medium">{list.title}</p>
                  <p className="text-xs text-[#666680]">{list.subtitle}</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="#666680" strokeWidth="2" className="h-5 w-5 group-hover:translate-x-1 transition-transform flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* Em destaque */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-4">Em destaque</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featured.map(({ track, album }) => (
              <TrackCard key={`feat-${album.slug}-${track.number}`} track={track} album={album} />
            ))}
          </div>
        </section>

        {/* Para relaxar (whisper) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-semibold text-[#F5F0E6]">Para relaxar</h2>
            <Link href="/lista/mood-sussurro" className="text-xs text-[#C9A96E] hover:underline">Ver tudo</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {whisper.map(({ track, album }) => (
              <TrackCard key={`wh-${album.slug}-${track.number}`} track={track} album={album} />
            ))}
          </div>
        </section>

        {/* Marrabenta */}
        {marrabenta.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-semibold text-[#F5F0E6]">Marrabenta</h2>
              <Link href="/lista/genero-marrabenta" className="text-xs text-[#C9A96E] hover:underline">Ver tudo</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {marrabenta.map(({ track, album }) => (
                <TrackCard key={`mar-${album.slug}-${track.number}`} track={track} album={album} />
              ))}
            </div>
          </section>
        )}

        {/* Hinos */}
        {anthems.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-semibold text-[#F5F0E6]">Hinos</h2>
              <Link href="/lista/mood-hino" className="text-xs text-[#C9A96E] hover:underline">Ver tudo</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {anthems.map(({ track, album }) => (
                <TrackCard key={`ant-${album.slug}-${track.number}`} track={track} album={album} />
              ))}
            </div>
          </section>
        )}

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

function TrackCard({ track, album }: { track: AlbumTrack; album: Album }) {
  return (
    <Link
      href={`/album/${album.slug}`}
      className="group text-left p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] transition-all block"
    >
      <div
        className="aspect-square rounded-lg mb-3 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${album.color} 0%, ${album.color}66 100%)` }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white/20 group-hover:text-white/40 transition-colors">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-[#F5F0E6] truncate">{track.title}</p>
      <p className="text-xs text-[#666680] truncate mt-0.5">Loranne</p>
    </Link>
  );
}

function QuickPickIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className="h-5 w-5 opacity-40">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}
