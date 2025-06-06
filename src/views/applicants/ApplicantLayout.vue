<template>
  <div class="applicant-layout">
    <!-- Sidebar -->
    <SidebarNavigation
      :user="user"
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
        :user="user"
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
import SidebarNavigation from "@/components/Applicants/layout/SidebarNavigation.vue";
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";

export default {
  name: "ApplicantLayout",
  components: {
    SidebarNavigation,
    DashboardHeader,
  },
  data() {
    return {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
      },
      pageTitle: "Dashboard",
      showBackButton: false,
      notificationCount: 2,
      isSidebarCollapsed: false, // Set to false to start expanded
      routeTitles: {
        "/applicant/dashboard": "Dashboard",
        "/applicant/messages": "Messages",
        "/applicant/my-applications": "My Applications",
        "/applicant/find-jobs": "Find Jobs",

        // "/applicant/find-jobs/:jobId": "Job Details", // Dynamic route handled in code

        "/applicant/BrowseCompany": "Browse Companies",
        "/applicant/profile": "My Public Profile",
        "/applicant/settings": "Settings",
        "/applicant/help": "Help Center",
      },
    };
  },
  watch: {
    // Watch for route changes to update page title automatically
    $route(to) {
      // Set page title based on route
      if (to.path.startsWith("/applicant/find-jobs/") && to.path.split("/").length === 4) {
        this.pageTitle = "Job Details";
      } else {
        this.pageTitle = this.routeTitles[to.path] || "Dashboard";
      }

      // Determine if back button should be shown based on navigation depth
      // Force showBackButton to true for all routes except dashboard
      this.showBackButton = to.path !== "/applicant/dashboard";

      console.log("Route changed, showBackButton set to:", this.showBackButton);
    },
  },
  mounted() {
    // Load saved sidebar state from localStorage (optional)
    // Comment out if you want it to always start expanded
    // const savedState = localStorage.getItem("sidebarCollapsed");
    // Set initial page title based on current route
    if (this.$route.path.startsWith("/applicant/find-jobs/") && this.$route.path.split("/").length === 4) {
      this.pageTitle = "Job Details";
    } else {
      this.pageTitle = this.routeTitles[this.$route.path] || "Dashboard";
    }
    // }

    // Set initial page title based on current route
    this.pageTitle = this.routeTitles[this.$route.path] || "Dashboard";

    // Set initial back button state
    this.showBackButton = this.$route.path !== "/applicant/dashboard";
    console.log("Initial showBackButton state:", this.showBackButton);

    // Load notifications (simulated)
    this.loadNotifications();
  },
  methods: {
    updatePageTitle(title) {
      this.pageTitle = title;
      // Update document title as well
      document.title = `${title} | Applicant Portal`;
    },

    updateBackButton(show) {
      this.showBackButton = show;
      console.log("updateBackButton called, new value:", show);
    },

    toggleSidebarCollapse() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      // Save state to localStorage (optional)
      localStorage.setItem("sidebarCollapsed", this.isSidebarCollapsed);
    },
    loadNotifications() {
      // Simulated API call to load notifications
      // In a real app, you would fetch this from your backend
      setTimeout(() => {
        // Simulate new notifications arriving
        this.notificationCount = Math.floor(Math.random() * 5);
      }, 2000);
    },
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
  padding: 0 1.5rem;
  flex-direction: column;
  background-color: #ffffff;
  transition: margin-left 0.3s ease-in-out;
  min-width: 0; /* Prevents flex item from overflowing */
}

/* Fixed sidebar states to match actual sidebar widths */
.main-content.sidebar-expanded {
  margin-left: 15rem; /* Match sidebar width: 15rem = 240px */
}

.main-content.sidebar-collapsed {
  margin-left: 80px; /* Match collapsed sidebar width */
}

.content-wrapper {
  flex: 1;
  padding: 24px 24px 24px 0px;
  overflow-y: auto;
  background-color: #ffffff;
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
  // .main-content.sidebar-expanded,
  // .main-content.sidebar-collapsed {
  //   margin-left: 0;
  // }

  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.show {
    transform: translateX(0);
  }
}
</style>
