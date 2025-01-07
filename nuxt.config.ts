// https://nuxt.com/docs/api/configuration/nuxt-config
const FTH_ENDPOINT = "http://192.168.1.3:8000";
export default defineNuxtConfig({
  devtools: { enabled: !true },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['dotlottie-player'].includes(tag),
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'dayjs-nuxt'
  ],

  runtimeConfig: {
    public: {
      apiURL: FTH_ENDPOINT,
    },
  },

  nitro: {
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },

  pwa: {
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: 'Fifteenth Cafe',
      short_name: 'Fth Cafe',
      theme_color: '#a91d3a',
      background_color: '#ffffff',
      description: "Fifteenth Cafe",
      lang: 'id',
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: '/icons/android/mipmap-hdpi/fth_icon.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: '/icons/android/mipmap-mdpi/fth_icon.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: '/icons/android/mipmap-xhdpi/fth_icon.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: '/icons/android/mipmap-xxhdpi/fth_icon.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/icons/android/mipmap-xxxhdpi/fth_icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/Assets.xcassets/AppIcon.appiconset/1024.png',
          sizes: '1024x1024',
          type: 'image/png',
        },
        {
          src: '/icons/playstore.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/appstore.png',
          sizes: '1024x1024',
          type: 'image/png',
        },
      ],
      screenshots: [
        {
          src: '/screenshots/desktop-screenshot.png',
          sizes: '1477x831',
          type: 'image/png',
          form_factor: 'wide',
        },
        {
          src: '/screenshots/mobile-screenshot.png',
          sizes: '333x741',
          type: 'image/png',
          form_factor: 'narrow',
        },
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /\.(woff2|eot|ttf|otf|svg|png|jpg|jpeg|webp|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets-cache',
            cacheableResponse: {
              statuses: [0, 200, 304],
            },
          },
        },
      ],
      globIgnores: [
        '**/node_modules/**/*',
        'sw.js',
        'workbox-*.js',
      ],
    },
  },

  image: {
    format: ['webp'],
    quality: 80,
    screens: {
      'mobile': 360,
      'tablet': 520,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  },

  compatibilityDate: '2024-12-05'
})