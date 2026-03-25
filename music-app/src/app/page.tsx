import { ALL_ALBUMS, type Album } from "@/data/albums";
import { MOODS, GENEROS } from "@/data/curated-lists";
import AlbumCard from "@/components/music/AlbumCard";
import FraseDoDia from "@/components/music/FraseDoDia";
import TopTracksSection from "@/components/music/TopTracksSection";
import RecentlyPlayedSection from "@/components/music/RecentlyPlayedSection";
import ParaTiSection from "@/components/music/ParaTiSection";
import NovidadesSection from "@/components/music/NovidadesSection";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/music/NavBar";

export const metadata = {
  title: "Veus",
  description: "Música original do universo Sete Véus. Banda sonora para a tua transformação.",
};

// Group albums by product
const COLLECTIONS: { key: string; title: string; subtitle: string; products: Album["product"][] }[] = [
  { key: "espelhos", title: "Espelhos", subtitle: "A banda sonora da tua transformação interior.", products: ["espelho"] },
  { key: "nos", title: "Nós", subtitle: "O que se passa entre duas pessoas.", products: ["no"] },
  { key: "espiritual", title: "Espiritual", subtitle: "O sagrado no corpo, na respiração, no silêncio.", products: ["espiritual"] },
  { key: "cursos", title: "Cursos", subtitle: "Os 20 territórios da Escola dos Véus.", products: ["curso"] },
  { key: "vida", title: "Vida", subtitle: "A música do dia-a-dia.", products: ["vida"] },
  { key: "livro", title: "Livro", subtitle: "O livro filosófico.", products: ["livro"] },
];

export default function MusicHomePage() {
  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero — compact */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/Loranne.png" alt="" fill className="object-cover object-top opacity-40 blur-[2px]" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1A]/60 via-[#0D0D1A]/70 to-[#0D0D1A]" />
        </div>
        <div className="relative flex flex-col items-center text-center px-6 pt-6 pb-10">
          <Image src="/Loranne.png" alt="Loranne" width={300} height={375} className="h-44 sm:h-52 w-auto rounded-2xl shadow-2xl ring-1 ring-white/10" priority />
          <Image src="/music_veus_logoname.png" alt="Véus" width={300} height={120} className="h-12 sm:h-14 w-auto mt-5" />
          <p className="mt-1 text-sm text-[#C9A96E] tracking-widest font-display">by Loranne</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 space-y-10 pb-32">

        <FraseDoDia />

        {/* Personalizado — aparece com uso */}
        <RecentlyPlayedSection />
        <ParaTiSection />
        <NovidadesSection />
        <TopTracksSection />

        {/* Explorar por mood */}
        <section>
          <h2 className="font-display text-xl font-semibold text-[#F5F0E6] mb-3">Explorar por mood</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {[...MOODS, ...GENEROS].map(list => (
              <Link
                key={list.slug}
                href={`/lista/${list.slug}`}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] rounded-full transition-colors"
              >
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: list.color }} />
                <span className="text-sm text-[#F5F0E6] whitespace-nowrap">{list.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Repertório — todos os albums navegáveis */}
        {COLLECTIONS.map(({ key, title, subtitle, products }) => {
          const albums = ALL_ALBUMS.filter(a => products.includes(a.product));
          if (albums.length === 0) return null;
          return (
            <section key={key}>
              <h2 className="font-display text-xl font-semibold text-[#F5F0E6] mb-1">{title}</h2>
              <p className="text-xs text-[#666680] mb-4">{subtitle}</p>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                {albums.map(album => (
                  <div key={album.slug} className="shrink-0 w-36">
                    <AlbumCard album={album} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

      </div>
    </div>
  );
}
