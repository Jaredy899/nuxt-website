<template>
  <!-- This component only provides JavaScript functionality and CSS styling -->
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const setupCopyButtons = () => {
  // Try multiple selectors to find code blocks
  const codeBlocks = document.querySelectorAll("pre code, pre, .highlight code, .code-block code");

  codeBlocks.forEach((codeBlock, index) => {
    // Find the pre element (could be the codeBlock itself or its parent)
    let preElement = codeBlock.tagName === 'PRE' ? codeBlock : codeBlock.closest('pre');
    if (!preElement) {
      return;
    }

    // Check if we already have a wrapper
    let wrapper = preElement.parentElement;
    if (!wrapper || !wrapper.classList.contains("code-block-wrapper")) {
      const newWrapper = document.createElement("div");
      newWrapper.className = "code-block-wrapper";
      preElement.parentElement?.insertBefore(newWrapper, preElement);
      newWrapper.appendChild(preElement);
      wrapper = newWrapper;
    }

    // Check if copy button already exists
    if (!wrapper.querySelector(".copy-code-button")) {
      const copySVG = `
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4
                   a2 2 0 0 1 2-2h9
                   a2 2 0 0 1 2 2v1"/>
        </svg>`.trim();

      const checkSVG = `
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>`.trim();

      const btn = document.createElement("button");
      btn.className = "copy-code-button";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = copySVG;

      btn.addEventListener("click", async () => {
        try {
          // Get text from the code element or pre element
          const textElement = preElement.querySelector('code') || preElement;
          const text = textElement.textContent || "";
          await navigator.clipboard.writeText(text);

          const prev = btn.innerHTML;
          btn.innerHTML = 
            checkSVG + '<span class="btn-text">Copied!</span>';
          btn.classList.add("copied");

          setTimeout(() => {
            btn.innerHTML = prev;
            btn.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code:", err);
        }
      });

      wrapper.appendChild(btn);
    }
  });
};

onMounted(() => {
  // Initial setup
  setupCopyButtons();
  
  // Setup with a slight delay to ensure content is rendered
  setTimeout(() => {
    setupCopyButtons();
  }, 100);
  
  // Additional delay for Nuxt Content
  setTimeout(() => {
    setupCopyButtons();
  }, 1000);
  
  // Listen for route changes
  router.afterEach(() => {
    nextTick(() => {
      setTimeout(() => {
        setupCopyButtons();
      }, 100);
    });
  });
  
  // Also listen for any DOM mutations (content updates)
  const observer = new MutationObserver((mutations) => {
    setupCopyButtons();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
</script>

<style>
.code-block-wrapper {
  position: relative;
  margin: 1rem 0;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  overflow: visible;
  box-shadow: none;
  padding: 0;
}

.copy-code-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  cursor: pointer;
  color: #e2e8f0;
  transition: all 0.2s ease;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  backdrop-filter: blur(4px);
  pointer-events: auto;
  /* Ensure button doesn't interfere with scrolling */
  flex-shrink: 0;
  min-width: 1.75rem;
  min-height: 1.75rem;
  /* Make button smaller and more compact */
  font-size: 0.875rem;
}

.copy-code-button svg {
  width: 1rem;
  height: 1rem;
  stroke: currentColor;
  fill: none;
}

.copy-code-button .btn-text {
  margin-left: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.copy-code-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  transform: translateY(-1px);
}

.copy-code-button.copied {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
  color: #22c55e;
}

.copy-code-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Clean code block styling to match Astro site exactly */
.code-block-wrapper pre {
  margin: 0 !important;
  padding: 1rem !important;
  padding-right: 6rem !important;
  background: #1a1a1a !important; /* Default background like Astro */
  border-radius: 8px !important;
  overflow-x: auto !important;
  border: none !important;
  box-shadow: none !important;
  display: block !important;
  width: 100% !important;
  box-sizing: border-box !important;
  white-space: pre !important;
  word-wrap: normal !important;
  font-family: 'Fira Code', monospace !important;
  position: relative !important;
  scrollbar-width: thin !important;
}

.code-block-wrapper code {
  font-family: 'Fira Code', monospace !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
  color: #fff !important; /* White text like Astro */
  background: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
  border: none !important;
  display: block !important;
  white-space: pre !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  padding-right: 0 !important;
}

/* Dark mode styling - matches Astro exactly */
.dark .code-block-wrapper pre {
  background: #1a1a1a !important; /* Lighter dark background in dark mode */
}

.dark .code-block-wrapper code {
  color: #fff !important;
}

/* Light mode styling - matches Astro exactly */
html:not(.dark) .code-block-wrapper pre {
  background: #1a1a1a !important; /* Darker background in light mode */
}

html:not(.dark) .code-block-wrapper code {
  color: #fff !important;
}

/* Copy button styling for all themes */
.dark .copy-code-button,
html:not(.dark) .copy-code-button {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #e2e8f0;
}

.dark .copy-code-button:hover,
html:not(.dark) .copy-code-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.dark .copy-code-button.copied,
html:not(.dark) .copy-code-button.copied {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
  color: #22c55e;
}
</style>