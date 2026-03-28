import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Generate album cover — tries multiple free image APIs.
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

    const keywords = `${title} ${description || ""} ${mood || "atmospheric"} abstract dark`;

    // Try multiple free sources
    let imgBuffer: ArrayBuffer | null = null;

    // 1. Try Pollinations AI (add seed to force unique image each time)
    try {
      const seed = Math.floor(Math.random() * 999999);
      const prompt = encodeURIComponent(`Beautiful album cover art for a song called "${title}". ${description || "contemplative, warm"}. Warm golden light, soft tones, luminous, peaceful, feminine energy. Abstract beauty, soft textures, gentle colors. Hopeful, serene, tender. NO dark imagery, NO skulls, NO horror, NO evil. No text, no words. Square format.`);
      const res = await fetch(`https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&nologo=true&seed=${seed}`, { signal: AbortSignal.timeout(30000) });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        if (buf.byteLength > 5000) imgBuffer = buf;
      }
    } catch { /* try next */ }

    // 2. Try Stable Horde (free, community)
    if (!imgBuffer) {
      try {
        const hordeRes = await fetch("https://stablehorde.net/api/v2/generate/async", {
          method: "POST",
          headers: { "Content-Type": "application/json", "apikey": "0000000000" },
          body: JSON.stringify({
            prompt: `beautiful album cover art, ${title}, ${description || "warm, peaceful"}, golden light, luminous, feminine, soft, hopeful, serene, no text`,
            params: { width: 512, height: 512, steps: 20 },
          }),
        });
        if (hordeRes.ok) {
          const { id } = await hordeRes.json();
          // Poll for result (max 60s)
          for (let i = 0; i < 12; i++) {
            await new Promise(r => setTimeout(r, 5000));
            const checkRes = await fetch(`https://stablehorde.net/api/v2/generate/status/${id}`);
            if (checkRes.ok) {
              const status = await checkRes.json();
              if (status.done && status.generations?.[0]?.img) {
                const imgUrl = status.generations[0].img;
                const dlRes = await fetch(imgUrl);
                if (dlRes.ok) {
                  const buf = await dlRes.arrayBuffer();
                  if (buf.byteLength > 5000) { imgBuffer = buf; break; }
                }
              }
            }
          }
        }
      } catch { /* try next */ }
    }

    if (!imgBuffer) {
      return NextResponse.json({ erro: "Nenhuma API de imagem disponível. Tenta mais tarde." }, { status: 502 });
    }

    // Upload to Supabase Storage
    const supabase = auth.supabase;
    const trackNum = String(track_number).padStart(2, "0");

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
