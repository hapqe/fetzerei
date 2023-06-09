import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    strictPort: true,
    port: 4001,
    hmr: {
      port: 443,
    },
  }
})
