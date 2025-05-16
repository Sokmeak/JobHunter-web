<template>
  <div class="job-card bg-white rounded-3 p-4 shadow-sm h-100">
    <div class="d-flex justify-content-between mb-3">
      <div
        class="company-logo-sm rounded-3 d-flex align-items-center justify-content-center"
        :class="job.logoColor || 'bg-secondary text-primary'"
      >
        <span v-if="!job.companyLogoUrl" class="fw-bold">{{
          job.companyLogo || job.company.charAt(0)
        }}</span>
        <img
          v-else
          :src="job.companyLogoUrl"
          :alt="`${job.company} logo`"
          class="img-fluid rounded-3"
          width="40"
          height="40"
        />
      </div>
      <div class="job-bookmark">
        <button class="btn btn-sm btn-light rounded-circle">
          <i class="bi bi-bookmark"></i>
        </button>
      </div>
    </div>

    <h3 class="job-title fs-5 fw-bold mb-1">{{ job.title }}</h3>
    <p class="job-company text-muted mb-3">{{ job.company }}</p>

    <div class="job-meta d-flex flex-column gap-2 mb-3">
      <div class="d-flex align-items-center text-muted">
        <i class="bi bi-geo-alt me-2"></i>
        <span>{{ job.location }}</span>
      </div>
      <div class="d-flex align-items-center text-muted">
        <i class="bi bi-briefcase me-2"></i>
        <span>{{ job.type }}</span>
      </div>
    </div>

    <div class="job-categories d-flex flex-wrap gap-2 mb-3">
      <span
        v-for="(category, index) in job.categories"
        :key="index"
        class="badge rounded-pill px-2 py-1"
        :class="getCategoryClass(index)"
      >
        {{ category }}
      </span>
    </div>

    <div
      class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top"
    >
      <button class="btn btn-sm btn-outline-primary rounded-pill">
        Apply Now
      </button>
      <span class="text-muted small">2 days ago</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  job: {
    type: Object,
    required: true,
    default: () => ({
      title: "Job Title",
      company: "Company Name",
      location: "Location",
      type: "Full-Time",
      categories: ["Category"],
      companyLogo: "C",
      logoColor: "bg-primary-subtle text-primary",
    }),
  },
});

const getCategoryClass = (index) => {
  const classes = [
    "bg-primary-subtle text-primary",
    "bg-warning-subtle text-warning",
    "bg-success-subtle text-success",
    "bg-danger-subtle text-danger",
    "bg-info-subtle text-info",
  ];

  return classes[index % classes.length];
};
</script>

<style scoped>
.job-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05) !important;
}

.company-logo-sm {
  width: 40px;
  height: 40px;
}

.job-bookmark .btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.job-title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
