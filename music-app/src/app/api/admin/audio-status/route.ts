import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase-server";

const BUCKET = "audios";

/**
 * Lista todas as faixas que existem no bucket audios/albums/.
 * Retorna um Set-like array de chaves "albumSlug/trackNumber".
 * GET /api/admin/audio-status
 */
export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json({ erro: "SUPABASE_SERVICE_ROLE_KEY em falta" }, { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, serviceKey, {
    auth: { persistSession: false },
  });

  // List all folders inside albums/
  const { data: folders, error: foldersError } = await supabase.storage
    .from(BUCKET)
    .list("albums", { limit: 200 });

  if (foldersError) {
    return NextResponse.json({ erro: foldersError.message }, { status: 500 });
  }

  const existing: string[] = [];

  // For each album folder, list files
  for (const folder of folders || []) {
    if (!folder.name) continue;
    const { data: files } = await supabase.storage
      .from(BUCKET)
      .list(`albums/${folder.name}`, { limit: 100 });

    for (const file of files || []) {
      // faixa-01.mp3 → track number 1
      const match = file.name.match(/^faixa-(\d+)\.mp3$/);
      if (match) {
        const trackNum = parseInt(match[1], 10);
        existing.push(`${folder.name}-t${trackNum}`);
      }
    }
  }

  return NextResponse.json({ existing });
}
