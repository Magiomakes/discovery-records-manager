/* Service worker for Discovery Records Manager.
   Makes the GitHub Pages site installable and lets it open offline. The app's data
   never passes through here: it lives in the folder the founder picked (File System
   Access API), which the worker does not touch. Only same-origin GETs are handled.
   Bump CACHE when the shell changes so old copies are dropped on activate. */
const CACHE = "drm-shell-v5";
const BASE = new URL("./", self.location).pathname;           /* "/discovery-records-manager/" on Pages, "/" locally */
const ASSETS = ["index.html", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png"];

self.addEventListener("install", ev => {
  /* Warm the cache, but don't fail the install if a file is missing. */
  ev.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(ASSETS.map(a => c.add(BASE + a)))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", ev => {
  ev.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  const path = url.pathname.slice(BASE.length);
  const isPage = req.mode === "navigate" || path === "" || path === "index.html";
  const isAsset = ASSETS.includes(path);
  if (!isPage && !isAsset) return;                             /* anything else goes straight to the network */
  ev.respondWith(isPage ? networkFirst(req, BASE + "index.html") : cacheFirst(req));
});

/* The page itself: try the network so an update shows on the next online load; fall back to the cached shell. */
async function networkFirst(req, key){
  const c = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) c.put(key, res.clone());
    return res;
  } catch(e){
    const hit = await c.match(key);
    return hit || Response.error();
  }
}

/* Manifest and icons rarely change: serve from cache, fetch once when absent. */
async function cacheFirst(req){
  const c = await caches.open(CACHE);
  const hit = await c.match(req, {ignoreSearch:true});
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) c.put(req, res.clone());
  return res;
}
