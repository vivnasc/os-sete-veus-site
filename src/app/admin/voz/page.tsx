"use client";

import { useState } from "react";
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

type Estado = "idle" | "a-gerar" | "feito" | "erro";
type Aba = "citacoes" | "reflexoes" | "intros" | "teasers" | "trailer" | "stories" | "teasers-nos" | "ctas";

export default function VozPage() {
  const { user, profile } = useAuth();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [apiKey, setApiKey] = useState("");
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE_ID);
  const [aba, setAba] = useState<Aba>("citacoes");
  const [estados, setEstados] = useState<Record<string, Estado>>({});
  const [erros, setErros] = useState<Record<string, string>>({});
  const [aGerarTodos, setAGerarTodos] = useState(false);
  const [erroGlobal, setErroGlobal] = useState("");

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  async function gerarVoz(id: string, ficheiro: string, texto: string) {
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
        body: JSON.stringify({ texto, voiceId: voiceId.trim(), apiKey: apiKey.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ erro: `HTTP ${res.status}` }));
        throw new Error(data.erro || `Erro ${res.status}`);
      }

      const blob = await res.blob();
      if (blob.size === 0) throw new Error("ElevenLabs devolveu ficheiro vazio.");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = ficheiro;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setEstados((e) => ({ ...e, [id]: "feito" }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setEstados((e) => ({ ...e, [id]: "erro" }));
      setErros((e) => ({ ...e, [id]: msg }));
      setErroGlobal(msg);
    }
  }

  async function gerarTodosAba() {
    if (!apiKey.trim()) {
      alert("Coloca a tua API key do ElevenLabs primeiro.");
      return;
    }
    setAGerarTodos(true);

    const itens =
      aba === "citacoes"
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
            ficheiro: `intro-veu-${v.veu}-${v.nome.toLowerCase().replace(/\s/g, "-")}.mp3`,
            texto: v.texto,
          }))
        : aba === "teasers"
        ? TEASERS_ESPELHOS.map((t) => ({
            id: `teaser-${t.veu}`,
            ficheiro: t.ficheiro,
            texto: t.texto,
          }))
        : aba === "trailer"
        ? [{ id: "trailer", ficheiro: TRAILER_JORNADA.ficheiro, texto: TRAILER_JORNADA.texto }]
        : aba === "stories"
        ? STORIES_ESPELHOS.map((s) => ({
            id: `story-${s.veu}`,
            ficheiro: s.ficheiro,
            texto: s.texto,
          }))
        : aba === "teasers-nos"
        ? TEASERS_NOS.map((t) => ({
            id: `teaser-no-${t.veu}`,
            ficheiro: t.ficheiro,
            texto: t.texto,
          }))
        : CHAMADAS_ACCAO.map((c) => ({
            id: c.id,
            ficheiro: c.ficheiro,
            texto: c.texto,
          }));

    for (const item of itens) {
      if (estados[item.id] === "feito") continue;
      await gerarVoz(item.id, item.ficheiro, item.texto);
      await new Promise((r) => setTimeout(r, 2000));
    }
    setAGerarTodos(false);
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
        <div className="flex items-center justify-between rounded-xl border border-sage/20 bg-white p-5">
          <p className="text-sm text-sage">Gerar todos desta aba sequencialmente</p>
          <button
            onClick={gerarTodosAba}
            disabled={aGerarTodos || !apiKey.trim()}
            style={{ backgroundColor: "#2d6a4f", color: "#ffffff" }}
            className="rounded-lg px-5 py-2.5 text-sm font-medium transition hover:opacity-90 disabled:opacity-50"
          >
            {aGerarTodos ? "A gerar..." : "Gerar todos"}
          </button>
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
              const ficheiro = `intro-veu-${v.veu}-${v.nome.toLowerCase().replace(/\s/g, "-")}.mp3`;
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
}) {
  const preview = texto
    ? texto.slice(0, 90) + (texto.length > 90 ? "..." : "")
    : placeholder ?? "";

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-sage/20 bg-white px-5 py-4">
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
  );
}
