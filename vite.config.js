import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        name: 'Your App Name',
        short_name: 'App Name',
        description: 'Your app description',
        theme_color: '#4DBA87',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/path/to/your/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        skipWaiting: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
});
