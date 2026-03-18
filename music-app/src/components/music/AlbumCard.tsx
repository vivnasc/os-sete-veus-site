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
        className="aspect-square rounded-xl shadow-lg flex items-end p-4 transition-transform group-hover:scale-[1.03] group-hover:shadow-2xl"
        style={{
          backgroundColor: album.color,
          background: `linear-gradient(135deg, ${album.color} 0%, ${album.color}88 100%)`,
        }}
      >
        <div className="w-full">
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-sans">
            {PRODUCT_LABELS[album.product] || album.product}
          </span>
          <p className="font-display text-sm font-semibold text-white/90 mt-0.5 leading-tight line-clamp-2">
            {album.title}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-[#F5F0E6] truncate">{album.title}</p>
      <p className="text-xs text-[#a0a0b0] truncate">Loranne</p>
    </Link>
  );
}
