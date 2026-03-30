import { NextResponse } from "next/server";

/**
 * Notify admin (Telegram) when someone registers on the music app.
 * Called after successful registration.
 *
 * POST /api/notify-register { email }
 */
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ ok: true });

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log("[notify-register] Telegram not configured, skipping");
      return NextResponse.json({ ok: true });
    }

    const message = `🎵 Novo registo na VÉUS Music\n\n${email}\n\n${new Date().toLocaleString("pt-PT", { timeZone: "Africa/Maputo" })}`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
