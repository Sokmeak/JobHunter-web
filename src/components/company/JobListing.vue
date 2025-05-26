<template>
  <div class="job-listing">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-1 fw-bold">Job Listing</h2>
        <p class="text-muted mb-0">Manage all your job postings</p>
      </div>
      <button
        class="btn btn-primary d-flex align-items-center"
        @click="createNewJob"
      >
        <i class="bi bi-plus-circle me-2"></i>
        Post New Job
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="position-relative">
          <i
            class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          ></i>
          <input
            type="text"
            class="form-control ps-5"
            placeholder="Search jobs..."
            v-model="searchQuery"
          />
        </div>
      </div>
      <div class="col-md-2">
        <select class="form-select" v-model="statusFilter">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" v-model="typeFilter">
          <option value="">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" v-model="departmentFilter">
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-secondary w-100">
          <i class="bi bi-funnel me-2"></i>More Filters
        </button>
      </div>
    </div>

    <!-- Job Cards Grid -->
    <div class="row g-4">
      <div class="col-lg-4 col-md-6" v-for="job in filteredJobs" :key="job.id">
        <div class="card border-0 shadow-sm h-100 job-card">
          <div class="card-body p-4">
            <!-- Header with Logo and Status -->
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div
                class="company-logo rounded-3 p-3 d-flex align-items-center justify-content-center"
                :style="{
                  backgroundColor: job.logoColor,
                  width: '60px',
                  height: '60px',
                }"
              >
                <i :class="job.logoIcon" class="text-white fs-4"></i>
              </div>
              <div class="d-flex flex-column align-items-end">
                <span class="badge mb-2" :class="getStatusClass(job.status)">{{
                  job.status
                }}</span>
                <div class="dropdown">
                  <button
                    class="btn btn-sm btn-outline-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i class="bi bi-three-dots"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#" @click="viewJob(job.id)"
                        >View Details</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click="editJob(job.id)"
                        >Edit Job</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="duplicateJob(job.id)"
                        >Duplicate</a
                      >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="viewAnalytics(job.id)"
                        >View Analytics</a
                      >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href="#"
                        @click="deleteJob(job.id)"
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Job Title and Company -->
            <h5 class="mb-2 fw-bold">{{ job.title }}</h5>
            <div class="d-flex align-items-center text-muted small mb-3">
              <span>{{ job.company }}</span>
              <span class="mx-2">•</span>
              <span>{{ job.location }}</span>
            </div>

            <!-- Job Type and Department -->
            <div class="d-flex flex-wrap gap-2 mb-3">
              <span
                class="badge bg-primary-subtle text-primary border border-primary px-3 py-2"
              >
                {{ job.type }}
              </span>
              <span
                class="badge bg-secondary-subtle text-secondary border border-secondary px-3 py-2"
              >
                {{ job.department }}
              </span>
            </div>

            <!-- Job Stats -->
            <div class="row g-3 mb-3">
              <div class="col-6">
                <div class="text-center">
                  <div class="fw-bold text-primary fs-5">
                    {{ job.applicants }}
                  </div>
                  <small class="text-muted">Applicants</small>
                </div>
              </div>
              <div class="col-6">
                <div class="text-center">
                  <div class="fw-bold text-success fs-5">{{ job.views }}</div>
                  <small class="text-muted">Views</small>
                </div>
              </div>
            </div>

            <!-- Application Progress -->
            <div class="mb-3">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="small fw-medium"
                  >{{ job.applicants }} applied</span
                >
                <span class="small text-muted"
                  >of {{ job.capacity }} capacity</span
                >
              </div>
              <div class="progress" style="height: 6px">
                <div
                  class="progress-bar bg-success"
                  :style="{
                    width: (job.applicants / job.capacity) * 100 + '%',
                  }"
                ></div>
              </div>
            </div>

            <!-- Footer with Date and Actions -->
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">Posted {{ job.postedDate }}</small>
              <div class="btn-group btn-group-sm">
                <button
                  class="btn btn-outline-primary"
                  @click="viewApplicants(job.id)"
                >
                  View Applicants
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredJobs.length === 0" class="text-center py-5">
      <i class="bi bi-briefcase text-muted" style="font-size: 4rem"></i>
      <h4 class="mt-3 mb-2">No jobs found</h4>
      <p class="text-muted mb-4">
        Try adjusting your search criteria or create a new job posting.
      </p>
      <button class="btn btn-primary" @click="createNewJob">
        <i class="bi bi-plus-circle me-2"></i>Post Your First Job
      </button>
    </div>

    <!-- Pagination -->
    <nav v-if="filteredJobs.length > 0" class="mt-5">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link"
            @click="currentPage--"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="currentPage = page">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="currentPage++"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";

