<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const setupCopyButtons = () => {
  const codeBlocks = document.querySelectorAll("pre code");

  codeBlocks.forEach((codeBlock) => {
    let wrapper = codeBlock.parentElement;
    if (!wrapper) return;

    if (!wrapper.classList.contains("code-block-wrapper")) {
      const newWrapper = document.createElement("div");
      newWrapper.className = "code-block-wrapper";
      wrapper.insertBefore(newWrapper, codeBlock);
      newWrapper.appendChild(codeBlock);
      wrapper = newWrapper;
    }

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
          const text = codeBlock.textContent || "";
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
  
  // Listen for route changes
  router.afterEach(() => {
    nextTick(() => {
      setTimeout(() => {
        setupCopyButtons();
      }, 100);
    });
  });
  
  // Also listen for any DOM mutations (content updates)
  const observer = new MutationObserver(() => {
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
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #2a2a2a;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.copy-code-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
  cursor: pointer;
  color: #e2e8f0;
  transition: all 0.2s ease;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(4px);
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

/* Style the pre element to fit nicely in the container */
.code-block-wrapper pre {
  margin: 0 !important;
  padding: 1.25rem !important;
  background: transparent !important; /* Let the wrapper handle the background */
  border-radius: 0 !important;
  overflow-x: auto !important;
  border: none !important;
  box-shadow: none !important;
  display: block !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.code-block-wrapper code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace !important;
  font-size: 1rem !important;
  line-height: 1.6 !important;
  color: #e2e8f0 !important;
  background: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
  border: none !important;
  display: block !important;
}

/* Dark mode specific styles */
:deep(.dark) .code-block-wrapper {
  background: #374151;
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.dark) .copy-code-button {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #e2e8f0;
}

:deep(.dark) .copy-code-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

:deep(.dark) .copy-code-button.copied {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
  color: #22c55e;
}

:deep(.dark) .code-block-wrapper code {
  color: #e2e8f0 !important;
}

/* Light mode styles */
@media (prefers-color-scheme: light) {
  .code-block-wrapper {
    background: #f8fafc;
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  .copy-code-button {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
    color: #374151;
  }
  
  .copy-code-button:hover {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.3);
    color: #111827;
  }
  
  .code-block-wrapper code {
    color: #374151 !important;
  }
}
</style>