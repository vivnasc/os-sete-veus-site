/**
 * Generate launch reels for new Espelho/Nó publications.
 * Vertical video (1080x1920, 15s) with book cover, launch text, and audio.
 *
 * Visual sequence:
 *   0-1s    Fade in from dark
 *   0.5-2s  "Novo Espelho" / "Espelho 3 de 7" label
 *   1-3s    Book cover zoom in
 *   2-4s    Title slide up
 *   3-5s    Subtitle slide up
 *   5-8s    Description/tagline
 *   8-10s   Nó teaser (if applicable)
 *   10-12s  CTA "Disponível agora"
 *   12-13s  URL
 *   13-15s  Fade out
 */

import type { Experience } from "@/data/experiences";
import type { NosBook } from "@/data/nos-collection";

const REEL_W = 1080;
const REEL_H = 1920;
const FPS = 24;
const REEL_DURATION = 15;

export type LaunchReelProgress = {
  phase: "loading" | "recording" | "finalizing" | "done" | "error";
  progress: number;
  message: string;
};

export type LaunchReelOptions = {
  experience: Experience;
  nos?: NosBook | null;
  coverSrc: string;
  nosCoverSrc?: string | null;
  audioSrc?: string | null; // URL to audio file (from Supabase storage)
  tagline?: string;
  onProgress?: (p: LaunchReelProgress) => void;
};

// --- Utilities ---

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
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

type Particle = { x: number; y: number; r: number; speed: number; opacity: number; phase: number };

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * REEL_W,
    y: Math.random() * REEL_H,
    r: 1 + Math.random() * 2.5,
    speed: 0.2 + Math.random() * 0.5,
    opacity: 0.08 + Math.random() * 0.25,
    phase: Math.random() * Math.PI * 2,
  }));
}

// --- Main generator ---

