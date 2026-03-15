"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { TERRITORY_PROMPTS, SILHOUETTE_POSES } from "@/lib/comfyui-workflows";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type TerritoryKey = keyof typeof TERRITORY_PROMPTS;

interface GeneratedImage {
  url: string;
  path: string;
  territory: string;
  stage: number;
  type: string;
  prompt_id: string;
}

export default function TerritoriosPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  // ComfyUI config
  const [comfyuiUrl, setComfyuiUrl] = useState("");
  const [loraName, setLoraName] = useState("");
  const [loraStrength, setLoraStrength] = useState(0.8);

  // Generation state
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryKey | "">(
    ""
  );
  const [selectedStage, setSelectedStage] = useState(0);
  const [genType, setGenType] = useState<"landscape" | "silhouette">(
    "landscape"
  );
  const [selectedPose, setSelectedPose] = useState("standing");
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState("");

  // Connection test
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "testing" | "ok" | "error"
  >("idle");
  const [connectionInfo, setConnectionInfo] = useState("");

  // Batch generation
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ done: 0, total: 0 });
  const [batchStop, setBatchStop] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  async function testConnection() {
    if (!comfyuiUrl) return;
    setConnectionStatus("testing");
    setConnectionInfo("");

    try {
      const res = await fetch("/api/admin/courses/test-comfyui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comfyuiUrl }),
      });
      const data = await res.json();

      if (data.ok) {
        setConnectionStatus("ok");
        const ckptCount = data.checkpoints?.length || 0;
        const loraCount = data.loras?.length || 0;
        setConnectionInfo(
          `Conectado. ${ckptCount} checkpoints, ${loraCount} LoRAs.`
        );
      } else {
        setConnectionStatus("error");
        setConnectionInfo(data.error || "Erro desconhecido.");
      }
    } catch {
      setConnectionStatus("error");
      setConnectionInfo("Falha de rede.");
    }
  }

  async function generateSingle() {
    if (!comfyuiUrl || !selectedTerritory) return;
    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/admin/courses/generate-territory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comfyuiUrl,
          territory: selectedTerritory,
          stage: selectedStage,
          type: genType,
          pose: selectedPose,
          loraName: loraName || undefined,
          loraStrength,
        }),
      });

      const data = await res.json();
      if (data.erro) {
        setError(data.erro);
      } else {
        setGeneratedImages((prev) => [data, ...prev]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setGenerating(false);
    }
  }

  async function generateAllLandscapes() {
    if (!comfyuiUrl) return;
    setBatchRunning(true);
    setBatchStop(false);

    const territories = Object.keys(TERRITORY_PROMPTS) as TerritoryKey[];
    const total = territories.length * 4;
    setBatchProgress({ done: 0, total });

    for (const territory of territories) {
      for (let stage = 0; stage < 4; stage++) {
        if (batchStop) break;

        try {
          const res = await fetch("/api/admin/courses/generate-territory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              comfyuiUrl,
              territory,
              stage,
              type: "landscape",
              loraName: loraName || undefined,
              loraStrength,
            }),
          });

          const data = await res.json();
          if (!data.erro) {
            setGeneratedImages((prev) => [data, ...prev]);
          }
        } catch {
          // Continue with next
        }

        setBatchProgress((prev) => ({ ...prev, done: prev.done + 1 }));
      }
      if (batchStop) break;
    }

    setBatchRunning(false);
  }

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  const territoryEntries = Object.entries(TERRITORY_PROMPTS) as [
    TerritoryKey,
    (typeof TERRITORY_PROMPTS)[TerritoryKey],
  ][];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl text-forest">
                Territorios Visuais
              </h1>
              <p className="mt-1 text-sm text-sage">
                10 territorios, 4 estagios cada — 40 paisagens do Mundo dos Veus
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/cursos/producao"
                className="text-sm text-sage hover:text-forest transition-colors"
              >
                Producao
              </Link>
              <Link
                href="/admin"
                className="text-sm text-sage hover:text-forest transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* ComfyUI Config */}
        <div className="mb-8 rounded-lg border border-sage/20 bg-white/50 p-6">
          <h2 className="mb-4 font-display text-lg text-forest">
            Conexao ComfyUI / ThinkDiffusion
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs text-sage">
                ComfyUI URL
              </label>
              <input
                type="url"
                value={comfyuiUrl}
                onChange={(e) => setComfyuiUrl(e.target.value)}
                placeholder="https://xxx.thinkdiffusion.xyz"
                className="w-full rounded border border-sage/30 bg-white px-3 py-2 text-sm text-forest outline-none focus:border-sage"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-sage">
                LoRA (opcional)
              </label>
              <input
                type="text"
                value={loraName}
                onChange={(e) => setLoraName(e.target.value)}
                placeholder="mundo-dos-veus-v1.safetensors"
                className="w-full rounded border border-sage/30 bg-white px-3 py-2 text-sm text-forest outline-none focus:border-sage"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-sage">
                LoRA Strength
              </label>
              <input
                type="number"
                value={loraStrength}
                onChange={(e) => setLoraStrength(Number(e.target.value))}
                min={0}
                max={1}
                step={0.05}
                className="w-full rounded border border-sage/30 bg-white px-3 py-2 text-sm text-forest outline-none focus:border-sage"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={testConnection}
                disabled={!comfyuiUrl || connectionStatus === "testing"}
                className="rounded bg-forest px-4 py-2 text-sm text-white transition-colors hover:bg-forest/80 disabled:opacity-40"
              >
                {connectionStatus === "testing" ? "A testar..." : "Testar"}
              </button>
              {connectionStatus === "ok" && (
                <span className="ml-3 text-xs text-green-600">
                  {connectionInfo}
                </span>
              )}
              {connectionStatus === "error" && (
                <span className="ml-3 text-xs text-red-500">
                  {connectionInfo}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Single Generation */}
        <div className="mb-8 rounded-lg border border-sage/20 bg-white/50 p-6">
          <h2 className="mb-4 font-display text-lg text-forest">
            Gerar Imagem Individual
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="mb-1 block text-xs text-sage">
                Territorio
              </label>
              <select
                value={selectedTerritory}
                onChange={(e) =>
                  setSelectedTerritory(e.target.value as TerritoryKey)
                }
                className="w-full rounded border border-sage/30 bg-white px-3 py-2 text-sm text-forest outline-none focus:border-sage"
              >
                <option value="">Seleccionar...</option>
                {territoryEntries.map(([key, data]) => (
                  <option key={key} value={key}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-sage">
                Estagio (0-3)
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(Number(e.target.value))}
                className="w-full rounded border border-sage/30 bg-white px-3 py-2 text-sm text-forest outline-none focus:border-sage"
              >
                <option value={0}>0 — Inicio</option>
                <option value={1}>1 — Emergencia</option>
                <option value={2}>2 — Transformacao</option>
                <option value={3}>3 — Integracao</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-sage">Tipo</label>
              <select
                value={genType}
                onChange={(e) =>
                  setGenType(e.target.value as "landscape" | "silhouette")
                }
                className="w-full rounded border border-sage/30 bg-white px-3 py-2 text-sm text-forest outline-none focus:border-sage"
              >
                <option value="landscape">Paisagem</option>
                <option value="silhouette">Silhueta</option>
              </select>
            </div>
            {genType === "silhouette" && (
              <div>
                <label className="mb-1 block text-xs text-sage">Pose</label>
                <select
                  value={selectedPose}
                  onChange={(e) => setSelectedPose(e.target.value)}
                  className="w-full rounded border border-sage/30 bg-white px-3 py-2 text-sm text-forest outline-none focus:border-sage"
                >
                  {Object.entries(SILHOUETTE_POSES).map(([key, desc]) => (
                    <option key={key} value={key}>
                      {key} — {desc.slice(0, 40)}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex items-end">
              <button
                onClick={generateSingle}
                disabled={
                  generating || !comfyuiUrl || !selectedTerritory
                }
                className="rounded bg-forest px-4 py-2 text-sm text-white transition-colors hover:bg-forest/80 disabled:opacity-40"
              >
                {generating ? "A gerar..." : "Gerar"}
              </button>
            </div>
          </div>

          {selectedTerritory && (
            <div className="mt-4 rounded border border-sage/10 bg-cream/50 p-3">
              <p className="text-xs text-sage/70">
                <span className="font-medium text-sage">Prompt:</span>{" "}
                {TERRITORY_PROMPTS[selectedTerritory].stages[selectedStage]}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-3 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Batch Generation */}
        <div className="mb-8 rounded-lg border border-sage/20 bg-white/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg text-forest">
                Gerar Todas as Paisagens
              </h2>
              <p className="mt-1 text-xs text-sage">
                10 territorios x 4 estagios = 40 paisagens. Cada uma demora ~30s-2min.
              </p>
            </div>
            <div className="flex gap-3">
              {batchRunning ? (
                <button
                  onClick={() => setBatchStop(true)}
                  className="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                >
                  Parar
                </button>
              ) : (
                <button
                  onClick={generateAllLandscapes}
                  disabled={!comfyuiUrl}
                  className="rounded bg-forest px-4 py-2 text-sm text-white transition-colors hover:bg-forest/80 disabled:opacity-40"
                >
                  Gerar 40 Paisagens
                </button>
              )}
            </div>
          </div>
          {batchRunning && (
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-sage">
                <span>
                  {batchProgress.done} / {batchProgress.total}
                </span>
                <span>
                  {Math.round(
                    (batchProgress.done / batchProgress.total) * 100
                  )}
                  %
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sage/20">
                <div
                  className="h-full rounded-full bg-forest transition-all"
                  style={{
                    width: `${(batchProgress.done / batchProgress.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Territory Overview Grid */}
        <div className="mb-8">
          <h2 className="mb-4 font-display text-lg text-forest">
            Mapa dos Territorios
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {territoryEntries.map(([key, data]) => (
              <div
                key={key}
                className="rounded-lg border border-sage/20 bg-white/50 p-4"
              >
                <h3 className="font-display text-base text-forest">
                  {data.name}
                </h3>
                <p className="mb-3 text-xs text-sage/60">{key}</p>
                <div className="space-y-2">
                  {data.stages.map((stage, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/10 text-xs text-sage">
                        {i}
                      </span>
                      <p className="text-xs leading-relaxed text-sage/80">
                        {stage.slice(0, 80)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <div>
            <h2 className="mb-4 font-display text-lg text-forest">
              Imagens Geradas ({generatedImages.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {generatedImages.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-sage/20 bg-white/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={`${img.territory} stage ${img.stage}`}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm font-medium text-forest">
                      {img.territory} — Estagio {img.stage}
                    </p>
                    <p className="text-xs text-sage/60">{img.type}</p>
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-xs text-sage hover:text-forest"
                    >
                      Abrir imagem
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
