// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  // Optimize for static site generation
  nitro: {
    preset: 'static'
  },
  // Enable static site generation
  ssr: true,
  // Generate static pages
  generate: {
    routes: ['/']
  }
})