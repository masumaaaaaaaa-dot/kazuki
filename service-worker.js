const CACHE='nich-photo-ledger-cover-optional-v115.0.0';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./photo_album_template.xlsm','./privacy.html','./screenshots/1_photos.png','./screenshots/2_board.png','./screenshots/3_output.png','./lib/jszip.min.js','./lib/html2canvas.min.js','./lib/jspdf.umd.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy));
      return res;
    }).catch(()=>caches.match(e.request).then(cached=>cached||caches.match('./index.html')))
  );
});
