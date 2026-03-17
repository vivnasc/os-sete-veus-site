"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { VideoScene } from "@/data/youtube-scripts";

// ─── PALETTE ──────────────────────────────────────────────────────────────

const PALETTE = {
  bg: "#1A1A2E",
  cream: "#F5F0E6",
  gold: "#D4A853",
  terracotta: "#C4745A",
  violet: "#8B5CF6",
  goldWarm: "#C9A96E",
};

// ─── TYPES ────────────────────────────────────────────────────────────────

export type ComposerScene = VideoScene & {
  imageUrl: string | null;
  approved: boolean;
};

type RenderState =
  | { status: "idle" }
  | { status: "rendering"; progress: number; currentScene: number }
  | { status: "done"; blobUrl: string }
  | { status: "error"; message: string };

// ─── TIMING: build a timeline from scenes ─────────────────────────────────

type TimelineEntry = {
  sceneIdx: number;
  startTime: number;
  endTime: number;
  duration: number;
};

function buildTimeline(scenes: ComposerScene[]): TimelineEntry[] {
  const timeline: TimelineEntry[] = [];
  let t = 0;
  for (let i = 0; i < scenes.length; i++) {
    const dur = scenes[i].durationSec;
    timeline.push({ sceneIdx: i, startTime: t, endTime: t + dur, duration: dur });
    t += dur;
  }
  return timeline;
}

function findSceneAtTime(timeline: TimelineEntry[], time: number): {
  entry: TimelineEntry;
  progress: number;
  timeInScene: number;
} {
  for (const entry of timeline) {
    if (time >= entry.startTime && time < entry.endTime) {
      const timeInScene = time - entry.startTime;
      return { entry, progress: timeInScene / entry.duration, timeInScene };
    }
  }
  // Past end: return last scene at 100%
  const last = timeline[timeline.length - 1];
  return { entry: last, progress: 1, timeInScene: last.duration };
}

// ─── COMPONENT ────────────────────────────────────────────────────────────

