import { NextRequest, NextResponse } from "next/server";

/**
 * Polling de status para jobs da Kits.ai (separacao ou conversao).
 *
 * GET ?type=separation&id=JOB_ID
 * GET ?type=conversion&id=JOB_ID
 *
 * Retorna:
 *   Para separation: { status, vocalUrl, backingUrl }
 *   Para conversion: { status, outputUrl }
 *
 * Env vars: KITSAI_API_KEY
 */

const KITSAI_BASE = "https://arpeggi.io/api/kits/v1";

export async function GET(req: NextRequest) {
  const apiKey = process.env.KITSAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { erro: "KITSAI_API_KEY nao configurada." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json(
      { erro: "Parametros type e id em falta." },
      { status: 400 }
    );
  }

  try {
    const endpoint =
      type === "separation" ? "vocal-separations" : "voice-conversions";

    const res = await fetch(`${KITSAI_BASE}/${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { erro: `Kits.ai Status: ${res.status} — ${text}` },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (type === "separation") {
      return NextResponse.json({
        status: data.status || "running",
        vocalUrl: data.vocalAudioFileUrl || data.lossyVocalAudioFileUrl || null,
        backingUrl: data.backingAudioFileUrl || null,
        stems: data.lossyStemFileUrls || data.stemFileUrls || null,
      });
    }

    // conversion
    return NextResponse.json({
      status: data.status || "running",
      outputUrl: data.outputFileUrl || null,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { erro: "Excepcao: " + msg },
      { status: 500 }
    );
  }
}
