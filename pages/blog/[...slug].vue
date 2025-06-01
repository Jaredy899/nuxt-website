<template>
    <div class="blog-post-page">
      <Head>
        <title>{{ pageTitle }}</title>
        <meta name="description" :content="pageDescription">
      </Head>
      
      <header class="page-header">
        <SidebarToggle @toggle="toggleSidebar" />
        <ThemeToggle />
      </header>
  
      <main class="blog-content">
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else-if="hasError" class="error">
          <h1>Post not found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <p><strong>Attempted path:</strong> {{ $route.path }}</p>
          <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
        </div>
        <article v-else-if="blogPost" class="post">
          <header class="post-header">
            <h1>{{ blogPost.title }}</h1>
            <div class="post-meta">
              <time :datetime="blogPost.date">{{ formatDate(blogPost.date) }}</time>
              <div v-if="blogPost.tags && Array.isArray(blogPost.tags) && blogPost.tags.length > 0" class="tags">
                <span v-for="tag in blogPost.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </header>
          <ContentRenderer :value="blogPost" class="prose" />
          <footer class="post-footer">
            <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
          </footer>
        </article>
        <div v-else class="error">
          <h1>No content found</h1>
          <p><strong>Route path:</strong> {{ $route.path }}</p>
          <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
        </div>
      </main>
  
      <BlogSidebar :is-open="sidebarOpen" @close="closeSidebar" />
      
      <!-- Copy Button Script Component -->
      <CopyButtonScript />
    </div>
  </template>
  
  <script setup lang="ts">
  import CopyButtonScript from '~/components/CopyButtonScript.vue'
  
  interface BlogPost {
    title?: string
    date?: string
    description?: string
    tags?: string[]
    [key: string]: any
  }
  
  const route = useRoute()
  const sidebarOpen = ref(false)
  const blogPost = ref<BlogPost | null>(null)
  const isLoading = ref(true)
  const hasError = ref(false)
  
  // Computed properties for meta tags
  const pageTitle = computed(() => {
    return blogPost.value?.title ? `${blogPost.value.title} - Jared Cervantes` : 'Blog Post - Jared Cervantes'
  })
  
  const pageDescription = computed(() => {
    return blogPost.value?.description || 'Blog post by Jared Cervantes'
  })
  
  // Load the blog post
  onMounted(async () => {
    try {
      console.log('Loading blog post for path:', route.path)
      isLoading.value = true
      hasError.value = false
      
      const post = await queryContent(route.path).findOne()
      blogPost.value = post as BlogPost
      
    } catch (error) {
      console.error('Error loading blog post:', error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  })
  
  // Watch for route changes
  watch(() => route.path, async (newPath) => {
    try {
      console.log('Route changed to:', newPath)
      isLoading.value = true
      hasError.value = false
      
      const post = await queryContent(newPath).findOne()
      blogPost.value = post as BlogPost
      
    } catch (error) {
      console.error('Error loading blog post on route change:', error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  })
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  const closeSidebar = () => {
    sidebarOpen.value = false
  }
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  </script>
  
  <style scoped>
  .blog-post-page {
    min-height: 100vh;
    background-color: var(--background);
    color: var(--text);
  }
  
  .page-header {
    position: fixed;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .blog-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 6rem 1rem 4rem;
    width: 100%;
    box-sizing: border-box;
  }
  
  /* Tablet and desktop adjustments */
  @media screen and (min-width: 768px) and (max-width: 1280px) {
    .blog-content {
      padding-left: 5rem;
      padding-right: 2rem;
    }
  
    .post-meta {
      margin-left: 0.5rem;
    }
  }
  
  /* Large desktop */
  @media screen and (min-width: 1281px) {
    .blog-content {
      padding: 6rem 2rem 4rem;
    }
  }
  
  .loading, .error {
    text-align: center;
    padding: 4rem 1rem;
    font-size: 1.2rem;
  }
  
  .error h1 {
    color: var(--text);
    margin-bottom: 1rem;
  }
  
  .post-header {
    margin-bottom: 3rem;
  }
  
  .post-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    color: var(--text);
  }
  
  .post-meta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    opacity: 0.8;
    color: var(--text);
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background-color: rgba(128, 128, 128, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    color: var(--text);
  }
  
  .prose {
    line-height: 1.8;
    font-size: 1.1rem;
    color: var(--text);
  }
  
  .prose :deep(h1),
  .prose :deep(h2),
  .prose :deep(h3),
  .prose :deep(h4),
  .prose :deep(h5),
  .prose :deep(h6) {
    color: var(--text);
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .prose :deep(h2) {
    font-size: 1.8rem;
    margin-top: 3rem;
  }
  
  .prose :deep(h3) {
    font-size: 1.4rem;
    margin-top: 2rem;
  }
  
  .prose :deep(p) {
    margin-bottom: 1.5rem;
    color: var(--text);
  }
  
  .prose :deep(ul), 
  .prose :deep(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  .prose :deep(li) {
    margin-bottom: 0.5rem;
    color: var(--text);
  }
  
  .prose :deep(strong) {
    color: var(--text);
    font-weight: 600;
  }
  
  .prose :deep(code) {
    background-color: rgba(128, 128, 128, 0.2);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.9em;
    color: var(--text);
  }
  
  .prose :deep(pre) {
    background: #1a1a1a;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  .prose :deep(pre code) {
    background: none;
    padding: 0;
    color: #fff;
  }
  
  .prose :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.5rem auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .prose :deep(blockquote) {
    border-left: 4px solid var(--text);
    padding-left: 1rem;
    margin: 2rem 0;
    opacity: 0.8;
    font-style: italic;
  }
  
  .prose :deep(a) {
    color: var(--text);
    text-decoration: underline;
    transition: opacity 0.2s ease;
  }
  
  .prose :deep(a:hover) {
    opacity: 0.7;
  }
  
  .post-footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(128, 128, 128, 0.3);
  }
  
  .back-link {
    color: var(--text);
    text-decoration: none;
    transition: opacity 0.2s ease;
    font-weight: 500;
  }
  
  .back-link:hover {
    opacity: 0.7;
  }
  
  /* Mobile adjustments */
  @media (max-width: 767px) {
    .post-header h1 {
      font-size: 2rem;
    }
    
    .post-meta {
      flex-direction: column;
    }
  }
  
  /* Dark mode */
  :global(.dark) .prose :deep(code) {
    background: rgba(255, 255, 255, 0.1);
  }
  
  :global(.dark) .prose :deep(pre) {
    background: #2a2a2a;
  }
  
  :global(.dark) .prose :deep(img) {
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.05);
  }
  </style>