"use client";

import Image from "next/image";
import { ALL_ALBUMS } from "@/data/albums";
import type { Album, AlbumTrack } from "@/data/albums";
import AlbumCard from "@/components/music/AlbumCard";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

// Collect all tracks with their album reference
function getAllTracks(): { track: AlbumTrack; album: Album }[] {
  return ALL_ALBUMS.flatMap(album =>
    album.tracks.map(track => ({ track, album }))
  );
}

// Smart playlists
function getPlaylistByFlavor(flavor: string) {
  return getAllTracks().filter(t => t.track.flavor === flavor);
}

function getPlaylistByEnergy(energy: string) {
  return getAllTracks().filter(t => t.track.energy === energy);
}

function TrackCard({ track, album }: { track: AlbumTrack; album: Album }) {
  const { playTrack, currentTrack, currentAlbum, isPlaying } = useMusicPlayer();
  const isActive = currentTrack?.number === track.number && currentAlbum?.slug === album.slug;

  return (
    <button
      onClick={() => playTrack(track, album)}
      className={`group text-left p-3 rounded-xl transition-all ${
        isActive ? "bg-white/10" : "bg-white/[0.03] hover:bg-white/[0.07]"
      }`}
    >
      <div
        className="aspect-square rounded-lg mb-3 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${album.color} 0%, ${album.color}66 100%)` }}
      >
        {isActive && isPlaying ? (
          <div className="flex items-end gap-0.5 h-6">
            <div className="w-1 bg-white animate-pulse rounded-full" style={{ height: "60%" }} />
            <div className="w-1 bg-white animate-pulse rounded-full" style={{ height: "100%", animationDelay: "0.2s" }} />
            <div className="w-1 bg-white animate-pulse rounded-full" style={{ height: "40%", animationDelay: "0.4s" }} />
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white/20 group-hover:text-white/40 transition-colors">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>
      <p className="text-sm font-medium text-[#F5F0E6] truncate">{track.title}</p>
      <p className="text-xs text-[#666680] truncate mt-0.5">Loranne</p>
    </button>
  );
}

export default function MusicHomePage() {
  const allTracks = getAllTracks();

  // Featured: mix of different energies and flavors
  const featured = [
    ...allTracks.filter(t => t.track.energy === "anthem").slice(0, 3),
    ...allTracks.filter(t => t.track.energy === "raw").slice(0, 2),
    ...allTracks.filter(t => t.track.flavor === "marrabenta").slice(0, 3),
  ].slice(0, 8);

  const whisper = getPlaylistByEnergy("whisper").slice(0, 8);
  const marrabenta = getPlaylistByFlavor("marrabenta").slice(0, 8);
  const house = getPlaylistByFlavor("house").slice(0, 8);
  const gospel = getPlaylistByFlavor("gospel").slice(0, 8);
  const pulse = getPlaylistByEnergy("pulse").slice(0, 8);
  const anthems = getPlaylistByEnergy("anthem").slice(0, 8);

  return (
    <div className="max-w-screen-xl mx-auto space-y-10 pb-12">
      {/* Hero — Loranne */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#C9A96E]/10 via-transparent to-transparent">
        <div className="flex flex-col items-center text-center px-6 pt-12 pb-10">
          <Image
            src="/images/Loranne.png"
            alt="Loranne"
            width={300}
            height={400}
            className="h-48 sm:h-64 md:h-72 w-auto rounded-2xl shadow-2xl"
            priority
          />
          <Image
            src="/images/music_veus_faicon.png"
            alt="Véus"
            width={48}
            height={48}
            className="h-10 w-10 mt-6"
          />
          <p className="mt-2 text-sm text-[#C9A96E] tracking-widest font-display">by Loranne</p>
        </div>
      </div>

      <div className="px-6 space-y-10">
        {/* Quick picks — genre cards — paleta quente, sem neon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: "Sussurro", desc: "Para fechar os olhos", color: "#2a2a4a", energy: "whisper", count: whisper.length },
            { label: "Marrabenta", desc: "Raizes que dancam", color: "#4a3520", flavor: "marrabenta", count: marrabenta.length },
            { label: "Hinos", desc: "Para cantar alto", color: "#3a2030", energy: "anthem", count: anthems.length },
            { label: "House", desc: "Batida que aquece", color: "#352a3a", flavor: "house", count: house.length },
            { label: "Gospel", desc: "Alma em voz alta", color: "#3a3520", flavor: "gospel", count: gospel.length },
            { label: "Pulso", desc: "Energia que move", color: "#3a2820", energy: "pulse", count: pulse.length },
          ].map(card => (
            <a
              key={card.label}
              href={card.energy ? `/musica/mood/${card.energy}` : `/musica/genero/${card.flavor}`}
              className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg overflow-hidden transition-colors group"
            >
              <div className="h-14 w-14 shrink-0 flex items-center justify-center" style={{ backgroundColor: card.color }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#C9A96E]/40">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <div className="min-w-0 pr-3">
                <p className="text-sm font-medium text-[#F5F0E6] truncate">{card.label}</p>
                <p className="text-[10px] text-[#666680]">{card.count} faixas</p>
              </div>
            </a>
          ))}
        </div>

        {/* Em destaque */}
        <section>
          <h2 className="font-display text-lg font-semibold text-[#F5F0E6] mb-4">Em destaque</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {featured.map((item, i) => (
              <TrackCard key={`feat-${item.album.slug}-${item.track.number}`} track={item.track} album={item.album} />
            ))}
          </div>
        </section>

        {/* Para relaxar */}
        <section>
          <h2 className="font-display text-lg font-semibold text-[#F5F0E6] mb-4">Para relaxar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {whisper.map((item, i) => (
              <TrackCard key={`wh-${item.album.slug}-${item.track.number}`} track={item.track} album={item.album} />
            ))}
          </div>
        </section>

        {/* Marrabenta */}
        {marrabenta.length > 0 && (
          <section>
            <h2 className="font-display text-lg font-semibold text-[#F5F0E6] mb-4">Marrabenta</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {marrabenta.map((item, i) => (
                <TrackCard key={`mar-${item.album.slug}-${item.track.number}`} track={item.track} album={item.album} />
              ))}
            </div>
          </section>
        )}

        {/* Energia que move */}
        {pulse.length > 0 && (
          <section>
            <h2 className="font-display text-lg font-semibold text-[#F5F0E6] mb-4">Energia que move</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {pulse.map((item, i) => (
                <TrackCard key={`pu-${item.album.slug}-${item.track.number}`} track={item.track} album={item.album} />
              ))}
            </div>
          </section>
        )}

        {/* Todos os albums */}
        <section>
          <h2 className="font-display text-lg font-semibold text-[#F5F0E6] mb-4">Todos os albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {ALL_ALBUMS.map(album => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
