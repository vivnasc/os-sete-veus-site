import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/notify-admin";

export async function GET() {
  const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
  const hasChatId = !!process.env.TELEGRAM_CHAT_ID;

  if (!hasToken || !hasChatId) {
    return NextResponse.json({
      ok: false,
      error: "Variaveis de ambiente em falta",
      TELEGRAM_BOT_TOKEN: hasToken ? "configurado" : "EM FALTA",
      TELEGRAM_CHAT_ID: hasChatId ? "configurado" : "EM FALTA",
    }, { status: 400 });
  }

  try {
    // Teste directo da API do Telegram (sem passar pelo notifyAdmin)
    const token = process.env.TELEGRAM_BOT_TOKEN!;
    const chatId = process.env.TELEGRAM_CHAT_ID!;

    const directRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Teste directo — se les isto, o bot funciona.",
        }),
      }
    );

    const directBody = await directRes.json();

    if (!directRes.ok) {
      return NextResponse.json({
        ok: false,
        error: "Telegram rejeitou a mensagem",
        status: directRes.status,
        telegram_response: directBody,
        dica: directBody?.description?.includes("chat not found")
          ? "Precisas de enviar /start ao bot no Telegram primeiro"
          : "Verifica o token e chat ID",
      }, { status: 400 });
    }

    // Se o teste directo funcionou, testar tambem via notifyAdmin
    await notifyAdmin({
      type: "general",
      title: "Teste de notificacao",
      message: "Se estas a ler isto no Telegram, o sistema completo esta operacional.",
      details: {
        Sistema: "Os Sete Veus",
        Estado: "Operacional",
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Ambos os testes enviados com sucesso",
      telegram_message_id: directBody?.result?.message_id,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
