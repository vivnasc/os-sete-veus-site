"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEPS: { num: Step; title: string }[] = [
  { num: 1, title: "Abrir ThinkDiffusion" },
  { num: 2, title: "Upload das imagens" },
  { num: 3, title: "Configurar" },
  { num: 4, title: "Treinar" },
  { num: 5, title: "Testar" },
  { num: 6, title: "Guardar" },
];

const CONFIG = {
  sourceModel: {
    "Model type": "SDXL",
    "Pretrained model": "sd_xl_base_1.0.safetensors",
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
    name: "Territorio novo",
    positive: "seteveus_style, vast dark ocean with golden light reflecting on water surface, deep navy blue sky, single small boat, oil painting style, moody atmospheric, editorial poetic illustration",
    negative: "bright, colorful, cartoon, text, watermark, realistic face",
  },
];

function CopyBtn({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`text-xs px-2 py-0.5 rounded shrink-0 transition-colors ${
        copied ? "bg-green-800/40 text-green-300" : "bg-mundo-bg text-mundo-muted hover:text-mundo-creme"
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
              <CopyBtn text={val} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Instruction({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-mundo-dourado font-mono w-6 shrink-0 text-sm">{num}.</span>
      <div className="text-sm text-mundo-creme-suave">{children}</div>
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
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin" className="text-mundo-muted hover:text-mundo-creme text-sm">HUB</Link>
          <span className="text-mundo-border">/</span>
          <h1 className="font-serif text-2xl text-white">Treinar LoRA</h1>
        </div>
        <p className="text-mundo-muted text-sm mb-8">
          6 passos. Tudo pelo browser. Sem terminal. ~$4-5 no total.
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-8">
          {STEPS.map((s) => (
            <button key={s.num} onClick={() => setCurrentStep(s.num)}
              className={`flex-1 py-2 px-1 rounded text-xs text-center transition-colors ${
                currentStep === s.num
                  ? "bg-mundo-dourado text-mundo-bg font-medium"
                  : completedSteps.has(s.num)
                  ? "bg-green-800/40 text-green-300"
                  : "bg-mundo-bg-surface text-mundo-muted"
              }`}>
              {completedSteps.has(s.num) ? "OK " : ""}{s.num}. {s.title}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* STEP 1 */}
        {/* ═══════════════════════════════════════════════════════ */}
        {currentStep === 1 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">1. Abrir ThinkDiffusion</h2>

            <div className="space-y-3">
              <Instruction num={1}>
                <p>Abre o ThinkDiffusion no browser:</p>
                <a href="https://www.thinkdiffusion.com" target="_blank" rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-mundo-dourado text-mundo-bg rounded hover:bg-mundo-dourado-quente text-sm font-medium">
                  Abrir ThinkDiffusion
                </a>
              </Instruction>

              <Instruction num={2}>
                <p>Cria conta ou faz login. Escolhe o plano <strong>Hobby ($0.99/hora)</strong>.</p>
                <p className="text-xs text-mundo-muted mt-1">O treino todo custa ~$4-5.</p>
              </Instruction>

              <Instruction num={3}>
                <div>
                  <p>No dashboard, clica <strong>"Launch"</strong>.</p>
                  <p className="mt-1">Selecciona <strong>"Kohya SS"</strong> na lista de aplicacoes.</p>
                  <p className="mt-1">Escolhe uma maquina com <strong>RTX 3090</strong> ou melhor.</p>
                  <p className="text-xs text-mundo-muted mt-2">Abre num separador novo do browser. Espera 1-3 minutos ate aparecer a interface.</p>
                </div>
              </Instruction>
            </div>

            <button onClick={() => markDone(1)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — Kohya SS esta aberto
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* STEP 2 */}
        {/* ═══════════════════════════════════════════════════════ */}
        {currentStep === 2 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">2. Upload das imagens</h2>

            <div className="bg-mundo-bg rounded-lg p-4 mb-2">
              <p className="text-sm text-mundo-creme-suave mb-3">
                O dataset tem <strong>59 imagens + 59 descricoes</strong> (118 ficheiros). Primeiro descarrega tudo para o teu computador:
              </p>
              <a href="/downloads/seteveus-dataset.zip" download="seteveus-dataset.zip"
                className="inline-block px-4 py-2 bg-mundo-dourado text-mundo-bg rounded hover:bg-mundo-dourado-quente text-sm font-medium">
                Descarregar dataset (69MB ZIP)
              </a>
              <p className="text-xs text-mundo-muted mt-2">Guarda no ambiente de trabalho. Depois descompacta (botao direito → "Extrair aqui").</p>
            </div>

            <div className="space-y-3">
              <Instruction num={1}>
                <p>Descompacta o ZIP no teu computador. Vais ter uma pasta:</p>
                <code className="text-xs text-mundo-dourado block mt-1">dataset / seteveus / 20_seteveus_style / (118 ficheiros)</code>
              </Instruction>

              <Instruction num={2}>
                <div>
                  <p>No ThinkDiffusion (Kohya SS), procura o <strong>File Browser</strong>.</p>
                  <p className="text-xs text-mundo-muted mt-1">
                    E o icone de pasta no lado esquerdo. Se nao vires, procura um separador que diga "Files" ou "File Manager".
                  </p>
                </div>
              </Instruction>

              <Instruction num={3}>
                <div>
                  <p>No File Browser, cria esta estrutura de pastas (botao direito → "New Folder"):</p>
                  <div className="bg-mundo-bg rounded p-3 mt-2 text-xs font-mono text-mundo-dourado space-y-0.5">
                    <p>/workspace/</p>
                    <p>&nbsp;&nbsp;dataset/</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;seteveus/</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20_seteveus_style/</p>
                  </div>
                  <p className="text-xs text-mundo-muted mt-2">
                    O nome "20_seteveus_style" e importante — nao mudes.
                  </p>
                </div>
              </Instruction>

              <Instruction num={4}>
                <div>
                  <p>Entra na pasta <code className="text-mundo-dourado">20_seteveus_style</code> no File Browser.</p>
                  <p className="mt-1"><strong>Arrasta todos os 118 ficheiros</strong> (.png + .txt) da pasta do teu computador para dentro do File Browser.</p>
                  <p className="text-xs text-mundo-muted mt-2">
                    Podes seleccionar tudo com Ctrl+A na pasta do computador e arrastar para o browser.
                    O upload demora uns minutos (69MB).
                  </p>
                </div>
              </Instruction>

              <Instruction num={5}>
                <div>
                  <p>Confirma que ficaram <strong>118 ficheiros</strong> dentro de <code className="text-mundo-dourado">20_seteveus_style</code>.</p>
                  <p className="text-xs text-mundo-muted mt-1">59 imagens .png + 59 descricoes .txt</p>
                </div>
              </Instruction>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 text-xs text-yellow-300 mt-2">
              <strong>Nota sobre o modelo SDXL:</strong> O ThinkDiffusion normalmente ja tem o modelo SDXL 1.0 pre-instalado.
              Se no passo seguinte o Kohya SS nao encontrar o modelo, procura na lista de modelos disponiveis dentro da interface
              e selecciona "sd_xl_base_1.0" ou "SDXL 1.0".
            </div>

            <button onClick={() => markDone(2)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — 118 ficheiros carregados
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* STEP 3 */}
        {/* ═══════════════════════════════════════════════════════ */}
        {currentStep === 3 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">3. Configurar o Treino</h2>
            <p className="text-sm text-mundo-muted mb-2">
              No Kohya SS, vai ao separador <strong>"LoRA"</strong>. Preenche cada campo com os valores abaixo.
              Usa o botao "Copiar" para nao errar.
            </p>

            <ConfigTable title="Source Model" values={CONFIG.sourceModel} />
            <ConfigTable title="Folders" values={CONFIG.folders} />

            <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 text-xs text-yellow-300">
              "Training images folder" aponta para <code>/workspace/dataset/seteveus</code> — a pasta MAE, nao a subpasta.
              O Kohya le a subpasta automaticamente.
            </div>

            <ConfigTable title="Training Parameters" values={CONFIG.training} />
            <ConfigTable title="Optimizer" values={CONFIG.optimizer} />
            <ConfigTable title="Network (LoRA)" values={CONFIG.network} />
            <ConfigTable title="Sample Images (opcional)" values={CONFIG.sample} />

            <button onClick={() => markDone(3)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — Tudo preenchido
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* STEP 4 */}
        {/* ═══════════════════════════════════════════════════════ */}
        {currentStep === 4 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">4. Treinar</h2>

            <div className="space-y-3">
              <Instruction num={1}>
                <p>Clica <strong>"Start Training"</strong> no Kohya SS.</p>
              </Instruction>

              <Instruction num={2}>
                <div>
                  <p>Espera <strong>2-4 horas</strong>. Podes deixar o separador aberto e ir fazer outra coisa.</p>
                  <div className="bg-mundo-bg rounded-lg p-3 mt-2 text-xs text-mundo-muted space-y-0.5">
                    <p>RTX 3090 → ~3-4 horas</p>
                    <p>RTX 4090 → ~2-3 horas</p>
                    <p>A100 → ~1.5-2 horas</p>
                  </div>
                </div>
              </Instruction>

              <Instruction num={3}>
                <div>
                  <p>A interface mostra o progresso. Quando vires <strong>"Training complete"</strong>, está feito.</p>
                  <div className="bg-mundo-bg rounded-lg p-3 mt-2 text-xs space-y-1">
                    <p className="text-mundo-muted">O número "loss" deve estar entre:</p>
                    <p className="text-green-400">0.06 - 0.10 = Bom</p>
                    <p className="text-yellow-400">Abaixo de 0.04 = Pode estar a decorar (não generaliza)</p>
                    <p className="text-red-400">Acima de 0.12 = Nao esta a aprender bem</p>
                  </div>
                </div>
              </Instruction>

              <Instruction num={4}>
                <div>
                  <p>O resultado fica em <code className="text-mundo-dourado">/workspace/output/</code>:</p>
                  <div className="bg-mundo-bg rounded p-3 mt-2 text-xs text-mundo-muted font-mono space-y-0.5">
                    <p>seteveus_style.safetensors <span className="text-mundo-creme-suave">(ultimo)</span></p>
                    <p>seteveus_style-000005.safetensors <span className="text-mundo-creme-suave">(epoch 5)</span></p>
                    <p>seteveus_style-000010.safetensors <span className="text-mundo-creme-suave">(epoch 10)</span></p>
                    <p>seteveus_style-000015.safetensors <span className="text-mundo-creme-suave">(epoch 15)</span></p>
                    <p>seteveus_style-000020.safetensors <span className="text-mundo-creme-suave">(epoch 20)</span></p>
                  </div>
                </div>
              </Instruction>
            </div>

            <button onClick={() => markDone(4)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — Treino completo
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* STEP 5 */}
        {/* ═══════════════════════════════════════════════════════ */}
        {currentStep === 5 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">5. Testar no ComfyUI</h2>

            <div className="space-y-3">
              <Instruction num={1}>
                <div>
                  <p>Volta ao dashboard do ThinkDiffusion e lanca o <strong>ComfyUI</strong> (aplicacao diferente do Kohya SS).</p>
                  <p className="text-xs text-mundo-muted mt-1">Se ja tiveres o ComfyUI aberto, usa esse.</p>
                </div>
              </Instruction>

              <Instruction num={2}>
                <div>
                  <p>No File Browser do ComfyUI, copia o ficheiro do LoRA para a pasta de loras:</p>
                  <div className="bg-mundo-bg rounded p-3 mt-2 text-xs space-y-1">
                    <p className="text-mundo-muted">De:</p>
                    <p className="text-mundo-dourado font-mono">/workspace/output/seteveus_style.safetensors</p>
                    <p className="text-mundo-muted mt-1">Para:</p>
                    <p className="text-mundo-dourado font-mono">/workspace/ComfyUI/models/loras/</p>
                  </div>
                  <p className="text-xs text-mundo-muted mt-2">
                    No File Browser: selecciona o ficheiro, botao direito → Copy, navega ate a pasta loras, botao direito → Paste.
                  </p>
                </div>
              </Instruction>

              <Instruction num={3}>
                <div>
                  <p>No ComfyUI, importa o workflow de teste:</p>
                  <a href="/downloads/comfyui-test-workflow.json" download="comfyui-test-workflow.json"
                    className="inline-block mt-2 px-4 py-2 bg-mundo-violeta text-white rounded hover:bg-mundo-violeta/80 text-sm">
                    Descarregar workflow de teste
                  </a>
                  <p className="text-xs text-mundo-muted mt-2">
                    Descarrega o ficheiro e depois arrasta-o para cima da interface do ComfyUI. Ele carrega automaticamente.
                  </p>
                </div>
              </Instruction>

              <Instruction num={4}>
                <div>
                  <p>Clica <strong>"Queue Prompt"</strong> no ComfyUI. Deve gerar uma imagem no estilo Sete Veus.</p>
                  <p className="text-xs text-mundo-muted mt-1">Se a imagem sair bem, o LoRA funciona.</p>
                </div>
              </Instruction>
            </div>

            {/* Extra test prompts */}
            <div className="mt-4">
              <p className="text-xs text-mundo-muted uppercase mb-3">Testa mais prompts (copia o texto positivo para o no CLIPTextEncode do ComfyUI)</p>
              {TEST_PROMPTS.map((tp, i) => (
                <div key={i} className="bg-mundo-bg rounded-lg p-4 mb-3">
                  <p className="text-sm text-white mb-2">{tp.name}</p>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-xs text-green-400 flex-1">{tp.positive}</p>
                    <CopyBtn text={tp.positive} label="Copiar" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-mundo-bg rounded-lg p-4 text-xs space-y-1">
              <p className="text-mundo-muted uppercase mb-2">Qual epoch escolher?</p>
              <p className="text-mundo-creme-suave">Experimenta gerar com <strong>epoch 10</strong> e <strong>epoch 15</strong>. Normalmente um deles e o melhor.</p>
              <p className="text-mundo-muted mt-1">Se as imagens parecerem muito iguais ao dataset → usa epoch mais baixo (10).</p>
              <p className="text-mundo-muted">Se nao tiver estilo suficiente → usa epoch mais alto (15 ou 20).</p>
            </div>

            <div className="bg-mundo-bg rounded-lg p-4 text-xs space-y-1">
              <p className="text-mundo-muted uppercase mb-2">Forca do LoRA (no no LoraLoader)</p>
              <p><span className="text-mundo-muted">0.5-0.6</span> — Subtil</p>
              <p><span className="text-mundo-dourado">0.7-0.8</span> — Ideal</p>
              <p><span className="text-red-400">0.9-1.0</span> — Muito forte</p>
            </div>

            <button onClick={() => markDone(5)}
              className="mt-4 px-6 py-2 bg-green-800/40 text-green-300 rounded hover:bg-green-800/60">
              Feito — O LoRA funciona
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* STEP 6 */}
        {/* ═══════════════════════════════════════════════════════ */}
        {currentStep === 6 && (
          <div className="bg-mundo-bg-surface rounded-xl p-6 space-y-4">
            <h2 className="text-lg text-white">6. Guardar o LoRA</h2>

            <div className="space-y-3">
              <Instruction num={1}>
                <div>
                  <p>No File Browser do ThinkDiffusion, vai a <code className="text-mundo-dourado">/workspace/output/</code></p>
                  <p className="mt-1">Selecciona o <code className="text-mundo-dourado">.safetensors</code> do epoch que escolheste.</p>
                  <p className="mt-1">Clica com o botao direito → <strong>Download</strong>. Guarda no teu OneDrive ou computador.</p>
                </div>
              </Instruction>

              <Instruction num={2}>
                <div>
                  <p>O LoRA ja esta na pasta <code className="text-mundo-dourado">/workspace/ComfyUI/models/loras/</code> do ThinkDiffusion.</p>
                  <p className="text-xs text-mundo-muted mt-1">
                    Da proxima vez que lancares o ComfyUI no ThinkDiffusion, o LoRA ja esta disponivel.
                  </p>
                </div>
              </Instruction>
            </div>

            <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-green-300 font-medium mb-2">Proximo passo</p>
              <p className="text-xs text-green-400/80">
                Vai a <strong>Videos YouTube</strong>. No campo "LoRA Model Name", escreve
                <code className="text-green-300 mx-1">seteveus_style.safetensors</code>
                e as imagens geradas pelo ComfyUI ficam no estilo do Mundo dos Veus.
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
