<template>
  <div class="activity-item">
    <div class="avatar">
      <img :src="avatar" :alt="user" />
    </div>
    <div class="activity-content">
      <div class="activity-header">
        <span class="user-name">{{ user }}</span>
        <span class="activity-time">{{ formattedTime }}</span>
      </div>
      <p class="activity-description">{{ action }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  user: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  time: {
    type: String, // Maintenant attend un format ISO
    required: true
  }
});

const formattedTime = computed(() => {
  // Convertit la chaîne ISO en objet Date et formate l'heure.
  const date = new Date(props.time);
  // Vérifie si la date est valide avant de la formater
  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Ou une chaîne d'erreur appropriée
  }

  // Si l'activité est d'aujourd'hui, afficher l'heure.
  // Sinon, afficher la date complète.
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // Si la date est différente, afficher la date complète (ex: "26 mai 2025")
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
});
</script>

<style scoped>
.activity-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.activity-item:last-child {
  border-bottom: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activity-content {
  flex: 1;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.user-name {
  font-weight: 500;
  color: #111827;
  font-size: 14px;
}

.activity-time {
  color: #9ca3af;
  font-size: 12px;
}

.activity-description {
  color: #6b7280;
  font-size: 13px;
}
</style>