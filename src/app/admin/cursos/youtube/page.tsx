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
      }))
    );
  }, []);

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

                {/* Audio upload */}
                <div className="bg-[#2a2a4a]/50 rounded-xl p-5 border border-[#3a3a5a]">
                  <h3 className="text-sm font-medium text-[#C9A96E] mb-3">
                    Audio (MP3 do ElevenLabs)
                  </h3>

                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                  />

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => audioInputRef.current?.click()}
                      className="px-4 py-2 bg-[#3a3a5a] text-[#F5F0E6] rounded-lg text-sm hover:bg-[#4a4a6a] transition-colors"
                    >
                      {audioUrl ? "Trocar audio" : "Carregar audio"}
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

                {/* Scene images */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[#C9A96E]">
                    Imagens por cena (arrasta ou clica)
                  </h3>
                  <p className="text-xs text-[#666]">
                    Cenas sem imagem usam fundo escuro (#1A1A2E). Gera imagens
                    em{" "}
                    <Link
                      href="/admin/cursos/territorios"
                      className="text-[#8B5CF6] underline"
                    >
                      Territorios
                    </Link>{" "}
                    ou usa qualquer imagem (ChatGPT, Midjourney, etc).
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {composerScenes.map((scene, idx) => (
                      <div
                        key={idx}
                        className={`border rounded-lg overflow-hidden transition-colors ${
                          scene.imageUrl
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
                                  Trocar
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
                        </div>

                        {/* Scene info */}
                        <div className="p-2 bg-[#2a2a4a]/50">
                          <p className="text-[10px] text-[#666] uppercase font-mono">
                            {idx + 1}. {scene.type}
                          </p>
                          <p className="text-xs text-[#a0a0b0] truncate mt-0.5">
                            {scene.overlayText
                              ? scene.overlayText.split("\n")[0]
                              : scene.visualNote.substring(0, 40) + "..."}
                          </p>
                          <p className="text-[10px] text-[#666] mt-0.5">
                            {scene.durationSec}s
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Composer */}
                <div className="bg-[#2a2a4a]/30 rounded-xl p-6 border border-[#3a3a5a]">
                  <VideoComposer
                    scenes={composerScenes}
                    audioUrl={audioUrl}
                    title={selectedScript.title}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* ── TAB: Narracoes ────────────────────────────────────────── */}
        {activeTab === "narracoes" && (
          <div className="space-y-6">
            <p className="text-sm text-[#a0a0b0]">
              Copia o texto de narracao para colar no ElevenLabs. Cada script e
              a narracao completa — gera um unico ficheiro de audio por hook.
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
