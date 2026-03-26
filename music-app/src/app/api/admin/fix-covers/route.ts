import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ALL_ALBUMS } from "@/data/albums";

/**
 * POST /api/admin/fix-covers
 *
 * For every approved track that has audio but no cover in Supabase:
 * 1. First tries to copy from drafts (if a draft cover exists)
 * 2. If no draft, generates a cover via /api/og and uploads it
 *
 * This ensures every approved track has a visible cover image.
 */

export async function POST(req: Request) {
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

  // List all album folders
  const { data: albumFolders } = await supabase.storage.from(bucket).list("albums");
  if (!albumFolders) {
    return NextResponse.json({ error: "Cannot list albums/" }, { status: 500 });
  }

  // Get the base URL for generating OG images
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://music.seteveus.space";

  for (const folder of albumFolders) {
    if (!folder.name) continue;
    const albumSlug = folder.name;

    // List files in this album folder
    const { data: files } = await supabase.storage.from(bucket).list(`albums/${albumSlug}`);
    if (!files) continue;

    // Find approved tracks (faixa-XX.mp3)
    const approvedTracks = files
      .filter(f => /^faixa-\d{2}\.mp3$/.test(f.name))
      .map(f => parseInt(f.name.match(/faixa-(\d{2})/)?.[1] || "0", 10))
      .filter(n => n > 0);

    // Find existing covers
    const existingCovers = new Set(
      files
        .filter(f => /^faixa-\d{2}-cover\.jpg$/.test(f.name))
        .map(f => parseInt(f.name.match(/faixa-(\d{2})-cover/)?.[1] || "0", 10))
    );

    for (const trackNum of approvedTracks) {
      const pad = String(trackNum).padStart(2, "0");
      const finalPath = `albums/${albumSlug}/faixa-${pad}-cover.jpg`;

      if (existingCovers.has(trackNum)) {
        skipped.push(`${albumSlug}/${pad} (already has cover)`);
        continue;
      }

      // Strategy 1: Try draft cover
      let uploaded = false;
      try {
        const { data: draftFiles } = await supabase.storage.from(bucket).list("drafts", {
          search: `${albumSlug}-t${trackNum}-`,
        });
        const draftCover = draftFiles?.find(f => f.name.includes("-cover."));
        if (draftCover) {
          const { data: blob } = await supabase.storage.from(bucket).download(`drafts/${draftCover.name}`);
          if (blob && blob.size > 500) {
            const { error } = await supabase.storage.from(bucket).upload(finalPath, blob, {
              contentType: "image/jpeg",
              upsert: true,
            });
            if (!error) {
              fixed.push(`${finalPath} (from draft)`);
              uploaded = true;
            }
          }
        }
      } catch { /* continue to strategy 2 */ }

      // Strategy 2: Generate cover via OG image API
      if (!uploaded) {
        try {
          const ogUrl = `${baseUrl}/api/og?album=${encodeURIComponent(albumSlug)}&track=${trackNum}`;
          const ogRes = await fetch(ogUrl);
          if (ogRes.ok) {
            const ogBlob = await ogRes.blob();
            if (ogBlob.size > 500) {
              // Convert to buffer for upload
              const arrayBuffer = await ogBlob.arrayBuffer();
              const { error } = await supabase.storage.from(bucket).upload(finalPath, arrayBuffer, {
                contentType: "image/png",
                upsert: true,
              });
              if (!error) {
                fixed.push(`${finalPath} (generated)`);
                uploaded = true;
              } else {
                errors.push(`${finalPath}: upload failed — ${error.message}`);
              }
            }
          } else {
            errors.push(`${finalPath}: OG generation failed (${ogRes.status})`);
          }
        } catch (e) {
          errors.push(`${finalPath}: generate failed — ${e instanceof Error ? e.message : "unknown"}`);
        }
      }

      if (!uploaded && !errors.find(e => e.startsWith(finalPath))) {
        errors.push(`${finalPath}: no draft and generation failed`);
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
