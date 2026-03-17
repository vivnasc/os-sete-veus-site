"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type Proposal = {
  id: string;
  bookSlug: string;
  chapterSlug: string;
  chapterTitle: string;
  paragraphIndex: number;
  originalText: string;
  proposedChange: string;
  note: string;
  status: "pending" | "applied" | "rejected";
  createdAt: string;
};

type ChapterData = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  content: string[];
  reflection: { prompt: string; journalQuestion: string };
  checklist: string[];
};

type BookData = {
  title: string;
  subtitle: string;
  author: string;
  dedication: string;
  intro: string[];
};

export default function LivroRevisaoPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const livroSlug = params.livro as string;
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [bookMeta, setBookMeta] = useState<BookData | null>(null);
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookType, setBookType] = useState<"espelho" | "no">("espelho");

  // Proposals
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [editingParagraph, setEditingParagraph] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editNote, setEditNote] = useState("");
  const [showProposals, setShowProposals] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  // Load proposals from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`revisao-proposals-${livroSlug}`);
    if (saved) setProposals(JSON.parse(saved));
  }, [livroSlug]);

  // Save proposals to localStorage
  const saveProposals = useCallback(
    (updated: Proposal[]) => {
      setProposals(updated);
      localStorage.setItem(
        `revisao-proposals-${livroSlug}`,
        JSON.stringify(updated)
      );
    },
    [livroSlug]
  );

  // Load book content
  useEffect(() => {
    if (!user || !isAdmin || !livroSlug) return;
    loadBook();
  }, [user, isAdmin, livroSlug]);

  async function loadBook() {
    setLoading(true);
    try {
      const { loadEspelho, loadNos } = await import("@/lib/content-registry");

      // Try as Espelho first, then Nó
      let mod = await loadEspelho(livroSlug);
      if (mod) {
        setBookType("espelho");
      } else {
        mod = await loadNos(livroSlug);
        if (mod) setBookType("no");
      }

      if (mod) {
        setBookMeta(mod.bookMeta);
        setChapters(mod.chapters as ChapterData[]);
      }
    } catch (err) {
      console.error("Erro ao carregar livro:", err);
    }
    setLoading(false);
  }

  function startEdit(paragraphIndex: number, text: string) {
    setEditingParagraph(paragraphIndex);
    setEditText(text);
    setEditNote("");
    setTimeout(() => editRef.current?.focus(), 100);
  }

  function cancelEdit() {
    setEditingParagraph(null);
    setEditText("");
    setEditNote("");
  }

  function submitProposal() {
    if (editingParagraph === null) return;
    const chapter = chapters[currentChapter];
    const original = chapter.content[editingParagraph];

    // Don't save if nothing changed
    if (editText.trim() === original.trim() && !editNote.trim()) {
      cancelEdit();
      return;
    }

    const proposal: Proposal = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      bookSlug: livroSlug,
      chapterSlug: chapter.slug,
      chapterTitle: `${chapter.title}: ${chapter.subtitle}`,
      paragraphIndex: editingParagraph,
      originalText: original,
      proposedChange: editText,
      note: editNote,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    saveProposals([...proposals, proposal]);
    cancelEdit();
  }

  function removeProposal(id: string) {
    saveProposals(proposals.filter((p) => p.id !== id));
  }

  function getProposalsForChapter(chapterSlug: string) {
    return proposals.filter(
      (p) => p.chapterSlug === chapterSlug && p.status === "pending"
    );
  }

  function getParagraphProposal(chapterSlug: string, paragraphIndex: number) {
    return proposals.find(
      (p) =>
        p.chapterSlug === chapterSlug &&
        p.paragraphIndex === paragraphIndex &&
        p.status === "pending"
    );
  }

  function exportProposals() {
    const pending = proposals.filter((p) => p.status === "pending");
    if (pending.length === 0) return "";

    let output = `# Propostas de Revisão — ${bookMeta?.title || livroSlug}\n`;
    output += `Data: ${new Date().toLocaleDateString("pt-PT")}\n`;
    output += `Total: ${pending.length} proposta${pending.length > 1 ? "s" : ""}\n\n`;

    const byChapter = new Map<string, Proposal[]>();
    for (const p of pending) {
      const list = byChapter.get(p.chapterTitle) || [];
      list.push(p);
      byChapter.set(p.chapterTitle, list);
    }

    for (const [chapter, props] of byChapter) {
      output += `---\n## ${chapter}\n\n`;
      for (const p of props) {
        output += `### Paragrafo ${p.paragraphIndex + 1}\n`;
        if (p.note) output += `Nota: ${p.note}\n\n`;
        output += `ORIGINAL:\n${p.originalText.slice(0, 200)}${p.originalText.length > 200 ? "..." : ""}\n\n`;
        output += `PROPOSTA:\n${p.proposedChange.slice(0, 200)}${p.proposedChange.length > 200 ? "..." : ""}\n\n`;
      }
    }

    return output;
  }

  function copyExport() {
    const text = exportProposals();
    navigator.clipboard.writeText(text);
  }

  const chapter = chapters[currentChapter];
  const chapterProposals = chapter
    ? getProposalsForChapter(chapter.slug)
    : [];
  const pendingCount = proposals.filter((p) => p.status === "pending").length;

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  if (!bookMeta || chapters.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/admin/revisao"
            className="text-sm text-sage hover:text-forest transition-colors"
          >
            ← Voltar
          </Link>
          <p className="mt-8 text-center text-sage">
            Livro não encontrado: {livroSlug}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-sage/20 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href="/admin/revisao"
                className="text-sm text-sage hover:text-forest transition-colors flex-shrink-0"
              >
                ← Revisão
              </Link>
              <div className="min-w-0">
                <h1 className="text-sm font-medium text-forest truncate">
                  {bookMeta.title}
                </h1>
                <p className="text-xs text-sage/70 truncate">
                  {chapter?.title}: {chapter?.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowProposals(!showProposals)}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  showProposals
                    ? "bg-sage text-white"
                    : "bg-white border border-sage/20 text-forest hover:bg-sage/10"
                }`}
              >
                Propostas
                {pendingCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {pendingCount}
                  </span>
                )}
              </button>
              {pendingCount > 0 && (
                <button
                  onClick={() => setShowExport(!showExport)}
                  className="rounded-lg border border-sage/20 bg-white px-3 py-1.5 text-xs font-medium text-forest hover:bg-sage/10 transition-colors"
                >
                  Exportar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Export modal */}
      {showExport && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl text-forest">
                Exportar Propostas
              </h2>
              <button
                onClick={() => setShowExport(false)}
                className="text-sage hover:text-forest"
              >
                Fechar
              </button>
            </div>
            <p className="mb-4 text-sm text-sage">
              Copia este texto e cola numa conversa para aplicar as alterações.
            </p>
            <pre className="mb-4 max-h-96 overflow-auto rounded-lg bg-sage/5 p-4 text-xs text-forest/80 whitespace-pre-wrap">
              {exportProposals()}
            </pre>
            <button
              onClick={copyExport}
              className="rounded-lg bg-sage px-5 py-2.5 text-sm font-medium text-white hover:bg-sage/80 transition-colors"
            >
              Copiar para clipboard
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex gap-8">
          {/* Main content */}
          <div
            className={`flex-1 min-w-0 ${showProposals ? "lg:max-w-[60%]" : ""}`}
          >
            {/* Chapter navigation */}
            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
              {chapters.map((ch, i) => {
                const chProposals = getProposalsForChapter(ch.slug);
                return (
                  <button
                    key={ch.slug}
                    onClick={() => {
                      setCurrentChapter(i);
                      cancelEdit();
                      contentRef.current?.scrollTo(0, 0);
                    }}
                    className={`relative flex-shrink-0 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                      currentChapter === i
                        ? "border-sage bg-sage text-white"
                        : "border-sage/20 text-forest hover:bg-sage/10"
                    }`}
                  >
                    {ch.title}
                    {chProposals.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] text-white">
                        {chProposals.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Chapter header */}
            <div className="mb-8">
              <span
                className={`inline-block rounded px-2 py-0.5 text-xs font-medium mb-2 ${
                  bookType === "espelho"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-violet-100 text-violet-700"
                }`}
              >
                {bookType === "espelho" ? "Espelho" : "Nó"} — {chapter.title}
              </span>
              <h2 className="font-display text-3xl text-forest">
                {chapter.subtitle}
              </h2>
              {chapterProposals.length > 0 && (
                <p className="mt-2 text-xs text-amber-600">
                  {chapterProposals.length} proposta
                  {chapterProposals.length > 1 ? "s" : ""} neste capítulo
                </p>
              )}
            </div>

            {/* Content */}
            <div ref={contentRef} className="space-y-1">
              {chapter.content.map((paragraph, i) => {
                if (paragraph === "***") {
                  return (
                    <div key={i} className="py-6">
                      <hr className="border-sage/20" />
                    </div>
                  );
                }

                const hasProposal = !!getParagraphProposal(
                  chapter.slug,
                  i
                );
                const isEditing = editingParagraph === i;
                const isDialogue = paragraph.startsWith("—");

                return (
                  <div key={i} className="group relative">
                    {/* Paragraph */}
                    <div
                      onClick={() => {
                        if (!isEditing) startEdit(i, paragraph);
                      }}
                      className={`cursor-pointer rounded-lg px-4 py-3 transition-all ${
                        isEditing
                          ? "bg-sage/10 ring-2 ring-sage/30"
                          : hasProposal
                            ? "bg-amber-50 border-l-4 border-amber-400"
                            : "hover:bg-sage/5"
                      }`}
                    >
                      <p
                        className={`leading-relaxed ${
                          isDialogue
                            ? "text-forest/90 italic"
                            : "text-forest/80"
                        }`}
                      >
                        {paragraph}
                      </p>

                      {/* Hover hint */}
                      {!isEditing && !hasProposal && (
                        <span className="absolute right-2 top-2 hidden text-[10px] text-sage/40 group-hover:inline">
                          clica para editar
                        </span>
                      )}

                      {hasProposal && !isEditing && (
                        <span className="absolute right-2 top-2 text-[10px] text-amber-500">
                          proposta pendente
                        </span>
                      )}
                    </div>

                    {/* Edit panel */}
                    {isEditing && (
                      <div className="mt-2 rounded-lg border border-sage/20 bg-white p-4 shadow-sm">
                        <label className="mb-1 block text-xs font-medium text-sage">
                          Texto proposto
                        </label>
                        <textarea
                          ref={editRef}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={Math.min(
                            12,
                            Math.max(3, editText.split("\n").length + 1)
                          )}
                          className="mb-3 w-full resize-y rounded-lg border border-sage/30 bg-white px-3 py-2 text-sm text-forest leading-relaxed placeholder:text-sage/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                        />
                        <label className="mb-1 block text-xs font-medium text-sage">
                          Nota (opcional — o que queres mudar e porquê)
                        </label>
                        <input
                          type="text"
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          placeholder="Ex: tom demasiado pesado, simplificar..."
                          className="mb-3 w-full rounded-lg border border-sage/30 bg-white px-3 py-2 text-sm text-forest placeholder:text-sage/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={submitProposal}
                            className="rounded-lg bg-sage px-4 py-2 text-sm font-medium text-white hover:bg-sage/80 transition-colors"
                          >
                            Guardar proposta
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border border-sage/20 px-4 py-2 text-sm text-sage hover:text-forest transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Reflection section */}
              <div className="mt-10 border-t border-sage/20 pt-8">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-sage">
                  Reflexão
                </h3>
                <p className="mb-2 text-forest/80 italic leading-relaxed">
                  {chapter.reflection.prompt}
                </p>
                <p className="text-sm text-forest/70 leading-relaxed">
                  Pergunta do diário: {chapter.reflection.journalQuestion}
                </p>
              </div>

              {/* Checklist */}
              <div className="mt-6 border-t border-sage/20 pt-6 pb-12">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-sage">
                  Checklist
                </h3>
                <ul className="space-y-2">
                  {chapter.checklist.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-forest/70"
                    >
                      <span className="mt-0.5 text-sage">&#9744;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Chapter navigation arrows */}
            <div className="mt-8 flex items-center justify-between border-t border-sage/20 pt-6">
              <button
                onClick={() => {
                  setCurrentChapter(Math.max(0, currentChapter - 1));
                  cancelEdit();
                  window.scrollTo(0, 0);
                }}
                disabled={currentChapter === 0}
                className="rounded-lg border border-sage/20 px-4 py-2 text-sm text-forest hover:bg-sage/10 transition-colors disabled:opacity-30"
              >
                ← Anterior
              </button>
              <span className="text-xs text-sage">
                {currentChapter + 1} / {chapters.length}
              </span>
              <button
                onClick={() => {
                  setCurrentChapter(
                    Math.min(chapters.length - 1, currentChapter + 1)
                  );
                  cancelEdit();
                  window.scrollTo(0, 0);
                }}
                disabled={currentChapter === chapters.length - 1}
                className="rounded-lg border border-sage/20 px-4 py-2 text-sm text-forest hover:bg-sage/10 transition-colors disabled:opacity-30"
              >
                Seguinte →
              </button>
            </div>
          </div>

          {/* Proposals sidebar */}
          {showProposals && (
            <div className="hidden lg:block w-[340px] flex-shrink-0">
              <div className="sticky top-16">
                <h3 className="mb-4 text-sm font-medium text-sage uppercase tracking-wide">
                  Propostas ({pendingCount})
                </h3>

                {pendingCount === 0 && (
                  <p className="text-sm text-sage/60">
                    Nenhuma proposta ainda. Clica num parágrafo para propor
                    alterações.
                  </p>
                )}

                <div className="space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
                  {proposals
                    .filter((p) => p.status === "pending")
                    .map((p) => (
                      <div
                        key={p.id}
                        className="rounded-lg border border-sage/20 bg-white/80 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-sage">
                            {p.chapterTitle}
                          </span>
                          <button
                            onClick={() => removeProposal(p.id)}
                            className="text-xs text-red-400 hover:text-red-600"
                          >
                            remover
                          </button>
                        </div>
                        {p.note && (
                          <p className="mb-2 text-xs text-amber-600 italic">
                            {p.note}
                          </p>
                        )}
                        <div className="mb-2 rounded bg-red-50 p-2">
                          <p className="text-xs text-red-800/70 line-through leading-relaxed">
                            {p.originalText.slice(0, 120)}
                            {p.originalText.length > 120 ? "..." : ""}
                          </p>
                        </div>
                        <div className="rounded bg-green-50 p-2">
                          <p className="text-xs text-green-800/70 leading-relaxed">
                            {p.proposedChange.slice(0, 120)}
                            {p.proposedChange.length > 120 ? "..." : ""}
                          </p>
                        </div>
                        <p className="mt-2 text-[10px] text-sage/50">
                          {new Date(p.createdAt).toLocaleDateString("pt-PT")}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
