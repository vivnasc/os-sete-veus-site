import { MOODS, GENEROS } from "@/data/curated-lists";
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

export default function MusicHomePage() {
  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero — compact */}
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

        <div className="relative flex flex-col items-center text-center px-6 pt-6 pb-10">
          <Image
            src="/Loranne.png"
            alt="Loranne"
            width={300}
            height={375}
            className="h-48 sm:h-56 w-auto rounded-2xl shadow-2xl ring-1 ring-white/10"
            priority
          />
          <Image
            src="/music_veus_logoname.png"
            alt="Véus"
            width={300}
            height={120}
            className="h-14 sm:h-16 w-auto mt-6"
          />
          <p className="mt-2 text-sm text-[#C9A96E] tracking-widest font-display">by Loranne</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 space-y-12 pb-32">

        {/* Frase do Dia */}
        <FraseDoDia />

        {/* Ouvido recentemente — aparece após primeira escuta */}
        <RecentlyPlayedSection />

        {/* Para ti — aparece após 3+ plays */}
        <ParaTiSection />

        {/* Novidades — faixas publicadas */}
        <NovidadesSection />

        {/* Mais ouvidas — personalizado */}
        <TopTracksSection />

        {/* Explorar — moods e géneros compactos */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-[#F5F0E6] mb-4">Explorar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[...MOODS, ...GENEROS].map(list => (
              <Link
                key={list.slug}
                href={`/lista/${list.slug}`}
                className="flex items-center gap-3 p-3 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors group"
              >
                <div
                  className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${list.color}20` }}
                >
                  <svg viewBox="0 0 24 24" fill={list.color} className="h-4 w-4 opacity-50">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#F5F0E6] truncate">{list.title}</p>
                  <p className="text-[10px] text-[#666680]">{list.tracks.length} faixas</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/search"
            className="mt-4 block text-center text-sm text-[#C9A96E] hover:underline"
          >
            Ver tudo na busca
          </Link>
        </section>

      </div>
    </div>
  );
}
