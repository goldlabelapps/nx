---
order: 45
slug: /features/pwa/service-workers
title: Service Workers
description: Background JavaScript that runs separately from the main browser thread
tags: Features, PWA, Service Workers,
---

> Service Workers are background scripts that run separately from the main browser thread. They act as a programmable network proxy, allowing developers to intercept and manage network requests, cache resources, and deliver rich offline experiences. Service Workers are a core technology behind Progressive Web Apps (PWAs).

### How Service Workers Are Used in This Application
In this application, Service Workers are automatically generated and configured by the build system (using Workbox and Next.js). They:

- **Cache Key Assets:** Important files (HTML, JS, CSS, images, markdown, etc.) are precached for instant loading and offline access.
- **Intercept Requests:** Service Workers handle fetch events, serving cached content when available and updating caches in the background.
- **Enable Offline Support:** Users can access the site even without an internet connection, thanks to cached resources.
- **Optimize Performance:** By serving assets from cache, Service Workers reduce load times and bandwidth usage.
- **Update Seamlessly:** Service Workers manage cache updates and clean up outdated files, ensuring users always get the latest version.
- **Support Advanced Features:** They enable push notifications, background sync, and other modern web capabilities.

## Why Service Workers Matter

- **Reliability:** Service Workers ensure your site works even when the network is slow or unavailable.
- **Speed:** Cached assets load instantly, improving user experience and engagement.
- **Control:** Developers can fine-tune caching strategies for different resources, balancing freshness and performance.
- **Security:** Service Workers require HTTPS, protecting user data and interactions.
- **Modern Capabilities:** They unlock features like offline access, background sync, and push notifications, making web apps competitive with native apps.

## Conclusion
Service Workers are essential for delivering fast, reliable, and engaging web experiences. In this application, they power offline support, performance optimizations, and advanced features, making the site robust and future-ready.

