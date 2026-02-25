import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const OG_SIZE = { width: 1200, height: 630 };

type OgParams = {
  label?: string;
  title: string;
  subtitle?: string;
  url?: string;
  accentColor?: string;
};

let mandalaBase64: string | null = null;

function getMandala(): string {
  if (!mandalaBase64) {
    try {
      const data = readFileSync(
        join(process.cwd(), "public", "images", "mandala-7veus.png"),
      );
      mandalaBase64 = `data:image/png;base64,${data.toString("base64")}`;
    } catch {
      mandalaBase64 = "";
    }
  }
  return mandalaBase64;
}

export function generateOgImage({
  label,
  title,
  subtitle,
  url,
  accentColor = "#c9b896",
}: OgParams): ImageResponse {
  const mandala = getMandala();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#2a2420",
          color: "#f7f5f0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "50%",
            background: `linear-gradient(to right, #2a2420, ${accentColor}11)`,
            display: "flex",
          }}
        />

        {/* Mandala on the right */}
        {mandala && (
          <img
            src={mandala}
            width={420}
            height={420}
            style={{
              position: "absolute",
              right: 40,
              top: 105,
              opacity: 0.12,
            }}
          />
        )}

        {/* Accent line on left edge */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            backgroundColor: accentColor,
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Label */}
          {label && (
            <div
              style={{
                fontSize: 16,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: accentColor,
                marginBottom: 24,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 30 ? 48 : 60,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 750,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>

          {/* Accent bar */}
          <div
            style={{
              width: 70,
              height: 3,
              backgroundColor: accentColor,
              marginTop: 28,
              marginBottom: 28,
              display: "flex",
            }}
          />

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontSize: 22,
                opacity: 0.75,
                lineHeight: 1.5,
                maxWidth: 600,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {subtitle}
            </div>
          )}

          {/* URL at bottom */}
          {url && (
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 80,
                fontSize: 15,
                color: accentColor,
                letterSpacing: "0.08em",
                opacity: 0.8,
                display: "flex",
              }}
            >
              {url}
            </div>
          )}

          {/* Tilde symbol bottom right */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              right: 60,
              fontSize: 36,
              color: accentColor,
              opacity: 0.25,
              display: "flex",
            }}
          >
            ~
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
