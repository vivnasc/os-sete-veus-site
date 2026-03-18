"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ALL_ALBUMS as ALBUMS, type Album, type AlbumTrack } from "@/data/albums";

type UploadState = "idle" | "uploading" | "done" | "error";

type TrackUploadStatus = {
  state: UploadState;
  progress: number;
  url?: string;
  error?: string;
};

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function buildFilename(albumSlug: string, trackNumber: number): string {
  return `albums/${albumSlug}/faixa-${String(trackNumber).padStart(2, "0")}.mp3`;
}

export default function UploadPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [uploadStatuses, setUploadStatuses] = useState<Record<string, TrackUploadStatus>>({});
  const [filter, setFilter] = useState<string>("");
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const trackKey = (albumSlug: string, trackNumber: number) => `${albumSlug}/${trackNumber}`;

  const filteredAlbums = filter
    ? ALBUMS.filter(a =>
        a.title.toLowerCase().includes(filter.toLowerCase()) ||
        a.slug.toLowerCase().includes(filter.toLowerCase()) ||
        a.product.toLowerCase().includes(filter.toLowerCase())
      )
    : ALBUMS;

  const uploadFile = useCallback(async (file: File, album: Album, track: AlbumTrack) => {
    const key = trackKey(album.slug, track.number);
    const filename = buildFilename(album.slug, track.number);

    setUploadStatuses(prev => ({
      ...prev,
      [key]: { state: "uploading", progress: 0 },
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename);

      const res = await fetch("/api/admin/upload-audio", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.erro || "Upload falhou");
      }

      setUploadStatuses(prev => ({
        ...prev,
        [key]: { state: "done", progress: 100, url: data.url },
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setUploadStatuses(prev => ({
        ...prev,
        [key]: { state: "error", progress: 0, error: msg },
      }));
    }
  }, []);

  const handleFileSelect = useCallback((album: Album, track: AlbumTrack, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("audio/")) {
      const key = trackKey(album.slug, track.number);
      setUploadStatuses(prev => ({
        ...prev,
        [key]: { state: "error", progress: 0, error: "Ficheiro deve ser audio (MP3, WAV, etc.)" },
      }));
      return;
    }
    uploadFile(file, album, track);
  }, [uploadFile]);

  // Bulk upload: all files in a folder, matched by track number
  const handleBulkUpload = useCallback(async (album: Album, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files).filter(f => f.type.startsWith("audio/"));
    // Sort by name
    fileArray.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < Math.min(fileArray.length, album.tracks.length); i++) {
      const track = album.tracks[i];
      await uploadFile(fileArray[i], album, track);
    }
  }, [uploadFile]);

  const bulkInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 max-w-screen-lg mx-auto">
        <Link
          href="/musica"
          className="inline-flex items-center gap-2 text-xs text-[#666680] hover:text-[#a0a0b0] transition-colors mb-8"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>

        <h1 className="font-display text-3xl font-bold text-[#F5F0E6]">
          Carregar Musicas
        </h1>
        <p className="text-sm text-[#a0a0b0] mt-2">
          Carrega ficheiros de audio para o Supabase. Aceita MP3, WAV e outros formatos de audio.
        </p>

        {/* Search */}
        <div className="mt-6 relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666680]">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Procurar album..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F5F0E6] placeholder-[#666680] focus:outline-none focus:border-[#C9A96E]/50"
          />
        </div>
      </div>

      {/* Album list or album detail */}
      <div className="max-w-screen-lg mx-auto px-6 pb-12">
        {selectedAlbum ? (
          /* Track list for selected album */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="p-2 -ml-2 text-[#a0a0b0] hover:text-[#F5F0E6] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#F5F0E6]">
                    {selectedAlbum.title}
                  </h2>
                  <p className="text-xs text-[#666680]">{selectedAlbum.tracks.length} faixas</p>
                </div>
              </div>

              {/* Bulk upload */}
              <div>
                <input
                  ref={bulkInputRef}
                  type="file"
                  accept="audio/*"
                  multiple
                  className="hidden"
                  onChange={e => handleBulkUpload(selectedAlbum, e.target.files)}
                />
                <button
                  onClick={() => bulkInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                  Carregar todas
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {selectedAlbum.tracks.map(track => {
                const key = trackKey(selectedAlbum.slug, track.number);
                const status = uploadStatuses[key];
                const hasAudio = !!track.audioUrl || status?.state === "done";

                return (
                  <div
                    key={track.number}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] hover:bg-white/5 transition-colors"
                  >
                    {/* Track number */}
                    <span className="w-8 text-center text-sm tabular-nums text-[#666680]">
                      {track.number}
                    </span>

                    {/* Track info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#F5F0E6] truncate">{track.title}</p>
                      <p className="text-xs text-[#666680] truncate">
                        {track.lang} — {fmt(track.durationSeconds)}
                        {track.audioUrl && (
                          <span className="ml-2 text-green-400/70">audio existente</span>
                        )}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="shrink-0 w-32 text-right">
                      {status?.state === "uploading" && (
                        <span className="text-xs text-[#C9A96E] animate-pulse">A carregar...</span>
                      )}
                      {status?.state === "done" && (
                        <span className="text-xs text-green-400">Carregado</span>
                      )}
                      {status?.state === "error" && (
                        <span className="text-xs text-red-400 truncate" title={status.error}>
                          {status.error}
                        </span>
                      )}
                    </div>

                    {/* Upload button */}
                    <div className="shrink-0">
                      <input
                        ref={el => { fileInputRefs.current[key] = el; }}
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={e => handleFileSelect(selectedAlbum, track, e.target.files)}
                      />
                      <button
                        onClick={() => fileInputRefs.current[key]?.click()}
                        disabled={status?.state === "uploading"}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          hasAudio
                            ? "bg-white/5 text-[#a0a0b0] hover:text-[#F5F0E6] hover:bg-white/10"
                            : "bg-[#C9A96E]/20 text-[#C9A96E] hover:bg-[#C9A96E]/30"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        {hasAudio ? "Substituir" : "Carregar"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info */}
            <div className="mt-8 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-xs text-[#666680]">
                Os ficheiros sao guardados no Supabase Storage no bucket <code className="text-[#a0a0b0]">audios</code> com o caminho:
              </p>
              <p className="text-xs text-[#a0a0b0] mt-1 font-mono">
                albums/{selectedAlbum.slug}/faixa-01.mp3
              </p>
              <p className="text-xs text-[#666680] mt-2">
                O upload com "Carregar todas" associa os ficheiros por ordem (primeiro ficheiro = faixa 1, etc.).
              </p>
            </div>
          </div>
        ) : (
          /* Album grid */
          <div className="space-y-8">
            {(["espelho", "no", "livro", "curso"] as const).map(product => {
              const albumsInCategory = filteredAlbums.filter(a => a.product === product);
              if (albumsInCategory.length === 0) return null;

              const labels: Record<string, string> = {
                espelho: "Espelhos",
                no: "Nos",
                livro: "Livro Filosofico",
                curso: "Cursos",
              };

              return (
                <section key={product}>
                  <h2 className="text-sm uppercase tracking-widest text-[#666680] mb-3">{labels[product]}</h2>
                  <div className="space-y-1">
                    {albumsInCategory.map(album => {
                      const tracksWithAudio = album.tracks.filter(t => t.audioUrl).length;
                      const uploadedTracks = album.tracks.filter(t => {
                        const key = trackKey(album.slug, t.number);
                        return uploadStatuses[key]?.state === "done";
                      }).length;
                      const total = album.tracks.length;
                      const ready = tracksWithAudio + uploadedTracks;

                      return (
                        <button
                          key={album.slug}
                          onClick={() => setSelectedAlbum(album)}
                          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          {/* Color block */}
                          <div
                            className="h-10 w-10 rounded-lg shrink-0"
                            style={{ backgroundColor: album.color }}
                          />

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#F5F0E6] truncate">{album.title}</p>
                            <p className="text-xs text-[#666680]">{total} faixas</p>
                          </div>

                          {/* Progress */}
                          <div className="shrink-0 flex items-center gap-3">
                            {ready > 0 && (
                              <span className={`text-xs ${ready === total ? "text-green-400" : "text-[#C9A96E]"}`}>
                                {ready}/{total}
                              </span>
                            )}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[#666680]">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
