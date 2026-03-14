"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getAllCourses } from "@/data/courses";
import {
  getScriptsForCourse,
  getFullNarration,
  getTotalDuration,
} from "@/data/youtube-scripts";
import type { YouTubeScript, VideoScene } from "@/data/youtube-scripts";
import {
  drawCourseBackground,
  drawCourseSilhouette,
  drawCourseText,
} from "@/lib/video-visuals";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type Step = 1 | 2 | 3 | 4;

// Scene with runtime data (image, timing adjusted to audio)
type RuntimeScene = VideoScene & {
  imageUrl: string | null;
  adjustedStart: number;
  adjustedEnd: number;
};

export default function YouTubePage() {
  const { user, profile } = useAuth();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  // Wizard state
  const [step, setStep] = useState<Step>(1);
  const [selectedScript, setSelectedScript] = useState<YouTubeScript | null>(
    null
  );

  // Audio
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioGenerating, setAudioGenerating] = useState(false);
  const [audioError, setAudioError] = useState("");

  // Scenes with images
  const [scenes, setScenes] = useState<RuntimeScene[]>([]);

  // Preview
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewAudioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animFrameRef = useRef<number>(0);

  // Export
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const cancelExportRef = useRef(false);

  // Video approved
  const [approved, setApproved] = useState(false);

  const courses = getAllCourses();

  // ── Step 1: Select hook ─────────────────────────────────────────────

  function selectHook(script: YouTubeScript) {
    setSelectedScript(script);
    setAudioUrl(null);
    setAudioDuration(0);
    setScenes([]);
    setApproved(false);
    setExportUrl(null);
    setStep(2);
  }

  // ── Step 2: Generate audio ──────────────────────────────────────────

  async function generateAudio() {
    if (!selectedScript) return;
    setAudioGenerating(true);
    setAudioError("");

    try {
      const narration = getFullNarration(selectedScript);

      const res = await fetch("/api/admin/courses/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: narration,
          courseSlug: selectedScript.courseSlug,
          moduleNum: 0,
          subLetter: `yt-hook-${selectedScript.hookIndex}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || `Erro ${res.status}`);
      }

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.includes("audio/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        const data = await res.json();
        setAudioUrl(data.url);
      }
    } catch (err) {
      setAudioError(
        err instanceof Error ? err.message : "Erro ao gerar audio"
      );
    } finally {
      setAudioGenerating(false);
    }
  }

  function handleAudioUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  }

  // When audio loads, get duration and build scene timeline
  function onAudioLoaded(e: React.SyntheticEvent<HTMLAudioElement>) {
    const dur = e.currentTarget.duration;
    if (!isFinite(dur) || !selectedScript) return;
    setAudioDuration(dur);
    buildSceneTimeline(selectedScript, dur);
  }

  function buildSceneTimeline(script: YouTubeScript, totalDuration: number) {
    const scriptTotal = script.scenes.reduce(
      (s, sc) => s + sc.durationSec,
      0
    );
    const ratio = totalDuration / scriptTotal;

    let cursor = 0;
    const built: RuntimeScene[] = script.scenes.map((sc) => {
      const adjusted = sc.durationSec * ratio;
      const start = cursor;
      cursor += adjusted;
      return {
        ...sc,
        imageUrl: null,
        adjustedStart: start,
        adjustedEnd: cursor,
      };
    });

    setScenes(built);
    setApproved(false);
    setExportUrl(null);
  }

  function advanceToPreview() {
    if (audioUrl && scenes.length > 0) {
      setStep(3);
    }
  }

  // ── Step 3: Preview & approve ───────────────────────────────────────

  function handleImageUpload(idx: number, file: File) {
    const url = URL.createObjectURL(file);
    setScenes((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, imageUrl: url } : s))
    );
    setApproved(false);
  }

  // Find current scene based on time
  function getCurrentScene(time: number): RuntimeScene | null {
    return scenes.find((s) => time >= s.adjustedStart && time < s.adjustedEnd) || null;
  }

  function getCurrentSceneIndex(time: number): number {
    return scenes.findIndex((s) => time >= s.adjustedStart && time < s.adjustedEnd);
  }

  // Draw a frame on canvas — uses course visual identity
  const drawFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      time: number,
      loadedImages: Map<number, HTMLImageElement>
    ) => {
      const slug = selectedScript?.courseSlug || "ouro-proprio";
      const idx = scenes.findIndex((s) => time >= s.adjustedStart && time < s.adjustedEnd);
      const scene = scenes[idx >= 0 ? idx : scenes.length - 1];
      if (!scene) {
        ctx.fillStyle = "#1A1A2E";
        ctx.fillRect(0, 0, w, h);
        return;
      }

      const sceneDur = scene.adjustedEnd - scene.adjustedStart;
      const sceneProgress = Math.max(0, Math.min(1, (time - scene.adjustedStart) / sceneDur));

      // 1. Course-branded background (gradient + particles + glow)
      drawCourseBackground(ctx, w, h, slug, time, sceneProgress);

      // 2. User image (if provided) with Ken Burns on top
      const img = loadedImages.get(idx);
      if (img) {
        const scale = 1 + sceneProgress * 0.06;
        const panX = sceneProgress * w * 0.02;
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
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.drawImage(img, (w - drawW) / 2 + panX, (h - drawH) / 2, drawW, drawH);
        ctx.restore();
        // Overlay to blend with background
        ctx.fillStyle = "rgba(26, 26, 46, 0.35)";
        ctx.fillRect(0, 0, w, h);
      }

      // 3. Course-branded silhouette (pose based on scene type)
      drawCourseSilhouette(ctx, w, h, slug, scene.type, sceneProgress);

      // 4. Text with fade
      const fadeTime = Math.min(1.0, sceneDur * 0.1);
      let textAlpha = 1;
      const timeInScene = time - scene.adjustedStart;
      const timeFromEnd = scene.adjustedEnd - time;
      if (timeInScene < fadeTime) textAlpha = timeInScene / fadeTime;
      if (timeFromEnd < fadeTime) textAlpha = Math.min(textAlpha, timeFromEnd / fadeTime);

      drawCourseText(ctx, w, h, slug, scene.overlayText || "", scene.type, textAlpha);

      // 5. Scene progress bar
      const palette = { accent: scene.type === "abertura" ? "#C9A96E" : "#C9A96E33" };
      ctx.fillStyle = palette.accent;
      ctx.fillRect(0, h - 3, w * sceneProgress, 3);
    },
    [scenes]
  );

  // Preview playback
  const previewImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());

  useEffect(() => {
    // Preload images
    const map = new Map<number, HTMLImageElement>();
    scenes.forEach((scene, idx) => {
      if (scene.imageUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = scene.imageUrl;
        img.onload = () => {
          map.set(idx, img);
          previewImagesRef.current = new Map(map);
        };
      }
    });
    previewImagesRef.current = map;
  }, [scenes]);

  function togglePlayback() {
    const audio = previewAudioRef.current;
    if (!audio || !audioUrl) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      cancelAnimationFrame(animFrameRef.current);
    } else {
      audio.play();
      setPlaying(true);
      animatePreview();
    }
  }

  function animatePreview() {
    const audio = previewAudioRef.current;
    const canvas = previewCanvasRef.current;
    if (!audio || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = () => {
      if (audio.paused || audio.ended) {
        setPlaying(false);
        return;
      }
      setCurrentTime(audio.currentTime);
      drawFrame(ctx, canvas.width, canvas.height, audio.currentTime, previewImagesRef.current);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    tick();
  }

  function seekPreview(time: number) {
    const audio = previewAudioRef.current;
    const canvas = previewCanvasRef.current;
    if (!audio || !canvas) return;

    audio.currentTime = time;
    setCurrentTime(time);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      drawFrame(ctx, canvas.width, canvas.height, time, previewImagesRef.current);
    }
  }

  // Draw initial frame when entering step 3
  useEffect(() => {
    if (step === 3) {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      canvas.width = 960;
      canvas.height = 540;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawFrame(ctx, 960, 540, 0, previewImagesRef.current);
      }
    }
  }, [step, drawFrame]);

  // ── Step 4: Export ──────────────────────────────────────────────────

  async function exportVideo() {
    const canvas = exportCanvasRef.current;
    if (!canvas || !audioUrl) return;

    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setExporting(true);
    setExportProgress(0);
    cancelExportRef.current = false;

    // Preload images at export resolution
    const exportImages = new Map<number, HTMLImageElement>();
    await Promise.all(
      scenes.map(
        (scene, idx) =>
          new Promise<void>((resolve) => {
            if (!scene.imageUrl) { resolve(); return; }
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => { exportImages.set(idx, img); resolve(); };
            img.onerror = () => resolve();
            img.src = scene.imageUrl;
          })
      )
    );

    // Setup recording
    const fps = 30;
    const stream = canvas.captureStream(fps);

    const audioEl = new Audio(audioUrl);
    audioEl.crossOrigin = "anonymous";

    try {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(audioEl);
      const dest = audioCtx.createMediaStreamDestination();
      source.connect(dest);
      source.connect(audioCtx.destination);
      for (const track of dest.stream.getAudioTracks()) {
        stream.addTrack(track);
      }
    } catch {
      // Continue without audio in recording
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
      recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
    });

    recorder.start(1000);
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});

    const renderFrame = () => {
      if (cancelExportRef.current || audioEl.ended || audioEl.paused) {
        recorder.stop();
        audioEl.pause();
        return;
      }

      drawFrame(ctx, 1920, 1080, audioEl.currentTime, exportImages);
      setExportProgress(audioDuration > 0 ? audioEl.currentTime / audioDuration : 0);
      requestAnimationFrame(renderFrame);
    };

    // Wait for audio to start playing
    audioEl.onended = () => {
      setTimeout(() => recorder.stop(), 500);
    };

    renderFrame();

    const blob = await donePromise;
    const url = URL.createObjectURL(blob);
    setExportUrl(url);
    setExporting(false);
  }

  // ── Guard ───────────────────────────────────────────────────────────

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1a2e]">
        <p className="text-[#a0a0b0]">Acesso restrito.</p>
      </div>
    );
  }

  const sceneIdx = getCurrentSceneIndex(currentTime);

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#F5F0E6]">
      {/* Header */}
      <div className="border-b border-[#2a2a4a] px-6 py-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[#a0a0b0] hover:text-[#F5F0E6] text-sm"
            >
              HUB
            </Link>
            <span className="text-[#3a3a5a]">/</span>
            <h1 className="text-lg font-medium text-[#C9A96E]">
              Videos YouTube
            </h1>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (s === 1) setStep(1);
                    if (s === 2 && selectedScript) setStep(2);
                    if (s === 3 && audioUrl && scenes.length > 0) setStep(3);
                    if (s === 4 && approved) setStep(4);
                  }}
                  className={`h-8 w-8 rounded-full text-xs font-medium transition-all ${
                    step === s
                      ? "bg-[#C9A96E] text-[#1a1a2e]"
                      : step > s
                        ? "bg-green-800 text-green-200"
                        : "bg-[#2a2a4a] text-[#666]"
                  }`}
                >
                  {step > s ? "\u2713" : s}
                </button>
                {s < 4 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step > s ? "bg-green-800" : "bg-[#2a2a4a]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* ════════════ STEP 1: Escolher Hook ════════════ */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl text-[#C9A96E] mb-1">
                1. Escolhe o video
              </h2>
              <p className="text-sm text-[#a0a0b0]">
                Cada curso tem 2-3 hooks gratuitos para YouTube.
              </p>
            </div>

            {courses.map((course) => {
              const hooks = getScriptsForCourse(course.slug);
              if (hooks.length === 0) return null;
              return (
                <div key={course.slug} className="space-y-3">
                  <h3 className="text-sm text-[#666] uppercase tracking-wider">
                    {course.number}. {course.title}
                  </h3>
                  {hooks.map((hook) => (
                    <button
                      key={`${hook.courseSlug}-${hook.hookIndex}`}
                      onClick={() => selectHook(hook)}
                      className={`w-full text-left border rounded-xl p-5 transition-all hover:border-[#C9A96E]/50 ${
                        selectedScript === hook
                          ? "border-[#C9A96E] bg-[#C9A96E]/5"
                          : "border-[#2a2a4a]"
                      }`}
                    >
                      <p className="text-[#F5F0E6] font-medium">
                        {hook.title}
                      </p>
                      <p className="text-xs text-[#a0a0b0] mt-1">
                        {hook.durationMin} min — {hook.scenes.length} cenas
                      </p>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ════════════ STEP 2: Gerar Audio ════════════ */}
        {step === 2 && selectedScript && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl text-[#C9A96E] mb-1">
                2. Audio — {selectedScript.title}
              </h2>
              <p className="text-sm text-[#a0a0b0]">
                Gera o audio com a tua voz (ElevenLabs) ou carrega um MP3.
              </p>
            </div>

            {/* Script preview */}
            <div className="border border-[#2a2a4a] rounded-xl p-5 max-h-64 overflow-y-auto">
              <p className="text-xs text-[#666] uppercase mb-3">
                Narracao ({selectedScript.scenes.filter((s) => s.narration).length} seccoes)
              </p>
              <p className="text-sm text-[#d0d0d0] whitespace-pre-line leading-relaxed">
                {getFullNarration(selectedScript)}
              </p>
            </div>

            {/* Generate or upload */}
            <div className="flex items-center gap-4">
              <button
                onClick={generateAudio}
                disabled={audioGenerating}
                className="px-6 py-3 bg-[#D4A853] text-[#1a1a2e] rounded-lg font-medium hover:bg-[#C9A96E] disabled:opacity-40 transition-colors"
              >
                {audioGenerating
                  ? "A gerar com a tua voz..."
                  : "Gerar Audio (ElevenLabs)"}
              </button>

              <span className="text-[#3a3a5a]">ou</span>

              <label className="px-4 py-3 bg-[#2a2a4a] text-[#a0a0b0] rounded-lg text-sm cursor-pointer hover:bg-[#3a3a5a] transition-colors">
                Carregar MP3
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </label>
            </div>

            {audioError && (
              <div className="text-sm text-red-400 bg-red-900/20 rounded-lg px-4 py-3">
                {audioError}
              </div>
            )}

            {/* Audio player + advance */}
            {audioUrl && (
              <div className="border border-green-800/50 bg-green-900/10 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm text-green-300">Audio pronto</span>
                  {audioDuration > 0 && (
                    <span className="text-xs text-[#a0a0b0]">
                      {Math.floor(audioDuration / 60)}:{String(Math.floor(audioDuration % 60)).padStart(2, "0")} —{" "}
                      {scenes.length} cenas calculadas
                    </span>
                  )}
                </div>

                <audio
                  ref={previewAudioRef}
                  src={audioUrl}
                  controls
                  onLoadedMetadata={onAudioLoaded}
                  className="w-full"
                />

                <button
                  onClick={advanceToPreview}
                  disabled={scenes.length === 0}
                  className="px-6 py-3 bg-[#C9A96E] text-[#1a1a2e] rounded-lg font-medium hover:bg-[#D4A853] disabled:opacity-40 transition-colors"
                >
                  Continuar para pre-visualizacao
                </button>
              </div>
            )}

            <button
              onClick={() => setStep(1)}
              className="text-sm text-[#666] hover:text-[#a0a0b0]"
            >
              Voltar
            </button>
          </div>
        )}

        {/* ════════════ STEP 3: Preview & Approve ════════════ */}
        {step === 3 && selectedScript && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl text-[#C9A96E] mb-1">
                3. Rever — {selectedScript.title}
              </h2>
              <p className="text-sm text-[#a0a0b0]">
                Ve o video completo. Adiciona imagens se quiseres. Quando estiveres satisfeita, aprova.
              </p>
            </div>

            {/* Video preview */}
            <div className="bg-black rounded-xl overflow-hidden">
              <canvas
                ref={previewCanvasRef}
                style={{ width: "100%", aspectRatio: "16/9" }}
                className="block"
              />
            </div>

            {/* Playback controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayback}
                className="px-4 py-2 bg-[#2a2a4a] text-[#F5F0E6] rounded-lg text-sm hover:bg-[#3a3a5a] transition-colors"
              >
                {playing ? "Pausar" : "Reproduzir"}
              </button>

              <input
                type="range"
                min={0}
                max={audioDuration || 1}
                step={0.1}
                value={currentTime}
                onChange={(e) => seekPreview(Number(e.target.value))}
                className="flex-1"
              />

              <span className="text-xs text-[#a0a0b0] tabular-nums w-24 text-right">
                {formatTime(currentTime)} / {formatTime(audioDuration)}
              </span>
            </div>

            {/* Audio element (hidden, controlled by preview) */}
            {audioUrl && (
              <audio
                ref={previewAudioRef}
                src={audioUrl}
                onLoadedMetadata={onAudioLoaded}
                className="hidden"
              />
            )}

            {/* Scene timeline with image slots */}
            <div>
              <h3 className="text-sm text-[#C9A96E] mb-3">
                Cenas ({scenes.length}) — clica para adicionar imagem
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {scenes.map((scene, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      sceneIdx === idx
                        ? "border-[#C9A96E] ring-1 ring-[#C9A96E]/30"
                        : scene.imageUrl
                          ? "border-[#3a3a5a]"
                          : "border-[#2a2a4a] border-dashed"
                    }`}
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleImageUpload(idx, file);
                      };
                      input.click();
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file?.type.startsWith("image/"))
                        handleImageUpload(idx, file);
                    }}
                  >
                    <div className="aspect-video bg-[#1A1A2E] flex items-center justify-center relative">
                      {scene.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={scene.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[#3a3a5a] text-lg">+</span>
                      )}
                    </div>
                    <div className="px-1.5 py-1 bg-[#2a2a4a]/50">
                      <p className="text-[9px] text-[#666] uppercase font-mono truncate">
                        {idx + 1}. {scene.type}
                      </p>
                      <p className="text-[9px] text-[#a0a0b0]">
                        {formatTime(scene.adjustedStart)}-{formatTime(scene.adjustedEnd)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#666] mt-2">
                Cenas sem imagem usam fundo escuro com texto. Imagens opcionais.
              </p>
            </div>

            {/* Approve */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#2a2a4a]">
              {!approved ? (
                <button
                  onClick={() => {
                    setApproved(true);
                    setStep(4);
                  }}
                  className="px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Aprovar e exportar
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm text-green-300">Aprovado</span>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                className="text-sm text-[#666] hover:text-[#a0a0b0]"
              >
                Voltar
              </button>
            </div>
          </div>
        )}

        {/* ════════════ STEP 4: Export ════════════ */}
        {step === 4 && selectedScript && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl text-[#C9A96E] mb-1">
                4. Exportar — {selectedScript.title}
              </h2>
              <p className="text-sm text-[#a0a0b0]">
                Gera o video final em 1920x1080. Demora o tempo do audio (
                {formatTime(audioDuration)}).
              </p>
            </div>

            <canvas ref={exportCanvasRef} className="hidden" />

            {!exportUrl && !exporting && (
              <button
                onClick={exportVideo}
                className="px-8 py-4 bg-[#D4A853] text-[#1a1a2e] rounded-xl font-medium text-lg hover:bg-[#C9A96E] transition-colors"
              >
                Gerar Video (1920x1080)
              </button>
            )}

            {exporting && (
              <div className="space-y-3">
                <div className="h-4 bg-[#2a2a4a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4A853] transition-all duration-300"
                    style={{ width: `${exportProgress * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#a0a0b0]">
                  <span>A gravar... {Math.round(exportProgress * 100)}%</span>
                  <span>{formatTime(exportProgress * audioDuration)} / {formatTime(audioDuration)}</span>
                </div>
                <button
                  onClick={() => { cancelExportRef.current = true; setExporting(false); }}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Cancelar
                </button>
              </div>
            )}

            {exportUrl && (
              <div className="border border-green-800/50 bg-green-900/10 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-lg text-green-300">
                    Video pronto
                  </span>
                </div>

                <video
                  src={exportUrl}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxHeight: 400 }}
                />

                <div className="flex gap-4">
                  <a
                    href={exportUrl}
                    download={`${selectedScript.title.replace(/[^a-zA-Z0-9\u00C0-\u017F ]/g, "").replace(/ +/g, "-")}.webm`}
                    className="px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Descarregar .webm
                  </a>

                  <button
                    onClick={() => {
                      setApproved(false);
                      setExportUrl(null);
                      setStep(3);
                    }}
                    className="px-4 py-3 bg-[#2a2a4a] text-[#a0a0b0] rounded-lg text-sm hover:bg-[#3a3a5a] transition-colors"
                  >
                    Refazer
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(3)}
              className="text-sm text-[#666] hover:text-[#a0a0b0]"
            >
              Voltar para pre-visualizacao
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
