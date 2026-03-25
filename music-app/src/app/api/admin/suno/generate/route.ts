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
 * Custom mode (lyrics present): prompt=lyrics, style=condensed tags from prompt
 * Non-custom mode: prompt=free description
 */

const MAX_STYLE_LENGTH = 400; // API.box accepts up to 500
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 3000;

/**
 * Convert a verbose prompt description into concise Suno style tags.
 * Suno V4 custom mode expects short genre/style tags, not paragraphs.
 * Example input: "Contemporary organic-electronic, AwakeSoul. Warm female vocals..."
 * Example output: "contemporary organic-electronic, warm female vocals, soft piano, intimate, contemplative"
 */
function condenseToStyleTags(prompt: string): string {
  // Split on sentence boundaries and commas, extract key phrases
  const fragments = prompt
    .replace(/\. /g, ", ")
    .replace(/\.\s*$/, "")
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length > 0 && s.length < 80) // skip overly long fragments
    .filter(s => {
      const lower = s.toLowerCase();
      // Skip meta-instructions that aren't style tags
      return !lower.includes("no autotune") &&
             !lower.includes("clean vocal production") &&
             !lower.includes("great for") &&
             !lower.includes("theme:");
    });

  // Join and truncate at word boundary
  let result = "";
  for (const f of fragments) {
    const next = result ? `${result}, ${f}` : f;
    if (next.length > MAX_STYLE_LENGTH) break;
    result = next;
  }

  return result || prompt.slice(0, MAX_STYLE_LENGTH);
}

async function callSunoApi(
  apiUrl: string,
  apiKey: string,
  body: Record<string, unknown>
): Promise<{ ok: boolean; data?: Record<string, unknown>; error?: string }> {
  const jsonBody = JSON.stringify(body);
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  console.log("[suno/generate] sending:", JSON.stringify(body).slice(0, 600));

  // Try /api/suno/submit/music first, fallback to /api/v1/generate
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
    return { ok: false, error: `Suno API: ${res.status} — ${text}` };
  }

  const data = await res.json();
  console.log("[suno/generate] raw response:", JSON.stringify(data).slice(0, 1000));

  if (data.code && data.code !== 200) {
    return { ok: false, error: `Suno API code ${data.code}: ${data.msg || JSON.stringify(data)}` };
  }

  return { ok: true, data };
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
      || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`)
      || req.nextUrl.origin;

    // Build request body
    const body: Record<string, unknown> = {
      customMode: hasLyrics,
      instrumental: instrumental ?? false,
      model: model || "V4_5",
      callBackUrl: `${appUrl}/api/admin/suno/callback`,
    };

    if (hasLyrics) {
      // Custom mode: prompt = lyrics, style = concise genre tags
      body.prompt = lyrics;
      body.style = condenseToStyleTags(prompt);
      body.title = title || "Sem titulo";
    } else {
      body.prompt = prompt.length > 480 ? prompt.slice(0, 480) : prompt;
    }

    // Try with retries
    let lastError = "";
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        console.log(`[suno/generate] retry #${attempt} after ${RETRY_DELAY_MS}ms`);
        await sleep(RETRY_DELAY_MS);
      }

      const result = await callSunoApi(apiUrl, apiKey, body);

      if (!result.ok) {
        lastError = result.error || "Unknown error";
        // Don't retry on 400 errors (bad request) — only on server errors
        if (lastError.includes("400")) break;
        continue;
      }

      const data = result.data!;
      const taskId = data.data ? (data.data as Record<string, unknown>).taskId : data.taskId;
      const innerData = (data.data || {}) as Record<string, unknown>;
      const innerResponse = (innerData.response || {}) as Record<string, unknown>;
      const sunoData = (innerData.sunoData || innerResponse.sunoData || []) as Record<string, unknown>[];
      const clips = Array.isArray(sunoData) && sunoData.length > 0 ? sunoData : [];

      const resultClips = clips.length > 0
        ? clips.map((c) => ({
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

      console.log("[suno/generate] taskId:", taskId, "clips:", resultClips.length, "attempt:", attempt);

      return NextResponse.json({ taskId, clips: resultClips });
    }

    return NextResponse.json(
      { erro: lastError || "Suno falhou após múltiplas tentativas." },
      { status: 500 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { erro: "Excepção: " + msg },
      { status: 500 }
    );
  }
}
