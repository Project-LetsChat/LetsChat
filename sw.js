/*Copyright (C) 2023-2025 Bhargav Ekbote <bhargavsdeal@gmail.com>
This file is part of LetsChat.

LetsChat is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LetsChat is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LetsChat. If not, see <https://www.gnu.org/licenses/>.*/

const CACHE_NAME = 'letschat-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/kwitter_room.html',
  '/kwitter_page.html',
  '/style.css',
  '/navbar.css',
  '/kwitter.js',
  '/kwitter_room.js',
  '/kwitter_page.js',
  '/m2.png',
  '/logo.png',
  // Add other assets you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(console.error)
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/offline.html'))
  );
});
