import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  assetsInclude: ['**/*.md'], 
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
