<template>
    <div class="blog-post-page">
      <Head>
        <title>{{ pageTitle }}</title>
        <meta name="description" :content="pageDescription">
      </Head>
      
      <header class="page-header" :class="{ 'header-hidden': !headerVisible }">
        <SidebarToggle @toggle="toggleSidebar" />
        <div class="logo-container" style="view-transition-name: jc-logo;">
          <NuxtLink to="/" class="logo-link" aria-label="Return to home page">
            <JCLogo />
          </NuxtLink>
        </div>
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
              <time :datetime="getDateTimeString(blogPost.pubDate || blogPost.date)">{{ formatDate(blogPost.pubDate || blogPost.date) }}</time>
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
    </div>
  </template>
  
  <script setup lang="ts">
  
  interface BlogPost {
    title?: string
    date?: string | Date
    description?: string
    tags?: string[]
    [key: string]: any
  }
  
  const route = useRoute()
  const sidebarOpen = ref(false)
  const blogPost = ref<BlogPost | null>(null)
  const isLoading = ref(true)
  const hasError = ref(false)
  const headerVisible = ref(true)
  const lastScrollY = ref(0)
  
  // Computed properties for meta tags
  const pageTitle = computed(() => {
    return blogPost.value?.title ? `${blogPost.value.title} - Jared Cervantes` : 'Blog Post - Jared Cervantes'
  })
  
  const pageDescription = computed(() => {
    return blogPost.value?.description || 'Blog post by Jared Cervantes'
  })
  
  // Load the blog post using useAsyncData for better SSR support
  const { data: post, error, pending } = await useAsyncData(`blog-post-${route.path}`, () => 
    queryContent(route.path).findOne()
  )
  
  // Set reactive values based on the async data
  blogPost.value = post.value as BlogPost
  isLoading.value = pending.value
  hasError.value = !!error.value
  
  // Watch for changes in the async data
  watch(post, (newPost) => {
    blogPost.value = newPost as BlogPost
  })
  
  watch(pending, (newPending) => {
    isLoading.value = newPending
  })
  
  watch(error, (newError) => {
    hasError.value = !!newError
  })
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    
    if (currentScrollY < 100) {
      // Always show header when near the top
      headerVisible.value = true
    } else if (currentScrollY > lastScrollY.value) {
      // Scrolling down - hide header
      headerVisible.value = false
    } else {
      // Scrolling up - show header
      headerVisible.value = true
    }
    
    lastScrollY.value = currentScrollY
  }

  // Add scroll listener on mount
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  // Remove scroll listener on unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  
  const getDateTimeString = (dateInput?: string | Date): string => {
    if (!dateInput) return ''
    
    // If it's already a date-only string in YYYY-MM-DD format, return it as-is
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      return dateInput
    }
    
    let date: Date
    if (dateInput instanceof Date) {
      date = dateInput
    } else {
      date = new Date(dateInput)
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return ''
    }
    
    return date.toISOString().split('T')[0] // Returns YYYY-MM-DD format
  }

  const formatDate = (dateInput?: string | Date) => {
    if (!dateInput) return ''
    
    let date: Date
    if (dateInput instanceof Date) {
      date = dateInput
    } else {
      // Handle date-only strings (YYYY-MM-DD) to avoid timezone issues
      if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
        // For date-only strings, create date in local timezone to avoid UTC conversion
        const [year, month, day] = dateInput.split('-').map(Number)
        date = new Date(year, month - 1, day) // month is 0-indexed
      } else {
        date = new Date(dateInput)
      }
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateInput)
      return ''
    }
    
    return date.toLocaleDateString('en-US', {
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
    transition: transform 0.3s ease;
  }

  .page-header.header-hidden {
    transform: translateY(-100%);
  }

  .page-header .logo-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    color: var(--text);
  }

  .page-header .logo-link {
    display: block;
    width: 100%;
    height: 100%;
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .page-header .logo-link:hover {
    opacity: 0.8;
    transform: scale(1.05);
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
  
  /* Inline code styling (not in pre blocks) */
  .prose :deep(code:not(pre code)) {
    background-color: rgba(128, 128, 128, 0.2);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.9em;
    color: var(--text);
  }
  
  /* ProsePre (components/content/ProsePre.vue) handles code block + copy button styling */
  
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
  
  .prose :deep(svg) {
    color: var(--text);
    fill: currentColor;
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
  :global(.dark) .prose :deep(code:not(pre code)) {
    background: rgba(255, 255, 255, 0.1);
  }
  
  :global(.dark) .prose :deep(img) {
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.05);
  }
  </style>