// Aumentamos la versión para borrar el caché viejo del diseño Material
const CACHE_NAME = 'segsocial-fluent-v1';

const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    // Actualizamos la fuente de iconos a la versión "Regular" usada en el nuevo diseño
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Regular:opsz,wght,FILL,GRAD@20..48,400,0,0'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keys) => Promise.all(
        // Esto borra el caché "segsocial-m3-v3" anterior y deja solo el nuevo Fluent
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )));
});
