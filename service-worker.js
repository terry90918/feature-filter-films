importScripts("/app-voicetube/precache-manifest.86b985e42cdcd4eedf77f8ccdaa2be4f.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
  workbox.setConfig({
    debug: false
  });

  workbox.clientsClaim();

  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  workbox.routing.registerRoute(
    /(.*)\/contacts/,
    workbox.strategies.networkFirst()
  );
}

