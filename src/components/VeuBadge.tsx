"use client";

import { VEUS, type VeuType } from "@/types/database";

interface VeuBadgeProps {
  veu: VeuType;
  showNumber?: boolean;
}

export default function VeuBadge({ veu, showNumber = false }: VeuBadgeProps) {
  const info = VEUS.find((v) => v.id === veu);
  if (!info) return null;

  return (
    <span className={`veu-badge ${info.bgColor} ${info.color}`}>
      <span>{info.emoji}</span>
      {showNumber && <span>#{info.number}</span>}
      <span>{info.name}</span>
    </span>
  );
}
