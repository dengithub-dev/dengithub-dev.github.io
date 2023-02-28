const cacheResources = [
    "/",
    "/assets/img/",
    "/assets/css/styles.css",
    "/js/fetch.js",
    "/js/scripts.js",
    "/index.html",
    "/index.js",
    "/manifest.json"
  ]

  self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(cacheResources)
        })
    );
});

self.addEventListener("fetch", event => {
    console.log('fetched');
    event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      return cachedResponse || fetch(event.request)
    }))
  })