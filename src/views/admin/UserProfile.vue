<template>
  <div class="user-profile">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Users Management</h1>
        <p class="page-subtitle">Manage user accounts, verify users and handle suspensions</p>
      </div>
      <button class="finish-review-btn">
        <Clock class="btn-icon" />
        Finish Review
      </button>
    </div>

    <div class="profile-section">
      <div class="section-header">
        <h2 class="section-title">View Detail Info</h2>
      </div>

      <div class="profile-content">
        <template v-if="userStore.loading">
          <p>Chargement du profil utilisateur...</p>
        </template>
        <template v-else-if="userStore.error">
          <p class="error-message">Erreur : {{ userStore.error }}</p>
        </template>
        <template v-else-if="userStore.selectedProfile">
          <div class="profile-block">
            <UserProfileCard :user="userStore.selectedProfile" />
          </div>
          <div class="profile-block">
            <UserAboutSection :about="userStore.selectedProfile.about" />
          </div>
          <div class="profile-block">
            <UserExperienceSection :experiences="userStore.selectedProfile.experiences" />
          </div>
          <div class="profile-block">
            <UserEducationSection :educations="userStore.selectedProfile.education" />
          </div>
          <div class="profile-block">
            <UserSkillsSection :skills="userStore.selectedProfile.skills" />
          </div>
          <div class="profile-block">
            <UserPortfolioSection :portfolios="userStore.selectedProfile.portfolios" />
          </div>
        </template>
        <template v-else>
          <p>Profil utilisateur non trouvé.</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'; // Pas besoin de 'ref' pour userProfile car il vient du store
import { useRoute } from 'vue-router';
import { Clock } from 'lucide-vue-next';

// Importez vos composants enfants
import UserProfileCard from '@/components/Admin/Users/UserProfileCard.vue';
import UserAboutSection from '@/components/Admin/Users/UserAboutSection.vue';
import UserExperienceSection from '@/components/Admin/Users/UserExperienceSection.vue';
import UserEducationSection from '@/components/Admin/Users/UserEducationSection.vue';
import UserSkillsSection from '@/components/Admin/Users/UserSkillsSection.vue';
import UserPortfolioSection from '@/components/Admin/Users/UserPortfolioSection.vue';

// Importez votre store Pinia
import { useUserProfileStore } from '@/stores/ApplicantStore/userProfile'; // Assurez-vous que le chemin est correct

const route = useRoute();
const userStore = useUserProfileStore(); // Initialisez votre store

// Fonction pour charger le profil utilisateur
const loadUserProfile = async () => {
  // route.params.id est une chaîne, mais votre store attend un nombre (userId)
  const userId = parseInt(route.params.id, 10);
  if (isNaN(userId)) {
    userStore.error = "ID utilisateur invalide dans l'URL.";
    userStore.selectedProfile = null; // Réinitialiser le profil pour éviter d'afficher d'anciennes données
    console.error("Invalid user ID in URL:", route.params.id);
    return;
  }
  await userStore.fetchProfileByUserId(userId);
};

// Charge le profil dès que le composant est monté
onMounted(() => {
  loadUserProfile();
});

// Surveille les changements de l'ID dans la route et recharge le profil si l'ID change
watch(() => route.params.id, async (newId, oldId) => {
  if (newId !== oldId) {
    console.log(`Route ID changed from ${oldId} to ${newId}. Reloading profile.`);
    await loadUserProfile();
  }
}, { immediate: true }); // 'immediate: true' exécute le watcher une fois au montage aussi

</script>

<style scoped>
/* Votre CSS reste inchangé */
.user-profile {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.finish-review-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.finish-review-btn:hover {
  background-color: #4338ca;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-block {
  border: 1px solid #e5e7eb; /* gris clair */
  border-radius: 8px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.section-header {
  padding: 16px 24px;
  background-color: #f8f9ff;
  border-radius: 8px;
  border: 1px solid #e0e7ff;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #4f46e5;
  margin: 0;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .finish-review-btn {
    align-self: flex-start;
  }
}
</style>