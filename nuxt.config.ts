// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/fonts', 'nuxt-mcp'],
  build: {
    transpile: ['gsap']
  },

  css: ['~/assets/css/main.css'],
  fonts: {
    families: [{ name: 'Noto Sans TC', provider: 'google' }]
  },
  colorMode: {
    preference: 'light'
  },

  runtimeConfig: {
    public: {
      discordInviteCode: 'vykUZ9wA3Y'
    }
  }
});
