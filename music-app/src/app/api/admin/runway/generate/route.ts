import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createClient } from "@supabase/supabase-js";

const RUNWAY_API = "https://api.dev.runwayml.com/v1";
const BUCKET = "audios"; // reuse existing bucket for all media

/**
 * Generate a video hook from a share card image using Runway Gen-3 Alpha.
 *
 * POST /api/admin/runway/generate
 * { albumSlug, trackNumber, imageUrl, promptText?, duration? }
 *
 * Flow:
 * 1. Check if video already exists in Supabase → return it
 * 2. Send image to Runway API → get task ID
 * 3. Return task ID for polling
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ erro: "RUNWAY_API_KEY não configurada." }, { status: 500 });
  }

  try {
    const { albumSlug, trackNumber, imageBase64, promptText, duration } = await req.json();

    if (!albumSlug || !trackNumber || !imageBase64) {
      return NextResponse.json({ erro: "albumSlug, trackNumber e imageBase64 obrigatórios." }, { status: 400 });
    }

    const safeAlbum = albumSlug.replace(/[^a-z0-9-]/g, "");
    const safeTrack = String(parseInt(trackNumber, 10)).padStart(2, "0");
    const videoPath = `albums/${safeAlbum}/faixa-${safeTrack}-hook.mp4`;

    // 1. Check if video already exists
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: existing } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(videoPath, 60);

    if (existing?.signedUrl) {
      // Verify it actually exists by checking with a HEAD request
      const check = await fetch(existing.signedUrl, { method: "HEAD" });
      if (check.ok) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${videoPath}`;
        return NextResponse.json({
          status: "exists",
          videoUrl: publicUrl,
          message: "Video já existe."
        });
      }
    }

    // 2. Send to Runway
    const res = await fetch(`${RUNWAY_API}/image_to_video`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Runway-Version": "2024-11-06",
      },
      body: JSON.stringify({
        model: "gen3a_turbo",
        promptImage: imageBase64.startsWith("data:") ? imageBase64 : `data:image/png;base64,${imageBase64}`,
        promptText: promptText || "Slow cinematic movement, gentle light particles floating, subtle camera push-in, ethereal atmosphere",
        duration: duration || 5,
        ratio: "720:1280", // portrait for stories
        watermark: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[runway/generate] Error:", res.status, err);
      return NextResponse.json({ erro: `Runway API: ${res.status} — ${err}` }, { status: 502 });
    }

    const data = await res.json();

    return NextResponse.json({
      status: "generating",
      taskId: data.id,
      albumSlug: safeAlbum,
      trackNumber: parseInt(trackNumber, 10),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ erro: msg }, { status: 500 });
  }
}
