"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { parseBlob } from "music-metadata-browser";
import {
  ALL_ALBUMS,
  getAlbumsByProduct,
  ENERGY_LABELS,
  FLAVOR_LABELS,
  type Album,
  type AlbumTrack,
  type TrackEnergy,
  type TrackFlavor,
} from "@/data/albums";
import { getAlbumCover } from "@/lib/album-covers";

/** Read ID3 title from an MP3 File */
async function readId3Title(file: File): Promise<string | null> {
  try {
    const metadata = await parseBlob(file);
    return metadata.common.title || null;
  } catch {
    return null;
  }
}

/** Save title to database */
async function saveTitle(albumSlug: string, trackNumber: number, title: string, source: string) {
  await fetch("/api/admin/track-metadata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ albumSlug, trackNumber, title, source }),
  }).catch(() => {});
}

function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={`shrink-0 rounded px-2.5 py-1 text-[11px] font-medium transition ${
        copied
          ? "bg-green-800/40 text-green-400"
          : "bg-mundo-muted-dark/20 text-mundo-muted hover:bg-mundo-muted-dark/40 hover:text-mundo-creme"
      }`}
    >
      {copied ? "Copiado" : label}
    </button>
  );
}

type TrackStatus = "idle" | "uploading" | "done" | "error" | "generating" | "polling";

const ENERGY_OPTIONS = ["whisper", "steady", "pulse", "anthem", "raw"] as const;

type SunoClip = {
  id: string;
  status: string;
  audioUrl: string | null;
  title: string;
};

type GeneratedClips = {
  clips: SunoClip[];
};

function trackKey(albumSlug: string, trackNum: number) {
  return `${albumSlug}-t${trackNum}`;
}

function buildUploadForm(
  blob: Blob,
  filename: string,
  album: Album,
  track: AlbumTrack,
  titleOverride?: string | null
): FormData {
  const formData = new FormData();
  formData.append("file", new File([blob], filename, { type: "audio/mpeg" }));
  formData.append("filename", filename);
  formData.append("title", titleOverride || track.title);
  formData.append("artist", "Vivianne dos Santos");
  formData.append("album", album.title);
  formData.append("trackNumber", String(track.number));
  formData.append("year", "2026");
  formData.append("coverPath", getAlbumCover(album));
  return formData;
}

/**
 * Upload audio via signed URL (bypasses Vercel 4.5MB body limit).
 * Falls back to /api/admin/upload-audio for small files if signed URL fails.
 */
