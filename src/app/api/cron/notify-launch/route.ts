import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { experiences } from "@/data/experiences";
import { EARLY_ACCESS_DAYS } from "@/lib/publish";

const CRON_SECRET = process.env.CRON_SECRET || "";
const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN || "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

type NotificationType = "early_access" | "public_launch";

/**
 * GET /api/cron/notify-launch
 *
 * Endpoint chamado diariamente para enviar notificações de lançamento.
 *
 * Duas situações:
 * 1. Early access (7 dias antes): notifica donors/early-access members
 * 2. Lançamento público: notifica todos os membros com acesso mirrors
 *
 * Protegido por CRON_SECRET.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!supabaseServiceKey) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY não configurada" },
      { status: 503 }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const notifications: Array<{ type: NotificationType; espelho: string; sent: number }> = [];

  // 1. Verificar early access (espelhos que lançam daqui a 7 dias)
  const earlyAccessDate = new Date(now);
  earlyAccessDate.setDate(earlyAccessDate.getDate() + EARLY_ACCESS_DAYS);
  const earlyAccessDateStr = earlyAccessDate.toISOString().split("T")[0];

  const earlyAccessEspelhos = experiences.filter(
    (e) => e.status === "coming_soon" && e.launchDate === earlyAccessDateStr
  );

  for (const espelho of earlyAccessEspelhos) {
    // Verificar se já notificámos
    const { data: existing } = await supabaseAdmin
      .from("notifications_sent")
      .select("id")
      .eq("slug", espelho.slug)
      .eq("type", "early_access")
      .single();

    if (existing) continue; // Já enviada

    // Buscar membros com early access (donors: jornada completa ou pack3)
    const { data: earlyMembers } = await supabaseAdmin
      .from("profiles")
      .select("id, email")
      .eq("has_early_access", true)
      .eq("has_mirrors_access", true);

    if (earlyMembers && earlyMembers.length > 0) {
      const sent = await sendNotificationEmails(
        earlyMembers.map((m) => m.email),
        espelho,
        "early_access"
      );

      notifications.push({
        type: "early_access",
        espelho: espelho.slug,
        sent,
      });
    }

    // Registar notificação
    await supabaseAdmin.from("notifications_sent").insert({
      slug: espelho.slug,
      type: "early_access",
      sent_at: now.toISOString(),
      recipients: earlyMembers?.length || 0,
    });
  }

  // 2. Verificar lançamento público (espelhos que lançam hoje)
  const publicLaunchEspelhos = experiences.filter(
    (e) => e.status === "coming_soon" && e.launchDate === today
  );

  for (const espelho of publicLaunchEspelhos) {
    const { data: existing } = await supabaseAdmin
      .from("notifications_sent")
      .select("id")
      .eq("slug", espelho.slug)
      .eq("type", "public_launch")
      .single();

    if (existing) continue;

    // Notificar todos os membros com acesso mirrors
    const { data: allMembers } = await supabaseAdmin
      .from("profiles")
      .select("id, email")
      .eq("has_mirrors_access", true);

    if (allMembers && allMembers.length > 0) {
      const sent = await sendNotificationEmails(
        allMembers.map((m) => m.email),
        espelho,
        "public_launch"
      );

      notifications.push({
        type: "public_launch",
        espelho: espelho.slug,
        sent,
      });
    }

    await supabaseAdmin.from("notifications_sent").insert({
      slug: espelho.slug,
      type: "public_launch",
      sent_at: now.toISOString(),
      recipients: allMembers?.length || 0,
    });
  }

  return NextResponse.json({
    date: today,
    earlyAccessChecked: earlyAccessDateStr,
    notifications,
    message:
      notifications.length > 0
        ? `${notifications.length} notificações enviadas`
        : "Sem lançamentos hoje",
  });
}

/**
 * Envia emails de notificação via MailerLite
 */
async function sendNotificationEmails(
  emails: string[],
  espelho: (typeof experiences)[0],
  type: NotificationType
): Promise<number> {
  if (!MAILERLITE_API_TOKEN || emails.length === 0) return 0;

  const subject =
    type === "early_access"
      ? `Acesso antecipado: ${espelho.title} disponivel para ti`
      : `Novo Espelho disponivel: ${espelho.title}`;

  const body =
    type === "early_access"
      ? `Olá,

Tens acesso antecipado ao novo Espelho — 7 dias antes de todos.

${espelho.title}
${espelho.subtitle}

${espelho.description}

Entra na tua área de membro para começar a ler:
https://seteecos.com/membro

Com verdade,
Vivianne`
      : `Olá,

Um novo Espelho acabou de ser publicado:

${espelho.title}
${espelho.subtitle}

${espelho.description}

Entra na tua área de membro para descobrir esta nova história:
https://seteecos.com/membro

Com verdade,
Vivianne`;

  let sent = 0;

  for (const email of emails) {
    try {
      // Usar MailerLite para enviar via campanha individual
      const res = await fetch(
        "https://connect.mailerlite.com/api/subscribers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
          },
          body: JSON.stringify({
            email,
            fields: {
              last_notification: type,
              last_notification_espelho: espelho.slug,
              notification_subject: subject,
            },
          }),
        }
      );

      if (res.ok || res.status === 409) {
        sent++;
      }
    } catch {
      // Falha individual não bloqueia os outros
    }
  }

  return sent;
}
