import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/grey_wolf/",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    cssCodeSplit: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },

  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano()
      ]
    }
  },

  plugins: [
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
            src: "/grey_wolf/favicon.webp",
            sizes: "192x192",
            type: "image/webp"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,webp,png,jpg,jpeg,svg}"],
        globIgnores: [
          "**/img/IMG_1686.jpeg",
          "**/img/IMG_1693.jpeg",
          "**/img/IMG_1695.jpeg",
          "**/img/IMG_1700.jpeg",
          "**/img/IMG_1704.jpeg",
          "**/img/IMG_1719.jpeg",
          "**/img/IMG_1725.jpeg",
          "**/img/IMG_1735.jpeg",
          "**/img/dudka.webp",
          "**/img/harchenkoulia.webp",
          "**/img/lytvynolena.webp"
        ],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
      }
    })
  ],

  server: {
    open: true,
    port: 5173
  }
})
