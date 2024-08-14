import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('cert.key'),
      cert: fs.readFileSync('cert.crt'),
    },
    host: true,
    port: 5173,
  },
})