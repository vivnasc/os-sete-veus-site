import { NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";
import { ALL_ALBUMS } from "@/data/albums";

/**
 * POST /api/admin/fix-covers
 *
 * For every approved track without a cover in Supabase:
 * 1. Tries to copy from drafts
 * 2. If no draft, generates a cover image inline and uploads
 */

function pickLyric(lyrics: string | undefined): string | null {
  if (!lyrics) return null;
  const lines = lyrics.split("\n").filter(l => {
    const t = l.trim();
    return t.length > 10 && t.length < 60 && !t.startsWith("[");
  });
  if (lines.length === 0) return null;
  return lines[Math.floor(lines.length / 3)].trim();
}

async function generateCoverImage(
  trackTitle: string,
  albumTitle: string,
  albumColor: string,
  lyric: string | null
): Promise<ArrayBuffer> {
  const response = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0D0D1A",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "400px",
            borderRadius: "50%",
            background: albumColor,
            opacity: 0.2,
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "40px",
            position: "relative",
          }}
        >
          <p style={{ fontSize: 18, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666680", marginBottom: 12 }}>
            {albumTitle}
          </p>
          <h1 style={{ fontSize: 52, fontWeight: 700, color: "#F5F0E6", lineHeight: 1.1, marginBottom: 16, maxWidth: 500 }}>
            {trackTitle}
          </h1>
          {lyric && (
            <p style={{ fontSize: 20, fontStyle: "italic", color: `${albumColor}cc`, marginBottom: 20, maxWidth: 400 }}>
              {lyric}
            </p>
          )}
          <p style={{ fontSize: 18, color: "#a0a0b0", marginTop: 8 }}>Loranne</p>
        </div>
      </div>
    ),
    { width: 600, height: 600 }
  );
  return response.arrayBuffer();
}

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!serviceKey) return NextResponse.json({ error: "No service key" }, { status: 500 });

  const supabase = createClient(supabaseUrl, serviceKey);
  const bucket = "audios";
  const fixed: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  const { data: albumFolders } = await supabase.storage.from(bucket).list("albums");
  if (!albumFolders) return NextResponse.json({ error: "Cannot list albums/" }, { status: 500 });

  for (const folder of albumFolders) {
    if (!folder.name) continue;
    const albumSlug = folder.name;
    const album = ALL_ALBUMS.find(a => a.slug === albumSlug);

    const { data: files } = await supabase.storage.from(bucket).list(`albums/${albumSlug}`);
    if (!files) continue;

    const approvedTracks = files
      .filter(f => /^faixa-\d{2}\.mp3$/.test(f.name))
      .map(f => parseInt(f.name.match(/faixa-(\d{2})/)?.[1] || "0", 10))
      .filter(n => n > 0);

    const existingCovers = new Set(
      files
        .filter(f => /^faixa-\d{2}-cover\.(jpg|png)$/.test(f.name))
        .map(f => parseInt(f.name.match(/faixa-(\d{2})-cover/)?.[1] || "0", 10))
    );

    for (const trackNum of approvedTracks) {
      const pad = String(trackNum).padStart(2, "0");
      const finalPath = `albums/${albumSlug}/faixa-${pad}-cover.png`;

      if (existingCovers.has(trackNum)) {
        skipped.push(`${albumSlug}/${pad}`);
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
              contentType: "image/png",
              upsert: true,
            });
            if (!error) { fixed.push(`${albumSlug}/${pad} (draft)`); uploaded = true; }
          }
        }
      } catch { /* try strategy 2 */ }

      // Strategy 2: Generate cover inline
      if (!uploaded) {
        try {
          const track = album?.tracks.find(t => t.number === trackNum);
          const title = track?.title || `Faixa ${trackNum}`;
          const albumTitle = album?.title || albumSlug;
          const color = album?.color || "#C9A96E";
          const lyric = pickLyric(track?.lyrics);

          const imageBuffer = await generateCoverImage(title, albumTitle, color, lyric);

          const { error } = await supabase.storage.from(bucket).upload(finalPath, imageBuffer, {
            contentType: "image/png",
            upsert: true,
          });
          if (!error) {
            fixed.push(`${albumSlug}/${pad} (generated)`);
            uploaded = true;
          } else {
            errors.push(`${albumSlug}/${pad}: ${error.message}`);
          }
        } catch (e) {
          errors.push(`${albumSlug}/${pad}: ${e instanceof Error ? e.message : "unknown"}`);
        }
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
