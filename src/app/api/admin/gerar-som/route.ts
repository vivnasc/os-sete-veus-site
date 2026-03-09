import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { texto, duracao, apiKey } = await req.json();

  if (!apiKey) {
    return NextResponse.json({ erro: "API key em falta." }, { status: 400 });
  }

  const res = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: texto,
      duration_seconds: duracao,
      prompt_influence: 0.3,
    }),
  });

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
