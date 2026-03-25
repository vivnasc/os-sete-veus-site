import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "audios";

/**
 * Public endpoint — lists tracks with published audio.
 * GET /api/published-tracks
 * Returns: { tracks: ["espelho-ilusao-t1", "espelho-ilusao-t3", ...] }
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ tracks: [] });
  }

  const supabase = createClient(url, key);

  try {
    const { data: folders } = await supabase.storage
      .from(BUCKET)
      .list("albums", { limit: 200 });

    const tracks: string[] = [];

    for (const folder of folders || []) {
      if (!folder.name) continue;
      const { data: files } = await supabase.storage
        .from(BUCKET)
        .list(`albums/${folder.name}`, { limit: 100 });

      for (const file of files || []) {
        const mainMatch = file.name.match(/^faixa-(\d+)\.mp3$/);
        if (mainMatch) {
          tracks.push(`${folder.name}-t${parseInt(mainMatch[1], 10)}`);
        }
      }
    }

    return NextResponse.json(
      { tracks },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json({ tracks: [] });
  }
}
