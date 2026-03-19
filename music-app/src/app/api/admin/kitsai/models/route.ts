import { NextResponse } from "next/server";

/**
 * Lista os modelos de voz do Kits.ai para encontrar o voice model ID.
 * GET /api/admin/kitsai/models
 */

const KITSAI_BASE = "https://arpeggi.io/api/kits/v1";

export async function GET() {
  const apiKey = process.env.KITSAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { erro: "KITSAI_API_KEY nao configurada." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${KITSAI_BASE}/voice-models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { erro: `Kits.ai: ${res.status} — ${text}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const models = Array.isArray(data) ? data : data.data || data.models || [data];

    return NextResponse.json({
      models: models.map((m: Record<string, unknown>) => ({
        id: m.id,
        title: m.title || m.name || "",
        status: m.status || "unknown",
      })),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { erro: "Excepcao: " + msg },
      { status: 500 }
    );
  }
}
