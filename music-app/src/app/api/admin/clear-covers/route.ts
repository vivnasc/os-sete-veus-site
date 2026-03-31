import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

const BUCKET = "audios";

/**
 * Delete all cover images for an album.
 * POST /api/admin/clear-covers { albumSlug }
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { albumSlug } = await req.json();
    if (!albumSlug) {
      return NextResponse.json({ erro: "albumSlug obrigatório." }, { status: 400 });
    }

    const supabase = auth.supabase;
    const safeSlug = albumSlug.replace(/[^a-z0-9-]/g, "");

    // List all files in both possible paths
    const deleted: string[] = [];
    for (const folder of [`albums/${safeSlug}`, safeSlug]) {
      const { data: files } = await supabase.storage.from(BUCKET).list(folder, { limit: 200 });
      if (!files) continue;

      const covers = files.filter(f => f.name.includes("-cover.")).map(f => `${folder}/${f.name}`);
      if (covers.length > 0) {
        await supabase.storage.from(BUCKET).remove(covers);
        deleted.push(...covers);
      }
    }

    return NextResponse.json({ ok: true, deleted, count: deleted.length });
  } catch (err) {
    return NextResponse.json({ erro: String(err) }, { status: 500 });
  }
}
