"use client";

import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getAllCourses } from "@/data/courses";
import {
  getScriptsForCourse,
  getFullNarration,
  getTotalDuration,
  YOUTUBE_SCRIPTS,
} from "@/data/youtube-scripts";
import type { YouTubeScript } from "@/data/youtube-scripts";
import type { ComposerScene } from "@/components/VideoComposer";
import VideoComposer from "@/components/VideoComposer";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];
const DEFAULT_VOICE_ID = "fnoNuVpfClX7lHKFbyZ2";

type Tab = "scripts" | "montar" | "narracoes";

export default function YouTubePage() {
  const { user, profile } = useAuth();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [activeTab, setActiveTab] = useState<Tab>("scripts");
  const [selectedCourse, setSelectedCourse] = useState("ouro-proprio");
  const [selectedScript, setSelectedScript] = useState<YouTubeScript | null>(
    null
  );

  // ElevenLabs config
  const [apiKey, setApiKey] = useState("");
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE_ID);
  const [audioGenerating, setAudioGenerating] = useState(false);
  const [audioError, setAudioError] = useState("");

  // Montagem state
  const [composerScenes, setComposerScenes] = useState<ComposerScene[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState("");
  const audioInputRef = useRef<HTMLInputElement>(null);

  const courses = getAllCourses();
  const scripts = getScriptsForCourse(selectedCourse);

  const selectScript = useCallback((script: YouTubeScript) => {
    setSelectedScript(script);
    setComposerScenes(
      script.scenes.map((s) => ({
        ...s,
        imageUrl: null,
        approved: false,
      }))
    );
  }, []);

  function toggleApproval(idx: number) {
    setComposerScenes((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, approved: !s.approved } : s))
    );
  }

  function approveAll() {
    setComposerScenes((prev) => prev.map((s) => ({ ...s, approved: true })));
  }

  const allApproved = composerScenes.length > 0 && composerScenes.every((s) => s.approved);
  const approvedCount = composerScenes.filter((s) => s.approved).length;

  function handleAudioUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFileName(file.name);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  }

  function handleImageUpload(sceneIdx: number, file: File) {
    const url = URL.createObjectURL(file);
    setComposerScenes((prev) =>
      prev.map((s, i) => (i === sceneIdx ? { ...s, imageUrl: url } : s))
    );
  }

  function handleImageDrop(sceneIdx: number, e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(sceneIdx, file);
    }
  }

  function copyNarration() {
    if (!selectedScript) return;
    const text = getFullNarration(selectedScript);
    navigator.clipboard.writeText(text);
  }

  async function generateAudio() {
    if (!selectedScript || !apiKey) return;
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
          voiceId,
          apiKey,
          model: "v2",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.erro || `Erro ${res.status}`);
      }

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.includes("audio/")) {
        // Direct audio download (no Supabase service key)
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setAudioFileName(`${selectedScript.courseSlug}-hook-${selectedScript.hookIndex}.mp3`);
      } else {
        // JSON response with Supabase URL
        const data = await res.json();
        setAudioUrl(data.url);
        setAudioFileName(`${selectedScript.courseSlug}-hook-${selectedScript.hookIndex}.mp3`);
      }
    } catch (err) {
      setAudioError(err instanceof Error ? err.message : "Erro ao gerar audio");
    } finally {
      setAudioGenerating(false);
    }
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1a2e]">
        <p className="text-[#a0a0b0]">Acesso restrito.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#F5F0E6]">
      {/* Header */}
      <div className="border-b border-[#2a2a4a] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[#a0a0b0] hover:text-[#F5F0E6] text-sm transition-colors"
            >
              HUB
            </Link>
            <span className="text-[#3a3a5a]">/</span>
            <h1 className="text-lg font-medium text-[#C9A96E]">
              Videos YouTube
            </h1>
          </div>

          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedScript(null);
            }}
            className="bg-[#2a2a4a] text-[#F5F0E6] text-sm rounded-lg px-3 py-2 border border-[#3a3a5a]"
          >
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.number}. {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#2a2a4a] px-6">
        <div className="max-w-7xl mx-auto flex gap-1">
          {(
            [
              { id: "scripts" as Tab, label: "Scripts" },
              { id: "montar" as Tab, label: "Montar Video" },
              { id: "narracoes" as Tab, label: "Narracoes (copiar)" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#C9A96E] text-[#C9A96E]"
                  : "border-transparent text-[#a0a0b0] hover:text-[#F5F0E6]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ── TAB: Scripts ──────────────────────────────────────────── */}
        {activeTab === "scripts" && (
          <div className="space-y-6">
            {scripts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#a0a0b0] text-lg">
                  Ainda nao ha scripts para este curso.
                </p>
                <p className="text-[#666] text-sm mt-2">
                  Scripts disponiveis: Ouro Proprio (3 hooks)
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {scripts.map((script, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-xl p-6 transition-colors cursor-pointer ${
                      selectedScript === script
                        ? "border-[#C9A96E] bg-[#C9A96E]/5"
                        : "border-[#2a2a4a] hover:border-[#3a3a5a]"
                    }`}
                    onClick={() => selectScript(script)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[#F5F0E6] font-medium">
                          Hook {idx + 1}: {script.title}
                        </h3>
                        <p className="text-[#a0a0b0] text-sm mt-1">
                          {script.durationMin} min —{" "}
                          {script.scenes.length} cenas —{" "}
                          {getTotalDuration(script)}s total
                        </p>
                      </div>
                      {selectedScript === script && (
                        <span className="text-[#C9A96E] text-xs bg-[#C9A96E]/10 px-2 py-1 rounded">
                          Seleccionado
                        </span>
                      )}
                    </div>

                    {selectedScript === script && (
                      <div className="mt-6 space-y-4">
                        {script.scenes.map((scene, sIdx) => (
                          <div
                            key={sIdx}
                            className="border-l-2 border-[#3a3a5a] pl-4"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-[#666] uppercase font-mono w-24">
                                {scene.type}
                              </span>
                              <span className="text-xs text-[#a0a0b0]">
                                {scene.durationSec}s
                              </span>
                            </div>

                            {scene.narration && (
                              <p className="text-sm text-[#d0d0d0] mt-2 whitespace-pre-line leading-relaxed">
                                {scene.narration}
                              </p>
                            )}

                            {scene.overlayText && (
                              <p className="text-xs text-[#C9A96E] mt-2 italic">
                                Texto no ecra: {scene.overlayText.replace(/\n/g, " / ")}
                              </p>
                            )}

                            <p className="text-xs text-[#666] mt-1">
                              Visual: {scene.visualNote}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Montar Video ─────────────────────────────────────── */}
        {activeTab === "montar" && (
          <div className="space-y-8">
            {!selectedScript ? (
              <div className="text-center py-16">
                <p className="text-[#a0a0b0] text-lg">
                  Selecciona um script primeiro.
                </p>
                <button
                  onClick={() => setActiveTab("scripts")}
                  className="text-[#C9A96E] text-sm mt-2 underline"
                >
                  Ir para Scripts
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg text-[#C9A96E]">
                    {selectedScript.title}
                  </h2>
                  <span className="text-sm text-[#a0a0b0]">
                    {composerScenes.filter((s) => s.imageUrl).length}/
                    {composerScenes.length} imagens
                  </span>
                </div>

                {/* Audio — generate or upload */}
                <div className="bg-[#2a2a4a]/50 rounded-xl p-5 border border-[#3a3a5a]">
                  <h3 className="text-sm font-medium text-[#C9A96E] mb-4">
                    Audio
                  </h3>

                  {/* ElevenLabs config */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="block text-xs text-[#666] mb-1">
                        ElevenLabs API Key
                      </label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk_..."
                        className="w-full bg-[#1a1a2e] text-[#F5F0E6] text-sm rounded-lg px-3 py-2 border border-[#3a3a5a] outline-none focus:border-[#C9A96E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#666] mb-1">
                        Voice ID
                      </label>
                      <input
                        type="text"
                        value={voiceId}
                        onChange={(e) => setVoiceId(e.target.value)}
                        className="w-full bg-[#1a1a2e] text-[#F5F0E6] text-sm rounded-lg px-3 py-2 border border-[#3a3a5a] outline-none focus:border-[#C9A96E]"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <button
                        onClick={generateAudio}
                        disabled={!apiKey || audioGenerating}
                        className="px-4 py-2 bg-[#D4A853] text-[#1A1A2E] rounded-lg text-sm font-medium hover:bg-[#C9A96E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        {audioGenerating ? "A gerar..." : "Gerar Audio"}
                      </button>
                    </div>
                  </div>

                  {audioError && (
                    <div className="mb-3 text-sm text-red-400 bg-red-900/20 rounded-lg px-3 py-2">
                      {audioError}
                    </div>
                  )}

                  {/* Or upload manually */}
                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                  />

                  <div className="flex items-center gap-4 border-t border-[#3a3a5a] pt-3">
                    <button
                      onClick={() => audioInputRef.current?.click()}
                      className="px-3 py-1.5 bg-[#3a3a5a] text-[#a0a0b0] rounded text-xs hover:bg-[#4a4a6a] transition-colors"
                    >
                      {audioUrl ? "Trocar ficheiro" : "Ou carregar MP3"}
                    </button>

                    {audioFileName && (
                      <span className="text-sm text-[#a0a0b0]">
                        {audioFileName}
                      </span>
                    )}

                    {audioUrl && (
                      <audio
                        src={audioUrl}
                        controls
                        className="h-8"
                        style={{ maxWidth: 300 }}
                      />
                    )}
                  </div>
                </div>

                {/* Scene images + approval */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-[#C9A96E]">
                        Cenas — imagem + aprovacao
                      </h3>
                      <p className="text-xs text-[#666] mt-1">
                        Arrasta imagens, pre-visualiza, e aprova cada cena antes
                        de gerar o video.{" "}
                        <Link
                          href="/admin/cursos/territorios"
                          className="text-[#8B5CF6] underline"
                        >
                          Territorios
                        </Link>{" "}
                        ou qualquer imagem (ChatGPT, Midjourney, etc). Cenas sem
                        imagem usam fundo escuro.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-[#a0a0b0]">
                        {approvedCount}/{composerScenes.length} aprovadas
                      </span>
                      {!allApproved && (
                        <button
                          onClick={approveAll}
                          className="px-3 py-1 bg-[#3a3a5a] text-[#a0a0b0] rounded text-xs hover:bg-[#4a4a6a] transition-colors"
                        >
                          Aprovar todas
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {composerScenes.map((scene, idx) => (
                      <div
                        key={idx}
                        className={`border rounded-lg overflow-hidden transition-all ${
                          scene.approved
                            ? "border-green-600/60 ring-1 ring-green-600/20"
                            : scene.imageUrl
                              ? "border-[#C9A96E]/50"
                              : "border-[#3a3a5a] border-dashed"
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleImageDrop(idx, e)}
                      >
                        {/* Image area */}
                        <div
                          className="aspect-video bg-[#1A1A2E] flex items-center justify-center cursor-pointer relative group"
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement)
                                .files?.[0];
                              if (file) handleImageUpload(idx, file);
                            };
                            input.click();
                          }}
                        >
                          {scene.imageUrl ? (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={scene.imageUrl}
                                alt={`Cena ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs">
                                  Trocar imagem
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-2">
                              <div className="text-2xl text-[#3a3a5a] mb-1">
                                +
                              </div>
                              <p className="text-[10px] text-[#666]">
                                Arrasta ou clica
                              </p>
                            </div>
                          )}

                          {/* Approved badge */}
                          {scene.approved && (
                            <div className="absolute top-2 right-2 bg-green-700/90 text-white text-[10px] px-2 py-0.5 rounded-full">
                              Aprovada
                            </div>
                          )}
                        </div>

                        {/* Scene info + overlay text preview */}
                        <div className="p-2 bg-[#2a2a4a]/50">
                          <p className="text-[10px] text-[#666] uppercase font-mono">
                            {idx + 1}. {scene.type} — {scene.durationSec}s
                          </p>
                          {scene.overlayText ? (
                            <p className="text-xs text-[#C9A96E] mt-1 leading-snug whitespace-pre-line line-clamp-2">
                              {scene.overlayText}
                            </p>
                          ) : (
                            <p className="text-xs text-[#a0a0b0] mt-1 truncate">
                              {scene.visualNote.substring(0, 50)}...
                            </p>
                          )}
                        </div>

                        {/* Approve/reject button */}
                        <div className="border-t border-[#3a3a5a]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleApproval(idx);
                            }}
                            className={`w-full py-2 text-xs font-medium transition-colors ${
                              scene.approved
                                ? "bg-green-900/30 text-green-400 hover:bg-red-900/20 hover:text-red-400"
                                : "bg-[#2a2a4a]/30 text-[#a0a0b0] hover:bg-green-900/20 hover:text-green-400"
                            }`}
                          >
                            {scene.approved ? "Aprovada — clicar para revogar" : "Aprovar cena"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Composer — only when all approved */}
                <div className="bg-[#2a2a4a]/30 rounded-xl p-6 border border-[#3a3a5a]">
                  {!allApproved ? (
                    <div className="text-center py-8">
                      <p className="text-[#a0a0b0]">
                        Aprova todas as {composerScenes.length} cenas para
                        desbloquear o gerador de video.
                      </p>
                      <p className="text-xs text-[#666] mt-2">
                        {approvedCount} de {composerScenes.length} aprovadas
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs text-green-400">
                          Todas as cenas aprovadas
                        </span>
                      </div>
                      <VideoComposer
                        scenes={composerScenes}
                        audioUrl={audioUrl}
                        title={selectedScript.title}
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── TAB: Narracoes ────────────────────────────────────────── */}
        {activeTab === "narracoes" && (
          <div className="space-y-6">
            <p className="text-sm text-[#a0a0b0]">
              Texto completo de narracao. Podes gerar audio directamente na tab
              &quot;Montar Video&quot; ou copiar e colar manualmente no
              ElevenLabs.
            </p>

            {scripts.length === 0 ? (
              <p className="text-[#666]">Sem scripts para este curso.</p>
            ) : (
              scripts.map((script, idx) => (
                <div
                  key={idx}
                  className="border border-[#2a2a4a] rounded-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-5 py-3 bg-[#2a2a4a]/50">
                    <h3 className="text-sm font-medium text-[#F5F0E6]">
                      Hook {idx + 1}: {script.title}
                    </h3>
                    <button
                      onClick={() => {
                        const text = getFullNarration(script);
                        navigator.clipboard.writeText(text);
                      }}
                      className="px-3 py-1 bg-[#C9A96E]/20 text-[#C9A96E] rounded text-xs hover:bg-[#C9A96E]/30 transition-colors"
                    >
                      Copiar tudo
                    </button>
                  </div>
                  <div className="p-5">
                    <pre className="text-sm text-[#d0d0d0] whitespace-pre-wrap leading-relaxed font-serif">
                      {getFullNarration(script)}
                    </pre>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
