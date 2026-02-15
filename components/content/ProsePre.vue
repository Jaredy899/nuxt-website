<template>
  <div class="code-block-wrapper">
    <button
      type="button"
      class="copy-code-button"
      :class="{ copied }"
      aria-label="Copy code"
      :aria-pressed="copied"
      @click="copyCode"
    >
      <svg
        v-if="!copied"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <template v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span class="btn-text">Copied!</span>
      </template>
    </button>
    <pre :class="props.class"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const copied = ref(false)

async function copyCode() {
  const text = props.code || ''
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<style scoped>
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
  flex-shrink: 0;
  min-width: 1.75rem;
  min-height: 1.75rem;
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

.code-block-wrapper pre {
  margin: 0 !important;
  padding: 1rem !important;
  padding-right: 6rem !important;
  background: #1a1a1a !important;
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

.code-block-wrapper :deep(code) {
  font-family: 'Fira Code', monospace !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
  color: #fff !important;
  background: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
  border: none !important;
  display: block !important;
  white-space: pre !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
}

.code-block-wrapper :deep(pre code .line) {
  display: block;
}
</style>
