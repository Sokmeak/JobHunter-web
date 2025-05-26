<template>
  <div class="job-updates mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0">Job Updates</h5>
      <button
        class="btn btn-link text-primary p-0 d-flex align-items-center"
        @click="viewAllJobs"
      >
        View All
        <i class="bi bi-arrow-right ms-1"></i>
      </button>
    </div>

    <div class="row g-4">
      <div class="col-md-6" v-for="job in jobUpdates" :key="job.id">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body p-4">
            <!-- Company Logo and Badge -->
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div
                class="company-logo rounded-3 p-3"
                :style="{ backgroundColor: job.logoColor }"
              >
                <i :class="job.logoIcon" class="text-white fs-4"></i>
              </div>
              <span class="badge bg-success-subtle text-success px-3 py-2">{{
                job.type
              }}</span>
            </div>

            <!-- Job Title -->
            <h6 class="mb-2 fw-bold">{{ job.title }}</h6>

            <!-- Company and Location -->
            <div class="d-flex align-items-center text-muted small mb-3">
              <span>{{ job.company }}</span>
              <span class="mx-2">•</span>
              <span>{{ job.location }}</span>
            </div>

            <!-- Tags -->
            <div class="d-flex flex-wrap gap-2 mb-3">
              <span
                v-for="tag in job.tags"
                :key="tag"
                class="badge px-3 py-2"
                :class="getTagClass(tag)"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Application Progress -->
            <div class="mt-auto">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="small text-muted">{{ job.applied }} applied</span>
                <span class="small text-muted"
                  >of {{ job.capacity }} capacity</span
                >
              </div>
              <div class="progress" style="height: 6px">
                <div
                  class="progress-bar bg-success"
                  :style="{ width: (job.applied / job.capacity) * 100 + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

const navigate = inject("navigate");

const jobUpdates = ref([
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    applied: 5,
    capacity: 10,
    logoColor: "#10b981",
    logoIcon: "bi bi-hash",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    applied: 5,
    capacity: 10,
    logoColor: "#3b82f6",
    logoIcon: "bi bi-dropbox",
    tags: ["Business", "Design"],
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Berlin, Germany",
    type: "Full-Time",
    applied: 5,
    capacity: 10,
    logoColor: "#06b6d4",
    logoIcon: "bi bi-layers",
    tags: ["Marketing", "Design"],
  },
  {
    id: 4,
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    type: "Full-Time",
    applied: 5,
    capacity: 10,
    logoColor: "#8b5cf6",
    logoIcon: "bi bi-circle",
    tags: ["Business", "Design"],
  },
]);

const getTagClass = (tag) => {
  switch (tag.toLowerCase()) {
    case "marketing":
      return "bg-warning-subtle text-warning border border-warning";
    case "design":
      return "bg-primary-subtle text-primary border border-primary";
    case "business":
      return "bg-success-subtle text-success border border-success";
    default:
      return "bg-secondary-subtle text-secondary border border-secondary";
  }
};

const viewAllJobs = () => {
  navigate("job-listing");
};
</script>

<style scoped>
.company-logo {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.progress-bar {
  transition: width 1s ease-in-out;
}
</style>
