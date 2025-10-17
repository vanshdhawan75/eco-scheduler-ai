import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // 👇 This is critical for GitHub Pages — use your repo name here
  base: '/eco-scheduler-ai/',

  build: {
    outDir: 'dist',  // default build folder
  },

  server: {
    port: 8080,
    open: true,
  },
})
