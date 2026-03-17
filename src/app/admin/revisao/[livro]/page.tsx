"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type Annotation = {
  id: string;
  book_slug: string;
  book_title: string;
  chapter_slug: string;
  chapter_title: string;
  paragraph_index: number;
  original_text: string;
  note: string;
  status: "pending" | "applied" | "skipped";
  created_at: string;
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

  // Annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [annotatingParagraph, setAnnotatingParagraph] = useState<number | null>(
    null
  );
  const [annotationNote, setAnnotationNote] = useState("");
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [saving, setSaving] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  // Load annotations from Supabase
  const loadAnnotations = useCallback(async () => {
    const { data } = await supabase
      .from("revision_proposals")
      .select("*")
      .eq("book_slug", livroSlug)
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    if (data) setAnnotations(data as Annotation[]);
  }, [livroSlug]);

  useEffect(() => {
    if (user && isAdmin && livroSlug) loadAnnotations();
  }, [user, isAdmin, livroSlug, loadAnnotations]);

  // Load book content
  useEffect(() => {
    if (!user || !isAdmin || !livroSlug) return;
    loadBook();
  }, [user, isAdmin, livroSlug]);

  async function loadBook() {
    setLoading(true);
    try {
      const { loadEspelho, loadNos } = await import("@/lib/content-registry");

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

  function startAnnotation(paragraphIndex: number) {
    setAnnotatingParagraph(paragraphIndex);
    setAnnotationNote("");
    setTimeout(() => noteRef.current?.focus(), 100);
  }

  function cancelAnnotation() {
    setAnnotatingParagraph(null);
    setAnnotationNote("");
  }

  async function submitAnnotation() {
    if (annotatingParagraph === null || saving || !annotationNote.trim()) return;
    const chapter = chapters[currentChapter];
    const original = chapter.content[annotatingParagraph];

    setSaving(true);
    const { error } = await supabase.from("revision_proposals").insert({
      book_slug: livroSlug,
      book_title: bookMeta?.title || livroSlug,
      chapter_slug: chapter.slug,
      chapter_title: `${chapter.title}: ${chapter.subtitle}`,
      paragraph_index: annotatingParagraph,
      original_text: original,
      proposed_text: "",
      note: annotationNote,
      created_by: user?.id,
    });

    if (!error) {
      await loadAnnotations();
    }
    setSaving(false);
    cancelAnnotation();
  }

  async function removeAnnotation(id: string) {
    await supabase
      .from("revision_proposals")
      .update({ status: "skipped" })
      .eq("id", id);
    setAnnotations(annotations.filter((a) => a.id !== id));
  }

  function getAnnotationsForChapter(chapterSlug: string) {
    return annotations.filter(
      (a) => a.chapter_slug === chapterSlug && a.status === "pending"
    );
  }

  function getParagraphAnnotation(chapterSlug: string, paragraphIndex: number) {
    return annotations.find(
      (a) =>
        a.chapter_slug === chapterSlug &&
        a.paragraph_index === paragraphIndex &&
        a.status === "pending"
    );
  }

  const chapter = chapters[currentChapter];
  const chapterAnnotations = chapter
    ? getAnnotationsForChapter(chapter.slug)
    : [];
  const pendingCount = annotations.filter((a) => a.status === "pending").length;

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
                onClick={() => setShowAnnotations(!showAnnotations)}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  showAnnotations
                    ? "bg-sage text-white"
                    : "bg-white border border-sage/20 text-forest hover:bg-sage/10"
                }`}
              >
                Notas
                {pendingCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex gap-8">
          {/* Main content */}
          <div
            className={`flex-1 min-w-0 ${showAnnotations ? "lg:max-w-[60%]" : ""}`}
          >
            {/* Chapter navigation */}
            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
              {chapters.map((ch, i) => {
                const chNotes = getAnnotationsForChapter(ch.slug);
                return (
                  <button
                    key={ch.slug}
                    onClick={() => {
                      setCurrentChapter(i);
                      cancelAnnotation();
                      contentRef.current?.scrollTo(0, 0);
                    }}
                    className={`relative flex-shrink-0 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                      currentChapter === i
                        ? "border-sage bg-sage text-white"
                        : "border-sage/20 text-forest hover:bg-sage/10"
                    }`}
                  >
                    {ch.title}
                    {chNotes.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] text-white">
                        {chNotes.length}
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
              {chapterAnnotations.length > 0 && (
                <p className="mt-2 text-xs text-amber-600">
                  {chapterAnnotations.length} nota
                  {chapterAnnotations.length > 1 ? "s" : ""} neste capítulo
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

                const annotation = getParagraphAnnotation(chapter.slug, i);
                const isAnnotating = annotatingParagraph === i;
                const isDialogue = paragraph.startsWith("—");

                return (
                  <div key={i} className="group relative">
                    {/* Paragraph */}
                    <div
                      onClick={() => {
                        if (!isAnnotating) startAnnotation(i);
                      }}
                      className={`cursor-pointer rounded-lg px-4 py-3 transition-all ${
                        isAnnotating
                          ? "bg-sage/10 ring-2 ring-sage/30"
                          : annotation
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
                      {!isAnnotating && !annotation && (
                        <span className="absolute right-2 top-2 hidden text-[10px] text-sage/40 group-hover:inline">
                          clica para anotar
                        </span>
                      )}

                      {annotation && !isAnnotating && (
                        <span className="absolute right-2 top-2 text-[10px] text-amber-500">
                          {annotation.note.slice(0, 30)}
                          {annotation.note.length > 30 ? "..." : ""}
                        </span>
                      )}
                    </div>

                    {/* Annotation panel */}
                    {isAnnotating && (
                      <div className="mt-2 rounded-lg border border-sage/20 bg-white p-4 shadow-sm">
                        <label className="mb-1 block text-xs font-medium text-sage">
                          O que precisa de melhorar neste parágrafo?
                        </label>
                        <textarea
                          ref={noteRef}
                          value={annotationNote}
                          onChange={(e) => setAnnotationNote(e.target.value)}
                          rows={3}
                          placeholder="Ex: tom pesado, simplificar a frase, falta emoção, repetitivo, diálogo forçado..."
                          className="mb-3 w-full resize-y rounded-lg border border-sage/30 bg-white px-3 py-2 text-sm text-forest leading-relaxed placeholder:text-sage/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={submitAnnotation}
                            disabled={saving || !annotationNote.trim()}
                            className="rounded-lg bg-sage px-4 py-2 text-sm font-medium text-white hover:bg-sage/80 transition-colors disabled:opacity-50"
                          >
                            {saving ? "A guardar..." : "Marcar"}
                          </button>
                          <button
                            onClick={cancelAnnotation}
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
                  cancelAnnotation();
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
                  cancelAnnotation();
                  window.scrollTo(0, 0);
                }}
                disabled={currentChapter === chapters.length - 1}
                className="rounded-lg border border-sage/20 px-4 py-2 text-sm text-forest hover:bg-sage/10 transition-colors disabled:opacity-30"
              >
                Seguinte →
              </button>
            </div>
          </div>

          {/* Annotations sidebar */}
          {showAnnotations && (
            <div className="hidden lg:block w-[340px] flex-shrink-0">
              <div className="sticky top-16">
                <h3 className="mb-4 text-sm font-medium text-sage uppercase tracking-wide">
                  Notas de revisão ({pendingCount})
                </h3>

                {pendingCount === 0 && (
                  <p className="text-sm text-sage/60">
                    Nenhuma nota ainda. Clica num parágrafo para marcar o que
                    precisa de melhorar.
                  </p>
                )}

                <div className="space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
                  {annotations
                    .filter((a) => a.status === "pending")
                    .map((a) => (
                      <div
                        key={a.id}
                        className="rounded-lg border border-sage/20 bg-white/80 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-sage">
                            {a.chapter_title}
                          </span>
                          <button
                            onClick={() => removeAnnotation(a.id)}
                            className="text-xs text-red-400 hover:text-red-600"
                          >
                            remover
                          </button>
                        </div>
                        <p className="mb-2 text-sm text-amber-700 font-medium">
                          {a.note}
                        </p>
                        <div className="rounded bg-sage/5 p-2">
                          <p className="text-xs text-forest/60 leading-relaxed">
                            {a.original_text.slice(0, 150)}
                            {a.original_text.length > 150 ? "..." : ""}
                          </p>
                        </div>
                        <p className="mt-2 text-[10px] text-sage/50">
                          {new Date(a.created_at).toLocaleDateString("pt-PT")}
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
