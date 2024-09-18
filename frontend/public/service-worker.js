const cacheName = "v1";
const apiUrl = "localhost:1337";

const excludeFromCache = [
  apiUrl + "/api/carts",
  apiUrl + "/api/cart-items",
  apiUrl + "/api/auth",
  apiUrl + "/socket.io/",
];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to get the resource from the network
  try {
    const shouldExclude = excludeFromCache.some((pattern) =>
      request.url.includes(pattern),
    );

    if (
      ["POST", "PUT", "DELETE", "PATCH"].includes(request.method) ||
      shouldExclude
    ) {
      // You may still want to handle the request, but don't cache it
      console.log("Skipping POST request from cache:", request.url);
      return fetch(request);
    }

    if (request.url.startsWith("http")) {
      const responseFromNetwork = await fetch(request);
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
      putInCache(request, responseFromNetwork.clone());
      return responseFromNetwork;
    }
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const cacheKeepList = [cacheName];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

// Enable navigation preload
// const enableNavigationPreload = async () => {
//   if (self.registration.navigationPreload) {
//     await self.registration.navigationPreload.enable();
//   }
// };

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    addResourcesToCache([
      //   "/",
      //   "/index.html",
      //   "/style.css",
      //   "/app.js",
      //   "/image-list.js",
      //   "/star-wars-logo.jpg",
      //   "/gallery/bountyHunters.jpg",
      //   "/gallery/myLittleVader.jpg",
      //   "/gallery/snowTroopers.jpg",
    ]),
  );
  console.log("service worker installed");
});

self.addEventListener("fetch", (event) => {
  console.log("service worker fecthing");
  event.respondWith(
    cacheFirst({
      request: event.request,
      //   preloadResponsePromise: event.preloadResponse,
      //   fallbackUrl: "/gallery/myLittleVader.jpg",
    }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("service worker activated");
  event.waitUntil(deleteOldCaches());
  clients.claim();
});
