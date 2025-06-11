<template>
  <div class="applicant-layout">
    <!-- Sidebar -->
    <SidebarNavigation
      :user="selectedProfile"
      :is-collapsed="isSidebarCollapsed"
      @toggle-collapse="toggleSidebarCollapse"
    />

    <!-- Main Content -->
    <div
      class="main-content"
      :class="{
        'sidebar-collapsed': isSidebarCollapsed,
        'sidebar-expanded': !isSidebarCollapsed,
      }"
    >
      <DashboardHeader
        :title="pageTitle"
        :show-back-button="showBackButton"
        :notification-count="notificationCount"
        :user="selectedProfile"
        @toggle-collapse="toggleSidebarCollapse"
      />
      <div class="content-wrapper">
        <router-view
          v-slot="{ Component }"
          @update-page-title="updatePageTitle"
          @update-back-button="updateBackButton"
        >
          <transition name="fade" mode="out-in">
            <component
              :is="Component"
              :key="$route.fullPath"
              @update-page-title="updatePageTitle"
              @update-back-button="updateBackButton"
            />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router"; // Import useRoute
import SidebarNavigation from "@/components/Applicants/layout/SidebarNavigation.vue";
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";

export default {
  name: "ApplicantLayout",
  components: {
    SidebarNavigation,
    DashboardHeader,
  },
  setup() {
    // Use Pinia store for user profile
    const userProfileStore = useUserProfileStore();
    const selectedProfile = computed(() => userProfileStore.selectedProfile);

    // Reactive state
    const pageTitle = ref("Dashboard");
    const showBackButton = ref(false);
    const notificationCount = ref(0);
    const isSidebarCollapsed = ref(false); // Start expanded

    // Route titles mapping
    const routeTitles = {
      "/applicant/dashboard": "Dashboard",
      "/applicant/messages": "Messages",
      "/applicant/my-applications": "My Applications",
      "/applicant/find-jobs": "Find Jobs",
      "/applicant/BrowseCompany": "Browse Companies",
      "/applicant/profile": "My Public Profile",
      "/applicant/settings": "Settings",
      "/applicant/help": "Help Center",
    };

    // Watch for route changes to update page title and back button
    const route = useRoute(); // Access current route
    watch(
      () => route.path,
      (newPath) => {
        if (newPath.startsWith("/applicant/find-jobs/")) {
          pageTitle.value = "Job Details";
        } else if (newPath.startsWith("/applicant/BrowseCompany/")) {
          pageTitle.value = "Company Profile";
        } else {
          pageTitle.value = routeTitles[newPath] || "Applicant Portal";
        }
        showBackButton.value = newPath !== "/applicant/dashboard";
      },
      { immediate: true }
    );

    // Methods
    const updatePageTitle = (title) => {
      pageTitle.value = title;
      document.title = `${title} | Applicant Portal`;
    };

    const updateBackButton = (show) => {
      showBackButton.value = show;
    };

    const toggleSidebarCollapse = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };

    const loadNotifications = () => {
      // Simulated API call to load notifications
      setTimeout(() => {
        notificationCount.value = Math.floor(Math.random() * 5);
      }, 2000);
    };

    // Initialize notifications
    loadNotifications();

    return {
      selectedProfile,
      userProfileStore,
      pageTitle,
      showBackButton,
      notificationCount,
      isSidebarCollapsed,
      updatePageTitle,
      updateBackButton,
      toggleSidebarCollapse,
      loadNotifications,
    };
  },
};
</script>

<style lang="scss" scoped>
.applicant-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  background-color: #ffffff;
  transition: margin-left 0.3s ease-in-out;
  min-width: 0; /* Prevents flex item from overflowing */
}

.main-content.sidebar-expanded {
  margin-left: 240px; /* Match sidebar width */
}

.main-content.sidebar-collapsed {
  margin-left: 80px; /* Match collapsed sidebar width */
}

.content-wrapper {
  flex: 1;
  padding: 24px 24px 24px 0;
  overflow-y: auto;

}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  // .main-content {
  //   margin-left: 0 !important; /* Override sidebar margins on mobile */
  // }

  .content-wrapper {
    padding: 16px; /* Reduced padding for mobile */
  }
}
</style>