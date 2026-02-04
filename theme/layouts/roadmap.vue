<template>
  <div class="slidev-layout roadmap">
    <div class="solo-logo">
      <Logo />
    </div>
    <div class="content">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="roadmap-grid">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.roadmap {
  background: var(--solo-bg-dark);
  padding: 1.25rem 2.5rem 1.25rem;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.solo-logo {
  position: absolute;
  top: 1.25rem;
  left: 2.5rem;
}

.content {
  margin-top: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  margin-bottom: 0.75rem;
}

.roadmap-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.75rem;
  flex: 1;
}

.roadmap :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  color: var(--solo-text);
  margin: 0;
}

.roadmap :deep(.roadmap-card) {
  background: var(--solo-bg-card);
  border: 1px solid var(--solo-border);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  overflow: hidden;
}

.roadmap :deep(.roadmap-card h3) {
  color: var(--solo-text);
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.roadmap :deep(.roadmap-card ul) {
  padding-left: 0;
  list-style: none;
  margin: 0;
}

.roadmap :deep(.roadmap-card li) {
  color: var(--solo-text-muted);
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
}

.roadmap :deep(.roadmap-card li::before) {
  content: "•";
  color: var(--solo-purple);
}
</style>
