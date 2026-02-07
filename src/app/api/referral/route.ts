import { NextResponse } from "next/server";

const SUPABASE_URL = "https://tdytdamtfillqyklgrmb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXRkYW10ZmlsbHF5a2xncm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzk4ODAsImV4cCI6MjA4NTk1NTg4MH0.W1w_M7dQXgPehDP0NUWWE4QHcW214XGVRIVXtG5n9z4";

/**
 * Referral tracking API
 * POST — logs a referral share action
 * GET ?user_id=xxx — returns referral stats for a user
 */
export async function POST(request: Request) {
  try {
    const { userId, platform, referralCode } = await request.json();

    if (!userId || !platform) {
      return NextResponse.json(
        { error: "userId e platform são obrigatórios" },
        { status: 400 }
      );
    }

    const code = referralCode || `ECOS-${userId.substring(0, 8).toUpperCase()}`;

    // Log referral action to Supabase
    const res = await fetch(`${SUPABASE_URL}/rest/v1/referrals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        user_id: userId,
        platform,
        referral_code: code,
        shared_at: new Date().toISOString(),
      }),
    });

    if (!res.ok && res.status !== 409) {
      return NextResponse.json({ error: "Erro ao guardar referral" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      referralCode: code,
      shareUrl: `https://seteecos.com/recursos/teste?ref=${code}`,
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "user_id obrigatório" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/referrals?user_id=eq.${userId}&select=*&order=shared_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    const data = await res.json();

    return NextResponse.json({
      totalShares: Array.isArray(data) ? data.length : 0,
      referrals: Array.isArray(data) ? data : [],
      referralCode: Array.isArray(data) && data.length > 0
        ? data[0].referral_code
        : `ECOS-${userId.substring(0, 8).toUpperCase()}`,
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
