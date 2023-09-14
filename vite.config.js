import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        name: 'K Portfolio',
        short_name: 'K Portfolio',
        description: 'Portfolio of Truong Nguyen Khanh',
        theme_color: '#ffffff',
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
