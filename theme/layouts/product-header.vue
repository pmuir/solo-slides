<script setup lang="ts">
defineProps<{
  product?: 'agentgateway' | 'kagent' | 'agentregistry'
  subtitle?: string
}>()
</script>

<template>
  <div class="slidev-layout product-header">
    <div class="solo-logo">
      <Logo />
    </div>
    <div class="product-badge">
      <span class="enterprise-label">SOLO ENTERPRISE</span>
      <span class="for-label">FOR</span>
      <span class="product-name">{{ product || 'product' }}</span>
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="footer-logo" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.product-header {
  background: var(--solo-bg-dark);
  padding: 1.5rem 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  height: 100%;
  overflow: hidden;
}

.solo-logo {
  position: absolute;
  top: 1.5rem;
  left: 2.5rem;
}

.product-badge {
  position: absolute;
  top: 1.5rem;
  right: 3rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.enterprise-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--solo-text-muted);
  letter-spacing: 0.1em;
}

.for-label {
  font-size: 0.625rem;
  color: var(--solo-text-muted);
}

.product-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--solo-purple);
}

.content {
  margin-top: 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: hidden;
}

.footer-logo {
  position: absolute;
  bottom: 1rem;
  left: 2.5rem;
}

.product-header :deep(h1) {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--solo-text);
  margin: 0;
}

.product-header :deep(.subtitle) {
  font-style: italic;
  color: var(--solo-text-muted);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}
</style>
