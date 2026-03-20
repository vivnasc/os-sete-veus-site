import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      return NextResponse.json({ erro: "SUPABASE_SERVICE_ROLE_KEY não configurada." }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, serviceKey, {
      auth: { persistSession: false },
    });

    const body = await req.json();
    const { album_slug, track_number, version_name, energy, audio_url } = body;

    if (!album_slug || !track_number || !version_name || !energy || !audio_url) {
      return NextResponse.json({ erro: "Campos em falta." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("track_versions")
      .upsert(
        { album_slug, track_number, version_name, energy, audio_url },
        { onConflict: "album_slug,track_number,version_name" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ erro: error.message }, { status: 500 });
    }

    return NextResponse.json({ version: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ erro: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      return NextResponse.json({ erro: "SUPABASE_SERVICE_ROLE_KEY não configurada." }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, serviceKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from("track_versions")
      .select("*")
      .order("album_slug")
      .order("track_number");

    if (error) {
      return NextResponse.json({ erro: error.message }, { status: 500 });
    }

    return NextResponse.json({ versions: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ erro: msg }, { status: 500 });
  }
}
