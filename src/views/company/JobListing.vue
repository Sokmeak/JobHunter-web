<template>
  <div class="job-listing">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-0">Job Listing</h2>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary">
          <i class="bi bi-funnel me-1"></i>
          Filter
        </button>
        <router-link to="/company/post-job" class="btn btn-primary">
          <i class="bi bi-plus me-1"></i>
          Post New Job
        </router-link>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            placeholder="Search jobs..."
            v-model="searchQuery"
          />
        </div>
      </div>
    </div>

    <!-- Jobs Table -->
    <div class="card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th class="border-0">
                <input type="checkbox" class="form-check-input" />
              </th>
              <th class="border-0">
                Job Title
                <i class="bi bi-arrow-up-down ms-1 text-muted"></i>
              </th>
              <th class="border-0">
                Status
                <i class="bi bi-arrow-up-down ms-1 text-muted"></i>
              </th>
              <th class="border-0">
                Job Type
                <i class="bi bi-arrow-up-down ms-1 text-muted"></i>
              </th>
              <th class="border-0">
                Applicants
                <i class="bi bi-arrow-up-down ms-1 text-muted"></i>
              </th>
              <th class="border-0">
                Date Posted
                <i class="bi bi-arrow-up-down ms-1 text-muted"></i>
              </th>
              <th class="border-0">
                Due Date
                <i class="bi bi-arrow-up-down ms-1 text-muted"></i>
              </th>
              <th class="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="job in filteredJobs"
              :key="job.id"
              @click="viewJob(job.id)"
              style="cursor: pointer"
            >
              <td>
                <input type="checkbox" class="form-check-input" @click.stop />
              </td>
              <td>
                <div>
                  <h6 class="mb-1 fw-semibold">{{ job.title }}</h6>
                  <small class="text-muted">{{ job.department }}</small>
                </div>
              </td>
              <td>
                <span :class="getStatusClass(job.status)">
                  {{ job.status }}
                </span>
              </td>
              <td>{{ job.type }}</td>
              <td>
                <div class="d-flex align-items-center">
                  <span class="me-2">{{ job.applicants }}</span>
                  <div class="progress" style="width: 60px; height: 6px">
                    <div
                      class="progress-bar bg-primary"
                      :style="`width: ${
                        (job.applicants / job.capacity) * 100
                      }%`"
                    ></div>
                  </div>
                  <small class="text-muted ms-2">{{ job.capacity }}</small>
                </div>
              </td>
              <td class="text-muted">{{ job.datePosted }}</td>
              <td class="text-muted">{{ job.dueDate }}</td>
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
                        @click.prevent="viewJob(job.id)"
                      >
                        View Details
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="editJob(job.id)"
                      >
                        Edit Job
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="duplicateJob(job.id)"
                      >
                        Duplicate
                      </a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href="#"
                        @click.prevent="deleteJob(job.id)"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="card-footer bg-white border-top">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <span class="me-2">View</span>
            <select class="form-select form-select-sm" style="width: auto">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span class="ms-2">Jobs per page</span>
          </div>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item">
                <a class="page-link" href="#"
                  ><i class="bi bi-chevron-left"></i
                ></a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#"
                  ><i class="bi bi-chevron-right"></i
                ></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "JobListing",
  setup() {
    const router = useRouter();
    const searchQuery = ref("");

    const jobs = ref([
      {
        id: 1,
        title: "Social Media Assistant",
        department: "Design",
        type: "Full-Time",
        applicants: 19,
        capacity: 20,
        status: "Live",
        datePosted: "20 May 2020",
        dueDate: "24 May 2020",
      },
      {
        id: 2,
        title: "Senior Designer",
        department: "Design",
        type: "Full-Time",
        applicants: 1234,
        capacity: 1500,
        status: "Live",
        datePosted: "16 May 2020",
        dueDate: "24 May 2020",
      },
      {
        id: 3,
        title: "Frontend Developer",
        department: "Development",
        type: "Full-Time",
        applicants: 45,
        capacity: 50,
        status: "Draft",
        datePosted: "15 May 2020",
        dueDate: "30 May 2020",
      },
      {
        id: 4,
        title: "Marketing Manager",
        department: "Marketing",
        type: "Full-Time",
        applicants: 78,
        capacity: 100,
        status: "Closed",
        datePosted: "10 May 2020",
        dueDate: "20 May 2020",
      },
    ]);

    const filteredJobs = computed(() => {
      if (!searchQuery.value) return jobs.value;
      return jobs.value.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          job.department.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const getStatusClass = (status) => {
      const classes = {
        Live: "badge bg-success",
        Draft: "badge bg-warning",
        Closed: "badge bg-danger",
        Paused: "badge bg-secondary",
      };
      return classes[status] || "badge bg-secondary";
    };

    const viewJob = (jobId) => {
      router.push(`/company/jobs/${jobId}`);
    };

    const editJob = (jobId) => {
      router.push(`/company/jobs/${jobId}/edit`);
    };

    const duplicateJob = (jobId) => {
      alert(`Duplicate job ID ${jobId} (functionality not implemented yet)`);
    };

    const deleteJob = (jobId) => {
      if (confirm("Are you sure you want to delete this job?")) {
        const index = jobs.value.findIndex((job) => job.id === jobId);
        if (index > -1) {
          jobs.value.splice(index, 1);
        }
      }
    };

    return {
      searchQuery,
      jobs,
      filteredJobs,
      getStatusClass,
      viewJob,
      editJob,
      duplicateJob,
      deleteJob,
    };
  },
};
</script>
