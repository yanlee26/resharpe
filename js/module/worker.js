// TODO-List...
// register
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      })
    })
}

// install
var CACHE_NAME = 'my-site-cache-v1'
var urlsToCache = [
  '/',
  '/a.css',
  '/b.js'
]
var self = this

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// cache and response

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response
          }
          return fetch(event.request)
        }
      )
    )
})

// activate web-worker

self.addEventListener('activate', function(event) {
    
    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
            cacheNames.map(function(cacheName) {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
                }
            })
            )
        })
    )
})