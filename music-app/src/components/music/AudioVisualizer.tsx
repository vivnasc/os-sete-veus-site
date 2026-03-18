"use client";

import { useRef, useEffect, useCallback } from "react";

interface AudioVisualizerProps {
  color: string;
  isPlaying: boolean;
  currentTime: number;
}

const BAR_COUNT = 64;

function hexToRgba(hex: string, alpha: number): string {
  const raw = hex.replace("#", "");
  const r = parseInt(raw.substring(0, 2), 16);
  const g = parseInt(raw.substring(2, 4), 16);
  const b = parseInt(raw.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function AudioVisualizer({
  color,
  isPlaying,
  currentTime,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);
  const currentTimeRef = useRef(currentTime);
  const colorRef = useRef(color);

  isPlayingRef.current = isPlaying;
  currentTimeRef.current = currentTime;
  colorRef.current = color;

  // Pre-compute per-bar constants so we avoid recalculating each frame
  const barDataRef = useRef(
    Array.from({ length: BAR_COUNT }, (_, i) => ({
      angle: (i / BAR_COUNT) * Math.PI * 2 - Math.PI / 2,
      speed: 0.8 + Math.sin(i * 0.7) * 0.6 + (i % 7) * 0.15,
      offset: (i / BAR_COUNT) * Math.PI * 4 + Math.cos(i * 1.3) * 1.5,
      speed2: 0.3 + Math.cos(i * 0.9) * 0.2,
      offset2: i * 0.5,
      speed3: 1.2 + Math.sin(i * 2.1) * 0.4,
      offset3: i * 0.3 + Math.PI,
    }))
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high-DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    const playing = isPlayingRef.current;
    const playbackTime = currentTimeRef.current;
    const albumColor = colorRef.current;

    // Advance internal time — faster when playing
    if (playing) {
      timeRef.current += 0.016;
    } else {
      timeRef.current += 0.003;
    }
    const t = timeRef.current;

    // Clear
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.min(width, height) * 0.42;
    const innerRadius = maxRadius * 0.35;
    const barMaxHeight = maxRadius * 0.55;
    const amplitudeScale = playing ? 1.0 : 0.2;
    const barWidth = Math.max(1.5, (Math.PI * 2 * innerRadius) / BAR_COUNT * 0.55);

    // Glow setup
    ctx.shadowColor = albumColor;
    ctx.shadowBlur = 20;

    // Draw inner anchor circle
    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(albumColor, 0.15);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Second subtle inner ring
    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius * 0.7, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(albumColor, 0.07);
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Draw bars
    const bars = barDataRef.current;

    for (let i = 0; i < BAR_COUNT; i++) {
      const { angle, speed, offset, speed2, offset2, speed3, offset3 } = bars[i];

      // Layer multiple sine waves for organic movement
      // Include playbackTime for loose sync with audio position
      const wave1 = Math.sin(t * speed + offset + playbackTime * 0.5) * 0.5;
      const wave2 = Math.sin(t * speed2 + offset2 + playbackTime * 0.3) * 0.3;
      const wave3 = Math.sin(t * speed3 + offset3 + playbackTime * 0.7) * 0.2;
      const combined = (wave1 + wave2 + wave3) * 0.5 + 0.5; // normalize 0..1

      const barHeight = (combined * barMaxHeight * 0.8 + barMaxHeight * 0.1) * amplitudeScale;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const x1 = cx + cosA * innerRadius;
      const y1 = cy + sinA * innerRadius;
      const x2 = cx + cosA * (innerRadius + barHeight);
      const y2 = cy + sinA * (innerRadius + barHeight);

      // Varying opacity per bar for depth
      const opacity = 0.3 + combined * 0.55;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = hexToRgba(albumColor, opacity);
      ctx.lineWidth = barWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    // Draw a soft radial gradient pulse at center
    const pulseSize = innerRadius * 0.5 + Math.sin(t * 0.8) * innerRadius * 0.08 * amplitudeScale;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseSize);
    gradient.addColorStop(0, hexToRgba(albumColor, 0.12));
    gradient.addColorStop(1, hexToRgba(albumColor, 0));
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(cx, cy, pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
