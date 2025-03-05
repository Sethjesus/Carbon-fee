const CACHE_NAME = "carbon-fee-cache-v1";
const urlsToCache = [
    "Charge.html",
    "manifest.json",
    "icon-192.png",
    "icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("✅ 快取中:", urlsToCache);
            return cache.addAll(urlsToCache);
        })
        .catch(error => console.log("❌ 快取失敗:", error))
    );
});


// 監聽 fetch 事件，回應快取內容
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            return response || fetch(event.request);
        })
    );
});

// 當新的 Service Worker 啟用時清除舊快取
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("🗑️ 清除舊快取:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
    event.waitUntil(
        caches.open('static').then(function(cache) {
            return cache.addAll([
                '/Carbon-fee/Charge.html',
                '/Carbon-fee/manifest.json',
                '/Carbon-fee/icon-192.png',
                '/Carbon-fee/icon-512.png',
                '/Carbon-fee/service-worker.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