export default function VideoComposer({
  scenes,
  audioUrl,
  title,
  fps = 30,
  width = 1920,
  height = 1080,
}: {
  scenes: ComposerScene[];
  audioUrl: string | null;
  title: string;
  fps?: number;
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [renderState, setRenderState] = useState<RenderState>({ status: "idle" });
  const [previewScene, setPreviewScene] = useState(0);
  const [previewTime, setPreviewTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const cancelRef = useRef(false);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number>(0);

  const timeline = buildTimeline(scenes);
  const totalDuration = timeline.length > 0 ? timeline[timeline.length - 1].endTime : 0;

  // ── Preview: draw a single frame ──────────────────────────────────

  const drawPreview = useCallback(
    async (time: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width / 2;
      canvas.height = height / 2;

      const tl = buildTimeline(scenes);
      if (tl.length === 0) return;

      const { entry, progress } = findSceneAtTime(tl, time);
      const scene = scenes[entry.sceneIdx];
      if (!scene) return;

      // Also get next scene for cross-dissolve
      const transitionDur = 1.0; // 1 second cross-dissolve
      const timeUntilEnd = entry.endTime - time;
      const nextEntry = entry.sceneIdx < scenes.length - 1 ? tl[entry.sceneIdx + 1] : null;

      await drawScene(ctx, scene, progress, canvas.width, canvas.height);

      // Cross-dissolve into next scene
      if (nextEntry && timeUntilEnd < transitionDur) {
        const alpha = 1 - timeUntilEnd / transitionDur;
        ctx.save();
        ctx.globalAlpha = alpha;
        await drawScene(ctx, scenes[nextEntry.sceneIdx], 0, canvas.width, canvas.height);
        ctx.restore();
      }
    },
    [scenes, width, height]
  );

  // Preview: scrubbing
  useEffect(() => {
    if (!isPlaying) {
      const tl = buildTimeline(scenes);
      if (tl.length === 0) return;
      const entry = tl[previewScene];
      if (!entry) return;
      drawPreview(entry.startTime + previewTime);
    }
  }, [previewScene, previewTime, drawPreview, isPlaying, scenes]);

  // ── Preview: play with audio sync ─────────────────────────────────

  function startPreviewPlayback() {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    previewAudioRef.current = audio;
    setIsPlaying(true);

    audio.play().then(() => {
      const tick = () => {
        if (!previewAudioRef.current || previewAudioRef.current.paused) {
          setIsPlaying(false);
          return;
        }
        const t = audio.currentTime;
        drawPreview(t);

        // Update UI scene/time indicators
        const tl = buildTimeline(scenes);
        const { entry, timeInScene } = findSceneAtTime(tl, t);
        setPreviewScene(entry.sceneIdx);
        setPreviewTime(timeInScene);

        animFrameRef.current = requestAnimationFrame(tick);
      };
      animFrameRef.current = requestAnimationFrame(tick);
    }).catch(() => {
      setIsPlaying(false);
    });

    audio.onended = () => {
      setIsPlaying(false);
      cancelAnimationFrame(animFrameRef.current);
    };
  }

  function stopPreviewPlayback() {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }
    cancelAnimationFrame(animFrameRef.current);
    setIsPlaying(false);
  }

  // ── Render: audio-driven recording ────────────────────────────────

  async function renderVideo() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cancelRef.current = false;
    setRenderState({ status: "rendering", progress: 0, currentScene: 0 });

    // Pre-load all images
    const loadedImages = await preloadImages(scenes);

    // Set up canvas stream for recording
    const stream = canvas.captureStream(fps);

    // Set up audio
    let audioElement: HTMLAudioElement | null = null;
    let audioCtx: AudioContext | null = null;

    if (audioUrl) {
      audioElement = new Audio(audioUrl);
      audioElement.crossOrigin = "anonymous";
      // Pre-load audio completely
      await new Promise<void>((resolve) => {
        audioElement!.oncanplaythrough = () => resolve();
        audioElement!.onerror = () => resolve();
        audioElement!.load();
      });

      try {
        audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(audioElement);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        source.connect(audioCtx.destination);
        for (const track of dest.stream.getAudioTracks()) {
          stream.addTrack(track);
        }
      } catch {
        // Audio mixing failed — continue without audio in stream
      }
    }

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 8_000_000,
    });

    const chunks: BlobPart[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    const donePromise = new Promise<Blob>((resolve) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
    });

    recorder.start(500);

    // Start audio playback — this is the MASTER CLOCK
    if (audioElement) {
      audioElement.currentTime = 0;
      await audioElement.play().catch(() => {});
    }

    const tl = buildTimeline(scenes);
    const transitionDur = 1.0;

    // Render loop: driven by audio.currentTime (or performance.now fallback)
    const startWallTime = performance.now();

    const renderFrame = () => {
      if (cancelRef.current) {
        recorder.stop();
        if (audioElement) audioElement.pause();
        return;
      }

      // Master time: audio if available, wall-clock otherwise
      const currentTime = audioElement
        ? audioElement.currentTime
        : (performance.now() - startWallTime) / 1000;

      if (currentTime >= totalDuration || (audioElement && audioElement.ended)) {
        // Render final frame
        const { entry, progress } = findSceneAtTime(tl, totalDuration - 0.01);
        drawSceneSync(ctx, scenes[entry.sceneIdx], progress, width, height, loadedImages.get(entry.sceneIdx) || null);

        // Small delay to ensure last frames are captured
        setTimeout(() => {
          recorder.stop();
          if (audioElement) audioElement.pause();
        }, 200);
        return;
      }

      // Find current scene from master time
      const { entry, progress } = findSceneAtTime(tl, currentTime);
      const scene = scenes[entry.sceneIdx];

      // Draw current scene
      drawSceneSync(ctx, scene, progress, width, height, loadedImages.get(entry.sceneIdx) || null);

      // Cross-dissolve into next scene
      const timeUntilEnd = entry.endTime - currentTime;
      if (entry.sceneIdx < scenes.length - 1 && timeUntilEnd < transitionDur) {
        const nextIdx = entry.sceneIdx + 1;
        const alpha = 1 - timeUntilEnd / transitionDur;
        ctx.save();
        ctx.globalAlpha = alpha;
        drawSceneSync(ctx, scenes[nextIdx], 0, width, height, loadedImages.get(nextIdx) || null);
        ctx.restore();
      }

      setRenderState({
        status: "rendering",
        progress: currentTime / totalDuration,
        currentScene: entry.sceneIdx,
      });

      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);

    const blob = await donePromise;
    const blobUrl = URL.createObjectURL(blob);

    if (audioCtx) audioCtx.close().catch(() => {});

    if (cancelRef.current) {
      setRenderState({ status: "idle" });
    } else {
      setRenderState({ status: "done", blobUrl });
    }
  }

  function cancelRender() {
    cancelRef.current = true;
    setRenderState({ status: "idle" });
  }

  // ── UI ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div>
        <div className="bg-black rounded-lg overflow-hidden inline-block shadow-2xl">
          <canvas
            ref={previewCanvasRef}
            style={{ width: 640, height: 360 }}
            className="block"
          />
        </div>

        {/* Transport controls */}
        <div className="flex items-center gap-4 mt-3">
          {audioUrl && (
            <button
              onClick={isPlaying ? stopPreviewPlayback : startPreviewPlayback}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                isPlaying
                  ? "bg-red-900/50 text-red-300 hover:bg-red-900/70"
                  : "bg-mundo-violeta/80 text-white hover:bg-mundo-violeta"
              }`}
            >
              {isPlaying ? "Parar" : "Pre-visualizar com audio"}
            </button>
          )}

          {!isPlaying && (
            <>
              <select
                value={previewScene}
                onChange={(e) => {
                  setPreviewScene(Number(e.target.value));
                  setPreviewTime(0);
                }}
                className="bg-mundo-bg text-mundo-creme-suave text-sm rounded px-2 py-1 border border-mundo-border"
              >
                {scenes.map((s, i) => (
                  <option key={i} value={i}>
                    {i + 1}. {s.type} ({s.durationSec}s)
                  </option>
                ))}
              </select>

              <input
                type="range"
                min={0}
                max={scenes[previewScene]?.durationSec || 1}
                step={0.1}
                value={previewTime}
                onChange={(e) => setPreviewTime(Number(e.target.value))}
                className="w-32 accent-mundo-dourado"
              />
              <span className="text-xs text-mundo-muted">{previewTime.toFixed(1)}s</span>
            </>
          )}

          {isPlaying && (
            <div className="flex-1">
              <div className="h-1.5 bg-mundo-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-mundo-violeta transition-all duration-100"
                  style={{
                    width: `${totalDuration > 0
                      ? ((timeline[previewScene]?.startTime || 0) + previewTime) / totalDuration * 100
                      : 0}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden render canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Render controls */}
      <div className="flex items-center gap-4">
        {renderState.status === "idle" && (
          <button
            onClick={renderVideo}
            disabled={scenes.length === 0}
            className="px-6 py-2.5 bg-mundo-dourado text-mundo-bg rounded-lg font-medium hover:bg-mundo-dourado-quente disabled:opacity-50 transition-colors"
          >
            Gerar Video
          </button>
        )}

        {renderState.status === "rendering" && (
          <>
            <div className="flex-1">
              <div className="h-3 bg-mundo-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-mundo-dourado transition-all duration-300"
                  style={{ width: `${renderState.progress * 100}%` }}
                />
              </div>
              <p className="text-xs text-mundo-muted mt-1">
                Cena {renderState.currentScene + 1}/{scenes.length} — {Math.round(renderState.progress * 100)}%
                <span className="text-mundo-muted-dark ml-2">
                  (o audio e o relogio — sincronizacao perfeita)
                </span>
              </p>
            </div>
            <button
              onClick={cancelRender}
              className="px-4 py-2 bg-red-900/50 text-red-300 rounded-lg text-sm hover:bg-red-900/70"
            >
              Cancelar
            </button>
          </>
        )}

        {renderState.status === "done" && (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <a
                href={renderState.blobUrl}
                download={`${title.replace(/[^a-zA-Z0-9]/g, "-")}.webm`}
                className="px-6 py-2.5 bg-green-800/50 text-green-300 rounded-lg font-medium hover:bg-green-800/70"
              >
                Descarregar Video (.webm)
              </a>
              <button
                onClick={() => setRenderState({ status: "idle" })}
                className="px-4 py-2 bg-mundo-bg-surface text-mundo-muted rounded-lg text-sm hover:text-mundo-creme"
              >
                Gerar novamente
              </button>
            </div>
            {/* Inline preview of rendered video */}
            <video
              controls
              src={renderState.blobUrl}
              className="rounded-lg max-w-[640px] shadow-2xl"
            />
          </div>
        )}

        {renderState.status === "error" && (
          <div className="text-red-400 text-sm">
            Erro: {renderState.message}
            <button onClick={() => setRenderState({ status: "idle" })} className="ml-4 underline">
              Tentar outra vez
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── IMAGE PRELOADING ──────────────────────────────────────────────────

async function preloadImages(scenes: ComposerScene[]): Promise<Map<number, HTMLImageElement>> {
  const map = new Map<number, HTMLImageElement>();
  await Promise.all(
    scenes.map(
      (scene, idx) =>
        new Promise<void>((resolve) => {
          if (!scene.imageUrl) { resolve(); return; }
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => { map.set(idx, img); resolve(); };
          img.onerror = () => resolve();
          img.src = scene.imageUrl;
        })
    )
  );
  return map;
}

// ─── ASYNC DRAW (for preview) ──────────────────────────────────────────

async function drawScene(
  ctx: CanvasRenderingContext2D,
  scene: ComposerScene,
  progress: number,
  w: number,
  h: number
) {
  let img: HTMLImageElement | null = null;
  if (scene.imageUrl) {
    img = await new Promise<HTMLImageElement | null>((resolve) => {
      const i = new Image();
      i.crossOrigin = "anonymous";
      i.onload = () => resolve(i);
      i.onerror = () => resolve(null);
      i.src = scene.imageUrl!;
    });
  }
  drawSceneSync(ctx, scene, progress, w, h, img);
}

// ─── SYNC DRAW (for recording) ─────────────────────────────────────────

function drawSceneSync(
  ctx: CanvasRenderingContext2D,
  scene: ComposerScene | VideoScene,
  progress: number,
  w: number,
  h: number,
  img: HTMLImageElement | null
) {
  // 1. Background
  ctx.fillStyle = PALETTE.bg;
  ctx.fillRect(0, 0, w, h);

  // 2. Image with Ken Burns (slow, cinematic)
  if (img) {
    // Vary Ken Burns direction per scene type for visual variety
    const isEvenScene = (scene as ComposerScene).approved !== undefined;
    const zoomSpeed = 0.06;
    const panSpeed = 0.025;
    const scale = 1.05 + progress * zoomSpeed;

    // Alternate pan direction based on scene type hash
    const typeHash = scene.type.charCodeAt(0) % 4;
    const panXDir = typeHash < 2 ? 1 : -1;
    const panYDir = typeHash % 2 === 0 ? 1 : -1;
    const panX = progress * w * panSpeed * panXDir;
    const panY = progress * h * panSpeed * 0.5 * panYDir;

    ctx.save();

    // Cover-fit the image
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let drawW: number, drawH: number;

    if (imgRatio > canvasRatio) {
      drawH = h * scale;
      drawW = drawH * imgRatio;
    } else {
      drawW = w * scale;
      drawH = drawW / imgRatio;
    }

    const x = (w - drawW) / 2 + panX;
    const y = (h - drawH) / 2 + panY;

    ctx.drawImage(img, x, y, drawW, drawH);

    // Cinematic overlay: darker at edges, lighter at center
    ctx.fillStyle = "rgba(26, 26, 46, 0.35)";
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
  }

  // 3. Vignette
  const gradient = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.75);
  gradient.addColorStop(0, "transparent");
  gradient.addColorStop(1, "rgba(26, 26, 46, 0.65)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // 4. Text overlay with word-by-word fade-in
  if (scene.overlayText) {
    drawAnimatedText(ctx, scene, progress, w, h);
  }
}

// ─── ANIMATED TEXT ─────────────────────────────────────────────────────

function drawAnimatedText(
  ctx: CanvasRenderingContext2D,
  scene: ComposerScene | VideoScene,
  progress: number,
  w: number,
  h: number
) {
  const text = scene.overlayText;
  if (!text) return;

  const isTitle = scene.type === "abertura" || scene.type === "fecho" || scene.type === "cta";
  const isFrase = scene.type === "frase_final";

  // Font sizing
  const fontSize = isTitle
    ? Math.round(w * 0.032)
    : isFrase
    ? Math.round(w * 0.026)
    : Math.round(w * 0.02);

  const fontFamily = '"Playfair Display", "Cormorant Garamond", Georgia, serif';
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lines = text.split("\n");
  const lineHeight = fontSize * 1.7;

  // Position: center for title/frase, lower third otherwise
  const yBase = isTitle || isFrase ? h * 0.5 : h * 0.8;
  const totalTextHeight = lines.length * lineHeight;
  const startY = yBase - totalTextHeight / 2;

  // Animation: fade in lines sequentially, hold, then fade out all
  // Fade-in takes first 30% of scene duration
  // Hold for 50%
  // Fade-out takes last 20%

  const fadeInEnd = 0.3;
  const fadeOutStart = 0.8;

  // Overall opacity (for fade-out)
  let globalAlpha = 1;
  if (progress > fadeOutStart) {
    globalAlpha = Math.max(0, 1 - (progress - fadeOutStart) / (1 - fadeOutStart));
  }

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 3;

  lines.forEach((line, lineIdx) => {
    // Each line fades in sequentially during the fade-in period
    const lineDelay = lines.length > 1 ? (lineIdx / lines.length) * fadeInEnd : 0;
    const lineEnd = lineDelay + fadeInEnd / Math.max(lines.length, 1);

    let lineAlpha = 1;
    if (progress < lineDelay) {
      lineAlpha = 0;
    } else if (progress < lineEnd) {
      lineAlpha = (progress - lineDelay) / (lineEnd - lineDelay);
    }

    // Combine with global fade-out
    const finalAlpha = lineAlpha * globalAlpha;
    if (finalAlpha <= 0) return;

    ctx.globalAlpha = finalAlpha;

    // Subtle slide-up animation during fade-in
    const slideOffset = (1 - lineAlpha) * fontSize * 0.3;
    const y = startY + lineIdx * lineHeight + slideOffset;

    ctx.fillStyle = isTitle ? PALETTE.gold : PALETTE.cream;
    ctx.fillText(line, w / 2, y);
  });

  ctx.restore();
}
