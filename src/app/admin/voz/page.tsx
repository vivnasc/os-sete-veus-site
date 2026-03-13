"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { ALL_CITACOES } from "@/data/citacoes-partilha";
import { chapters as ilusaoChapters } from "@/data/ebook";
import { chapters as medoChapters } from "@/data/espelho-medo";
import { chapters as culpaChapters } from "@/data/espelho-culpa";
import { chapters as identidadeChapters } from "@/data/espelho-identidade";
import { chapters as controloChapters } from "@/data/espelho-controlo";
import { chapters as desejoChapters } from "@/data/espelho-desejo";
import { chapters as separacaoChapters } from "@/data/espelho-separacao";
import { INTROS_VEUS } from "@/data/intros-veus";
import {
  TEASERS_ESPELHOS,
  TRAILER_JORNADA,
  STORIES_ESPELHOS,
  TEASERS_NOS,
  CHAMADAS_ACCAO,
} from "@/data/marketing-audio";
import { REELS_VOZ, CARROSSEIS_VOZ, EDUCATIVOS_VOZ } from "@/data/marketing-reels-audio";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];
const DEFAULT_VOICE_ID = "fnoNuVpfClX7lHKFbyZ2";

// ── Reflexões — lista plana ─────────────────────────────────
const REFLEXOES = [
  { slug: "espelho-ilusao", nome: "Espelho da Ilusão", chapters: ilusaoChapters },
  { slug: "espelho-medo", nome: "Espelho do Medo", chapters: medoChapters },
  { slug: "espelho-culpa", nome: "Espelho da Culpa", chapters: culpaChapters },
  { slug: "espelho-identidade", nome: "Espelho da Identidade", chapters: identidadeChapters },
  { slug: "espelho-controlo", nome: "Espelho do Controlo", chapters: controloChapters },
  { slug: "espelho-desejo", nome: "Espelho do Desejo", chapters: desejoChapters },
  { slug: "espelho-separacao", nome: "Espelho da Separação", chapters: separacaoChapters },
].flatMap(({ slug, nome, chapters }) =>
  chapters.map((cap) => ({
    id: `${slug}-cap-${cap.number}`,
    ficheiro: `reflexao-${slug}-cap-${cap.number}.mp3`,
    nome: `${nome} — Cap. ${cap.number}`,
    texto: `${cap.reflection.prompt}\n\n${cap.reflection.journalQuestion}`,
  }))
);

function slugify(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");
}

type Estado = "idle" | "a-gerar" | "feito" | "erro";
type EstadoUpload = "idle" | "a-enviar" | "enviado" | "erro";
type Aba = "citacoes" | "reflexoes" | "intros" | "teasers" | "trailer" | "stories" | "teasers-nos" | "ctas" | "reels" | "carrosseis" | "educativos";

