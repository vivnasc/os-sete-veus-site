import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Generate album cover using DALL-E 3.
 * POST /api/admin/generate-cover
 * { album_slug, track_number, title, description, mood }
 *
 * Generates image, uploads to Supabase Storage, returns URL.
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ erro: "OPENAI_API_KEY não configurada." }, { status: 500 });
  }

  try {
    const { album_slug, track_number, title, description, mood } = await req.json();

    if (!album_slug || !track_number || !title) {
      return NextResponse.json({ erro: "album_slug, track_number e title obrigatórios." }, { status: 400 });
    }

    // Build visual prompt — poetic, dark, warm, no text
    const prompt = `Album cover art. Dark background (#0D0D1A to #1A1A2E).
Feminine silhouette, faceless, warm terracotta and gold tones.
Ethereal, poetic, intimate. No text, no words, no letters.
Theme: "${title}" — ${description || mood || "contemplative, transformative"}.
Style: editorial fine art photography meets digital art.
Atmospheric, cinematic lighting. Mysterious and beautiful.
Square format, high quality.`;

    // Call DALL-E 3
    const dalleRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    });

    if (!dalleRes.ok) {
      const err = await dalleRes.text();
      return NextResponse.json({ erro: `DALL-E: ${dalleRes.status} — ${err.slice(0, 200)}` }, { status: 502 });
    }

    const dalleData = await dalleRes.json();
    const imageUrl = dalleData.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json({ erro: "DALL-E não devolveu imagem." }, { status: 502 });
    }

    // Download the generated image
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      return NextResponse.json({ erro: "Erro ao descarregar imagem do DALL-E." }, { status: 502 });
    }
    const imgBuffer = await imgRes.arrayBuffer();

    // Upload to Supabase Storage
    const supabase = auth.supabase;
    const trackNum = String(track_number).padStart(2, "0");
    const filename = `albums/${album_slug}/faixa-${trackNum}-cover.jpg`;

    // Try upload (upsert)
    const { error: uploadError } = await supabase.storage
      .from("audios")
      .upload(filename, imgBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      // Try without albums/ prefix
      const altFilename = `${album_slug}/faixa-${trackNum}-cover.jpg`;
      const { error: altError } = await supabase.storage
        .from("audios")
        .upload(altFilename, imgBuffer, {
          contentType: "image/png",
          upsert: true,
        });

      if (altError) {
        return NextResponse.json({ erro: `Upload: ${altError.message}` }, { status: 500 });
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audios/${altFilename}`;
      return NextResponse.json({ ok: true, url: publicUrl });
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audios/${filename}`;
    return NextResponse.json({ ok: true, url: publicUrl });

  } catch (err: unknown) {
    return NextResponse.json({ erro: String(err) }, { status: 500 });
  }
}
