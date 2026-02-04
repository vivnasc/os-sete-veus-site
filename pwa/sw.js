/**
 * Service Worker para Os 7 Véus PWA
 * Permite funcionamento offline e cache inteligente
 */

const CACHE_NAME = 'os-7-veus-v1';
const OFFLINE_URL = '/pwa/offline.html';

// Recursos para fazer cache imediatamente (App Shell)
const PRECACHE_ASSETS = [
    '/pwa/',
    '/pwa/index.html',
    '/pwa/offline.html',
    '/pwa/css/style.css',
    '/pwa/js/app.js',
    '/pwa/manifest.json',
    '/pwa/pages/os-7-veus.html',
    '/pwa/pages/comecar.html',
    '/pwa/pages/recursos.html',
    '/pwa/pages/veu-ilusao.html',
    '/pwa/pages/veu-medo.html',
    '/pwa/pages/veu-desejo.html',
    '/pwa/pages/veu-controlo.html',
    '/pwa/pages/veu-culpa.html',
    '/pwa/pages/veu-identidade.html',
    '/pwa/pages/veu-separacao.html',
    '/pwa/icons/icon-192.png',
    '/pwa/icons/icon-512.png'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando Service Worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] A fazer cache dos recursos do App Shell');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('[SW] Instalação completa');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Erro na instalação:', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Ativando Service Worker...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName !== CACHE_NAME)
                        .map((cacheName) => {
                            console.log('[SW] Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Ativação completa');
                return self.clients.claim();
            })
    );
});

// Estratégia de Fetch: Cache First, fallback to Network
self.addEventListener('fetch', (event) => {
    // Ignorar requests não-GET
    if (event.request.method !== 'GET') {
        return;
    }

    // Ignorar requests para outros domínios
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Recurso encontrado no cache
                    console.log('[SW] Servindo do cache:', event.request.url);

                    // Atualizar cache em background (stale-while-revalidate)
                    fetchAndCache(event.request);

                    return cachedResponse;
                }

                // Recurso não está no cache, buscar da rede
                return fetchAndCache(event.request)
                    .catch(() => {
                        // Se falhar e for uma página, mostrar página offline
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }

                        // Para outros recursos, retornar resposta de erro
                        return new Response('Recurso não disponível offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Função para buscar e armazenar em cache
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);

        // Verificar se a resposta é válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }

        // Clonar a resposta para cache
        const responseToCache = response.clone();

        const cache = await caches.open(CACHE_NAME);
        cache.put(request, responseToCache);

        console.log('[SW] Cached:', request.url);

        return response;
    } catch (error) {
        console.log('[SW] Fetch failed:', request.url, error);
        throw error;
    }
}

// Listener para mensagens do cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Sync em background (para quando a conexão voltar)
self.addEventListener('sync', (event) => {
    console.log('[SW] Sync event:', event.tag);

    if (event.tag === 'sync-content') {
        event.waitUntil(syncContent());
    }
});

async function syncContent() {
    // Aqui poderia sincronizar dados pendentes
    console.log('[SW] Sincronizando conteúdo...');
}

// Notificações Push (preparado para uso futuro)
self.addEventListener('push', (event) => {
    console.log('[SW] Push event received');

    const options = {
        body: event.data ? event.data.text() : 'Nova atualização disponível',
        icon: '/pwa/icons/icon-192.png',
        badge: '/pwa/icons/icon-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'explore', title: 'Explorar' },
            { action: 'close', title: 'Fechar' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Os 7 Véus', options)
    );
});

// Click em notificação
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification click:', event.action);

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/pwa/index.html')
        );
    }
});
