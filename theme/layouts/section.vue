<template>
  <div class="slidev-layout section">
    <div class="solo-logo">
      <Logo />
    </div>
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--solo-bg-dark);
  position: relative;
}

.solo-logo {
  position: absolute;
  top: 2rem;
  left: 2.5rem;
}

.section-content {
  max-width: 80%;
}

.section :deep(h1) {
  font-size: 4rem;
  font-weight: 700;
  color: var(--solo-text);
}

.section :deep(p) {
  font-size: 1.5rem;
  color: var(--solo-text-muted);
  margin-top: 1rem;
}
</style>
