import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/');
          if (norm.includes('/node_modules/three/') || norm.includes('node_modules/three/')) {
            return 'vendor-three';
          }
          if (norm.includes('@react-three')) {
            return 'vendor-r3f';
          }
          if (norm.includes('lucide-react') || norm.includes('gsap') || norm.includes('canvas-confetti')) {
            return 'vendor-ui';
          }
          if (norm.includes('node_modules/react/') || norm.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1200
  }
})

