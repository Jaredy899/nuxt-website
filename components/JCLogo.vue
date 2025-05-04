<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 419"
    :class="className"
    width="100"
    height="100"
  >
    <g>
      <path
        class="letter j"
        aria-label="J"
        d="M385 0H340V334.06C340 354.821 323.018 371.797 302.25 371.797H200V416.797H302.25C348.027 416.797 385 379.775 385 334.06V0Z"
      />
      <path
        class="letter c"
        aria-label="C"
        d="M400 82.7372C400 37.0217 437.027 0 482.75 0H625V45H482.75C461.988 45 445.006 61.9759 445.006 82.7372V334.06C445.006 354.821 461.988 371.797 482.75 371.797H625V416.797H482.75C437.027 416.797 400 379.775 400 334.06V82.7372Z"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  className: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.letter {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.j {
  transform: translateX(-5px);
}

.c {
  transform: translateX(5px);
}

svg:hover .j {
  transform: translateX(-25px) scale(1.3);
}

svg:hover .c {
  transform: translateX(25px) scale(1.3);
}

@media (max-width: 768px) {
  svg:hover .j {
    transform: translateX(-10px) scale(1.1);
  }
  svg:hover .c {
    transform: translateX(10px) scale(1.1);
  }
}
</style> 