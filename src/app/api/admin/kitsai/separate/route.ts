import { NextRequest, NextResponse } from "next/server";

/**
 * Separar vocals de instrumental via Kits.ai Vocal Separation API.
 *
 * POST body: { audioUrl: string }
 *   — URL do audio completo (ex: clip do Suno)
 *
 * Retorna: { jobId: string }
 *   — Depois fazer polling em /api/admin/kitsai/status?type=separation&id=JOB_ID
 *
 * Env vars: KITSAI_API_KEY
 */

const KITSAI_BASE = "https://arpeggi.io/api/kits/v1";

export async function POST(req: NextRequest) {
  const apiKey = process.env.KITSAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { erro: "KITSAI_API_KEY nao configurada." },
      { status: 500 }
    );
  }

  try {
    const { audioUrl } = await req.json();
    if (!audioUrl) {
      return NextResponse.json(
        { erro: "audioUrl em falta." },
        { status: 400 }
      );
    }

    // Download the audio from the URL
    const audioRes = await fetch(audioUrl);
    if (!audioRes.ok) {
      return NextResponse.json(
        { erro: `Erro ao descarregar audio: ${audioRes.status}` },
        { status: 400 }
      );
    }

    const audioBlob = await audioRes.blob();

    // Send to Kits.ai vocal separation
    const formData = new FormData();
    formData.append("soundFile", new Blob([await audioBlob.arrayBuffer()], { type: "audio/mpeg" }), "input.mp3");

    const res = await fetch(`${KITSAI_BASE}/vocal-separations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { erro: `Kits.ai Separation: ${res.status} — ${text}` },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      jobId: data.id,
      status: data.status || "running",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { erro: "Excepcao: " + msg },
      { status: 500 }
    );
  }
}
