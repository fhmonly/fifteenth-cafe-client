// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  runtimeConfig: {
    public: {
      apiURL: "https://37ff-114-5-246-199.ngrok-free.app",
    },
  },
})