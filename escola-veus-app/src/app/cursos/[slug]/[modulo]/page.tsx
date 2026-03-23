"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug } from "@/data/courses";
import { useAuth } from "@/contexts/AuthContext";

export default function ModuloPage() {
  const params = useParams();
  const slug = params.slug as string;
  const moduloNum = parseInt(params.modulo as string, 10);
  const { user, isSubscribed } = useAuth();

  const course = getCourseBySlug(slug);
  if (!course) return <NotFound />;

  const mod = course.modules.find((m) => m.number === moduloNum);
  if (!mod) return <NotFound />;

  const isFreeTier = mod.number === 1;
  const hasAccess = isFreeTier || isSubscribed;

  return (
    <div className="mx-auto max-w-lg px-4 pt-8 pb-8">
      {/* Back */}
      <Link
        href={`/cursos/${slug}`}
        className="mb-6 inline-flex items-center gap-1 text-xs text-escola-creme-50 hover:text-escola-creme"
      >
        <span>&larr;</span> {course.title}
      </Link>

      {/* Header */}
      <header className="mb-6">
        <span className="mb-1 block text-xs text-escola-dourado/60">
          Modulo {mod.number} de {course.modules.length}
        </span>
        <h1 className="font-serif text-2xl font-semibold text-escola-creme">
          {mod.title}
        </h1>
        <p className="mt-1 text-sm text-escola-creme-50">{mod.description}</p>
      </header>

      {/* Access gate */}
      {!hasAccess ? (
        <div className="rounded-xl border border-escola-dourado/30 bg-escola-card p-6 text-center">
          <p className="mb-3 text-sm text-escola-creme-50">
            Este modulo faz parte do curso completo.
          </p>
          <Link
            href="/subscrever"
            className="inline-block rounded-lg bg-escola-dourado px-6 py-2.5 text-sm font-medium text-escola-bg transition-opacity hover:opacity-90"
          >
            Subscrever para aceder
          </Link>
        </div>
      ) : (
        <>
          {/* Video placeholder */}
          <div className="mb-6 flex aspect-video items-center justify-center rounded-xl border border-escola-border bg-escola-card">
            <span className="text-sm text-escola-creme-50">
              Video em breve
            </span>
          </div>

          {/* Sub-lessons */}
          <h2 className="mb-3 font-serif text-lg font-medium text-escola-creme">
            Sub-aulas
          </h2>
          <div className="space-y-2">
            {mod.subLessons.map((sl) => (
              <div
                key={sl.letter}
                className="rounded-lg border border-escola-border bg-escola-card p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-escola-dourado/10 text-xs font-medium text-escola-dourado">
                    {sl.letter}
                  </span>
                  <h3 className="text-sm font-medium text-escola-creme">
                    {sl.title}
                  </h3>
                </div>
                <p className="mt-1.5 pl-8 text-xs leading-relaxed text-escola-creme-50">
                  {sl.description}
                </p>
              </div>
            ))}
          </div>

          {/* Workbook */}
          {mod.workbook && (
            <div className="mt-6 rounded-xl border border-escola-dourado/20 bg-escola-card p-4">
              <h3 className="text-xs uppercase tracking-wide text-escola-dourado">
                Caderno de exercicios
              </h3>
              <p className="mt-1 text-sm text-escola-creme">{mod.workbook}</p>
              <p className="mt-2 text-xs text-escola-creme-50">Em breve.</p>
            </div>
          )}
        </>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        {mod.number > 1 && (
          <Link
            href={`/cursos/${slug}/${mod.number - 1}`}
            className="text-xs text-escola-creme-50 hover:text-escola-creme"
          >
            &larr; Modulo {mod.number - 1}
          </Link>
        )}
        <span />
        {mod.number < course.modules.length && (
          <Link
            href={`/cursos/${slug}/${mod.number + 1}`}
            className="text-xs text-escola-creme-50 hover:text-escola-creme"
          >
            Modulo {mod.number + 1} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[50dvh] items-center justify-center">
      <p className="text-escola-creme-50">Modulo nao encontrado.</p>
    </div>
  );
}
