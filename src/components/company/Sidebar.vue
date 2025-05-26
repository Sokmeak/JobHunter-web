<template>
  <div
    class="sidebar bg-white border-end"
    style="width: 280px; min-height: 100vh"
  >
    <!-- Logo Section -->
    <div class="p-4 border-bottom">
      <div class="d-flex align-items-center">
        <div
          class="bg-primary rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
          style="
            width: 40px;
            height: 40px;
            background: linear-gradient(
              135deg,
              #6366f1 0%,
              #8b5cf6 100%
            ) !important;
          "
        >
          <i class="bi bi-briefcase text-white fs-6"></i>
        </div>
        <h4 class="mb-0 fw-bold text-dark">JobHunter</h4>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="p-3">
      <ul class="nav flex-column">
        <li class="nav-item mb-1">
          <button
            class="nav-link d-flex align-items-center w-100 text-start border-0 bg-transparent rounded-3"
            :class="{ active: activeItem === 'dashboard' }"
            @click="navigateTo('dashboard')"
          >
            <i class="bi bi-house me-3 fs-5"></i>
            <span class="fw-medium">Dashboard</span>
          </button>
        </li>
        <li class="nav-item mb-1">
          <button
            class="nav-link d-flex align-items-center w-100 text-start border-0 bg-transparent rounded-3"
            :class="{ active: activeItem === 'company-profile' }"
            @click="navigateTo('company-profile')"
          >
            <i class="bi bi-building me-3 fs-5"></i>
            <span class="fw-medium">Company Profile</span>
          </button>
        </li>
        <li class="nav-item mb-1">
          <button
            class="nav-link d-flex align-items-center w-100 text-start border-0 bg-transparent rounded-3"
            :class="{ active: activeItem === 'all-applicants' }"
            @click="navigateTo('all-applicants')"
          >
            <i class="bi bi-people me-3 fs-5"></i>
            <span class="fw-medium">All Applicants</span>
          </button>
        </li>
        <li class="nav-item mb-1">
          <button
            class="nav-link d-flex align-items-center w-100 text-start border-0 bg-transparent rounded-3"
            :class="{ active: activeItem === 'job-listing' }"
            @click="navigateTo('job-listing')"
          >
            <i class="bi bi-briefcase me-3 fs-5"></i>
            <span class="fw-medium">Job Listing</span>
          </button>
        </li>
        <li class="nav-item mb-5">
          <button
            class="nav-link d-flex align-items-center w-100 text-start border-0 bg-transparent rounded-3"
            :class="{ active: activeItem === 'my-schedule' }"
            @click="navigateTo('my-schedule')"
          >
            <i class="bi bi-calendar3 me-3 fs-5"></i>
            <span class="fw-medium">My Schedule</span>
          </button>
        </li>

        <!-- Settings Section -->
        <li class="nav-item mb-3">
          <div
            class="text-muted small fw-medium px-3"
            style="font-size: 11px; letter-spacing: 0.5px"
          >
            SETTINGS
          </div>
        </li>
        <li class="nav-item mb-1">
          <button
            class="nav-link d-flex align-items-center w-100 text-start border-0 bg-transparent rounded-3"
            :class="{ active: activeItem === 'settings' }"
            @click="navigateTo('settings')"
          >
            <i class="bi bi-gear me-3 fs-5"></i>
            <span class="fw-medium">Settings</span>
          </button>
        </li>
        <li class="nav-item mb-1">
          <button
            class="nav-link d-flex align-items-center w-100 text-start border-0 bg-transparent rounded-3"
            :class="{ active: activeItem === 'help-center' }"
            @click="navigateTo('help-center')"
          >
            <i class="bi bi-question-circle me-3 fs-5"></i>
            <span class="fw-medium">Help Center</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- User Profile Section -->
    <div
      class="mt-auto p-4 border-top"
      style="position: absolute; bottom: 0; left: 0; right: 0"
    >
      <div class="d-flex align-items-center">
        <img
          :src="placeholder"
          alt="Maria Kelly"
          class="rounded-circle me-3"
          style="width: 48px; height: 48px; object-fit: cover"
        />
        <div class="flex-grow-1">
          <h6 class="mb-0 fw-bold">Maria Kelly</h6>
          <small class="text-muted">MariaKlly@email.com</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from "vue";
import placeholder from "@/assets/images/placeholder.svg";

const navigate = inject("navigate");
const currentView = inject("currentView", ref("dashboard"));

const activeItem = ref("dashboard");

watch(
  currentView,
  (newView) => {
    activeItem.value = newView;
  },
  { immediate: true }
);

const navigateTo = (view) => {
  activeItem.value = view;
  if (navigate) navigate(view);
  console.log("Sidebar navigation to:", view);
};
</script>

<style scoped>
.nav-link {
  padding: 14px 16px;
  border-radius: 12px;
  color: #9ca3af;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 15px;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.nav-link.active {
  background-color: #e0e7ff;
  color: #6366f1;
  font-weight: 600;
}

.nav-link.active i {
  color: #6366f1;
}

.nav-link i {
  color: #9ca3af;
  transition: color 0.2s ease;
}

.nav-link:hover i {
  color: #374151;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.border-end {
  border-right: 1px solid #e5e7eb !important;
}

.border-bottom {
  border-bottom: 1px solid #e5e7eb !important;
}

.border-top {
  border-top: 1px solid #e5e7eb !important;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.show {
    transform: translateX(0);
  }
}
</style>
