import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/notify-admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/contacto
 *
 * Recebe mensagem do formulario de contacto.
 * Guarda como notificacao admin + notifica via Telegram.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nome, email e mensagem s\u00e3o obrigat\u00f3rios." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email inv\u00e1lido." },
        { status: 400 }
      );
    }

    // Limit message length
    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Mensagem demasiado longa (m\u00e1x. 2000 caracteres)." },
        { status: 400 }
      );
    }

    await notifyAdmin({
      type: "general",
      title: `Mensagem de contacto: ${subject || "Sem assunto"}`,
      message: `${name} (${email}) enviou mensagem:\n\n${message}`,
      details: {
        Nome: name,
        Email: email,
        Assunto: subject || "\u2014",
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Mensagem enviada. Respondemos em breve.",
    });
  } catch (error) {
    console.error("Erro no endpoint de contacto:", error);
    return NextResponse.json(
      { error: "Erro interno. Tenta novamente." },
      { status: 500 }
    );
  }
}
