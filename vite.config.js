import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import critical from 'rollup-plugin-critical';

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
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
    critical({
      inline: true,
      criticalBase: 'dist/',
      criticalPages: [{ uri: '', template: 'index' }],
    }),
    legacy({
      targets: ['defaults', 'not IE 11'], // Hỗ trợ các trình duyệt hiện đại, bỏ qua IE 11.
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // Thêm polyfill nếu cần.
    })
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  build: {
    minify: "terser", // Dùng Terser để loại bỏ mã không cần thiết
    rollupOptions: {
      treeshake: true, // Bật Tree-shaking
      output: {
        manualChunks(id) {
          // Tách các thư viện lớn thành các chunk riêng
          if (id.includes("node_modules")) {
            // Tách lodash và vue-pdf-embed thành chunk riêng
            if (id.includes("lodash")) {
              return "lodash";
            }
            if (id.includes("vue-pdf-embed")) {
              return "vue-pdf-embed";
            }
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    maxFileSizeToCacheInBytes: 5 * 1024 * 1024,
    chunkSizeWarningLimit: 512,
  },
});
