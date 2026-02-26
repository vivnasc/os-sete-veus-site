import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/notify-admin";

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN ? "configured" : "MISSING",
    telegram_chat_id: process.env.TELEGRAM_CHAT_ID ? "configured" : "MISSING",
    webhook_url: process.env.ADMIN_NOTIFY_WEBHOOK_URL ? "configured" : "not set",
    supabase_service_key: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "MISSING",
  };

  // Check if Telegram is configured at all
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    return NextResponse.json({
      ok: false,
      error: "Telegram nao configurado",
      message:
        "As variaveis TELEGRAM_BOT_TOKEN e/ou TELEGRAM_CHAT_ID nao estao definidas no ambiente. " +
        "Configura-as no Vercel (Settings > Environment Variables) ou no .env.local.",
      diagnostics,
    });
  }

  // Try sending directly via Telegram API to get the real response
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text =
    "<b>TESTE</b>\nNotificacao de teste\n\n" +
    "Se estas a ler isto no Telegram, as notificacoes estao a funcionar.\n\n" +
    `<b>Sistema:</b> Os Sete Veus\n` +
    `<b>Estado:</b> Operacional\n\n` +
    new Date().toLocaleString("pt-PT", { timeZone: "Africa/Maputo" });

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    const telegramBody = await telegramRes.json();

    if (!telegramRes.ok) {
      // Retry without formatting
      const retryRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: text.replace(/<[^>]*>/g, ""),
          }),
        }
      );

      const retryBody = await retryRes.json();

      if (retryRes.ok) {
        return NextResponse.json({
          ok: true,
          message: "Notificacao enviada (sem formatacao)",
          warning: "O formato HTML falhou. A mensagem foi enviada em texto simples.",
          telegram_error_original: telegramBody.description,
          diagnostics,
        });
      }

      return NextResponse.json(
        {
          ok: false,
          error: "Telegram rejeitou a mensagem",
          telegram_status: telegramRes.status,
          telegram_error: telegramBody.description || telegramBody,
          hint:
            telegramRes.status === 401
              ? "Token do bot invalido. Verifica o TELEGRAM_BOT_TOKEN."
              : telegramRes.status === 400 &&
                  telegramBody?.description?.includes("chat not found")
                ? "Chat ID invalido ou o bot nao foi iniciado. Envia /start ao bot no Telegram primeiro."
                : undefined,
          diagnostics,
        },
        { status: 502 }
      );
    }

    // Telegram succeeded — also save to Supabase notifications
    try {
      await notifyAdmin({
        type: "general",
        title: "Teste de notificacao",
        message: "Teste realizado com sucesso via /api/test-telegram.",
        details: {
          Sistema: "Os Sete Veus",
          Estado: "Operacional",
        },
      });
    } catch {
      // Supabase save is secondary — don't fail the test
    }

    return NextResponse.json({
      ok: true,
      message: "Notificacao enviada com sucesso para o Telegram",
      telegram_message_id: telegramBody.result?.message_id,
      diagnostics,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "Erro de rede ao contactar Telegram API",
        details: String(err),
        diagnostics,
      },
      { status: 502 }
    );
  }
}
