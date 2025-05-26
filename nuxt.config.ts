// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  // Enable SSR for content
  ssr: true,
  content: {
    // Content configuration
    highlight: {
      theme: 'github-dark'
    },
    // Ensure content is properly served
    api: {
      baseURL: '/api/_content'
    }
  },
  // Generate static pages
  generate: {
    routes: ['/']
  }
})