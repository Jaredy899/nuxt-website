<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 700 419"
    :class="className"
    width="150"
    height="150"
  >
    <g>
      <path
        class="letter j"
        aria-label="J"
        d="M335 0H290V334.06C290 354.821 273.018 371.797 252.25 371.797H150V416.797H252.25C298.027 416.797 335 379.775 335 334.06V0Z"
      />
      <path
        class="letter c"
        aria-label="C"
        d="M350 82.7372C350 37.0217 387.027 0 432.75 0H575V45H432.75C411.988 45 395.006 61.9759 395.006 82.7372V334.06C395.006 354.821 411.988 371.797 432.75 371.797H575V416.797H432.75C387.027 416.797 350 379.775 350 334.06V82.7372Z"
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