const navigate = inject("navigate");

const searchQuery = ref("");
const statusFilter = ref("");
const typeFilter = ref("");
const departmentFilter = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(9);

// Sample jobs data
const jobs = ref([
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    department: "Marketing",
    status: "Active",
    applicants: 24,
    views: 1250,
    capacity: 50,
    postedDate: "2 days ago",
    logoColor: "#10b981",
    logoIcon: "bi bi-hash",
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    department: "Design",
    status: "Active",
    applicants: 18,
    views: 890,
    capacity: 30,
    postedDate: "3 days ago",
    logoColor: "#3b82f6",
    logoIcon: "bi bi-dropbox",
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Berlin, Germany",
    type: "Full-Time",
    department: "Engineering",
    status: "Active",
    applicants: 32,
    views: 1580,
    capacity: 40,
    postedDate: "5 days ago",
    logoColor: "#06b6d4",
    logoIcon: "bi bi-layers",
  },
  {
    id: 4,
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    type: "Full-Time",
    department: "Design",
    status: "Active",
    applicants: 15,
    views: 720,
    capacity: 25,
    postedDate: "1 week ago",
    logoColor: "#8b5cf6",
    logoIcon: "bi bi-circle",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Contract",
    department: "Engineering",
    status: "Draft",
    applicants: 0,
    views: 0,
    capacity: 20,
    postedDate: "Draft",
    logoColor: "#f59e0b",
    logoIcon: "bi bi-code-slash",
  },
  {
    id: 6,
    title: "Marketing Manager",
    company: "StartupXYZ",
    location: "New York, USA",
    type: "Full-Time",
    department: "Marketing",
    status: "Closed",
    applicants: 45,
    views: 2100,
    capacity: 45,
    postedDate: "2 weeks ago",
    logoColor: "#ef4444",
    logoIcon: "bi bi-megaphone",
  },
]);

const filteredJobs = computed(() => {
  let filtered = jobs.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (statusFilter.value) {
    filtered = filtered.filter((job) => job.status === statusFilter.value);
  }

  if (typeFilter.value) {
    filtered = filtered.filter((job) => job.type === typeFilter.value);
  }

  if (departmentFilter.value) {
    filtered = filtered.filter(
      (job) => job.department === departmentFilter.value
    );
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredJobs.value.length / itemsPerPage.value)
);

const getStatusClass = (status) => {
  switch (status) {
    case "Active":
      return "bg-success-subtle text-success border border-success";
    case "Draft":
      return "bg-warning-subtle text-warning border border-warning";
    case "Closed":
      return "bg-danger-subtle text-danger border border-danger";
    default:
      return "bg-secondary-subtle text-secondary border border-secondary";
  }
};

const createNewJob = () => {
  if (navigate) {
    navigate("post-job");
  }
};

const viewJob = (jobId) => {
  console.log("View job:", jobId);
  // Navigate to job details
};

const editJob = (jobId) => {
  console.log("Edit job:", jobId);
  if (navigate) {
    navigate("post-job");
  }
};

const duplicateJob = (jobId) => {
  console.log("Duplicate job:", jobId);
};

const viewAnalytics = (jobId) => {
  console.log("View analytics for job:", jobId);
};

const deleteJob = (jobId) => {
  console.log("Delete job:", jobId);
  if (confirm("Are you sure you want to delete this job?")) {
    jobs.value = jobs.value.filter((job) => job.id !== jobId);
  }
};

const viewApplicants = (jobId) => {
  console.log("View applicants for job:", jobId);
  if (navigate) {
    navigate("all-applicants");
  }
};
</script>

<style scoped>
.job-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.company-logo {
  transition: transform 0.2s ease;
}

.job-card:hover .company-logo {
  transform: scale(1.05);
}

.progress-bar {
  transition: width 0.5s ease;
}

.page-link {
  color: #6366f1;
  border-color: #e5e7eb;
}

.page-link:hover {
  color: #4f46e5;
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.page-item.active .page-link {
  background-color: #6366f1;
  border-color: #6366f1;
}
</style>
