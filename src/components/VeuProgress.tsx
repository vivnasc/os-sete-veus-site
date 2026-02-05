"use client";

import { VEUS, type VeuType } from "@/types/database";

interface VeuProgressProps {
  completed: VeuType[];
  current: VeuType | null;
}

export default function VeuProgress({ completed, current }: VeuProgressProps) {
  return (
    <div className="flex items-center gap-1.5">
      {VEUS.map((veu) => {
        const isCompleted = completed.includes(veu.id);
        const isCurrent = current === veu.id;

        return (
          <div key={veu.id} className="group relative flex flex-col items-center">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all ${
                isCompleted
                  ? `${veu.bgColor} ${veu.color} ring-2 ring-current`
                  : isCurrent
                  ? `${veu.bgColor} ${veu.color} animate-pulse ring-2 ring-current`
                  : "bg-gray-100 text-gray-400"
              }`}
              title={`Véu ${veu.number}: ${veu.name}`}
            >
              {isCompleted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-xs font-medium">{veu.number}</span>
              )}
            </div>
            {/* Tooltip */}
            <div className="pointer-events-none absolute -bottom-7 whitespace-nowrap rounded bg-gray-900 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {veu.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
