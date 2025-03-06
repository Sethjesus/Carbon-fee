const CACHE_NAME = "carbon-fee-cache-v1";
const urlsToCache = [
    "/Carbon-fee/",
    "/Carbon-fee/Charge.html",
    "/Carbon-fee/manifest.json",
    "/Carbon-fee/service-worker.js",
    "/Carbon-fee/icon-192.png",
    "/Carbon-fee/icon-512.png",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
];

// 安裝 Service Worker 並快取資源
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 攔截請求並提供快取資源
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// 移除舊的快取
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});
