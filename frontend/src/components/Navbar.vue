<template>
  <header class="header">
    <router-link to="/" tag="button" class="header-btn">
      <arrow-left-icon size="20"></arrow-left-icon>
    </router-link>
    <span class="header-label">Voltar para home</span>
  </header>
</template>

<script>
import { ArrowLeftIcon } from "vue-feather-icons";

export default {
  name: "Register",
  components: {
    ArrowLeftIcon,
  },
};
</script>

<style scoped>
.header {
  padding-top: 3rem;
  display: flex;
  align-items: center;
}

.header-btn {
  margin-right: 1rem;
  border: none;
  background-color: transparent;
  color: var(--color-green);
  cursor: pointer;
  outline: 0;
}

.header-label {
  font-size: 1.8rem;
}
</style>
