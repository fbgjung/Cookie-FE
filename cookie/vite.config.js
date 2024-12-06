import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "Cookie",
        short_name: "Cookie",
        description: "Movie",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/desktop-screenshot.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshots/mobile-screenshot.png",
            sizes: "720x1280",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "script",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "documents-cache",
            },
          },
        ],
      },
    }),
  ],
  define: {
    global: "window",
  },
});
