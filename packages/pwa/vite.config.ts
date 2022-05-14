import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Amai',
        short_name: 'Amai',
        description: 'Pomodoro application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icons/android-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/android-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/',
      },
    }),
  ],
  server: {
    https: true,
  },
});
