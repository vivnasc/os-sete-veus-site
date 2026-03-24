"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").then((registration) => {
      // Check for updates periodically (every 30 minutes)
      const interval = setInterval(() => {
        registration.update();
      }, 30 * 60 * 1000);

      return () => clearInterval(interval);
    }).catch(() => {
      // SW registration failed — offline features won't work
    });

    // When the new SW takes over, reload silently
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }, []);

  // No UI — updates happen silently
  return null;
}
