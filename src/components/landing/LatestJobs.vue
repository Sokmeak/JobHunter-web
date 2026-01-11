<template>
  <section class="latest-jobs py-5 bg-light">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">
          Latest <span class="cyan-accent-color">jobs open</span>
        </h2>
        <RouterLink to="/jobs" class="text-decoration-none primary-color">
          Show all jobs <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>

      <!-- Loading state with skeletons -->
      <template v-if="isLoading">
        <div class="row g-4">loading</div>
      </template>

      <template v-else>
        <div v-if="error" class="error text-center">
          {{ error }}
        </div>
        <div v-else-if="!displayedJobs.length" class="no-jobs text-center">
          No recent jobs available.
        </div>

        <div v-else class="row g-4">
          <div class="col-md-6" v-for="job in displayedJobs" :key="job.id">
            <div class="card border-0 shadow-sm" @click="selectJob(job.id)">
              <div class="card-body p-4">
                <div class="d-flex">
                  <div class="company-logo me-3">
                    <img
                      :src="job.companyLogo"
                      :alt="job.company"
                      class="rounded"
                      width="50"
                      height="50"
                      loading="lazy"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="card-title mb-1">{{ job.title }}</h5>
                    <p class="text-muted small mb-2">
                      {{ job.companyName }} • {{ job.location }}
                    </p>

                    <div class="d-flex flex-wrap gap-2 mb-3">
                      <span
                        v-for="(tag, tagIndex) in job.tags.slice(0, 3)"
                        :key="tagIndex"
                        class="badge bg-light text-dark"
                      >
                        {{ tag }}
                      </span>
                    </div>

                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <span class="badge bg-light text-dark me-2">
                          {{ job.type }}
                        </span>
                        <span class="text-muted small">
                          {{
                            job.postedAgo || calculatePostedAgo(job.postedDate)
                          }}
                        </span>
                      </div>
                      <RouterLink
                        :to="`/jobs/${job.id}`"
                        class="btn btn-md btn-outline-primary applyButton"
                        @click.stop
                      >
                        Apply
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useJobStore } from "@/stores/jobStore";
import { computed, onMounted } from "vue";

const jobStore = useJobStore();

// Computed properties
const latestJobs = computed(() => jobStore.latestJobs);
const isLoading = computed(() => jobStore.isLoading);
const error = computed(() => jobStore.error);

// Only display first 8 jobs for better performance
const displayedJobs = computed(() => latestJobs.value.slice(0, 8));

// Fetch jobs on mount if not already loaded
onMounted(() => {
  if (!jobStore.jobs.length) {
    jobStore.fetchLatestJobs();
  }
});

const calculatePostedAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${diffDays > 7 ? "s" : ""} ago`;
  return date.toLocaleDateString();
};

const selectJob = (id) => {
  // Optional: Handle job selection
  console.log("Selected job:", id);
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *;

.cyan-accent-color {
  color: var(--cyan-accent-color);
}

.primary-color {
  color: var(--primary-color);
}

.btn-outline-primary {
  border-color: var(--primary-color);
  color: var(--primary-color);

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
    cursor: pointer;
  }
}

.company-logo img {
  object-fit: contain;
  background: white;
  padding: 2px;
  border: 1px solid #eee;
}

.error {
  color: #d32f2f;
  padding: 20px;
  font-size: 1.2rem;
}

.no-jobs {
  padding: 20px;
  font-size: 1.2rem;
  color: #666;
}
</style>
