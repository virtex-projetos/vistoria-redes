const CACHE_NAME = 'virtex-vistoria-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './virtex3.e7d19001.png'
];

// Instala o motor e guarda os arquivos na memória do celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Salvando arquivos offline');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta a internet: se estiver offline, puxa da memória!
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o arquivo salvo ou vai na internet buscar
        return response || fetch(event.request);
      })
  );
});
