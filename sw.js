self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.add(
                "index.html"
                )
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request)
        .then(() => {
            return fetch(e.request)
            .catch(() => caches.match(
                "index.html"
            ))
        })
    )
})