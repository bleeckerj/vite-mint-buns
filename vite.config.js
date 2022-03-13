import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'esbuild',
    target: "esnext"
  },
  // plugins: [react()]
})
