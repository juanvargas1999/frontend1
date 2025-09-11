import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Proyecto_sena/JEFT_J_R/frontend1/dist', // Ajusta la ruta base aquí
  })