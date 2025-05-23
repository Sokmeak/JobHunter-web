<template>
  <RouterLink to="/company/1" class="link">
    <div class="company-result-card" @click="$emit('click', company.id)">
      <div
        class="company-result-logo"
        :style="{ backgroundColor: company.logoBg || '#f3f4f6' }"
      >
        <img :src="company.logo" :alt="company.name + ' logo'" />
      </div>
      <h3 class="company-result-name">{{ company.name }}</h3>
      <div class="company-result-jobs">{{ company.jobCount }} Jobs</div>
    </div>
  </RouterLink>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  company: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value.id !== undefined &&
        value.name &&
        value.logo &&
        value.jobCount !== undefined
      );
    },
  },
});

defineEmits(["click"]);
</script>

<style scoped>
.link {
  text-decoration: none;
}
.company-result-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: white;
}

.company-result-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.company-result-logo {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  overflow: hidden;
}

.company-result-logo img {
  width: 60%;
  height: 60%;
  object-fit: contain;
}

.company-result-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.company-result-jobs {
  font-size: 0.875rem;
  color: #4f46e5;
  font-weight: 500;
}
</style>
