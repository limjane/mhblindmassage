/* Service worker: offline shell for the PWA.
   Config and admin are network-first so fresh business info always wins. */
var CACHE = 'mh-shell-v1';
var SHELL = ['./', 'index.html', 'js/site-config.js', 'manifest.webmanifest',
             'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== 'GET') return;

  // always-fresh resources (fall back to cache offline)
  if (url.pathname.indexOf('site-config.json') !== -1 || url.pathname.indexOf('admin.html') !== -1) {
    e.respondWith(
      fetch(e.request).then(function (r) {
        var copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return r;
      }).catch(function () { return caches.match(e.request, { ignoreSearch: true }); })
    );
    return;
  }

  // shell & assets: cache-first
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (r) {
        var copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return r;
      });
    })
  );
});
