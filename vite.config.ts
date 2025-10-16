import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 👇 This is critical for GitHub Pages — use your repo name here
  base: '/eco-scheduler-ai/',

  build: {
    outDir: 'dist',  // default build folder
  },

  server: {
    port: 5173, // optional: dev server port
    open: true, // auto-opens browser when you run `npm run dev`
  },
})
