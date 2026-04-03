import type { Metadata } from "next";
import { ALL_ALBUMS } from "@/data/albums";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = ALL_ALBUMS.find(a => a.slug === slug);
  if (!album) return { title: "Loranne — Véus" };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://music.seteveus.space";
  const ogImage = `${baseUrl}/api/og?album=${encodeURIComponent(slug)}&track=1`;

  return {
    title: `${album.title} — Loranne`,
    description: album.subtitle,
    openGraph: {
      title: `${album.title} — Loranne`,
      description: `${album.subtitle}. ${album.tracks.length} faixas. Ouve agora.`,
      siteName: "Véus by Loranne",
      locale: "pt_PT",
      type: "music.album",
      images: [{ url: ogImage, width: 1200, height: 630, alt: album.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${album.title} — Loranne`,
      description: album.subtitle,
      images: [ogImage],
    },
  };
}

export default function AlbumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
