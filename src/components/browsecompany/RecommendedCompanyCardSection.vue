<template>
  <section class="recommended-companies">
    <h2 class="section-title">Recommended Companies</h2>
    <p class="section-subtitle">
      Based on your profile, company preferences, and recent activity
    </p>

    <div class="companies-grid">
      <RecommendedCompanyCard
        v-for="company in displayedCompanies"
        :context="context"
        :key="company.id"
        :company="company"
      />
    </div>
  </section>
</template>

<script setup>
import RecommendedCompanyCard from "./RecommendedCompanyCard.vue";
import { computed, onMounted } from "vue";
import { useCompanyStore } from "@/stores/companyStore";

const props = defineProps({
  context: String,
});

const companyStore = useCompanyStore();

// Compute the first 8 companies to display
const displayedCompanies = computed(() => {
  return (companyStore.companies || []).slice(10, 16);
});
// Fetch companies when the component is mounted
onMounted(async () => {
  try {
    await companyStore.fetchCompanies();
  } catch (error) {
    console.error("Failed to fetch companies:", error);
  }
});
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
