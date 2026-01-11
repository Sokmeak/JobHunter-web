<template>
  <div class="container py-2 sidebar">
    <div class="admin-content">
      <PrimaryLogo :context="'/admin'" />

      <nav class="nav-menu">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <router-link :to="item.path" class="nav-link">
              <component :is="item.icon" class="nav-icon" />
              <span>{{ item.label }}</span>
              <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
            </router-link>
          </li>
        </ul>

        <div class="nav-section-title">SETTINGS</div>
        <ul>
          <li v-for="item in settingsItems" :key="item.id">
            <router-link :to="item.path" class="nav-link">
              <component :is="item.icon" class="nav-icon" />
              <span>{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-info">
          <div class="user-avatar-container">
            <img
              v-if="adminUser.avatar"
              :src="adminUser.avatar"
              :alt="adminUser.name"
              class="user-avatar"
            />
            <div v-else class="user-initials">{{ userInitials }}</div>
            <div class="status-indicator"></div>
          </div>
          <div class="user-details">
            <div class="user-name">{{ adminUser.name }}</div>
            <div class="user-role">{{ adminUser.role }}</div>
          </div>
        </div>
      </div>

      <button class="logout-button" @click="logout">
        <LogOut class="logout-icon" />
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import PrimaryLogo from "@/components/sharecomponents/PrimaryLogo.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  Bell,
  Shield,
} from "lucide-vue-next";

const router = useRouter();

// Admin user data - this would typically come from a store or API
const adminUser = ref({
  name: "Admin User",
  role: "Super Admin",
  avatar: "", // Add avatar URL if available
});

const navItems = ref([
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/admindashboard",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    path: "/admin/users",
    badge: 12, // Example: number of pending user approvals
  },
  {
    id: "content",
    label: "Content",
    icon: FileText,
    path: "/admin/content",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2,
    path: "/admin/analytics",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
    badge: 5, // Example: unread notifications
  },
]);

const settingsItems = ref([
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
]);

const userInitials = computed(() => {
  if (!adminUser.value.name) return "A";
  return adminUser.value.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});

const logout = () => {
  // Implement logout functionality
  // For example: clear token, user data, etc.
  // localStorage.removeItem('adminToken');
  router.push("/admin/login");
};
</script>

<style scoped>
.admin-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.sidebar {
  width: 17rem;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

.nav-menu {
  width: 100%;
  padding: 1rem 0;
}

.nav-section-title {
  padding: 0 20px;
  margin: 20px 0 10px;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.nav-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
  border-radius: 6px;
  margin: 0 10px;
  position: relative;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.router-link-active {
  background-color: #f0f0ff;
  color: #4f46e5;
  font-weight: 500;
}

.nav-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  flex-shrink: 0;
}

.nav-badge {
  background-color: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: auto;
  min-width: 18px;
  text-align: center;
}

.sidebar-footer {
  width: 100%;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}

.user-profile {
  margin-bottom: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #f3f4f6;
}

.user-avatar-container {
  position: relative;
  margin-right: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.user-initials {
  width: 40px;
  height: 40px;
  background-color: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid #e5e7eb;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
  color: #111827;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.logout-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: none;
  background: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
}

.logout-button:hover {
  background-color: #fee2e2;
  transform: translateY(-1px);
}

.logout-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
</style>
