import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',           // вказує, що index.html лежить у src
  publicDir: '../public', // каже Vite, де шукати статичні файли
  build: {
    outDir: '../dist',   // куди збирати сайт
  },
  server: {
    open: true,
  },
})
