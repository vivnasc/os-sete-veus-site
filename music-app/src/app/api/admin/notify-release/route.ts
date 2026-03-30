import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Notify all active subscribers about a new album release.
 * POST /api/admin/notify-release { albumTitle, albumSlug, message? }
 *
 * Sends via Telegram to admin (summary) and email to subscribers (future).
 * For now: logs subscribers and notifies admin with count.
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { albumTitle, albumSlug, message } = await req.json();

    if (!albumTitle || !albumSlug) {
      return NextResponse.json({ erro: "albumTitle e albumSlug obrigatórios." }, { status: 400 });
    }

    const supabase = auth.supabase;

    // Get all active subscribers
    const { data: subscribers, error } = await supabase
      .from("music_album_subscribers")
      .select("email")
      .eq("active", true);

    if (error) {
      return NextResponse.json({ erro: error.message }, { status: 500 });
    }

    const emails = (subscribers || []).map((s: { email: string }) => s.email);

    // Notify admin via Telegram with subscriber count
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const customMsg = message ? `\n\n${message}` : "";
      const telegramMsg = `🎶 Novo album publicado: <b>${albumTitle}</b>\n\n${emails.length} subscritores para notificar.${customMsg}\n\nEmails:\n${emails.join("\n") || "(nenhum)"}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMsg,
          parse_mode: "HTML",
        }),
      }).catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      subscriberCount: emails.length,
      albumSlug,
    });
  } catch (err) {
    return NextResponse.json({ erro: String(err) }, { status: 500 });
  }
}
