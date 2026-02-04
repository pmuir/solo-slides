<script setup lang="ts">
</script>

<template>
  <div class="slidev-layout default">
    <div class="solo-logo">
      <Logo />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.default {
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

.content {
  margin-top: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
