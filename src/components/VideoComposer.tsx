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
  /** Data URL or object URL of the image for this scene */
  imageUrl: string | null;
  /** Whether this scene has been approved for rendering */
  approved: boolean;
};

type RenderState =
  | { status: "idle" }
  | { status: "rendering"; progress: number; currentScene: number }
  | { status: "done"; blobUrl: string }
  | { status: "error"; message: string };

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
  const [renderState, setRenderState] = useState<RenderState>({
    status: "idle",
  });
  const [previewScene, setPreviewScene] = useState(0);
  const [previewTime, setPreviewTime] = useState(0);
  const cancelRef = useRef(false);

  // ── Preview a single scene ──────────────────────────────────────────

  const drawPreview = useCallback(
    async (sceneIdx: number, timeInScene: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width / 2;
      canvas.height = height / 2;

      const scene = scenes[sceneIdx];
      if (!scene) return;

      const progress = scene.durationSec > 0 ? timeInScene / scene.durationSec : 0;

      await drawScene(ctx, scene, progress, canvas.width, canvas.height);
    },
    [scenes, width, height]
  );

  useEffect(() => {
    drawPreview(previewScene, previewTime);
  }, [previewScene, previewTime, drawPreview]);

  // ── Render full video ───────────────────────────────────────────────

  async function renderVideo() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cancelRef.current = false;

    const totalDuration = scenes.reduce((s, sc) => s + sc.durationSec, 0);
    const totalFrames = totalDuration * fps;

    // Set up MediaRecorder with canvas stream
    const stream = canvas.captureStream(fps);

    // If audio provided, add audio track
    let audioElement: HTMLAudioElement | null = null;
    if (audioUrl) {
      audioElement = new Audio(audioUrl);
      audioElement.crossOrigin = "anonymous";
      try {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(audioElement);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        source.connect(audioCtx.destination);
        for (const track of dest.stream.getAudioTracks()) {
          stream.addTrack(track);
        }
      } catch {
        // Audio mixing failed — continue without audio
      }
    }

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 5_000_000,
    });

    const chunks: BlobPart[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    const donePromise = new Promise<Blob>((resolve) => {
      recorder.onstop = () => {
        resolve(new Blob(chunks, { type: mimeType }));
      };
    });

    recorder.start(1000); // collect data every second

    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(() => {});
    }

    setRenderState({ status: "rendering", progress: 0, currentScene: 0 });

    // Pre-load all images
    const loadedImages = await preloadImages(scenes);

    // Render frame by frame
    let currentFrame = 0;
    let sceneStartFrame = 0;
    let sceneIdx = 0;

    const renderFrame = () => {
      if (cancelRef.current) {
        recorder.stop();
        return;
      }

      if (currentFrame >= totalFrames) {
        recorder.stop();
        return;
      }

      // Find current scene
      while (
        sceneIdx < scenes.length - 1 &&
        currentFrame >= sceneStartFrame + scenes[sceneIdx].durationSec * fps
      ) {
        sceneStartFrame += scenes[sceneIdx].durationSec * fps;
        sceneIdx++;
      }

      const scene = scenes[sceneIdx];
      const framesInScene = scene.durationSec * fps;
      const sceneProgress = (currentFrame - sceneStartFrame) / framesInScene;

      // Draw the scene
      drawSceneSync(
        ctx,
        scene,
        sceneProgress,
        width,
        height,
        loadedImages.get(sceneIdx) || null
      );

      // Cross-dissolve between scenes
      const transitionFrames = fps; // 1 second transition
      const framesFromEnd = sceneStartFrame + framesInScene - currentFrame;

      if (
        framesFromEnd < transitionFrames &&
        sceneIdx < scenes.length - 1
      ) {
        const alpha = 1 - framesFromEnd / transitionFrames;
        ctx.save();
        ctx.globalAlpha = alpha;
        const nextScene = scenes[sceneIdx + 1];
        drawSceneSync(
          ctx,
          nextScene,
          0,
          width,
          height,
          loadedImages.get(sceneIdx + 1) || null
        );
        ctx.restore();
      }

      currentFrame++;

      setRenderState({
        status: "rendering",
        progress: currentFrame / totalFrames,
        currentScene: sceneIdx,
      });

      // Use requestAnimationFrame for smooth rendering
      requestAnimationFrame(renderFrame);
    };

    renderFrame();

    const blob = await donePromise;
    const blobUrl = URL.createObjectURL(blob);

    if (audioElement) {
      audioElement.pause();
    }

    setRenderState({ status: "done", blobUrl });
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
        <h3 className="text-sm font-medium text-[#C9A96E] mb-3">
          Pre-visualizacao
        </h3>
        <div className="bg-black rounded-lg overflow-hidden inline-block">
          <canvas
            ref={previewCanvasRef}
            style={{ width: 640, height: 360 }}
            className="block"
          />
        </div>

        <div className="flex items-center gap-4 mt-3">
          <label className="text-xs text-[#a0a0b0]">Cena:</label>
          <select
            value={previewScene}
            onChange={(e) => {
              setPreviewScene(Number(e.target.value));
              setPreviewTime(0);
            }}
            className="bg-[#2a2a4a] text-[#F5F0E6] text-sm rounded px-2 py-1 border border-[#3a3a5a]"
          >
            {scenes.map((s, i) => (
              <option key={i} value={i}>
                {i + 1}. {s.type} ({s.durationSec}s)
              </option>
            ))}
          </select>

          <label className="text-xs text-[#a0a0b0]">Tempo:</label>
          <input
            type="range"
            min={0}
            max={scenes[previewScene]?.durationSec || 1}
            step={0.1}
            value={previewTime}
            onChange={(e) => setPreviewTime(Number(e.target.value))}
            className="w-40"
          />
          <span className="text-xs text-[#a0a0b0]">
            {previewTime.toFixed(1)}s
          </span>
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
            className="px-6 py-2 bg-[#D4A853] text-[#1A1A2E] rounded-lg font-medium hover:bg-[#C9A96E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Gerar Video
          </button>
        )}

        {renderState.status === "rendering" && (
          <>
            <div className="flex-1">
              <div className="h-3 bg-[#2a2a4a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D4A853] transition-all duration-300"
                  style={{ width: `${renderState.progress * 100}%` }}
                />
              </div>
              <p className="text-xs text-[#a0a0b0] mt-1">
                Cena {renderState.currentScene + 1}/{scenes.length} —{" "}
                {Math.round(renderState.progress * 100)}%
              </p>
            </div>
            <button
              onClick={cancelRender}
              className="px-4 py-2 bg-red-900/50 text-red-300 rounded-lg text-sm hover:bg-red-900/70 transition-colors"
            >
              Cancelar
            </button>
          </>
        )}

        {renderState.status === "done" && (
          <div className="flex items-center gap-4">
            <a
              href={renderState.blobUrl}
              download={`${title.replace(/[^a-zA-Z0-9]/g, "-")}.webm`}
              className="px-6 py-2 bg-green-800/50 text-green-300 rounded-lg font-medium hover:bg-green-800/70 transition-colors"
            >
              Descarregar Video (.webm)
            </a>
            <button
              onClick={() => setRenderState({ status: "idle" })}
              className="px-4 py-2 bg-[#2a2a4a] text-[#a0a0b0] rounded-lg text-sm hover:bg-[#3a3a5a] transition-colors"
            >
              Gerar novamente
            </button>
          </div>
        )}

        {renderState.status === "error" && (
          <div className="text-red-400 text-sm">
            Erro: {renderState.message}
            <button
              onClick={() => setRenderState({ status: "idle" })}
              className="ml-4 underline"
            >
              Tentar outra vez
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DRAWING FUNCTIONS ──────────────────────────────────────────────────

async function preloadImages(
  scenes: ComposerScene[]
): Promise<Map<number, HTMLImageElement>> {
  const map = new Map<number, HTMLImageElement>();

  await Promise.all(
    scenes.map(
      (scene, idx) =>
        new Promise<void>((resolve) => {
          if (!scene.imageUrl) {
            resolve();
            return;
          }
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            map.set(idx, img);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = scene.imageUrl;
        })
    )
  );

  return map;
}

async function drawScene(
  ctx: CanvasRenderingContext2D,
  scene: ComposerScene,
  progress: number,
  w: number,
  h: number
) {
  // Load image if needed
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

function drawSceneSync(
  ctx: CanvasRenderingContext2D,
  scene: ComposerScene | VideoScene,
  progress: number,
  w: number,
  h: number,
  img: HTMLImageElement | null
) {
  // Background
  ctx.fillStyle = PALETTE.bg;
  ctx.fillRect(0, 0, w, h);

  // Image with Ken Burns effect
  if (img) {
    const scale = 1 + progress * 0.08; // Slow zoom in
    const panX = progress * w * 0.03; // Slight pan right
    const panY = progress * h * 0.02; // Slight pan down

    ctx.save();

    // Calculate cover dimensions
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

    // Dark overlay for text readability
    ctx.fillStyle = "rgba(26, 26, 46, 0.45)";
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
  }

  // Vignette effect
  const gradient = ctx.createRadialGradient(
    w / 2,
    h / 2,
    w * 0.3,
    w / 2,
    h / 2,
    w * 0.7
  );
  gradient.addColorStop(0, "transparent");
  gradient.addColorStop(1, "rgba(26, 26, 46, 0.6)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // Text overlay
  if (scene.overlayText) {
    // Fade in for first 15%, stay, fade out for last 10%
    let textAlpha = 1;
    if (progress < 0.15) {
      textAlpha = progress / 0.15;
    } else if (progress > 0.9) {
      textAlpha = (1 - progress) / 0.1;
    }

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, textAlpha));

    const lines = scene.overlayText.split("\n");
    const isTitle =
      scene.type === "abertura" || scene.type === "fecho" || scene.type === "cta";
    const isFrase = scene.type === "frase_final";

    const fontSize = isTitle
      ? Math.round(w * 0.035)
      : isFrase
        ? Math.round(w * 0.028)
        : Math.round(w * 0.022);

    ctx.font = `${fontSize}px "Playfair Display", "Cormorant Garamond", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Position: center for title/frase, lower-third otherwise
    const yBase =
      isTitle || isFrase ? h * 0.5 : h * 0.78;
    const lineHeight = fontSize * 1.6;
    const totalTextHeight = lines.length * lineHeight;
    const startY = yBase - totalTextHeight / 2;

    // Text shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = isTitle ? PALETTE.gold : PALETTE.cream;

    lines.forEach((line, i) => {
      ctx.fillText(line, w / 2, startY + i * lineHeight);
    });

    ctx.restore();
  }

  // Scene type indicator (subtle, bottom-left)
  if (scene.type !== "abertura" && scene.type !== "fecho") {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = PALETTE.cream;
    ctx.font = `${Math.round(w * 0.01)}px sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(scene.type.toUpperCase(), w * 0.03, h * 0.96);
    ctx.restore();
  }
}
