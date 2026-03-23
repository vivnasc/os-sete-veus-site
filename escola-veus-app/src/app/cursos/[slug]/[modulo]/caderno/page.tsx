"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug } from "@/data/courses";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { useJournal } from "@/hooks/useJournal";

export default function CadernoPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const moduloNum = parseInt(params.modulo as string, 10);
  const { isSubscribed } = useAuth();
  const { completeModule, isModuleCompleted } = useProgress(slug);
  const { content, updateContent, saved, wordCount } = useJournal(slug, moduloNum);

  const course = getCourseBySlug(slug);
  if (!course) return <NotFound />;

  const mod = course.modules.find((m) => m.number === moduloNum);
  if (!mod) return <NotFound />;

  const isFreeTier = mod.number === 1;
  const hasAccess = isFreeTier || isSubscribed;

  if (!hasAccess) {
    return (
      <div className="mx-auto flex min-h-[60dvh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <p className="mb-3 text-sm text-escola-creme-50">
          Este modulo faz parte do curso completo.
        </p>
        <Link
          href="/subscrever"
          className="inline-block rounded-lg bg-escola-dourado px-6 py-2.5 text-sm font-medium text-escola-bg"
        >
          Subscrever para aceder
        </Link>
      </div>
    );
  }

  const completed = isModuleCompleted(moduloNum);

  const handleComplete = async () => {
    await completeModule(moduloNum);
    router.push(`/cursos/${slug}/${moduloNum}/completo`);
  };

  return (
    <div className="mx-auto max-w-lg px-4 pt-8 pb-8">
      {/* Breadcrumb */}
      <Link
        href={`/cursos/${slug}/${moduloNum}`}
        className="mb-6 inline-flex items-center gap-1 text-xs text-escola-creme-50 hover:text-escola-creme"
      >
        <span>&larr;</span> Modulo {moduloNum}
      </Link>

      {/* Header */}
      <header className="mb-8">
        <span className="mb-1 block text-xs uppercase tracking-widest text-escola-dourado/60">
          Caderno de exercicios
        </span>
        <h1 className="font-serif text-2xl font-semibold text-escola-creme">
          {mod.workbook}
        </h1>
        <p className="mt-2 text-sm text-escola-creme-50">
          Modulo {moduloNum} &middot; {course.title}
        </p>
      </header>

      {/* Download placeholder */}
      <div className="mb-8 rounded-xl border border-escola-dourado/20 bg-escola-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-escola-dourado/10">
            <svg className="h-5 w-5 text-escola-dourado" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-escola-creme">
              {mod.workbook}.pdf
            </p>
            <p className="text-xs text-escola-creme-50">Em breve</p>
          </div>
        </div>
      </div>

      {/* Journal / reflection */}
      <div className="mb-8">
        <h2 className="mb-2 text-xs uppercase tracking-wide text-escola-dourado">
          O teu espaco
        </h2>
        <p className="mb-4 text-sm text-escola-creme-50">
          Antes de fechares este modulo, escreve o que ficou. Nao ha respostas certas — apenas as tuas.
        </p>

        <textarea
          value={content}
          onChange={(e) => updateContent(e.target.value)}
          placeholder="O que me ficou deste modulo..."
          className="min-h-[160px] w-full resize-y rounded-xl border border-escola-border bg-escola-bg px-4 py-3 font-serif text-sm leading-relaxed text-escola-creme placeholder:text-escola-creme-50 focus:border-escola-dourado/40 focus:outline-none"
        />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-escola-creme-50">
            {wordCount > 0 && `${wordCount} ${wordCount === 1 ? "palavra" : "palavras"}`}
            {wordCount >= 50 && " — estas a ir fundo"}
          </span>
          <span className="text-[10px] text-escola-creme-50">
            {!saved ? "A guardar..." : content.length > 0 ? "Guardado" : ""}
          </span>
        </div>

        {/* Starter phrases when empty */}
        {content.length === 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "O que me surpreendeu foi...",
              "Reconheco que...",
              "O que quero lembrar e...",
            ].map((phrase) => (
              <button
                key={phrase}
                onClick={() => updateContent(phrase + " ")}
                className="rounded-full border border-escola-border px-3 py-1.5 font-serif text-xs italic text-escola-creme-50 transition-colors hover:border-escola-dourado/40 hover:text-escola-creme"
              >
                {phrase}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Complete module */}
      {completed ? (
        <div className="text-center">
          <p className="mb-3 text-xs text-escola-creme-50">Modulo completado</p>
          <Link
            href={`/cursos/${slug}/${moduloNum}/completo`}
            className="inline-block rounded-lg bg-escola-dourado/10 px-6 py-3 text-sm font-medium text-escola-dourado"
          >
            Ver conclusao
          </Link>
        </div>
      ) : (
        <button
          onClick={handleComplete}
          className="w-full rounded-lg bg-escola-dourado px-6 py-3 text-sm font-medium text-escola-bg transition-opacity hover:opacity-90"
        >
          Completar modulo
        </button>
      )}
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[50dvh] items-center justify-center">
      <p className="text-escola-creme-50">Nao encontrado.</p>
    </div>
  );
}
