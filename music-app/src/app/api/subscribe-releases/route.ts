import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Subscribe/unsubscribe to new album release notifications.
 *
 * POST /api/subscribe-releases { email, userId? }  → subscribe
 * DELETE /api/subscribe-releases { email }          → unsubscribe
 * GET /api/subscribe-releases?email=x               → check status
 */

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const { email, userId } = await req.json();
    if (!email) {
      return NextResponse.json({ erro: "Email obrigatório." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from("music_album_subscribers")
      .upsert(
        { email, user_id: userId || null, active: true, unsubscribed_at: null },
        { onConflict: "email" }
      );

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json({ erro: "Tabela ainda não existe. Corre o SQL." }, { status: 503 });
      }
      return NextResponse.json({ erro: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, subscribed: true });
  } catch (err) {
    return NextResponse.json({ erro: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ erro: "Email obrigatório." }, { status: 400 });
    }

    const supabase = getSupabase();
    await supabase
      .from("music_album_subscribers")
      .update({ active: false, unsubscribed_at: new Date().toISOString() })
      .eq("email", email);

    return NextResponse.json({ ok: true, subscribed: false });
  } catch (err) {
    return NextResponse.json({ erro: String(err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ subscribed: false });
  }

  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("music_album_subscribers")
      .select("active")
      .eq("email", email)
      .single();

    return NextResponse.json({ subscribed: !!data?.active });
  } catch {
    return NextResponse.json({ subscribed: false });
  }
}
