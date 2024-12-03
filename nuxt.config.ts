// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
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
      apiURL: "http://localhost:8000",
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
    manifest: {
      name: 'Fifteenth Cafe',
      short_name: 'Fth Cafe',
      theme_color: '#a91d3a',
      description: "Fifteenth Cafe",
      lang: 'id',
      display: "fullscreen",
      icons: [
        {
          src: '/favicon.ico',
          sizes: '32x32',
          type: 'image/x-icon'
        },
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
  }
})
