import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Gera musica via Suno API (wrapper de terceiros).
 * Env vars necessarias:
 *   SUNO_API_URL — base URL do provider (ex: https://api.sunoapi.org)
 *   SUNO_API_KEY — API key do provider
 *
 * POST body: { prompt, lyrics?, instrumental?, title?, duration? }
 *
 * Se lyrics estiver presente, usa o endpoint custom_generate (Suno Custom Mode)
 * que aceita letras formatadas com [Verse], [Chorus], etc.
 * Se nao, usa o endpoint generate (prompt-only mode).
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const apiUrl = process.env.SUNO_API_URL;
  const apiKey = process.env.SUNO_API_KEY;

  if (!apiUrl || !apiKey) {
    return NextResponse.json(
      { erro: "SUNO_API_URL ou SUNO_API_KEY não configuradas." },
      { status: 500 }
    );
  }

  try {
    const { prompt, lyrics, instrumental, title, duration } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { erro: "Prompt em falta." },
        { status: 400 }
      );
    }

    // If lyrics are provided, use custom_generate endpoint
    // Otherwise use the standard generate endpoint
    const hasLyrics = lyrics && typeof lyrics === "string" && lyrics.trim().length > 0;
    const baseEndpoint = hasLyrics ? "custom_generate" : "generate";

    const body: Record<string, unknown> = {
      wait_audio: false,
      make_instrumental: instrumental ?? false,
    };

    if (hasLyrics) {
      // Custom mode: prompt = style/genre tags, lyrics = actual song text
      body.tags = prompt;
      body.prompt = lyrics;
      if (title) body.title = title;
    } else {
      // Standard mode: prompt = free-form description
      body.prompt = prompt;
      if (title) body.title = title;
    }

    if (duration) body.duration = duration;

    const jsonBody = JSON.stringify(body);
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    // Try multiple endpoint paths (different Suno wrapper versions)
    const paths = [
      `/api/${baseEndpoint}`,
      `/api/v1/${baseEndpoint}`,
      `/v1/${baseEndpoint}`,
      `/${baseEndpoint}`,
    ];

    let res: Response | null = null;
    let lastError = "";

    for (const path of paths) {
      const url = `${apiUrl}${path}`;
      const attempt = await fetch(url, { method: "POST", headers, body: jsonBody });
      if (attempt.status !== 404) {
        res = attempt;
        break;
      }
      lastError = `${url} → 404`;
    }

    if (!res) {
      return NextResponse.json(
        { erro: `Suno API: nenhum endpoint encontrado. Ultimo tentado: ${lastError}. Verifica SUNO_API_URL.` },
        { status: 502 }
      );
    }

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { erro: `Suno API (${baseEndpoint}): ${res.status} — ${text}` },
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
      { erro: "Excepção: " + msg },
      { status: 500 }
    );
  }
}
