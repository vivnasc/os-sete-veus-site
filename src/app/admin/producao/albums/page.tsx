"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import {
  ALL_ALBUMS,
  getAlbumsByProduct,
  type Album,
  type AlbumTrack,
} from "@/data/albums";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type TrackStatus = "idle" | "uploading" | "done" | "error" | "generating" | "polling";

type SunoClip = {
  id: string;
  status: string;
  audioUrl: string | null;
  title: string;
};

type GeneratedClips = {
  clips: SunoClip[];
  selectedIndex: number;
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
    <div className="flex gap-1 rounded-full bg-sage/10 p-1">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`rounded-full px-4 py-2 text-xs font-sans uppercase tracking-wider transition-colors ${
            active === t.key
              ? "bg-white text-forest shadow-sm"
              : "text-sage hover:text-forest"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function TrackRow({
  album,
  track,
  status,
  error,
  onUpload,
  onRemove,
  onGenerate,
  onApproveClip,
  audioUrl,
  generatedClips,
}: {
  album: Album;
  track: AlbumTrack;
  status: TrackStatus;
  error: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
  onGenerate: () => void;
  onApproveClip: (clipUrl: string) => void;
  audioUrl: string | null;
  generatedClips: GeneratedClips | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [selectedClipIdx, setSelectedClipIdx] = useState(0);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  }

  const isGenerating = status === "generating" || status === "polling";
  const hasClips = generatedClips && generatedClips.clips.length > 0;
  const clipsReady = hasClips && generatedClips.clips.every(c => c.audioUrl);

  return (
    <div className="rounded-lg border border-sage/20 bg-white px-5 py-4">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/10 font-mono text-sm text-sage">
          {String(track.number).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-forest">{track.title}</p>
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${track.lang === "PT" ? "bg-sage/15 text-sage" : "bg-violet-100 text-violet-600"}`}>{track.lang}</span>
            {track.lyrics && (
              <span className="rounded px-1.5 py-0.5 text-[10px] bg-green-50 text-green-600">
                Letra
              </span>
            )}
          </div>
          <p className="text-sm text-sage">{track.description}</p>
          <p className="mt-1 text-xs text-sage/50">
            ~{Math.floor(track.durationSeconds / 60)}:{String(track.durationSeconds % 60).padStart(2, "0")} min
          </p>

          {/* Prompt */}
          <details className="mt-2">
            <summary className="cursor-pointer text-xs text-sage/60 hover:text-sage">
              Ver prompt
            </summary>
            <p className="mt-1 rounded bg-cream p-2 font-mono text-xs text-sage/80">
              {track.prompt}
            </p>
          </details>

          {/* Lyrics */}
          {track.lyrics && (
            <details className="mt-1" open={showLyrics} onToggle={(e) => setShowLyrics((e.target as HTMLDetailsElement).open)}>
              <summary className="cursor-pointer text-xs text-sage/60 hover:text-sage">
                Ver letra
              </summary>
              <pre className="mt-1 whitespace-pre-wrap rounded bg-cream p-3 font-mono text-xs text-sage/80 leading-relaxed max-h-64 overflow-y-auto">
                {track.lyrics}
              </pre>
            </details>
          )}

          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

          {/* Current audio */}
          {audioUrl && !hasClips && (
            <audio controls src={audioUrl} className="mt-2 h-8 w-full max-w-xs" />
          )}

          {/* Generated clips preview */}
          {clipsReady && (
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/50 p-3">
              <p className="mb-2 text-xs font-medium text-amber-800">
                {generatedClips.clips.length} versao(oes) gerada(s) — ouve e escolhe:
              </p>
              <div className="space-y-2">
                {generatedClips.clips.map((clip, idx) => (
                  <div key={clip.id} className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedClipIdx(idx)}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                        selectedClipIdx === idx
                          ? "bg-forest text-white"
                          : "bg-sage/10 text-sage hover:bg-sage/20"
                      }`}
                    >
                      {idx + 1}
                    </button>
                    <audio controls src={clip.audioUrl!} className="h-8 flex-1" />
                    <button
                      onClick={() => onApproveClip(clip.audioUrl!)}
                      className="rounded-lg bg-forest px-3 py-1.5 text-xs text-white transition hover:bg-forest/80"
                    >
                      Aprovar
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={onGenerate}
                className="mt-2 text-xs text-sage hover:text-forest"
              >
                Regenerar
              </button>
            </div>
          )}

          {/* Polling indicator */}
          {isGenerating && !clipsReady && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 p-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
              <span className="text-xs text-amber-700">
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
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Generate via Suno */}
          {!audioUrl && !isGenerating && !clipsReady && (
            <button
              onClick={onGenerate}
              disabled={!track.lyrics}
              title={!track.lyrics ? "Letra em falta — adiciona a letra primeiro" : "Gerar musica via Suno API"}
              className={`rounded-lg px-4 py-2 text-xs transition ${
                !track.lyrics
                  ? "bg-sage/10 text-sage/40 cursor-not-allowed"
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
                className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-100"
              >
                Remover
              </button>
            ) : (
              <button
                onClick={() => inputRef.current?.click()}
                disabled={status === "uploading"}
                className={`rounded-lg px-4 py-2 text-xs transition ${
                  status === "done"
                    ? "bg-sage/20 text-sage"
                    : status === "uploading"
                    ? "animate-pulse bg-amber-50 text-amber-600"
                    : "bg-forest text-white hover:bg-forest/80"
                }`}
              >
                {status === "uploading"
                  ? "A enviar..."
                  : status === "done"
                  ? "Enviado"
                  : "Carregar MP3"}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function AlbumProductionPage() {
  const { user, profile } = useAuth();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [filter, setFilter] = useState("all");
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, TrackStatus>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [generatedClips, setGeneratedClips] = useState<Record<string, GeneratedClips>>({});
  const pollingRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      Object.values(pollingRef.current).forEach(clearInterval);
    };
  }, []);

  const pollStatus = useCallback((key: string, clipIds: string[]) => {
    // Clear any existing polling for this key
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
            [key]: { clips: data.clips, selectedIndex: 0 },
          }));
          setStatuses((s) => ({ ...s, [key]: "idle" }));
        }
      } catch {
        // Keep polling — transient errors are normal
      }
    }, 5000);

    pollingRef.current[key] = interval;

    // Stop after 5 minutes
    setTimeout(() => {
      if (pollingRef.current[key]) {
        clearInterval(pollingRef.current[key]);
        delete pollingRef.current[key];
        setStatuses((s) => {
          if (s[key] === "polling") return { ...s, [key]: "error" };
          return s;
        });
        setErrors((e) => ({ ...e, [key]: "Timeout — a geracao demorou demasiado. Tenta de novo." }));
      }
    }, 5 * 60 * 1000);
  }, []);

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

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
          title: track.title,
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

      // Check if clips are already ready (wait_audio was true)
      const allReady = data.clips.every((c: SunoClip) => c.audioUrl);
      if (allReady) {
        setGeneratedClips((g) => ({
          ...g,
          [key]: { clips: data.clips, selectedIndex: 0 },
        }));
        setStatuses((s) => ({ ...s, [key]: "idle" }));
      } else {
        // Start polling
        pollStatus(key, clipIds);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setStatuses((s) => ({ ...s, [key]: "error" }));
      setErrors((e) => ({ ...e, [key]: msg }));
    }
  }

  async function approveClip(albumSlug: string, track: AlbumTrack, clipAudioUrl: string) {
    const key = trackKey(albumSlug, track.number);
    setStatuses((s) => ({ ...s, [key]: "uploading" }));

    try {
      // Download the clip audio and upload to Supabase
      const audioRes = await fetch(clipAudioUrl);
      if (!audioRes.ok) throw new Error("Erro ao descarregar o audio do Suno.");
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
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            href="/admin"
            className="mb-4 inline-block text-sm text-sage hover:text-forest"
          >
            ← Painel
          </Link>
          <h1 className="font-display text-3xl text-forest">
            Producao de Albums
          </h1>
          <p className="mt-1 text-sage">
            Contemporaneo organico-electronico — voz feminina com letra, PT e EN.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
              {ALL_ALBUMS.length} albums
            </span>
            <span className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
              {totalTracks} faixas
            </span>
            <span className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
              {totalDone}/{totalTracks} carregadas
            </span>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">
              {totalWithLyrics}/{totalTracks} com letra
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Pipeline info */}
        <div className="mb-8 rounded-xl border border-sage/20 bg-white p-6 text-sm text-sage space-y-2">
          <p className="font-medium text-forest">Pipeline de producao</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-violet-50 p-3">
              <p className="mb-1 text-xs font-medium text-violet-700">Via Suno API (automatico)</p>
              <p className="text-xs text-violet-600">1. Clica "Gerar via Suno" na faixa</p>
              <p className="text-xs text-violet-600">2. Ouve as versoes geradas</p>
              <p className="text-xs text-violet-600">3. Aprova a melhor — vai para o Supabase</p>
            </div>
            <div className="rounded-lg bg-sage/5 p-3">
              <p className="mb-1 text-xs font-medium text-sage">Via upload manual</p>
              <p className="text-xs text-sage/80">1. Gera no Suno/Udio manualmente</p>
              <p className="text-xs text-sage/80">2. Passa pelo RVC (clone de voz)</p>
              <p className="text-xs text-sage/80">3. Carrega o MP3 aqui</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <ProductFilter active={filter} onChange={setFilter} />
        </div>

        {/* Album list or detail */}
        {album ? (
          <div>
            <button
              onClick={() => setSelectedAlbum(null)}
              className="mb-6 text-sm text-sage hover:text-forest"
            >
              ← Voltar aos albums
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ background: album.color }}
                />
                <h2 className="font-display text-2xl text-forest">
                  {album.title}
                </h2>
              </div>
              <p className="mt-1 text-sage">{album.subtitle}</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="rounded bg-sage/10 px-2 py-0.5 text-xs text-sage">
                  {album.product === "espelho"
                    ? "Espelho"
                    : album.product === "no"
                    ? "No"
                    : album.product === "livro"
                    ? "Livro"
                    : "Curso"}
                  {album.veu ? ` — Veu ${album.veu}` : ""}
                </span>
                <span className="text-xs text-sage/60">
                  {album.tracks.length} faixas ·{" "}
                  {Math.floor(
                    album.tracks.reduce((s, t) => s + t.durationSeconds, 0) / 60
                  )}{" "}
                  min total
                </span>
                <span className="text-xs text-green-600">
                  {album.tracks.filter(t => t.lyrics).length}/{album.tracks.length} letras
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {album.tracks.map((track) => {
                const key = trackKey(album.slug, track.number);
                return (
                  <TrackRow
                    key={track.number}
                    album={album}
                    track={track}
                    status={statuses[key] || "idle"}
                    error={errors[key] || null}
                    audioUrl={audioUrls[key] || track.audioUrl || null}
                    onUpload={(file) => uploadTrack(album.slug, track, file)}
                    onRemove={() => removeTrack(album.slug, track.number)}
                    onGenerate={() => generateTrack(album.slug, track)}
                    onApproveClip={(url) => approveClip(album.slug, track, url)}
                    generatedClips={generatedClips[key] || null}
                  />
                );
              })}
            </div>
          </div>
        ) : (
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
                  className="group rounded-xl border border-sage/20 bg-white p-5 text-left transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="h-2.5 w-2.5 rounded-full mt-1"
                      style={{ background: a.color }}
                    />
                    <span className="rounded bg-sage/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-sage">
                      {a.product === "espelho"
                        ? "Espelho"
                        : a.product === "no"
                        ? "No"
                        : a.product === "livro"
                        ? "Livro"
                        : "Curso"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg text-forest group-hover:text-forest/80">
                    {a.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-sage line-clamp-1">
                    {a.subtitle}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-sage/60">
                      {a.tracks.length} faixas · ~{totalMin} min
                    </span>
                    <div className="flex items-center gap-2">
                      {withLyrics > 0 && (
                        <span className="text-[10px] text-green-600">
                          {withLyrics} letras
                        </span>
                      )}
                      {done > 0 && (
                        <span className="text-xs text-forest">
                          {done}/{a.tracks.length}
                        </span>
                      )}
                    </div>
                  </div>
                  {(done > 0 || withLyrics > 0) && (
                    <div className="mt-2 flex gap-1">
                      {withLyrics > 0 && (
                        <div className="h-1 flex-1 rounded-full bg-green-100">
                          <div
                            className="h-1 rounded-full bg-green-400 transition-all"
                            style={{ width: `${(withLyrics / a.tracks.length) * 100}%` }}
                          />
                        </div>
                      )}
                      {done > 0 && (
                        <div className="h-1 flex-1 rounded-full bg-sage/10">
                          <div
                            className="h-1 rounded-full bg-sage transition-all"
                            style={{ width: `${(done / a.tracks.length) * 100}%` }}
                          />
                        </div>
                      )}
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
