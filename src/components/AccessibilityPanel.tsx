"use client";

import { useState, useEffect, useCallback } from "react";

type Settings = {
  fontSize: number; // 0 = normal, 1 = large, 2 = extra large
  highContrast: boolean;
  dyslexiaFont: boolean;
};

const defaults: Settings = { fontSize: 0, highContrast: false, dyslexiaFont: false };
const STORAGE_KEY = "a11y-settings";

const fontSizeLabels = ["A", "A+", "A++"];
const fontSizeClasses = ["", "text-lg", "text-xl"];

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Settings;
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {
      // Ignore
    }
  }, []);

  const applySettings = useCallback((s: Settings) => {
    const root = document.documentElement;

    // Font size
    root.classList.remove("a11y-font-lg", "a11y-font-xl");
    if (s.fontSize === 1) root.classList.add("a11y-font-lg");
    if (s.fontSize === 2) root.classList.add("a11y-font-xl");

    // High contrast
    root.classList.toggle("a11y-high-contrast", s.highContrast);

    // Dyslexia font
    root.classList.toggle("a11y-dyslexia", s.dyslexiaFont);
  }, []);

  const update = (partial: Partial<Settings>) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    applySettings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-brown-200 bg-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        aria-label="Acessibilidade"
        title="Opções de acessibilidade"
      >
        <svg
          className="h-5 w-5 text-brown-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="4.5" r="2" fill="currentColor" stroke="none" />
          <path d="M12 8v4m0 0l-3 6m3-6l3 6M7 10h10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 left-6 z-50 w-72 rounded-2xl border border-brown-100 bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-sm font-medium text-brown-900">Acessibilidade</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-brown-400 hover:text-brown-700"
              aria-label="Fechar"
            >
              &times;
            </button>
          </div>

          {/* Font size */}
          <div className="space-y-3">
            <div>
              <p className="mb-2 font-sans text-xs text-brown-500">Tamanho do texto</p>
              <div className="flex gap-2">
                {[0, 1, 2].map((size) => (
                  <button
                    key={size}
                    onClick={() => update({ fontSize: size })}
                    className={`flex-1 rounded-lg py-2 font-serif text-sm transition-colors ${
                      settings.fontSize === size
                        ? "bg-sage text-white"
                        : "bg-cream text-brown-600 hover:bg-cream-dark"
                    }`}
                  >
                    {fontSizeLabels[size]}
                  </button>
                ))}
              </div>
            </div>

            {/* High contrast */}
            <label className="flex cursor-pointer items-center justify-between rounded-lg bg-cream px-3 py-2.5">
              <span className="font-sans text-xs text-brown-600">Alto contraste</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => update({ highContrast: e.target.checked })}
                  className="sr-only"
                />
                <div className={`h-5 w-9 rounded-full transition-colors ${settings.highContrast ? "bg-sage" : "bg-brown-200"}`}>
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${settings.highContrast ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </div>
            </label>

            {/* Dyslexia font */}
            <label className="flex cursor-pointer items-center justify-between rounded-lg bg-cream px-3 py-2.5">
              <span className="font-sans text-xs text-brown-600">Fonte para dislexia</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.dyslexiaFont}
                  onChange={(e) => update({ dyslexiaFont: e.target.checked })}
                  className="sr-only"
                />
                <div className={`h-5 w-9 rounded-full transition-colors ${settings.dyslexiaFont ? "bg-sage" : "bg-brown-200"}`}>
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${settings.dyslexiaFont ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </div>
            </label>

            {/* Reset */}
            <button
              onClick={() => update(defaults)}
              className="w-full rounded-lg py-2 font-sans text-xs text-brown-400 transition-colors hover:text-brown-700"
            >
              Repor predefinições
            </button>
          </div>
        </div>
      )}
    </>
  );
}
