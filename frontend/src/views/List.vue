<template>
  <section class="list">
    <div class="container">
      <!-- NAVBAR -->
      <navbar label="Voltar para a home 🏠" route="/" />

      <div class="list-content">
        <card>
          <h2 class="list-title">
            {{ title }}
          </h2>

          <!-- MAP -->
          <div
            v-if="!loading"
            class="container-map"
            :style="{ height: center ? '40rem' : '0' }"
          >
            <l-map v-if="center" :zoom="zoom" :center="center">
              <l-tile-layer :url="url" :attribution="attribution" />
              <l-marker
                v-for="user in users"
                :key="user.id"
                :lat-lng="user.position"
              >
                <l-popup style="text-align: center">
                  <button class="btn btn-small" @click="goToDetail(user.id)">
                    Mais informações
                  </button>
                </l-popup>
                <l-icon>
                  <img class="map-photo" :src="user.image" :alt="user.name" />
                </l-icon>
              </l-marker>
            </l-map>
          </div>
        </card>
      </div>
    </div>
  </section>
</template>

<script>
import { latLng } from "leaflet";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { url, attribution } from "@/helpers/map";
import api from "@/services/api";

export default {
  name: "List",
  components: {
    Navbar,
    Card,
  },
  async created() {
    this.loading = true;
    await this.currentLocation();
    await this.getUsers();
    this.loading = false;
  },
  computed: {
    title() {
      return this.loading
        ? "Carregando mapa ... 🚀"
        : "Encontre o desenvolvedor(a) mais próximo 💻";
    },
  },
  data() {
    return {
      center: latLng(-3.8260461, -38.473319),
      zoom: 15,
      url,
      attribution,
      loading: false,
      users: [],
    };
  },
  methods: {
    currentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.center = latLng(latitude, longitude);
        this.position = latLng(latitude, longitude);
      });
    },
    async getUsers() {
      const response = await api.get("/developers");
      const users = response.data.map((user) => {
        return {
          ...user,
          position: latLng(user.latitude, user.longitude),
        };
      });

      this.users = users;
    },
    goToDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
  },
};
</script>

<style scoped>
.list-content {
  padding: 2rem 0;
}

.list-title {
  text-align: center;
  margin-bottom: 2rem;
}

.map-photo {
  border: 2px solid var(--color-blue);
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  object-fit: cover;
}
</style>
