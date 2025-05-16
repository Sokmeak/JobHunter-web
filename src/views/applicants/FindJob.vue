<template>
  <div class="d-flex">
    <div class="flex-grow-1 vh-100 overflow-auto">
    <DashboardHeader title="Findjob" />

    <div class="search-section mb-4">
      <div class="row g-3">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              class="form-control border-start-0"
              placeholder="Job title or keyword"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <i class="bi bi-geo-alt"></i>
            </span>
            <input
              type="text"
              class="form-control border-start-0"
              placeholder="Location"
              value="Florence, Italy"
            />
            <span class="input-group-text bg-white border-start-0">
              <i class="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100">Search</button>
        </div>
      </div>

      <div class="popular-searches mt-3">
        <span class="text-muted me-2">Popular:</span>
        <span class="popular-tag">UI Designer</span>
        <span class="popular-tag">UX Researcher</span>
        <span class="popular-tag">Android</span>
        <span class="popular-tag">Admin</span>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <JobFilters />
      </div>
      <div class="col-md-9">
        <div
          class="jobs-header d-flex justify-content-between align-items-center mb-3"
        >
          <div>
            <h2 class="h5 mb-1">All Jobs</h2>
            <p class="text-muted mb-0">Showing 73 results</p>
          </div>
          <div class="d-flex align-items-center">
            <div class="dropdown me-2">
              <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
              >
                Most relevant
              </button>
            </div>
            <div class="view-options">
              <button class="btn btn-outline-secondary me-1">
                <i class="bi bi-grid"></i>
              </button>
              <button class="btn btn-outline-secondary active">
                <i class="bi bi-list"></i>
              </button>
            </div>
          </div>
        </div>

        <JobList :jobs="jobs" />

        <Pagination :currentPage="1" :totalPages="12" />
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import JobFilters from "@/components/Applicants/FindJob/JobFilters.vue";
import JobList from "@/components/Applicants/FindJob/JobList.vue";
import Pagination from "@/components/Applicants/applications/Pagination.vue";
const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: {
      name: "Nomad",
      logo: "https://logo.clearbit.com/Nomad.com",
    },
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 2,
    title: "Brand Designer",
    company: {
      name: "Dropbox",
      logo: "https://logo.clearbit.com/Dropbox.com",
    },
    location: "San Francisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 2,
    capacity: 10,
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: {
      name: "Terraform",
      logo: "https://logo.clearbit.com/Terraform.com",
    },
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 8,
    capacity: 12,
  },
  {
    id: 4,
    title: "Email Marketing",
    company: {
      name: "Revolut",
      logo: "https://logo.clearbit.com/Revolut.com",
    },
    location: "Madrid, Spain",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 0,
    capacity: 10,
  },
  {
    id: 5,
    title: "Lead Engineer",
    company: {
      name: "Canva",
      logo: "https://logo.clearbit.com/Canva.com",
    },
    location: "Ankara, Turkey",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
];
</script>

<style scoped>
.find-jobs {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.popular-tag {
  display: inline-block;
  margin-right: 8px;
  font-size: 14px;
  color: #5138ee;
  cursor: pointer;
}

.popular-tag:hover {
  text-decoration: underline;
}

.view-options .btn.active {
  background-color: #e9ecef;
}
</style>
