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
        writeFileSync(resolve(__dirname, 'docs', '.nojekyll'), '')
      }
    }
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  base: '/ChX/', 
})
