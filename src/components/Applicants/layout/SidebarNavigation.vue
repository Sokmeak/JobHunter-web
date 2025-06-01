<template>
  <div>
    <div class="sidebar">
      <div class="sidebar-header">
        <PrimaryLogo :context="'/applicant'" />
      </div>

      <div class="nav-items">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="nav-item"
          active-class="active"
          :title="isCollapsed ? item.name : ''"
        >
          <i :class="['bi', `bi-${item.icon}`, 'nav-icon']"></i>
          <span v-if="!isCollapsed" class="nav-text">{{ item.name }}</span>
          <span
            v-if="item.badge && !isCollapsed"
            class="badge rounded-pill bg-primary ms-auto nav-badge"
          >
            {{ item.badge }}
          </span>
          <span
            v-else-if="item.badge && isCollapsed"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary badge-collapsed"
          >
            {{ item.badge }}
          </span>
        </router-link>
      </div>

      <div class="settings-section">
        <div class="settings-header" v-if="!isCollapsed">SETTINGS</div>

        <router-link
          v-for="item in bottomNavigation"
          :key="item.name"
          :to="item.href"
          class="nav-item"
          active-class="active"
          :title="isCollapsed ? item.name : ''"
        >
          <i :class="['bi', `bi-${item.icon}`, 'nav-icon']"></i>
          <span v-if="!isCollapsed" class="nav-text">{{ item.name }}</span>
        </router-link>
      </div>

      <div class="user-profile">
        <!-- User dropdown -->
        <div class="dropup w-100">
          <button
            class="btn btn-user w-100 d-flex align-items-center gap-2 p-3"
            :class="{
              'justify-content-center': isCollapsed,
            }"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="position-relative">
              <img
                v-if="user.avatar"
                :src="user.avatar"
                :alt="user.name"
                class="rounded-circle user-avatar"
              />
              <span v-else class="user-initials">{{ userInitials }}</span>
              <span
                class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white status-indicator"
              ></span>
            </div>
            <div
              v-if="!isCollapsed"
              class="text-start flex-grow-1 overflow-hidden"
            >
              <div class="user-name">{{ user.name }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>
            <i v-if="!isCollapsed" class="bi bi-chevron-up text-muted"></i>
          </button>

          <ul class="dropdown-menu w-100 user-dropdown">
            <li class="dropdown-header">
              <div class="d-flex flex-column">
                <span class="fw-medium">{{ user.name }}</span>
                <span class="small text-muted">{{ user.email }}</span>
              </div>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link
                class="dropdown-item"
                to="/applicant/applicant-settings"
                ><i class="bi bi-person me-2"></i> My Profile</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item"
                to="/applicant/applicant-settings"
                ><i class="bi bi-gear me-2"></i> Settings</router-link
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link class="dropdown-item text-danger" to="/signin">
                <i class="bi bi-box-arrow-right me-2"></i> Log out
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryLogo from "@/components/sharecomponents/PrimaryLogo.vue";
export default {
  name: "SidebarNavigation",
  components: {
    PrimaryLogo,
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        email: "",
        avatar: "",
      }),
    },
    isCollapsed: {
      type: Boolean,
      default: false, // Default to expanded state
    },
  },
  computed: {
    userInitials() {
      if (!this.user.name) return "";
      return this.user.name
        .split(" ")
        .map((n) => n[0])
        .join("");
    },
  },
  emits: ["toggle-collapse"],
  data() {
    return {
      navigation: [
        { name: "Dashboard", href: "/applicant/dashboard", icon: "house" },
        {
          name: "Messages", // This was missing in your original nav
          href: "/applicant/messages",
          icon: "chat",
        },
        {
          name: "My Applications",
          href: "/applicant/my-applications",
          icon: "file-earmark-text",
        },
        { name: "Find Jobs", href: "/applicant/find-jobs", icon: "search" },
        {
          name: "Browse Companies",
          href: "/applicant/BrowseCompany",
          icon: "building",
        },
        {
          name: "Profile",
          href: "/applicant/profile",
          icon: "person",
        },
      ],
      bottomNavigation: [
        {
          name: "Settings",
          href: "/applicant/applicant-settings",
          icon: "gear",
        },
        {
          name: "Help Center",
          href: "/applicant/applicant-help",
          icon: "question-circle",
        },
      ],
    };
  },
  methods: {
    toggleCollapse() {
      this.$emit("toggle-collapse");
    },
    logout() {
      console.log("Logging out...");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
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
  text-decoration: none;
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

.nav-badge {
  color: #4640de;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-collapsed {
  font-size: 10px;
  z-index: 10;
  color: #4640de;
}

.settings-section {
  border-top: 1px solid #e8eaed;
  padding: 16px 0 8px;
  margin-top: auto;
}

.settings-header {
  padding: 0 16px 12px;
  font-size: 11px;
  color: #9aa0a6;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.user-profile {
  border-top: 1px solid #e8eaed;
  padding: 12px;
  background-color: #f8f8fd;
}

.btn-user {
  background-color: transparent;
  border: none;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.btn-user:hover {
  background-color: #f0f0ff;
}

.user-avatar {
  width: 32px;
  height: 32px;
  object-fit: cover;
}
.user-initials {
  width: 32px;
  height: 32px;
  background-color: #4640de;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.status-indicator {
  width: 8px;
  height: 8px;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
  color: #202124;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.user-email {
  font-size: 12px;
  color: #5f6368;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.user-dropdown {
  border: 1px solid #e8eaed;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.user-dropdown .dropdown-item:hover {
  background-color: #f8f8fd;
}

.user-dropdown .dropdown-item.text-danger:hover {
  background-color: #f8f8fd;
  color: #dc2626;
}

/* Ensure content doesn't get hidden behind sidebar */
.main-content {
  margin-left: 15rem;
  transition: margin-left 0.3s ease-in-out;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}
</style>
