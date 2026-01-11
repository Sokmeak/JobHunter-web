<template>
  <header class="top-navigation bg-white border-bottom">
    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-between py-3">
        <!-- Left Side -->
        <div class="d-flex align-items-center">
          <!-- Sidebar Toggle -->
          <button
            class="btn btn-link text-dark p-0 me-3"
            @click="$emit('toggleSidebar')"
          >
            <i class="bi bi-list fs-4"></i>
          </button>

          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link
                  to="/company/dashboard"
                  class="text-decoration-none"
                >
                  Dashboard
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ currentPageTitle }}
              </li>
            </ol>
          </nav>
        </div>

        <!-- Right Side -->
        <div class="d-flex align-items-center gap-3">
          <!-- Search -->
          <div class="position-relative d-none d-md-block">
            <i class="bi bi-search position-absolute search-icon"></i>
            <input
              type="text"
              class="form-control search-input"
              placeholder="Search..."
              v-model="searchQuery"
            />
          </div>

          <!-- Quick Actions -->
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-plus me-1"></i>Quick Actions
            </button>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/company/post-job" class="dropdown-item">
                  <i class="bi bi-briefcase me-2"></i>Post New Job
                </router-link>
              </li>
              <li>
                <router-link to="/company/schedule" class="dropdown-item">
                  <i class="bi bi-calendar-plus me-2"></i>Schedule Interview
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link to="/company/all-applicants" class="dropdown-item">
                  <i class="bi bi-people me-2"></i>View Applicants
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Notifications -->
          <div class="position-relative">
            <button
              class="btn btn-link text-dark p-2"
              @click="$emit('toggleNotifications')"
            >
              <i class="bi bi-bell fs-5"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const searchQuery = ref("");
const route = useRoute();

const currentPageTitle = computed(() => {
  const routeNames = {
    Dashboard: "Dashboard",
    JobListing: "Job Listings",
    PostJob: "Post New Job",
    JobDetails: "Job Details",
    AllApplicants: "All Applicants",
    MySchedule: "My Schedule",
    Settings: "Settings",
    HelpCenter: "Help Center",
  };
  return routeNames[route.name] || "Dashboard";
});
</script>

<style scoped>
.top-navigation {
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 1020;
}

.search-input {
  padding-left: 2.5rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  width: 300px;
}

.search-input:focus {
  background-color: white;
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.search-icon {
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 0.875rem;
  z-index: 5;
}

.breadcrumb-item a {
  color: #6366f1;
}

.breadcrumb-item.active {
  color: #64748b;
}

.dropdown-item {
  text-decoration: none;
}
</style>
