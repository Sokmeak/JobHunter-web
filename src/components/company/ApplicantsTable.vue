<template>
  <div class="applicants-table">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0 fw-bold">Total Applicants: 19</h2>

      <div class="d-flex align-items-center gap-3">
        <!-- Search Bar -->
        <div class="position-relative" style="width: 300px">
          <i
            class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          ></i>
          <input
            type="text"
            class="form-control ps-5"
            placeholder="Search Applicants"
            v-model="searchQuery"
          />
        </div>

        <!-- Filter Button -->
        <button class="btn btn-outline-secondary d-flex align-items-center">
          <i class="bi bi-funnel me-2"></i>Filter
        </button>

        <!-- View Toggle -->
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn"
            :class="
              viewMode === 'pipeline' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="viewMode = 'pipeline'"
          >
            Pipeline View
          </button>
          <button
            type="button"
            class="btn"
            :class="
              viewMode === 'table' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="viewMode = 'table'"
          >
            Table View
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card border-0 shadow-sm">
      <div class="table-responsive">
        <table class="table table-borderless mb-0">
          <thead class="bg-light">
            <tr>
              <th class="border-0 py-3 ps-4">
                <input type="checkbox" class="form-check-input" />
              </th>
              <th class="border-0 py-3 text-muted fw-normal">
                Full Name
                <i class="bi bi-chevron-expand ms-1"></i>
              </th>
              <th class="border-0 py-3 text-muted fw-normal">
                Score
                <i class="bi bi-chevron-expand ms-1"></i>
              </th>
              <th class="border-0 py-3 text-muted fw-normal">
                Hiring Stage
                <i class="bi bi-chevron-expand ms-1"></i>
              </th>
              <th class="border-0 py-3 text-muted fw-normal">
                Applied Date
                <i class="bi bi-chevron-expand ms-1"></i>
              </th>
              <th class="border-0 py-3 text-muted fw-normal">
                Job Role
                <i class="bi bi-chevron-expand ms-1"></i>
              </th>
              <th class="border-0 py-3 text-muted fw-normal">
                Action
                <i class="bi bi-chevron-expand ms-1"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="applicant in paginatedApplicants"
              :key="applicant.id"
              class="border-bottom"
            >
              <td class="py-3 ps-4">
                <input type="checkbox" class="form-check-input" />
              </td>
              <td class="py-3">
                <div class="d-flex align-items-center">
                  <img
                    :src="applicant.avatar"
                    :alt="applicant.name"
                    class="rounded-circle me-3"
                    style="width: 40px; height: 40px; object-fit: cover"
                  />
                  <span class="fw-medium">{{ applicant.name }}</span>
                </div>
              </td>
              <td class="py-3">
                <div class="d-flex align-items-center">
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <span class="fw-medium">{{ applicant.score }}</span>
                </div>
              </td>
              <td class="py-3">
                <span
                  class="badge px-3 py-2"
                  :class="getStageClass(applicant.stage)"
                >
                  {{ applicant.stage }}
                </span>
              </td>
              <td class="py-3 text-muted">{{ applicant.appliedDate }}</td>
              <td class="py-3">{{ applicant.jobRole }}</td>
              <td class="py-3">
                <div class="d-flex align-items-center gap-2">
                  <button
                    class="btn btn-outline-primary btn-sm px-3"
                    @click="viewApplication(applicant.id)"
                  >
                    See Application
                  </button>
                  <div class="dropdown">
                    <button
                      class="btn btn-link text-muted p-1"
                      data-bs-toggle="dropdown"
                    >
                      <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click="scheduleInterview(applicant.id)"
                          >Schedule Interview</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click="shortlistApplicant(applicant.id)"
                          >Shortlist</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click="declineApplicant(applicant.id)"
                          >Decline</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <div class="d-flex align-items-center">
        <span class="me-2">View</span>
        <select
          class="form-select form-select-sm"
          style="width: auto"
          v-model="itemsPerPage"
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
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
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
</template>

<script setup>
import { ref, computed, inject } from "vue";

const navigate = inject("navigate");
const viewApplicantDetails = inject("viewApplicantDetails");

