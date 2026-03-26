import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/admin/fix-covers
 *
 * Finds all approved tracks that have a draft cover in Supabase but
 * no cover in the albums/ path. Copies the draft cover to the final path.
 *
 * Draft cover:  audios/drafts/{slug}-t{track}-v{N}-cover.jpg
 * Final cover:  audios/albums/{slug}/faixa-{track:02d}-cover.jpg
 */

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!serviceKey) {
    return NextResponse.json({ error: "No service key" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const bucket = "audios";
  const fixed: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  // 1. List all files in albums/ to find approved tracks
  const { data: albumFolders } = await supabase.storage.from(bucket).list("albums");
  if (!albumFolders) {
    return NextResponse.json({ error: "Cannot list albums/" }, { status: 500 });
  }

  for (const folder of albumFolders) {
    if (!folder.name) continue;
    const albumSlug = folder.name;

    // List files in this album folder
    const { data: files } = await supabase.storage.from(bucket).list(`albums/${albumSlug}`);
    if (!files) continue;

    // Find approved tracks (faixa-XX.mp3 files)
    const approvedTracks = files
      .filter(f => /^faixa-\d{2}\.mp3$/.test(f.name))
      .map(f => parseInt(f.name.match(/faixa-(\d{2})/)?.[1] || "0", 10))
      .filter(n => n > 0);

    // Check which ones already have covers
    const existingCovers = new Set(
      files
        .filter(f => /^faixa-\d{2}-cover\.jpg$/.test(f.name))
        .map(f => parseInt(f.name.match(/faixa-(\d{2})-cover/)?.[1] || "0", 10))
    );

    for (const trackNum of approvedTracks) {
      if (existingCovers.has(trackNum)) {
        skipped.push(`${albumSlug}/faixa-${String(trackNum).padStart(2, "0")} (already has cover)`);
        continue;
      }

      // Find draft cover for this track
      // Pattern: drafts/{albumSlug}-t{trackNum}-v{N}-cover.jpg
      const { data: draftFiles } = await supabase.storage.from(bucket).list("drafts", {
        search: `${albumSlug}-t${trackNum}-`,
      });

      const draftCover = draftFiles?.find(f => f.name.includes("-cover."));
      if (!draftCover) {
        skipped.push(`${albumSlug}/faixa-${String(trackNum).padStart(2, "0")} (no draft cover found)`);
        continue;
      }

      // Download draft cover
      const draftPath = `drafts/${draftCover.name}`;
      const { data: blob, error: dlErr } = await supabase.storage.from(bucket).download(draftPath);
      if (dlErr || !blob) {
        errors.push(`${draftPath}: download failed — ${dlErr?.message}`);
        continue;
      }

      // Upload to final path
      const finalPath = `albums/${albumSlug}/faixa-${String(trackNum).padStart(2, "0")}-cover.jpg`;
      const { error: upErr } = await supabase.storage.from(bucket).upload(finalPath, blob, {
        contentType: "image/jpeg",
        upsert: true,
      });

      if (upErr) {
        errors.push(`${finalPath}: upload failed — ${upErr.message}`);
      } else {
        fixed.push(`${finalPath} (from ${draftPath})`);
      }
    }
  }

  return NextResponse.json({
    fixed: fixed.length,
    skipped: skipped.length,
    errors: errors.length,
    details: { fixed, skipped, errors },
  });
}
