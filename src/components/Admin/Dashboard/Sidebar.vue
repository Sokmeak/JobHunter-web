<template>
  <div class="container py-2 sidebar">
    <!-- <div class="logo-container">
        <router-link to="/" class="logo">
          <div class="logo-icon"></div>
          <span class="logo-text">JobHunter</span>
        </router-link>
      </div> -->
    <div class="admin-content">
      <PrimaryLogo :context="'/admin'" />

      <nav class="nav-menu">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <router-link :to="item.path" class="nav-link">
              <component :is="item.icon" class="nav-icon" />
              <span>{{ item.label }}</span>
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
import { ref, onMounted } from "vue";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-vue-next";

const router = useRouter();

const navItems = ref([
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/admindashboard",
  },
  { id: "users", label: "Users", icon: Users, path: "/admin/users" },
  { id: "content", label: "Content", icon: FileText, path: "/admin/content" },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2,
    path: "/admin/analytics",
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

const logout = () => {
  // Implement logout functionality
  // For example: clear token, user data, etc.
  // localStorage.removeItem('token');
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
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: none;
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
}

.nav-menu ul {
  list-style: none;
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
}

.nav-link:hover {
  background-color: #f3f4f6;
}

.router-link-active {
  background-color: #f0f0ff;
  color: #4f46e5;
}

.nav-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
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
}

.logout-button:hover {
  background-color: #fee2e2;
}

.logout-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
</style>
