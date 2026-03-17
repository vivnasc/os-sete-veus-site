import { NextResponse } from "next/server";
import { experiences } from "@/data/experiences";
import { nosCollection } from "@/data/nos-collection";
import { notifyAdmin } from "@/lib/notify-admin";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

const CRON_SECRET = process.env.CRON_SECRET || "";
const REVIEW_DAYS_BEFORE = 3;

/**
 * GET /api/cron/notify-review
 *
 * Endpoint chamado diariamente (cron) para notificar a Vivianne
 * 3 dias antes da publicação de um Espelho ou Nó.
 *
 * Envia notificação via admin_notifications + Telegram + webhook.
 * Usa notifications_sent para não repetir alertas.
 *
 * Protegido por CRON_SECRET.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const now = new Date();
  const reviewDate = new Date(now);
  reviewDate.setDate(reviewDate.getDate() + REVIEW_DAYS_BEFORE);
  const reviewDateStr = reviewDate.toISOString().split("T")[0];

  const notifications: { type: string; title: string; slug: string }[] = [];

  // Check Espelhos launching in 3 days
  const espelhosToReview = experiences.filter((e) => {
    if (e.status === "available" && !e.launchDate) return false;
    return e.launchDate === reviewDateStr;
  });

  for (const espelho of espelhosToReview) {
    // Find corresponding Nó
    const no = nosCollection.find(
      (n) => n.espelhoSlug === espelho.slug && n.dataFile
    );

    const items = [espelho.title];
    if (no) items.push(no.title);

    const alreadySent = await checkAlreadySent(
      `review-${espelho.slug}`,
      "review_reminder"
    );

    if (!alreadySent) {
      await notifyAdmin({
        type: "review_needed" as "general",
        title: `Revisão necessária — publicação em ${REVIEW_DAYS_BEFORE} dias`,
        message: `${items.join(" + ")} publica${items.length > 1 ? "m" : ""} a ${new Date(espelho.launchDate!).toLocaleDateString("pt-PT")}. Revê o conteúdo em /admin/revisao antes da data.`,
        details: {
          Espelho: espelho.title,
          Nó: no ? no.title : "—",
          "Data publicação": new Date(espelho.launchDate!).toLocaleDateString("pt-PT"),
          "Dias restantes": REVIEW_DAYS_BEFORE,
          Link: "https://seteveus.space/admin/revisao",
        },
      });

      await markAsSent(`review-${espelho.slug}`, "review_reminder");

      notifications.push({
        type: "espelho",
        title: espelho.title,
        slug: espelho.slug,
      });

      if (no) {
        notifications.push({
          type: "no",
          title: no.title,
          slug: no.slug,
        });
      }
    }
  }

  return NextResponse.json({
    date: now.toISOString().split("T")[0],
    reviewDate: reviewDateStr,
    notificationsSent: notifications.length,
    notifications,
    espelhosChecked: espelhosToReview.map((e) => e.slug),
  });
}

async function checkAlreadySent(
  slug: string,
  type: string
): Promise<boolean> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return false;

  const { data } = await supabase
    .from("notifications_sent")
    .select("id")
    .eq("slug", slug)
    .eq("type", type)
    .limit(1);

  return !!data && data.length > 0;
}

async function markAsSent(slug: string, type: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return;

  await supabase.from("notifications_sent").insert({
    slug,
    type,
    sent_at: new Date().toISOString(),
    recipients: 1,
  });
}
