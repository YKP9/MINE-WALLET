import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      VITE_API_URL : 'https://mine-wallet-backend.onrender.com'
    },
  },
  plugins: [react()],
})
