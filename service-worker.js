const CACHE_NAME = "carbon-fee-cache-v1";
const urlsToCache = [
    "Charge.html",
    "manifest.json",
    "icon-192.png",
    "icon-512.png"
];

// 安裝 Service Worker 並快取資源
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("✅ 快取中:", urlsToCache);
            return cache.addAll(urlsToCache);
        })
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
