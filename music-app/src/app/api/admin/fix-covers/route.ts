import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/admin/fix-covers
 *
 * Deletes the generated text-only cover PNGs from Supabase
 * so the app falls back to Loranne poses (actual images).
 */

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!serviceKey) return NextResponse.json({ error: "No service key" }, { status: 500 });

  const supabase = createClient(supabaseUrl, serviceKey);
  const bucket = "audios";
  const deleted: string[] = [];
  const errors: string[] = [];

  const { data: albumFolders } = await supabase.storage.from(bucket).list("albums");
  if (!albumFolders) return NextResponse.json({ error: "Cannot list albums/" }, { status: 500 });

  for (const folder of albumFolders) {
    if (!folder.name) continue;
    const albumSlug = folder.name;

    const { data: files } = await supabase.storage.from(bucket).list(`albums/${albumSlug}`);
    if (!files) continue;

    // Find generated text covers (PNG) to delete
    const coverFiles = files.filter(f => /^faixa-\d{2}-cover\.png$/.test(f.name));

    for (const coverFile of coverFiles) {
      const path = `albums/${albumSlug}/${coverFile.name}`;
      const { error } = await supabase.storage.from(bucket).remove([path]);
      if (error) {
        errors.push(`${path}: ${error.message}`);
      } else {
        deleted.push(path);
      }
    }
  }

  return NextResponse.json({
    deleted: deleted.length,
    errors: errors.length,
    details: { deleted, errors },
  });
}
