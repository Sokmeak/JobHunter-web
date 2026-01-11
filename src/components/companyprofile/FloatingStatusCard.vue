<template>
  <div
    class="floating-stats-card"
    :class="{ show: isVisible }"
    :aria-hidden="!isVisible"
    aria-label="Company statistics"
    role="region"
  >
    <div class="container">
      <div class="row align-items-center">
        <div class="col-auto d-flex align-items-center">
          <div class="company-logo me-3">
            <span class="fw-bold text-white">{{ company.logoInitial }}</span>
          </div>
          <h5 class="mb-0 company-name">{{ company.name }}</h5>
        </div>
        <div class="col-auto ms-auto stats-container">
          <div class="d-flex flex-wrap align-items-center">
            <div class="stat-item me-4">
              <div class="d-flex align-items-center">
                <i
                  class="bi bi-briefcase me-2"
                  :style="{ color: 'var(--cyan-accent-color)' }"
                ></i>
                <div>
                  <small class="d-block text-muted">Open Positions</small>
                  <span class="fw-semibold">{{ company.jobs }}</span>
                </div>
              </div>
            </div>
            <div class="stat-item me-4">
              <div class="d-flex align-items-center">
                <i
                  class="bi bi-people me-2"
                  :style="{ color: 'var(--green-accent-color)' }"
                ></i>
                <div>
                  <small class="d-block text-muted">Employees</small>
                  <span class="fw-semibold">{{ company.employees }}</span>
                </div>
              </div>
            </div>
            <div class="stat-item">
              <div class="d-flex align-items-center">
                <i
                  class="bi bi-geo-alt me-2"
                  :style="{ color: 'var(--purple-accent-color)' }"
                ></i>
                <div>
                  <small class="d-block text-muted">Locations</small>
                  <span class="fw-semibold">{{ company.locations }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto ms-md-3">
          <RouterLink
            :to="jobRoute"
            class="btn btn-apply"
            :style="{
              backgroundColor: 'var(--bg-primary-color)',
              borderColor: 'var(--bg-primary-color)',
            }"
          >
            Apply Now
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { throttle } from "lodash"; // Optional: Use lodash for throttling

const props = defineProps({
  company: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      name: "Unknown Company",
      logoInitial: "?",
      jobs: 0,
      employees: "0+",
      locations: "Unknown",
    }),
    validator: (company) => {
      return (
        typeof company.id === "number" &&
        typeof company.name === "string" &&
        typeof company.logoInitial === "string" &&
        (typeof company.jobs === "number" ||
          typeof company.jobs === "string") &&
        typeof company.employees === "string" &&
        typeof company.locations === "string"
      );
    },
  },
});

// Compute the RouterLink destination
const jobRoute = computed(() => {
  // Assuming the route requires a company id (e.g., /jobDes/:companyId)
  return props.company.id
    ? { name: "JobDescription", params: { companyId: company.id } }
    : { path: "/jobs" }; // Fallback route if id is missing
});

const isVisible = ref(false);
const scrollThreshold = 300; // Show after scrolling 300px

// Throttle scroll handler for performance
const handleScroll = throttle(() => {
  isVisible.value = window.scrollY > scrollThreshold;
}, 100);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  handleScroll.cancel(); // Clean up throttle
});
</script>

<style scoped>
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

.floating-stats-card {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  z-index: 1050; /* Increased to avoid overlap */
  transform: translateY(-100%);
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
  opacity: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  min-height: 72px; /* Prevent content jump */
}

.floating-stats-card.show {
  transform: translateY(0);
  opacity: 1;
}

.company-logo {
  width: 36px;
  height: 36px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--purple-accent-color) 100%
  );
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
}

.company-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--neutral-color);
  letter-spacing: -0.02em;
}

.stats-container {
  display: flex;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.stat-item i {
  font-size: 1.25rem;
}

.stat-item small {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.2;
}

.stat-item span {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-color);
}

.btn-apply {
  background-color: var(--bg-primary-color);
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--bg-primary-color);
  transition: background-color 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-apply:hover {
  background-color: var(--purple-accent-color);
  border-color: var(--purple-accent-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.btn-apply:active {
  transform: translateY(0);
  box-shadow: none;
}

@media (max-width: 767.98px) {
  .floating-stats-card {
    padding: 12px 0;
    min-height: 150px; /* Adjust for stacked layout */
  }

  .floating-stats-card .row {
    flex-direction: column;
    align-items: flex-start;
  }

  .floating-stats-card .col-auto {
    width: 100%;
    margin-bottom: 12px;
  }

  .stats-container {
    width: 100%;
  }

  .stat-item {
    flex: 1;
    margin-right: 16px;
    margin-bottom: 8px;
  }

  .stat-item:last-child {
    margin-right: 0;
  }

  .btn-apply {
    width: 100%;
    padding: 10px;
    text-align: center;
  }
}

@media (min-width: 768px) {
  .floating-stats-card {
    padding: 20px 0;
  }

  .company-logo {
    width: 40px;
    height: 40px;
  }

  .company-name {
    font-size: 1.25rem;
  }
}
</style>
