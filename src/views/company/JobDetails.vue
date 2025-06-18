<template>
  <div class="job-details" v-if="job">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <button class="btn btn-outline-secondary me-3" @click="goBack">
          <i class="bi bi-arrow-left"></i>
        </button>
        <div>
          <h2 class="fw-bold mb-0">{{ job.title }}</h2>
          <p class="text-muted mb-0">{{ job.department }} • {{ job.type }}</p>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="editJob(job.id)">
          <i class="bi bi-pencil me-1"></i>
          Edit Job
        </button>
        <button class="btn btn-outline-danger" @click="deleteJob(job.id)">
          <i class="bi bi-trash me-1"></i>
          Delete Job
        </button>
      </div>
    </div>

    <div class="row">
      <!-- Main Content -->
      <div class="col-lg-8">
        <JobDetailsPage :job="job" />
      </div>

      <!-- Sidebar -->
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body">
            <h6 class="fw-bold mb-3">Job Statistics</h6>
            <div class="row text-center">
              <div class="col-6 mb-3">
                <h3 class="fw-bold text-primary mb-1">{{ job.applicants }}</h3>
                <small class="text-muted">Applicants</small>
              </div>
              <div class="col-6 mb-3">
                <h3 class="fw-bold text-success mb-1">
                  {{ job.views || 2342 }}
                </h3>
                <small class="text-muted">Views</small>
              </div>
              <div class="col-6">
                <h3 class="fw-bold text-warning mb-1">{{ job.capacity }}</h3>
                <small class="text-muted">Capacity</small>
              </div>
              <div class="col-6">
                <h3 class="fw-bold text-info mb-1">
                  {{ Math.round((job.applicants / job.capacity) * 100) }}%
                </h3>
                <small class="text-muted">Fill Rate</small>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header bg-white border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="mb-0 fw-bold">Recent Applicants</h6>
              <router-link
                to="/company/applicants"
                class="text-primary text-decoration-none small"
              >
                View All
              </router-link>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div
                class="list-group-item border-0 py-3"
                v-for="applicant in store.recentApplicants"
                :key="applicant.id"
              >
                <div class="d-flex align-items-center">
                  <img
                    :src="applicant.avatar"
                    class="rounded-circle me-3"
                    width="40"
                    height="40"
                    :alt="applicant.name"
                  />
                  <div class="flex-grow-1">
                    <h6 class="mb-1 fw-semibold">{{ applicant.name }}</h6>
                    <small class="text-muted"
                      >Applied {{ applicant.appliedDate }}</small
                    >
                  </div>
                  <span :class="getStageClass(applicant.stage)">
                    {{ applicant.stage }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useJobStore } from "@/stores/company/jobStore";
import JobDetailsPage from "@/components/company/jobs/JobDetailsPage.vue";

const route = useRoute();
const router = useRouter();
const store = useJobStore();

const job = ref(null);

onMounted(() => {
  const jobId = parseInt(route.params.id);
  job.value = store.getJobById(jobId);
});

const goBack = () => {
  router.push("/company/jobs");
};

const getStageClass = (stage) => {
  const classes = {
    "In Review": "badge bg-warning",
    Shortlisted: "badge bg-primary",
    Interview: "badge bg-info",
    Hired: "badge bg-success",
  };
  return classes[stage] || "badge bg-secondary";
};

const editJob = (id) => {
  router.push(`/company/jobs/edit/${id}`);
};

const deleteJob = (id) => {
  if (confirm("Are you sure you want to delete this job?")) {
    store.deleteJob(id);
    router.push("/company/jobs");
  }
};
</script>
