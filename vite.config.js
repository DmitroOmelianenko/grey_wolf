import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import viteImagemin from "vite-plugin-imagemin";
import htmlMinifier from "vite-plugin-html-minifier";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default defineConfig({
  base: "./", // щоб правильно працювало при деплої на GitHub Pages або Netlify

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    cssCodeSplit: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },

  css: {
    postcss: {
      plugins: [autoprefixer(), cssnano()],
    },
  },

  plugins: [
    // 🧩 Стиснення HTML
    htmlMinifier({
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    }),

    // 📦 Оптимізація зображень (jpg, png, webp, svg)
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 80 },
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: true },
        ],
      },
      webp: { quality: 80 },
    }),

    // ⚡️ PWA (для кешування статичних файлів)
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.webp", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Grey Wolf",
        short_name: "GreyWolf",
        description: "Grey Wolf — офіційний сайт салону.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/favicon.webp",
            sizes: "192x192",
            type: "image/webp",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,webp,png,jpg,jpeg,svg}"],
      },
    }),
  ],

  server: {
    open: true,
    port: 5173,
  },
});
