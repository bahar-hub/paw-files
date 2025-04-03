const CACHE_NAME = 'pwa-cache-v1';
const OFFLINE_PAGE = '/offline.html';

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                OFFLINE_PAGE
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activated');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME)
                          .map(cache => caches.delete(cache))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(OFFLINE_PAGE);
        })
    );
});