export async function generateLaunchReel(options: LaunchReelOptions): Promise<Blob> {
  const { experience, nos, coverSrc, nosCoverSrc, audioSrc, tagline, onProgress } = options;
  const color = experience.color;

  const report = (phase: LaunchReelProgress["phase"], progress: number, message: string) => {
    onProgress?.({ phase, progress, message });
  };

  // Load images
  report("loading", 0, "A carregar capa...");
  const coverImg = await loadImage(coverSrc);
  let nosImg: HTMLImageElement | null = null;
  if (nosCoverSrc) {
    try { nosImg = await loadImage(nosCoverSrc); } catch { /* optional */ }
  }

  // Load audio (optional — from URL)
  let audioBuffer: AudioBuffer | null = null;
  if (audioSrc) {
    report("loading", 0.3, "A carregar audio...");
    const audioResponse = await fetch(audioSrc);
    if (audioResponse.ok) {
      const audioCtx = new AudioContext();
      const arrayBuffer = await audioResponse.arrayBuffer();
      audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      audioCtx.close();
    }
  }

  report("loading", 0.6, "A preparar...");

  const canvas = document.createElement("canvas");
  canvas.width = REEL_W;
  canvas.height = REEL_H;
  const ctx = canvas.getContext("2d")!;

  const particles = createParticles(25);
  const displayTagline = tagline || experience.description;

  // Book cover dimensions (3:4 ratio, portrait)
  const coverW = Math.round(REEL_W * 0.55);
  const coverH = Math.round(coverW * 1.5);
  const coverX = (REEL_W - coverW) / 2;
  const coverY = Math.round(REEL_H * 0.08);

  // Nó mini cover
  const nosW = 60;
  const nosH = 90;

  function drawFrame(elapsed: number) {
    const t = elapsed / REEL_DURATION;

    // Background — dark with subtle veil color
    ctx.fillStyle = "#0D0D1A";
    ctx.fillRect(0, 0, REEL_W, REEL_H);

    // Subtle color wash
    const wash = ctx.createRadialGradient(REEL_W / 2, REEL_H * 0.35, 100, REEL_W / 2, REEL_H * 0.35, REEL_W);
    wash.addColorStop(0, color + "18");
    wash.addColorStop(1, "transparent");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, REEL_W, REEL_H);

    // Floating particles
    ctx.save();
    for (const p of particles) {
      const py = (p.y - elapsed * p.speed * 30 + REEL_H * 2) % REEL_H;
      const flickr = 0.5 + 0.5 * Math.sin(elapsed * 1.5 + p.phase);
      ctx.globalAlpha = p.opacity * flickr * clamp(t * 5, 0, 1) * clamp((1 - t) * 5, 0, 1);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, py, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // --- Book cover (1-13s, zoom 1.0 → 1.08) ---
    const coverAppear = clamp((elapsed - 0.3) / 1.2, 0, 1);
    if (coverAppear > 0) {
      const zoom = 1 + 0.08 * easeInOut(t);
      const zW = coverW * zoom;
      const zH = coverH * zoom;
      const zX = coverX - (zW - coverW) / 2;
      const zY = coverY - (zH - coverH) / 2 - 10 * easeInOut(t);

      // Glow behind cover
      ctx.save();
      ctx.globalAlpha = coverAppear * 0.25;
      ctx.shadowColor = color;
      ctx.shadowBlur = 60;
      ctx.fillStyle = color;
      ctx.fillRect(zX + 20, zY + 20, zW - 40, zH - 40);
      ctx.restore();

      // Cover image
      ctx.save();
      ctx.globalAlpha = coverAppear;
      ctx.beginPath();
      ctx.roundRect(coverX, coverY, coverW, coverH, 12);
      ctx.clip();

      const scale = Math.max(zW / coverImg.width, zH / coverImg.height);
      const dw = coverImg.width * scale;
      const dh = coverImg.height * scale;
      ctx.drawImage(coverImg, zX - (dw - zW) / 2, zY - (dh - zH) / 2, dw, dh);
      ctx.restore();

      // Cover border
      ctx.save();
      ctx.globalAlpha = coverAppear * 0.3;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(coverX, coverY, coverW, coverH, 12);
      ctx.stroke();
      ctx.restore();
    }

    // --- Text area ---
    ctx.textAlign = "center";
    const textBaseY = coverY + coverH + 40;

    // "ESPELHO 3 DE 7" label (0.5-2s)
    const labelProgress = clamp((elapsed - 0.5) / 1, 0, 1);
    if (labelProgress > 0) {
      const slideUp = 15 * (1 - easeInOut(labelProgress));
      ctx.globalAlpha = labelProgress;
      ctx.font = "500 24px sans-serif";
      ctx.letterSpacing = "6px";
      ctx.fillStyle = color;
      ctx.fillText(`ESPELHO ${experience.number} DE 7`, REEL_W / 2, textBaseY + slideUp);
      ctx.letterSpacing = "0px";
    }

    // Title (2-4s)
    const titleProgress = clamp((elapsed - 2) / 1.2, 0, 1);
    if (titleProgress > 0) {
      const slideUp = 25 * (1 - easeInOut(titleProgress));
      ctx.globalAlpha = titleProgress;
      ctx.font = "bold 56px 'Cormorant Garamond', Georgia, serif";
      ctx.fillStyle = "#F5F0E6";
      const titleLines = wrapText(ctx, experience.title, REEL_W - 80);
      let y = textBaseY + 55 + slideUp;
      for (const line of titleLines) { ctx.fillText(line, REEL_W / 2, y); y += 66; }
    }

    // Subtitle (3.5-5s)
    const subProgress = clamp((elapsed - 3.5) / 1.2, 0, 1);
    if (subProgress > 0) {
      const slideUp = 20 * (1 - easeInOut(subProgress));
      ctx.globalAlpha = subProgress;
      ctx.font = "italic 32px 'Cormorant Garamond', Georgia, serif";
      ctx.fillStyle = color + "dd";
      ctx.fillText(experience.subtitle, REEL_W / 2, textBaseY + 130 + slideUp);
    }

    // Tagline / description (5.5-8s)
    const tagProgress = clamp((elapsed - 5.5) / 1.5, 0, 1);
    const tagFadeOut = clamp((9 - elapsed) / 1, 0, 1);
    if (tagProgress > 0 && tagFadeOut > 0) {
      const slideUp = 20 * (1 - easeInOut(tagProgress));
      ctx.globalAlpha = tagProgress * tagFadeOut;
      ctx.font = "italic 28px 'Cormorant Garamond', Georgia, serif";
      ctx.fillStyle = "#c0b8a8";
      const tagLines = wrapText(ctx, `"${displayTagline}"`, REEL_W - 120);
      let y = textBaseY + 190 + slideUp;
      for (const line of tagLines) { ctx.fillText(line, REEL_W / 2, y); y += 38; }
    }

    // Nó teaser (8-10.5s)
    if (nos && nosImg) {
      const nosProgress = clamp((elapsed - 8) / 1, 0, 1);
      const nosFadeOut = clamp((11.5 - elapsed) / 1, 0, 1);
      if (nosProgress > 0 && nosFadeOut > 0) {
        const alpha = nosProgress * nosFadeOut;
        const slideUp = 15 * (1 - easeInOut(nosProgress));
        const nosY = textBaseY + 200 + slideUp;

        // Background card
        ctx.save();
        ctx.globalAlpha = alpha * 0.15;
        ctx.fillStyle = nos.color;
        ctx.beginPath();
        ctx.roundRect(REEL_W / 2 - 250, nosY - 15, 500, nosH + 30, 10);
        ctx.fill();
        ctx.restore();

        // Mini cover
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.roundRect(REEL_W / 2 - 220, nosY, nosW, nosH, 6);
        ctx.clip();
        ctx.drawImage(nosImg, REEL_W / 2 - 220, nosY, nosW, nosH);
        ctx.restore();

        // Nó text
        ctx.globalAlpha = alpha;
        ctx.textAlign = "left";
        ctx.font = "500 18px sans-serif";
        ctx.fillStyle = nos.color;
        ctx.fillText("NO CORRESPONDENTE", REEL_W / 2 - 145, nosY + 22);
        ctx.font = "italic 24px 'Cormorant Garamond', Georgia, serif";
        ctx.fillStyle = "#F5F0E6";
        ctx.fillText(nos.title, REEL_W / 2 - 145, nosY + 52);
        ctx.font = "16px sans-serif";
        ctx.fillStyle = "#888";
        ctx.fillText(nos.subtitle, REEL_W / 2 - 145, nosY + 76);
        ctx.textAlign = "center";
      }
    }

    // CTA "Disponivel agora" (10.5-13s)
    const ctaProgress = clamp((elapsed - 10.5) / 1, 0, 1);
    if (ctaProgress > 0) {
      const slideUp = 20 * (1 - easeInOut(ctaProgress));
      ctx.globalAlpha = ctaProgress;

      // Pill button
      const btnW = 420;
      const btnH = 60;
      const btnX = (REEL_W - btnW) / 2;
      const btnY = REEL_H - 260 + slideUp;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(btnX, btnY, btnW, btnH, 30);
      ctx.fill();

      ctx.font = "600 24px sans-serif";
      ctx.fillStyle = "#0D0D1A";
      ctx.letterSpacing = "3px";
      ctx.fillText("DISPONIVEL AGORA", REEL_W / 2, btnY + 40);
      ctx.letterSpacing = "0px";
    }

    // URL + branding (11.5-13s)
    const brandProgress = clamp((elapsed - 11.5) / 1, 0, 1);
    if (brandProgress > 0) {
      ctx.globalAlpha = brandProgress;
      ctx.font = "400 22px sans-serif";
      ctx.fillStyle = "#888";
      ctx.fillText("seteveus.space", REEL_W / 2, REEL_H - 130);

      // Decorative line
      ctx.strokeStyle = color + "40";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(REEL_W / 2 - 50, REEL_H - 90);
      ctx.lineTo(REEL_W / 2 + 50, REEL_H - 90);
      ctx.stroke();

      ctx.font = "italic 20px 'Cormorant Garamond', Georgia, serif";
      ctx.fillStyle = "#666";
      ctx.fillText("Vivianne dos Santos", REEL_W / 2, REEL_H - 65);
    }

    // Fade in (first 1s)
    if (elapsed < 1) {
      ctx.globalAlpha = 1 - elapsed;
      ctx.fillStyle = "#0D0D1A";
      ctx.fillRect(0, 0, REEL_W, REEL_H);
    }

    // Fade out (last 2s)
    if (elapsed > REEL_DURATION - 2) {
      ctx.globalAlpha = 1 - clamp((REEL_DURATION - elapsed) / 2, 0, 1);
      ctx.fillStyle = "#0D0D1A";
      ctx.fillRect(0, 0, REEL_W, REEL_H);
    }

    ctx.globalAlpha = 1;
  }

  // --- Encode with WebCodecs + mp4-muxer ---
  if (typeof VideoEncoder !== "undefined") {
    report("recording", 0, "A gravar reel (MP4)...");
    const { Muxer, ArrayBufferTarget } = await import("mp4-muxer");

    const target = new ArrayBufferTarget();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const muxerConfig: any = {
      target,
      video: { codec: "avc", width: REEL_W, height: REEL_H },
      fastStart: "in-memory",
    };

    if (audioBuffer) {
      muxerConfig.audio = {
        codec: "aac",
        numberOfChannels: audioBuffer.numberOfChannels,
        sampleRate: audioBuffer.sampleRate,
      };
    }

    const muxer = new Muxer(muxerConfig);

    // Encode video frames
    const encoder = new VideoEncoder({
      output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
      error: () => {},
    });
    encoder.configure({
      codec: "avc1.42001f",
      width: REEL_W,
      height: REEL_H,
      bitrate: 4_000_000,
      framerate: FPS,
    });

    const totalFrames = REEL_DURATION * FPS;
    for (let i = 0; i < totalFrames; i++) {
      const elapsed = i / FPS;
      drawFrame(elapsed);
      const frame = new VideoFrame(canvas, { timestamp: i * (1_000_000 / FPS) });
      encoder.encode(frame, { keyFrame: i % (FPS * 2) === 0 });
      frame.close();
      if (i % FPS === 0) report("recording", i / totalFrames, `A gravar... ${Math.round(elapsed)}s / ${REEL_DURATION}s`);
    }
    await encoder.flush();
    encoder.close();

    // Encode audio if present
    if (audioBuffer) {
      report("finalizing", 0.8, "A processar audio...");
      const audioEncoder = new AudioEncoder({
        output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
        error: () => {},
      });
      audioEncoder.configure({
        codec: "mp4a.40.2",
        numberOfChannels: audioBuffer.numberOfChannels,
        sampleRate: audioBuffer.sampleRate,
        bitrate: 128000,
      });

      const channels = audioBuffer.numberOfChannels;
      const sampleRate = audioBuffer.sampleRate;
      // Start from 20s into the track (or beginning if shorter)
      const startSample = Math.floor(Math.min(20, Math.max(0, audioBuffer.duration - REEL_DURATION)) * sampleRate);
      const numSamples = Math.floor(REEL_DURATION * sampleRate);
      const audioData = new Float32Array(numSamples * channels);
      for (let ch = 0; ch < channels; ch++) {
        const channelData = audioBuffer.getChannelData(ch);
        for (let i = 0; i < numSamples; i++) {
          const srcIdx = startSample + i;
          if (srcIdx < channelData.length) {
            audioData[i * channels + ch] = channelData[srcIdx];
          }
        }
      }

      const chunkSize = sampleRate;
      for (let offset = 0; offset < numSamples; offset += chunkSize) {
        const size = Math.min(chunkSize, numSamples - offset);
        const chunk = new AudioData({
          format: "f32-planar" as AudioSampleFormat,
          sampleRate,
          numberOfFrames: size,
          numberOfChannels: channels,
          timestamp: (offset / sampleRate) * 1_000_000,
          data: audioData.slice(offset * channels, (offset + size) * channels),
        });
        audioEncoder.encode(chunk);
        chunk.close();
      }
      await audioEncoder.flush();
      audioEncoder.close();
    }

    muxer.finalize();
    const blob = new Blob([target.buffer], { type: "video/mp4" });
    report("done", 1, `Reel MP4 pronto! (${(blob.size / 1024 / 1024).toFixed(1)}MB)`);
    return blob;
  }

  // Fallback: MediaRecorder (WebM) — no audio support in fallback for simplicity
  report("recording", 0, "A gravar reel (WebM)...");
  const canvasStream = canvas.captureStream(FPS);
  const recorder = new MediaRecorder(canvasStream, {
    mimeType: "video/webm",
    videoBitsPerSecond: 2_000_000,
  });

  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };

  return new Promise<Blob>((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      report("done", 1, `Reel pronto! (${(blob.size / 1024 / 1024).toFixed(1)}MB)`);
      resolve(blob);
    };
    recorder.onerror = () => reject(new Error("Gravacao falhou."));
    recorder.start(500);

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
