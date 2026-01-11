<template>
  <div class="app-layout d-flex">
    <!-- Sidebar -->
    <Sidebar :is-collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <!-- Main Content -->
    <div
      class="main-content flex-grow-1"
      :class="{ 'sidebar-collapsed': sidebarCollapsed }"
    >
      <!-- Top Navigation -->
      <TopNavigation
        @toggle-sidebar="toggleSidebar"
        @toggle-notifications="toggleNotifications"
        @toggle-profile="toggleProfile"
      />

      <!-- Page Content -->
      <main class="page-content p-4">
        <router-view />
      </main>
    </div>

    <!-- Notifications Panel -->
    <div
      v-if="showNotifications"
      class="notifications-panel position-fixed top-0 end-0 h-100 bg-white shadow-lg"
      style="width: 400px; z-index: 1050"
    >
      <div class="p-4 border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0 fw-bold">Notifications</h5>
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="toggleNotifications"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
      <div class="p-4">
        <div class="notification-item mb-3 p-3 border rounded">
          <div class="d-flex align-items-start">
            <div
              class="notification-icon bg-primary-subtle text-primary rounded-circle me-3 p-2"
            >
              <i class="bi bi-person-plus"></i>
            </div>
            <div>
              <h6 class="mb-1">New Application</h6>
              <p class="text-muted small mb-1">
                Jake Gyll applied for Senior Frontend Developer
              </p>
              <small class="text-muted">2 minutes ago</small>
            </div>
          </div>
        </div>

        <div class="notification-item mb-3 p-3 border rounded">
          <div class="d-flex align-items-start">
            <div
              class="notification-icon bg-success-subtle text-success rounded-circle me-3 p-2"
            >
              <i class="bi bi-calendar-check"></i>
            </div>
            <div>
              <h6 class="mb-1">Interview Scheduled</h6>
              <p class="text-muted small mb-1">
                Interview with Sarah Johnson at 2:00 PM
              </p>
              <small class="text-muted">1 hour ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Panel -->
    <div
      v-if="showProfile"
      class="profile-panel position-fixed top-0 end-0 h-100 bg-white shadow-lg"
      style="width: 350px; z-index: 1050"
    >
      <div class="p-4 border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0 fw-bold">Profile</h5>
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="toggleProfile"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
      <div class="p-4">
        <div class="text-center mb-4">
          <img
            :src="placeholder"
            alt="Profile"
            class="rounded-circle mb-3"
            style="width: 80px; height: 80px"
          />
          <h5 class="mb-1">John Doe</h5>
          <p class="text-muted">HR Manager</p>
        </div>

        <div class="d-grid gap-2">
          <router-link
            to="/company/settings"
            class="btn btn-outline-primary"
            @click="toggleProfile"
          >
            <i class="bi bi-gear me-2"></i>Settings
          </router-link>
          <button class="btn btn-outline-secondary">
            <i class="bi bi-person me-2"></i>Edit Profile
          </button>
          <button class="btn btn-outline-danger">
            <i class="bi bi-box-arrow-right me-2"></i>Sign Out
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div
      v-if="showNotifications || showProfile"
      class="overlay position-fixed top-0 start-0 w-100 h-100"
      style="background-color: rgba(0, 0, 0, 0.3); z-index: 1040"
      @click="closeAllPanels"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import TopNavigation from "./TopNavigation.vue";
import placeholder from "@/assets/images/placeholder.svg";

const sidebarCollapsed = ref(false);
const showNotifications = ref(false);
const showProfile = ref(false);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  showProfile.value = false;
};

const toggleProfile = () => {
  showProfile.value = !showProfile.value;
  showNotifications.value = false;
};

const closeAllPanels = () => {
  showNotifications.value = false;
  showProfile.value = false;
};
</script>

<style scoped>
.main-content {
  transition: margin-left 0.3s ease;
  margin-left: 280px;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}

.page-content {
  min-height: calc(100vh - 80px);
  background-color: #f8fafc;
}

.notifications-panel,
.profile-panel {
  transition: transform 0.3s ease;
  border-left: 1px solid #e2e8f0;
}

.notification-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }

  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>
