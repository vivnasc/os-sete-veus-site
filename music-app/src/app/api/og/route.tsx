import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { ALL_ALBUMS } from "@/data/albums";

export const runtime = "edge";

function pickLyric(lyrics: string | undefined): string | null {
  if (!lyrics) return null;
  const lines = lyrics.split("\n").filter(l => {
    const t = l.trim();
    return t.length > 15 && t.length < 70 && !t.startsWith("[");
  });
  if (lines.length === 0) return null;
  const day = Math.floor(Date.now() / 86400000);
  return lines[day % lines.length].trim();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const albumSlug = searchParams.get("album") || "";
  const trackNum = parseInt(searchParams.get("track") || "1", 10);

  const album = ALL_ALBUMS.find(a => a.slug === albumSlug);
  const track = album?.tracks.find(t => t.number === trackNum);

  const title = track?.title || "Loranne";
  const albumTitle = album?.title || "";
  const color = album?.color || "#C9A96E";
  const lyric = pickLyric(track?.lyrics);

  // Build cover URL from Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const pad = String(trackNum).padStart(2, "0");
  const coverUrl = `${supabaseUrl}/storage/v1/object/public/audios/albums/${albumSlug}/faixa-${pad}-cover.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#0D0D1A",
          fontFamily: "serif",
          position: "relative",
          padding: "40px",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            borderRadius: "50%",
            background: color,
            opacity: 0.12,
            filter: "blur(120px)",
          }}
        />

        {/* Cover image */}
        <div style={{ display: "flex", flexShrink: 0, marginRight: 50 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt=""
            width={280}
            height={280}
            style={{
              borderRadius: 20,
              objectFit: "cover",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            position: "relative",
          }}
        >
          <p
            style={{
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#666680",
              marginBottom: 12,
            }}
          >
            {albumTitle}
          </p>

          <h1
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#F5F0E6",
              lineHeight: 1.1,
              marginBottom: 16,
              maxWidth: 600,
            }}
          >
            {title}
          </h1>

          {lyric && (
            <p
              style={{
                fontSize: 22,
                fontStyle: "italic",
                color: `${color}cc`,
                marginBottom: 16,
                maxWidth: 550,
              }}
            >
              &ldquo;{lyric}&rdquo;
            </p>
          )}

          <p style={{ fontSize: 20, color: "#a0a0b0" }}>
            Loranne
          </p>

          <p style={{ fontSize: 13, color: "#666680", letterSpacing: "0.15em", marginTop: 24 }}>
            VÉUS
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