const searchQuery = ref("");
const viewMode = ref("table");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const applicants = ref([
  {
    id: 1,
    name: "Jake Gyll",
    score: "0.0",
    stage: "Interview",
    appliedDate: "13 July, 2021",
    jobRole: "Designer",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+jake",
  },
  {
    id: 2,
    name: "Guy Hawkins",
    score: "0.0",
    stage: "Interview",
    appliedDate: "13 July, 2021",
    jobRole: "JavaScript Dev",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+guy",
  },
  {
    id: 3,
    name: "Cyndy Lillibridge",
    score: "4.5",
    stage: "Shortlisted",
    appliedDate: "12 July, 2021",
    jobRole: "Golang Dev",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+cyndy",
  },
  {
    id: 4,
    name: "Rodolfo Goode",
    score: "3.75",
    stage: "Declined",
    appliedDate: "11 July, 2021",
    jobRole: "NET Dev",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+man+rodolfo",
  },
  {
    id: 5,
    name: "Leif Floyd",
    score: "4.8",
    stage: "Hired",
    appliedDate: "11 July, 2021",
    jobRole: "Graphic Design",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+leif",
  },
  {
    id: 6,
    name: "Jenny Wilson",
    score: "4.6",
    stage: "Hired",
    appliedDate: "9 July, 2021",
    jobRole: "Designer",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+jenny",
  },
  {
    id: 7,
    name: "Jerome Bell",
    score: "4.0",
    stage: "Interviewed",
    appliedDate: "5 July, 2021",
    jobRole: "Designer",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+jerome",
  },
  {
    id: 8,
    name: "Eleanor Pena",
    score: "3.90",
    stage: "Declined",
    appliedDate: "5 July, 2021",
    jobRole: "Designer",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+eleanor",
  },
  {
    id: 9,
    name: "Darrell Steward",
    score: "4.20",
    stage: "Shortlisted",
    appliedDate: "3 July, 2021",
    jobRole: "Designer",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+man+darrell",
  },
  {
    id: 10,
    name: "Floyd Miles",
    score: "4.10",
    stage: "Interviewed",
    appliedDate: "1 July, 2021",
    jobRole: "Designer",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+floyd",
  },
]);

const filteredApplicants = computed(() => {
  if (!searchQuery.value) return applicants.value;
  return applicants.value.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      applicant.jobRole.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredApplicants.value.length / itemsPerPage.value)
);

const paginatedApplicants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredApplicants.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (current >= total - 2) {
      pages.push(total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(current - 2, current - 1, current, current + 1, current + 2);
    }
  }

  return pages;
});

const getStageClass = (stage) => {
  switch (stage.toLowerCase()) {
    case "interview":
      return "bg-warning-subtle text-warning border border-warning";
    case "shortlisted":
      return "bg-primary-subtle text-primary border border-primary";
    case "declined":
      return "bg-danger-subtle text-danger border border-danger";
    case "hired":
      return "bg-success-subtle text-success border border-success";
    case "interviewed":
      return "bg-info-subtle text-info border border-info";
    default:
      return "bg-secondary-subtle text-secondary border border-secondary";
  }
};

const viewApplication = (applicantId) => {
  console.log("Viewing application for applicant:", applicantId);
  viewApplicantDetails(applicantId);
};

const scheduleInterview = (applicantId) => {
  console.log("Scheduling interview for applicant:", applicantId);
};

const shortlistApplicant = (applicantId) => {
  console.log("Shortlisting applicant:", applicantId);
};

const declineApplicant = (applicantId) => {
  console.log("Declining applicant:", applicantId);
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
</script>

<style scoped>
.table th {
  font-size: 0.875rem;
  font-weight: 400;
}

.table td {
  vertical-align: middle;
}

.badge {
  font-weight: 500;
  font-size: 0.75rem;
}

.btn-group .btn {
  border-radius: 0;
}

.btn-group .btn:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.btn-group .btn:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.pagination .page-link {
  border: none;
  color: #6c757d;
}

.pagination .page-item.active .page-link {
  background-color: #6366f1;
  border-color: #6366f1;
}
</style>
