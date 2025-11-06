import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: '/grey_wolf/', // ← ключовий рядок
  build: {
    outDir: '../dist',
  },
})
