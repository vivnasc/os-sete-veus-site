"use client";

import { useState } from "react";
import { COURSES } from "@/data/courses";

type ContentType = "video" | "workbook" | "youtube";

export default function AdminConteudoPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>(COURSES[0]?.slug ?? "");
  const course = COURSES.find((c) => c.slug === selectedCourse);

  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl font-semibold text-escola-creme">
        Publicar conteudo
      </h2>

      {/* Course selector */}
      <div className="mb-6">
        <label className="mb-1 block text-xs text-escola-creme-50">
          Curso
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full rounded-lg border border-escola-border bg-escola-card px-3 py-2.5 text-sm text-escola-creme focus:border-escola-dourado focus:outline-none"
        >
          {COURSES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {course && (
        <div className="space-y-3">
          {course.modules.map((mod) => (
            <div
              key={mod.number}
              className="rounded-xl border border-escola-border bg-escola-card p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium text-escola-creme">
                  Modulo {mod.number}: {mod.title}
                </h3>
                <StatusBadge status="pendente" />
              </div>

              {/* Sub-lessons */}
              <div className="space-y-2">
                {mod.subLessons.map((sl) => (
                  <div
                    key={sl.letter}
                    className="flex items-center justify-between rounded-lg bg-escola-bg px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-escola-dourado">
                        {sl.letter}
                      </span>
                      <span className="text-xs text-escola-creme">
                        {sl.title}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <UploadButton type="video" label="Video" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Workbook */}
              {mod.workbook && (
                <div className="mt-3 flex items-center justify-between rounded-lg bg-escola-bg px-3 py-2">
                  <span className="text-xs text-escola-creme-50">
                    Caderno: {mod.workbook}
                  </span>
                  <UploadButton type="workbook" label="PDF" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    publicado: "bg-green-500/10 text-green-400",
    pendente: "bg-escola-dourado/10 text-escola-dourado",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
        colors[status] ?? colors.pendente
      }`}
    >
      {status}
    </span>
  );
}

function UploadButton({
  type,
  label,
}: {
  type: ContentType;
  label: string;
}) {
  function handleUpload() {
    // TODO: Supabase Storage upload
    alert(`Upload ${type} (em breve)`);
  }

  return (
    <button
      onClick={handleUpload}
      className="rounded border border-escola-border px-2 py-1 text-[10px] text-escola-creme-50 transition-colors hover:border-escola-dourado/40 hover:text-escola-creme"
    >
      {label}
    </button>
  );
}
