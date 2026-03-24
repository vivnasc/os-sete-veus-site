import Link from "next/link";
import { COURSES, getCourseBySlug } from "@/data/courses";
import { COURSE_CATEGORIES } from "@/data/course-categories";

export default function CursosPage() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-8 pb-8">
      <h1 className="mb-8 font-serif text-3xl font-semibold text-escola-creme">
        Cursos
      </h1>

      {COURSE_CATEGORIES.map((category) => (
        <section key={category.slug} className="mb-10">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-medium text-escola-creme">
              {category.title}
            </h2>
            <p className="text-xs text-escola-creme-50">{category.subtitle}</p>
          </div>

          <div className="space-y-3">
            {category.courses.map((courseSlug) => {
              const course = getCourseBySlug(courseSlug);
              if (!course) return null;
              return (
                <Link
                  key={course.slug}
                  href={`/cursos/${course.slug}`}
                  className="block rounded-xl border border-escola-border bg-escola-card p-4 transition-colors hover:border-escola-dourado/40"
                >
                  <h3 className="font-serif text-lg font-medium text-escola-creme">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-escola-creme-50">
                    {course.subtitle}
                  </p>
                  <p className="mt-2 text-xs text-escola-dourado/60">
                    {course.modules.length} módulos
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
