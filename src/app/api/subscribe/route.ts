import { NextResponse } from "next/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase-server";

const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN || "";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Save to Supabase and MailerLite in parallel
    const [supabaseRes, mailerliteRes] = await Promise.allSettled([
      fetch(`${SUPABASE_URL}/rest/v1/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email }),
      }),
      fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
        },
        body: JSON.stringify({ email }),
      }),
    ]);

    // Check if at least one succeeded
    const supabaseOk =
      supabaseRes.status === "fulfilled" &&
      (supabaseRes.value.ok || supabaseRes.value.status === 409);
    const mailerliteOk =
      mailerliteRes.status === "fulfilled" &&
      (mailerliteRes.value.ok || mailerliteRes.value.status === 409);

    if (!supabaseOk && !mailerliteOk) {
      return NextResponse.json({ error: "Erro ao guardar" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
