<script setup lang="ts">
defineProps<{
  name: string
  icon?: string
  active?: boolean
}>()
</script>

<template>
  <div class="product-circle" :class="{ active }">
    <span class="icon" v-if="icon">{{ icon }}</span>
    <span class="name">{{ name }}</span>
  </div>
</template>

<style scoped>
.product-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--solo-bg-card);
  border: 1px solid var(--solo-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.product-circle.active {
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
}

.product-circle:not(.active) {
  opacity: 0.5;
}

.icon {
  font-size: 1.5rem;
  color: var(--solo-purple);
}

.name {
  font-weight: 600;
  color: var(--solo-purple);
  font-size: 1rem;
}
</style>
