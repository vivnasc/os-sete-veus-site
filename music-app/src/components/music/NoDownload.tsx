"use client";

import { useEffect } from "react";

/**
 * Prevents right-click save / inspect on audio elements within the music app.
 * Also blocks keyboard shortcuts commonly used to open devtools or save.
 */
export default function NoDownload() {
  useEffect(() => {
    function blockContext(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // Block right-click on audio elements and the player areas
      if (
        target.tagName === "AUDIO" ||
        target.closest("[data-no-download]") ||
        target.closest(".music-player")
      ) {
        e.preventDefault();
      }
    }

    function blockKeys(e: KeyboardEvent) {
      // Block Ctrl+S (save page)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
      }
    }

    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return null;
}
