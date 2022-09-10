self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.add("offline.html")
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request)
        .then(() => {
            return fetch(e.request)
            .catch(() => caches.match('offline.html'))
        })
    )
})