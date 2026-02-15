<template>
    <div class="sidebar-overlay" :class="{ active: isOpen }" @click="closeSidebar">
      <aside class="blog-sidebar" :class="{ open: isOpen }" @click.stop>
        <div class="sidebar-header">
          <h2>Blog Posts</h2>
          <button class="close-btn" @click="closeSidebar" aria-label="Close sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="sidebar-content">
          <div v-if="isLoading" class="loading">Loading posts...</div>
          <div v-else-if="loadError" class="error">
            Failed to load posts
          </div>
          <div v-else-if="!posts || posts.length === 0" class="no-posts">
            No blog posts yet
          </div>
          <ul v-else class="posts-list">
            <li v-for="post in posts" :key="post._path">
              <NuxtLink :to="post._path" @click="closeSidebar" class="post-link">
                <div class="post-title">{{ post.title }}</div>
                <div class="post-date">{{ formatDate(post.pubDate || post.date) }}</div>
                <div class="post-description">{{ post.description }}</div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </template>
  
  <script setup lang="ts">
  interface BlogPost {
    _path: string
    title?: string
    description?: string
    date?: string | Date
    pubDate?: string | Date
    published?: boolean
    draft?: boolean
    [key: string]: any
  }
  
  interface Props {
    isOpen: boolean
  }
  
  defineProps<Props>()
  
  const emit = defineEmits<{
    close: []
  }>()
  
  // Load posts at build/SSR time so the static site has the list (no runtime API)
  const { data: blogContent, error } = await useAsyncData('blog-sidebar-posts', () =>
    queryContent('/blog').find()
  )

  const isLoading = computed(() => !blogContent.value && !error.value)
  const loadError = computed(() => !!error.value)

  const posts = computed<BlogPost[]>(() => {
    const raw = blogContent.value
    if (!raw || !Array.isArray(raw)) return []
    return raw
      .filter((content: any) => {
        const dateField = content.pubDate || content.date
        const isPublished = (content.draft === false) || (content.published === true)
        return content &&
          content._path &&
          content.title &&
          dateField &&
          content._path.startsWith('/blog/') &&
          isPublished
      })
      .map((content: any) => ({
        _path: content._path,
        title: content.title,
        description: content.description,
        date: content.date,
        pubDate: content.pubDate,
        published: content.published !== false,
        draft: content.draft,
        ...content
      } as BlogPost))
      .sort((a, b) => {
        const aDate = a.pubDate || a.date
        const bDate = b.pubDate || b.date
        if (!aDate || !bDate) return 0
        return new Date(bDate).getTime() - new Date(aDate).getTime()
      })
  })
  
  const closeSidebar = () => {
    emit('close')
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
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .sidebar-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  
  .blog-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 100vh;
    background-color: var(--background);
    border-right: 1px solid var(--text);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    z-index: 1001;
  }
  
  .blog-sidebar.open {
    transform: translateX(0);
  }
  
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--text);
  }
  
  .sidebar-header h2 {
    margin: 0;
    color: var(--text);
    font-size: 1.5rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    padding: 0.5rem;
    transition: opacity 0.2s ease;
  }
  
  .close-btn:hover {
    opacity: 0.7;
  }
  
  .sidebar-content {
    padding: 1.5rem;
  }
  
  .loading, .error, .no-posts {
    text-align: center;
    color: var(--text);
    padding: 2rem;
  }
  
  .posts-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .posts-list li {
    margin-bottom: 1.5rem;
  }
  
  .post-link {
    display: block;
    text-decoration: none;
    color: var(--text);
    padding: 1rem;
    border: 1px solid transparent;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .post-link:hover {
    border-color: var(--text);
    background-color: rgba(128, 128, 128, 0.1);
  }
  
  .post-title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  .post-date {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }
  
  .post-description {
    font-size: 0.95rem;
    opacity: 0.8;
    line-height: 1.4;
  }
  
  .error {
    color: #ef4444;
  }
  
  @media (max-width: 768px) {
    .blog-sidebar {
      width: 100%;
    }
  }
  </style>