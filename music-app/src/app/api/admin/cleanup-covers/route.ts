import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

const BUCKET = "audios";

/**
 * Delete all corrupted cover images from Supabase Storage.
 * POST /api/admin/cleanup-covers
 * Scans all album folders and deletes *-cover.* files that are
 * too small (< 5KB = likely error HTML) or empty.
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const supabase = auth.supabase;
  const deleted: string[] = [];
  const kept: string[] = [];

  try {
    // Scan root level folders
    const { data: rootFolders } = await supabase.storage
      .from(BUCKET)
      .list("", { limit: 200 });

    // Scan albums/ folder
    const { data: albumFolders } = await supabase.storage
      .from(BUCKET)
      .list("albums", { limit: 200 });

    const allFolders = [
      ...(rootFolders || []).filter(f => f.id && !f.name.startsWith("carousel-") && !f.name.startsWith("citacao-")).map(f => f.name),
      ...(albumFolders || []).filter(f => f.id).map(f => `albums/${f.name}`),
    ];

    for (const folder of allFolders) {
      const { data: files } = await supabase.storage
        .from(BUCKET)
        .list(folder, { limit: 200 });

      for (const file of files || []) {
        if (!file.name.includes("cover")) continue;

        const path = `${folder}/${file.name}`;

        // Check file size — real images are > 5KB
        if (file.metadata?.size && Number(file.metadata.size) < 5000) {
          const { error } = await supabase.storage.from(BUCKET).remove([path]);
          if (!error) deleted.push(path);
          continue;
        }

        // If no size metadata, download and check
        const { data: blob } = await supabase.storage.from(BUCKET).download(path);
        if (blob) {
          const size = blob.size;
          if (size < 5000) {
            // Check if it's actually HTML/text (error page saved as image)
            const text = await blob.text();
            if (text.includes("<") || text.includes("error") || text.includes("Error")) {
              const { error } = await supabase.storage.from(BUCKET).remove([path]);
              if (!error) deleted.push(path);
              continue;
            }
          }
          kept.push(`${path} (${size} bytes)`);
        }
      }
    }

    return NextResponse.json({ deleted, kept, total: deleted.length });
  } catch (err: unknown) {
    return NextResponse.json({ erro: String(err), deleted }, { status: 500 });
  }
}
