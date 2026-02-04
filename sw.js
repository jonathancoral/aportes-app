const CACHE_NAME = 'm3-expressive-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0,0'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )));
});
