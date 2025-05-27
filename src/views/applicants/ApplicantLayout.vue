<template>
  <div class="applicant-layout">
    <!-- Sidebar -->
    <SidebarNavigation
      :user="user"
      :is-mobile-menu-open="isMobileMenuOpen"
      :is-collapsed="isSidebarCollapsed"
      @close-mobile-menu="closeMobileMenu"
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
        @toggle-sidebar="toggleSidebar"
        @toggle-collapse="toggleSidebarCollapse"
      />
      <div class="content-wrapper">
        <transition name="fade" mode="out-in">
          <router-view
            @update-page-title="updatePageTitle"
            @update-back-button="updateBackButton"
            :key="$route.fullPath"
          />
        </transition>
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
      isMobileMenuOpen: false,
      isSidebarCollapsed: false,
      routeTitles: {
        "/applicant/dashboard": "Dashboard",
        "/applicant/messages": "Messages",
        "/applicant/my-applications": "My Applications",
        "/applicant/find-jobs": "Find Jobs",
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
      this.pageTitle = this.routeTitles[to.path] || "Dashboard";

      // Determine if back button should be shown based on navigation depth
      // Force showBackButton to true for all routes except dashboard
      this.showBackButton = to.path !== "/applicant/dashboard";

      console.log("Route changed, showBackButton set to:", this.showBackButton);

      // Close mobile menu when route changes
      if (this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    },
  },
  mounted() {
    // Load saved sidebar state from localStorage
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      this.isSidebarCollapsed = savedState === "true";
    }

    // Set initial page title based on current route
    this.pageTitle = this.routeTitles[this.$route.path] || "Dashboard";

    // Set initial back button state
    this.showBackButton = this.$route.path !== "/applicant/dashboard";
    console.log("Initial showBackButton state:", this.showBackButton);

    // Add event listener for screen size changes
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    // Load notifications (simulated)
    this.loadNotifications();
  },
  beforeUnmount() {
    // Remove event listener
    window.removeEventListener("resize", this.handleResize);
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

    toggleSidebar() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },

    toggleSidebarCollapse() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      // Save state to localStorage
      localStorage.setItem("sidebarCollapsed", this.isSidebarCollapsed);
    },

    handleResize() {
      // Auto-close mobile menu on larger screens
      if (window.innerWidth >= 992 && this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
      }
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

/* Sidebar states */
.main-content.sidebar-expanded {
  margin-left: 220px;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}

.content-wrapper {
  flex: 1;
  padding: 24px;
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

/* Mobile responsiveness */
@media (max-width: 991.98px) {
  .main-content.sidebar-expanded,
  .main-content.sidebar-collapsed {
    margin-left: 0 !important;
  }
}
</style>
