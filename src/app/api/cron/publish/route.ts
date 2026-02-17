import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { experiences } from "@/data/experiences";
import { nosCollection } from "@/data/nos-collection";

const CRON_SECRET = process.env.CRON_SECRET || "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * GET /api/cron/publish
 *
 * Endpoint chamado diariamente (Vercel Cron ou serviço externo).
 * Verifica quais Espelhos/Nós devem ser publicados hoje com base no calendário.
 *
 * Não modifica ficheiros estáticos — o status é calculado dinamicamente
 * em runtime pelo publish.ts. Este endpoint serve para:
 * 1. Logging de publicações automáticas
 * 2. Trigger de notificações
 * 3. Dashboard de estado
 *
 * Protegido por CRON_SECRET header.
 */
export async function GET(request: Request) {
  // Verificar autenticação (cron secret ou admin)
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  // Espelhos que devem ser publicados hoje
  const publishingToday = experiences.filter(
    (e) => e.status === "coming_soon" && e.launchDate === today
  );

  // Espelhos que entram em early access hoje (7 dias antes)
  const earlyAccessDate = new Date(now);
  earlyAccessDate.setDate(earlyAccessDate.getDate() + 7);
  const earlyAccessToday = experiences.filter(
    (e) =>
      e.status === "coming_soon" &&
      e.launchDate === earlyAccessDate.toISOString().split("T")[0]
  );

  // Nós que acompanham os Espelhos publicados
  const nosPublishingToday = nosCollection.filter((n) => {
    const espelho = publishingToday.find((e) => e.slug === n.espelhoSlug);
    return espelho && n.dataFile; // Só publica se o dataFile existe
  });

  // Calcular status actual de todos os Espelhos
  const allStatuses = experiences.map((e) => {
    const launchDate = e.launchDate ? new Date(e.launchDate) : null;
    let effectiveStatus = e.status;
    if (launchDate && now >= launchDate && e.status === "coming_soon") {
      effectiveStatus = "available";
    }
    return {
      slug: e.slug,
      title: e.title,
      staticStatus: e.status,
      effectiveStatus,
      launchDate: e.launchDate,
      daysUntilLaunch: launchDate
        ? Math.ceil((launchDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null,
    };
  });

  // Registar publicações no Supabase (se disponível)
  if (supabaseServiceKey && publishingToday.length > 0) {
    try {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
      for (const espelho of publishingToday) {
        await supabaseAdmin.from("publish_log").insert({
          type: "espelho_published",
          slug: espelho.slug,
          title: espelho.title,
          published_at: now.toISOString(),
        });
      }
    } catch {
      // Log falhou — não bloqueia
    }
  }

  return NextResponse.json({
    date: today,
    publishingToday: publishingToday.map((e) => ({
      slug: e.slug,
      title: e.title,
    })),
    earlyAccessToday: earlyAccessToday.map((e) => ({
      slug: e.slug,
      title: e.title,
      launchDate: e.launchDate,
    })),
    nosPublishingToday: nosPublishingToday.map((n) => ({
      slug: n.slug,
      title: n.title,
    })),
    allStatuses,
  });
}
