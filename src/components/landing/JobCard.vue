<template>
  <div
    class="job-card card h-100 border-0 shadow-sm position-relative overflow-hidden"
  >
    <div class="card-body p-4">
      <!-- Company Info Header -->
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div class="d-flex align-items-center">
          <div class="company-logo me-3">
            <img
              :src="job.companyLogo"
              :alt="job.company"
              class="rounded-2 border"
              width="48"
              height="48"
              loading="lazy"
            />
          </div>
          <div>
            <h5 class="card-title mb-1 fw-semibold text-dark">
              {{ job.title }}
            </h5>
            <p class="text-muted small mb-0">{{ job.companyName }}</p>
          </div>
        </div>

        <!-- Save Button - Only visible on hover -->
        <button
          @click="toggleBookmark"
          class="btn btn-sm btn-link save-btn p-2 rounded-2"
          :class="{ bookmarked: bookmarked }"
        >
          <i
            :class="bookmarked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"
            class="fs-5"
          ></i>
        </button>
      </div>

      <!-- Job Details -->
      <div class="mb-3">
        <div class="d-flex align-items-center gap-3 mb-2">
          <small class="text-muted d-flex align-items-center">
            <i class="bi bi-geo-alt me-1"></i>
            {{ job.location }}
          </small>
          <span
            class="badge bg-primary bg-opacity-10 text-primary rounded-pill"
          >
            {{ job.type }}
          </span>
        </div>

        <p class="card-text small text-muted mb-0 job-description">
          {{ job.description }}
        </p>
      </div>

      <!-- Skills Tags -->
      <div class="d-flex flex-wrap gap-2 mb-4">
        <span
          v-for="(tag, tagIndex) in job.tags?.slice(0, 4)"
          :key="tagIndex"
          class="badge bg-light text-dark rounded-pill skill-tag"
        >
          {{ tag }}
        </span>
        <span
          v-if="job.tags?.length > 4"
          class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill"
        >
          +{{ job.tags.length - 4 }} more
        </span>
      </div>

      <!-- Action Section -->
      <div class="d-flex justify-content-between align-items-center">
        <RouterLink
          :to="{ name: 'JobDescription', params: { id: jobId(job) } }"
          class="btn btn-md btn-outline-primary applyButton"
        >
          Apply Now
        </RouterLink>

        <!-- Salary Info (if available) -->
        <div v-if="job.salary" class="text-end">
          <div class="fw-semibold text-dark small">{{ job.salary }}</div>
        </div>
      </div>
    </div>

    <!-- Hover Gradient Overlay -->
    <div
      class="hover-overlay position-absolute top-0 start-0 w-100 h-100 rounded-3"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

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
/* CSS Variables */
:root {
  --primary-color: #4640de;
  --bg-primary-color: #4640de;
  --secondary-color: #ccccf5;
  --tertiary-color: #e7f6fd;
  --cyan-accent-color: #26a4ff;
  --red-accent-color: #ff6550;
  --green-accent-color: #56cdad;
  --purple-accent-color: #7b61ff;
  --yellow-accent-color: #ffb836;
  --neutral-color: #25324b;
}

/* Primary Color Utility */
.primary-color {
  color: var(--primary-color);
}

/* Card Hover Effects */
.job-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1rem !important;
  cursor: pointer;
}

.job-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  border-color: rgba(var(--bs-primary-rgb), 0.2) !important;
}

/* Save Button - Hidden by default, visible on hover */
.save-btn {
  opacity: 0;
  transition: all 0.2s ease-in-out;
  color: #6c757d;
  border: none !important;
  background: transparent;
}

.job-card:hover .save-btn {
  opacity: 1;
}

.save-btn:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
  color: var(--bs-primary) !important;
  transform: scale(1.1);
}

.save-btn.bookmarked {
  opacity: 1;
  color: var(--bs-primary) !important;
  background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
}

/* Company Logo */
.company-logo img {
  border: 1px solid rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

/* Job Description Truncation */
.job-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  height: calc(1.4em * 2);
}

/* Skill Tags */
.skill-tag {
  transition: all 0.2s ease;
  font-size: 0.75rem;
  font-weight: 500;
}

.skill-tag:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
  color: var(--bs-primary) !important;
  transform: translateY(-1px);
}

/* Custom Button Styling */
.btn-outline-primary {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transition: all 0.2s ease;
  font-weight: 500;
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(70, 64, 222, 0.3);
}

.applyButton {
  border-radius: 0.375rem;
  padding: 0.5rem 1.5rem;
}

/* Hover Gradient Overlay */
.hover-overlay {
  background: linear-gradient(
    135deg,
    rgba(var(--bs-primary-rgb), 0.02) 0%,
    rgba(var(--bs-info-rgb), 0.02) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.job-card:hover .hover-overlay {
  opacity: 1;
}

/* Ensure content is above overlay */
.card-body {
  position: relative;
  z-index: 2;
}

/* Custom gap utility for older Bootstrap versions */
.gap-2 > * + * {
  margin-left: 0.5rem;
}

.gap-3 > * + * {
  margin-left: 1rem;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .job-card {
    margin-bottom: 1rem;
  }

  .apply-btn {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  .company-logo img {
    width: 40px;
    height: 40px;
  }
}

/* Dark mode support (if using Bootstrap dark mode) */
[data-bs-theme="dark"] .job-card {
  background-color: var(--bs-dark);
  border-color: var(--bs-border-color);
}

[data-bs-theme="dark"] .job-card:hover {
  border-color: rgba(var(--bs-primary-rgb), 0.3);
}

[data-bs-theme="dark"] .company-logo img {
  border-color: var(--bs-border-color);
}
</style>
