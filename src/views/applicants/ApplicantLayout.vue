<template>
  <div class="applicant-layout">
    <!-- Sidebar -->
    <SidebarNavigation
      :user="userProfile"
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
        :user="userProfile"
        @toggle-collapse="toggleSidebarCollapse"
      />
      <div class="content-wrapper">
        <!-- Display loading or error states if needed -->
        <div v-if="loading" class="loading">Loading profile...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <router-view
          v-else
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
import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";
 // Import auth store if needed

export default {
  name: "ApplicantLayout",
  components: {
    SidebarNavigation,
    DashboardHeader,
  },
  setup() {
    // Initialize stores
    const userProfileStore = useUserProfileStore();
    // const authStore = useAuthStore(); // Optional: for auth checks
    return { userProfileStore };
  },
  data() {
    return {
      pageTitle: "Dashboard",
      showBackButton: false,
      notificationCount: 2,
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
  computed: {
    userProfile() {
      // Map store's selectedProfile to the expected user object format
      const profile = this.userProfileStore.selectedProfile;
      return profile
        ? {
            name: profile.name,
            email: profile.email,
            avatar: profile.profileImage || "https://v0.dev/placeholder.svg?height=40&width=40",
          }
        : {
            name: "Loading...",
            email: "",
            avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
          };
    },
    loading() {
      return this.userProfileStore.loading;
    },
    error() {
      return this.userProfileStore.error;
    },
  },
  watch: {
    // Watch for route changes to update page title
    $route(to) {
      if (to.path.startsWith("/applicant/find-jobs/") && to.path.split("/").length === 4) {
        this.pageTitle = "Job Details";
      } else {
        this.pageTitle = this.routeTitles[to.path] || "Dashboard";
      }
      this.showBackButton = to.path !== "/applicant/dashboard";
      console.log("Route changed, showBackButton set to:", this.showBackButton);
    },
  },
  async mounted() {
    // Set initial page title and back button state
    if (this.$route.path.startsWith("/applicant/find-jobs/") && this.$route.path.split("/").length === 4) {
      this.pageTitle = "Job Details";
    } else {
      this.pageTitle = this.routeTitles[this.$route.path] || "Dashboard";
    }
    this.showBackButton = this.$route.path !== "/applicant/dashboard";
    console.log("Initial showBackButton state:", this.showBackButton);

    // Load notifications (simulated)
    this.loadNotifications();

    // Fetch user profile
    await this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      // Check if user is authenticated
      // if (!this.authStore.isLoggedIn) {
      //   console.warn("User not authenticated, cannot fetch profile");
      //   this.userProfileStore.error = "Please log in to view your profile";
      //   this.$router.push("/login"); // Redirect to login if not authenticated
      //   return;
      // }

      // Fetch the authenticated user's profile
      await this.userProfileStore.fetchProfile();
    },
    updatePageTitle(title) {
      this.pageTitle = title;
      document.title = `${title} | Applicant Portal`;
    },
    updateBackButton(show) {
      this.showBackButton = show;
      console.log("updateBackButton called, new value:", show);
    },
    toggleSidebarCollapse() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      localStorage.setItem("sidebarCollapsed", this.isSidebarCollapsed);
    },
    loadNotifications() {
      setTimeout(() => {
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
  min-width: 0;
}

.main-content.sidebar-expanded {
  margin-left: 15rem;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}

.content-wrapper {
  flex: 1;
  padding: 24px 24px 24px 0px;
  overflow-y: auto;
  background-color: #ffffff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading,
.error {
  padding: 24px;
  text-align: center;
  color: #333;
}

.error {
  color: #d32f2f;
}

@media (max-width: 768px) {
  .main-content.sidebar-expanded,
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }

  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.show {
    transform: translateX(0);
  }
}
</style>