"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import {
  ALL_ALBUMS,
  getAlbumsByProduct,
  type Album,
  type AlbumTrack,
} from "@/data/albums";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type TrackStatus = "idle" | "uploading" | "done" | "error";

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
  audioUrl,
}: {
  album: Album;
  track: AlbumTrack;
  status: TrackStatus;
  error: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
  audioUrl: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  }

  return (
    <div className="flex items-start gap-4 rounded-lg border border-sage/20 bg-white px-5 py-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/10 font-mono text-sm text-sage">
        {String(track.number).padStart(2, "0")}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-forest">{track.title}</p>
        <p className="text-sm text-sage">{track.description}</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs text-sage/60 hover:text-sage">
            Ver prompt de geracao
          </summary>
          <p className="mt-1 rounded bg-cream p-2 font-mono text-xs text-sage/80">
            {track.prompt}
          </p>
        </details>
        <p className="mt-1 text-xs text-sage/50">
          ~{Math.floor(track.durationSeconds / 60)}:{String(track.durationSeconds % 60).padStart(2, "0")} min
        </p>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {audioUrl && (
          <audio controls src={audioUrl} className="mt-2 h-8 w-full max-w-xs" />
        )}
      </div>
      <div className="flex shrink-0 gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {audioUrl ? (
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
                : status === "error"
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-forest text-white hover:bg-forest/80"
            }`}
          >
            {status === "uploading"
              ? "A enviar..."
              : status === "done"
              ? "Enviado"
              : status === "error"
              ? "Tentar de novo"
              : "Carregar audio"}
          </button>
        )}
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
            Estilo Aruna Serena / Vozes da Terra — world music organica para
            cada produto.
          </p>
          <div className="mt-4 flex items-center gap-6">
            <span className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
              {ALL_ALBUMS.length} albums
            </span>
            <span className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
              {totalTracks} faixas
            </span>
            <span className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
              {totalDone}/{totalTracks} carregadas
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Info box */}
        <div className="mb-8 rounded-xl border border-sage/20 bg-white p-6 text-sm text-sage space-y-2">
          <p className="font-medium text-forest">Pipeline de producao</p>
          <p>
            1. Copia o <strong>prompt</strong> de cada faixa para o{" "}
            <a
              href="https://suno.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest underline"
            >
              Suno AI
            </a>{" "}
            ou{" "}
            <a
              href="https://udio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest underline"
            >
              Udio
            </a>
            .
          </p>
          <p>2. Gera a musica (~4 min por faixa).</p>
          <p>3. Descarrega o MP3.</p>
          <p>
            4. Volta aqui e carrega o ficheiro — vai directamente para o
            Supabase.
          </p>
          <p>5. A faixa fica disponivel na plataforma.</p>
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
                    {done > 0 && (
                      <span className="text-xs text-forest">
                        {done}/{a.tracks.length}
                      </span>
                    )}
                  </div>
                  {done > 0 && (
                    <div className="mt-2 h-1 w-full rounded-full bg-sage/10">
                      <div
                        className="h-1 rounded-full bg-sage transition-all"
                        style={{
                          width: `${(done / a.tracks.length) * 100}%`,
                        }}
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
