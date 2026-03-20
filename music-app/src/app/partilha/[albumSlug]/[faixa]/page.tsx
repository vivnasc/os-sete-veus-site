import type { Metadata } from "next";
import { ALL_ALBUMS as ALBUMS } from "@/data/albums";
import { getAlbumCover } from "@/lib/album-covers";
import PartilhaClient from "./PartilhaClient";

type Props = {
  params: Promise<{ albumSlug: string; faixa: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { albumSlug, faixa } = await params;
  const trackNum = parseInt(faixa, 10);
  const album = ALBUMS.find(a => a.slug === albumSlug);
  const track = album?.tracks.find(t => t.number === trackNum);

  if (!album || !track) {
    return { title: "Veus" };
  }

  const cover = getAlbumCover(album);
  const title = `${track.title} — ${album.title}`;
  const description = track.description || `Ouve "${track.title}" do album ${album.title} no Veus.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Veus",
      locale: "pt_PT",
      type: "music.song",
      images: [
        {
          url: cover,
          width: 600,
          height: 600,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cover],
    },
  };
}

export default async function PartilhaPage({ params }: Props) {
  const { albumSlug, faixa } = await params;
  const trackNum = parseInt(faixa, 10);
  const album = ALBUMS.find(a => a.slug === albumSlug);
  const track = album?.tracks.find(t => t.number === trackNum);

  if (!album || !track) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D1A]">
        <p className="text-[#a0a0b0] text-lg">Faixa nao encontrada.</p>
      </div>
    );
  }

  const cover = getAlbumCover(album);

  return (
    <PartilhaClient
      albumSlug={album.slug}
      albumTitle={album.title}
      albumColor={album.color}
      trackNumber={track.number}
      trackTitle={track.title}
      trackDescription={track.description}
      audioUrl={track.audioUrl}
      coverSrc={cover}
    />
  );
}
