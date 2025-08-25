// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    'motion-v/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    'nuxt-mcp',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxtjs/i18n'
  ],

  // 性能優化配置
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true
  },

  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      {
        name: 'Noto Sans TC',
        provider: 'google',
        preload: true,
        subsets: ['chinese-traditional']
      },
      {
        name: 'Huninn',
        provider: 'google',
        preload: true
      }
    ],
    defaults: {
      weights: [400, 700],
      styles: ['normal'],
      fallbacks: {
        'sans-serif': [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Arial',
          'sans-serif'
        ]
      }
    }
  },
  colorMode: {
    preference: 'light'
  },
  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './app/assets/my-icons'
      }
    ]
  },
  typescript: {
    typeCheck: true
  },
  i18n: {
    locales: [
      {
        code: 'zh-TW',
        iso: 'zh-Hant-TW',
        name: '中文',
        file: 'zh-TW.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    langDir: './locales/',
    defaultLocale: 'zh-TW',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'zh-TW'
    }
  },
  runtimeConfig: {
    public: {
      discordInviteCode: 'vykUZ9wA3Y'
    }
  },
  site: {
    url: 'https://tngot.org'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW'
      },
      meta: [
        {
          name: 'theme-color',
          content: 'rgb(var(--color-primary-500))'
        }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/logo/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/logo/favicon-16x16.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/logo/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/logo/android-chrome-192x192.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: '/logo/android-chrome-512x512.png'
        },

        { rel: 'manifest', href: '/logo/site.webmanifest' }
      ]
    }
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  hub: {
    cache: true,
    database: true
  }
});
