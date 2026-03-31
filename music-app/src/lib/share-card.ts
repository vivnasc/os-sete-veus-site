/**
 * Generate beautiful share card images using Canvas.
 * Supports story (1080x1920) and square (1080x1080) formats.
 */

import type { Album, AlbumTrack } from "@/data/albums";
import { getSharePath } from "@/lib/share-utils";

type CardFormat = "story" | "square";

function pickLyric(track: AlbumTrack): string | null {
  if (!track.lyrics) return null;
  const lines = track.lyrics.split("\n").filter(l => {
    const t = l.trim();
    return t.length > 15 && t.length < 80 && !t.startsWith("[");
  });
  if (lines.length === 0) return null;
  const day = Math.floor(Date.now() / 86400000);
  return lines[day % lines.length].trim();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function generateShareCard(
  track: AlbumTrack,
  album: Album,
  coverSrc: string,
  format: CardFormat = "story",
): Promise<Blob> {
  const W = 1080;
  const H = format === "story" ? 1920 : 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const color = album.color || "#C9A96E";
  const lyric = pickLyric(track);

  // -- Background
  ctx.fillStyle = "#0D0D1A";
  ctx.fillRect(0, 0, W, H);

  // -- Color glow (top center)
  const glow = ctx.createRadialGradient(W / 2, H * 0.25, 0, W / 2, H * 0.25, W * 0.5);
  glow.addColorStop(0, color + "30");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // -- Album cover
  try {
    const img = await loadImage(coverSrc);
    const coverSize = format === "story" ? 560 : 480;
    const coverX = (W - coverSize) / 2;
    const coverY = format === "story" ? 280 : 80;
    const radius = 40;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(coverX, coverY, coverSize, coverSize, radius);
    ctx.clip();
    // Draw cover maintaining aspect ratio (center crop)
    const scale = Math.max(coverSize / img.width, coverSize / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, coverX - (dw - coverSize) / 2, coverY - (dh - coverSize) / 2, dw, dh);
    // Subtle overlay
    ctx.fillStyle = color + "15";
    ctx.fillRect(coverX, coverY, coverSize, coverSize);
    ctx.restore();

    // Shadow beneath cover
    const shadowGrad = ctx.createLinearGradient(0, coverY + coverSize, 0, coverY + coverSize + 80);
    shadowGrad.addColorStop(0, "#0D0D1A80");
    shadowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(coverX, coverY + coverSize, coverSize, 80);
  } catch {
    // Cover failed to load — continue without it
  }

  // -- Text section
  const textY = format === "story" ? 920 : 620;

  // Album name
  ctx.font = "500 28px sans-serif";
  ctx.fillStyle = "#666680";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText(album.title.toUpperCase(), W / 2, textY);
  ctx.letterSpacing = "0px";

  // Track title
  ctx.font = "bold 64px serif";
  ctx.fillStyle = "#F5F0E6";
  const titleLines = wrapText(ctx, track.title, W - 160);
  let titleY = textY + 70;
  for (const line of titleLines) {
    ctx.fillText(line, W / 2, titleY);
    titleY += 76;
  }

  // Lyric line
  if (lyric) {
    ctx.font = "italic 32px serif";
    ctx.fillStyle = color + "cc";
    const lyricLines = wrapText(ctx, `"${lyric}"`, W - 200);
    let lyricY = titleY + 30;
    for (const line of lyricLines) {
      ctx.fillText(line, W / 2, lyricY);
      lyricY += 42;
    }
    titleY = lyricY;
  }

  // Artist
  ctx.font = "400 30px sans-serif";
  ctx.fillStyle = "#a0a0b0";
  ctx.fillText("Loranne", W / 2, titleY + 40);

  // -- Link + Branding (bottom)
  const brandY = H - (format === "story" ? 120 : 60);
  const sharePath = getSharePath(album.slug, track.number);
  const linkText = `music.seteveus.space${sharePath}`;

  ctx.font = "500 22px sans-serif";
  ctx.fillStyle = "#666680";
  ctx.letterSpacing = "4px";
  ctx.fillText("VÉUS", W / 2, brandY);
  ctx.letterSpacing = "0px";

  // Link
  ctx.font = "400 20px sans-serif";
  ctx.fillStyle = "#a0a0b0";
  ctx.fillText(linkText, W / 2, brandY + 30);

  // -- Decorative line
  ctx.strokeStyle = color + "40";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 60, brandY - 30);
  ctx.lineTo(W / 2 + 60, brandY - 30);
  ctx.stroke();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error("Canvas export failed"))),
      "image/png",
      1,
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function shareImage(blob: Blob, track: AlbumTrack) {
  if (navigator.share && navigator.canShare?.({ files: [new File([blob], "card.png", { type: "image/png" })] })) {
    try {
      await navigator.share({
        files: [new File([blob], `${track.title} — Loranne.png`, { type: "image/png" })],
        title: track.title,
        text: `${track.title} — Loranne`,
      });
      return true;
    } catch {
      // Cancelled or failed
    }
  }
  return false;
}
