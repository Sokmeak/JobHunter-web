<template>
  <div class="job-listing">
    <!-- Header with Actions -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-1 fw-bold">Job Listings</h2>
        <p class="text-muted mb-0">
          Manage your posted jobs and track performance
        </p>
      </div>
      <div class="d-flex gap-3">
        <router-link to="/company/post-job" class="btn btn-primary">
          <i class="bi bi-plus-circle me-2"></i>Post New Job
        </router-link>
        <button
          @click="refreshJobs"
          class="btn btn-outline-secondary"
          :disabled="loading"
        >
          <i class="bi bi-arrow-clockwise me-2"></i>
          {{ loading ? "Loading..." : "Refresh" }}
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Status</label>
            <select v-model="filters.status" class="form-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Job Type</label>
            <select v-model="filters.jobType" class="form-select">
              <option value="">All Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Search</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="filters.search"
                type="text"
                class="form-control"
                placeholder="Search jobs..."
              />
            </div>
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button
              @click="clearFilters"
              class="btn btn-outline-secondary w-100"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && jobs.length === 0" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading jobs...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error && jobs.length === 0" class="alert alert-danger">
      <h5>
        <i class="bi bi-exclamation-triangle me-2"></i>Failed to Load Jobs
      </h5>
      <p><strong>Error:</strong> {{ error }}</p>
      <button class="btn btn-danger" @click="refreshJobs">
        <i class="bi bi-arrow-clockwise me-1"></i>
        Try Again
      </button>
    </div>

    <!-- Jobs List -->
    <div v-else-if="filteredJobs.length > 0" class="jobs-grid">
      <div v-for="job in paginatedJobs" :key="job.id" class="job-card">
        <div class="card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div class="flex-grow-1">
                <router-link
                  :to="`/company/job-details/${job.id}`"
                  class="text-decoration-none"
                >
                  <h5 class="card-title mb-2 text-primary hover-underline">
                    {{ job.title }}
                  </h5>
                </router-link>
                <div class="job-meta mb-3">
                  <span
                    class="badge me-2"
                    :class="getJobTypeClass(job.job_type)"
                  >
                    {{ job.job_type }}
                  </span>
                  <span
                    class="badge me-2"
                    :class="getStatusClass(job.is_visible)"
                  >
                    {{ job.is_visible ? "Active" : "Draft" }}
                  </span>
                  <span v-if="job.level" class="badge bg-light text-dark">
                    {{ job.level }}
                  </span>
                </div>
              </div>
              <div class="dropdown">
                <button
                  class="btn btn-sm btn-outline-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  :disabled="actionLoading === job.id"
                >
                  <i
                    v-if="actionLoading === job.id"
                    class="spinner-border spinner-border-sm"
                  ></i>
                  <i v-else class="bi bi-three-dots"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <router-link
                      :to="`/company/job-details/${job.id}`"
                      class="dropdown-item"
                    >
                      <i class="bi bi-eye me-2"></i>View Details
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="`/company/jobs/edit/${job.id}`"
                      class="dropdown-item"
                    >
                      <i class="bi bi-pencil me-2"></i>Edit Job
                    </router-link>
                  </li>
                  <li>
                    <button
                      class="dropdown-item"
                      @click="viewApplications(job.id)"
                    >
                      <i class="bi bi-people me-2"></i>View Applications
                    </button>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <button
                      class="dropdown-item"
                      @click="toggleJobStatus(job.id, job.is_visible)"
                      :disabled="actionLoading === job.id"
                    >
                      <i
                        :class="
                          job.is_visible
                            ? 'bi bi-pause me-2'
                            : 'bi bi-play me-2'
                        "
                      ></i>
                      {{ job.is_visible ? "Pause Job" : "Activate Job" }}
                    </button>
                  </li>
                  <li>
                    <router-link
                      :to="`/company/jobs/duplicate/${job.id}`"
                      class="dropdown-item"
                    >
                      <i class="bi bi-files me-2"></i>Duplicate Job
                    </router-link>
                  </li>
                  <li>
                    <button
                      class="dropdown-item text-danger"
                      @click="deleteJobHandler(job.id)"
                      :disabled="actionLoading === job.id"
                    >
                      <i class="bi bi-trash me-2"></i>Delete Job
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <p class="card-text text-muted mb-3">
              {{ truncateText(job.description, 120) }}
            </p>

            <!-- Job Info -->
            <div class="job-info mb-3">
              <div class="row text-start">
                <div class="col-6 mb-2">
                  <small class="text-muted">Salary:</small>
                  <div class="fw-medium">
                    {{ job.salary_range || "Competitive" }}
                  </div>
                </div>
                <div class="col-6 mb-2">
                  <small class="text-muted">Location:</small>
                  <div class="fw-medium">{{ job.location || "Remote" }}</div>
                </div>
                <div class="col-6">
                  <small class="text-muted">Posted:</small>
                  <div class="fw-medium">{{ formatDate(job.posted_at) }}</div>
                </div>
                <div class="col-6">
                  <small class="text-muted">Deadline:</small>
                  <div class="fw-medium">
                    {{
                      job.expired_date
                        ? formatDate(job.expired_date)
                        : "No deadline"
                    }}
                  </div>
                </div>
              </div>
            </div>

            <div class="job-stats mb-3">
              <div class="row text-center">
                <div class="col-4">
                  <div class="stat-item">
                    <div class="stat-number">{{ job.views || 0 }}</div>
                    <div class="stat-label">Views</div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="stat-item">
                    <div class="stat-number">
                      {{ job.applicant_applied || 0 }}
                    </div>
                    <div class="stat-label">Applications</div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="stat-item">
                    <div class="stat-number">
                      {{
                        job.views > 0
                          ? Math.round(
                              (job.applicant_applied / job.views) * 100
                            )
                          : 0
                      }}%
                    </div>
                    <div class="stat-label">Conversion</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="job-footer">
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">
                  Posted {{ formatDate(job.posted_at) }}
                </small>
                <div class="btn-group btn-group-sm">
                  <button
                    class="btn btn-outline-primary"
                    @click="viewApplications(job.id)"
                  >
                    Applications ({{ job.applicant_applied || 0 }})
                  </button>
                  <router-link
                    :to="`/company/job-details/${job.id}`"
                    class="btn btn-primary"
                  >
                    View
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state text-center py-5">
      <div class="empty-icon mb-3">
        <i class="bi bi-briefcase fs-1 text-muted"></i>
      </div>
      <h4 class="text-muted mb-3">No jobs found</h4>
      <p class="text-muted mb-4">
        {{
          jobs.length === 0
            ? "You haven't posted any jobs yet."
            : "No jobs match your current filters."
        }}
      </p>
      <router-link to="/company/post-job" class="btn btn-primary">
        <i class="bi bi-plus-circle me-2"></i>Post Your First Job
      </router-link>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button
              class="page-link"
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
          </li>
          <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="changePage(page)">
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <button
              class="page-link"
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Success Toast -->
    <div
      v-if="showToast"
      class="toast-container position-fixed top-0 end-0 p-3"
    >
      <div class="toast show" role="alert">
        <div class="toast-header">
          <i class="bi bi-check-circle-fill text-success me-2"></i>
          <strong class="me-auto">Success</strong>
          <button
            type="button"
            class="btn-close"
            @click="showToast = false"
          ></button>
        </div>
        <div class="toast-body">
          {{ toastMessage }}
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button
              type="button"
              class="btn-close"
              @click="showDeleteModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this job?</p>
            <p class="text-muted">
              <strong>{{ jobToDelete?.title }}</strong>
            </p>
            <p class="text-danger">This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showDeleteModal = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmDelete"
              :disabled="deleteLoading"
            >
              <span
                v-if="deleteLoading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCompanyJobStore } from "@/stores/company/companyJob";

