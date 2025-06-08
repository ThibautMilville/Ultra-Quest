import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig(({mode}) => {
  // Toujours utiliser la racine maintenant que nous gérons les langues dans les routes
  const basePath = '/'

  // Configuration HTTPS pour le développement seulement
  let httpsConfig = undefined
  
  // Ne charger les certificats qu'en mode développement et s'ils existent
  if (mode === 'development') {
    const keyPath = path.resolve(__dirname, 'certs/key.pem')
    const certPath = path.resolve(__dirname, 'certs/cert.pem')
    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      httpsConfig = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }
    }
  }

  return {
    plugins: [react()],
    base: basePath,
    server: {
      https: httpsConfig,
      host: 'localhost',
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})