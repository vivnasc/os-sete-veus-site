import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Verifica o estado de clips Suno em geracao (API.box / apibox.erweima.ai).
 * GET ?ids=taskId1,taskId2
 *
 * API.box usa /api/v1/generate/record-info?taskId=XXX
 * Retorna: { clips: [{ id, status, audioUrl, title, duration }] }
 */
export async function GET(req: NextRequest) {
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

  const ids = req.nextUrl.searchParams.get("ids");
  if (!ids) {
    return NextResponse.json(
      { erro: "ids em falta." },
      { status: 400 }
    );
  }

  try {
    const taskIds = ids.split(",").map(s => s.trim()).filter(Boolean);
    const allClips: Record<string, unknown>[] = [];

    for (const taskId of taskIds) {
      // API.box status endpoint
      const res = await fetch(`${apiUrl}/api/v1/generate/record-info?taskId=${taskId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!res.ok) {
        // Try legacy endpoint as fallback
        const legacyRes = await fetch(`${apiUrl}/api/get?ids=${taskId}`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        });

        if (legacyRes.ok) {
          const legacyData = await legacyRes.json();
          const items = Array.isArray(legacyData) ? legacyData : legacyData.data || [legacyData];
          allClips.push(...items);
          continue;
        }

        continue;
      }

      const data = await res.json();

      // API.box returns { code: 200, data: { taskId, sunoData: [...], status } }
      const record = data.data || data;
      const sunoData = record.sunoData || record.suno_data || [];
      const items = Array.isArray(sunoData) ? sunoData : [sunoData];

      if (items.length > 0) {
        allClips.push(...items);
      } else {
        // If no sunoData yet, return the task itself with its status
        allClips.push({
          id: taskId,
          status: record.status || "processing",
          audioUrl: null,
          title: record.title || "",
          duration: null,
        });
      }
    }

    return NextResponse.json({
      clips: allClips.map((c: Record<string, unknown>) => ({
        id: c.id || "",
        status: mapStatus(c.status as string),
        audioUrl: c.audioUrl || c.audio_url || c.streamAudioUrl || null,
        title: c.title || "",
        duration: c.duration || null,
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

/** Map API.box status to our standard statuses */
function mapStatus(status: string | undefined): string {
  if (!status) return "processing";
  const s = status.toLowerCase();
  if (s === "complete" || s === "completed" || s === "done") return "complete";
  if (s === "error" || s === "failed") return "error";
  if (s === "text" || s === "first" || s === "processing" || s === "pending") return "processing";
  return s;
}
