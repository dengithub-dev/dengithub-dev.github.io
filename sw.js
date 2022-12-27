self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "index.html",
                "css/styles.css",
                "js/script.js"
            ])
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