"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getAllCourses } from "@/data/courses";
import {
  getScriptsForCourse,
  getFullNarration,
} from "@/data/youtube-scripts";
import type { YouTubeScript } from "@/data/youtube-scripts";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];
const DEFAULT_VOICE_ID = "fnoNuVpfClX7lHKFbyZ2";

type AudioStatus = "idle" | "generating" | "done" | "error";
type ImageStatus = "idle" | "generating" | "done" | "error";

type SceneStatus = {
  audioStatus: AudioStatus;
  audioUrl: string | null;
  audioError: string | null;
  imageStatus: ImageStatus;
  imageUrl: string | null;
  imageError: string | null;
  editedNarration: string | null;
};

function sceneKey(courseSlug: string, hookIndex: number, sceneIndex: number) {
  return `${courseSlug}-hook${hookIndex}-scene${sceneIndex}`;
}

export default function YouTubePage() {
  const { user, profile } = useAuth();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  // Config
  const [apiKey, setApiKey] = useState("");
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE_ID);
  const [modelo, setModelo] = useState<"v2" | "v3">("v2");
  const [speed, setSpeed] = useState(0.9);
  const [comfyuiUrl, setComfyuiUrl] = useState("");
  const [loraName, setLoraName] = useState("");

  // Selection
  const [selectedCourse, setSelectedCourse] = useState("");

  // Per-scene statuses
  const [statuses, setStatuses] = useState<Record<string, SceneStatus>>({});

  // Batch
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const shouldStop = useRef(false);

  // Full narration editing per hook
  const [fullNarrations, setFullNarrations] = useState<Record<string, string>>({});

  const courses = getAllCourses();
  const hooks = selectedCourse ? getScriptsForCourse(selectedCourse) : [];

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mundo-bg">
        <p className="text-mundo-muted">Acesso restrito.</p>
      </div>
    );
  }

  function getStatus(key: string): SceneStatus {
    return (
      statuses[key] || {
        audioStatus: "idle",
        audioUrl: null,
        audioError: null,
        imageStatus: "idle",
        imageUrl: null,
        imageError: null,
        editedNarration: null,
      }
    );
  }

  function updateStatus(key: string, patch: Partial<SceneStatus>) {
    setStatuses((prev) => ({
      ...prev,
      [key]: { ...getStatus(key), ...patch },
    }));
  }

  function getFullNarrationKey(hook: YouTubeScript) {
    return `${hook.courseSlug}-hook${hook.hookIndex}`;
  }

  function getEditableNarration(hook: YouTubeScript) {
    const key = getFullNarrationKey(hook);
    return fullNarrations[key] ?? getFullNarration(hook);
  }

  function setEditableNarration(hook: YouTubeScript, value: string) {
    const key = getFullNarrationKey(hook);
    setFullNarrations((prev) => ({ ...prev, [key]: value }));
  }

  // ── Audio generation ──────────────────────────────────────────────

  async function generateHookAudio(hook: YouTubeScript) {
    const narration = getEditableNarration(hook);
    const key = `${hook.courseSlug}-hook${hook.hookIndex}-full`;

    updateStatus(key, { audioStatus: "generating", audioError: null });

    try {
      const body: Record<string, unknown> = {
        script: narration,
        courseSlug: hook.courseSlug,
        moduleNum: 0,
        subLetter: `yt-hook-${hook.hookIndex}`,
        model: modelo,
        speed,
      };
      if (apiKey.trim()) body.apiKey = apiKey.trim();
      if (voiceId.trim()) body.voiceId = voiceId.trim();

      const res = await fetch("/api/admin/courses/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ erro: `HTTP ${res.status}` }));
        throw new Error(data.erro || `Erro ${res.status}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("audio/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        updateStatus(key, { audioStatus: "done", audioUrl: url });
      } else {
        const data = await res.json();
        updateStatus(key, { audioStatus: "done", audioUrl: data.url });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      updateStatus(key, { audioStatus: "error", audioError: msg });
    }
  }

  // ── Image generation per scene ────────────────────────────────────

  async function generateSceneImage(
    hook: YouTubeScript,
    sceneIdx: number
  ) {
    const scene = hook.scenes[sceneIdx];
    if (!scene) return;
    const key = sceneKey(hook.courseSlug, hook.hookIndex, sceneIdx);
    if (!comfyuiUrl.trim()) return;

    updateStatus(key, { imageStatus: "generating", imageError: null });

    try {
      const { buildLandscapeWorkflow } = await import("@/lib/comfyui-workflows");
      const prompt = `${scene.visualNote}. Style: dark atmospheric, pre-dawn sky #1A1A2E, terracotta silhouette, gold accents, cinematic, School of Life aesthetic`;
      const workflow = buildLandscapeWorkflow({
        prompt,
        loraName: loraName || undefined,
      });

      const res = await fetch("/api/admin/courses/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comfyuiUrl: comfyuiUrl.trim(),
          workflow,
          courseSlug: hook.courseSlug,
          moduleNum: 0,
          assetType: "youtube",
          filename: `yt-hook${hook.hookIndex}-scene${sceneIdx}.png`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ erro: `HTTP ${res.status}` }));
        throw new Error(data.erro || `Erro ${res.status}`);
      }

      const data = await res.json();
      updateStatus(key, { imageStatus: "done", imageUrl: data.url });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      updateStatus(key, { imageStatus: "error", imageError: msg });
    }
  }

  // ── Batch: all images for a hook ──────────────────────────────────

  async function batchGenerateImages(hook: YouTubeScript) {
    if (!comfyuiUrl.trim()) {
      alert("Coloca o URL do ComfyUI (ThinkDiffusion).");
      return;
    }

    shouldStop.current = false;
    setBatchRunning(true);
    setBatchProgress({ current: 0, total: hook.scenes.length });

    for (let i = 0; i < hook.scenes.length; i++) {
      if (shouldStop.current) break;
      setBatchProgress({ current: i + 1, total: hook.scenes.length });

      const key = sceneKey(hook.courseSlug, hook.hookIndex, i);
      const st = getStatus(key);
      if (st.imageStatus === "done") continue;

      await generateSceneImage(hook, i);

      if (i < hook.scenes.length - 1) {
        await new Promise((r) => setTimeout(r, 3000));
      }
    }

    setBatchRunning(false);
    setBatchProgress({ current: 0, total: 0 });
  }

  // ── Upload handler ────────────────────────────────────────────────

  function handleImageUpload(hook: YouTubeScript, sceneIdx: number, file: File) {
    const url = URL.createObjectURL(file);
    const key = sceneKey(hook.courseSlug, hook.hookIndex, sceneIdx);
    updateStatus(key, { imageStatus: "done", imageUrl: url });
  }

  function handleAudioUpload(hook: YouTubeScript, file: File) {
    const url = URL.createObjectURL(file);
    const key = `${hook.courseSlug}-hook${hook.hookIndex}-full`;
    updateStatus(key, { audioStatus: "done", audioUrl: url });
  }

  // ── Counts ────────────────────────────────────────────────────────

  function getHookImageCount(hook: YouTubeScript) {
    return hook.scenes.filter((_, i) => {
      const key = sceneKey(hook.courseSlug, hook.hookIndex, i);
      return statuses[key]?.imageStatus === "done";
    }).length;
  }

  // ── Render ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-mundo-bg text-mundo-creme-suave p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin" className="text-mundo-muted hover:text-mundo-creme text-sm">
            HUB
          </Link>
          <span className="text-mundo-border">/</span>
          <h1 className="font-serif text-3xl text-white">
            Videos YouTube
          </h1>
        </div>
        <p className="text-mundo-muted text-sm mb-8">
          Pipeline: scripts → audio (ElevenLabs) → imagens (ThinkDiffusion) → montagem (CapCut/DaVinci)
        </p>

        {/* ── Config ─────────────────────────────────────────── */}
        <div className="bg-mundo-bg-surface rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-white font-sans font-medium mb-4">Configuracao</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-mundo-muted mb-1">ElevenLabs API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-mundo-bg border border-mundo-border rounded px-3 py-2 text-sm text-white"
                placeholder="xi-... (deixa vazio para usar env var do Vercel)"
              />
            </div>
            <div>
              <label className="block text-xs text-mundo-muted mb-1">Voice ID</label>
              <input
                type="text"
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                className="w-full bg-mundo-bg border border-mundo-border rounded px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-mundo-muted mb-1">Modelo ElevenLabs</label>
              <select
                value={modelo}
                onChange={(e) => setModelo(e.target.value as "v2" | "v3")}
                className="w-full bg-mundo-bg border border-mundo-border rounded px-3 py-2 text-sm text-white"
              >
                <option value="v2">Multilingual v2</option>
                <option value="v3">Eleven v3</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-mundo-muted mb-1">
                Velocidade: {speed.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-mundo-dourado"
              />
            </div>
            <div>
              <label className="block text-xs text-mundo-muted mb-1">ComfyUI URL (ThinkDiffusion)</label>
              <input
                type="text"
                value={comfyuiUrl}
                onChange={(e) => setComfyuiUrl(e.target.value)}
                className="w-full bg-mundo-bg border border-mundo-border rounded px-3 py-2 text-sm text-white"
                placeholder="https://your-instance.thinkdiffusion.com"
              />
            </div>
            <div>
              <label className="block text-xs text-mundo-muted mb-1">LoRA Model Name (opcional)</label>
              <input
                type="text"
                value={loraName}
                onChange={(e) => setLoraName(e.target.value)}
                className="w-full bg-mundo-bg border border-mundo-border rounded px-3 py-2 text-sm text-white"
                placeholder="mundo-dos-veus-v1.safetensors"
              />
            </div>
          </div>
        </div>

        {/* ── Course selector ────────────────────────────────── */}
        <div className="mb-8">
          <label className="block text-sm text-mundo-muted mb-2">Selecciona o curso</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-mundo-bg-surface border border-mundo-border rounded px-4 py-3 text-white w-full max-w-md"
          >
            <option value="">-- Escolhe um curso --</option>
            {courses.map((c) => {
              const courseHooks = getScriptsForCourse(c.slug);
              return (
                <option key={c.slug} value={c.slug} disabled={courseHooks.length === 0}>
                  {c.number}. {c.title} — {courseHooks.length} hooks
                </option>
              );
            })}
          </select>
        </div>

        {/* ── Hooks list ─────────────────────────────────────── */}
        {hooks.length > 0 && (
          <div className="space-y-4">
            {hooks.map((hook) => {
              const audioKey = `${hook.courseSlug}-hook${hook.hookIndex}-full`;
              const audioSt = getStatus(audioKey);
              const imageCount = getHookImageCount(hook);

              return (
                <details
                  key={`${hook.courseSlug}-${hook.hookIndex}`}
                  className="bg-mundo-bg-surface rounded-xl overflow-hidden group"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <span className="text-mundo-violeta font-mono text-sm w-8">
                        H{hook.hookIndex + 1}
                      </span>
                      <div>
                        <span className="text-white">{hook.title}</span>
                        <span className="text-xs text-mundo-muted ml-3">
                          {hook.durationMin} min — {hook.scenes.length} cenas
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {audioSt.audioStatus === "done" && (
                        <span className="text-xs text-green-400">Audio OK</span>
                      )}
                      <span className="text-xs text-mundo-muted">
                        Imagens: {imageCount}/{hook.scenes.length}
                      </span>
                      <span className="text-mundo-muted group-open:rotate-180 transition-transform">
                        &#9662;
                      </span>
                    </div>
                  </summary>

                  <div className="px-6 pb-6 border-t border-mundo-bg space-y-6 pt-4">
                    {/* ── Full narration (editable) ── */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-mundo-muted uppercase">
                          Narracao completa — editavel
                        </p>
                        <button
                          onClick={() => setEditableNarration(hook, getFullNarration(hook))}
                          className="text-xs text-mundo-muted hover:text-mundo-creme"
                        >
                          Repor original
                        </button>
                      </div>
                      <textarea
                        value={getEditableNarration(hook)}
                        onChange={(e) => setEditableNarration(hook, e.target.value)}
                        className="w-full bg-mundo-bg border border-mundo-border rounded-lg px-4 py-3 text-sm text-mundo-creme-suave leading-relaxed resize-y min-h-32 max-h-64"
                        spellCheck={false}
                      />

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => generateHookAudio(hook)}
                          disabled={audioSt.audioStatus === "generating"}
                          className={`text-sm px-4 py-2 rounded ${
                            audioSt.audioStatus === "done"
                              ? "bg-green-800/40 text-green-300"
                              : audioSt.audioStatus === "generating"
                              ? "bg-yellow-800/40 text-yellow-300 animate-pulse"
                              : audioSt.audioStatus === "error"
                              ? "bg-red-800/40 text-red-300"
                              : "bg-mundo-dourado text-mundo-bg hover:bg-mundo-dourado-quente"
                          }`}
                        >
                          {audioSt.audioStatus === "generating"
                            ? "A gerar audio..."
                            : audioSt.audioStatus === "done"
                            ? "Regerar audio"
                            : audioSt.audioStatus === "error"
                            ? "Tentar de novo"
                            : "Gerar Audio (ElevenLabs)"}
                        </button>

                        <label className="text-sm px-4 py-2 bg-mundo-bg border border-mundo-border rounded text-mundo-muted cursor-pointer hover:text-mundo-creme">
                          Carregar MP3
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleAudioUpload(hook, f);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {audioSt.audioError && (
                        <p className="text-xs text-red-400 mt-2">{audioSt.audioError}</p>
                      )}
                      {audioSt.audioUrl && (
                        <audio controls src={audioSt.audioUrl} className="mt-3 h-10 w-full max-w-lg" />
                      )}
                    </div>

                    {/* ── Scenes with images ── */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-mundo-muted uppercase">
                          Cenas — imagens para cada momento
                        </p>
                        <div className="flex items-center gap-2">
                          {batchRunning ? (
                            <button
                              onClick={() => { shouldStop.current = true; }}
                              className="text-xs bg-red-600/80 text-white px-3 py-1.5 rounded hover:bg-red-600"
                            >
                              Parar ({batchProgress.current}/{batchProgress.total})
                            </button>
                          ) : (
                            <button
                              onClick={() => batchGenerateImages(hook)}
                              disabled={!comfyuiUrl.trim()}
                              className="text-xs bg-mundo-violeta text-white px-3 py-1.5 rounded hover:bg-mundo-violeta/80 disabled:opacity-40"
                            >
                              Gerar todas as imagens
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {hook.scenes.map((scene, idx) => {
                          const key = sceneKey(hook.courseSlug, hook.hookIndex, idx);
                          const st = getStatus(key);
                          return (
                            <div
                              key={idx}
                              className="flex gap-4 bg-mundo-bg rounded-lg p-4"
                            >
                              {/* Image preview / upload */}
                              <div
                                className="w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-mundo-border cursor-pointer relative group/img"
                                onClick={() => {
                                  const input = document.createElement("input");
                                  input.type = "file";
                                  input.accept = "image/*";
                                  input.onchange = (e) => {
                                    const f = (e.target as HTMLInputElement).files?.[0];
                                    if (f) handleImageUpload(hook, idx, f);
                                  };
                                  input.click();
                                }}
                              >
                                {st.imageUrl ? (
                                  <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={st.imageUrl} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                      <span className="text-white text-xs">Substituir</span>
                                    </div>
                                  </>
                                ) : (
                                  <div className="w-full h-full bg-mundo-bg-surface flex items-center justify-center">
                                    <span className="text-mundo-muted-dark text-2xl">+</span>
                                  </div>
                                )}
                              </div>

                              {/* Scene info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-mundo-violeta font-mono text-xs uppercase">
                                    {idx + 1}. {scene.type}
                                  </span>
                                  <span className="text-mundo-muted text-xs">
                                    ~{scene.durationSec}s
                                  </span>
                                </div>
                                {scene.overlayText && (
                                  <p className="text-sm text-white mb-1">
                                    &ldquo;{scene.overlayText}&rdquo;
                                  </p>
                                )}
                                {scene.narration && (
                                  <p className="text-xs text-mundo-muted-dark line-clamp-2">
                                    {scene.narration}
                                  </p>
                                )}
                                <p className="text-xs text-mundo-border mt-1 italic">
                                  {scene.visualNote}
                                </p>
                                {st.imageError && (
                                  <p className="text-xs text-red-400 mt-1">{st.imageError}</p>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex flex-col gap-2 shrink-0">
                                <button
                                  onClick={() => generateSceneImage(hook, idx)}
                                  disabled={!comfyuiUrl.trim() || st.imageStatus === "generating"}
                                  className={`text-xs px-3 py-1.5 rounded ${
                                    st.imageStatus === "done"
                                      ? "bg-green-800/40 text-green-300"
                                      : st.imageStatus === "generating"
                                      ? "bg-yellow-800/40 text-yellow-300 animate-pulse"
                                      : st.imageStatus === "error"
                                      ? "bg-red-800/40 text-red-300"
                                      : "bg-mundo-border text-mundo-muted hover:bg-mundo-bg-surface"
                                  }`}
                                >
                                  {st.imageStatus === "generating"
                                    ? "A gerar..."
                                    : st.imageStatus === "done"
                                    ? "Regerar"
                                    : st.imageStatus === "error"
                                    ? "Tentar de novo"
                                    : "Gerar imagem"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Download all ── */}
                    <div className="border-t border-mundo-bg pt-4">
                      <p className="text-xs text-mundo-muted mb-2">
                        Descarrega o audio e as imagens. Monta o video final no CapCut, DaVinci Resolve ou editor preferido.
                      </p>
                      <div className="flex gap-3">
                        {audioSt.audioUrl && (
                          <a
                            href={audioSt.audioUrl}
                            download={`${hook.courseSlug}-hook${hook.hookIndex + 1}.mp3`}
                            className="text-xs px-3 py-1.5 bg-mundo-dourado/20 text-mundo-dourado rounded hover:bg-mundo-dourado/30"
                          >
                            Descarregar audio
                          </a>
                        )}
                        {imageCount > 0 && (
                          <span className="text-xs text-mundo-muted py-1.5">
                            {imageCount} imagens prontas (clica em cada para descarregar)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        )}

        {selectedCourse && hooks.length === 0 && (
          <p className="text-mundo-muted text-sm">
            Este curso ainda nao tem hooks YouTube definidos.
          </p>
        )}
      </div>
    </div>
  );
}
