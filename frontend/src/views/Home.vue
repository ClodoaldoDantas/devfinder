<template>
  <section class="home">
    <modal v-if="showModal" label="Quem é você ?" @close="closeModal()">
      <router-link
        to="/register"
        tag="button"
        class="btn w-100"
        :style="{ marginBottom: '1rem' }"
        >Sou desenvolvedor</router-link
      >
      <router-link tag="button" to="/list" class="btn btn-green w-100">
        Sou cliente / contratante
      </router-link>
    </modal>
    <div class="container">
      <div class="home-content">
        <h1>DevFinder</h1>
        <p>
          precisa de um desenvolvedor(a) perto de
          <br />você ? Encontre-o aqui.
        </p>
        <button @click="openModal()" class="btn btn-home">
          <span>inicie agora mesmo</span>
          <log-in-icon size="24"></log-in-icon>
        </button>
      </div>
      <figure class="home-hero">
        <img src="@/assets/hero.svg" alt="hero" />
      </figure>
    </div>
  </section>
</template>

<script>
import { LogInIcon } from "vue-feather-icons";
import Modal from "@/components/Modal";

export default {
  name: "Home",
  components: {
    LogInIcon,
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  width: 100%;
}

.home > .container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-hero img {
  width: 60rem;
  height: auto;
}

.home-content h1 {
  color: var(--color-blue);
  font-size: 4.8rem;
  margin-bottom: 1rem;
}

.home-content p {
  font-size: 2rem;
  color: var(--color-grey-medium);
  margin-bottom: 2rem;
}

.btn-home {
  display: flex;
  align-items: center;
}

.btn-home span {
  margin-right: 1rem;
}

@media (max-width: 960px) {
  .home-hero img {
    width: 50rem;
    height: auto;
  }
}

@media (max-width: 768px) {
  .home > .container {
    flex-direction: column;
  }

  .home-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
