import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/notify-admin";

export async function GET() {
  try {
    await notifyAdmin({
      type: "general",
      title: "Teste de notificacao",
      message: "Se estás a ler isto no Telegram, as notificacoes estao a funcionar.",
      details: {
        Sistema: "Os Sete Véus",
        Estado: "Operacional",
      },
    });

    return NextResponse.json({ ok: true, message: "Notificacao enviada" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
