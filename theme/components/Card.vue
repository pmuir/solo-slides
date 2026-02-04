<script setup lang="ts">
defineProps<{
  highlight?: boolean
  title?: string
}>()
</script>

<template>
  <div class="card" :class="{ highlight }">
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--solo-bg-card);
  border: 1px solid var(--solo-border);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
}

.card.highlight {
  border-color: var(--solo-purple);
  box-shadow: 0 0 30px var(--solo-purple-glow);
}

.card h3 {
  color: var(--solo-text);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.card :deep(p) {
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.card :deep(ul) {
  padding-left: 0;
  list-style: none;
  margin: 0;
}

.card :deep(li) {
  color: var(--solo-text-muted);
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.card :deep(strong) {
  color: var(--solo-text);
}
</style>
