import { defineConfig, splitVendorChunkPlugin, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'

import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/paint-board/',
  optimizeDeps: {
    esbuildOptions: { supported: { bigint: true } }
  },
  esbuild: {
    supported: {
      bigint: true
    }
  },
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    react(),
    viteEslint({
      failOnError: false,
      include: ['src/**/*.ts', 'src/**/*.tsx']
    }),
    svgr(),
    splitVendorChunkPlugin(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'prompt',
      includeAssets: ['canvas.svg'],
      manifest: {
        name: 'Paint Board',
        short_name: 'Paint Board',
        description:
          'A fun art drawing board that supports multi-end operation',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'canvas.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        id: '/paint-board/',
        start_url: '/paint-board/',
        scope: '/paint-board/',
        display: 'standalone',
        background_color: '#ffffff'
      },
      devOptions: {
        enabled: true,
        type: 'module'
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        rollupFormat: 'iife'
      }
    }) as Plugin
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer, tailwindcss]
    }
  }
})
