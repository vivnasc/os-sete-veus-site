import { NextRequest, NextResponse } from "next/server";
import { SUPABASE_URL } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "audios";

/** ~45 seconds of 128kbps MP3 = ~720KB. Cap previews at 750KB. */
const PREVIEW_BYTE_LIMIT = 750_000;

/**
 * Verify the request comes from an authenticated user.
 * Returns the user or null.
 */
async function getAuthUser(req: NextRequest) {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) return null;

  // Extract token: Authorization header > veus-token cookie > Supabase cookie
  let token: string | null = null;
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  }
  if (!token) {
    const cookie = req.headers.get("cookie");
    if (cookie) {
      // Check app-specific cookie first (set by AuthGate from localStorage session)
      const veusMatch = cookie.match(/veus-token=([^;]+)/);
      if (veusMatch) {
        token = decodeURIComponent(veusMatch[1]);
      } else {
        // Fallback to Supabase cookie (if using @supabase/ssr)
        const sbMatch = cookie.match(/sb-[^-]+-auth-token=([^;]+)/);
        if (sbMatch) {
          try {
            const parsed = JSON.parse(decodeURIComponent(sbMatch[1]));
            token = Array.isArray(parsed) ? parsed[0] : parsed;
          } catch {
            token = decodeURIComponent(sbMatch[1]);
          }
        }
      }
    }
  }
  if (!token) return null;

  const client = createClient(SUPABASE_URL, anonKey, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: { user } } = await client.auth.getUser();
  return user;
}

/**
 * Proxy de streaming de audio e capas.
 * Esconde o URL real do Supabase e protege faixas completas.
 *
 * Audio (requer login): GET /api/music/stream?album=espelho-ilusao&track=1
 * Preview (publico, ~45s): GET /api/music/stream?album=espelho-ilusao&track=1&preview=1
 * Cover (publico):         GET /api/music/stream?album=espelho-ilusao&track=1&type=cover
 *
 * Tries main file first (faixa-01.mp3), then falls back to first version.
 * For covers, tries .jpg first then .png.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const album = searchParams.get("album");
  const track = searchParams.get("track");
  const type = searchParams.get("type");

  if (!album || !track) {
    return NextResponse.json({ error: "album e track obrigatorios" }, { status: 400 });
  }

  const safeAlbum = album.replace(/[^a-z0-9-]/g, "");
  const safeTrack = String(parseInt(track, 10)).padStart(2, "0");

  // ── COVER IMAGE ──
  if (type === "cover") {
    const extensions = ["jpg", "png", "jpeg", "webp"];
    for (const ext of extensions) {
      for (const folder of [`albums/${safeAlbum}`]) {
        const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${folder}/faixa-${safeTrack}-cover.${ext}`;
        const res = await fetch(url);
        if (res.ok) {
          const contentType = ext === "jpg" || ext === "jpeg" ? "image/jpeg"
            : ext === "png" ? "image/png"
            : "image/webp";
          return new NextResponse(res.body, {
            status: 200,
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=300, s-maxage=300",
              "Content-Length": res.headers.get("content-length") || "",
            },
          });
        }
      }
    }
    return NextResponse.json({ error: "Cover não encontrada" }, { status: 404 });
  }

  // ── AUDIO ──
  const isPreview = searchParams.get("preview") === "1";

  // Full tracks require authentication
  if (!isPreview) {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Autenticação necessária para ouvir faixas completas." },
        { status: 401 }
      );
    }
  }

  const version = searchParams.get("version");
  const safeVersion = version ? version.replace(/[^a-z0-9-]/g, "") : null;
  const rangeHeader = req.headers.get("range");
  const fetchHeaders: HeadersInit = {};
  // For previews, only fetch the first chunk (ignore client range requests)
  if (isPreview) {
    fetchHeaders["Range"] = `bytes=0-${PREVIEW_BYTE_LIMIT}`;
  } else if (rangeHeader) {
    fetchHeaders["Range"] = rangeHeader;
  }

  // If specific version requested, serve it directly
  if (safeVersion) {
    const versionUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/albums/${safeAlbum}/faixa-${safeTrack}-${safeVersion}.mp3`;
    const upstream = await fetch(versionUrl, { headers: fetchHeaders });
    if (upstream.ok || upstream.status === 206) {
      return buildResponse(upstream, isPreview);
    }
    return NextResponse.json({ error: "Versão não encontrada" }, { status: 404 });
  }

  // Try both paths: albums/SLUG/ and SLUG/ (some files stored without albums/ prefix)
  const paths = [
    `albums/${safeAlbum}/faixa-${safeTrack}.mp3`,
    `${safeAlbum}/faixa-${safeTrack}.mp3`,
  ];

  let upstream: Response | null = null;
  for (const path of paths) {
    const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
    const res = await fetch(url, { headers: fetchHeaders });
    console.log(`[stream] ${path} → ${res.status}`);
    if (res.ok || res.status === 206) {
      upstream = res;
      break;
    }
  }

  if (!upstream) upstream = await fetch(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${paths[0]}`, { headers: fetchHeaders });

  // If main file doesn't exist, try to find a version in both paths
  if (!upstream.ok && upstream.status !== 206) {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (url && key) {
        const sb = createClient(url, key);
        // Try both folder structures
        for (const folder of [`albums/${safeAlbum}`, safeAlbum]) {
          const { data: files } = await sb.storage.from(BUCKET).list(folder, { limit: 50 });
          const versionFile = files?.find(f =>
            f.name.startsWith(`faixa-${safeTrack}-`) && f.name.endsWith(".mp3")
          );
          if (versionFile) {
            const versionUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${folder}/${versionFile.name}`;
            upstream = await fetch(versionUrl, { headers: fetchHeaders });
            if (upstream.ok || upstream.status === 206) break;
          }
        }
      }
    } catch {
      // fallback silently
    }
  }

  if (!upstream.ok && upstream.status !== 206) {
    return NextResponse.json({ error: "Áudio não encontrado" }, { status: 404 });
  }

  return buildResponse(upstream, isPreview);
}

function buildResponse(upstream: Response, isPreview = false) {
  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "audio/mpeg");
  responseHeaders.set("Cache-Control", isPreview ? "public, max-age=300" : "private, no-store");
  responseHeaders.set("Content-Disposition", "inline");
  responseHeaders.set("X-Content-Type-Options", "nosniff");

  // Anti-download / anti-scrape headers
  responseHeaders.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  if (isPreview) {
    // Preview: no range support, fixed size
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) responseHeaders.set("Content-Length", contentLength);
    return new NextResponse(upstream.body, {
      status: 200,
      headers: responseHeaders,
    });
  }

  // Full track: support range requests
  responseHeaders.set("Accept-Ranges", "bytes");
  const contentRange = upstream.headers.get("content-range");
  if (contentRange) responseHeaders.set("Content-Range", contentRange);
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) responseHeaders.set("Content-Length", contentLength);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
