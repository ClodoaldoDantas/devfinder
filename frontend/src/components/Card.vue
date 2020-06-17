<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  max-width: 60rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}
</style>