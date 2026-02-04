<template>
  <div class="slidev-layout two-cols">
    <div class="solo-logo">
      <Logo />
    </div>
    <div class="cols-container">
      <div class="col-left">
        <slot />
      </div>
      <div class="col-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-cols {
  background: var(--solo-bg-dark);
  padding: 2.5rem 3rem;
  position: relative;
}

.solo-logo {
  position: absolute;
  top: 2rem;
  left: 2.5rem;
}

.cols-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 100%;
  margin-top: 2rem;
}

.col-left,
.col-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
