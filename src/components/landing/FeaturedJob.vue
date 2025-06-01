<template>
  <div v-if="jobStore" class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Featured <span class="cyan-accent-color">jobs</span></h2>
      <RouterLink to="/jobs" class="text-decoration-none primary-color">
        Show all jobs <i class="bi bi-arrow-right"></i>
      </RouterLink>
    </div>

    <!-- Simplified loading state -->
    <template v-if="isLoading">
      <div class="row g-4">
        <loading class="">loading</loading>
      </div>
    </template>

    <template v-else>
      <div v-if="error" class="error text-center">
        {{ error }}
      </div>
      <div v-else-if="!highDemandJobs.length" class="no-jobs text-center">
        No featured jobs available.
      </div>
      <div v-else class="row g-4">
        <div
          class="col-md-6 col-lg-3"
          v-for="job in displayedJobs"
          :key="job.id"
        >
          <JobCard :job="job" />
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import JobCard from "./JobCard.vue";
import { useJobStore } from "@/stores/jobStore";
import { computed, onMounted, ref } from "vue";

const jobStore = ref(null);
// Computed properties for better reactivity
const highDemandJobs = computed(() => jobStore.highDemandJobs);
const latestJobs = computed(() => jobStore.latestJobs);
const isLoading = computed(() => jobStore.isLoading);
const error = computed(() => jobStore.error);

// Combine high-demand and latest jobs, ensuring uniqueness
const displayedJobs = computed(() => {
  const combined = [
    ...highDemandJobs.value.slice(0, 8), // Limit to 8 high-demand jobs // Limit to 4 latest jobs
  ];
  // Remove duplicates by job ID
  const uniqueJobs = Array.from(
    new Map(combined.map((job) => [job.id, job])).values()
  );
  return uniqueJobs.slice(0, 8); // Limit to 8 total jobs
});

// Fetch both job types on component mount
onMounted(() => {
  jobStore.value = useJobStore();

  if (!jobStore.jobs.length) {
    Promise.all([
      jobStore.fetchHighDemandHighSalaryJobs(),
      // jobStore.fetchLatestJobs(),
    ]);
  }
  console.log("High demand jobs:", highDemandJobs.value);
  console.log("Latest jobs:", latestJobs.value);
});
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *;

.cyan-accent-color {
  color: var(--cyan-accent-color);
}

.primary-color {
  color: var(--primary-color);
}

.loading,
.error,
.no-jobs {
  padding: 20px;
  font-size: 1.2rem;
}

.error {
  color: #d32f2f;
}

.job-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
}
</style>
