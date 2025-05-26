<template>
    <div>
      <DashboardHeader />
      <div class="dashboard-grid">
        <StatCards />
        <div class="dashboard-sections">
          <RecentActivity />
          <PendingApprovals />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import DashboardHeader from '../components/DashboardHeader.vue';
  import StatCards from '../components/StatCards.vue';
  import RecentActivity from '../components/RecentActivity.vue';
  import PendingApprovals from '../components/PendingApprovals.vue';
  </script>
  
  <style scoped>
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