async function uploadViaSignedUrl(blob: Blob, filename: string): Promise<string> {
  // Step 1: Get signed upload URL
  const signedRes = await fetch("/api/admin/signed-upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename }),
  });

  if (!signedRes.ok) {
    const errData = await signedRes.json().catch(() => ({}));
    throw new Error(errData.erro || `Erro ao gerar URL de upload (${signedRes.status})`);
  }

  const { signedUrl } = await signedRes.json();

  // Step 2: Upload directly to Supabase Storage
  const uploadRes = await fetch(signedUrl, {
    method: "PUT",
    headers: { "Content-Type": "audio/mpeg" },
    body: blob,
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text().catch(() => "");
    throw new Error(`Upload falhou (${uploadRes.status}): ${errText.slice(0, 120)}`);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tdytdamtfillqyklgrmb.supabase.co";
  return `${supabaseUrl}/storage/v1/object/public/audios/${filename}`;
}

function ProductFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  const tabs = [
    { key: "all", label: "Todos" },
    { key: "espelho", label: "Espelhos" },
    { key: "no", label: "Nos" },
    { key: "livro", label: "Livro" },
    { key: "curso", label: "Cursos" },
    { key: "espiritual", label: "Espiritual" },
    { key: "vida", label: "Vida" },
  ];

  return (
    <div className="flex gap-1 rounded-full bg-mundo-muted-dark/10 p-1">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`rounded-full px-4 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
            active === t.key
              ? "bg-mundo-bg text-mundo-creme shadow-sm"
              : "text-mundo-muted hover:text-mundo-creme"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function ClipApprovalRow({
  clip,
  clipIndex,
  hasMainAudio,
  existingVersions,
  trackEnergy,
  onApproveMain,
  onApproveVersion,
}: {
  clip: SunoClip;
  clipIndex: number;
  hasMainAudio: boolean;
  existingVersions: string[];
  trackEnergy: string;
  onApproveMain: () => void;
  onApproveVersion: (name: string, energy: string) => void;
}) {
  const [mode, setMode] = useState<"pick" | "version">("pick");
  const [versionName, setVersionName] = useState(`suno-v${clipIndex + 1}`);
  const [energy, setEnergy] = useState(trackEnergy || "whisper");

  const nameExists = existingVersions.includes(versionName);

  return (
    <div className="rounded-lg border border-mundo-muted-dark/20 bg-mundo-bg/50 p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] text-mundo-muted font-mono">#{clipIndex + 1}</span>
        {clip.title && <span className="text-xs text-mundo-creme">{clip.title}</span>}
      </div>
      <audio controls src={clip.audioUrl!} className="h-8 w-full mb-2" />

      {mode === "pick" ? (
        <div className="flex items-center gap-2">
          {!hasMainAudio && (
            <button
              onClick={onApproveMain}
              className="rounded-lg bg-mundo-dourado px-3 py-1.5 text-xs text-white transition hover:bg-mundo-dourado/80"
            >
              Aprovar principal
            </button>
          )}
          <button
            onClick={() => setMode("version")}
            className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs text-white transition hover:bg-violet-700"
          >
            Guardar versão
          </button>
          {hasMainAudio && (
            <button
              onClick={onApproveMain}
              className="rounded-lg bg-mundo-muted-dark/20 px-3 py-1.5 text-xs text-mundo-muted transition hover:bg-mundo-muted-dark/30"
            >
              Substituir principal
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              placeholder="nome-da-versão"
              className="flex-1 rounded-lg bg-mundo-bg px-3 py-1.5 text-xs text-mundo-creme border border-mundo-muted-dark/30 focus:border-violet-500 focus:outline-none"
            />
          </div>
          {nameExists && (
            <p className="text-[10px] text-amber-400">Versão "{versionName}" já existe — será substituída.</p>
          )}
          <div className="flex gap-1">
            {ENERGY_OPTIONS.map((e) => (
              <button
                key={e}
                onClick={() => setEnergy(e)}
                className={`rounded px-2 py-1 text-[10px] font-bold uppercase transition ${
                  energy === e
                    ? ENERGY_LABELS[e].color
                    : "bg-mundo-muted-dark/10 text-mundo-muted hover:text-mundo-creme"
                }`}
              >
                {ENERGY_LABELS[e].emoji} {ENERGY_LABELS[e].label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (versionName) onApproveVersion(versionName, energy);
              }}
              disabled={!versionName}
              className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs text-white transition hover:bg-violet-700 disabled:opacity-50"
            >
              Guardar "{versionName}"
            </button>
            <button
              onClick={() => setMode("pick")}
              className="text-xs text-mundo-muted hover:text-mundo-creme"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TrackRow({
  track,
  status,
  error,
  onUpload,
  onRemove,
  onGenerate,
  onApproveClip,
  onApproveAsVersion,
  onUploadVersion,
  audioUrl,
  existingVersions,
  generatedClips,
  editedTitle,
  onTitleChange,
}: {
  track: AlbumTrack;
  status: TrackStatus;
  error: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
  onGenerate: () => void;
  onApproveClip: (clipUrl: string, sunoTitle: string) => void;
  onApproveAsVersion: (clipUrl: string, sunoTitle: string, versionName: string, energy: string) => void;
  onUploadVersion: (file: File, versionName: string, energy: string) => void;
  audioUrl: string | null;
  existingVersions: string[];
  generatedClips: GeneratedClips | null;
  editedTitle: string | null;
  onTitleChange: (title: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showLyrics, setShowLyrics] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  }

  const [showVersionUpload, setShowVersionUpload] = useState(false);
  const [versionUploadName, setVersionUploadName] = useState("remix-1");
  const [versionUploadEnergy, setVersionUploadEnergy] = useState(track.energy || "whisper");
  const versionInputRef = useRef<HTMLInputElement>(null);

  const isGenerating = status === "generating" || status === "polling";
  const hasClips = generatedClips && generatedClips.clips.length > 0;
  const clipsReady = hasClips && generatedClips.clips.every(c => c.audioUrl);
  const displayTitle = editedTitle ?? track.title;

  return (
    <div className="rounded-lg border border-mundo-muted-dark/30 bg-mundo-bg-light px-5 py-4">
      <div className="flex items-start gap-4">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mundo-muted-dark/10 font-mono text-sm text-mundo-muted">
          {String(track.number).padStart(2, "0")}
          <span className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-mundo-bg-light ${audioUrl ? "bg-green-500" : "bg-mundo-muted-dark/30"}`} />
        </div>
        <div className="min-w-0 flex-1">
          {/* Editable title */}
          <div className="flex items-center gap-2 mb-1">
            <input
              type="text"
              value={displayTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              className="bg-transparent font-medium text-mundo-creme border-b border-transparent hover:border-mundo-muted-dark/30 focus:border-mundo-dourado focus:outline-none px-0 py-0.5 min-w-0 flex-1 max-w-xs"
            />
            {editedTitle && editedTitle !== track.title && (
              <span className="rounded px-1.5 py-0.5 text-[10px] bg-mundo-dourado/20 text-mundo-dourado">
                editado
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${track.lang === "PT" ? "bg-mundo-muted-dark/15 text-mundo-muted" : "bg-violet-900/30 text-violet-400"}`}>{track.lang}</span>
            {track.energy && (
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${ENERGY_LABELS[track.energy].color}`}>
                {ENERGY_LABELS[track.energy].emoji} {ENERGY_LABELS[track.energy].label}
              </span>
            )}
            {track.flavor && track.flavor !== "organic" && (
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${FLAVOR_LABELS[track.flavor].color}`}>
                {FLAVOR_LABELS[track.flavor].emoji} {FLAVOR_LABELS[track.flavor].label}
              </span>
            )}
            {track.vocalMode === "duet" && (
              <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase bg-pink-900/30 text-pink-400">
                Dueto
              </span>
            )}
            {track.lyrics && (
              <span className="rounded px-1.5 py-0.5 text-[10px] bg-green-900/30 text-green-400">
                Letra
              </span>
            )}
          </div>
          <p className="text-sm text-mundo-muted mt-0.5">{track.description}</p>

          {/* Copy buttons — always visible */}
          <div className="mt-2 flex items-center gap-2">
            <CopyButton text={track.prompt} label="Copiar prompt" />
            {track.lyrics && <CopyButton text={track.lyrics} label="Copiar letra" />}
          </div>

          {/* Prompt expandable */}
          <details className="mt-2">
            <summary className="cursor-pointer text-xs text-mundo-muted/60 hover:text-mundo-muted">
              Ver prompt
            </summary>
            <p className="mt-1 rounded bg-mundo-bg p-2 font-mono text-xs text-mundo-muted/80">
              {track.prompt}
            </p>
          </details>

          {/* Lyrics expandable */}
          {track.lyrics && (
            <details className="mt-1" open={showLyrics} onToggle={(e) => setShowLyrics((e.target as HTMLDetailsElement).open)}>
              <summary className="cursor-pointer text-xs text-mundo-muted/60 hover:text-mundo-muted">
                Ver letra
              </summary>
              <pre className="mt-1 whitespace-pre-wrap rounded bg-mundo-bg p-3 font-mono text-xs text-mundo-muted/80 leading-relaxed max-h-64 overflow-y-auto">
                {track.lyrics}
              </pre>
            </details>
          )}

          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

          {/* Current audio */}
          {audioUrl && !hasClips && (
            <audio controls src={audioUrl} className="mt-2 h-8 w-full max-w-xs" />
          )}

          {/* Existing versions + add more */}
          <div className="mt-2">
            {existingVersions.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {existingVersions.map((v) => (
                  <span key={v} className="rounded bg-violet-900/30 px-2 py-0.5 text-[10px] text-violet-400">
                    {v}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowVersionUpload(!showVersionUpload)}
              className="text-[11px] text-violet-400 hover:text-violet-300 transition"
            >
              + Adicionar versão / remix
            </button>
            {showVersionUpload && (
              <div className="mt-2 rounded-lg border border-violet-800/30 bg-violet-950/20 p-3 space-y-2">
                <input
                  ref={versionInputRef}
                  type="file"
                  accept="audio/mpeg,audio/mp3"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && versionUploadName) {
                      onUploadVersion(f, versionUploadName, versionUploadEnergy);
                      setShowVersionUpload(false);
                    }
                  }}
                />
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-mundo-muted w-12">Nome:</label>
                  <input
                    type="text"
                    value={versionUploadName}
                    onChange={(e) => setVersionUploadName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="remix-1, acoustic, live..."
                    className="flex-1 rounded bg-mundo-bg px-2 py-1 text-xs text-mundo-creme border border-mundo-muted-dark/30 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                {existingVersions.includes(versionUploadName) && (
                  <p className="text-[10px] text-amber-400">"{versionUploadName}" já existe — será substituída.</p>
                )}
                <div className="flex gap-1">
                  {ENERGY_OPTIONS.map((e) => (
                    <button
                      key={e}
                      onClick={() => setVersionUploadEnergy(e)}
                      className={`rounded px-2 py-1 text-[10px] font-bold uppercase transition ${
                        versionUploadEnergy === e
                          ? ENERGY_LABELS[e].color
                          : "bg-mundo-muted-dark/10 text-mundo-muted hover:text-mundo-creme"
                      }`}
                    >
                      {ENERGY_LABELS[e].emoji} {ENERGY_LABELS[e].label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => versionInputRef.current?.click()}
                  disabled={!versionUploadName}
                  className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs text-white transition hover:bg-violet-700 disabled:opacity-50"
                >
                  Escolher MP3
                </button>
              </div>
            )}
          </div>

          {/* Generated clips — approve as main or save as version */}
          {clipsReady && (
            <div className="mt-3 rounded-lg border border-amber-700/30 bg-amber-950/30 p-3">
              <p className="mb-2 text-xs font-medium text-amber-400">
                {generatedClips.clips.length} versão(ões) gerada(s) — aprova ou guarda como versão:
              </p>
              <div className="space-y-3">
                {generatedClips.clips.map((clip, idx) => (
                  <ClipApprovalRow
                    key={clip.id}
                    clip={clip}
                    clipIndex={idx}
                    hasMainAudio={!!audioUrl}
                    existingVersions={existingVersions}
                    trackEnergy={track.energy}
                    onApproveMain={() => onApproveClip(clip.audioUrl!, clip.title)}
                    onApproveVersion={(name, energy) => onApproveAsVersion(clip.audioUrl!, clip.title, name, energy)}
                  />
                ))}
              </div>
              <button
                onClick={onGenerate}
                className="mt-2 text-xs text-mundo-muted hover:text-mundo-creme"
              >
                Regenerar
              </button>
            </div>
          )}

          {/* Polling indicator */}
          {isGenerating && !clipsReady && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-950/30 p-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
              <span className="text-xs text-amber-400">
                {status === "generating" ? "A enviar para o Suno..." : "A aguardar geração (pode demorar 30-60s)..."}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,audio/mpeg,audio/mp3,audio/wav,audio/x-wav,audio/mp4,audio/aac,audio/ogg"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Generate via Suno */}
          {!audioUrl && !isGenerating && !clipsReady && (
            <button
              onClick={onGenerate}
              disabled={!track.lyrics}
              title={!track.lyrics ? "Letra em falta" : "Gerar via Suno"}
              className={`rounded-lg px-4 py-2 text-xs transition ${
                !track.lyrics
                  ? "bg-mundo-muted-dark/10 text-mundo-muted/40 cursor-not-allowed"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }`}
            >
              Gerar via Suno
            </button>
          )}

          {/* Manual upload */}
          {!isGenerating && !clipsReady && (
            audioUrl ? (
              <button
                onClick={onRemove}
                className="rounded-lg bg-red-900/30 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-900/50"
              >
                Remover
              </button>
            ) : (
              <button
                onClick={() => inputRef.current?.click()}
                disabled={status === "uploading"}
                className={`rounded-lg px-4 py-2 text-xs transition ${
                  status === "uploading"
                    ? "animate-pulse bg-amber-900/30 text-amber-400"
                    : "bg-mundo-muted-dark/20 text-mundo-muted hover:bg-mundo-muted-dark/30"
                }`}
              >
                {status === "uploading" ? "A enviar..." : "Carregar MP3"}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function AlbumProductionPage() {
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"producao" | "letras">("producao");
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, TrackStatus>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [generatedClips, setGeneratedClips] = useState<Record<string, GeneratedClips>>({});
  const [editedTitles, setEditedTitles] = useState<Record<string, string>>({});
  const [trackVersions, setTrackVersions] = useState<Record<string, string[]>>({}); // key → version names
  const pollingRef = useRef<Record<string, NodeJS.Timeout>>({});
  const titleSaveRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Load existing audio status + saved titles on mount
  useEffect(() => {
    fetch("/api/admin/audio-status")
      .then((r) => r.json())
      .then((data) => {
        if (data.existing) {
          const newStatuses: Record<string, TrackStatus> = {};
          const newUrls: Record<string, string> = {};
          for (const key of data.existing as string[]) {
            newStatuses[key] = "done";
            const match = key.match(/^(.+)-t(\d+)$/);
            if (match) {
              newUrls[key] = `/api/music/stream?album=${match[1]}&track=${match[2]}`;
            }
          }
          setStatuses((s) => ({ ...newStatuses, ...s }));
          setAudioUrls((u) => ({ ...newUrls, ...u }));
        }
      })
      .catch(() => {});

    // Load saved custom titles
    fetch("/api/admin/track-metadata")
      .then((r) => r.json())
      .then((data) => {
        if (data.titles) {
          const saved: Record<string, string> = {};
          for (const [key, val] of Object.entries(data.titles)) {
            saved[key] = (val as { title: string }).title;
          }
          setEditedTitles((t) => ({ ...saved, ...t }));
        }
      })
      .catch(() => {});

    // Load existing track versions
    fetch("/api/admin/track-versions")
      .then((r) => r.json())
      .then((data) => {
        if (data.versions) {
          const vMap: Record<string, string[]> = {};
          for (const v of data.versions as { album_slug: string; track_number: number; version_name: string }[]) {
            const key = `${v.album_slug}-t${v.track_number}`;
            if (!vMap[key]) vMap[key] = [];
            vMap[key].push(v.version_name);
          }
          setTrackVersions(vMap);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      Object.values(pollingRef.current).forEach(clearInterval);
    };
  }, []);

  const pollStatus = useCallback((key: string, clipIds: string[]) => {
    if (pollingRef.current[key]) {
      clearInterval(pollingRef.current[key]);
    }

    setStatuses((s) => ({ ...s, [key]: "polling" }));

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/admin/suno/status?ids=${clipIds.join(",")}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (data.erro) throw new Error(data.erro);

        const allDone = data.clips.every((c: SunoClip) => c.status === "complete" && c.audioUrl);

        if (allDone) {
          clearInterval(pollingRef.current[key]);
          delete pollingRef.current[key];

          setGeneratedClips((g) => ({
            ...g,
            [key]: { clips: data.clips },
          }));
          setStatuses((s) => ({ ...s, [key]: "idle" }));
        }
      } catch {
        // transient
      }
    }, 5000);

    pollingRef.current[key] = interval;

    setTimeout(() => {
      if (pollingRef.current[key]) {
        clearInterval(pollingRef.current[key]);
        delete pollingRef.current[key];
        setStatuses((s) => {
          if (s[key] === "polling") return { ...s, [key]: "error" };
          return s;
        });
        setErrors((e) => ({ ...e, [key]: "Timeout — tenta de novo." }));
      }
    }, 5 * 60 * 1000);
  }, []);

  const albums =
    filter === "all"
      ? ALL_ALBUMS
      : getAlbumsByProduct(filter as Album["product"]);

  const album = selectedAlbum
    ? ALL_ALBUMS.find((a) => a.slug === selectedAlbum) || null
    : null;

  const totalTracks = ALL_ALBUMS.reduce((s, a) => s + a.tracks.length, 0);
  const totalDone = Object.values(statuses).filter((s) => s === "done").length;
  const totalWithLyrics = ALL_ALBUMS.reduce(
    (s, a) => s + a.tracks.filter((t) => t.lyrics).length,
    0
  );
  const totalVersions = Object.values(trackVersions).reduce((s, v) => s + v.length, 0);

  async function generateTrack(albumSlug: string, track: AlbumTrack) {
    const key = trackKey(albumSlug, track.number);
    setStatuses((s) => ({ ...s, [key]: "generating" }));
    setErrors((e) => ({ ...e, [key]: "" }));
    setGeneratedClips((g) => {
      const copy = { ...g };
      delete copy[key];
      return copy;
    });

    try {
      const res = await fetch("/api/admin/suno/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: track.prompt,
          lyrics: track.lyrics,
          title: editedTitles[key] || track.title,
          instrumental: false,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ erro: `HTTP ${res.status}` }));
        throw new Error(data.erro || `Erro ${res.status}`);
      }

      const data = await res.json();
      if (!data.clips || data.clips.length === 0) {
        throw new Error("Nenhum clip retornado pelo Suno.");
      }

      const clipIds = data.clips.map((c: SunoClip) => c.id);
      const allReady = data.clips.every((c: SunoClip) => c.audioUrl);

      if (allReady) {
        setGeneratedClips((g) => ({
          ...g,
          [key]: { clips: data.clips },
        }));
        setStatuses((s) => ({ ...s, [key]: "idle" }));
      } else {
        pollStatus(key, clipIds);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setStatuses((s) => ({ ...s, [key]: "error" }));
      setErrors((e) => ({ ...e, [key]: msg }));
    }
  }

  async function approveClip(albumSlug: string, track: AlbumTrack, clipAudioUrl: string, sunoTitle: string) {
    const key = trackKey(albumSlug, track.number);
    setStatuses((s) => ({ ...s, [key]: "uploading" }));

    // If Suno gave a better title, save it
    if (sunoTitle && sunoTitle !== track.title && !editedTitles[key]) {
      setEditedTitles((t) => ({ ...t, [key]: sunoTitle }));
      saveTitle(albumSlug, track.number, sunoTitle, "suno");
    }

    try {
      const audioRes = await fetch(clipAudioUrl);
      if (!audioRes.ok) throw new Error("Erro ao descarregar o áudio.");
      const blob = await audioRes.blob();

      const filename = `albums/${albumSlug}/faixa-${String(track.number).padStart(2, "0")}.mp3`;
      const url = await uploadViaSignedUrl(blob, filename);

      setStatuses((s) => ({ ...s, [key]: "done" }));
      setAudioUrls((u) => ({ ...u, [key]: url }));
      // Remove only the approved clip, keep others
      setGeneratedClips((g) => {
        const current = g[key];
        if (!current) return g;
        const remaining = current.clips.filter((c) => c.audioUrl !== clipAudioUrl);
        if (remaining.length === 0) {
          const copy = { ...g };
          delete copy[key];
          return copy;
        }
        return { ...g, [key]: { clips: remaining } };
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setStatuses((s) => ({ ...s, [key]: "error" }));
      setErrors((e) => ({ ...e, [key]: msg }));
    }
  }

  async function approveAsVersion(
    albumSlug: string,
    track: AlbumTrack,
    clipAudioUrl: string,
    sunoTitle: string,
    versionName: string,
    energy: string
  ) {
    const key = trackKey(albumSlug, track.number);
    setStatuses((s) => ({ ...s, [key]: "uploading" }));

    try {
      const audioRes = await fetch(clipAudioUrl);
      if (!audioRes.ok) throw new Error("Erro ao descarregar o áudio.");
      const blob = await audioRes.blob();

      const filename = `albums/${albumSlug}/faixa-${String(track.number).padStart(2, "0")}-${versionName}.mp3`;
      const uploadUrl = await uploadViaSignedUrl(blob, filename);

      // Save version metadata to track_versions table
      await fetch("/api/admin/track-versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          album_slug: albumSlug,
          track_number: track.number,
          version_name: versionName,
          energy,
          audio_url: uploadUrl,
        }),
      });

      // Save title if Suno provided one
      if (sunoTitle) {
        saveTitle(albumSlug, track.number, sunoTitle, "suno");
      }

      // Update local version list
      setTrackVersions((v) => {
        const existing = v[key] || [];
        if (!existing.includes(versionName)) {
          return { ...v, [key]: [...existing, versionName] };
        }
        return v;
      });

      setStatuses((s) => ({ ...s, [key]: statuses[key] === "uploading" ? (audioUrls[key] ? "done" : "idle") : s[key] }));

      // Remove the approved clip, keep others
      setGeneratedClips((g) => {
        const current = g[key];
        if (!current) return g;
        const remaining = current.clips.filter((c) => c.audioUrl !== clipAudioUrl);
        if (remaining.length === 0) {
          const copy = { ...g };
          delete copy[key];
          return copy;
        }
        return { ...g, [key]: { clips: remaining } };
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setStatuses((s) => ({ ...s, [key]: "error" }));
      setErrors((e) => ({ ...e, [key]: msg }));
    }
  }

  async function uploadVersion(albumSlug: string, track: AlbumTrack, file: File, versionName: string, energy: string) {
    const key = trackKey(albumSlug, track.number);
    setStatuses((s) => ({ ...s, [key]: "uploading" }));

    try {
      const album = ALL_ALBUMS.find(a => a.slug === albumSlug)!;
      const filename = `albums/${albumSlug}/faixa-${String(track.number).padStart(2, "0")}-${versionName}.mp3`;
      const uploadUrl = await uploadViaSignedUrl(file, filename);

      // Save version metadata
      await fetch("/api/admin/track-versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          album_slug: albumSlug,
          track_number: track.number,
          version_name: versionName,
          energy,
          audio_url: uploadUrl,
        }),
      });

      // Update local version list
      setTrackVersions((v) => {
        const existing = v[key] || [];
        if (!existing.includes(versionName)) {
          return { ...v, [key]: [...existing, versionName] };
        }
        return v;
      });

      setStatuses((s) => ({ ...s, [key]: audioUrls[key] ? "done" : "idle" }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setStatuses((s) => ({ ...s, [key]: "error" }));
      setErrors((e) => ({ ...e, [key]: msg }));
    }
  }

  async function uploadTrack(albumSlug: string, track: AlbumTrack, file: File) {
    const key = trackKey(albumSlug, track.number);
    setStatuses((s) => ({ ...s, [key]: "uploading" }));
    setErrors((e) => ({ ...e, [key]: "" }));

    try {
      // Read ID3 title from MP3 before uploading
      const id3Title = await readId3Title(file);

      const filename = `albums/${albumSlug}/faixa-${String(track.number).padStart(2, "0")}.mp3`;
      const url = await uploadViaSignedUrl(file, filename);

      setStatuses((s) => ({ ...s, [key]: "done" }));
      setAudioUrls((u) => ({ ...u, [key]: url }));

      // If MP3 has an ID3 title, use it (unless already manually edited)
      if (id3Title && !editedTitles[key]) {
        setEditedTitles((t) => ({ ...t, [key]: id3Title }));
        saveTitle(albumSlug, track.number, id3Title, "id3");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setStatuses((s) => ({ ...s, [key]: "error" }));
      setErrors((e) => ({ ...e, [key]: msg }));
    }
  }

  function removeTrack(albumSlug: string, trackNum: number) {
    const key = trackKey(albumSlug, trackNum);
    setStatuses((s) => ({ ...s, [key]: "idle" }));
    setAudioUrls((u) => {
      const copy = { ...u };
      delete copy[key];
      return copy;
    });
  }

  return (
    <div className="min-h-screen bg-mundo-bg">
      {/* Header */}
      <div className="border-b border-mundo-muted-dark/30 bg-mundo-bg-light/50">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            href="/"
            className="mb-4 inline-block text-sm text-mundo-muted hover:text-mundo-creme"
          >
            ← Início
          </Link>
          <h1 className="font-display text-3xl text-mundo-creme">
            Produção de Álbuns
          </h1>
          <p className="mt-1 text-mundo-muted">
            Gera via Suno, ouve, edita o título, aprova.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-mundo-muted-dark/10 px-3 py-1 text-xs text-mundo-muted">
              {ALL_ALBUMS.length} albums
            </span>
            <span className="rounded-full bg-mundo-muted-dark/10 px-3 py-1 text-xs text-mundo-muted">
              {totalTracks} faixas
            </span>
            <span className="rounded-full bg-mundo-muted-dark/10 px-3 py-1 text-xs text-mundo-muted">
              {totalDone}/{totalTracks} carregadas
            </span>
            <span className="rounded-full bg-green-900/30 px-3 py-1 text-xs text-green-400">
              {totalWithLyrics}/{totalTracks} com letra
            </span>
            {totalVersions > 0 && (
              <span className="rounded-full bg-violet-900/30 px-3 py-1 text-xs text-violet-400">
                {totalVersions} versões
              </span>
            )}
            {(["whisper", "steady", "pulse", "anthem", "raw"] as TrackEnergy[]).map((e) => {
              const count = ALL_ALBUMS.reduce(
                (s, a) => s + a.tracks.filter((t) => t.energy === e).length,
                0
              );
              return count > 0 ? (
                <span key={e} className={`rounded-full px-3 py-1 text-xs ${ENERGY_LABELS[e].color}`}>
                  {ENERGY_LABELS[e].emoji} {count} {ENERGY_LABELS[e].label.toLowerCase()}
                </span>
              ) : null;
            })}
            {(["marrabenta", "house", "gospel"] as TrackFlavor[]).map((f) => {
              const count = ALL_ALBUMS.reduce(
                (s, a) => s + a.tracks.filter((t) => t.flavor === f).length,
                0
              );
              return count > 0 ? (
                <span key={f} className={`rounded-full px-3 py-1 text-xs ${FLAVOR_LABELS[f].color}`}>
                  {FLAVOR_LABELS[f].emoji} {count} {FLAVOR_LABELS[f].label.toLowerCase()}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Filter + View Mode */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <ProductFilter active={filter} onChange={setFilter} />
          <div className="flex gap-1 rounded-full bg-mundo-muted-dark/10 p-1">
            <button
              onClick={() => setViewMode("producao")}
              className={`rounded-full px-4 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
                viewMode === "producao"
                  ? "bg-mundo-bg text-mundo-creme shadow-sm"
                  : "text-mundo-muted hover:text-mundo-creme"
              }`}
            >
              Produção
            </button>
            <button
              onClick={() => setViewMode("letras")}
              className={`rounded-full px-4 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
                viewMode === "letras"
                  ? "bg-mundo-bg text-mundo-creme shadow-sm"
                  : "text-mundo-muted hover:text-mundo-creme"
              }`}
            >
              Letras
            </button>
          </div>
        </div>

        {/* Lyrics view */}
        {viewMode === "letras" && (
          <div className="space-y-8">
            <div className="rounded-xl border border-mundo-muted-dark/30 bg-mundo-bg-light p-6">
              <p className="text-sm text-mundo-muted">
                Revisa todas as letras antes de gastar créditos.
              </p>
            </div>
            {albums.map((a) => (
              <div key={a.slug} className="rounded-xl border border-mundo-muted-dark/30 bg-mundo-bg-light overflow-hidden">
                <div className="border-b border-mundo-muted-dark/20 p-4 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ background: a.color }} />
                  <h3 className="font-display text-lg text-mundo-creme">{a.title}</h3>
                  <span className="rounded bg-mundo-muted-dark/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-mundo-muted">
                    {a.product}
                  </span>
                  <span className="text-xs text-green-400 ml-auto">
                    {a.tracks.filter(t => t.lyrics).length}/{a.tracks.length} letras
                  </span>
                </div>
                <div className="divide-y divide-mundo-muted-dark/10">
                  {a.tracks.map((t) => (
                    <div key={t.number} className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-mundo-muted/50">{String(t.number).padStart(2, "0")}</span>
                        <span className="font-medium text-mundo-creme">{t.title}</span>
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${t.lang === "PT" ? "bg-mundo-muted-dark/15 text-mundo-muted" : "bg-violet-900/30 text-violet-400"}`}>{t.lang}</span>
                        {t.energy && (
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${ENERGY_LABELS[t.energy].color}`}>
                            {ENERGY_LABELS[t.energy].emoji} {ENERGY_LABELS[t.energy].label}
                          </span>
                        )}
                        {t.flavor && t.flavor !== "organic" && (
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${FLAVOR_LABELS[t.flavor].color}`}>
                            {FLAVOR_LABELS[t.flavor].emoji} {FLAVOR_LABELS[t.flavor].label}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-mundo-muted/60 mb-2">{t.description}</p>
                      {t.lyrics ? (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CopyButton text={t.lyrics} label="Copiar letra" />
                            <CopyButton text={t.prompt} label="Copiar prompt" />
                          </div>
                          <pre className="whitespace-pre-wrap rounded bg-mundo-bg/50 p-4 font-mono text-xs text-mundo-muted/80 leading-relaxed max-h-80 overflow-y-auto">
                            {t.lyrics}
                          </pre>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <p className="text-xs text-mundo-muted/40 italic">Letra ainda não escrita.</p>
                          <CopyButton text={t.prompt} label="Copiar prompt" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Album detail */}
        {viewMode === "producao" && album && (
          <div>
            <button
              onClick={() => setSelectedAlbum(null)}
              className="mb-6 text-sm text-mundo-muted hover:text-mundo-creme"
            >
              ← Voltar aos albums
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ background: album.color }} />
                <h2 className="font-display text-2xl text-mundo-creme">{album.title}</h2>
              </div>
              <p className="mt-1 text-mundo-muted">{album.subtitle}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="rounded bg-mundo-muted-dark/10 px-2 py-0.5 text-xs text-mundo-muted">
                  {album.product}{album.veu ? ` — Véu ${album.veu}` : ""}
                </span>
                <span className="text-xs text-mundo-muted/60">
                  {album.tracks.length} faixas · {Math.floor(album.tracks.reduce((s, t) => s + t.durationSeconds, 0) / 60)} min
                </span>
                {(() => {
                  const albumDone = album.tracks.filter(t => statuses[trackKey(album.slug, t.number)] === "done").length;
                  const albumVer = album.tracks.reduce((s, t) => s + (trackVersions[trackKey(album.slug, t.number)]?.length || 0), 0);
                  return (
                    <>
                      <span className={`rounded px-2 py-0.5 text-xs font-medium ${albumDone === album.tracks.length ? "bg-green-900/30 text-green-400" : albumDone > 0 ? "bg-mundo-dourado/20 text-mundo-dourado" : "bg-mundo-muted-dark/10 text-mundo-muted/50"}`}>
                        {albumDone}/{album.tracks.length} com audio
                      </span>
                      {albumVer > 0 && (
                        <span className="rounded bg-violet-900/30 px-2 py-0.5 text-xs text-violet-400">
                          {albumVer} versoes
                        </span>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            <div className="space-y-3">
              {album.tracks.map((track) => {
                const key = trackKey(album.slug, track.number);
                return (
                  <TrackRow
                    key={track.number}
                    track={track}
                    status={statuses[key] || "idle"}
                    error={errors[key] || null}
                    audioUrl={audioUrls[key] || track.audioUrl || null}
                    onUpload={(file) => uploadTrack(album.slug, track, file)}
                    onRemove={() => removeTrack(album.slug, track.number)}
                    onGenerate={() => generateTrack(album.slug, track)}
                    onApproveClip={(url, title) => approveClip(album.slug, track, url, title)}
                    onApproveAsVersion={(url, title, name, energy) => approveAsVersion(album.slug, track, url, title, name, energy)}
                    onUploadVersion={(file, name, energy) => uploadVersion(album.slug, track, file, name, energy)}
                    existingVersions={trackVersions[key] || []}
                    generatedClips={generatedClips[key] || null}
                    editedTitle={editedTitles[key] || null}
                    onTitleChange={(title) => {
                      setEditedTitles((t) => ({ ...t, [key]: title }));
                      // Debounce save to DB (1s after last keystroke)
                      if (titleSaveRef.current[key]) clearTimeout(titleSaveRef.current[key]);
                      titleSaveRef.current[key] = setTimeout(() => {
                        if (title && title !== track.title) {
                          saveTitle(album.slug, track.number, title, "manual");
                        }
                      }, 1000);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Album grid */}
        {viewMode === "producao" && !album && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((a) => {
              const done = a.tracks.filter(
                (t) => statuses[trackKey(a.slug, t.number)] === "done"
              ).length;
              const withLyrics = a.tracks.filter((t) => t.lyrics).length;
              const albumVersions = a.tracks.reduce(
                (s, t) => s + (trackVersions[trackKey(a.slug, t.number)]?.length || 0),
                0
              );
              const totalMin = Math.floor(
                a.tracks.reduce((s, t) => s + t.durationSeconds, 0) / 60
              );

              return (
                <button
                  key={a.slug}
                  onClick={() => setSelectedAlbum(a.slug)}
                  className="group rounded-xl border border-mundo-muted-dark/30 bg-mundo-bg-light p-5 text-left transition hover:border-mundo-muted-dark/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="h-2.5 w-2.5 rounded-full mt-1" style={{ background: a.color }} />
                    <span className="rounded bg-mundo-muted-dark/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-mundo-muted">
                      {a.product}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg text-mundo-creme group-hover:text-mundo-dourado transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-mundo-muted line-clamp-1">{a.subtitle}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-mundo-muted/60">
                      {a.tracks.length} faixas · ~{totalMin} min
                    </span>
                    <div className="flex items-center gap-2">
                      {withLyrics > 0 && (
                        <span className="text-[10px] text-green-400">{withLyrics} letras</span>
                      )}
                      {albumVersions > 0 && (
                        <span className="text-[10px] text-violet-400">{albumVersions} v.</span>
                      )}
                      <span className={`text-xs font-medium ${done === a.tracks.length ? "text-green-400" : done > 0 ? "text-mundo-dourado" : "text-mundo-muted/40"}`}>
                        {done}/{a.tracks.length} audio
                      </span>
                    </div>
                  </div>
                  {(done > 0 || withLyrics > 0) && (
                    <div className="mt-2 h-1 rounded-full bg-mundo-muted-dark/10">
                      <div
                        className="h-1 rounded-full bg-mundo-dourado transition-all"
                        style={{ width: `${(Math.max(done, withLyrics) / a.tracks.length) * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