// Composables
const router = useRouter();
const companyJobStore = useCompanyJobStore();

// State
const loading = ref(false);
const jobs = ref([]);
const currentPage = ref(1);
const itemsPerPage = 12;
const showToast = ref(false);
const toastMessage = ref("");
const actionLoading = ref(null);
const deleteLoading = ref(false);
const showDeleteModal = ref(false);
const jobToDelete = ref(null);
const error = ref(null);
const filters = ref({
  status: "",
  jobType: "",
  search: "",
});

// Computed
const filteredJobs = computed(() => {
  let filtered = jobs.value;

  // Status filter
  if (filters.value.status) {
    if (filters.value.status === "active") {
      filtered = filtered.filter((job) => job.is_visible);
    } else if (filters.value.status === "draft") {
      filtered = filtered.filter((job) => !job.is_visible);
    }
  }

  // Job type filter
  if (filters.value.jobType) {
    filtered = filtered.filter((job) => job.job_type === filters.value.jobType);
  }

  // Search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.description?.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredJobs.value.length / itemsPerPage)
);

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredJobs.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Methods
const refreshJobs = async () => {
  loading.value = true;
  error.value = null;

  try {
    console.log("🔄 Refreshing jobs...");
    await companyJobStore.fetchJobs();
    jobs.value = [...companyJobStore.jobs]; // Create new array reference
    console.log("✅ Jobs refreshed, count:", jobs.value.length);

    if (jobs.value.length === 0) {
      console.log("ℹ️ No jobs found in response");
    }
  } catch (err) {
    console.error("❌ Error refreshing jobs:", err);
    error.value = err.message || "Failed to load jobs";
    showToastMessage("Failed to load jobs: " + error.value);
  } finally {
    loading.value = false;
  }
};

const clearFilters = () => {
  filters.value = {
    status: "",
    jobType: "",
    search: "",
  };
  currentPage.value = 1;
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const viewApplications = (jobId) => {
  router.push("/company/all-applicants");
};

const toggleJobStatus = async (jobId, currentStatus) => {
  try {
    actionLoading.value = jobId;
    console.log("🔄 Toggling job status:", jobId, currentStatus);

    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://localhost:3000/companies/jobs/${jobId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_visible: !currentStatus }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update job status");
    }

    // Update local state immediately
    const job = jobs.value.find((j) => j.id === jobId);
    if (job) {
      job.is_visible = !currentStatus;
    }

    showToastMessage(
      `Job ${!currentStatus ? "activated" : "paused"} successfully`
    );
  } catch (error) {
    console.error("❌ Failed to update job status:", error);
    showToastMessage("Failed to update job status");
  } finally {
    actionLoading.value = null;
  }
};

const deleteJobHandler = (jobId) => {
  const job = jobs.value.find((j) => j.id === jobId);
  if (job) {
    jobToDelete.value = job;
    showDeleteModal.value = true;
  }
};

const confirmDelete = async () => {
  if (!jobToDelete.value) return;

  try {
    deleteLoading.value = true;
    console.log("🗑️ Deleting job:", jobToDelete.value.id);

    await companyJobStore.deleteJob(jobToDelete.value.id);

    showToastMessage("Job deleted successfully");
    showDeleteModal.value = false;
    jobToDelete.value = null;

    // Update local jobs array
    jobs.value = [...companyJobStore.jobs];
  } catch (error) {
    console.error("❌ Failed to delete job:", error);
    showToastMessage("Failed to delete job");
  } finally {
    deleteLoading.value = false;
  }
};

const showToastMessage = (message) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Utility methods
const getJobTypeClass = (jobType) => {
  const classes = {
    "Full-Time": "bg-success",
    "Part-Time": "bg-primary",
    Contract: "bg-warning",
    Internship: "bg-info",
  };
  return classes[jobType] || "bg-secondary";
};

const getStatusClass = (isVisible) => {
  return isVisible ? "bg-success" : "bg-warning";
};

const truncateText = (text, length) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

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
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

// Lifecycle
onMounted(() => {
  console.log("🚀 Job listing component mounted");
  refreshJobs();
});

// Watch for filter changes to reset pagination
watch(
  filters,
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);

// Watch for changes in store jobs
watch(
  () => companyJobStore.jobs,
  (newJobs) => {
    console.log("👀 Store jobs changed:", newJobs.length);
    jobs.value = [...newJobs]; // Create new array reference
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.job-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.hover-underline:hover {
  text-decoration: underline !important;
}

.job-meta .badge {
  font-size: 0.75rem;
}

.job-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.875rem;
}

.job-stats {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 0.75rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 4rem 2rem;
  border: 2px dashed #dee2e6;
}

.empty-icon {
  opacity: 0.5;
}

.toast-container {
  z-index: 1050;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.dropdown-item {
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item:disabled {
  opacity: 0.6;
  pointer-events: none;
}

.modal.show {
  background: rgba(0, 0, 0, 0.5);
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

@media (max-width: 768px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .job-card .d-flex {
    flex-direction: column;
    gap: 16px;
  }

  .job-info .row {
    font-size: 0.8rem;
  }
}
</style>
