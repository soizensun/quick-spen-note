//STORAGE OF BROWSER
const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

//installation
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");

            return cache.addAll(urlsToCache);
        })
    );
});

// listen for request
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            return fetch(event.request)
                .catch(() => caches.match("offline.html"));
        })
    );
});

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 // Cache hit - return response
//                 console.log(response)
//                 if (response) {
//                     return response;
//                 }
//                 const res = fetch(event.request)
//                 res.then((r) => console.log("r => ", r))
//                 return fetch(event.request);
//             }
//             )
//     );
// });

// activate the service worker
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});