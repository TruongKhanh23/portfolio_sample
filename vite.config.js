import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'inline',
      registerType: 'autoUpdate',

      manifest: {
        name: "K Portfolio",
        short_name: "K Portfolio",
        description: "Portfolio of Truong Nguyen Khanh",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/favicons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        skipWaiting: true,
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
        navigateFallback: null,
      },
    }),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
});
