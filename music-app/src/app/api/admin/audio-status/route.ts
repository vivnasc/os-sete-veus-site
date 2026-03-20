import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

const BUCKET = "audios";

/**
 * Lista todas as faixas que existem no bucket audios/albums/.
 * Retorna um Set-like array de chaves "albumSlug/trackNumber".
 * GET /api/admin/audio-status
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req.headers.get("cookie"));
  if (!auth.ok) return auth.response;

  const supabase = auth.supabase;

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
