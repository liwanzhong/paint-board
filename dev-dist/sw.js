if (!self.define) {
  let e,
    t = {}
  const n = (n, s) => (
    (n = new URL(n + '.js', s).href),
    t[n] ||
      new Promise((t) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = n), (e.onload = t), document.head.appendChild(e)
        } else (e = n), importScripts(n), t()
      }).then(() => {
        let e = t[n]
        if (!e) throw new Error(`Module ${n} didn’t register its module`)
        return e
      })
  )
  self.define = (s, i) => {
    const o =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (t[o]) return
    let r = {}
    const c = (e) => n(e, o),
      l = { module: { uri: o }, exports: r, require: c }
    t[o] = Promise.all(s.map((e) => l[e] || c(e))).then((e) => (i(...e), r))
  }
}
define(['./workbox-4302cd73'], function (e) {
  'use strict'
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
  }),
    e.precacheAndRoute([{ url: 'index.html', revision: '0.94ppls8nr18' }], {}),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL('index.html'), {
        allowlist: [/^\/$/]
      })
    ),
    e.registerRoute(
      /^https:\/\/raw\.githubusercontent\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'github-images',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536e3 })
        ]
      }),
      'GET'
    )
})
