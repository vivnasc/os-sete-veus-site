import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/courses/generate-audio
 * Generates audio for a course sub-lesson via ElevenLabs and uploads to Supabase.
 *
 * Body: { script: string, courseSlug: string, moduleNum: number, subLetter: string, voiceId: string, apiKey: string, model?: "v2" | "v3" }
 * Returns: { url: string } (Supabase public URL of the audio)
 */
export async function POST(req: NextRequest) {
  try {
    const { script, courseSlug, moduleNum, subLetter, voiceId, apiKey, model } =
      await req.json();

    if (!script || !courseSlug || !moduleNum || !subLetter || !voiceId || !apiKey) {
      return NextResponse.json(
        { erro: "Campos obrigatorios em falta." },
        { status: 400 }
      );
    }

    // 1. Generate audio via ElevenLabs
    const modelId = model === "v3" ? "eleven_v3" : "eleven_multilingual_v2";
    const voiceSettings =
      model === "v3"
        ? { stability: 0.45, similarity_boost: 0.75 }
        : { stability: 0.55, similarity_boost: 0.8, style: 0.15 };

    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: script,
          model_id: modelId,
          voice_settings: voiceSettings,
        }),
      }
    );

    if (!elevenRes.ok) {
      const erro = await elevenRes.text();
      return NextResponse.json(
        { erro: `ElevenLabs: ${elevenRes.status} — ${erro}` },
        { status: 500 }
      );
    }

    const audioBuffer = await elevenRes.arrayBuffer();
    if (audioBuffer.byteLength === 0) {
      return NextResponse.json(
        { erro: "ElevenLabs devolveu ficheiro vazio." },
        { status: 500 }
      );
    }

    // 2. Upload to Supabase Storage
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://tdytdamtfillqyklgrmb.supabase.co";

    if (!serviceKey) {
      // Return audio as download if no service key
      return new NextResponse(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": `attachment; filename="curso-${courseSlug}-m${moduleNum}-${subLetter.toLowerCase()}.mp3"`,
        },
      });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    const filePath = `courses/${courseSlug}/m${moduleNum}/${subLetter.toLowerCase()}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from("course-audio")
      .upload(filePath, new Uint8Array(audioBuffer), {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { erro: `Upload: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const url = `${supabaseUrl}/storage/v1/object/public/course-audio/${filePath}`;
    return NextResponse.json({ url, path: filePath });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { erro: `Excepcao: ${msg}` },
      { status: 500 }
    );
  }
}
