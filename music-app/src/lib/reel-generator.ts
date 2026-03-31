/**
 * Generate animated reels (Canvas + Audio) for social media sharing.
 * Creates a 15s video with cover animation + track audio.
 * Uses MediaRecorder API — works in modern browsers.
 */

import type { Album, AlbumTrack } from "@/data/albums";

const REEL_DURATION = 15;
const REEL_W = 720;  // Smaller for mobile compatibility
const REEL_H = 1280;
const FPS = 24;

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
    img.onerror = () => reject(new Error(`Imagem falhou: ${src}`));
    img.src = src;
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
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

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function getBestMime(): string {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
  ];
  for (const mime of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(mime)) return mime;
  }
  return "video/webm";
}

export type ReelProgress = {
  phase: "loading" | "recording" | "finalizing" | "done" | "error";
  progress: number;
  message: string;
};

export async function generateReel(
  track: AlbumTrack,
  album: Album,
  coverSrc: string,
  audioSrc: string,
  onProgress?: (p: ReelProgress) => void,
): Promise<Blob> {
  const report = (phase: ReelProgress["phase"], progress: number, message: string) => {
    onProgress?.({ phase, progress, message });
  };

  report("loading", 0, "A carregar imagem...");
  const coverImg = await loadImage(coverSrc);

  report("loading", 0.3, "A carregar audio...");

  // Fetch audio and decode as AudioBuffer — no autoplay restrictions
  const audioResponse = await fetch(audioSrc);
  if (!audioResponse.ok) throw new Error("Audio nao disponivel");
  const audioArrayBuffer = await audioResponse.arrayBuffer();

  const audioCtx = new AudioContext();
  const audioBuffer = await audioCtx.decodeAudioData(audioArrayBuffer);

  // Start from 30s mark for the best part
  const startOffset = Math.min(30, Math.max(0, audioBuffer.duration - REEL_DURATION - 5));

  report("loading", 0.6, "A configurar gravacao...");

  const canvas = document.createElement("canvas");
  canvas.width = REEL_W;
  canvas.height = REEL_H;
  const ctx = canvas.getContext("2d")!;

  const canvasStream = canvas.captureStream(FPS);

  // Play audio via BufferSource → MediaStreamDestination (no autoplay needed)
  const bufferSource = audioCtx.createBufferSource();
  bufferSource.buffer = audioBuffer;
  const destination = audioCtx.createMediaStreamDestination();
  bufferSource.connect(destination);

  const combined = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...destination.stream.getAudioTracks(),
  ]);

  const mimeType = getBestMime();
  const recorder = new MediaRecorder(combined, {
    mimeType,
    videoBitsPerSecond: 2_000_000,
  });

  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const color = album.color || "#C9A96E";
  const lyric = pickLyric(track);
  const coverSize = Math.round(REEL_W * 0.7);
  const coverX = (REEL_W - coverSize) / 2;
  const coverBaseY = Math.round(REEL_H * 0.15);

  function drawFrame(elapsed: number) {
    const t = elapsed / REEL_DURATION;

    ctx.fillStyle = "#0D0D1A";
    ctx.fillRect(0, 0, REEL_W, REEL_H);

    // Glow
    const glowIntensity = 0.12 + 0.06 * Math.sin(elapsed * 0.8);
    const glow = ctx.createRadialGradient(REEL_W / 2, REEL_H * 0.25, 0, REEL_W / 2, REEL_H * 0.25, REEL_W * 0.6);
    glow.addColorStop(0, color + Math.round(glowIntensity * 255).toString(16).padStart(2, "0"));
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, REEL_W, REEL_H);

    // Cover — slow zoom
    const zoom = 1 + 0.06 * easeInOut(t);
    const zoomedSize = coverSize * zoom;
    const zoomOffset = (zoomedSize - coverSize) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(coverX, coverBaseY, coverSize, coverSize, 24);
    ctx.clip();
    const scale = Math.max(zoomedSize / coverImg.width, zoomedSize / coverImg.height);
    const dw = coverImg.width * scale;
    const dh = coverImg.height * scale;
    ctx.drawImage(coverImg, coverX - zoomOffset - (dw - zoomedSize) / 2, coverBaseY - zoomOffset * 0.3 - (dh - zoomedSize) / 2, dw, dh);
    ctx.fillStyle = color + "10";
    ctx.fillRect(coverX - zoomOffset, coverBaseY, zoomedSize, zoomedSize);
    ctx.restore();

    // Text
    ctx.textAlign = "center";
    const textBaseY = coverBaseY + coverSize + 60;

    // Album name
    const albumAlpha = clamp((elapsed - 0.5) / 1, 0, 1);
    if (albumAlpha > 0) {
      ctx.globalAlpha = albumAlpha;
      ctx.font = "500 18px sans-serif";
      ctx.fillStyle = "#666680";
      ctx.fillText(album.title.toUpperCase(), REEL_W / 2, textBaseY);
    }

    // Track title
    const titleAlpha = clamp((elapsed - 1.5) / 1, 0, 1);
    if (titleAlpha > 0) {
      ctx.globalAlpha = titleAlpha;
      ctx.font = "bold 42px serif";
      ctx.fillStyle = "#F5F0E6";
      const titleLines = wrapText(ctx, track.title, REEL_W - 80);
      let y = textBaseY + 50;
      for (const line of titleLines) { ctx.fillText(line, REEL_W / 2, y); y += 52; }
    }

    // Lyric
    if (lyric) {
      const lyricAlpha = clamp((elapsed - 3) / 1.5, 0, 1);
      if (lyricAlpha > 0) {
        ctx.globalAlpha = lyricAlpha;
        ctx.font = "italic 22px serif";
        ctx.fillStyle = color + "cc";
        const lyricLines = wrapText(ctx, `"${lyric}"`, REEL_W - 100);
        let y = textBaseY + 130;
        for (const line of lyricLines) { ctx.fillText(line, REEL_W / 2, y); y += 30; }
      }
    }

    // Artist
    const artistAlpha = clamp((elapsed - 2.5) / 1, 0, 1);
    if (artistAlpha > 0) {
      ctx.globalAlpha = artistAlpha;
      ctx.font = "400 20px sans-serif";
      ctx.fillStyle = "#a0a0b0";
      ctx.fillText("Loranne", REEL_W / 2, textBaseY + (lyric ? 190 : 130));
    }

    // Branding
    const brandAlpha = clamp((elapsed - 4) / 1, 0, 1);
    if (brandAlpha > 0) {
      ctx.globalAlpha = brandAlpha;
      const brandY = REEL_H - 80;
      ctx.strokeStyle = color + "40";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(REEL_W / 2 - 40, brandY - 20);
      ctx.lineTo(REEL_W / 2 + 40, brandY - 20);
      ctx.stroke();
      ctx.font = "500 16px sans-serif";
      ctx.fillStyle = "#666680";
      ctx.fillText("VÉUS", REEL_W / 2, brandY);
    }

    // Fade out last 2s
    if (elapsed > REEL_DURATION - 2) {
      const fadeOut = clamp((REEL_DURATION - elapsed) / 2, 0, 1);
      ctx.globalAlpha = 1 - fadeOut;
      ctx.fillStyle = "#0D0D1A";
      ctx.fillRect(0, 0, REEL_W, REEL_H);
    }

    ctx.globalAlpha = 1;
  }

  return new Promise<Blob>((resolve, reject) => {
    report("recording", 0, "A gravar reel... 0s / 15s");

    recorder.onstop = () => {
      report("finalizing", 0.95, "A finalizar...");
      try { bufferSource.stop(); bufferSource.disconnect(); audioCtx.close(); } catch {}

      const type = mimeType.includes("mp4") ? "video/mp4" : "video/webm";
      const blob = new Blob(chunks, { type });

      if (blob.size < 1000) {
        reject(new Error(`Reel vazio (${blob.size} bytes). Browser pode nao suportar gravacao de video.`));
        return;
      }

      report("done", 1, `Reel pronto! (${(blob.size / 1024 / 1024).toFixed(1)}MB)`);
      resolve(blob);
    };

    recorder.onerror = () => {
      try { bufferSource.stop(); audioCtx.close(); } catch {}
      reject(new Error("MediaRecorder falhou. Tenta num browser desktop."));
    };

    recorder.start(500);
    bufferSource.start(0, startOffset, REEL_DURATION);

    const startTs = performance.now();
    const interval = setInterval(() => {
      const elapsed = (performance.now() - startTs) / 1000;
      if (elapsed >= REEL_DURATION) {
        clearInterval(interval);
        recorder.stop();
        return;
      }
      report("recording", elapsed / REEL_DURATION, `A gravar... ${Math.round(elapsed)}s / ${REEL_DURATION}s`);
      drawFrame(elapsed);
    }, 1000 / FPS);

    drawFrame(0);
  });
}
