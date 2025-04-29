<template>
  <section class="recommended-companies">
    <h2 class="section-title">Recommended Companies</h2>
    <p class="section-subtitle">
      Based on your profile, company preferences, and recent activity
    </p>

    <div class="companies-grid">
      <RecommendedCompanyCard
        v-for="company in recommendedCompanies"
        :key="company.id"
        :company="company"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import RecommendedCompanyCard from "./RecommendedCompanyCard.vue";

const recommendedCompanies = ref([
  {
    id: 1,
    name: "Nomad",
    logo: "https://logo.clearbit.com/nomadproject.io",
    logoBg: "#e7f5f0",
    jobCount: 3,
    description:
      "Nomad is located in Paris, France. Nomad has generated $128,000 in sales (USD).",
    tags: ["Business Service"],
  },
  {
    id: 2,
    name: "Discord",
    logo: "https://logo.clearbit.com/discord.com",
    logoBg: "#5865f2",
    jobCount: 3,
    description:
      "We'd love to work with someone like you. We care about creating a delightful experience.",
    tags: ["Business Service"],
  },
  {
    id: 3,
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    logoBg: "#4285f4",
    jobCount: 5,
    description:
      "Google is based in Mountain View, California. It generates over $200 billion in revenue annually.",
    tags: ["Tech", "Search Engine"],
  },
  {
    id: 4,
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    logoBg: "#f1f1f1",
    jobCount: 10,
    description:
      "Apple is a leading technology company known for its innovation in consumer electronics and software.",
    tags: ["Tech", "Consumer Electronics"],
  },
  {
    id: 5,
    name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
    logoBg: "#1db954",
    jobCount: 7,
    description:
      "Spotify is a popular streaming service offering a vast library of music and podcasts.",
    tags: ["Music", "Streaming"],
  },
  {
    id: 6,
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    logoBg: "#e82127",
    jobCount: 4,
    description:
      "Tesla, Inc. is an electric vehicle and clean energy company based in Palo Alto, California.",
    tags: ["Tech", "Electric Vehicles"],
  },
]);
</script>

<style scoped>
.recommended-companies {
  margin: 3rem 0;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.companies-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .companies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .companies-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
