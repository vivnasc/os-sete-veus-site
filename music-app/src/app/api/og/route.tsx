import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { ALL_ALBUMS } from "@/data/albums";

export const runtime = "edge";

/**
 * Dynamic OG image for social sharing.
 * Usage: /api/og?album=cosmic-romance&track=10
 *
 * Generates a 1200x630 image with:
 * - Dark background with album color glow
 * - Track title (large)
 * - Album name
 * - "Loranne" branding
 * - Optional lyric line
 */

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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0D0D1A",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: color,
            opacity: 0.15,
            filter: "blur(100px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "60px",
            position: "relative",
          }}
        >
          {/* Album name */}
          <p
            style={{
              fontSize: 20,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#666680",
              marginBottom: 16,
            }}
          >
            {albumTitle}
          </p>

          {/* Track title */}
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#F5F0E6",
              lineHeight: 1.1,
              marginBottom: 20,
              maxWidth: 900,
            }}
          >
            {title}
          </h1>

          {/* Lyric line */}
          {lyric && (
            <p
              style={{
                fontSize: 24,
                fontStyle: "italic",
                color: `${color}cc`,
                marginBottom: 24,
                maxWidth: 700,
              }}
            >
              &ldquo;{lyric}&rdquo;
            </p>
          )}

          {/* Artist */}
          <p
            style={{
              fontSize: 22,
              color: "#a0a0b0",
              marginTop: 8,
            }}
          >
            Loranne
          </p>

          {/* Bottom line */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <p style={{ fontSize: 14, color: "#666680", letterSpacing: "0.15em" }}>
              VÉUS
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
