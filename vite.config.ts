import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { componentTagger } from 'lovable-tagger'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  
  // 👇 Only use base path for production GitHub Pages build
  base: mode === 'production' ? '/eco-scheduler-ai/' : '/',

  build: {
    outDir: 'dist',
  },

  server: {
    host: "::",
    port: 8080,
    open: true,
  },
}))
