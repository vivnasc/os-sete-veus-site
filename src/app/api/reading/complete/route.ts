import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { notifyEspelhoCompleted } from "@/lib/notify-admin";
import { getExperience } from "@/data/experiences";

const CHAPTER_SLUGS = [
  "parte-i",
  "parte-ii",
  "parte-iii",
  "parte-iv",
  "parte-v",
  "parte-vi",
  "epilogo",
];

/**
 * Verifica se a leitora completou todos os capitulos de um Espelho.
 * Se sim, envia notificacao Telegram para a Vivianne (uma unica vez).
 */
export async function POST(request: Request) {
  try {
    const { userId, espelhoSlug } = await request.json();

    if (!userId || !espelhoSlug) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ ok: false }, { status: 503 });
    }

    // Gerar as progress keys para este espelho
    const progressKeys = CHAPTER_SLUGS.map((ch) =>
      espelhoSlug === "veu-da-ilusao" ? ch : `${espelhoSlug}/${ch}`
    );

    // Contar capitulos completados
    const { count } = await supabaseAdmin
      .from("reading_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("completed", true)
      .in("chapter_slug", progressKeys);

    if (count !== 7) {
      return NextResponse.json({ ok: true, completed: false });
    }

    // Buscar email do user
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .single();

    if (!profile?.email) {
      return NextResponse.json({ ok: true, completed: true });
    }

    // Verificar se ja notificamos para evitar duplicados
    // Usa notifications_sent com slug + type unico
    const sentKey = `espelho-complete-${profile.email}-${espelhoSlug}`;
    const { data: alreadySent } = await supabaseAdmin
      .from("notifications_sent")
      .select("id")
      .eq("slug", sentKey)
      .eq("type", "espelho_completed")
      .limit(1);

    if (alreadySent && alreadySent.length > 0) {
      return NextResponse.json({ ok: true, completed: true, alreadyNotified: true });
    }

    const experience = getExperience(espelhoSlug);

    await notifyEspelhoCompleted({
      email: profile.email,
      espelho_title: experience?.title || espelhoSlug,
      espelho_slug: espelhoSlug,
    });

    // Registar que ja notificamos
    await supabaseAdmin.from("notifications_sent").insert({
      slug: sentKey,
      type: "espelho_completed",
      sent_at: new Date().toISOString(),
      recipients: 1,
    });

    return NextResponse.json({ ok: true, completed: true });
  } catch (error) {
    console.error("Reading complete check error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
