import { NextRequest, NextResponse } from "next/server";

/**
 * Verifica o estado de clips Suno em geracao.
 * GET ?ids=id1,id2
 * Retorna: { clips: [{ id, status, audioUrl }] }
 */
export async function GET(req: NextRequest) {
  const apiUrl = process.env.SUNO_API_URL;
  const apiKey = process.env.SUNO_API_KEY;

  if (!apiUrl || !apiKey) {
    return NextResponse.json(
      { erro: "SUNO_API_URL ou SUNO_API_KEY nao configuradas." },
      { status: 500 }
    );
  }

  const ids = req.nextUrl.searchParams.get("ids");
  if (!ids) {
    return NextResponse.json(
      { erro: "ids em falta." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${apiUrl}/api/get?ids=${ids}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { erro: `Suno API: ${res.status} — ${text}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const clips = Array.isArray(data) ? data : data.data || data.clips || [data];

    return NextResponse.json({
      clips: clips.map((c: Record<string, unknown>) => ({
        id: c.id,
        status: c.status || "unknown",
        audioUrl: c.audio_url || null,
        title: c.title || "",
        duration: c.duration || null,
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
