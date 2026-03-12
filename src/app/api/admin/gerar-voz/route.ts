import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { texto, voiceId, apiKey } = await req.json();

  if (!apiKey || !voiceId || !texto) {
    return NextResponse.json(
      { erro: "API key, Voice ID ou texto em falta." },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: texto,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.8,
          style: 0.15,
        },
      }),
    }
  );

  if (!res.ok) {
    const erro = await res.text();
    return NextResponse.json(
      { erro: `ElevenLabs: ${res.status} — ${erro}` },
      { status: 500 }
    );
  }

  const audio = await res.arrayBuffer();
  return new NextResponse(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
