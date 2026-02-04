<script setup lang="ts">
defineProps<{
  background?: string
}>()
</script>

<template>
  <div 
    class="slidev-layout cover"
    :style="background ? { backgroundImage: `url(${background})` } : {}"
  >
    <div class="solo-logo">
      <Logo />
    </div>
    <div class="cover-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--solo-bg-dark);
  color: white;
  background-size: cover;
  background-position: center;
  position: relative;
}

.solo-logo {
  position: absolute;
  top: 2rem;
  left: 2.5rem;
}

.cover-content {
  max-width: 80%;
}

.cover :deep(h1) {
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.cover :deep(p) {
  font-size: 1.5rem;
  color: var(--solo-text-muted);
}
</style>
