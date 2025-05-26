<template>
  <main class="main-content">
    <DashboardHeader />
    <div class="dashboard-grid">
      <StatCards />
      <div class="dashboard-sections">
        <RecentActivity />
        <PendingApprovals />
      </div>
    </div>
  </main>
</template>

<script setup>
import { provide } from "vue";
import DashboardHeader from "@/components/Admin/DashboardHeader.vue";
import StatCards from "@/components/Admin/StatCards.vue";
import RecentActivity from "@/components/Admin/RecentActivity.vue";
import PendingApprovals from "@/components/Admin/PendingApprovals.vue";

// Shared data that could be used by multiple components
const dashboardData = {
  username: "Admin",
  today: new Date().toLocaleDateString(),
};

provide("dashboardData", dashboardData);
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}

.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  flex: 1;
  padding: 1rem 1rem;
  overflow-y: auto;
}

.dashboard-grid {
  margin-top: 20px;
}

.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 1024px) {
  .dashboard-sections {
    grid-template-columns: 1fr;
  }
}
</style>
