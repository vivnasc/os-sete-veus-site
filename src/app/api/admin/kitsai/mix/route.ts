import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Misturar vocal convertido com instrumental e fazer upload para Supabase.
 *
 * POST body: {
 *   vocalUrl: string,      — URL do vocal convertido (Kits.ai output)
 *   backingUrl: string,     — URL do instrumental (Kits.ai separation output)
 *   albumSlug: string,      — Slug do album
 *   trackNumber: number,    — Numero da faixa
 *   vocalVolume?: number,   — Volume do vocal 0-1 (default 0.85)
 * }
 *
 * Como nao temos ffmpeg no servidor, fazemos mix simples via Web Audio API no cliente.
 * Esta rota faz o upload do audio final ja misturado.
 *
 * Alternativa: recebe o ficheiro final (mixado no browser) e faz upload.
 *
 * POST multipart: file + albumSlug + trackNumber
 */

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { erro: "Supabase nao configurado." },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const albumSlug = formData.get("albumSlug") as string;
    const trackNumber = formData.get("trackNumber") as string;

    if (!file || !albumSlug || !trackNumber) {
      return NextResponse.json(
        { erro: "file, albumSlug e trackNumber em falta." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const filename = `albums/${albumSlug}/faixa-${String(Number(trackNumber)).padStart(2, "0")}.mp3`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("audios")
      .upload(filename, buffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { erro: `Upload falhou: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("audios")
      .getPublicUrl(filename);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { erro: "Excepcao: " + msg },
      { status: 500 }
    );
  }
}
