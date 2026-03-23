import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES, getCourseBySlug } from "@/data/courses";
import { getCategoryForCourse } from "@/data/course-categories";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const category = getCategoryForCourse(slug);

  return (
    <div className="mx-auto max-w-lg px-4 pt-8 pb-8">
      {/* Back */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-xs text-escola-creme-50 hover:text-escola-creme"
      >
        <span>&larr;</span> Cursos
      </Link>

      {/* Header */}
      <header className="mb-8">
        {category && (
          <span className="mb-2 block text-xs uppercase tracking-widest text-escola-dourado/60">
            {category.title}
          </span>
        )}
        <h1 className="font-serif text-3xl font-semibold text-escola-creme">
          {course.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-escola-creme-50">
          {course.subtitle}
        </p>
      </header>

      {/* Arc */}
      <div className="mb-8 rounded-xl border border-escola-border bg-escola-card p-5">
        <h2 className="mb-2 font-serif text-sm font-medium uppercase tracking-wide text-escola-dourado">
          Arco emocional
        </h2>
        <p className="text-sm leading-relaxed text-escola-creme-50">
          {course.arcoEmocional}
        </p>
      </div>

      {/* Modules */}
      <h2 className="mb-4 font-serif text-lg font-medium text-escola-creme">
        Modulos
      </h2>
      <div className="space-y-3">
        {course.modules.map((mod) => (
          <Link
            key={mod.number}
            href={`/cursos/${course.slug}/${mod.number}`}
            className="block rounded-xl border border-escola-border bg-escola-card p-4 transition-colors hover:border-escola-dourado/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-escola-dourado/10 text-sm font-medium text-escola-dourado">
                {mod.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-escola-creme">
                  {mod.title}
                </h3>
                <p className="mt-0.5 text-xs text-escola-creme-50">
                  {mod.description}
                </p>
              </div>
            </div>
            <div className="mt-2 flex gap-1.5 pl-11">
              {mod.subLessons.map((sl) => (
                <span
                  key={sl.letter}
                  className="rounded bg-escola-bg px-1.5 py-0.5 text-[10px] text-escola-creme-50"
                >
                  {sl.letter}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
