"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
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

function TrackRow({
  track,
  status,
  error,
  onUpload,
  onRemove,
  onGenerate,
  onApproveClip,
  audioUrl,
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
  audioUrl: string | null;
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

  const isGenerating = status === "generating" || status === "polling";
  const hasClips = generatedClips && generatedClips.clips.length > 0;
  const clipsReady = hasClips && generatedClips.clips.every(c => c.audioUrl);
  const displayTitle = editedTitle ?? track.title;

  return (
    <div className="rounded-lg border border-mundo-muted-dark/30 bg-mundo-bg-light px-5 py-4">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mundo-muted-dark/10 font-mono text-sm text-mundo-muted">
          {String(track.number).padStart(2, "0")}
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

          {/* Generated clips — pick and approve */}
          {clipsReady && (
            <div className="mt-3 rounded-lg border border-amber-700/30 bg-amber-950/30 p-3">
              <p className="mb-2 text-xs font-medium text-amber-400">
                {generatedClips.clips.length} versao(oes) gerada(s) — ouve e aprova:
              </p>
              <div className="space-y-2">
                {generatedClips.clips.map((clip) => (
                  <div key={clip.id} className="flex items-center gap-3">
                    <audio controls src={clip.audioUrl!} className="h-8 flex-1" />
                    <button
                      onClick={() => onApproveClip(clip.audioUrl!, clip.title)}
                      className="shrink-0 rounded-lg bg-mundo-dourado px-3 py-1.5 text-xs text-white transition hover:bg-mundo-dourado/80"
                    >
                      Aprovar
                    </button>
                  </div>
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
                {status === "generating" ? "A enviar para o Suno..." : "A aguardar geracao (pode demorar 30-60s)..."}
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
  const pollingRef = useRef<Record<string, NodeJS.Timeout>>({});

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
    }

    try {
      const audioRes = await fetch(clipAudioUrl);
      if (!audioRes.ok) throw new Error("Erro ao descarregar o audio.");
      const blob = await audioRes.blob();

      const filename = `albums/${albumSlug}/faixa-${String(track.number).padStart(2, "0")}.mp3`;
      const formData = new FormData();
      formData.append("file", new File([blob], filename, { type: "audio/mpeg" }));
      formData.append("filename", filename);

      const uploadRes = await fetch("/api/admin/upload-audio", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json().catch(() => ({ erro: `HTTP ${uploadRes.status}` }));
        throw new Error(data.erro || `Erro ${uploadRes.status}`);
      }

      const data = await uploadRes.json();
      setStatuses((s) => ({ ...s, [key]: "done" }));
      setAudioUrls((u) => ({ ...u, [key]: data.url }));
      setGeneratedClips((g) => {
        const copy = { ...g };
        delete copy[key];
        return copy;
      });
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
      const filename = `albums/${albumSlug}/faixa-${String(track.number).padStart(2, "0")}.mp3`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename);

      const res = await fetch("/api/admin/upload-audio", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ erro: `HTTP ${res.status}` }));
        throw new Error(data.erro || `Erro ${res.status}`);
      }

      const data = await res.json();
      setStatuses((s) => ({ ...s, [key]: "done" }));
      setAudioUrls((u) => ({ ...u, [key]: data.url }));
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
            ← Inicio
          </Link>
          <h1 className="font-display text-3xl text-mundo-creme">
            Producao de Albums
          </h1>
          <p className="mt-1 text-mundo-muted">
            Gera via Suno, ouve, edita o titulo, aprova.
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
              Producao
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
                Revisa todas as letras antes de gastar creditos.
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
              <div className="mt-2 flex items-center gap-3">
                <span className="rounded bg-mundo-muted-dark/10 px-2 py-0.5 text-xs text-mundo-muted">
                  {album.product}{album.veu ? ` — Veu ${album.veu}` : ""}
                </span>
                <span className="text-xs text-mundo-muted/60">
                  {album.tracks.length} faixas · {Math.floor(album.tracks.reduce((s, t) => s + t.durationSeconds, 0) / 60)} min
                </span>
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
                    generatedClips={generatedClips[key] || null}
                    editedTitle={editedTitles[key] || null}
                    onTitleChange={(title) => setEditedTitles((t) => ({ ...t, [key]: title }))}
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
                      {done > 0 && (
                        <span className="text-xs text-mundo-dourado">{done}/{a.tracks.length}</span>
                      )}
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
