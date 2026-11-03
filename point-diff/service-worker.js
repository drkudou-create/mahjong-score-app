const CACHE_PREFIX = "mahjong-point-diff:" + self.registration.scope + ":";
const CACHE_NAME = CACHE_PREFIX + "v52-keep-round-settings";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./assets/drivens-green.png",
  "./assets/drivens-red.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then(function(cachedResponse) {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch(function() {
        return caches.match("./index.html", { cacheName: CACHE_NAME });
      });
    })
  );
});
