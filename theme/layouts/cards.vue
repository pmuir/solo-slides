<script setup lang="ts">
defineProps<{
  cols?: 2 | 3
}>()
</script>

<template>
  <div class="slidev-layout cards-layout">
    <div class="solo-logo">
      <Logo />
    </div>
    <div class="header">
      <slot name="header" />
    </div>
    <div class="cards-grid" :class="`cols-${cols || 2}`">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cards-layout {
  background: var(--solo-bg-dark);
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

.solo-logo {
  position: absolute;
  top: 2rem;
  left: 2.5rem;
}

.header {
  margin-top: 2rem;
}

.cards-grid {
  display: grid;
  gap: 1.5rem;
  flex: 1;
}

.cards-grid.cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.cards-grid.cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.cards-layout :deep(.card) {
  background: var(--solo-bg-card);
  border: 1px solid var(--solo-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.cards-layout :deep(.card h3) {
  color: var(--solo-text);
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
