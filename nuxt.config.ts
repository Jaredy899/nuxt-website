/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // `import.meta.dev` can still be true during `nuxt prepare` on Vercel; DevTools → mlly then breaks Bun installs.
  devtools: {
    enabled:
      process.env.NODE_ENV === 'development' &&
      process.env.VERCEL !== '1' &&
      process.env.CI !== 'true'
  },
  modules: ['@nuxt/eslint', '@nuxt/content'],
  experimental: {
    viewTransition: true
  },
  app: {
    head: {
      title: 'Jared Cervantes',
      meta: [
        { name: 'description', content: 'Personal website of Jared Cervantes' },
        { name: 'theme-color', content: '#333' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  ssr: true,
  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue', 'css', 'html', 'bash', 'md', 'yaml', 'powershell']
    },
    markdown: {
      toc: { depth: 3, searchDepth: 3 }
    }
  },
  routeRules: {
    '/**': { prerender: true },
    '/api/**': { prerender: false }
  },
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      ignore: ['/api/**', '/_payload.json*']
    }
  }
})