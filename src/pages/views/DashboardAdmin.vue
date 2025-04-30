<template class="dashboardadmin">
  <div class="dashboard-header">
    <div class="left">
      <h1>Dashboard</h1>
      <p>Welcome back, Admin! Here is what's happening on <strong>JobHunter</strong> today.</p>
    </div>
    <div class="right">
      <ActionButton label="Today" />
      <ActionButton label="Refresh" />
      <ActionButton label="Export" />
    </div>
  </div>
  
  <div class="stats-wrapper">
    <StatCard title="Total Users" value="10,376" change="+5% from last month" changeType="positive" />
    <StatCard title="Active Job Listings" value="1,376" change="-5% from last month" changeType="positive" />
    <StatCard title="Reported Content" value="76" change="5 high priority" changeType="negative" />
    <StatCard title="Support Tickets" value="376" change="3 unassigned" changeType="neutral" />
  </div>
  
  <!-- Ajout d'un conteneur flex pour les deux composants -->
  <div class="content-wrapper">
    <RecentActivities />
    <PendingApprovals />
  </div>
</template>

<script>
import StatCard from '@/components/StatCard.vue'
import ActionButton from '@/components/ActionButton.vue'
import RecentActivities from '@/components/RecentActivities.vue'
import PendingApprovals from '@/components/PendingApprovals.vue';

export default {
  components: {
    StatCard,
    ActionButton,
    RecentActivities,
    PendingApprovals,
  }
}
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
}

.left h1 {
  margin: 0;
  font-size: 24px;
}

.left p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
}

.right {
  display: flex;
  gap: 10px;
}

.stats-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px;
  flex-wrap: wrap;
}

/* Ajout du style pour le conteneur des composants RecentActivities et PendingApprovals */
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px;
}

/* Responsive: sur les écrans plus larges, afficher les composants côte à côte */
@media (min-width: 1024px) {
  .content-wrapper {
    flex-direction: row;
  }
  
  .content-wrapper > * {
    flex: 1;
    min-width: 0; /* Pour éviter le débordement */
  }
}
</style>