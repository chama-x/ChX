import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'create-nojekyll',
      closeBundle() {
        const outDir = 'docs'
        try {
          writeFileSync(resolve(__dirname, outDir, '.nojekyll'), '')
        } catch (error) {
          console.error('Failed to create .nojekyll file:', error)
        }
      }
    }
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  base: '/ChX/', 
})
