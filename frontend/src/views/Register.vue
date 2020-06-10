<template>
  <section class="register">
    <div class="container">
      <navbar />
      <section class="register-content">
        <div class="card">
          <h2 class="register-title">Faça seu cadastro</h2>
          <form @submit.prevent="handleSubmit()" class="form">
            <!-- NAME -->
            <div class="form__group">
              <label for="name" class="form__label">Nome</label>
              <input
                placeholder="Ex: John Doe"
                type="text"
                id="name"
                class="form__input"
                v-model="name"
              />
            </div>

            <div class="two-columns">
              <!-- EMAIL -->
              <div class="form__group">
                <label for="email" class="form__label">E-mail</label>
                <input
                  placeholder="Ex: john@gmail.com"
                  type="email"
                  id="email"
                  class="form__input"
                  v-model="email"
                />
              </div>

              <!-- WHATSAPP -->
              <div class="form__group">
                <label for="whatsapp" class="form__label">Whatsapp</label>
                <input
                  placeholder="Ex: (99) 99999-9999"
                  type="text"
                  id="whatsapp"
                  class="form__input"
                  v-model="whatsapp"
                />
              </div>
            </div>

            <!-- MAP -->
            <div
              class="container-map"
              :style="{ height: center ? '30rem' : '0' }"
            >
              <l-map v-if="center" :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-marker
                  :draggable="true"
                  :lat-lng="position"
                  @update:latLng="updatePosition"
                />
              </l-map>
            </div>

            <div class="two-columns">
              <!-- UF -->
              <div class="form__group">
                <label for="uf" class="form__label">Uf</label>
                <select id="uf">
                  <option value="">Selecione a UF</option>
                </select>
              </div>
              <!-- CITY -->
              <div class="form__group">
                <label for="city" class="form__label">Cidade</label>
                <select id="city">
                  <option value="">Selecione a UF</option>
                </select>
              </div>
            </div>

            <!-- BUTTON -->
            <div class="form__group align-end">
              <button class="btn btn-blue">Cadastrar</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { latLng } from "leaflet";
import Navbar from "@/components/Navbar";

export default {
  name: "Register",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      email: "",
      whatsapp: "",
      center: null,
      position: null,
      zoom: 15,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  created() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.center = latLng(latitude, longitude);
      this.position = latLng(latitude, longitude);
    });
  },
  methods: {
    updatePosition(latLng) {
      this.position = latLng;
    },
    handleSubmit() {
      const { name, email, whatsapp } = this;
      const { lat, lng } = this.position;
      console.log(name, email, whatsapp, lat, lng);

      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("whatsapp", whatsapp);
      data.append("latitude", String(lat));
      data.append("longitude", String(lng));
    },
  },
};
</script>

<style scoped>
.register-title {
  text-align: center;
  margin-bottom: 2rem;
}

.register-content {
  padding: 2rem 0;
}

.card {
  background-color: #fff;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  max-width: 60rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.form {
  display: grid;
}

.form__group {
  margin-bottom: 2rem;
}

.form__label {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 0.5rem;
}

.form__input,
select {
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;

  outline: none;
  background-color: var(--color-input);
  color: var(--color-grey);
  border: 1px solid var(--color-border);
  border-radius: 1rem;

  width: 100%;
  padding: 1rem;
}

select {
  appearance: none;
}

.btn {
  width: 100%;
}

.container-map {
  margin: 2rem 0;
}
</style>
