import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  // En production (Vercel), on utilise la racine, en dev on utilise le pathname
  const isProduction = mode === 'production'
  const basePath = isProduction ? '/' : (env.VITE_APP_PATHNAME ? `/${env.VITE_APP_PATHNAME}/` : '/')

  return {
    plugins: [react()],
    base: basePath,
    server: {
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