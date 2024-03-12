import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const env = loadEnv('', process.cwd(), '')
const appEnv = (env.VITE_APP_ENV === "production") ? "" : " (" + env.VITE_APP_ENV + ")"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: [
        'logos/ARF.svg',
        'logos/ARF_192.png',
        'logos/ARF_512.png',
        'images/loading.svg'
      ],
      base: '/',

      manifest: {
        name: "StorageTest" + appEnv,
        short_name: "StorageTest" + appEnv,
        lang: "fr",
        description: 'Application pour tester le persistant storage',
        background_color: "#ffffff",
        theme_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'logos/ARF_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logos/ARF_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      devOptions: {
        enabled: env.VITE_SW_DEV === 'true',
        // when using generateSW the PWA plugin will switch to classic
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  build: {
    cssCodeSplit: true
  },
  define: {
    'process.env': {}
  },
  //server: { https: true }
})
