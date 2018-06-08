/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "build/stencil-state-tunnel.js",
    "revision": "3a2487d4cb3157eec7178b2bdb2b23fb"
  },
  {
    "url": "build/stencil-state-tunnel/rvze5dxq.es5.js",
    "revision": "e2a12f94e09954ccd9232fba92f93c23"
  },
  {
    "url": "build/stencil-state-tunnel/rvze5dxq.js",
    "revision": "eceb1d532bc2df29fc5f0717ff08e7c7"
  },
  {
    "url": "build/stencil-state-tunnel/s5lo9uen.es5.js",
    "revision": "0f14fadfa57017b4e199bc7b04fb4fc5"
  },
  {
    "url": "build/stencil-state-tunnel/s5lo9uen.js",
    "revision": "b7073f25aed16915cb06b0574bc33005"
  },
  {
    "url": "build/stencil-state-tunnel/stencil-state-tunnel.8ppgzt8q.js",
    "revision": "1a92705e8c219e1df1e732cebcafd885"
  },
  {
    "url": "build/stencil-state-tunnel/stencil-state-tunnel.x6hxzsaz.js",
    "revision": "427b08470580bb548b565ea3f32d83c2"
  },
  {
    "url": "index.html",
    "revision": "f9c3345c9aa582b44f22bd04bccf8b6a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
