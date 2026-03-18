"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEPS: { num: Step; title: string; desc: string }[] = [
  { num: 1, title: "Abrir ThinkDiffusion", desc: "Criar conta e lancar Kohya SS" },
  { num: 2, title: "Upload do dataset", desc: "Enviar o ZIP com as 59 imagens" },
  { num: 3, title: "Configurar o treino", desc: "Copiar os valores exactos" },
  { num: 4, title: "Treinar", desc: "Lancar e esperar 2-4 horas" },
  { num: 5, title: "Testar no ComfyUI", desc: "Verificar a qualidade" },
  { num: 6, title: "Guardar o LoRA", desc: "Descarregar e usar na plataforma" },
];

// Config values to copy-paste
const CONFIG = {
  sourceModel: {
    "Model type": "SDXL",
    "Pretrained model": "/workspace/models/sd_xl_base_1.0.safetensors",
    "Save trained model as": "safetensors",
    "Save precision": "fp16",
  },
  folders: {
    "Training images folder": "/workspace/dataset/seteveus",
    "Output folder": "/workspace/output",
    "Logging folder": "/workspace/logs",
    "Model output name": "seteveus_style",
  },
  training: {
    "Train batch size": "1",
    "Epoch": "20",
    "Save every N epochs": "1",
    "Mixed precision": "fp16",
    "Cache latents": "ON",
    "Cache latents to disk": "ON",
    "Clip skip": "2",
    "Seed": "42",
    "Gradient checkpointing": "ON",
    "Noise offset": "0.05",
  },
  optimizer: {
    "Optimizer": "AdamW8bit",
    "Learning rate": "1e-4",
    "Unet learning rate": "1e-4",
    "Text encoder learning rate": "5e-5",
    "LR scheduler": "cosine_with_restarts",
    "LR warmup steps": "100",
    "Number of cycles": "3",
  },
  network: {
    "Network rank (dim)": "32",
    "Network alpha": "16",
    "Train UNet": "ON",
    "Train Text Encoder": "ON",
  },
  sample: {
    "Sample every N epochs": "5",
    "Sample sampler": "Euler a",
    "Sample prompt": "seteveus_style, dark moody landscape with golden light, deep navy blue sky, oil painting style, atmospheric, editorial poetic illustration",
  },
};

const TEST_PROMPTS = [
  {
    name: "Paisagem nova",
    positive: "seteveus_style, ancient library with floating golden books, deep navy blue walls, warm amber candlelight, oil painting style, moody atmospheric, editorial poetic illustration",
    negative: "bright, colorful, cartoon, anime, photo, realistic face, text, watermark",
  },
  {
    name: "Silhueta nova",
    positive: "seteveus_style, faceless woman silhouette dancing with flowing golden fabric, deep navy blue background, terracotta and gold tones, oil painting style, moody atmospheric, editorial poetic illustration",
    negative: "face, eyes, realistic skin, photo, bright colors, cartoon, text, watermark",
  },
  {
    name: "Composicao nova",
    positive: "seteveus_style, faceless woman silhouette standing before ancient tree with red leaves, deep navy blue night sky, golden moonlight, oil painting style, moody atmospheric, editorial poetic illustration",
    negative: "face, realistic, photo, bright, cartoon, text, watermark",
  },
  {
    name: "Territorio novo",
    positive: "seteveus_style, vast dark ocean with golden light reflecting on water surface, deep navy blue sky, single small boat, oil painting style, moody atmospheric, editorial poetic illustration",
    negative: "bright, colorful, cartoon, text, watermark, realistic face",
  },
];

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`text-xs px-2 py-0.5 rounded transition-colors ${
        copied
          ? "bg-green-800/40 text-green-300"
          : "bg-mundo-bg text-mundo-muted hover:text-mundo-creme"
      }`}
    >
      {copied ? "Copiado" : label || "Copiar"}
    </button>
  );
}

