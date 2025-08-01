// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content'],
  experimental: {
    viewTransition: true
  },
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
      theme: 'github-dark',
      langs: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue', 'css', 'html', 'bash', 'md', 'yaml', 'powershell']
    },
    // Ensure content is properly served
    api: {
      baseURL: '/api/_content'
    },
    // Enable Markdown support with HTML
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      },
      remarkPlugins: [],
      rehypePlugins: []
    }
  },
  // Generate static pages
  generate: {
    routes: ['/']
  },
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  }
})