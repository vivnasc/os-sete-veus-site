/**
 * Generate animated reels (Canvas + Audio) for social media sharing.
 * Creates a 15s video with:
 * - Album cover with slow zoom + glow animation
 * - Track title + lyric line fading in
 * - VÉUS branding
 * - Track audio as soundtrack
 *
 * Uses MediaRecorder API — works in modern browsers.
 * Outputs WebM (Chrome) or MP4 (Safari).
 */

import type { Album, AlbumTrack } from "@/data/albums";

const REEL_DURATION = 15; // seconds
const REEL_W = 1080;
const REEL_H = 1920;
const FPS = 30;

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

/** Get best supported MIME type for MediaRecorder */
function getBestMime(): string {
  const candidates = [
    'video/mp4;codecs="avc1.42E01E,mp4a.40.2"',
    "video/mp4",
    'video/webm;codecs="vp9,opus"',
    'video/webm;codecs="vp8,opus"',
    "video/webm",
  ];
  for (const mime of candidates) {
    if (MediaRecorder.isTypeSupported(mime)) return mime;
  }
  return "video/webm";
}

export type ReelProgress = {
  phase: "loading" | "recording" | "finalizing" | "done" | "error";
  progress: number; // 0-1
  message: string;
};

/**
 * Generate a 15s animated reel with audio.
 *
 * @param track Track data
 * @param album Album data
 * @param coverSrc URL of the cover image
 * @param audioSrc URL of the track audio
 * @param onProgress Callback for progress updates
 * @returns Video blob ready for upload
 */
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

  // Load cover image
  const coverImg = await loadImage(coverSrc);

  report("loading", 0.3, "A preparar audio...");

  // Setup audio
  const audioCtx = new AudioContext();
  const audioEl = new Audio();
  audioEl.crossOrigin = "anonymous";
  audioEl.src = audioSrc;

  // Wait for audio to be ready
  await new Promise<void>((resolve, reject) => {
    audioEl.oncanplaythrough = () => resolve();
    audioEl.onerror = () => reject(new Error("Audio falhou a carregar"));
    audioEl.load();
  });

  // Skip to a good part (30s in, or start if shorter)
  const startTime = Math.min(30, Math.max(0, audioEl.duration - REEL_DURATION - 5));
  audioEl.currentTime = startTime;

  report("loading", 0.6, "A configurar gravacao...");

  // Setup canvas
  const canvas = document.createElement("canvas");
  canvas.width = REEL_W;
  canvas.height = REEL_H;
  const ctx = canvas.getContext("2d")!;

  // Setup streams
  const canvasStream = canvas.captureStream(FPS);
  const audioSource = audioCtx.createMediaElementSource(audioEl);
  const destination = audioCtx.createMediaStreamDestination();
  audioSource.connect(destination);
  audioSource.connect(audioCtx.destination); // Also play through speakers for monitoring

  // Combine video + audio tracks
  const combined = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...destination.stream.getAudioTracks(),
  ]);

  // Setup recorder
  const mimeType = getBestMime();
  const recorder = new MediaRecorder(combined, {
    mimeType,
    videoBitsPerSecond: 4_000_000,
  });

  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  // Animation data
  const color = album.color || "#C9A96E";
  const lyric = pickLyric(track);
  const coverSize = 560;
  const coverX = (REEL_W - coverSize) / 2;
  const coverBaseY = 280;

  function drawFrame(elapsed: number) {
    const t = elapsed / REEL_DURATION; // 0 to 1

    // Clear
    ctx.fillStyle = "#0D0D1A";
    ctx.fillRect(0, 0, REEL_W, REEL_H);

    // Animated glow (pulses)
    const glowIntensity = 0.12 + 0.06 * Math.sin(elapsed * 0.8);
    const glow = ctx.createRadialGradient(REEL_W / 2, REEL_H * 0.25, 0, REEL_W / 2, REEL_H * 0.25, REEL_W * 0.5);
    glow.addColorStop(0, color + Math.round(glowIntensity * 255).toString(16).padStart(2, "0"));
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, REEL_W, REEL_H);

    // Cover — slow zoom in (1.0 → 1.08 over duration)
    const zoom = 1 + 0.08 * easeInOut(t);
    const zoomedSize = coverSize * zoom;
    const zoomOffset = (zoomedSize - coverSize) / 2;
    const coverY = coverBaseY - zoomOffset * 0.3; // slight upward drift

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(coverX, coverBaseY, coverSize, coverSize, 40);
    ctx.clip();

    const scale = Math.max(zoomedSize / coverImg.width, zoomedSize / coverImg.height);
    const dw = coverImg.width * scale;
    const dh = coverImg.height * scale;
    ctx.drawImage(
      coverImg,
      coverX - zoomOffset - (dw - zoomedSize) / 2,
      coverY - (dh - zoomedSize) / 2,
      dw,
      dh,
    );

    // Color overlay
    ctx.fillStyle = color + "12";
    ctx.fillRect(coverX - zoomOffset, coverY, zoomedSize, zoomedSize);
    ctx.restore();

    // ── Text animations ──
    ctx.textAlign = "center";
    const textBaseY = 920;

    // Album name — fades in 0.5s-1.5s
    const albumAlpha = clamp((elapsed - 0.5) / 1, 0, 1);
    if (albumAlpha > 0) {
      ctx.globalAlpha = albumAlpha;
      ctx.font = "500 28px sans-serif";
      ctx.fillStyle = "#666680";
      ctx.letterSpacing = "6px";
      ctx.fillText(album.title.toUpperCase(), REEL_W / 2, textBaseY);
      ctx.letterSpacing = "0px";
    }

    // Track title — fades in 1.5s-2.5s
    const titleAlpha = clamp((elapsed - 1.5) / 1, 0, 1);
    if (titleAlpha > 0) {
      ctx.globalAlpha = titleAlpha;
      ctx.font = "bold 64px serif";
      ctx.fillStyle = "#F5F0E6";
      const titleLines = wrapText(ctx, track.title, REEL_W - 160);
      let titleY = textBaseY + 70;
      for (const line of titleLines) {
        ctx.fillText(line, REEL_W / 2, titleY);
        titleY += 76;
      }
    }

    // Lyric — fades in 3s-4.5s
    if (lyric) {
      const lyricAlpha = clamp((elapsed - 3) / 1.5, 0, 1);
      if (lyricAlpha > 0) {
        ctx.globalAlpha = lyricAlpha;
        ctx.font = "italic 32px serif";
        ctx.fillStyle = color + "cc";
        const lyricLines = wrapText(ctx, `"${lyric}"`, REEL_W - 200);
        let lyricY = textBaseY + 180;
        for (const line of lyricLines) {
          ctx.fillText(line, REEL_W / 2, lyricY);
          lyricY += 42;
        }
      }
    }

    // Artist — fades in 2.5s-3.5s
    const artistAlpha = clamp((elapsed - 2.5) / 1, 0, 1);
    if (artistAlpha > 0) {
      ctx.globalAlpha = artistAlpha;
      ctx.font = "400 30px sans-serif";
      ctx.fillStyle = "#a0a0b0";
      ctx.fillText("Loranne", REEL_W / 2, textBaseY + (lyric ? 260 : 180));
    }

    // Branding — fades in 4s-5s
    const brandAlpha = clamp((elapsed - 4) / 1, 0, 1);
    if (brandAlpha > 0) {
      ctx.globalAlpha = brandAlpha;
      const brandY = REEL_H - 120;
      ctx.strokeStyle = color + "40";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(REEL_W / 2 - 60, brandY - 30);
      ctx.lineTo(REEL_W / 2 + 60, brandY - 30);
      ctx.stroke();
      ctx.font = "500 22px sans-serif";
      ctx.fillStyle = "#666680";
      ctx.letterSpacing = "4px";
      ctx.fillText("VÉUS", REEL_W / 2, brandY);
      ctx.letterSpacing = "0px";
    }

    // Fade out at end (last 2s)
    if (elapsed > REEL_DURATION - 2) {
      const fadeOut = clamp((REEL_DURATION - elapsed) / 2, 0, 1);
      ctx.globalAlpha = 1 - fadeOut;
      ctx.fillStyle = "#0D0D1A";
      ctx.fillRect(0, 0, REEL_W, REEL_H);
    }

    ctx.globalAlpha = 1;
  }

  // Record
  return new Promise<Blob>((resolve, reject) => {
    report("recording", 0, "A gravar reel...");

    recorder.onstop = () => {
      report("finalizing", 0.95, "A finalizar...");
      audioEl.pause();
      audioSource.disconnect();
      audioCtx.close();

      const ext = mimeType.includes("mp4") ? "video/mp4" : "video/webm";
      const blob = new Blob(chunks, { type: ext });
      report("done", 1, "Reel pronto!");
      resolve(blob);
    };

    recorder.onerror = (e) => {
      audioEl.pause();
      reject(new Error(`MediaRecorder error: ${e}`));
    };

    recorder.start(100); // collect data every 100ms
    audioEl.play().catch(reject);

    const startTs = performance.now();

    function animate() {
      const elapsed = (performance.now() - startTs) / 1000;

      if (elapsed >= REEL_DURATION) {
        recorder.stop();
        return;
      }

      report("recording", elapsed / REEL_DURATION, `A gravar... ${Math.round(elapsed)}s / ${REEL_DURATION}s`);
      drawFrame(elapsed);
      requestAnimationFrame(animate);
    }

    // Draw first frame immediately
    drawFrame(0);
    requestAnimationFrame(animate);
  });
}
