import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Notify admin about subscribers when publishing a new album.
 * Sends WhatsApp numbers list to admin via Telegram for broadcast.
 *
 * POST /api/admin/notify-release { albumTitle, albumSlug }
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { albumTitle, albumSlug } = await req.json();

    if (!albumTitle || !albumSlug) {
      return NextResponse.json({ erro: "albumTitle e albumSlug obrigatórios." }, { status: 400 });
    }

    const supabase = auth.supabase;

    const { data: subscribers, error } = await supabase
      .from("music_album_subscribers")
      .select("whatsapp, name")
      .eq("active", true);

    if (error) {
      return NextResponse.json({ erro: error.message }, { status: 500 });
    }

    const list = (subscribers || []) as { whatsapp: string; name: string | null }[];

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const numberList = list.length > 0
        ? list.map(s => `${s.whatsapp}${s.name ? ` (${s.name})` : ""}`).join("\n")
        : "(nenhum subscritor)";

      const msg = [
        `🎶 <b>Novo album publicado: ${albumTitle}</b>`,
        ``,
        `${list.length} subscritores para notificar via WhatsApp:`,
        ``,
        numberList,
        ``,
        `Copia os numeros e cria um broadcast no WhatsApp.`,
      ].join("\n");

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: "HTML" }),
      }).catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      subscriberCount: list.length,
      subscribers: list,
    });
  } catch (err) {
    return NextResponse.json({ erro: String(err) }, { status: 500 });
  }
}
