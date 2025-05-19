<!-- components/JobCard.vue -->
<template>
  <div class="card h-100 border-0 shadow-sm">
    <div class="card-body p-4">
      <div class="d-flex align-items-center mb-3">
        <img
          :src="job.companyLogo || 'https://via.placeholder.com/40'"
          :alt="job.company"
          class="rounded me-3"
          width="40"
          height="40"
          loading="lazy"
        />
        <span class="badge bg-light text-dark">{{ job.type }}</span>
      </div>

      <h5 class="card-title mb-1">{{ job.title }}</h5>
      <p class="text-muted small mb-3">
        {{ job.company }} • {{ job.location }}
      </p>
      <p class="card-text small text-muted mb-3">{{ job.description }}</p>

      <div class="d-flex flex-wrap gap-2 mb-3">
        <span
          v-for="(tag, tagIndex) in job.tags"
          :key="tagIndex"
          class="badge bg-light text-dark"
          >{{ tag }}</span
        >
      </div>

      <div class="d-flex justify-content-between">
        <RouterLink
          :to="{ name: 'JobDescription', params: { id: jobId(job) } }"
          class="btn btn-outline-primary"
          >Apply</RouterLink
        >
        <button class="btn btn-link text-muted" @click="toggleBookmark">
          <i :class="bookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { computed } from "vue";

// Props definition
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});
const jobId = (job) =>
  computed(() => {
    return typeof job.id === "number" ? job.id : job.job_id;
  }).value;
// Reactive state
const bookmarked = ref(false);

// Methods
const toggleBookmark = () => {
  bookmarked.value = !bookmarked.value;
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.bi {
  color: #4640de;
}

.btn-outline-primary {
  border-color: #4640de;
  color: #4640de;
}

.btn-outline-primary:hover {
  background-color: #4640de;
  color: white;
}
</style>
