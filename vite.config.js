import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The pre-renderer reads the manifest to preload each page's language chunk, then deletes it.
  build: { manifest: true },
})
