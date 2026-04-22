import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: process.env.NODE_ENV === 'production' ? [] : true // Permitir todas las conexiones en desarrollo, pero no en producción
  }
})