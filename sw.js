const CACHE = 'strangerbay-v1';
const PRECACHE = [
    '/',
    '/chat/',
    '/chat/style.css',
    '/chat/script.js',
    '/landing-style.css',
    '/assets/strangerbay-logo.webp',
    '/assets/favicon.ico',
    '/assets/android-chrome-192x192.png',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
