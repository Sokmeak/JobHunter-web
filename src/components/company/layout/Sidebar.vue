<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Logo -->
    <div class="sidebar-header">
      <div class="d-flex align-items-center">
        <div v-if="isCollapsed">
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16.7529" cy="16.7109" r="16" fill="#4640DE" />
          </svg>
        </div>
        <PrimaryLogo v-else class="ms-2" :context="'/company'" />
      </div>
    </div>

    <!-- Navigation Links -->
    <div class="nav-items">
      <router-link
        to="/company/dashboard"
        class="nav-item"
        active-class="active"
        :title="isCollapsed ? 'Dashboard' : ''"
      >
        <i class="bi bi-speedometer2 nav-icon"></i>
        <span v-if="!isCollapsed" class="nav-text">Dashboard</span>
      </router-link>

      <div class="nav-section-title" v-if="!isCollapsed">
        <small class="text-muted fw-medium">JOBS</small>
      </div>

      <router-link
        to="/company/job-listing"
        class="nav-item"
        active-class="active"
        :title="isCollapsed ? 'Job Listings' : ''"
      >
        <i class="bi bi-briefcase nav-icon"></i>
        <span v-if="!isCollapsed" class="nav-text">Job Listings</span>
      </router-link>

      <router-link
        to="/company/post-job"
        class="nav-item"
        active-class="active"
        :title="isCollapsed ? 'Post Job' : ''"
      >
        <i class="bi bi-plus-circle nav-icon"></i>
        <span v-if="!isCollapsed" class="nav-text">Post New Job</span>
      </router-link>

      <div class="nav-section-title" v-if="!isCollapsed">
        <small class="text-muted fw-medium">APPLICANTS</small>
      </div>

      <router-link
        to="/company/all-applicants"
        class="nav-item"
        active-class="active"
        :title="isCollapsed ? 'All Applicants' : ''"
      >
        <i class="bi bi-people nav-icon"></i>
        <span v-if="!isCollapsed" class="nav-text">All Applicants</span>
      </router-link>

      <router-link
        to="/company/schedule"
        class="nav-item"
        active-class="active"
        :title="isCollapsed ? 'My Schedule' : ''"
      >
        <i class="bi bi-calendar-check nav-icon"></i>
        <span v-if="!isCollapsed" class="nav-text">My Schedule</span>
      </router-link>

      <div class="nav-section-title" v-if="!isCollapsed">
        <small class="text-muted fw-medium">SETTINGS</small>
      </div>

      <router-link
        to="/company/settings"
        class="nav-item"
        active-class="active"
        :title="isCollapsed ? 'Settings' : ''"
      >
        <i class="bi bi-gear nav-icon"></i>
        <span v-if="!isCollapsed" class="nav-text">Settings</span>
      </router-link>

      <router-link
        to="/company/help"
        class="nav-item"
        active-class="active"
        :title="isCollapsed ? 'Help Center' : ''"
      >
        <i class="bi bi-question-circle nav-icon"></i>
        <span v-if="!isCollapsed" class="nav-text">Help Center</span>
      </router-link>
    </div>

    <!-- Company Profile at Bottom -->
    <div
      class="sidebar-footer p-3 border-top mt-auto"
      v-if="!isCollapsed && currentCompany"
    >
      <div class="dropdown w-100">
        <button
          class="btn d-flex align-items-center w-100 p-0 border-0 bg-transparent"
          data-bs-toggle="dropdown"
        >
          <img
            :src="currentCompany.logo || '/placeholder.svg'"
            alt="Company Logo"
            class="rounded-circle me-2"
            style="width: 40px; height: 40px"
          />
          <div class="flex-grow-1 text-start">
            <div class="fw-medium text-dark text-truncate">
              {{ currentCompany.hr_contact_name }}
              <i class="bi bi-caret-down-fill small ms-1"></i>
            </div>
            <div class="text-muted small text-truncate">
              {{ "Admin" }}
            </div>
          </div>
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-header">
            <div class="fw-medium">{{ currentCompany.name }}</div>
            <small class="text-muted">{{ currentCompany.website }}</small>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <router-link to="/company/settings" class="dropdown-item">
              <i class="bi bi-person me-2"></i>Profile
            </router-link>
          </li>
          <li>
            <router-link to="/company/settings" class="dropdown-item">
              <i class="bi bi-gear me-2"></i>Settings
            </router-link>
          </li>
          <li>
            <a
              href="#"
              class="dropdown-item text-danger"
              @click.prevent="logout"
            >
              <i class="bi bi-box-arrow-right me-2"></i>Sign Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/company/auth";
import PrimaryLogo from "@/components/sharecomponents/PrimaryLogo.vue";

const auth = useAuthStore();
const currentCompany = computed(() => auth.currentCompany);

onMounted(() => {
  if (auth.isAuthenticated && !auth.company) {
    auth.fetchCompanyProfile();
  }
});

function logout() {
  auth.logout();
  window.location.href = "/signin"; // Redirect after logout
}

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* Same style as before – unchanged */
.sidebar {
  position: fixed;
  padding-left: 0.8rem;
  top: 0;
  left: 0;
  width: 15rem;
  height: 100vh;
  background-color: #f8f8fd;
  border-right: 1px solid #e8eaed;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  overflow-y: auto;
  z-index: 1000;
}
.sidebar.collapsed {
  width: 80px;
}
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 20px 16px;
  border-bottom: 1px solid #e8eaed;
  min-height: 70px;
  background-color: #f8f8fd;
}
.nav-items {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}
.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  margin: 2px 8px;
  font-size: 15px;
  font-weight: 400;
}
.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 12px 8px;
}
.nav-item:hover {
  background-color: #e8eaed;
  color: #4640de;
}
.nav-item.active {
  background-color: #f0f0ff;
  color: #5138ee;
  font-weight: 500;
  border-left: 3px solid #5138ee;
}
.nav-item.active .nav-icon {
  color: #4640de;
}
.nav-icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
  color: #6c757d;
  flex-shrink: 0;
}
.nav-text {
  margin-left: 12px;
  font-size: 15px;
  white-space: nowrap;
}
.nav-section-title {
  padding: 16px 16px 8px;
  font-size: 11px;
  color: #9aa0a6;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.sidebar.collapsed .nav-section-title {
  display: none;
}
.sidebar-footer {
  margin-top: auto;
}
</style>
