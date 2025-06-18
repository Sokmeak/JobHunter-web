<template>
  <div class="settings">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="fw-bold mb-1">Settings</h2>
      <p class="text-muted mb-0">
        Manage your account settings and preferences
      </p>
    </div>

    <div class="row">
      <!-- Settings Navigation -->
      <div class="col-lg-3">
        <div class="card">
          <div class="list-group list-group-flush">
            <router-link
              v-for="item in settingsMenu"
              :key="item.path"
              :to="item.path"
              class="list-group-item list-group-item-action border-0 d-flex align-items-center"
              :class="{ active: isActiveRoute(item.path) }"
            >
              <i :class="item.icon + ' me-2'"></i>
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="col-lg-9">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "Settings",
  setup() {
    const route = useRoute();

    const settingsMenu = [
      {
        name: "Company Profile",
        path: "/company/settings/profile",
        icon: "bi bi-building",
      },
      {
        name: "Account Settings",
        path: "/company/settings/account",
        icon: "bi bi-person-gear",
      },
      {
        name: "Team Management",
        path: "/company/settings/team",
        icon: "bi bi-people",
      },
      {
        name: "Billing & Plans",
        path: "/company/settings/billing",
        icon: "bi bi-credit-card",
      },
      {
        name: "Notifications",
        path: "/company/settings/notifications",
        icon: "bi bi-bell",
      },
      {
        name: "Security",
        path: "/company/settings/security",
        icon: "bi bi-shield-check",
      },
      {
        name: "Integrations",
        path: "/company/settings/integrations",
        icon: "bi bi-plug",
      },
      { name: "API Keys", path: "/company/settings/api", icon: "bi bi-key" },
    ];

    const isActiveRoute = (path) => route.path === path;

    return {
      settingsMenu,
      isActiveRoute,
    };
  },
};
</script>

<style scoped>
.list-group-item.active {
  background-color: #4640de;
  border-color: #4640de;
  color: white;
}

.list-group-item:hover:not(.active) {
  background-color: #f8f9fa;
}

.list-group-item {
  transition: all 0.2s ease;
}
</style>
