import { NextRequest, NextResponse } from "next/server";
import { SUPABASE_URL } from "@/lib/supabase-server";

const BUCKET = "audios";

/**
 * Proxy de streaming de audio.
 * Esconde o URL real do Supabase e adiciona headers anti-download.
 * GET /api/music/stream?album=espelho-ilusao&track=1
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const album = searchParams.get("album");
  const track = searchParams.get("track");

  if (!album || !track) {
    return NextResponse.json({ error: "album e track obrigatorios" }, { status: 400 });
  }

  // Sanitize inputs
  const safeAlbum = album.replace(/[^a-z0-9-]/g, "");
  const safeTrack = String(parseInt(track, 10)).padStart(2, "0");

  const storageUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/albums/${safeAlbum}/faixa-${safeTrack}.mp3`;

  const rangeHeader = req.headers.get("range");

  const headers: HeadersInit = {};
  if (rangeHeader) {
    headers["Range"] = rangeHeader;
  }

  const upstream = await fetch(storageUrl, { headers });

  if (!upstream.ok && upstream.status !== 206) {
    return NextResponse.json({ error: "Áudio não encontrado" }, { status: 404 });
  }

  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "audio/mpeg");
  responseHeaders.set("Accept-Ranges", "bytes");
  responseHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  responseHeaders.set("Content-Disposition", "inline");
  // Prevent embedding/hotlinking
  responseHeaders.set("X-Content-Type-Options", "nosniff");

  // Forward range headers for seeking
  const contentRange = upstream.headers.get("content-range");
  if (contentRange) responseHeaders.set("Content-Range", contentRange);
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) responseHeaders.set("Content-Length", contentLength);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
