import { NextRequest, NextResponse } from "next/server";

/**
 * Gera musica via Suno API (wrapper de terceiros).
 * Env vars necessarias:
 *   SUNO_API_URL — base URL do provider (ex: https://api.sunoapi.org)
 *   SUNO_API_KEY — API key do provider
 *
 * POST body: { prompt, instrumental?, title?, duration? }
 * Retorna: { taskId, status }
 */
export async function POST(req: NextRequest) {
  const apiUrl = process.env.SUNO_API_URL;
  const apiKey = process.env.SUNO_API_KEY;

  if (!apiUrl || !apiKey) {
    return NextResponse.json(
      { erro: "SUNO_API_URL ou SUNO_API_KEY nao configuradas." },
      { status: 500 }
    );
  }

  try {
    const { prompt, instrumental, title, duration } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { erro: "Prompt em falta." },
        { status: 400 }
      );
    }

    const body: Record<string, unknown> = {
      prompt,
      make_instrumental: instrumental ?? true,
      wait_audio: false,
    };

    if (title) body.title = title;
    if (duration) body.duration = duration;

    const res = await fetch(`${apiUrl}/api/generate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { erro: `Suno API: ${res.status} — ${text}` },
        { status: 500 }
      );
    }

    const data = await res.json();

    // Most providers return an array of generated clips
    // Each clip has: id, status, audio_url, etc.
    const clips = Array.isArray(data) ? data : data.data || data.clips || [data];

    return NextResponse.json({
      clips: clips.map((c: Record<string, unknown>) => ({
        id: c.id,
        status: c.status || "processing",
        audioUrl: c.audio_url || null,
        title: c.title || title || "",
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
