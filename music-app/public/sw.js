/**
 * Service Worker for Veus music app.
 * Caches the app shell for offline use.
 * Audio is cached separately in IndexedDB by the app code.
 */

const CACHE_NAME = "veus-v3";

// App shell — pages and static assets to cache on install
const APP_SHELL = [
  "/",
  "/library",
  "/search",
  "/manifest.json",
  "/veus_music_favicon-192.png",
  "/veus_music_favicon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  // Do NOT skipWaiting() automatically — wait for user to accept the update
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Listen for SKIP_WAITING message from the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Don't intercept API calls or audio streams
  if (url.pathname.startsWith("/api/")) return;

  // Network first, cache fallback for navigation
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match("/")))
    );
    return;
  }

  // Cache first for OUR static assets only (images, fonts, CSS, JS)
  // Never cache external CDN images (Suno covers, etc.)
  if (
    url.origin === self.location.origin &&
    (
      url.pathname.match(/\.(png|jpg|jpeg|svg|webp|woff2?|ttf|css|js)$/) ||
      url.pathname.startsWith("/poses/")
    )
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Stale-while-revalidate for Google Fonts
  if (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }
});
