import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase-server";

/**
 * GET /api/admin/track-metadata — lista todos os títulos personalizados
 * POST /api/admin/track-metadata — guardar/actualizar título de uma faixa
 */

function getSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return null;
  return createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } });
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ erro: "SUPABASE_SERVICE_ROLE_KEY não configurada." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("track_metadata")
    .select("album_slug, track_number, custom_title, title_source");

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  // Return as Record<"albumSlug-tN", { title, source }>
  const titles: Record<string, { title: string; source: string }> = {};
  for (const row of data || []) {
    if (row.custom_title) {
      titles[`${row.album_slug}-t${row.track_number}`] = {
        title: row.custom_title,
        source: row.title_source || "manual",
      };
    }
  }

  return NextResponse.json({ titles });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ erro: "SUPABASE_SERVICE_ROLE_KEY não configurada." }, { status: 500 });
  }

  const body = await req.json();
  const { albumSlug, trackNumber, title, source } = body;

  if (!albumSlug || !trackNumber || !title) {
    return NextResponse.json({ erro: "albumSlug, trackNumber e title obrigatórios." }, { status: 400 });
  }

  const { error } = await supabase
    .from("track_metadata")
    .upsert({
      album_slug: albumSlug,
      track_number: trackNumber,
      custom_title: title,
      title_source: source || "manual",
      updated_at: new Date().toISOString(),
    }, { onConflict: "album_slug,track_number" });

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
