"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Props = {
  accentColor?: string;
  onComplete?: () => void;
};

const PHASES = [
  { label: "Inspira", duration: 4000 },
  { label: "Segura", duration: 4000 },
  { label: "Expira", duration: 6000 },
  { label: "Repousa", duration: 2000 },
];

const TOTAL_CYCLES = 3;

export default function BreathingExercise({ accentColor = "#7a8c6e", onComplete }: Props) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [scale, setScale] = useState(1);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setActive(false);
    setPhase(0);
    setCycle(0);
    setScale(1);
  }, []);

  useEffect(() => {
    if (!active) return;

    const currentPhase = PHASES[phase];
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / currentPhase.duration, 1);

      // Scale animation
      if (phase === 0) {
        // Inhale: grow from 1 to 1.4
        setScale(1 + progress * 0.4);
      } else if (phase === 1) {
        // Hold: stay at 1.4
        setScale(1.4);
      } else if (phase === 2) {
        // Exhale: shrink from 1.4 to 1
        setScale(1.4 - progress * 0.4);
      } else {
        // Rest: stay at 1
        setScale(1);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    timerRef.current = setTimeout(() => {
      const nextPhase = (phase + 1) % PHASES.length;
      if (nextPhase === 0) {
        const nextCycle = cycle + 1;
        if (nextCycle >= TOTAL_CYCLES) {
          stop();
          setDone(true);
          onComplete?.();
          return;
        }
        setCycle(nextCycle);
      }
      setPhase(nextPhase);
    }, currentPhase.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, phase, cycle, stop, onComplete]);

  if (done) {
    return (
      <div className="rounded-2xl border border-brown-100 bg-white px-6 py-8 text-center shadow-sm">
        <p className="font-serif text-base text-brown-700">
          Respira. Estás presente. Continua quando sentires.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brown-100 bg-white px-6 py-8 text-center shadow-sm">
      {!active ? (
        <>
          <p className="font-serif text-sm text-brown-500">
            Antes de reflectir, faz uma pausa.
          </p>
          <button
            onClick={() => setActive(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            <span className="text-base">&#9711;</span>
            Respirar 3 ciclos
          </button>
          <p className="mt-2 font-sans text-[0.6rem] text-brown-300">
            ~48 segundos
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center">
          {/* Breathing circle */}
          <div className="relative flex h-36 w-36 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full transition-none"
              style={{
                backgroundColor: accentColor + "15",
                transform: `scale(${scale})`,
                border: `2px solid ${accentColor}30`,
              }}
            />
            <div
              className="absolute inset-4 rounded-full"
              style={{
                backgroundColor: accentColor + "10",
                transform: `scale(${scale})`,
              }}
            />
            <span
              className="relative z-10 font-serif text-lg"
              style={{ color: accentColor }}
            >
              {PHASES[phase].label}
            </span>
          </div>

          {/* Cycle indicator */}
          <div className="mt-4 flex gap-2">
            {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-6 rounded-full transition-colors"
                style={{
                  backgroundColor: i <= cycle ? accentColor : accentColor + "30",
                }}
              />
            ))}
          </div>

          <button
            onClick={stop}
            className="mt-4 font-sans text-[0.6rem] text-brown-300 hover:text-brown-500"
          >
            Saltar
          </button>
        </div>
      )}
    </div>
  );
}
