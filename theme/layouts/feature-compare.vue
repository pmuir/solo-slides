<template>
  <div class="slidev-layout feature-compare">
    <div class="solo-logo">
      <Logo />
    </div>
    <div class="content">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="compare-grid">
        <div class="challenge">
          <slot name="challenge" />
        </div>
        <div class="comparison">
          <slot name="comparison" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-compare {
  background: var(--solo-bg-dark);
  padding: 2.5rem 3rem;
  position: relative;
}

.solo-logo {
  position: absolute;
  top: 2rem;
  left: 2.5rem;
}

.content {
  margin-top: 1rem;
}

.header {
  margin-bottom: 2rem;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

.feature-compare :deep(h1) {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--solo-text);
}

.feature-compare :deep(.subtitle) {
  font-style: italic;
  color: var(--solo-text-muted);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.feature-compare :deep(.section-title) {
  color: var(--solo-pink);
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

/* Without/With table styling */
.feature-compare :deep(.compare-table) {
  border-radius: 0.5rem;
  overflow: hidden;
}

.feature-compare :deep(.compare-bad) {
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem 1rem;
  border-left: 3px solid var(--solo-red);
  margin-bottom: 0.25rem;
}

.feature-compare :deep(.compare-bad-header) {
  background: rgba(239, 68, 68, 0.2);
  padding: 0.5rem 1rem;
  color: var(--solo-red);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-compare :deep(.compare-good) {
  background: rgba(34, 197, 94, 0.1);
  padding: 0.75rem 1rem;
  border-left: 3px solid var(--solo-green);
  margin-bottom: 0.25rem;
}

.feature-compare :deep(.compare-good-header) {
  background: rgba(34, 197, 94, 0.2);
  padding: 0.5rem 1rem;
  color: var(--solo-green);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
