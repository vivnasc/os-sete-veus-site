"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

const SONS = [
  {
    grupo: "Transições",
    items: [
      {
        ficheiro: "sino-abertura.mp3",
        nome: "Sino de Abertura",
        desc: "Início de cada prática",
        texto: "Single Tibetan singing bowl strike, resonant and warm, slowly fading into silence",
        duracao: 8,
      },
      {
        ficheiro: "sino-fecho.mp3",
        nome: "Sino de Fecho",
        desc: "Fim de cada prática",
        texto: "Soft Tibetan bowl gong, gentle fade in then slow decay into complete silence",
        duracao: 10,
      },
      {
        ficheiro: "transicao-suspiro.mp3",
        nome: "Suspiro",
        desc: "Entre secções",
        texto: "Soft gentle exhale breath sound, peaceful, barely audible, like wind through silk",
        duracao: 5,
      },
    ],
  },
  {
    grupo: "Drones por Véu",
    items: [
      {
        ficheiro: "drone-ilusao.mp3",
        nome: "Véu 1 — Ilusão",
        desc: "Etéreo, onírico",
        texto: "Ethereal soft drone, dreamlike haze, gentle high overtones, barely there, meditative",
        duracao: 22,
      },
      {
        ficheiro: "drone-medo.mp3",
        nome: "Véu 2 — Medo",
        desc: "Quente, seguro",
        texto: "Warm low drone, steady grounding hum, reassuring and gentle, like a heartbeat slowing",
        duracao: 22,
      },
      {
        ficheiro: "drone-culpa.mp3",
        nome: "Véu 3 — Culpa",
        desc: "Suave, perdoador",
        texto: "Soft warm tonal drone, forgiving and tender, like sunlight through thin curtains",
        duracao: 22,
      },
      {
        ficheiro: "drone-identidade.mp3",
        nome: "Véu 4 — Identidade",
        desc: "Enraizado, sólido",
        texto: "Deep earthy resonant drone, grounding, still, like stone and root, meditative",
        duracao: 22,
      },
      {
        ficheiro: "drone-controlo.mp3",
        nome: "Véu 5 — Controlo",
        desc: "Fluido, libertador",
        texto: "Flowing water-like ambient drone, fluid, releasing, gentle movement, meditative",
        duracao: 22,
      },
      {
        ficheiro: "drone-desejo.mp3",
        nome: "Véu 6 — Desejo",
        desc: "Quente, dourado",
        texto: "Warm glowing ambient hum, golden tones, soft and intimate, like candlelight as sound",
        duracao: 22,
      },
      {
        ficheiro: "drone-separacao.mp3",
        nome: "Véu 7 — Separação",
        desc: "Regresso, paz",
        texto: "Tender ambient drone, sense of coming home, gentle and whole, peaceful resolution",
        duracao: 22,
      },
    ],
  },
  {
    grupo: "Natureza",
    items: [
      {
        ficheiro: "chuva-suave.mp3",
        nome: "Chuva Suave",
        desc: "Escrita guiada / limpeza",
        texto: "Very soft gentle rain falling on leaves, peaceful, steady, quiet, meditative ambience",
        duracao: 22,
      },
      {
        ficheiro: "vento-floresta.mp3",
        nome: "Vento na Floresta",
        desc: "Meditação",
        texto: "Gentle breeze through a forest, soft rustling leaves, peaceful, distant birds, quiet",
        duracao: 22,
      },
      {
        ficheiro: "agua-riacho.mp3",
        nome: "Água — Riacho",
        desc: "Antes de dormir",
        texto: "Soft trickling stream, gentle water flowing over smooth stones, peaceful, quiet",
        duracao: 22,
      },
    ],
  },
];

type Estado = "idle" | "a-gerar" | "feito" | "erro";

