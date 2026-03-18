"use client";

import Link from "next/link";
import type { Album } from "@/data/albums";

type Props = {
  album: Album;
};

const PRODUCT_LABELS: Record<string, string> = {
  espelho: "Espelho",
  no: "No",
  livro: "Livro",
  curso: "Curso",
};

export default function AlbumCard({ album }: Props) {
  return (
    <Link
      href={`/album/${album.slug}`}
      className="group block"
    >
      <div
        className="aspect-square rounded-xl shadow-lg flex items-center justify-center transition-transform group-hover:scale-[1.03] group-hover:shadow-2xl"
        style={{
          backgroundColor: album.color,
          background: `linear-gradient(135deg, ${album.color} 0%, ${album.color}88 100%)`,
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-white/15">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
      <p className="mt-2 text-sm font-medium text-[#F5F0E6] truncate">{album.title}</p>
      <p className="text-xs text-[#a0a0b0] truncate">Loranne</p>
    </Link>
  );
}
