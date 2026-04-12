// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // Avoid loading @nuxt/devtools on CI (Bun/Vercel can break mlly resolution in postinstall).
  devtools: { enabled: import.meta.dev },
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