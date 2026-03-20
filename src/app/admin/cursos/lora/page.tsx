"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type TrainingStatus = "idle" | "starting" | "processing" | "succeeded" | "failed" | "canceled";

interface TrainingState {
  status: TrainingStatus;
  trainingId: string | null;
  progress: number;
  error: string | null;
  outputUrl: string | null;
  logsTail: string | null;
}

export default function LoRAPage() {
  const { user, profile } = useAuth();
  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [state, setState] = useState<TrainingState>({
    status: "idle",
    trainingId: null,
    progress: 0,
    error: null,
    outputUrl: null,
    logsTail: null,
  });

  const [showLogs, setShowLogs] = useState(false);

  // Restore training state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lora-training");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.trainingId && (parsed.status === "starting" || parsed.status === "processing")) {
          setState(parsed);
        } else if (parsed.status === "succeeded") {
          setState(parsed);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (state.trainingId) {
      localStorage.setItem("lora-training", JSON.stringify(state));
    }
  }, [state]);

  // Poll for status
  const checkStatus = useCallback(async () => {
    if (!state.trainingId) return;
    try {
      const res = await fetch(`/api/admin/courses/train-lora/status?id=${state.trainingId}`);
      const data = await res.json();

      if (data.erro) {
        setState((s) => ({ ...s, error: data.erro, status: "failed" }));
        return;
      }

      setState((s) => ({
        ...s,
        status: data.status as TrainingStatus,
        progress: data.progress ?? s.progress,
        logsTail: data.logs_tail ?? s.logsTail,
        error: data.error,
        outputUrl: data.output?.weights || data.output?.version || null,
      }));
    } catch {
      // Network error, keep polling
    }
  }, [state.trainingId]);

  // Start/stop polling
  useEffect(() => {
    if (state.status === "starting" || state.status === "processing") {
      pollRef.current = setInterval(checkStatus, 10000); // every 10s
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    } else {
      if (pollRef.current) clearInterval(pollRef.current);
    }
  }, [state.status, checkStatus]);

  async function startTraining() {
    setState({ status: "starting", trainingId: null, progress: 0, error: null, outputUrl: null, logsTail: null });

    try {
      const res = await fetch("/api/admin/courses/train-lora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (data.erro) {
        setState((s) => ({ ...s, status: "failed", error: data.erro }));
        return;
      }

      setState((s) => ({
        ...s,
        trainingId: data.training_id,
        status: "starting",
      }));
    } catch (e) {
      setState((s) => ({
        ...s,
        status: "failed",
        error: e instanceof Error ? e.message : "Erro de rede",
      }));
    }
  }

  function resetTraining() {
    localStorage.removeItem("lora-training");
    if (pollRef.current) clearInterval(pollRef.current);
    setState({ status: "idle", trainingId: null, progress: 0, error: null, outputUrl: null, logsTail: null });
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mundo-bg">
        <p className="text-mundo-muted">Acesso restrito.</p>
      </div>
    );
  }

  const isActive = state.status === "starting" || state.status === "processing";
  const isDone = state.status === "succeeded";
  const isFailed = state.status === "failed" || state.status === "canceled";

  return (
    <div className="min-h-screen bg-mundo-bg text-mundo-creme-suave p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin" className="text-mundo-muted hover:text-mundo-creme text-sm">HUB</Link>
          <span className="text-mundo-border">/</span>
          <h1 className="font-serif text-2xl text-white">Treinar LoRA</h1>
        </div>
        <p className="text-mundo-muted text-sm mb-8">
          Um botao. O Replicate treina o modelo por ti. ~$0.50, ~15 minutos.
        </p>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* Setup check */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-mundo-bg-surface rounded-xl p-6 mb-6">
          <h2 className="text-sm text-mundo-muted uppercase mb-4">Pre-requisito</h2>
          <div className="flex items-start gap-3">
            <span className="text-mundo-dourado font-mono shrink-0">1.</span>
            <div className="text-sm">
              <p>Vai ao <strong>Replicate.com</strong>, cria conta, e copia o teu API Token:</p>
              <a href="https://replicate.com/account/api-tokens" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-2 px-3 py-1.5 bg-mundo-bg text-mundo-dourado border border-mundo-border rounded hover:border-mundo-dourado text-xs">
                Abrir Replicate → API Tokens
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 mt-3">
            <span className="text-mundo-dourado font-mono shrink-0">2.</span>
            <div className="text-sm">
              <p>No Vercel, adiciona a variavel de ambiente:</p>
              <div className="bg-mundo-bg rounded-lg p-3 mt-2 flex items-center justify-between gap-2">
                <code className="text-xs text-mundo-dourado">REPLICATE_API_TOKEN = (o token que copiaste)</code>
              </div>
              <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-2 px-3 py-1.5 bg-mundo-bg text-mundo-muted border border-mundo-border rounded hover:border-mundo-dourado text-xs">
                Vercel → Settings → Environment Variables
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* Training card */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="bg-mundo-bg-surface rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-white">seteveus_style</h2>
            <span className="text-xs text-mundo-muted">SDXL LoRA · 59 imagens · 1024x1024</span>
          </div>

          {/* IDLE state */}
          {state.status === "idle" && (
            <div>
              <div className="bg-mundo-bg rounded-lg p-4 mb-4 text-xs text-mundo-muted space-y-1">
                <p>O que vai acontecer:</p>
                <p className="text-mundo-creme-suave">1. O Replicate descarrega o dataset (59 imagens + descricoes)</p>
                <p className="text-mundo-creme-suave">2. Pre-processa as imagens automaticamente</p>
                <p className="text-mundo-creme-suave">3. Treina o LoRA durante ~1000 passos (~15 min)</p>
                <p className="text-mundo-creme-suave">4. Devolve o ficheiro .safetensors pronto a usar</p>
                <p className="mt-2">Custo: ~$0.50 USD (cobrado pelo Replicate)</p>
              </div>

              <button onClick={startTraining}
                className="w-full py-3 bg-mundo-dourado text-mundo-bg rounded-lg hover:bg-mundo-dourado-quente font-medium text-sm transition-colors">
                Treinar LoRA
              </button>
            </div>
          )}

          {/* ACTIVE state */}
          {isActive && (
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-mundo-creme-suave">
                    {state.status === "starting" ? "A iniciar..." : "A treinar..."}
                  </span>
                  <span className="text-xs text-mundo-muted">
                    {state.progress > 0 ? `${state.progress}%` : "..."}
                  </span>
                </div>
                <div className="w-full bg-mundo-bg rounded-full h-2">
                  <div
                    className="bg-mundo-dourado h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.max(state.progress, state.status === "starting" ? 2 : 5)}%` }}
                  />
                </div>
              </div>

              <div className="bg-mundo-bg rounded-lg p-3 text-xs text-mundo-muted">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  <span>A processar no Replicate...</span>
                </div>
                <p>Podes fechar esta pagina. O treino continua. Volta depois para ver o resultado.</p>
                {state.trainingId && (
                  <p className="mt-1 text-mundo-border font-mono">ID: {state.trainingId}</p>
                )}
              </div>

              {/* Logs toggle */}
              {state.logsTail && (
                <div className="mt-3">
                  <button onClick={() => setShowLogs(!showLogs)} className="text-xs text-mundo-muted hover:text-mundo-creme">
                    {showLogs ? "Esconder logs" : "Ver logs"}
                  </button>
                  {showLogs && (
                    <pre className="mt-2 bg-mundo-bg rounded-lg p-3 text-xs text-mundo-muted font-mono overflow-x-auto max-h-40 overflow-y-auto">
                      {state.logsTail}
                    </pre>
                  )}
                </div>
              )}
            </div>
          )}

          {/* SUCCESS state */}
          {isDone && (
            <div>
              <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400 text-lg">OK</span>
                  <span className="text-sm text-green-300">LoRA treinado com sucesso</span>
                </div>

                {state.outputUrl && (
                  <a href={state.outputUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60 text-sm">
                    Descarregar seteveus_style.safetensors
                  </a>
                )}

                {!state.outputUrl && (
                  <p className="text-xs text-green-400/60">
                    O modelo foi treinado. Verifica no dashboard do Replicate.
                  </p>
                )}
              </div>

              <div className="bg-mundo-bg rounded-lg p-4 text-xs text-mundo-muted space-y-2">
                <p className="uppercase text-mundo-creme-suave">Como usar</p>
                <p>1. Descarrega o ficheiro .safetensors</p>
                <p>2. No ComfyUI (ThinkDiffusion), faz upload para <code className="text-mundo-dourado">/workspace/ComfyUI/models/loras/</code></p>
                <p>3. No no LoraLoader, selecciona o ficheiro e usa forca <strong>0.7</strong></p>
                <p>4. No prompt, usa a palavra <code className="text-mundo-dourado">seteveus_style</code></p>
              </div>

              <button onClick={resetTraining}
                className="mt-4 text-xs text-mundo-muted hover:text-mundo-creme">
                Treinar de novo
              </button>
            </div>
          )}

          {/* FAILED state */}
          {isFailed && (
            <div>
              <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-300 mb-1">Erro no treino</p>
                <p className="text-xs text-red-400/80">{state.error || "Erro desconhecido"}</p>
                {state.logsTail && (
                  <pre className="mt-2 text-xs text-red-400/60 font-mono overflow-x-auto max-h-32 overflow-y-auto">
                    {state.logsTail}
                  </pre>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={startTraining}
                  className="px-4 py-2 bg-mundo-dourado text-mundo-bg rounded hover:bg-mundo-dourado-quente text-sm">
                  Tentar de novo
                </button>
                <button onClick={resetTraining}
                  className="px-4 py-2 bg-mundo-bg text-mundo-muted border border-mundo-border rounded hover:border-mundo-dourado text-sm">
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* Info */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mt-6 bg-mundo-bg-surface rounded-xl p-6">
          <h3 className="text-sm text-mundo-muted uppercase mb-3">Detalhes tecnicos</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-mundo-muted">Modelo base</span>
              <p className="text-mundo-creme-suave">SDXL 1.0</p>
            </div>
            <div>
              <span className="text-mundo-muted">Metodo</span>
              <p className="text-mundo-creme-suave">LoRA (rank 32)</p>
            </div>
            <div>
              <span className="text-mundo-muted">Dataset</span>
              <p className="text-mundo-creme-suave">59 imagens + captions</p>
            </div>
            <div>
              <span className="text-mundo-muted">Trigger word</span>
              <p className="text-mundo-dourado font-mono">seteveus_style</p>
            </div>
            <div>
              <span className="text-mundo-muted">Resolucao</span>
              <p className="text-mundo-creme-suave">1024x1024</p>
            </div>
            <div>
              <span className="text-mundo-muted">Servico</span>
              <a href="https://replicate.com" target="_blank" rel="noopener noreferrer" className="text-mundo-creme-suave hover:text-mundo-dourado">
                Replicate.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
