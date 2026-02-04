<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
  variant?: 'full' | 'icon'
}>()
</script>

<template>
  <div class="logo" :class="[size || 'md', variant || 'full']">
    <slot>
      <!-- Solo.io logo text -->
      <span class="solo-text">SOLO.IO</span>
    </slot>
  </div>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.solo-text {
  font-family: 'Figtree', sans-serif;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--solo-text-muted);
}

.logo.sm .solo-text {
  font-size: 0.75rem;
}

.logo.md .solo-text {
  font-size: 1rem;
}

.logo.lg .solo-text {
  font-size: 1.5rem;
}
</style>
