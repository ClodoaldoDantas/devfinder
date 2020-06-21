<template>
  <section class="detail">
    <div class="container">
      <!-- NAVBAR -->
      <navbar label="Voltar para a lista 📝" route="/list" />

      <div class="detail-content">
        <card>
          <div class="image-container">
            <img :src="user.image" :alt="user.name" />
          </div>

          <h2>Informações do desenvolvedor(a) 🧑‍💻</h2>
          <ul class="detail-list">
            <li>
              <strong>Nome: </strong>
              {{ user.name }}
            </li>
            <li>
              <strong>Cidade: </strong>
              {{ user.city }}
            </li>
            <li>
              <strong>UF: </strong>
              {{ user.uf }}
            </li>
            <li>
              <strong>E-mail: </strong>
              {{ user.email }}
            </li>
          </ul>

          <div class="detail-actions">
            <button class="btn btn-green" @click="openWhatsapp()">
              Enviar mensagem pelo Whatsapp
            </button>
          </div>
        </card>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import api from "@/services/api";

export default {
  name: "Detail",
  components: {
    Navbar,
    Card,
  },
  async created() {
    const { id } = this.$route.params;
    const response = await api.get(`/developers/${id}`);
    this.user = response.data;
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    openWhatsapp() {
      const url = `https://api.whatsapp.com/send?phone=5585${this.user.whatsapp}`;
      window.open(url);
    },
  },
};
</script>

<style scoped>
.detail-content {
  padding: 2rem 0;
}

.detail-content h2 {
  padding: 2rem 0;
}

.image-container {
  height: 300px;
  width: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-list li {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.detail-actions {
  padding-top: 1rem;
}

.detail-actions button:first-child {
  margin-right: 1rem;
}
</style>
