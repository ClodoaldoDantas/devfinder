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
              <span v-if="submitted && !name" class="error">
                * Nome é obrigatório
              </span>
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
                <span v-if="submitted && !email" class="error">
                  * E-mail é obrigatório
                </span>
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
                <span v-if="submitted && !whatsapp" class="error">
                  * Whatsapp é obrigatório
                </span>
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
                <select id="uf" v-model="selectedUf">
                  <option value="0">Selecione a UF</option>
                  <option v-for="uf in ufs" :key="uf" :value="uf">
                    {{ uf }}
                  </option>
                </select>
                <span v-if="submitted && selectedUf === '0'" class="error">
                  * UF é obrigatório
                </span>
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
                <span v-if="submitted && selectedCity === '0'" class="error">
                  * Cidade é obrigatória
                </span>
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
import axios from "axios";

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
      position: null,
      submitted: false,
      ufs: [],
      selectedUf: "0",
      cities: [],
      selectedCity: "0",
      center: null,
      zoom: 15,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  created() {
    this.currentLocation();
    this.getUfs();
  },
  methods: {
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
    getUfs() {
      axios
        .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((response) => {
          const ufs = response.data.map((item) => item.sigla);
          this.ufs = ufs;
        });
    },
    getCities(uf) {
      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
      axios.get(url).then((response) => {
        const cities = response.data.map((city) => city.nome);
        this.cities = cities;
      });
    },
    validateFields(...fields) {
      const valid = fields.filter((field) => field === "" || field === "0");
      return valid.length === 0;
    },
    handleSubmit() {
      const { name, email, whatsapp, selectedUf, selectedCity } = this;
      const { lat, lng } = this.position;

      const validatedFields = this.validateFields(
        name,
        email,
        whatsapp,
        selectedUf,
        selectedCity
      );

      this.submitted = true;

      if (validatedFields) {
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("whatsapp", whatsapp);
        data.append("latitude", String(lat));
        data.append("longitude", String(lng));
        data.append("city", selectedCity);
        data.append("uf", selectedUf);

        for (var pair of data.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
      }
    },
  },
  watch: {
    selectedUf(value) {
      if (value !== "0") this.getCities(value);
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

.error {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-red);
}
</style>
