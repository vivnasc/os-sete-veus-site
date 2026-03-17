"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { experiences } from "@/data/experiences";
import { nosCollection } from "@/data/nos-collection";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

type BookToReview = {
  type: "espelho" | "no";
  slug: string;
  title: string;
  subtitle: string;
  launchDate: string | null;
  daysUntilLaunch: number | null;
  status: "available" | "coming_soon" | "waitlist";
  dataFile: string | null;
  chapters: { slug: string; number: number; title: string; subtitle: string }[];
  espelhoSlug?: string;
  validated: boolean;
};

export default function RevisaoPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin =
    profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [books, setBooks] = useState<BookToReview[]>([]);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapterContent, setChapterContent] = useState<string[] | null>(null);
  const [chapterMeta, setChapterMeta] = useState<{
    reflection: { prompt: string; journalQuestion: string };
    checklist: string[];
  } | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [validatedBooks, setValidatedBooks] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "urgent" | "espelhos" | "nos">("all");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (!user || !isAdmin) return;

    const saved = localStorage.getItem("revisao-validated");
    if (saved) {
      setValidatedBooks(new Set(JSON.parse(saved)));
    }

    buildBookList();
  }, [user, isAdmin]);

  function buildBookList() {
    const now = new Date();
    const result: BookToReview[] = [];

    // Espelhos not yet available
    for (const e of experiences) {
      if (e.status === "available" && !e.launchDate) continue;

      const launch = e.launchDate ? new Date(e.launchDate) : null;
      const daysUntil = launch
        ? Math.ceil((launch.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      // Already launched and live
      if (daysUntil !== null && daysUntil < -7) continue;

      result.push({
        type: "espelho",
        slug: e.slug,
        title: e.title,
        subtitle: e.subtitle,
        launchDate: e.launchDate,
        daysUntilLaunch: daysUntil,
        status: e.status,
        dataFile: e.slug,
        chapters: [],
        validated: false,
      });
    }

    // Nos not yet available
    for (const n of nosCollection) {
      if (n.status === "available") continue;
      if (!n.dataFile) continue;

      const espelho = experiences.find((e) => e.slug === n.espelhoSlug);
      const launch = espelho?.launchDate
        ? new Date(espelho.launchDate)
        : null;
      const daysUntil = launch
        ? Math.ceil((launch.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      if (daysUntil !== null && daysUntil < -7) continue;

      result.push({
        type: "no",
        slug: n.slug,
        title: n.title,
        subtitle: n.subtitle,
        launchDate: espelho?.launchDate || null,
        daysUntilLaunch: daysUntil,
        status: n.status,
        dataFile: n.dataFile,
        chapters: [],
        espelhoSlug: n.espelhoSlug,
        validated: false,
      });
    }

    // Sort by launch date (soonest first)
    result.sort((a, b) => {
      if (!a.daysUntilLaunch && !b.daysUntilLaunch) return 0;
      if (!a.daysUntilLaunch) return 1;
      if (!b.daysUntilLaunch) return -1;
      return a.daysUntilLaunch - b.daysUntilLaunch;
    });

    setBooks(result);
  }

  async function loadChapters(book: BookToReview) {
    setSelectedBook(book.slug);
    setSelectedChapter(null);
    setChapterContent(null);
    setChapterMeta(null);
    setLoadingContent(true);

    try {
      let mod;
      if (book.type === "espelho") {
        const { loadEspelho } = await import("@/lib/content-registry");
        mod = await loadEspelho(book.slug);
      } else {
        const { loadNos } = await import("@/lib/content-registry");
        mod = await loadNos(book.slug);
      }

      if (mod) {
        const updated = books.map((b) =>
          b.slug === book.slug
            ? {
                ...b,
                chapters: mod!.chapters.map((c) => ({
                  slug: c.slug,
                  number: c.number,
                  title: c.title,
                  subtitle: c.subtitle,
                })),
              }
            : b
        );
        setBooks(updated);
      }
    } catch {
      console.error("Erro ao carregar capítulos");
    }
    setLoadingContent(false);
  }

  async function loadChapterContent(book: BookToReview, chapterSlug: string) {
    setSelectedChapter(chapterSlug);
    setLoadingContent(true);

    try {
      let mod;
      if (book.type === "espelho") {
        const { loadEspelho } = await import("@/lib/content-registry");
        mod = await loadEspelho(book.slug);
      } else {
        const { loadNos } = await import("@/lib/content-registry");
        mod = await loadNos(book.slug);
      }

      if (mod) {
        const chapter = mod.chapters.find((c) => c.slug === chapterSlug);
        if (chapter) {
          setChapterContent(chapter.content);
          setChapterMeta({
            reflection: chapter.reflection,
            checklist: chapter.checklist,
          });
        }
      }
    } catch {
      console.error("Erro ao carregar conteúdo");
    }
    setLoadingContent(false);
  }

  function toggleValidation(slug: string) {
    const next = new Set(validatedBooks);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    setValidatedBooks(next);
    localStorage.setItem("revisao-validated", JSON.stringify([...next]));
  }

  function getUrgencyLabel(days: number | null) {
    if (days === null) return { text: "Sem data", className: "bg-sage/10 text-sage" };
    if (days <= 0) return { text: "Publicado", className: "bg-green-100 text-green-700" };
    if (days <= 3) return { text: `${days}d — Urgente`, className: "bg-red-100 text-red-700" };
    if (days <= 10) return { text: `${days} dias`, className: "bg-yellow-100 text-yellow-700" };
    return { text: `${days} dias`, className: "bg-sage/10 text-sage" };
  }

  const filteredBooks = books.filter((b) => {
    if (filter === "urgent") return b.daysUntilLaunch !== null && b.daysUntilLaunch <= 10 && b.daysUntilLaunch > 0;
    if (filter === "espelhos") return b.type === "espelho";
    if (filter === "nos") return b.type === "no";
    return true;
  });

  const urgentCount = books.filter(
    (b) => b.daysUntilLaunch !== null && b.daysUntilLaunch <= 10 && b.daysUntilLaunch > 0 && !validatedBooks.has(b.slug)
  ).length;

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  const currentBook = books.find((b) => b.slug === selectedBook);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link
            href="/admin"
            className="mb-4 inline-block text-sm text-sage hover:text-forest transition-colors"
          >
            ← Painel Admin
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl text-forest">
                Revisão de Conteúdo
              </h1>
              <p className="mt-2 text-sage">
                Valida Espelhos e Nós antes da publicação
              </p>
            </div>
            {urgentCount > 0 && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-center">
                <div className="font-display text-2xl text-red-700">
                  {urgentCount}
                </div>
                <div className="text-xs text-red-600">
                  a validar em 10 dias
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Filters */}
        <div className="mb-8 flex gap-2">
          {(
            [
              { key: "all", label: "Todos" },
              { key: "urgent", label: `Urgentes${urgentCount > 0 ? ` (${urgentCount})` : ""}` },
              { key: "espelhos", label: "Espelhos" },
              { key: "nos", label: "Nós" },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-lg px-4 py-2 font-sans text-sm font-medium transition-colors ${
                filter === f.key
                  ? "bg-sage text-white"
                  : "bg-white text-forest hover:bg-sage/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Book list */}
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-sage uppercase tracking-wide mb-4">
              Livros ({filteredBooks.length})
            </h2>
            {filteredBooks.length === 0 && (
              <p className="text-sage/70 text-sm">Nenhum livro por validar.</p>
            )}
            {filteredBooks.map((book) => {
              const urgency = getUrgencyLabel(book.daysUntilLaunch);
              const isSelected = selectedBook === book.slug;
              const isValidated = validatedBooks.has(book.slug);

              return (
                <button
                  key={book.slug}
                  onClick={() => loadChapters(book)}
                  className={`w-full text-left rounded-lg border p-4 transition-all ${
                    isSelected
                      ? "border-sage bg-white shadow-sm"
                      : "border-sage/10 bg-white/50 hover:border-sage/30"
                  } ${isValidated ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                            book.type === "espelho"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-violet-100 text-violet-700"
                          }`}
                        >
                          {book.type === "espelho" ? "Espelho" : "Nó"}
                        </span>
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${urgency.className}`}
                        >
                          {urgency.text}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-forest truncate">
                        {book.title}
                      </h3>
                      <p className="text-xs text-sage/70 truncate">
                        {book.subtitle}
                      </p>
                      {book.launchDate && (
                        <p className="text-xs text-sage/50 mt-1">
                          Publicação: {new Date(book.launchDate).toLocaleDateString("pt-PT")}
                        </p>
                      )}
                    </div>
                    {isValidated && (
                      <span className="text-green-600 text-lg flex-shrink-0">
                        &#10003;
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chapter list + content */}
          <div className="lg:col-span-2">
            {!selectedBook && (
              <div className="rounded-lg border border-sage/20 bg-white/50 p-12 text-center text-sage">
                Selecciona um livro para rever o conteúdo
              </div>
            )}

            {selectedBook && currentBook && (
              <div className="space-y-6">
                {/* Book header */}
                <div className="rounded-lg border border-sage/20 bg-white/50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-2xl text-forest">
                        {currentBook.title}
                      </h2>
                      <p className="text-sage">{currentBook.subtitle}</p>
                    </div>
                    <button
                      onClick={() => toggleValidation(currentBook.slug)}
                      className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                        validatedBooks.has(currentBook.slug)
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-sage text-white hover:bg-sage/80"
                      }`}
                    >
                      {validatedBooks.has(currentBook.slug)
                        ? "Validado"
                        : "Marcar como validado"}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-3">
                    <Link
                      href={`/admin/revisao/${currentBook.slug}`}
                      className="rounded-lg bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-forest/80 transition-colors"
                    >
                      Abrir editor de revisão
                    </Link>
                  </div>

                  {/* Chapter buttons */}
                  {currentBook.chapters.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {currentBook.chapters.map((ch) => (
                        <button
                          key={ch.slug}
                          onClick={() =>
                            loadChapterContent(currentBook, ch.slug)
                          }
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                            selectedChapter === ch.slug
                              ? "border-sage bg-sage text-white"
                              : "border-sage/20 text-forest hover:bg-sage/10"
                          }`}
                        >
                          {ch.title}: {ch.subtitle}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentBook.chapters.length === 0 && !loadingContent && (
                    <p className="mt-4 text-sm text-sage/70">
                      A carregar capítulos...
                    </p>
                  )}
                </div>

                {/* Chapter content */}
                {loadingContent && (
                  <div className="rounded-lg border border-sage/20 bg-white/50 p-12 text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent" />
                  </div>
                )}

                {!loadingContent && selectedChapter && chapterContent && (
                  <div className="rounded-lg border border-sage/20 bg-white/50 p-6">
                    <div className="prose prose-stone max-w-none">
                      {chapterContent.map((paragraph, i) => {
                        if (paragraph === "***") {
                          return (
                            <hr
                              key={i}
                              className="my-8 border-sage/20"
                            />
                          );
                        }
                        if (paragraph.startsWith("—")) {
                          return (
                            <p
                              key={i}
                              className="text-forest/90 leading-relaxed italic"
                            >
                              {paragraph}
                            </p>
                          );
                        }
                        return (
                          <p
                            key={i}
                            className="text-forest/80 leading-relaxed mb-4"
                          >
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>

                    {/* Reflection */}
                    {chapterMeta && (
                      <div className="mt-8 border-t border-sage/20 pt-6">
                        <h3 className="text-sm font-medium text-sage uppercase tracking-wide mb-3">
                          Reflexão
                        </h3>
                        <p className="text-forest/80 italic mb-2">
                          {chapterMeta.reflection.prompt}
                        </p>
                        <p className="text-forest/70 text-sm">
                          Pergunta do diário: {chapterMeta.reflection.journalQuestion}
                        </p>
                      </div>
                    )}

                    {/* Checklist */}
                    {chapterMeta && chapterMeta.checklist.length > 0 && (
                      <div className="mt-6 border-t border-sage/20 pt-6">
                        <h3 className="text-sm font-medium text-sage uppercase tracking-wide mb-3">
                          Checklist
                        </h3>
                        <ul className="space-y-2">
                          {chapterMeta.checklist.map((item, i) => (
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
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
