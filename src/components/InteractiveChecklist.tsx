"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  chapterSlug: string;
  items: string[];
  accentColor: string;
};

export default function InteractiveChecklist({ chapterSlug, items, accentColor }: Props) {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));
  const [saving, setSaving] = useState(false);

  const loadProgress = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) return;

    const { data } = await supabase
      .from("checklist_progress")
      .select("item_index, checked")
      .eq("user_id", userId)
      .eq("chapter_slug", chapterSlug);

    if (data) {
      const newChecked = [...checked];
      data.forEach((row) => {
        if (row.item_index < newChecked.length) {
          newChecked[row.item_index] = row.checked;
        }
      });
      setChecked(newChecked);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterSlug]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const toggleItem = async (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
    setSaving(true);

    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) return;

    await supabase.from("checklist_progress").upsert(
      {
        user_id: userId,
        chapter_slug: chapterSlug,
        item_index: index,
        checked: newChecked[index],
        checked_at: newChecked[index] ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,chapter_slug,item_index" }
    );

    setSaving(false);
  };

  const completedCount = checked.filter(Boolean).length;
  const allComplete = completedCount === items.length;

  return (
    <div className="rounded-2xl border border-brown-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg text-brown-900">Reflexão</h3>
        <span className="font-sans text-xs text-brown-400">
          {completedCount} de {items.length}
          {saving && " · a guardar..."}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-brown-50">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${(completedCount / items.length) * 100}%`,
            backgroundColor: accentColor,
          }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleItem(index)}
            className="group flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-cream"
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-300"
              style={{
                borderColor: checked[index] ? accentColor : "#d4cfc7",
                backgroundColor: checked[index] ? accentColor : "transparent",
              }}
            >
              {checked[index] && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span
              className={`font-sans text-sm transition-all duration-300 ${
                checked[index] ? "text-brown-400 line-through" : "text-brown-700"
              }`}
            >
              {item}
            </span>
          </button>
        ))}
      </div>

      {allComplete && (
        <div
          className="mt-5 rounded-xl px-4 py-3 text-center font-sans text-sm"
          style={{ backgroundColor: accentColor + "15", color: accentColor }}
        >
          Completaste esta reflexão. Obrigada por estares presente.
        </div>
      )}
    </div>
  );
}