export default function SonsPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [apiKey, setApiKey] = useState("");
  const [estados, setEstados] = useState<Record<string, Estado>>({});
  const [erros, setErros] = useState<Record<string, string>>({});
  const [aGerarTodos, setAGerarTodos] = useState(false);

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  async function gerarSom(item: (typeof SONS)[0]["items"][0]) {
    if (!apiKey.trim()) {
      alert("Coloca a tua API key do ElevenLabs primeiro.");
      return;
    }

    setEstados((e) => ({ ...e, [item.ficheiro]: "a-gerar" }));
    setErros((e) => ({ ...e, [item.ficheiro]: "" }));

    try {
      const res = await fetch("/api/admin/gerar-som", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: item.texto,
          duracao: item.duracao,
          apiKey: apiKey.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.erro || "Erro desconhecido");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = item.ficheiro;
      a.click();
      URL.revokeObjectURL(url);

      setEstados((e) => ({ ...e, [item.ficheiro]: "feito" }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro";
      setEstados((e) => ({ ...e, [item.ficheiro]: "erro" }));
      setErros((e) => ({ ...e, [item.ficheiro]: msg }));
    }
  }

  async function gerarTodos() {
    if (!apiKey.trim()) {
      alert("Coloca a tua API key do ElevenLabs primeiro.");
      return;
    }
    setAGerarTodos(true);
    const todos = SONS.flatMap((g) => g.items);
    for (const item of todos) {
      await gerarSom(item);
      // pausa entre chamadas
      await new Promise((r) => setTimeout(r, 2000));
    }
    setAGerarTodos(false);
  }

  const totalFeitos = Object.values(estados).filter((e) => e === "feito").length;
  const total = SONS.flatMap((g) => g.items).length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link
            href="/admin"
            className="mb-4 inline-block text-sm text-sage hover:text-forest"
          >
            ← Painel
          </Link>
          <h1 className="font-display text-3xl text-forest">
            Gerar Sons — ElevenLabs
          </h1>
          <p className="mt-1 text-sage">
            Os sons são descarregados directamente para o teu computador. Depois
            mistura-os com os áudios no CapCut ou Audacity.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* API Key */}
        <div className="rounded-xl border border-sage/20 bg-white p-6">
          <label className="block text-sm font-medium text-forest mb-2">
            API Key do ElevenLabs
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk_..."
            className="w-full rounded-lg border border-sage/30 bg-cream px-4 py-3 text-sm text-forest placeholder:text-sage/50 focus:outline-none focus:ring-2 focus:ring-sage/30"
          />
          <p className="mt-2 text-xs text-sage">
            A key não é guardada — só é usada nesta sessão.
          </p>
        </div>

        {/* Gerar todos */}
        <div className="flex items-center justify-between rounded-xl border border-sage/20 bg-white p-6">
          <div>
            <p className="font-medium text-forest">Gerar todos os sons</p>
            <p className="text-sm text-sage">
              {totalFeitos}/{total} descarregados
            </p>
          </div>
          <button
            onClick={gerarTodos}
            disabled={aGerarTodos || !apiKey.trim()}
            className="rounded-lg bg-forest px-6 py-3 text-sm text-white transition hover:bg-forest/80 disabled:opacity-40"
          >
            {aGerarTodos ? "A gerar..." : "Gerar todos"}
          </button>
        </div>

        {/* Sons por grupo */}
        {SONS.map((grupo) => (
          <div key={grupo.grupo}>
            <h2 className="mb-4 font-display text-xl text-forest">
              {grupo.grupo}
            </h2>
            <div className="space-y-3">
              {grupo.items.map((item) => {
                const estado = estados[item.ficheiro] || "idle";
                const erro = erros[item.ficheiro];

                return (
                  <div
                    key={item.ficheiro}
                    className="flex items-center justify-between rounded-lg border border-sage/20 bg-white px-5 py-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-forest">{item.nome}</p>
                      <p className="text-sm text-sage">{item.desc}</p>
                      <p className="mt-0.5 text-xs text-sage/60 font-mono">
                        {item.ficheiro} · {item.duracao}s
                      </p>
                      {erro && (
                        <p className="mt-1 text-xs text-red-500">{erro}</p>
                      )}
                    </div>
                    <button
                      onClick={() => gerarSom(item)}
                      disabled={
                        estado === "a-gerar" || aGerarTodos || !apiKey.trim()
                      }
                      className={`ml-4 shrink-0 rounded-lg px-4 py-2 text-sm transition ${
                        estado === "feito"
                          ? "bg-sage/20 text-sage cursor-default"
                          : estado === "erro"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-forest text-white hover:bg-forest/80"
                      } disabled:opacity-40`}
                    >
                      {estado === "a-gerar"
                        ? "A gerar..."
                        : estado === "feito"
                        ? "Descarregado"
                        : estado === "erro"
                        ? "Tentar de novo"
                        : "Gerar"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Instrucoes */}
        <div className="rounded-xl border border-sage/20 bg-white/50 p-6 text-sm text-sage space-y-2">
          <p className="font-medium text-forest">Como usar os sons:</p>
          <p>1. Gera e descarrega os sons que queres.</p>
          <p>2. Abre o CapCut (web ou app) ou Audacity.</p>
          <p>3. Importa o teu áudio original + o drone ou sino.</p>
          <p>4. Coloca o drone em fundo, volume a ~15%. O sino no início e fim.</p>
          <p>5. Exporta como MP3.</p>
        </div>
      </div>
    </div>
  );
}
