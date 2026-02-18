import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const MAILERLITE_API_TOKEN =
  process.env.MAILERLITE_API_TOKEN ||
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWMwYjkwMDA2NWRiZWVkMWQ3NTlhNjViZDhiZTY1ODllZjE0ZjI2ZTIyOWU4ZWM4Y2M0ODcwMzQ2YzNmNjZjMDIzNjdmZmZiOThmMWY5ZGQiLCJpYXQiOjE3NzAzODY2NjcuMjQwNzA1LCJuYmYiOjE3NzAzODY2NjcuMjQwNzA4LCJleHAiOjQ5MjYwNjAyNjcuMjM3MzY5LCJzdWIiOiIyMTEyNzYwIiwic2NvcGVzIjpbXX0.UnF2B_H9QMolD_C88MlDIRWfsrYQRGheGFod9KB8yfrQy6Zafa1mDs7oW1PjZ9iRHGJsTXl5RXsojv0wGuEUj4f6skyUUSp2JNxZj6o8VxfP9MbYcLHbb0UaFndAKJIeDiE2JPqCZB518eiT3gv5EEhU1iMd198ASlZaeTTNCck0KhHeCOVMPLWZQcnnWMr37hWagdTwXyGN_oNOrLefWWM0rBbKekBwBe3ShFTNUAxBDu1giPSuTDTUz_klVTq5y0B0TN1Tzhw04HyKN6CXMq_cGeHj3Ls320cMJioXz9YBOiKIYSGkK2H1cv3DH4I-ZTJkFFbql7to8vlwTFILRN3aoigAfFgkaVtAoF_VdP7v6U4wGmt9nssgYLVt4NUUCRQTo3Aa5VJJ-AX9_4GgBgR9lI3WUZKkyLjDg087lW_1EiVLOIGwK2irLuxTNi54dxevj5i3mVNAMDp6dJX46wnssF1OxbAZhK3hV-OrFDjaow2pMkSBVAHidxphoky0lJ7l4APMj1Vlc4po2zwq0o0gnptyGl3Ie_5gvoPGLtlB1afaS7fQbHsFMp0MmywCeBFfCPIHWm00uJcGG2GFOv8CGHEu8w6OOY7jl1I7c6mbgxFYAf-03yVxBmZn85w4VxmhQL70q3ZrSjy6IfswYC1xVCyNhyFkyeJXC9mZWAs";

const AUTHOR_EMAIL = "viv.saraiva@gmail.com";

/**
 * POST /api/interesse
 *
 * Regista manifestacao de interesse de leitor do livro fisico.
 * Guarda no Supabase (livro_code_requests) + notifica autora via MailerLite.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, whatsapp, source } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Nome e email s\u00e3o obrigat\u00f3rios." },
        { status: 400 }
      );
    }

    // ── Save to Supabase ──────────────────────────────────────────────────

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    // Check for existing pending request
    const { data: existing } = await supabase
      .from("livro_code_requests")
      .select("id, status")
      .eq("email", email)
      .in("status", ["pending", "approved"])
      .single();

    if (existing) {
      return NextResponse.json(
        {
          error:
            existing.status === "approved"
              ? "J\u00e1 tens um c\u00f3digo atribu\u00eddo. Verifica o teu email."
              : "J\u00e1 recebemos o teu pedido. Vamos entrar em contacto em breve.",
        },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from("livro_code_requests")
      .insert({
        full_name: fullName,
        email,
        whatsapp: whatsapp || null,
        purchase_location: source || "interesse-digital",
        status: "pending",
      });

    if (insertError) {
      console.error("Erro ao guardar interesse:", insertError);
      return NextResponse.json(
        { error: "Erro ao guardar. Tenta novamente." },
        { status: 500 }
      );
    }

    // ── Add subscriber to MailerLite (for newsletter) ─────────────────────

    try {
      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
        },
        body: JSON.stringify({
          email,
          fields: {
            name: fullName,
            phone: whatsapp || "",
            interesse_digital: "sim",
            source: source || "acesso-digital",
          },
        }),
      });
    } catch {
      // Non-blocking: continue even if MailerLite fails
    }

    // ── Notify author via MailerLite (update her subscriber record) ───────

    try {
      const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
      const whatsappInfo = whatsapp ? ` | WhatsApp: ${whatsapp}` : "";

      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
        },
        body: JSON.stringify({
          email: AUTHOR_EMAIL,
          fields: {
            ultimo_interesse: `${fullName} (${email})${whatsappInfo} - ${timestamp}`,
            total_interesses_pendentes: "ver /autora/codigos",
          },
        }),
      });
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      message: "Interesse registado. Entraremos em contacto em breve.",
    });
  } catch (error) {
    console.error("Erro no endpoint de interesse:", error);
    return NextResponse.json(
      { error: "Erro interno." },
      { status: 500 }
    );
  }
}
