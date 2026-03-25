import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Gera musica via API.box (apibox.erweima.ai) — wrapper Suno.
 * Env vars:
 *   SUNO_API_URL — base URL (ex: https://apibox.erweima.ai)
 *   SUNO_API_KEY — Bearer token
 *
 * POST body: { prompt, lyrics?, instrumental?, title?, model? }
 *
 * API.box usa um endpoint unico /api/v1/generate com customMode flag.
 * Se lyrics estiver presente → customMode: true (prompt=lyrics, style=prompt)
 * Se nao → customMode: false (prompt=descricao livre)
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
    const { prompt, lyrics, instrumental, title, model } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { erro: "Prompt em falta." },
        { status: 400 }
      );
    }

    const hasLyrics = lyrics && typeof lyrics === "string" && lyrics.trim().length > 0;

    // Build the app's base URL for the callback
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
      || process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`
      || req.nextUrl.origin;

    // API.box unified endpoint with customMode flag
    const body: Record<string, unknown> = {
      customMode: hasLyrics,
      instrumental: instrumental ?? false,
      model: model || "V4",
      callBackUrl: `${appUrl}/api/admin/suno/callback`,
    };

    if (hasLyrics) {
      // Custom mode: prompt = lyrics, style = genre/style tags
      body.prompt = lyrics;
      body.style = prompt;
      body.title = title || "Sem titulo";
    } else {
      // Non-custom mode: prompt = free-form description
      body.prompt = prompt;
    }

    const jsonBody = JSON.stringify(body);
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    // Try /api/suno/submit/music (API.box primary), fallback to /api/v1/generate
    let res = await fetch(`${apiUrl}/api/suno/submit/music`, {
      method: "POST", headers, body: jsonBody,
    });

    if (res.status === 404) {
      res = await fetch(`${apiUrl}/api/v1/generate`, {
        method: "POST", headers, body: jsonBody,
      });
    }

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { erro: `Suno API: ${res.status} — ${text}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    console.log("[suno/generate] raw response:", JSON.stringify(data).slice(0, 1000));

    // API.box returns { code: 200, data: { taskId, sunoData: [...] } }
    if (data.code && data.code !== 200) {
      return NextResponse.json(
        { erro: `Suno API code ${data.code}: ${data.msg || JSON.stringify(data)}` },
        { status: 500 }
      );
    }

    const taskId = data.data?.taskId || data.taskId;
    const sunoData = data.data?.sunoData || data.data?.response?.sunoData || [];
    const clips = Array.isArray(sunoData) && sunoData.length > 0 ? sunoData : [];

    // If no clips yet (async generation), return taskId as the clip id for polling
    const resultClips = clips.length > 0
      ? clips.map((c: Record<string, unknown>) => ({
          id: c.id || taskId,
          status: c.status || "processing",
          audioUrl: c.audioUrl || c.audio_url || c.streamAudioUrl || null,
          title: c.title || title || "",
          duration: c.duration || null,
        }))
      : [{
          id: taskId,
          status: "processing",
          audioUrl: null,
          title: title || "",
          duration: null,
        }];

    console.log("[suno/generate] taskId:", taskId, "clips:", resultClips.length);

    return NextResponse.json({ taskId, clips: resultClips });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { erro: "Excepção: " + msg },
      { status: 500 }
    );
  }
}
