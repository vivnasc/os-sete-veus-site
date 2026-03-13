"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { courses } from "@/data/courses";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

interface CourseStats {
  slug: string;
  totalLearners: number;
  completedLearners: number;
  avgProgress: number;
}

export default function AdminCursosPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const isAdmin = profile?.is_admin || ADMIN_EMAILS.includes(user?.email || "");

  const [stats, setStats] = useState<CourseStats[]>([]);
  const [totalWithAccess, setTotalWithAccess] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/entrar");
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (user && isAdmin) {
      loadStats();
    }
  }, [user, isAdmin]);

  async function loadStats() {
    setLoading(true);

    try {
      // Members with courses access
      const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("has_courses_access", true);

      setTotalWithAccess(count || 0);

      // Course progress stats
      const { data: progressData } = await supabase
        .from("reading_progress")
        .select("chapter_slug, user_id, completed")
        .like("chapter_slug", "curso-%");

      if (progressData) {
        const courseStats: Record<string, { users: Set<string>; completed: Set<string>; completedLessons: number; totalLessons: number }> = {};

        courses.forEach((c) => {
          courseStats[c.slug] = { users: new Set(), completed: new Set(), completedLessons: 0, totalLessons: c.lessons };
        });

        progressData.forEach((row) => {
          // Extract course slug from "curso-{courseSlug}/{lessonSlug}"
          const match = row.chapter_slug.match(/^curso-([^/]+)\//);
          if (match) {
            const courseSlug = match[1];
            if (courseStats[courseSlug]) {
              courseStats[courseSlug].users.add(row.user_id);
              if (row.completed) {
                courseStats[courseSlug].completedLessons++;
              }
            }
          }
        });

        // Check who completed all lessons
        const userCourseLessons: Record<string, Record<string, number>> = {};
        progressData.forEach((row) => {
          if (!row.completed) return;
          const match = row.chapter_slug.match(/^curso-([^/]+)\//);
          if (match) {
            const courseSlug = match[1];
            if (!userCourseLessons[courseSlug]) userCourseLessons[courseSlug] = {};
            if (!userCourseLessons[courseSlug][row.user_id]) userCourseLessons[courseSlug][row.user_id] = 0;
            userCourseLessons[courseSlug][row.user_id]++;
          }
        });

        const result = courses.map((c) => {
          const s = courseStats[c.slug];
          const completedUsers = Object.entries(userCourseLessons[c.slug] || {}).filter(
            ([, count]) => count >= c.lessons
          ).length;

          return {
            slug: c.slug,
            totalLearners: s.users.size,
            completedLearners: completedUsers,
            avgProgress: s.users.size > 0 ? Math.round((s.completedLessons / (s.users.size * s.totalLessons)) * 100) : 0,
          };
        });

        setStats(result);
      }
    } catch (error) {
      console.error("Error loading course stats:", error);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sage border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-sage/20 bg-white/50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin"
                className="text-sm text-sage hover:text-forest transition-colors"
              >
                &larr; Painel
              </Link>
              <h1 className="mt-2 font-display text-3xl text-forest">
                Cursos
              </h1>
              <p className="mt-1 text-sage">
                Gestao de cursos e progresso das alunas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Overview stats */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-sage/20 bg-white/50 p-6">
            <p className="text-sm text-sage">Total de cursos</p>
            <p className="mt-2 font-display text-3xl text-forest">{courses.length}</p>
            <p className="mt-1 text-xs text-sage/60">
              {courses.filter((c) => c.status === "available").length} disponiveis
            </p>
          </div>
          <div className="rounded-lg border border-sage/20 bg-white/50 p-6">
            <p className="text-sm text-sage">Alunas com acesso</p>
            <p className="mt-2 font-display text-3xl text-forest">
              {loading ? "..." : totalWithAccess}
            </p>
          </div>
          <div className="rounded-lg border border-sage/20 bg-white/50 p-6">
            <p className="text-sm text-sage">Receita potencial</p>
            <p className="mt-2 font-display text-3xl text-forest">
              ${courses.length * 39}
            </p>
            <p className="mt-1 text-xs text-sage/60">
              Se todas vendidas individualmente
            </p>
          </div>
        </div>

        {/* Courses table */}
        <div className="rounded-lg border border-sage/20 bg-white/50">
          <div className="border-b border-sage/10 px-6 py-4">
            <h2 className="font-display text-xl text-forest">
              Todos os cursos
            </h2>
          </div>
          <div className="divide-y divide-sage/10">
            {courses.map((course) => {
              const stat = stats.find((s) => s.slug === course.slug);
              return (
                <div key={course.slug} className="flex items-center gap-6 px-6 py-5">
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-base text-forest">
                        {course.title}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wider ${
                          course.status === "available"
                            ? "bg-sage/10 text-sage"
                            : "bg-brown-50 text-brown-400"
                        }`}
                      >
                        {course.status === "available" ? "Disponivel" : course.launchLabel}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-sage/70">
                      {course.subtitle} · {course.lessons} licoes · {course.totalDuration}
                    </p>
                    <div className="mt-1 flex gap-4 text-xs text-sage/50">
                      <span>Temas: {course.themes.join(", ")}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg text-forest">
                      {loading ? "..." : stat?.totalLearners || 0}
                    </p>
                    <p className="text-xs text-sage/50">
                      {loading ? "" : `${stat?.completedLearners || 0} completaram`}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg text-forest">
                      {loading ? "..." : `${stat?.avgProgress || 0}%`}
                    </p>
                    <p className="text-xs text-sage/50">progresso medio</p>
                  </div>
                  <div className="shrink-0">
                    <span className="font-display text-base text-forest">
                      ${course.priceUSD}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/cursos"
            className="rounded-lg border border-sage/20 bg-white/50 p-4 text-center text-sm text-sage hover:border-sage/40 transition-colors"
          >
            Ver pagina publica
          </Link>
          <Link
            href="/comprar/cursos"
            className="rounded-lg border border-sage/20 bg-white/50 p-4 text-center text-sm text-sage hover:border-sage/40 transition-colors"
          >
            Ver pagina de compra
          </Link>
          <Link
            href="/admin/pagamentos"
            className="rounded-lg border border-sage/20 bg-white/50 p-4 text-center text-sm text-sage hover:border-sage/40 transition-colors"
          >
            Pagamentos pendentes
          </Link>
        </div>
      </div>
    </div>
  );
}
