// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
 modules: [
    '@shuriken-ui/nuxt',
    'reka-ui/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-auth-utils',
  ],
  // Project metadata
  $meta: {
    name: '@cssninja/tairo',
  },
  // Your app's main stylesheet
  css: [
    '~/assets/main.css',
  ],
  fonts: {
    experimental: {
      processCSSVariables: true, 
    },
  },
  // VUE i18n Translation
  i18n: {
    baseUrl: '/',
    // We use no_prefix strategy to avoid having the locale prefix in the URL,
    // This may not be the best strategy for SEO, but it's the best for the demo.
    // We recommend using the default prefix_except_default strategy for SEO.
    strategy: 'no_prefix',
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      { code: 'en', dir: 'ltr', language: 'en-US', file: 'en-US.json', name: 'English', isCatchallLocale: true },
      { code: 'fr', dir: 'ltr', language: 'fr-FR', file: 'fr-FR.json', name: 'Français' },
      { code: 'es', dir: 'ltr', language: 'es-ES', file: 'es-ES.json', name: 'Español' },
      { code: 'de', dir: 'ltr', language: 'de-DE', file: 'de-DE.json', name: 'Deutsch' },
      { code: 'ar', dir: 'rtl', language: 'ar-SA', file: 'ar-SA.json', name: 'العربية' },
      { code: 'ja', dir: 'ltr', language: 'ja-JP', file: 'ja-JP.json', name: '日本語' },
    ]
  },
  experimental: {
    viewTransition: true,
    // buildCache: true,
    sharedPrerenderData: true,
    defaults: {
      nuxtLink: {
        // Here we disable the prefetch for visibility and enable it for interaction.
        // This is a good balance between performance and user experience when having a lot of links.
        prefetchOn: {
          visibility: false,
          interaction: true,
        },
      },
    },
  },

})