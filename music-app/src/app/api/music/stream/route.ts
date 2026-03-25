import { NextRequest, NextResponse } from "next/server";
import { SUPABASE_URL } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "audios";

/**
 * Proxy de streaming de audio.
 * Esconde o URL real do Supabase e adiciona headers anti-download.
 * GET /api/music/stream?album=espelho-ilusao&track=1
 *
 * Tries main file first (faixa-01.mp3), then falls back to first version.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const album = searchParams.get("album");
  const track = searchParams.get("track");

  if (!album || !track) {
    return NextResponse.json({ error: "album e track obrigatorios" }, { status: 400 });
  }

  const safeAlbum = album.replace(/[^a-z0-9-]/g, "");
  const safeTrack = String(parseInt(track, 10)).padStart(2, "0");
  const version = searchParams.get("version");
  const safeVersion = version ? version.replace(/[^a-z0-9-]/g, "") : null;
  const rangeHeader = req.headers.get("range");
  const fetchHeaders: HeadersInit = {};
  if (rangeHeader) fetchHeaders["Range"] = rangeHeader;

  // If specific version requested, serve it directly
  if (safeVersion) {
    const versionUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/albums/${safeAlbum}/faixa-${safeTrack}-${safeVersion}.mp3`;
    const upstream = await fetch(versionUrl, { headers: fetchHeaders });
    if (upstream.ok || upstream.status === 206) {
      return buildResponse(upstream);
    }
    return NextResponse.json({ error: "Versão não encontrada" }, { status: 404 });
  }

  // Try main file first
  const mainUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/albums/${safeAlbum}/faixa-${safeTrack}.mp3`;
  let upstream = await fetch(mainUrl, { headers: fetchHeaders });
  console.log(`[stream] ${safeAlbum}/faixa-${safeTrack}.mp3 → ${upstream.status}`);

  // If main file doesn't exist, try to find a version
  if (!upstream.ok && upstream.status !== 206) {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (url && key) {
        const supabase = createClient(url, key);
        const { data: files } = await supabase.storage
          .from(BUCKET)
          .list(`albums/${safeAlbum}`, { limit: 50 });

        const versionFile = files?.find(f =>
          f.name.startsWith(`faixa-${safeTrack}-`) && f.name.endsWith(".mp3")
        );

        if (versionFile) {
          const versionUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/albums/${safeAlbum}/${versionFile.name}`;
          upstream = await fetch(versionUrl, { headers: fetchHeaders });
        }
      }
    } catch {
      // fallback silently
    }
  }

  if (!upstream.ok && upstream.status !== 206) {
    return NextResponse.json({ error: "Áudio não encontrado" }, { status: 404 });
  }

  return buildResponse(upstream);
}

function buildResponse(upstream: Response) {
  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "audio/mpeg");
  responseHeaders.set("Accept-Ranges", "bytes");
  responseHeaders.set("Cache-Control", "public, max-age=3600");
  responseHeaders.set("Content-Disposition", "inline");
  responseHeaders.set("X-Content-Type-Options", "nosniff");

  const contentRange = upstream.headers.get("content-range");
  if (contentRange) responseHeaders.set("Content-Range", contentRange);
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) responseHeaders.set("Content-Length", contentLength);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
