//check if service successfully Registered
console.log('Service Worker: Registered');

//identify files to cache
const cachedFiles = [
  '/',
  '/index.html',
  "/restaurant.html",
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/data/restaurants.json',
];


//cache the files upon first run
self.addEventListener('install', function(e) {
  e.waitUntil (
    caches.open('v1').then(function(cache) {
      return cache.addAll(cachedFiles);
    })
  );
});

//fetching
self.addEventListener('fetch',function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      //if true request already exist within cache and return
      if(response) {
        console.log('Found ', e.request, ' in cache');
        return response;
      }
      else { //fetch the request but also add to cache
        console.log('could not find', e.request, ' in cache, FETCHING');
        return fetch(e.request)
        .then(function(response) {
          const clonedResponse = response.clone();
          caches.open('v1').then(function(cache) {
            cache.put(e.request, clonedResponse);
          })
          return response;
        })
        .catch(function(err) {
          console.error(err);
        })
      }
    })
  );
  console.log('fetch');
});
