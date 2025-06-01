<template>
  <div class="recent-activity">
    <h2 class="section-title">Recent Activity</h2>
    <div class="activity-list">
      <ActivityItem v-for="(activity, index) in filteredActivities" :key="index" :user="activity.user"
        :avatar="activity.avatar" :action="activity.action" :time="activity.time" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import ActivityItem from './ActivityItem.vue';

const selectedDate = inject('selectedDate');

// J'ai mis à jour les dates pour qu'elles correspondent à la date d'aujourd'hui (27 mai 2025)
// En production, ces données viendraient de ton backend avec les dates réelles.
const activities = ref([
  {
    user: 'Jan Mayer',
    avatar: '/placeholder.svg?height=40&width=40',
    action: 'Created a job new posting Senior Reach Developer',
    time: '2025-05-26T09:50:00' // Format ISO
  },
  {
    user: 'Ally Wales',
    avatar: '/placeholder.svg?height=40&width=40',
    action: 'Created a job new posting Senior Reach Developer',
    time: '2025-05-27T10:05:00' // Format ISO
  },
  {
    user: 'James Gardner',
    avatar: '/placeholder.svg?height=40&width=40',
    action: 'Created a job new posting Senior Reach Developer',
    time: '2025-05-26T10:20:00' // Exemple d'une activité d'hier
  },
  {
    user: 'Allison Geidt',
    avatar: '/placeholder.svg?height=40&width=40',
    action: 'Created a job new posting Senior Reach Developer',
    time: '2025-05-27T10:30:00' // Format ISO
  },
  {
    user: 'Ruben Culhane',
    avatar: '/placeholder.svg?height=40&width=40',
    action: 'Created a job new posting Senior Reach Developer',
    time: '2025-05-27T10:45:00' // Format ISO
  },
  {
    user: 'Lydia Diaz',
    avatar: '/placeholder.svg?height=40&width=40',
    action: 'Created a job new posting Senior Reach Developer',
    time: '2025-05-26T11:00:00' // Exemple d'une activité d'hier
  },
  {
    user: 'James Dokidis',
    avatar: '/placeholder.svg?height=40&width=40',
    action: 'Created a job new posting Senior Reach Developer',
    time: '2025-05-27T11:15:00' // Format ISO
  },
  {
    user: 'Angelina Swann',
    avatar: '/placeholder.svg?height=40&width=40',
    action: 'Created a job new posting Senior Reach Developer',
    time: '2025-05-27T11:30:00' // Format ISO
  }
]);

const filteredActivities = computed(() => {
  // Assurez-vous que selectedDate.value est une instance de Date valide.
  // toDateString() compare seulement l'année, le mois et le jour.
  const selected = new Date(selectedDate.value).toDateString();
  return activities.value.filter(activity => {
    // Convertir la chaîne de temps de l'activité en objet Date pour la comparaison
    const activityDate = new Date(activity.time);
    return activityDate.toDateString() === selected;
  });
});
</script>

<style scoped>
.recent-activity {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  height: 100%;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.activity-list {
  display: flex;
  flex-direction: column;
}
</style>