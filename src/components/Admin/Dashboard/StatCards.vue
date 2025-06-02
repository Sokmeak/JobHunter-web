<template>
  <div class="stat-cards">
    <StatCard
      v-for="card in statCards"
      :key="card.id"
      :title="card.title"
      :value="card.value"
      :change="card.change"
      :change-text="card.changeText"
      :change-type="card.changeType"
      :icon="card.icon"
      :status="
        card.change === 0
          ? 'neutral'
          : card.change > 0
          ? 'increase'
          : 'decrease'
      "
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import StatCard from "./StatCard.vue";
import { Users, Briefcase, Flag, TicketIcon } from "lucide-vue-next";

const statCards = ref([
  {
    id: "total-users",
    title: "Total Users",
    value: "10,376",
    change: 5,

    changeText: " from last month",
    changeType: "positive",
    icon: Users,
  },
  {
    id: "active-listings",
    title: "Active Job Listings",
    value: "1,376",
    change: 5,

    changeText: " from last month",
    changeType: "positive",
    icon: Briefcase,
  },
  {
    id: "reported-content",
    title: "Reported Content",
    value: "76",
    change: 5,

    changeText: " from last month",
    changeType: "warning",
    icon: Flag,
  },
  {
    id: "support-tickets",
    title: "Support Tickets",
    value: "376",
    change: 0,

    changeText: " from last month",
    changeType: "neutral",
    icon: TicketIcon,
  },
]);
</script>

<style scoped>
.stat-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
</style>
