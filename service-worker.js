const CACHE_NAME = 'flowos-v4';
const ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  './css/variables.css',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/dashboard.css',
  './css/calendar.css',
  './css/habits.css',
  './css/schedule.css',
  './css/timetable.css',
  './css/goals.css',
  './css/statistics.css',
  './css/responsive.css',
  './css/lock.css',
  './js/utils.js',
  './js/lock.js',
  './js/icons.js',
  './js/db.js',
  './js/state.js',
  './js/ui.js',
  './js/router.js',
  './js/notifications.js',
  './js/dashboard.js',
  './js/today.js',
  './js/tasks.js',
  './js/habits.js',
  './js/calendar.js',
  './js/schedule.js',
  './js/timetable.js',
  './js/goals.js',
  './js/statistics.js',
  './js/settings.js',
  './js/app.js',
  './pwa/manifest.json',
  './pwa/icon-192.png',
  './pwa/icon-512.png',
  './pwa/icon-maskable-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(function (res) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put('./index.html', copy); });
          return res;
        })
        .catch(function () {
          return caches.match('./index.html').then(function (c) {
            return c || caches.match('./');
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        if (req.url.indexOf('fonts.g') >= 0 || req.url.indexOf('fonts.google') >= 0) {
          return new Response('', { status: 200, statusText: 'ok' });
        }
        return new Response('', { status: 504, statusText: 'offline' });
      });
    })
  );
});