function ConfigTable({ title, values }: { title: string; values: Record<string, string> }) {
  return (
    <div className="mb-4">
      <h4 className="text-xs text-mundo-muted uppercase mb-2">{title}</h4>
      <div className="bg-mundo-bg rounded-lg overflow-hidden">
        {Object.entries(values).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between px-4 py-2 border-b border-mundo-bg-surface last:border-0">
            <span className="text-sm text-mundo-creme-suave">{key}</span>
            <div className="flex items-center gap-2">
              <code className="text-sm text-mundo-dourado font-mono">{val}</code>
              <CopyButton text={val} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoRAPage() {
  const { user, profile } = useAuth();
  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set());

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mundo-bg">
        <p className="text-mundo-muted">Acesso restrito.</p>
      </div>
    );
  }

  function markDone(step: Step) {
    setCompletedSteps((prev) => new Set([...prev, step]));
    if (step < 6) setCurrentStep((step + 1) as Step);
  }

  return (
    <div className="min-h-screen bg-mundo-bg text-mundo-creme-suave p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin" className="text-mundo-muted hover:text-mundo-creme text-sm">HUB</Link>
          <span className="text-mundo-border">/</span>
          <Link href="/admin/cursos" className="text-mundo-muted hover:text-mundo-creme text-sm">Cursos</Link>
          <span className="text-mundo-border">/</span>
          <h1 className="font-serif text-2xl text-white">Treinar LoRA</h1>
        </div>
        <p className="text-mundo-muted text-sm mb-8">
          Treina o modelo visual "seteveus_style" no ThinkDiffusion. Segue passo a passo.
        </p>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-8">
          {STEPS.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex-1 py-2 px-2 rounded text-xs text-center transition-colors ${
                currentStep === s.num
                  ? "bg-mundo-dourado text-mundo-bg font-medium"
                  : completedSteps.has(s.num)
                  ? "bg-green-800/40 text-green-300"
                  : "bg-mundo-bg-surface text-mundo-muted"
              }`}
            >
              {completedSteps.has(s.num) ? "OK" : s.num}. {s.title}
            </button>
          ))}
        </div>

        {/* ─── STEP 1: Open ThinkDiffusion ─── */}
        {currentStep === 1 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">1. Abrir ThinkDiffusion</h2>

            <div className="space-y-3 text-sm text-mundo-creme-suave">
              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">1.</span>
                <div>
                  <p>Vai a <strong>thinkdiffusion.com</strong> e faz login (ou cria conta).</p>
                  <a
                    href="https://www.thinkdiffusion.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-mundo-dourado text-mundo-bg rounded hover:bg-mundo-dourado-quente text-sm font-medium"
                  >
                    Abrir ThinkDiffusion
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">2.</span>
                <div>
                  <p>Escolhe o plano:</p>
                  <ul className="mt-1 space-y-1 text-mundo-muted text-xs">
                    <li><strong>Hobby ($0.99/hora)</strong> — bom para testar (vai custar ~$4-5 total)</li>
                    <li><strong>Pro ($19.99/mes)</strong> — melhor se vais usar regularmente</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">3.</span>
                <div>
                  <p>No dashboard, clica <strong>"Launch"</strong> e selecciona <strong>"Kohya SS"</strong>.</p>
                  <p className="text-xs text-mundo-muted mt-1">
                    Escolhe uma maquina com RTX 3090 ou melhor (24GB+ VRAM). Aguarda 1-3 minutos ate abrir.
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => markDone(1)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — Kohya SS aberto
            </button>
          </div>
        )}

        {/* ─── STEP 2: Upload dataset ─── */}
        {currentStep === 2 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">2. Upload do Dataset</h2>

            <div className="bg-mundo-bg rounded-lg p-4">
              <p className="text-sm text-mundo-creme-suave mb-3">
                O dataset ja esta preparado: <strong>59 imagens + 59 captions</strong>, tudo dentro de um ZIP.
              </p>
              <p className="text-sm text-mundo-creme-suave mb-3">
                Primeiro, descarrega o ZIP para o teu computador:
              </p>
              <a
                href="/api/admin/courses/download-dataset"
                download="seteveus-dataset.zip"
                className="inline-block px-4 py-2 bg-mundo-dourado text-mundo-bg rounded hover:bg-mundo-dourado-quente text-sm font-medium"
              >
                Descarregar dataset ZIP (69MB)
              </a>
            </div>

            <div className="space-y-3 text-sm text-mundo-creme-suave">
              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">1.</span>
                <div>
                  <p>No Kohya SS, clica no <strong>icone de pasta</strong> (File Browser) no lado esquerdo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">2.</span>
                <div>
                  <p>Navega ate <code className="text-mundo-dourado">/workspace/</code></p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">3.</span>
                <div>
                  <p>Faz <strong>upload do ZIP</strong> que descarregaste.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">4.</span>
                <div>
                  <p>Abre o <strong>terminal</strong> no ThinkDiffusion e escreve:</p>
                  <div className="bg-mundo-bg rounded p-3 mt-2 flex items-center justify-between">
                    <code className="text-mundo-dourado text-xs">cd /workspace && unzip seteveus-dataset.zip</code>
                    <CopyButton text="cd /workspace && unzip seteveus-dataset.zip" />
                  </div>
                  <p className="text-xs text-mundo-muted mt-2">
                    Isto cria: <code>/workspace/dataset/seteveus/20_seteveus_style/</code> com os 118 ficheiros.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">5.</span>
                <div>
                  <p>Verifica que o modelo SDXL existe. No terminal:</p>
                  <div className="bg-mundo-bg rounded p-3 mt-2 flex items-center justify-between">
                    <code className="text-mundo-dourado text-xs break-all">ls /workspace/models/sd_xl_base_1.0.safetensors || (mkdir -p /workspace/models && cd /workspace/models && wget -q https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors)</code>
                    <CopyButton text={'ls /workspace/models/sd_xl_base_1.0.safetensors || (mkdir -p /workspace/models && cd /workspace/models && wget -q https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors)'} />
                  </div>
                  <p className="text-xs text-mundo-muted mt-2">
                    Se o modelo nao existir, descarrega automaticamente (~6.5GB, demora uns minutos).
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => markDone(2)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — Dataset e modelo prontos
            </button>
          </div>
        )}

        {/* ─── STEP 3: Configure training ─── */}
        {currentStep === 3 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">3. Configurar o Treino</h2>
            <p className="text-sm text-mundo-muted mb-4">
              No Kohya SS, vai ao separador <strong>"LoRA"</strong>. Copia cada valor exactamente como esta.
              Usa o botao "Copiar" ao lado de cada valor.
            </p>

            <ConfigTable title="Source Model" values={CONFIG.sourceModel} />
            <ConfigTable title="Folders" values={CONFIG.folders} />

            <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 text-xs text-yellow-300">
              O "Training images folder" aponta para <code>/workspace/dataset/seteveus</code> (NAO para a subpasta 20_seteveus_style).
              O Kohya le as subpastas automaticamente.
            </div>

            <ConfigTable title="Training Parameters" values={CONFIG.training} />
            <ConfigTable title="Optimizer" values={CONFIG.optimizer} />
            <ConfigTable title="Network (LoRA)" values={CONFIG.network} />
            <ConfigTable title="Sample Images" values={CONFIG.sample} />

            <button onClick={() => markDone(3)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — Tudo configurado
            </button>
          </div>
        )}

        {/* ─── STEP 4: Train ─── */}
        {currentStep === 4 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">4. Treinar</h2>

            <div className="space-y-3 text-sm text-mundo-creme-suave">
              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">1.</span>
                <p>Revisa tudo e clica <strong>"Start Training"</strong> no Kohya SS.</p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">2.</span>
                <div>
                  <p>Espera 2-4 horas. O terminal mostra o progresso.</p>
                  <div className="bg-mundo-bg rounded-lg p-4 mt-2 text-xs text-mundo-muted space-y-1">
                    <p>Tempo estimado:</p>
                    <p>RTX 3090 → ~3-4 horas</p>
                    <p>RTX 4090 → ~2-3 horas</p>
                    <p>A100 → ~1.5-2 horas</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">3.</span>
                <div>
                  <p>Monitoriza o <strong>loss</strong> no terminal:</p>
                  <div className="bg-mundo-bg rounded-lg p-4 mt-2 text-xs space-y-1">
                    <p className="text-green-400">0.06 - 0.10 = Bom</p>
                    <p className="text-yellow-400">Abaixo de 0.04 = Possivel overfitting</p>
                    <p className="text-red-400">Acima de 0.12 = Learning rate muito baixo</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">4.</span>
                <div>
                  <p>Quando acabar, tera em <code>/workspace/output/</code>:</p>
                  <div className="bg-mundo-bg rounded p-3 mt-2 text-xs text-mundo-muted font-mono space-y-0.5">
                    <p>seteveus_style.safetensors <span className="text-mundo-creme-suave">(ultimo epoch)</span></p>
                    <p>seteveus_style-000005.safetensors</p>
                    <p>seteveus_style-000010.safetensors</p>
                    <p>seteveus_style-000015.safetensors</p>
                    <p>seteveus_style-000020.safetensors</p>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => markDone(4)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — Treino completo
            </button>
          </div>
        )}

        {/* ─── STEP 5: Test in ComfyUI ─── */}
        {currentStep === 5 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">5. Testar no ComfyUI</h2>

            <div className="space-y-3 text-sm text-mundo-creme-suave">
              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">1.</span>
                <p>No ThinkDiffusion, lanca o <strong>ComfyUI</strong> (nao o Kohya SS).</p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">2.</span>
                <div>
                  <p>No terminal do ComfyUI, copia o LoRA para a pasta certa:</p>
                  <div className="bg-mundo-bg rounded p-3 mt-2 flex items-center justify-between">
                    <code className="text-mundo-dourado text-xs">cp /workspace/output/seteveus_style.safetensors /workspace/ComfyUI/models/loras/</code>
                    <CopyButton text="cp /workspace/output/seteveus_style.safetensors /workspace/ComfyUI/models/loras/" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">3.</span>
                <p>No ComfyUI, importa o workflow de teste (Menu → Load → cola o JSON abaixo).</p>
              </div>
            </div>

            {/* Test workflow download */}
            <div className="bg-mundo-bg rounded-lg p-4">
              <p className="text-xs text-mundo-muted mb-2">Workflow de teste (arrasta para o ComfyUI):</p>
              <a
                href="/api/admin/courses/download-lora-workflow"
                download="comfyui-test-workflow.json"
                className="inline-block px-4 py-2 bg-mundo-violeta text-white rounded hover:bg-mundo-violeta/80 text-sm"
              >
                Descarregar workflow JSON
              </a>
            </div>

            {/* Test prompts */}
            <div>
              <p className="text-xs text-mundo-muted uppercase mb-3">Prompts de teste — copia e cola no ComfyUI</p>
              {TEST_PROMPTS.map((tp, i) => (
                <div key={i} className="bg-mundo-bg rounded-lg p-4 mb-3">
                  <p className="text-sm text-white mb-2">{tp.name}</p>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-green-400 flex-1 break-all">{tp.positive}</p>
                      <CopyButton text={tp.positive} label="Copiar +" />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-red-400 flex-1 break-all">{tp.negative}</p>
                      <CopyButton text={tp.negative} label="Copiar -" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strength guide */}
            <div className="bg-mundo-bg rounded-lg p-4 text-xs space-y-1">
              <p className="text-mundo-muted uppercase mb-2">Forca do LoRA</p>
              <p><span className="text-mundo-muted">0.5-0.6</span> — Influencia subtil</p>
              <p><span className="text-mundo-dourado">0.7-0.8</span> — Ideal para producao</p>
              <p><span className="text-red-400">0.9-1.0</span> — Muito forte (pode ficar "queimado")</p>
              <p className="text-mundo-muted mt-2">
                Normalmente o <strong>epoch 10-15</strong> e o melhor. O epoch 20 pode ter overfitting.
              </p>
            </div>

            <button onClick={() => markDone(5)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — Testes OK
            </button>
          </div>
        )}

        {/* ─── STEP 6: Save ─── */}
        {currentStep === 6 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">6. Guardar o LoRA</h2>

            <div className="space-y-3 text-sm text-mundo-creme-suave">
              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">1.</span>
                <div>
                  <p>No File Browser do ThinkDiffusion, vai a <code>/workspace/output/</code></p>
                  <p className="text-xs text-mundo-muted mt-1">
                    Descarrega o <code>.safetensors</code> do epoch que ficou melhor nos testes (normalmente epoch 10 ou 15).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">2.</span>
                <div>
                  <p>Guarda o ficheiro no teu OneDrive ou computador.</p>
                  <p className="text-xs text-mundo-muted mt-1">
                    Renomeia para <code>seteveus_style.safetensors</code> se necessario.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-mundo-dourado font-mono w-6 shrink-0">3.</span>
                <div>
                  <p>Da proxima vez que usares o ThinkDiffusion (para gerar imagens ou videos), o LoRA ja esta la em <code>/workspace/ComfyUI/models/loras/</code>.</p>
                  <p className="text-xs text-mundo-muted mt-1">
                    Se lancares uma nova maquina, copia o ficheiro novamente para a pasta de loras.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-green-300 font-medium mb-2">Proximo passo</p>
              <p className="text-xs text-green-400/80">
                Com o LoRA treinado, vai a <strong>/admin/cursos/youtube</strong>, configura o URL do ComfyUI e o nome do LoRA
                (<code>seteveus_style.safetensors</code>), e as imagens sao geradas automaticamente no estilo do Mundo dos Veus.
              </p>
              <Link href="/admin/cursos/youtube"
                className="inline-block mt-3 px-4 py-2 bg-mundo-dourado text-mundo-bg rounded hover:bg-mundo-dourado-quente text-sm font-medium">
                Ir para Videos YouTube
              </Link>
            </div>

            <button onClick={() => markDone(6)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Tudo feito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
