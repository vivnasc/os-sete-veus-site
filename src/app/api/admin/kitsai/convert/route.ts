import { NextRequest, NextResponse } from "next/server";

/**
 * Converter vocal para clone da Vivianne via Kits.ai Voice Conversion API.
 *
 * POST body: {
 *   vocalUrl: string,          — URL do vocal isolado (output da separacao)
 *   voiceModelId?: number,     — ID do modelo de voz na Kits.ai (override)
 *   conversionStrength?: number, — 0-1, default 0.7
 *   pitchShift?: number,       — -24 a 24 semitons
 * }
 *
 * Retorna: { jobId: string }
 *   — Depois fazer polling em /api/admin/kitsai/status?type=conversion&id=JOB_ID
 *
 * Env vars: KITSAI_API_KEY, KITSAI_VOICE_MODEL_ID
 */

const KITSAI_BASE = "https://arpeggi.io/api/kits/v1";

export async function POST(req: NextRequest) {
  const apiKey = process.env.KITSAI_API_KEY;
  const defaultModelId = process.env.KITSAI_VOICE_MODEL_ID;

  if (!apiKey) {
    return NextResponse.json(
      { erro: "KITSAI_API_KEY nao configurada." },
      { status: 500 }
    );
  }

  try {
    const {
      vocalUrl,
      voiceModelId,
      conversionStrength = 0.7,
      pitchShift = 0,
    } = await req.json();

    const modelId = voiceModelId || defaultModelId;
    if (!modelId) {
      return NextResponse.json(
        { erro: "voiceModelId em falta. Configura KITSAI_VOICE_MODEL_ID ou envia no body." },
        { status: 400 }
      );
    }

    if (!vocalUrl) {
      return NextResponse.json(
        { erro: "vocalUrl em falta." },
        { status: 400 }
      );
    }

    // Download the vocal audio
    const audioRes = await fetch(vocalUrl);
    if (!audioRes.ok) {
      return NextResponse.json(
        { erro: `Erro ao descarregar vocal: ${audioRes.status}` },
        { status: 400 }
      );
    }

    const audioBlob = await audioRes.blob();

    // Send to Kits.ai voice conversion
    const formData = new FormData();
    formData.append("soundFile", new Blob([await audioBlob.arrayBuffer()], { type: "audio/mpeg" }), "vocal.mp3");
    formData.append("voiceModelId", String(modelId));
    formData.append("conversionStrength", String(conversionStrength));
    if (pitchShift !== 0) {
      formData.append("pitchShift", String(pitchShift));
    }

    const res = await fetch(`${KITSAI_BASE}/voice-conversions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { erro: `Kits.ai Conversion: ${res.status} — ${text}` },
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
