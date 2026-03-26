import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Generate album cover using Pollinations AI (free, no API key).
 * POST /api/admin/generate-cover
 * { album_slug, track_number, title, description, mood }
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { album_slug, track_number, title, description, mood } = await req.json();

    if (!album_slug || !track_number || !title) {
      return NextResponse.json({ erro: "album_slug, track_number e title obrigatórios." }, { status: 400 });
    }

    const prompt = `Album cover art for "${title}". ${description || mood || "contemplative, emotional"}. Abstract, atmospheric, cinematic. No text, no words, no letters. Modern music streaming cover art. Square format.`;

    // Pollinations AI — free, no API key needed
    const encoded = encodeURIComponent(prompt);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&nologo=true`;

    const imgRes = await fetch(pollinationsUrl);
    if (!imgRes.ok) {
      return NextResponse.json({ erro: `Pollinations: ${imgRes.status}` }, { status: 502 });
    }

    const imgBuffer = await imgRes.arrayBuffer();
    if (imgBuffer.byteLength < 5000) {
      return NextResponse.json({ erro: "Imagem gerada demasiado pequena." }, { status: 502 });
    }

    // Upload to Supabase Storage
    const supabase = auth.supabase;
    const trackNum = String(track_number).padStart(2, "0");

    // Try both paths
    for (const filename of [`albums/${album_slug}/faixa-${trackNum}-cover.jpg`, `${album_slug}/faixa-${trackNum}-cover.jpg`]) {
      const { error } = await supabase.storage
        .from("audios")
        .upload(filename, imgBuffer, { contentType: "image/jpeg", upsert: true });

      if (!error) {
        const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audios/${filename}`;
        return NextResponse.json({ ok: true, url: publicUrl });
      }
    }

    return NextResponse.json({ erro: "Upload falhou." }, { status: 500 });
  } catch (err: unknown) {
    return NextResponse.json({ erro: String(err) }, { status: 500 });
  }
}
