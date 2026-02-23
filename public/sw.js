// Service Worker — Os Sete Véus
// Estratégia: Network-first para HTML/API, cache-first para assets estáticos
// Auto-update: skipWaiting + clients.claim para activar imediatamente

const CACHE_NAME = "sete-veus-v1";

// Assets estáticos que queremos pré-cachear
const PRECACHE_URLS = ["/offline.html"];

// Instalar: pré-cachear página offline
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activar: limpar caches antigos + tomar controlo imediatamente
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first para tudo excepto assets estáticos
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requests que não são GET
  if (request.method !== "GET") return;

  // Ignorar requests para outros domínios
  if (url.origin !== self.location.origin) return;

  // Ignorar requests de autenticação Supabase
  if (url.pathname.includes("/auth/")) return;

  // Assets estáticos (_next/static, imagens, fontes): stale-while-revalidate
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|woff2?)$/)
  ) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Tudo o resto (HTML, API, dados): network-first
  event.respondWith(networkFirst(request));
});

// Network-first: tenta rede, fallback para cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    // Guardar em cache se foi sucesso
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Se é navegação e não há cache, mostrar página offline
    if (request.mode === "navigate") {
      const offline = await caches.match("/offline.html");
      if (offline) return offline;
    }
    return new Response("Offline", { status: 503 });
  }
}

// Stale-while-revalidate: servir do cache, actualizar em background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

// Escutar mensagens do app (ex: forçar update)
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});
