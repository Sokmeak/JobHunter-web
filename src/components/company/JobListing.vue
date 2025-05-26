<template>
  <div class="job-listing">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1">Job Listing</h4>
        <p class="text-muted mb-0">
          Here is your jobs listing status from July 19 - July 25.
        </p>
      </div>
      <div class="d-flex align-items-center">
        <div class="input-group me-3" style="width: 200px">
          <input
            type="text"
            class="form-control"
            v-model="dateRange"
            readonly
          />
          <button class="btn btn-outline-secondary" @click="openDatePicker">
            <i class="bi bi-calendar"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div
        class="card-header bg-white d-flex justify-content-between align-items-center"
      >
        <h5 class="mb-0">Job List</h5>
        <button class="btn btn-outline-secondary" @click="toggleFilters">
          <i class="bi bi-funnel me-1"></i>Filters
        </button>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th @click="sortBy('role')" class="sortable">
                  Roles
                  <i class="bi bi-chevron-expand ms-1"></i>
                </th>
                <th @click="sortBy('status')" class="sortable">
                  Status
                  <i class="bi bi-chevron-expand ms-1"></i>
                </th>
                <th @click="sortBy('datePosted')" class="sortable">
                  Date Posted
                  <i class="bi bi-chevron-expand ms-1"></i>
                </th>
                <th @click="sortBy('dueDate')" class="sortable">
                  Due Date
                  <i class="bi bi-chevron-expand ms-1"></i>
                </th>
                <th @click="sortBy('jobType')" class="sortable">
                  Job Type
                  <i class="bi bi-chevron-expand ms-1"></i>
                </th>
                <th @click="sortBy('applicants')" class="sortable">
                  Applicants
                  <i class="bi bi-chevron-expand ms-1"></i>
                </th>
                <th @click="sortBy('needs')" class="sortable">
                  Needs
                  <i class="bi bi-chevron-expand ms-1"></i>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="job in paginatedJobs"
                :key="job.id"
                @click="viewJobDetails(job.id)"
                class="cursor-pointer"
              >
                <td>
                  <div class="fw-medium">{{ job.role }}</div>
                </td>
                <td>
                  <span :class="getStatusClass(job.status)" class="badge">
                    {{ job.status }}
                  </span>
                </td>
                <td>{{ job.datePosted }}</td>
                <td>{{ job.dueDate }}</td>
                <td>
                  <span :class="getJobTypeClass(job.jobType)" class="badge">
                    {{ job.jobType }}
                  </span>
                </td>
                <td>{{ job.applicants }}</td>
                <td>
                  <span class="text-muted"
                    >{{ job.needs.current }} / {{ job.needs.total }}</span
                  >
                </td>
                <td>
                  <div class="dropdown" @click.stop>
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      data-bs-toggle="dropdown"
                    >
                      <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click="editJob(job.id)"
                          >Edit Job</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click="viewApplicants(job.id)"
                          >View Applicants</a
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
                          class="dropdown-item text-danger"
                          href="#"
                          @click="deleteJob(job.id)"
                          >Delete Job</a
                        >
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card-footer bg-white">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <span class="me-2">View</span>
            <select
              class="form-select form-select-sm"
              style="width: auto"
              v-model="itemsPerPage"
              @change="updatePagination"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span class="ms-2">Applicants per page</span>
          </div>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="previousPage">
                  <i class="bi bi-chevron-left"></i>
                </button>
              </li>
              <li
                class="page-item"
                v-for="page in visiblePages"
                :key="page"
                :class="{ active: page === currentPage }"
              >
                <button class="page-link" @click="goToPage(page)">
                  {{ page }}
                </button>
              </li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
              >
                <button class="page-link" @click="nextPage">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const dateRange = ref("Jul 19 - Jul 25");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const sortField = ref("");
const sortDirection = ref("asc");

const jobs = ref([
  {
    id: 1,
    role: "Social Media Assistant",
    status: "Live",
    datePosted: "20 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 19,
    needs: { current: 4, total: 11 },
  },
  {
    id: 2,
    role: "Senior Designer",
    status: "Live",
    datePosted: "16 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 1234,
    needs: { current: 0, total: 20 },
  },
  {
    id: 3,
    role: "Visual Designer",
    status: "Live",
    datePosted: "15 May 2020",
    dueDate: "24 May 2020",
    jobType: "Freelance",
    applicants: 2435,
    needs: { current: 1, total: 5 },
  },
  {
    id: 4,
    role: "Data Science",
    status: "Closed",
    datePosted: "13 May 2020",
    dueDate: "24 May 2020",
    jobType: "Freelance",
    applicants: 6234,
    needs: { current: 10, total: 10 },
  },
  {
    id: 5,
    role: "Kotlin Developer",
    status: "Closed",
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 12,
    needs: { current: 20, total: 20 },
  },
  {
    id: 6,
    role: "React Developer",
    status: "Closed",
    datePosted: "11 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 14,
    needs: { current: 10, total: 10 },
  },
  {
    id: 7,
    role: "Kotlin Developer",
    status: "Closed",
    datePosted: "12 May 2020",
    dueDate: "24 May 2020",
    jobType: "Fulltime",
    applicants: 12,
    needs: { current: 20, total: 20 },
  },
]);

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return jobs.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(jobs.value.length / itemsPerPage.value)
);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const getStatusClass = (status) => {
  const classes = {
    Live: "bg-success-subtle text-success",
    Closed: "bg-danger-subtle text-danger",
    Draft: "bg-warning-subtle text-warning",
  };
  return classes[status] || "bg-secondary-subtle text-secondary";
};

const getJobTypeClass = (jobType) => {
  const classes = {
    Fulltime: "bg-primary-subtle text-primary",
    Freelance: "bg-warning-subtle text-warning",
    "Part-time": "bg-info-subtle text-info",
  };
  return classes[jobType] || "bg-secondary-subtle text-secondary";
};

const openDatePicker = () => {
  console.log("Opening date picker");
};

const toggleFilters = () => {
  console.log("Toggling filters");
};

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
  console.log(`Sorting by ${field} in ${sortDirection.value} order`);
};

const viewJobDetails = (jobId) => {
  console.log("Viewing job details for job:", jobId);
};

const editJob = (jobId) => {
  console.log("Editing job:", jobId);
};

const viewApplicants = (jobId) => {
  console.log("Viewing applicants for job:", jobId);
};

const duplicateJob = (jobId) => {
  console.log("Duplicating job:", jobId);
};

const deleteJob = (jobId) => {
  console.log("Deleting job:", jobId);
};

const goToPage = (page) => {
  currentPage.value = page;
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const updatePagination = () => {
  currentPage.value = 1;
};
</script>

<style scoped>
.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background-color: #f8f9fa;
}

.cursor-pointer {
  cursor: pointer;
}

tbody tr:hover {
  background-color: #f8f9fa;
}
</style>
