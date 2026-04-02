"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { getExperiencesLive, type Experience } from "@/data/experiences";
import { getNosCollectionLive, type NosBook } from "@/data/nos-collection";
import { supabase } from "@/lib/supabase";
import {
  generateLaunchReel,
  FORMATS,
  type LaunchReelProgress,
  type ReelFormat,
} from "@/lib/launch-reel-generator";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

// Map experience slug to music-app album slug
const ALBUM_SLUG_MAP: Record<string, string> = {
  "veu-da-ilusao": "espelho-ilusao",
  "veu-do-medo": "espelho-medo",
  "veu-da-culpa": "espelho-culpa",
  "veu-da-identidade": "espelho-identidade",
  "veu-do-controlo": "espelho-controlo",
  "veu-do-desejo": "espelho-desejo",
  "veu-da-separacao": "espelho-separacao",
};

type AudioTrack = {
  name: string;
  number: string;
  url: string;
};

export default function AdminReelsPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [selectedSlug, setSelectedSlug] = useState("");
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [localAudioUrl, setLocalAudioUrl] = useState<string>("");
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [reelFormat, setReelFormat] = useState<ReelFormat>("reels");
  const [tagline, setTagline] = useState("");
  const [progress, setProgress] = useState<LaunchReelProgress | null>(null);
  const [reelBlob, setReelBlob] = useState<Blob | null>(null);
  const [reelUrl, setReelUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const experiences = getExperiencesLive();
  const nosCollection = getNosCollectionLive();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  // Load available audio tracks when experience changes
  useEffect(() => {
    if (!selectedSlug) {
      setAudioTracks([]);
      setSelectedTrack("");
      return;
    }
    loadAudioTracks(selectedSlug);
  }, [selectedSlug]);

  async function loadAudioTracks(slug: string) {
    setLoadingTracks(true);
    setAudioTracks([]);
    setSelectedTrack("");

    const albumSlug = ALBUM_SLUG_MAP[slug];
    if (!albumSlug) {
      setLoadingTracks(false);
      return;
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audios/albums/${albumSlug}`;

    try {
      // Try Supabase storage listing first
      const { data } = await supabase.storage
        .from("audios")
        .list(`albums/${albumSlug}`, { limit: 50 });

      if (data && data.length > 0) {
        const tracks: AudioTrack[] = data
          .filter(
            (f) =>
              f.name.match(/^faixa-\d+\.mp3$/) && f.name !== "faixa-00.mp3"
          )
          .map((f) => {
            const num = f.name.replace("faixa-", "").replace(".mp3", "");
            return { name: `Faixa ${parseInt(num)}`, number: num, url: `${baseUrl}/${f.name}` };
          })
          .sort((a, b) => a.number.localeCompare(b.number));

        setAudioTracks(tracks);
        if (tracks.length > 0) setSelectedTrack(tracks[0].url);
        setLoadingTracks(false);
        return;
      }
    } catch {
      // Listing failed — fallback to probing public URLs
    }

    // Fallback: probe tracks 1-10 with HEAD requests
    const found: AudioTrack[] = [];
    const probes = Array.from({ length: 10 }, (_, i) => {
      const num = String(i + 1).padStart(2, "0");
      const url = `${baseUrl}/faixa-${num}.mp3`;
      return fetch(url, { method: "HEAD" })
        .then((r) => {
          if (r.ok) found.push({ name: `Faixa ${i + 1}`, number: num, url });
        })
        .catch(() => {});
    });
    await Promise.all(probes);

    found.sort((a, b) => a.number.localeCompare(b.number));
    setAudioTracks(found);
    if (found.length > 0) setSelectedTrack(found[0].url);
    setLoadingTracks(false);
  }

  async function handleGenerate() {
    if (!selectedSlug) return;

    const exp = experiences.find((e) => e.slug === selectedSlug);
    if (!exp) return;

    const nos = nosCollection.find((n) => n.espelhoSlug === selectedSlug);

    // Clean up previous reel
    if (reelUrl) URL.revokeObjectURL(reelUrl);
    setReelBlob(null);
    setReelUrl(null);

    try {
      const blob = await generateLaunchReel({
        experience: exp,
        nos: nos || null,
        coverSrc: exp.image,
        nosCoverSrc: nos?.image || null,
        audioSrc: localAudioUrl || selectedTrack || null,
        tagline: tagline || undefined,
        format: reelFormat,
        onProgress: setProgress,
      });

      setReelBlob(blob);
      const url = URL.createObjectURL(blob);
      setReelUrl(url);
    } catch (err) {
      setProgress({
        phase: "error",
        progress: 0,
        message: `Erro: ${err instanceof Error ? err.message : "desconhecido"}`,
      });
    }
  }

  function handleDownload() {
    if (!reelBlob || !selectedSlug) return;
    const exp = experiences.find((e) => e.slug === selectedSlug);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(reelBlob);
    a.download = `reel-lancamento-${exp?.title || selectedSlug}.mp4`;
    a.click();
  }

  function buildCaption(exp: Experience, nos?: NosBook | null): string {
    const lines = [
      `${exp.title}`,
      `"${exp.subtitle}"`,
      "",
      exp.description,
    ];

    if (nos) {
      lines.push("", `~ Ao completar, desbloqueia ${nos.title}`);
    }

    lines.push(
      "",
      "seteveus.space",
      "",
      ".",
      ".",
      ".",
      "",
      "#seteveus #osseteveusdespertar #espelhos #ficçãotransformativa",
      "#leitura #livros #livrosnovos #lancamento #novolivro",
      "#autoconhecimento #crescimentopessoal #desenvolvimentopessoal",
      "#reflexão #jornadadescoberta #vidaconsciente",
      "#escritora #literaturaportugesa #ficçãoliterária",
      "#moçambique #escritoramoçambicana #viviannedossantos",
      "#bookstagram #booktok #livrosrecomendados #dicasdelivros",
      "#leituraconsciente #livrosquetransformam #leituraquefazbem",
    );

    return lines.join("\n");
  }

  async function handleShare() {
    if (!reelBlob || !selectedSlug) return;
    const exp = experiences.find((e) => e.slug === selectedSlug);
    if (!exp) return;

    const nos = nosCollection.find((n) => n.espelhoSlug === selectedSlug);
    const caption = buildCaption(exp, nos);

    if (navigator.share) {
      try {
        const file = new File(
          [reelBlob],
          `${exp.title} — Lancamento.mp4`,
          { type: "video/mp4" }
        );
        await navigator.share({ title: exp.title, text: caption, files: [file] });
        return;
      } catch {
        // fallback below
      }
    }

    // Fallback: copy caption + download
    await navigator.clipboard.writeText(caption);
    handleDownload();
    alert("Legenda copiada. Video descarregado. Abre o Instagram Reels e cola a legenda.");
  }

  if (authLoading || !isAdmin) return null;

  const selectedExp = experiences.find((e) => e.slug === selectedSlug);

  return (
    <div className="min-h-screen bg-brown-900 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl text-cream">Reels de Lancamento</h1>
        <p className="mt-2 text-sm text-brown-300">
          Gera reels verticais (15s) para anunciar novos Espelhos nas redes sociais.
        </p>

        {/* Experience selector */}
        <div className="mt-8">
          <label className="block text-sm text-brown-400">Espelho</label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="mt-1 w-full rounded-lg border border-brown-700 bg-brown-800 px-4 py-3 text-cream"
          >
            <option value="">Selecionar Espelho...</option>
            {experiences.map((exp) => (
              <option key={exp.slug} value={exp.slug}>
                {exp.number}. {exp.title}{" "}
                {exp.status === "available" ? "" : `(${exp.launchLabel})`}
              </option>
            ))}
          </select>
        </div>

        {/* Audio selector */}
        {selectedSlug && (
          <div className="mt-6">
            <label className="block text-sm text-brown-400">
              Audio
            </label>
            {loadingTracks ? (
              <p className="mt-2 text-sm text-brown-500">A procurar faixas...</p>
            ) : audioTracks.length > 0 ? (
              <>
                <select
                  value={selectedTrack}
                  onChange={(e) => { setSelectedTrack(e.target.value); setLocalAudioUrl(""); }}
                  className="mt-1 w-full rounded-lg border border-brown-700 bg-brown-800 px-4 py-3 text-cream"
                >
                  {audioTracks.map((t) => (
                    <option key={t.number} value={t.url}>
                      {t.name}
                    </option>
                  ))}
                </select>
                {(localAudioUrl || selectedTrack) && (
                  <audio
                    src={localAudioUrl || selectedTrack}
                    controls
                    className="mt-2 w-full"
                  />
                )}
              </>
            ) : (
              <p className="mt-2 text-sm text-brown-500">
                Nenhuma faixa encontrada no Supabase. Usa o upload abaixo.
              </p>
            )}
            {/* File upload fallback */}
            <div className="mt-3">
              <label className="block text-xs text-brown-500 mb-1">
                Ou carrega um ficheiro MP3:
              </label>
              <input
                type="file"
                accept="audio/mpeg,audio/mp3"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setLocalAudioUrl(url);
                    setSelectedTrack("");
                  }
                }}
                className="w-full text-sm text-brown-400 file:mr-3 file:rounded-lg file:border-0 file:bg-brown-700 file:px-4 file:py-2 file:text-sm file:text-cream hover:file:bg-brown-600"
              />
              {localAudioUrl && (
                <audio src={localAudioUrl} controls className="mt-2 w-full" />
              )}
            </div>
          </div>
        )}

        {/* Tagline override */}
        {selectedSlug && (
          <div className="mt-6">
            <label className="block text-sm text-brown-400">
              Frase (opcional — usa a descricao por defeito)
            </label>
            <textarea
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder={selectedExp?.description || ""}
              rows={2}
              className="mt-1 w-full rounded-lg border border-brown-700 bg-brown-800 px-4 py-3 text-cream placeholder:text-brown-600"
            />
          </div>
        )}

        {/* Format selector */}
        {selectedSlug && (
          <div className="mt-6">
            <label className="block text-sm text-brown-400">Formato</label>
            <div className="mt-2 flex gap-3">
              {(Object.entries(FORMATS) as [ReelFormat, typeof FORMATS[ReelFormat]][]).map(([key, fmt]) => (
                <button
                  key={key}
                  onClick={() => setReelFormat(key)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-left transition-colors ${
                    reelFormat === key
                      ? "border-cream/40 bg-brown-700 text-cream"
                      : "border-brown-700 bg-brown-800 text-brown-400 hover:border-brown-600"
                  }`}
                >
                  <p className="text-sm font-medium">{fmt.label}</p>
                  <p className="text-xs opacity-60">{fmt.w}x{fmt.h}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preview info */}
        {selectedExp && (
          <div className="mt-6 rounded-xl border border-brown-700 bg-brown-800/50 p-5">
            <div className="flex items-start gap-4">
              <div
                className="h-3 w-3 shrink-0 rounded-full mt-1"
                style={{ backgroundColor: selectedExp.color }}
              />
              <div>
                <p className="text-sm text-brown-400">
                  Espelho {selectedExp.number} de 7
                </p>
                <p className="font-serif text-lg text-cream">
                  {selectedExp.title}
                </p>
                <p className="font-serif text-sm italic text-brown-300">
                  {selectedExp.subtitle}
                </p>
                {(() => {
                  const nos = nosCollection.find(
                    (n) => n.espelhoSlug === selectedSlug
                  );
                  return nos ? (
                    <p className="mt-2 text-xs text-brown-500">
                      ~ {nos.title} ({nos.subtitle})
                    </p>
                  ) : null;
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Generate button */}
        {selectedSlug && (
          <button
            onClick={handleGenerate}
            disabled={
              progress?.phase === "recording" ||
              progress?.phase === "loading" ||
              progress?.phase === "finalizing"
            }
            className="mt-6 w-full rounded-lg px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-brown-900 transition-colors disabled:opacity-50"
            style={{ backgroundColor: selectedExp?.color || "#c9b896" }}
          >
            {progress?.phase === "recording" || progress?.phase === "loading"
              ? progress.message
              : progress?.phase === "finalizing"
                ? "A finalizar..."
                : "Gerar Reel de Lancamento"}
          </button>
        )}

        {/* Progress */}
        {progress && progress.phase !== "done" && progress.phase !== "error" && (
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-brown-800">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.round(progress.progress * 100)}%`,
                  backgroundColor: selectedExp?.color || "#c9b896",
                }}
              />
            </div>
            <p className="mt-1 text-xs text-brown-500">{progress.message}</p>
          </div>
        )}

        {/* Error */}
        {progress?.phase === "error" && (
          <p className="mt-4 text-sm text-red-400">{progress.message}</p>
        )}

        {/* Result */}
        {reelUrl && (
          <div className="mt-8 rounded-xl border border-brown-700 bg-brown-800/50 p-6">
            <p className="text-sm font-medium text-cream">Reel pronto</p>
            <video
              ref={videoRef}
              src={reelUrl}
              controls
              loop
              playsInline
              className="mx-auto mt-4 max-h-[500px] rounded-lg"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-brown-900"
                style={{ backgroundColor: selectedExp?.color || "#c9b896" }}
              >
                Partilhar
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 rounded-lg border border-brown-600 px-4 py-2.5 text-sm text-cream hover:bg-brown-800"
              >
                Descarregar
              </button>
            </div>
            <p className="mt-3 text-xs text-brown-500">
              {reelBlob
                ? `${(reelBlob.size / 1024 / 1024).toFixed(1)} MB — ${reelBlob.type}`
                : ""}
            </p>

            {/* Caption for Instagram */}
            {selectedExp && (() => {
              const nos = nosCollection.find((n) => n.espelhoSlug === selectedSlug);
              const caption = buildCaption(selectedExp, nos);
              return (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-cream">Legenda para Instagram</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(caption);
                        const btn = document.getElementById("copy-caption-btn");
                        if (btn) { btn.textContent = "Copiada!"; setTimeout(() => { btn.textContent = "Copiar"; }, 2000); }
                      }}
                      id="copy-caption-btn"
                      className="rounded-lg border border-brown-600 px-3 py-1 text-xs text-cream hover:bg-brown-700"
                    >
                      Copiar
                    </button>
                  </div>
                  <pre className="mt-2 max-h-[300px] overflow-y-auto whitespace-pre-wrap rounded-lg bg-brown-900 p-4 text-xs leading-relaxed text-brown-300 border border-brown-700">
                    {caption}
                  </pre>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
