<template>
    <button 
      class="sidebar-toggle" 
      aria-label="Toggle blog sidebar" 
      @click="toggleSidebar"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="8" y1="6" x2="8" y2="18"></line>
      </svg>
    </button>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits<{
    toggle: []
  }>()
  
  const toggleSidebar = () => {
    emit('toggle')
  }
  </script>
  
  <style scoped>
  .sidebar-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--text);
    transition: transform 0.2s ease;
  }
  
  .sidebar-toggle:hover {
    transform: scale(1.1);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  </style>