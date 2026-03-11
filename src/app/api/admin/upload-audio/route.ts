import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "audios";

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { erro: "Env vars em falta: SUPABASE_URL=" + !!supabaseUrl + " SERVICE_KEY=" + !!serviceKey },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const filename = formData.get("filename") as string | null;

    if (!file || !filename) {
      return NextResponse.json({ erro: "Ficheiro ou nome em falta." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, uint8, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ erro: "Supabase upload erro: " + error.message }, { status: 500 });
    }

    const url = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(filename)}`;
    return NextResponse.json({ url });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ erro: "Excepção não apanhada: " + msg }, { status: 500 });
  }
}
