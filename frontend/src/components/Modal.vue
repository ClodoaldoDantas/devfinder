<template>
  <div class="modal-container">
    <div class="modal">
      <h2 class="modal-title">{{ label }}</h2>
      <slot />
      <button v-if="btnClose" @click="handleSubmit()" class="modal-btn-close">
        <x-icon size="20" class="modal-icon-close"></x-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { XIcon } from "vue-feather-icons";

export default {
  name: "Modal",
  props: {
    label: {
      type: String,
      required: true,
    },
    btnClose: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    XIcon,
  },
  methods: {
    handleSubmit() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  padding: 2rem;
  background-color: #fff;
  border-radius: 1rem;
  width: 40rem;
}

.modal-title {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-btn-close {
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;

  border: none;
  background: var(--color-blue);
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
}

.modal-icon-close {
  color: #fff;
}
</style>
