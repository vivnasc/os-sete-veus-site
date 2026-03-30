import { NextRequest, NextResponse } from "next/server";

const BUCKET = "audios";

/**
 * Check if a hook video exists for a track.
 * GET /api/music/hook-video?album=espelho-ilusao&track=1
 * Returns: { exists: boolean, videoUrl?: string }
 */
export async function GET(req: NextRequest) {
  const album = req.nextUrl.searchParams.get("album");
  const track = req.nextUrl.searchParams.get("track");

  if (!album || !track) {
    return NextResponse.json({ exists: false });
  }

  const safeAlbum = album.replace(/[^a-z0-9-]/g, "");
  const safeTrack = String(parseInt(track, 10)).padStart(2, "0");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return NextResponse.json({ exists: false });
  }

  const videoUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/albums/${safeAlbum}/faixa-${safeTrack}-hook.mp4`;

  try {
    const res = await fetch(videoUrl, { method: "HEAD" });
    if (res.ok) {
      return NextResponse.json(
        { exists: true, videoUrl },
        { headers: { "Cache-Control": "public, s-maxage=300" } }
      );
    }
    return NextResponse.json({ exists: false });
  } catch {
    return NextResponse.json({ exists: false });
  }
}
