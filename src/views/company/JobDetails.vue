<template>
  <div class="job-details-view">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading job details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger">
      <h5>Error Loading Job</h5>
      <p>{{ error }}</p>
      <button @click="loadJob" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Job Details Content -->
    <div v-else-if="job" class="job-content">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center">
          <button class="btn btn-outline-secondary me-3" @click="goBack">
            <i class="bi bi-arrow-left"></i>
          </button>
          <div>
            <h2 class="fw-bold mb-0">{{ job.title }}</h2>
            <p class="text-muted mb-0">
              {{ job.level || "No Level" }} • {{ job.job_type || "Full-Time" }}
              <span v-if="job.location"> • {{ job.location }}</span>
            </p>
          </div>
        </div>
        <div class="d-flex gap-2">
          <router-link
            :to="`/company/jobs/edit/${job.id}`"
            class="btn btn-outline-secondary"
          >
            <i class="bi bi-pencil me-1"></i>
            Edit Job
          </router-link>
          <button
            class="btn"
            :class="
              job.is_visible ? 'btn-outline-warning' : 'btn-outline-success'
            "
            @click="toggleJobStatus"
            :disabled="statusLoading"
          >
            <span
              v-if="statusLoading"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            <i
              v-else
              :class="job.is_visible ? 'bi bi-pause me-1' : 'bi bi-play me-1'"
            ></i>
            {{ job.is_visible ? "Pause Job" : "Activate Job" }}
          </button>
          <button
            class="btn btn-outline-danger"
            @click="deleteJob"
            :disabled="deleteLoading"
          >
            <span
              v-if="deleteLoading"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            <i v-else class="bi bi-trash me-1"></i>
            Delete Job
          </button>
        </div>
      </div>

      <div class="row">
        <!-- Main Content -->
        <div class="col-lg-8">
          <!-- Job Status Badge -->
          <div class="mb-4">
            <span
              :class="[
                'badge',
                'px-3',
                'py-2',
                'fs-6',
                getStatusClass(job.is_visible),
              ]"
            >
              {{ job.is_visible ? "Active" : "Draft" }}
            </span>
            <span
              v-if="job.expired_date"
              class="badge bg-info ms-2 px-3 py-2 fs-6"
            >
              Expires: {{ formatDate(job.expired_date) }}
            </span>
          </div>

          <!-- Job Overview Card -->
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="fw-bold mb-3">Job Overview</h5>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <h6 class="fw-bold text-muted small">SALARY</h6>
                  <p class="mb-0">{{ job.salary_range || "Competitive" }}</p>
                </div>
                <div class="col-md-6 mb-3">
                  <h6 class="fw-bold text-muted small">POSTED DATE</h6>
                  <p class="mb-0">{{ formatDate(job.posted_at) }}</p>
                </div>
                <div class="col-md-6 mb-3">
                  <h6 class="fw-bold text-muted small">DEADLINE</h6>
                  <p class="mb-0">
                    {{
                      job.expired_date
                        ? formatDate(job.expired_date)
                        : "No deadline"
                    }}
                  </p>
                </div>
                <div class="col-md-6 mb-3">
                  <h6 class="fw-bold text-muted small">CAPACITY</h6>
                  <p class="mb-0">
                    {{ job.capacity || "Not specified" }} positions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Description -->
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="fw-bold mb-3">Job Description</h5>
              <p class="text-muted">
                {{ job.description || "No description provided." }}
              </p>
            </div>
          </div>

          <!-- Responsibilities -->
          <div
            v-if="job.responsibility && job.responsibility.length > 0"
            class="card mb-4"
          >
            <div class="card-body">
              <h5 class="fw-bold mb-3">Key Responsibilities</h5>
              <ul class="list-unstyled">
                <li
                  v-for="(responsibility, index) in job.responsibility"
                  :key="index"
                  class="mb-2"
                >
                  <i class="bi bi-check-circle text-success me-2"></i>
                  {{ responsibility }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Requirements -->
          <div
            v-if="job.who_you_are && job.who_you_are.length > 0"
            class="card mb-4"
          >
            <div class="card-body">
              <h5 class="fw-bold mb-3">Who You Are</h5>
              <ul class="list-unstyled">
                <li
                  v-for="(requirement, index) in job.who_you_are"
                  :key="index"
                  class="mb-2"
                >
                  <i class="bi bi-dot text-primary me-2"></i>
                  {{ requirement }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Nice to Haves -->
          <div
            v-if="job.nice_to_haves && job.nice_to_haves.length > 0"
            class="card mb-4"
          >
            <div class="card-body">
              <h5 class="fw-bold mb-3">Nice to Haves</h5>
              <ul class="list-unstyled">
                <li
                  v-for="(niceToHave, index) in job.nice_to_haves"
                  :key="index"
                  class="mb-2"
                >
                  <i class="bi bi-plus-circle text-info me-2"></i>
                  {{ niceToHave }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Skills & Tags -->
          <div v-if="job.tags && job.tags.length > 0" class="card mb-4">
            <div class="card-body">
              <h5 class="fw-bold mb-3">Skills & Tags</h5>
              <div class="d-flex flex-wrap gap-2">
                <span
                  v-for="tag in job.tags"
                  :key="tag"
                  class="badge bg-primary-subtle text-primary border border-primary px-3 py-2"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Perks & Benefits -->
          <div
            v-if="
              job.perks_benefits && Object.keys(job.perks_benefits).length > 0
            "
            class="card mb-4"
          >
            <div class="card-body">
              <h5 class="fw-bold mb-3">Perks & Benefits</h5>
              <div class="row">
                <div
                  v-for="(benefit, key) in job.perks_benefits"
                  :key="key"
                  class="col-md-6 mb-2"
                >
                  <div class="d-flex align-items-start">
                    <i
                      class="bi bi-check-circle-fill text-success me-2 mt-1"
                    ></i>
                    <div>
                      <strong>{{ formatBenefitTitle(key) }}</strong>
                      <p class="mb-0 text-muted small">{{ benefit }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Job Statistics -->
          <div class="card mb-4">
            <div class="card-body">
              <h6 class="fw-bold mb-3">Job Statistics</h6>
              <div class="row text-center">
                <div class="col-6 mb-3">
                  <h3 class="fw-bold text-primary mb-1">
                    {{ job.applicant_applied || 0 }}
                  </h3>
                  <small class="text-muted">Applications</small>
                </div>
                <div class="col-6 mb-3">
                  <h3 class="fw-bold text-success mb-1">
                    {{ job.views || 0 }}
                  </h3>
                  <small class="text-muted">Views</small>
                </div>
                <div class="col-6">
                  <h3 class="fw-bold text-warning mb-1">
                    {{ job.capacity || 0 }}
                  </h3>
                  <small class="text-muted">Capacity</small>
                </div>
                <div class="col-6">
                  <h3 class="fw-bold text-info mb-1">
                    {{ calculateFillRate() }}%
                  </h3>
                  <small class="text-muted">Fill Rate</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card mb-4">
            <div class="card-body">
              <h6 class="fw-bold mb-3">Quick Actions</h6>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" @click="viewApplications">
                  <i class="bi bi-people me-2"></i>
                  View Applications ({{ job.applicant_applied || 0 }})
                </button>
                <router-link
                  :to="`/company/jobs/edit/${job.id}`"
                  class="btn btn-outline-secondary"
                >
                  <i class="bi bi-pencil me-2"></i>Edit Job
                </router-link>
                <router-link
                  :to="`/company/jobs/duplicate/${job.id}`"
                  class="btn btn-outline-info"
                >
                  <i class="bi bi-files me-2"></i>Duplicate Job
                </router-link>
              </div>
            </div>
          </div>

          <!-- Recent Applications -->
          <div v-if="applications.length > 0" class="card">
            <div class="card-header bg-white border-bottom">
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-0 fw-bold">Recent Applications</h6>
                <button
                  @click="viewApplications"
                  class="btn btn-sm btn-link text-primary p-0"
                >
                  View All
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="list-group list-group-flush">
                <div
                  class="list-group-item border-0 py-3"
                  v-for="application in applications.slice(0, 5)"
                  :key="application.id"
                >
                  <div class="d-flex align-items-center">
                    <div class="avatar-placeholder me-3">
                      {{ getInitials(application.user?.name || "Unknown") }}
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1 fw-semibold">
                        {{ application.user?.name || "Unknown" }}
                      </h6>
                      <small class="text-muted">
                        Applied {{ formatDate(application.applied_at) }}
                      </small>
                    </div>
                    <span
                      :class="getApplicationStatusClass(application.status)"
                    >
                      {{ application.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Applications State -->
          <div v-else class="card">
            <div class="card-body text-center py-4">
              <i class="bi bi-people fs-1 text-muted mb-3"></i>
              <h6 class="text-muted">No Applications Yet</h6>
              <p class="text-muted small mb-0">
                Applications will appear here once candidates start applying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Not Found -->
    <div v-else class="text-center py-5">
      <i class="bi bi-briefcase fs-1 text-muted mb-3"></i>
      <h4 class="text-muted">Job Not Found</h4>
      <p class="text-muted">
        The job you're looking for doesn't exist or has been removed.
      </p>
      <router-link to="/company/job-listing" class="btn btn-primary">
        Back to Jobs
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Props (from router)
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

// State
const job = ref(null);
const applications = ref([]);
const loading = ref(false);
const error = ref(null);
const statusLoading = ref(false);
const deleteLoading = ref(false);

// Computed
const jobId = computed(() => parseInt(props.id));

// Handle errors locally
const handleError = (error) => {
  let message = "An unexpected error occurred";

  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        message = data.message || "Invalid request data";
        break;
      case 401:
        message = "Authentication required. Please log in again.";
        break;
      case 403:
        message = "You do not have permission to perform this action";
        break;
      case 404:
        message = "Job not found";
        break;
      case 500:
        message = "Server error. Please try again later.";
        break;
      default:
        message = data.message || "Unexpected error occurred";
    }
  } else if (error.request) {
    message = "Network error. Please check your connection.";
  } else if (error.message) {
    message = error.message;
  }

  console.error("Error:", message, error);
  return message;
};

// API calls (you can replace these with your actual API service)
const loadJob = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Replace with your actual API call
    const token = localStorage.getItem("auth_token");
    const response = await fetch(
      `http://localhost:3000/companies/jobs/${jobId.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    job.value = data;

    // Load applications for this job
    await loadApplications();
  } catch (err) {
    console.error("Error loading job:", err);
    error.value = handleError(err);
  } finally {
    loading.value = false;
  }
};

const loadApplications = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(
      `http://localhost:3000/companies/jobs/${jobId.value}/applications?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      applications.value = data.applications || [];
    }
  } catch (err) {
    console.warn("Failed to load applications:", err);
    // Don't show error for applications, just continue
  }
};

const goBack = () => {
  router.push("/company/job-listing");
};

const viewApplications = () => {
  router.push("/company/all-applicants");
};

const toggleJobStatus = async () => {
  if (!job.value) return;

  statusLoading.value = true;
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(
      `http://localhost:3000/companies/jobs/${job.value.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_visible: !job.value.is_visible }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update job status");
    }

    job.value.is_visible = !job.value.is_visible;
  } catch (err) {
    console.error("Error updating job status:", err);
    alert("Failed to update job status");
  } finally {
    statusLoading.value = false;
  }
};

const deleteJob = async () => {
  if (
    !confirm(
      "Are you sure you want to delete this job? This action cannot be undone."
    )
  ) {
    return;
  }

  deleteLoading.value = true;
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(
      `http://localhost:3000/companies/jobs/${job.value.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete job");
    }

    router.push("/company/job-listing");
  } catch (err) {
    console.error("Error deleting job:", err);
    alert("Failed to delete job");
  } finally {
    deleteLoading.value = false;
  }
};

// Utility methods
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClass = (isVisible) => {
  return isVisible ? "bg-success" : "bg-warning";
};

const getApplicationStatusClass = (status) => {
  const classes = {
    pending: "badge bg-warning",
    reviewing: "badge bg-info",
    shortlisted: "badge bg-primary",
    interview: "badge bg-info",
    hired: "badge bg-success",
    rejected: "badge bg-danger",
  };
  return classes[status] || "badge bg-secondary";
};

const formatBenefitTitle = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const calculateFillRate = () => {
  if (!job.value || !job.value.capacity || job.value.capacity === 0) return 0;
  return Math.round((job.value.applicant_applied / job.value.capacity) * 100);
};

// Lifecycle
onMounted(() => {
  if (jobId.value) {
    loadJob();
  } else {
    error.value = "Invalid job ID";
  }
});
</script>

<style scoped>
.avatar-placeholder {
  width: 40px;
  height: 40px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.badge {
  font-weight: 500;
}

.btn {
  border-radius: 8px;
  font-weight: 500;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-outline-warning:hover {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #000;
}

.btn-outline-success:hover {
  background-color: #198754;
  border-color: #198754;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-outline-info:hover {
  background-color: #0dcaf0;
  border-color: #0dcaf0;
  color: #000;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }

  .d-flex.gap-2 {
    justify-content: center;
  }
}
</style>
