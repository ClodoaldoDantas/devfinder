<template>
  <section class="register">
    <div class="container">
      <!-- NAVBAR -->
      <navbar label="Voltar para a home 🏠" route="/" />

      <!-- FORM -->
      <section class="register-content">
        <card>
          <h2 class="register-title">Faça seu cadastro ✍️</h2>
          <form @submit.prevent="handleSubmit()" class="form">
            <div class="form__group">
              <div class="box" :class="{ border: !image }">
                <input
                  @change="handleFile"
                  id="image"
                  type="file"
                  accept="image/*"
                />
                <label v-if="!image" for="image">
                  <upload-icon size="24" class="icon-upload"></upload-icon>
                  <p>Selecione uma imagem</p>
                </label>

                <img v-else :src="imagePreview" alt="Preview" />
              </div>
            </div>

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
              <l-map v-if="center && position" :zoom="zoom" :center="center">
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
                <select id="uf" v-model="selectedUf">
                  <option value="0">Selecione a UF</option>
                  <option v-for="uf in ufs" :key="uf" :value="uf">
                    {{ uf }}
                  </option>
                </select>
              </div>
              <!-- CITY -->
              <div class="form__group">
                <label for="city" class="form__label">Cidade</label>
                <select id="city" v-model="selectedCity">
                  <option value="0">Selecione a Cidade</option>
                  <option v-for="city in cities" :key="city" :value="city">
                    {{ city }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="error" class="error-container">
              <span class="error">* Preencha todos os campos</span>
            </div>
            <!-- BUTTON -->
            <div class="form__group align-end">
              <button class="btn btn-blue">Cadastrar</button>
            </div>
          </form>
        </card>
      </section>

      <!-- MODAL -->
      <modal v-if="showModal" label="Cadastro concluído" :btnClose="false">
        <router-link to="/" tag="button" class="btn w-100">
          Voltar para a home
        </router-link>
      </modal>
    </div>
  </section>
</template>

<script>
import { latLng } from "leaflet";
import { UploadIcon } from "vue-feather-icons";

import axios from "axios";
import api from "@/services/api";
import { url, attribution } from "@/helpers/map";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Modal from "@/components/Modal";

export default {
  name: "Register",
  components: {
    Navbar,
    UploadIcon,
    Card,
    Modal,
  },
  data() {
    return {
      name: "",
      email: "",
      whatsapp: "",
      position: null,
      image: null,
      imagePreview: "",
      ufs: [],
      selectedUf: "0",
      cities: [],
      selectedCity: "0",
      center: latLng(-3.8260461, -38.473319),
      zoom: 15,
      error: false,
      url,
      attribution,
      showModal: false,
    };
  },
  created() {
    this.currentLocation();
    this.getUfs();
  },
  methods: {
    showError() {
      this.error = true;
      setTimeout(() => (this.error = false), 1000);
    },
    updatePosition(latLng) {
      this.position = latLng;
    },
    currentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.center = latLng(latitude, longitude);
        this.position = latLng(latitude, longitude);
      });
    },
    async getUfs() {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const ufs = response.data.map((item) => item.sigla);
      this.ufs = ufs;
    },
    async getCities(uf) {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      const cities = response.data.map((city) => city.nome);
      this.cities = cities;
    },
    validateFields(...fields) {
      const valid = fields.filter((field) => field === "" || field === "0");
      return valid.length === 0;
    },
    handleFile(event) {
      this.image = event.target.files[0];
    },
    handleSubmit() {
      const { name, email, whatsapp, selectedUf, selectedCity, image } = this;
      const { lat, lng } = this.position;

      const validatedFields = this.validateFields(
        name,
        email,
        whatsapp,
        selectedUf,
        selectedCity
      );

      if (validatedFields) {
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("whatsapp", whatsapp);
        data.append("latitude", String(lat));
        data.append("longitude", String(lng));
        data.append("city", selectedCity);
        data.append("uf", selectedUf);
        data.append("image", image);

        api.post("/developers", data).then(() => {
          window.scroll({
            top: 0,
            behavior: "smooth",
          });

          this.showModal = true;
        });
      } else {
        this.showError();
      }
    },
  },
  watch: {
    selectedUf(value) {
      if (value !== "0") this.getCities(value);
    },
    image() {
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onloadend = () => {
        this.imagePreview = reader.result;
      };
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

.error {
  display: block;
  padding: 1.2rem 1.8rem;
  margin-bottom: 2rem;
  color: var(--color-red);
  background-color: var(--bg-red);
  border: 1px solid var(--border-red);
  border-radius: 1.5rem;
}

.box {
  height: 300px;
  border-radius: 1rem;
  width: 100%;
  background: rgba(52, 152, 219, 0.18);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box.border {
  border: 2px dashed rgba(52, 152, 219, 0.18);
}

.box input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.box label {
  cursor: pointer;
  text-align: center;
}

.box img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1rem;
}
</style>