export default function VozPage() {
  const { user, profile } = useAuth();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [apiKey, setApiKey] = useState("");
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE_ID);
  const [aba, setAba] = useState<Aba>("citacoes");
  const [estados, setEstados] = useState<Record<string, Estado>>({});
  const [erros, setErros] = useState<Record<string, string>>({});
  const [blobs, setBlobs] = useState<Record<string, Blob>>({});
  const [uploadEstados, setUploadEstados] = useState<Record<string, EstadoUpload>>({});
  const [uploadErros, setUploadErros] = useState<Record<string, string>>({});
  const [modelo, setModelo] = useState<"v2" | "v3">("v2");
  const [aGerarTodos, setAGerarTodos] = useState(false);
  const [aEnviarTodos, setAEnviarTodos] = useState(false);
  const [autoUpload, setAutoUpload] = useState(false);
  const [progresso, setProgresso] = useState({ atual: 0, total: 0 });
  const [erroGlobal, setErroGlobal] = useState("");
  const deveParar = useRef(false);

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  async function gerarVoz(id: string, ficheiro: string, texto: string, semDownload = false) {
    if (!apiKey.trim()) {
      alert("Coloca a tua API key do ElevenLabs primeiro.");
      return;
    }
    if (!texto.trim()) {
      alert("Este item não tem texto — preenche primeiro.");
      return;
    }

    setEstados((e) => ({ ...e, [id]: "a-gerar" }));
    setErros((e) => ({ ...e, [id]: "" }));
    setErroGlobal("");

    try {
      const res = await fetch("/api/admin/gerar-voz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto, voiceId: voiceId.trim(), apiKey: apiKey.trim(), model: modelo }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ erro: `HTTP ${res.status}` }));
        throw new Error(data.erro || `Erro ${res.status}`);
      }

      const blob = await res.blob();
      if (blob.size === 0) throw new Error("ElevenLabs devolveu ficheiro vazio.");

      setBlobs((b) => ({ ...b, [id]: blob }));

      if (autoUpload) {
        // Upload automático — sem download individual
        await uploadAudioBlob(id, ficheiro, blob);
      } else if (!semDownload) {
        // Download individual
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = ficheiro;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setEstados((e) => ({ ...e, [id]: "feito" }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setEstados((e) => ({ ...e, [id]: "erro" }));
      setErros((e) => ({ ...e, [id]: msg }));
      setErroGlobal(msg);
    }
  }

  function itensAba() {
    return aba === "citacoes"
      ? ALL_CITACOES.map((c, i) => ({
          id: `cit-${i}`,
          ficheiro: `citacao-${String(i + 1).padStart(3, "0")}-veu${c.veu}-${c.fonte}.mp3`,
          texto: c.texto,
        }))
      : aba === "reflexoes"
      ? REFLEXOES
      : aba === "intros"
      ? INTROS_VEUS.filter((v) => v.texto.trim()).map((v) => ({
          id: `intro-${v.veu}`,
          ficheiro: `intro-veu-${v.veu}-${slugify(v.nome)}.mp3`,
          texto: v.texto,
        }))
      : aba === "teasers"
      ? TEASERS_ESPELHOS.map((t) => ({ id: `teaser-${t.veu}`, ficheiro: t.ficheiro, texto: t.texto }))
      : aba === "trailer"
      ? [{ id: "trailer", ficheiro: TRAILER_JORNADA.ficheiro, texto: TRAILER_JORNADA.texto }]
      : aba === "stories"
      ? STORIES_ESPELHOS.map((s) => ({ id: `story-${s.veu}`, ficheiro: s.ficheiro, texto: s.texto }))
      : aba === "teasers-nos"
      ? TEASERS_NOS.map((t) => ({ id: `teaser-no-${t.veu}`, ficheiro: t.ficheiro, texto: t.texto }))
      : aba === "reels"
      ? REELS_VOZ.map((r) => ({ id: r.id, ficheiro: r.ficheiro, texto: r.texto }))
      : aba === "carrosseis"
      ? CARROSSEIS_VOZ.map((c) => ({ id: c.id, ficheiro: c.ficheiro, texto: c.texto }))
      : aba === "educativos"
      ? EDUCATIVOS_VOZ.map((e) => ({ id: e.id, ficheiro: e.ficheiro, texto: e.texto }))
      : CHAMADAS_ACCAO.map((c) => ({ id: c.id, ficheiro: c.ficheiro, texto: c.texto }));
  }

  async function gerarTodosAba() {
    if (!apiKey.trim()) {
      alert("Coloca a tua API key do ElevenLabs primeiro.");
      return;
    }
    deveParar.current = false;
    setAGerarTodos(true);

    const itens = itensAba().filter((item) => estados[item.id] !== "feito");
    setProgresso({ atual: 0, total: itens.length });

    for (let i = 0; i < itens.length; i++) {
      if (deveParar.current) break;
      setProgresso({ atual: i, total: itens.length });
      await gerarVoz(itens[i].id, itens[i].ficheiro, itens[i].texto, autoUpload);
      if (i < itens.length - 1) await new Promise((r) => setTimeout(r, 2000));
    }

    setProgresso({ atual: 0, total: 0 });
    setAGerarTodos(false);
  }

  function pararGeracao() {
    deveParar.current = true;
  }

  async function uploadAudioBlob(id: string, ficheiro: string, blob: Blob) {
    setUploadEstados((s) => ({ ...s, [id]: "a-enviar" }));
    setUploadErros((e) => ({ ...e, [id]: "" }));
    const form = new FormData();
    form.append("file", blob, ficheiro);
    form.append("filename", ficheiro);
    try {
      const res = await fetch("/api/admin/upload-audio", { method: "POST", body: form });
      const data = await res.json().catch(() => ({ erro: `HTTP ${res.status}` }));
      if (!res.ok) throw new Error(data.erro || `Erro ${res.status}`);
      setUploadEstados((s) => ({ ...s, [id]: "enviado" }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setUploadEstados((s) => ({ ...s, [id]: "erro" }));
      setUploadErros((e) => ({ ...e, [id]: msg }));
    }
  }

  async function uploadAudio(id: string, ficheiro: string) {
    const blob = blobs[id];
    if (!blob) return;
    await uploadAudioBlob(id, ficheiro, blob);
  }

  async function downloadZip() {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    const itens = itensAba();
    for (const item of itens) {
      const blob = blobs[item.id];
      if (blob) zip.file(item.ficheiro, blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audios-${aba}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function enviarTodosAba() {
    setAEnviarTodos(true);
    const ids = Object.keys(blobs).filter((id) => uploadEstados[id] !== "enviado");
    for (const id of ids) {
      // Derivar ficheiro a partir dos dados da aba actual
      const ficheiro = (() => {
        if (id.startsWith("cit-")) {
          const i = parseInt(id.replace("cit-", ""));
          const c = ALL_CITACOES[i];
          return c ? `citacao-${String(i + 1).padStart(3, "0")}-veu${c.veu}-${c.fonte}.mp3` : null;
        }
        if (id.startsWith("intro-")) {
          const veuNum = parseInt(id.replace("intro-", ""));
          const v = INTROS_VEUS.find((x) => x.veu === veuNum);
          return v ? `intro-veu-${v.veu}-${slugify(v.nome)}.mp3` : null;
        }
        if (id.startsWith("teaser-no-")) {
          const veuNum = parseInt(id.replace("teaser-no-", ""));
          return TEASERS_NOS.find((t) => t.veu === veuNum)?.ficheiro ?? null;
        }
        if (id.startsWith("teaser-")) {
          const veuNum = parseInt(id.replace("teaser-", ""));
          return TEASERS_ESPELHOS.find((t) => t.veu === veuNum)?.ficheiro ?? null;
        }
        if (id.startsWith("story-")) {
          const veuNum = parseInt(id.replace("story-", ""));
          return STORIES_ESPELHOS.find((s) => s.veu === veuNum)?.ficheiro ?? null;
        }
        if (id === "trailer") return TRAILER_JORNADA.ficheiro;
        // reflexoes: id = "espelho-ilusao-cap-1" → ficheiro = "reflexao-espelho-ilusao-cap-1.mp3"
        const r = REFLEXOES.find((x) => x.id === id);
        if (r) return r.ficheiro;
        // reels
        const reel = REELS_VOZ.find((r) => r.id === id);
        if (reel) return reel.ficheiro;
        // carrosseis
        const carousel = CARROSSEIS_VOZ.find((c) => c.id === id);
        if (carousel) return carousel.ficheiro;
        // educativos
        const edu = EDUCATIVOS_VOZ.find((e) => e.id === id);
        if (edu) return edu.ficheiro;
        // ctas
        return CHAMADAS_ACCAO.find((c) => c.id === id)?.ficheiro ?? null;
      })();
      if (!ficheiro) continue;
      await uploadAudio(id, ficheiro);
    }
    setAEnviarTodos(false);
  }

  // ── contagens ────────────────────────────────────────────────
  const citacoesTotal = ALL_CITACOES.length;
  const citacoesFeitas = ALL_CITACOES.filter(
    (_, i) => estados[`cit-${i}`] === "feito"
  ).length;
  const reflexoesTotal = REFLEXOES.length;
  const reflexoesFeitas = REFLEXOES.filter(
    (r) => estados[r.id] === "feito"
  ).length;
  const introsTotal = INTROS_VEUS.length;
  const introsFeitas = INTROS_VEUS.filter(
    (v) => estados[`intro-${v.veu}`] === "feito"
  ).length;
  const teasersTotal = TEASERS_ESPELHOS.length;
  const teasersFeitos = TEASERS_ESPELHOS.filter(
    (t) => estados[`teaser-${t.veu}`] === "feito"
  ).length;
  const storiesTotal = STORIES_ESPELHOS.length;
  const storiesFeitas = STORIES_ESPELHOS.filter(
    (s) => estados[`story-${s.veu}`] === "feito"
  ).length;
  const teasersNosTotal = TEASERS_NOS.length;
  const teasersNosFeitos = TEASERS_NOS.filter(
    (t) => estados[`teaser-no-${t.veu}`] === "feito"
  ).length;
  const ctasTotal = CHAMADAS_ACCAO.length;
  const ctasFeitas = CHAMADAS_ACCAO.filter(
    (c) => estados[c.id] === "feito"
  ).length;
  const reelsTotal = REELS_VOZ.length;
  const reelsFeitos = REELS_VOZ.filter((r) => estados[r.id] === "feito").length;
  const carrosseisTotal = CARROSSEIS_VOZ.length;
  const carrosseisFeitos = CARROSSEIS_VOZ.filter((c) => estados[c.id] === "feito").length;
  const educativosTotal = EDUCATIVOS_VOZ.length;
  const educativosFeitos = EDUCATIVOS_VOZ.filter((e) => estados[e.id] === "feito").length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link href="/admin" className="mb-4 inline-block text-sm text-sage hover:text-forest">
            ← Painel
          </Link>
          <h1 className="font-display text-3xl text-forest">Gerar Voz — ElevenLabs</h1>
          <p className="mt-1 text-sage">
            Clips de voz clonada — citações, reflexões, intros e marketing.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10 space-y-8">
        {/* Erro global */}
        {erroGlobal && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-medium text-red-700 text-sm">Erro ao gerar áudio</p>
            <p className="mt-1 text-sm text-red-600 font-mono break-all">{erroGlobal}</p>
            <div className="mt-3 text-xs text-red-500 space-y-1">
              <p>Verifica:</p>
              <p>· A API key está correcta e tem créditos de TTS</p>
              <p>· O Voice ID pertence à tua conta ElevenLabs</p>
              <p>· O teu plano ElevenLabs inclui Text-to-Speech</p>
            </div>
            <button onClick={() => setErroGlobal("")} className="mt-3 text-xs text-red-400 underline">
              Fechar
            </button>
          </div>
        )}

        {/* Credenciais */}
        <div className="rounded-xl border border-sage/20 bg-white p-6 space-y-4">
          <div>
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
            <p className="mt-1 text-xs text-sage">Não é guardada — só usada nesta sessão.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-forest mb-2">
              Voice ID
            </label>
            <input
              type="text"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              className="w-full rounded-lg border border-sage/30 bg-cream px-4 py-3 text-sm text-forest font-mono focus:outline-none focus:ring-2 focus:ring-sage/30"
            />
          </div>
          {/* Modelo v2/v3 */}
          <div>
            <label className="block text-sm font-medium text-forest mb-2">Modelo</label>
            <div className="flex gap-2">
              {(["v2", "v3"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setModelo(v)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    modelo === v
                      ? "text-white"
                      : "bg-white text-sage border border-sage/20 hover:text-forest"
                  }`}
                  style={modelo === v ? { backgroundColor: "#2d6a4f" } : {}}
                >
                  {v === "v3" ? "v3 (pausas naturais)" : "v2 (multilingual)"}
                </button>
              ))}
            </div>
            {modelo === "v3" && (
              <p className="mt-1 text-xs text-sage">v3 interpreta [pause], [short pause], [long pause] nos textos.</p>
            )}
          </div>
          {/* Toggle upload automático */}
          <div className="flex items-center justify-between rounded-lg border border-sage/20 bg-cream px-4 py-3">
            <div>
              <p className="text-sm font-medium text-forest">Upload automático ao Supabase</p>
              <p className="text-xs text-sage">Áudios ficam disponíveis no site automaticamente</p>
            </div>
            <button
              onClick={() => setAutoUpload((v) => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${autoUpload ? "bg-sage" : "bg-sage/25"}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${autoUpload ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>
        </div>

        {/* Abas */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-sage uppercase tracking-wider">Leitura</p>
          <div className="flex flex-wrap gap-2 border-b border-sage/20 pb-4">
            {([
              ["citacoes", `Citações (${citacoesFeitas}/${citacoesTotal})`],
              ["reflexoes", `Reflexões (${reflexoesFeitas}/${reflexoesTotal})`],
              ["intros", `Intros Espelhos (${introsFeitas}/${introsTotal})`],
            ] as [Aba, string][]).map(([a, label]) => (
              <button key={a} onClick={() => setAba(a)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${aba === a ? "bg-forest text-white" : "bg-white text-sage border border-sage/20 hover:text-forest"}`}
                style={aba === a ? { backgroundColor: "#2d6a4f" } : {}}>
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs font-medium text-sage uppercase tracking-wider pt-2">Marketing</p>
          <div className="flex flex-wrap gap-2 border-b border-sage/20 pb-4">
            {([
              ["teasers", `Teasers Espelhos (${teasersFeitos}/${teasersTotal})`],
              ["trailer", `Trailer Jornada (${estados["trailer"] === "feito" ? 1 : 0}/1)`],
              ["stories", `Stories (${storiesFeitas}/${storiesTotal})`],
              ["teasers-nos", `Teasers Nós (${teasersNosFeitos}/${teasersNosTotal})`],
              ["ctas", `Chamadas à Acção (${ctasFeitas}/${ctasTotal})`],
              ["reels", `Reels (${reelsFeitos}/${reelsTotal})`],
              ["carrosseis", `Carrosséis (${carrosseisFeitos}/${carrosseisTotal})`],
              ["educativos", `Educativos v3 (${educativosFeitos}/${educativosTotal})`],
            ] as [Aba, string][]).map(([a, label]) => (
              <button key={a} onClick={() => setAba(a)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${aba === a ? "bg-forest text-white" : "bg-white text-sage border border-sage/20 hover:text-forest"}`}
                style={aba === a ? { backgroundColor: "#2d6a4f" } : {}}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Gerar todos */}
        {/* Barra de progresso + acções em lote */}
        <div className="rounded-xl border border-sage/20 bg-white p-5 space-y-4">
          {aGerarTodos && progresso.total > 0 && (
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-sage">A gerar...</span>
                <span className="text-xs font-medium text-forest">{progresso.atual}/{progresso.total}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-sage/15">
                <div
                  className="h-1.5 rounded-full bg-sage transition-all duration-300"
                  style={{ width: `${progresso.total > 0 ? (progresso.atual / progresso.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-sage">Operações em lote</p>
            <div className="flex flex-wrap gap-2">
              {aGerarTodos ? (
                <button
                  onClick={pararGeracao}
                  className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  Parar ({progresso.atual}/{progresso.total})
                </button>
              ) : (
                <button
                  onClick={gerarTodosAba}
                  disabled={aEnviarTodos || !apiKey.trim()}
                  style={{ backgroundColor: "#2d6a4f", color: "#ffffff" }}
                  className="rounded-lg px-5 py-2.5 text-sm font-medium transition hover:opacity-90 disabled:opacity-50"
                >
                  Gerar todos
                </button>
              )}
              {!autoUpload && (
                <button
                  onClick={enviarTodosAba}
                  disabled={aEnviarTodos || aGerarTodos || Object.keys(blobs).length === 0}
                  className="rounded-lg border border-sage/30 px-5 py-2.5 text-sm font-medium text-sage transition hover:text-forest disabled:opacity-50"
                >
                  {aEnviarTodos ? "A enviar..." : "Enviar todos para o site"}
                </button>
              )}
              <button
                onClick={downloadZip}
                disabled={Object.keys(blobs).length === 0}
                className="rounded-lg border border-sage/30 px-4 py-2.5 text-sm font-medium text-sage transition hover:text-forest disabled:opacity-50"
              >
                ZIP ({Object.keys(blobs).length})
              </button>
            </div>
          </div>
        </div>

        {/* ── Citações ─────────────────────────────────────────── */}
        {aba === "citacoes" && (
          <div className="space-y-3">
            {ALL_CITACOES.map((c, i) => {
              const id = `cit-${i}`;
              const ficheiro = `citacao-${String(i + 1).padStart(3, "0")}-veu${c.veu}-${c.fonte}.mp3`;
              const estado = estados[id] || "idle";
              return (
                <ItemVoz
                  key={id}
                  id={id}
                  ficheiro={ficheiro}
                  nome={c.contexto || `Véu ${c.veu}`}
                  texto={c.texto}
                  estado={estado}
                  erro={erros[id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(id, ficheiro, c.texto)}
                  temBlob={!!blobs[id]}
                  uploadEstado={uploadEstados[id] || "idle"}
                  uploadErro={uploadErros[id]}
                  onUpload={() => uploadAudio(id, ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Reflexões ─────────────────────────────────────────── */}
        {aba === "reflexoes" && (
          <div className="space-y-3">
            {REFLEXOES.map((r) => {
              const estado = estados[r.id] || "idle";
              return (
                <ItemVoz
                  key={r.id}
                  id={r.id}
                  ficheiro={r.ficheiro}
                  nome={r.nome}
                  texto={r.texto}
                  estado={estado}
                  erro={erros[r.id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(r.id, r.ficheiro, r.texto)}
                  temBlob={!!blobs[r.id]}
                  uploadEstado={uploadEstados[r.id] || "idle"}
                  onUpload={() => uploadAudio(r.id, r.ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Intros ──────────────────────────────────────────── */}
        {aba === "intros" && (
          <div className="space-y-3">
            {INTROS_VEUS.map((v) => {
              const id = `intro-${v.veu}`;
              const ficheiro = `intro-veu-${v.veu}-${slugify(v.nome)}.mp3`;
              const estado = estados[id] || "idle";
              const semTexto = !v.texto.trim();
              return (
                <ItemVoz key={id} id={id} ficheiro={ficheiro}
                  nome={`Espelho ${v.veu} — ${v.nome}`}
                  texto={semTexto ? "" : v.texto}
                  estado={semTexto ? "idle" : estado}
                  erro={erros[id]}
                  disabled={semTexto || aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(id, ficheiro, v.texto)}
                  placeholder={semTexto ? "Sem texto — escreve em intros-veus.ts" : undefined}
                  temBlob={!!blobs[id]}
                  uploadEstado={uploadEstados[id] || "idle"}
                  uploadErro={uploadErros[id]}
                  onUpload={() => uploadAudio(id, ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Teasers Espelhos ─────────────────────────────────── */}
        {aba === "teasers" && (
          <div className="space-y-3">
            {TEASERS_ESPELHOS.map((t) => {
              const id = `teaser-${t.veu}`;
              const estado = estados[id] || "idle";
              return (
                <ItemVoz key={id} id={id} ficheiro={t.ficheiro}
                  nome={`Espelho ${t.veu} — ${t.espelho}`}
                  texto={t.texto} estado={estado} erro={erros[id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(id, t.ficheiro, t.texto)}
                  temBlob={!!blobs[id]}
                  uploadEstado={uploadEstados[id] || "idle"}
                  onUpload={() => uploadAudio(id, t.ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Trailer ──────────────────────────────────────────── */}
        {aba === "trailer" && (
          <div className="space-y-3">
            <ItemVoz id="trailer" ficheiro={TRAILER_JORNADA.ficheiro}
              nome="Trailer — Os Sete Espelhos (Jornada Completa)"
              texto={TRAILER_JORNADA.texto}
              estado={estados["trailer"] || "idle"}
              erro={erros["trailer"]}
              disabled={aGerarTodos || !apiKey.trim()}
              onGerar={() => gerarVoz("trailer", TRAILER_JORNADA.ficheiro, TRAILER_JORNADA.texto)}
              temBlob={!!blobs["trailer"]}
              uploadEstado={uploadEstados["trailer"] || "idle"}
              uploadErro={uploadErros["trailer"]}
              onUpload={() => uploadAudio("trailer", TRAILER_JORNADA.ficheiro)}
            />
          </div>
        )}

        {/* ── Stories ──────────────────────────────────────────── */}
        {aba === "stories" && (
          <div className="space-y-3">
            {STORIES_ESPELHOS.map((s) => {
              const id = `story-${s.veu}`;
              const estado = estados[id] || "idle";
              return (
                <ItemVoz key={id} id={id} ficheiro={s.ficheiro}
                  nome={`Story — Espelho ${s.veu} (${s.espelho})`}
                  texto={s.texto} estado={estado} erro={erros[id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(id, s.ficheiro, s.texto)}
                  temBlob={!!blobs[id]}
                  uploadEstado={uploadEstados[id] || "idle"}
                  onUpload={() => uploadAudio(id, s.ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Teasers Nós ──────────────────────────────────────── */}
        {aba === "teasers-nos" && (
          <div className="space-y-3">
            {TEASERS_NOS.map((t) => {
              const id = `teaser-no-${t.veu}`;
              const estado = estados[id] || "idle";
              return (
                <ItemVoz key={id} id={id} ficheiro={t.ficheiro}
                  nome={`Nó ${t.veu} — ${t.no} (${t.personagens})`}
                  texto={t.texto} estado={estado} erro={erros[id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(id, t.ficheiro, t.texto)}
                  temBlob={!!blobs[id]}
                  uploadEstado={uploadEstados[id] || "idle"}
                  onUpload={() => uploadAudio(id, t.ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Chamadas à Acção ─────────────────────────────────── */}
        {aba === "ctas" && (
          <div className="space-y-3">
            {CHAMADAS_ACCAO.map((c) => {
              const estado = estados[c.id] || "idle";
              return (
                <ItemVoz key={c.id} id={c.id} ficheiro={c.ficheiro}
                  nome={c.nome} texto={c.texto} estado={estado} erro={erros[c.id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(c.id, c.ficheiro, c.texto)}
                  temBlob={!!blobs[c.id]}
                  uploadEstado={uploadEstados[c.id] || "idle"}
                  onUpload={() => uploadAudio(c.id, c.ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Reels ────────────────────────────────────────────── */}
        {aba === "reels" && (
          <div className="space-y-3">
            <p className="text-xs text-sage/70 pb-1">
              Narração corrida para voiceover de Reels (25-35s). Usa no CapCut como áudio da voz Vivianne.
            </p>
            {REELS_VOZ.map((r) => {
              const estado = estados[r.id] || "idle";
              return (
                <ItemVoz key={r.id} id={r.id} ficheiro={r.ficheiro}
                  nome={r.nome} texto={r.texto} estado={estado} erro={erros[r.id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(r.id, r.ficheiro, r.texto)}
                  temBlob={!!blobs[r.id]}
                  uploadEstado={uploadEstados[r.id] || "idle"}
                  onUpload={() => uploadAudio(r.id, r.ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Carrosséis ───────────────────────────────────────── */}
        {aba === "carrosseis" && (
          <div className="space-y-3">
            <p className="text-xs text-sage/70 pb-1">
              Narração corrida dos slides de carrossel (~45-60s). Usa no CapCut ou como áudio acompanhante.
            </p>
            {CARROSSEIS_VOZ.map((c) => {
              const estado = estados[c.id] || "idle";
              return (
                <ItemVoz key={c.id} id={c.id} ficheiro={c.ficheiro}
                  nome={c.nome} texto={c.texto} estado={estado} erro={erros[c.id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(c.id, c.ficheiro, c.texto)}
                  temBlob={!!blobs[c.id]}
                  uploadEstado={uploadEstados[c.id] || "idle"}
                  onUpload={() => uploadAudio(c.id, c.ficheiro)}
                />
              );
            })}
          </div>
        )}

        {/* ── Educativos (v3 com pausas) ─────────────────────── */}
        {aba === "educativos" && (
          <div className="space-y-3">
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-xs font-medium text-amber-800">ElevenLabs v3 — pausas naturais</p>
              <p className="mt-1 text-xs text-amber-700">
                Estes roteiros usam [pause], [short pause], [long pause] para respirações naturais.
                Selecciona o modelo v3 acima para melhor resultado.
              </p>
              {modelo !== "v3" && (
                <button
                  onClick={() => setModelo("v3")}
                  className="mt-2 rounded bg-amber-200 px-3 py-1 text-xs font-medium text-amber-800 hover:bg-amber-300"
                >
                  Mudar para v3
                </button>
              )}
            </div>
            {EDUCATIVOS_VOZ.map((e) => {
              const estado = estados[e.id] || "idle";
              return (
                <ItemVoz key={e.id} id={e.id} ficheiro={e.ficheiro}
                  nome={e.nome} texto={e.texto} estado={estado} erro={erros[e.id]}
                  disabled={aGerarTodos || !apiKey.trim()}
                  onGerar={() => gerarVoz(e.id, e.ficheiro, e.texto)}
                  temBlob={!!blobs[e.id]}
                  uploadEstado={uploadEstados[e.id] || "idle"}
                  onUpload={() => uploadAudio(e.id, e.ficheiro)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Componente de item ───────────────────────────────────────
function ItemVoz({
  ficheiro,
  nome,
  texto,
  estado,
  erro,
  disabled,
  onGerar,
  placeholder,
  temBlob,
  uploadEstado,
  uploadErro,
  onUpload,
}: {
  id: string;
  ficheiro: string;
  nome: string;
  texto: string;
  estado: Estado;
  erro?: string;
  disabled: boolean;
  onGerar: () => void;
  placeholder?: string;
  temBlob?: boolean;
  uploadEstado?: EstadoUpload;
  uploadErro?: string;
  onUpload?: () => void;
}) {
  const preview = texto
    ? texto.slice(0, 90) + (texto.length > 90 ? "..." : "")
    : placeholder ?? "";

  return (
    <div className="rounded-lg border border-sage/20 bg-white px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-forest text-sm">{nome}</p>
          <p className={`mt-0.5 text-xs leading-relaxed ${texto ? "text-sage" : "text-sage/40 italic"}`}>{preview}</p>
          <p className="mt-1 text-xs text-sage/50 font-mono">{ficheiro}</p>
          {erro && <p className="mt-1 text-xs text-red-500">{erro}</p>}
        </div>
        <button
          onClick={onGerar}
          disabled={disabled || estado === "a-gerar"}
          style={
            estado === "feito"
              ? { backgroundColor: "#e5e7eb", color: "#6b7280" }
              : estado === "erro"
              ? { backgroundColor: "#fef2f2", color: "#dc2626" }
              : { backgroundColor: "#2d6a4f", color: "#ffffff" }
          }
          className="shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 hover:opacity-90"
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
      {temBlob && onUpload && (
        <div className="mt-3 flex items-center justify-end gap-2 border-t border-sage/10 pt-3">
          {uploadEstado === "enviado" ? (
            <span className="text-xs text-green-600">Enviado para o site</span>
          ) : uploadEstado === "erro" ? (
            <>
              <span className="max-w-[60%] truncate text-xs text-red-500" title={uploadErro}>
                {uploadErro || "Erro no upload"}
              </span>
              <button
                onClick={onUpload}
                className="rounded-lg border border-sage/30 px-3 py-1.5 text-xs text-sage transition hover:text-forest"
              >
                Tentar de novo
              </button>
            </>
          ) : (
            <button
              onClick={onUpload}
              disabled={uploadEstado === "a-enviar"}
              className="rounded-lg border border-sage/30 px-3 py-1.5 text-xs text-sage transition hover:text-forest disabled:opacity-50"
            >
              {uploadEstado === "a-enviar" ? "A enviar..." : "Enviar para o site"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
