"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getAllCourses } from "@/data/courses";
import type { CourseData } from "@/types/course";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];
const DEFAULT_VOICE_ID = "fnoNuVpfClX7lHKFbyZ2";

type AudioStatus = "idle" | "generating" | "done" | "error";
type ImageStatus = "idle" | "generating" | "done" | "error";

type SubLessonStatus = {
  audioStatus: AudioStatus;
  audioUrl: string | null;
  audioError: string | null;
  imageStatus: ImageStatus;
  imageUrl: string | null;
  imageError: string | null;
};

function lessonKey(courseSlug: string, modNum: number, letter: string) {
  return `${courseSlug}-m${modNum}-${letter}`;
}

export default function CourseProductionPage() {
  const { user, profile } = useAuth();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [apiKey, setApiKey] = useState("");
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE_ID);
  const [modelo, setModelo] = useState<"v2" | "v3">("v2");
  const [comfyuiUrl, setComfyuiUrl] = useState("");
  const [loraName, setLoraName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [statuses, setStatuses] = useState<Record<string, SubLessonStatus>>({});
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const shouldStop = useRef(false);

  const courses = getAllCourses();
  const course = courses.find((c) => c.slug === selectedCourse) || null;

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mundo-bg">
        <p className="text-mundo-muted">Acesso restrito.</p>
      </div>
    );
  }

  function getStatus(key: string): SubLessonStatus {
    return (
      statuses[key] || {
        audioStatus: "idle",
        audioUrl: null,
        audioError: null,
        imageStatus: "idle",
        imageUrl: null,
        imageError: null,
      }
    );
  }

  function updateStatus(key: string, patch: Partial<SubLessonStatus>) {
    setStatuses((prev) => ({
      ...prev,
      [key]: { ...getStatus(key), ...patch },
    }));
  }

  async function generateAudio(
    courseSlug: string,
    modNum: number,
    letter: string,
    script: string
  ) {
    const key = lessonKey(courseSlug, modNum, letter);
    if (!apiKey.trim()) return;

    updateStatus(key, { audioStatus: "generating", audioError: null });

    try {
      const res = await fetch("/api/admin/courses/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script,
          courseSlug,
          moduleNum: modNum,
          subLetter: letter,
          voiceId: voiceId.trim(),
          apiKey: apiKey.trim(),
          model: modelo,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ erro: `HTTP ${res.status}` }));
        throw new Error(data.erro || `Erro ${res.status}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("audio/")) {
        // Direct download (no Supabase)
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

  async function generateImage(
    courseSlug: string,
    modNum: number,
    letter: string,
    prompt: string
  ) {
    const key = lessonKey(courseSlug, modNum, letter);
    if (!comfyuiUrl.trim()) return;

    updateStatus(key, { imageStatus: "generating", imageError: null });

    try {
      const { buildLandscapeWorkflow } = await import(
        "@/lib/comfyui-workflows"
      );
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
          courseSlug,
          moduleNum: modNum,
          assetType: "landscape",
          filename: `landscape-m${modNum}-${letter.toLowerCase()}.png`,
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

  async function batchGenerateAudio(c: CourseData) {
    if (!apiKey.trim()) {
      alert("Coloca a API key do ElevenLabs.");
      return;
    }

    shouldStop.current = false;
    setBatchRunning(true);

    const allLessons: { mod: number; letter: string; title: string; desc: string }[] = [];
    for (const mod of c.modules) {
      for (const sub of mod.subLessons) {
        allLessons.push({
          mod: mod.number,
          letter: sub.letter,
          title: sub.title,
          desc: sub.description,
        });
      }
    }

    setBatchProgress({ current: 0, total: allLessons.length });

    for (let i = 0; i < allLessons.length; i++) {
      if (shouldStop.current) break;
      setBatchProgress({ current: i + 1, total: allLessons.length });

      const lesson = allLessons[i];
      const key = lessonKey(c.slug, lesson.mod, lesson.letter);
      const status = getStatus(key);

      if (status.audioStatus === "done") continue;

      // Use description as placeholder script (the other branch generates full scripts)
      const script = `${lesson.title}. ${lesson.desc}`;
      await generateAudio(c.slug, lesson.mod, lesson.letter, script);

      if (i < allLessons.length - 1) {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    setBatchRunning(false);
    setBatchProgress({ current: 0, total: 0 });
  }

  const audioCount = course
    ? Object.keys(statuses).filter(
        (k) => k.startsWith(course.slug) && statuses[k]?.audioStatus === "done"
      ).length
    : 0;
  const totalLessons = course
    ? course.modules.reduce((a, m) => a + m.subLessons.length, 0)
    : 0;

  return (
    <div className="min-h-screen bg-mundo-bg text-mundo-creme-suave p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl text-white mb-2">
          Producao de Cursos
        </h1>
        <p className="text-mundo-muted text-sm mb-8">
          Pipeline: scripts → audio (ElevenLabs) → imagens (ThinkDiffusion) → Supabase
        </p>

        {/* Config section */}
        <div className="bg-mundo-bg-surface rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-white font-sans font-medium mb-4">Configuracao</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-mundo-muted mb-1">
                ElevenLabs API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-mundo-bg border border-mundo-border rounded px-3 py-2 text-sm text-white"
                placeholder="xi-..."
              />
            </div>
            <div>
              <label className="block text-xs text-mundo-muted mb-1">
                Voice ID
              </label>
              <input
                type="text"
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                className="w-full bg-mundo-bg border border-mundo-border rounded px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-mundo-muted mb-1">
                Modelo ElevenLabs
              </label>
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
                ComfyUI URL (ThinkDiffusion)
              </label>
              <input
                type="text"
                value={comfyuiUrl}
                onChange={(e) => setComfyuiUrl(e.target.value)}
                className="w-full bg-mundo-bg border border-mundo-border rounded px-3 py-2 text-sm text-white"
                placeholder="https://your-instance.thinkdiffusion.com"
              />
            </div>
            <div>
              <label className="block text-xs text-mundo-muted mb-1">
                LoRA Model Name (opcional)
              </label>
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

        {/* Course selector */}
        <div className="mb-8">
          <label className="block text-sm text-mundo-muted mb-2">
            Selecciona o curso
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-mundo-bg-surface border border-mundo-border rounded px-4 py-3 text-white w-full max-w-md"
          >
            <option value="">-- Escolhe um curso --</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.number}. {c.title} — {c.subtitle}
              </option>
            ))}
          </select>
        </div>

        {/* Course production panel */}
        {course && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl text-white">
                  {course.title}
                </h2>
                <p className="text-mundo-dourado text-sm">{course.subtitle}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-mundo-muted">
                  Audio: {audioCount}/{totalLessons}
                </span>
                {batchRunning ? (
                  <button
                    onClick={() => {
                      shouldStop.current = true;
                    }}
                    className="bg-red-600/80 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
                  >
                    Parar ({batchProgress.current}/{batchProgress.total})
                  </button>
                ) : (
                  <button
                    onClick={() => batchGenerateAudio(course)}
                    disabled={!apiKey.trim()}
                    className="bg-mundo-violeta text-white px-4 py-2 rounded text-sm hover:bg-mundo-violeta/80 disabled:opacity-40"
                  >
                    Gerar todos os audios
                  </button>
                )}
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-4">
              {course.modules.map((mod) => (
                <details
                  key={mod.number}
                  className="bg-mundo-bg-surface rounded-xl overflow-hidden group"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <span className="text-mundo-violeta font-mono text-sm w-8">
                        {String(mod.number).padStart(2, "0")}
                      </span>
                      <span className="text-white">{mod.title}</span>
                      {mod.isFree && (
                        <span className="text-xs bg-[#C9A96E]/20 text-mundo-dourado px-2 py-0.5 rounded">
                          Gratuito
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-mundo-muted">
                        {mod.subLessons.length} sub-aulas
                      </span>
                      <span className="text-mundo-muted group-open:rotate-180 transition-transform">
                        &#9662;
                      </span>
                    </div>
                  </summary>
                  <div className="px-6 pb-4 border-t border-[#1a1a2e] space-y-3 pt-4">
                    {mod.subLessons.map((sub) => {
                      const key = lessonKey(course.slug, mod.number, sub.letter);
                      const st = getStatus(key);
                      return (
                        <div
                          key={sub.letter}
                          className="flex items-start gap-4 bg-mundo-bg rounded-lg p-4"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-mundo-violeta font-mono text-sm">
                                {sub.letter})
                              </span>
                              <span className="text-white text-sm">
                                {sub.title}
                              </span>
                            </div>
                            <p className="text-xs text-mundo-muted truncate">
                              {sub.description}
                            </p>
                            {st.audioError && (
                              <p className="text-xs text-red-400 mt-1">
                                {st.audioError}
                              </p>
                            )}
                            {st.audioUrl && (
                              <audio
                                controls
                                src={st.audioUrl}
                                className="mt-2 h-8 w-full max-w-xs"
                              />
                            )}
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() =>
                                generateAudio(
                                  course.slug,
                                  mod.number,
                                  sub.letter,
                                  `${sub.title}. ${sub.description}`
                                )
                              }
                              disabled={
                                !apiKey.trim() ||
                                st.audioStatus === "generating"
                              }
                              className={`text-xs px-3 py-1.5 rounded ${
                                st.audioStatus === "done"
                                  ? "bg-green-800/40 text-green-300"
                                  : st.audioStatus === "generating"
                                  ? "bg-yellow-800/40 text-yellow-300 animate-pulse"
                                  : st.audioStatus === "error"
                                  ? "bg-red-800/40 text-red-300"
                                  : "bg-[#3a3a5c] text-mundo-muted hover:bg-[#4a4a6c]"
                              }`}
                            >
                              {st.audioStatus === "generating"
                                ? "A gerar..."
                                : st.audioStatus === "done"
                                ? "Audio OK"
                                : st.audioStatus === "error"
                                ? "Tentar de novo"
                                : "Gerar audio"}
                            </button>
                            <button
                              onClick={() =>
                                generateImage(
                                  course.slug,
                                  mod.number,
                                  sub.letter,
                                  sub.description
                                )
                              }
                              disabled={
                                !comfyuiUrl.trim() ||
                                st.imageStatus === "generating"
                              }
                              className={`text-xs px-3 py-1.5 rounded ${
                                st.imageStatus === "done"
                                  ? "bg-green-800/40 text-green-300"
                                  : st.imageStatus === "generating"
                                  ? "bg-yellow-800/40 text-yellow-300 animate-pulse"
                                  : st.imageStatus === "error"
                                  ? "bg-red-800/40 text-red-300"
                                  : "bg-[#3a3a5c] text-mundo-muted hover:bg-[#4a4a6c]"
                              }`}
                            >
                              {st.imageStatus === "generating"
                                ? "A gerar..."
                                : st.imageStatus === "done"
                                ? "Imagem OK"
                                : st.imageStatus === "error"
                                ? "Tentar de novo"
                                : "Gerar imagem"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
