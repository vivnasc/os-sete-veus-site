"use client";

import { useEffect } from "react";

/**
 * Regista o service worker e gere actualizacoes automaticas.
 * Quando detecta uma nova versao, activa-a imediatamente e recarrega a pagina.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    // Registar o service worker
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Verificar actualizacoes periodicamente (cada 60s)
        const interval = setInterval(() => {
          registration.update().catch(() => {});
        }, 60 * 1000);

        // Quando ha um novo SW a espera, activar imediatamente
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "activated" &&
              navigator.serviceWorker.controller
            ) {
              // Nova versao activa — recarregar para mostrar conteudo novo
              window.location.reload();
            }
          });
        });

        return () => clearInterval(interval);
      })
      .catch((err) => {
        console.warn("SW registration failed:", err);
      });

    // Quando o controller muda (novo SW tomou controlo), recarregar
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }, []);

  return null;
}
