<template>
  <div class="d-flex">
    <div class="container py-4">
      <!-- Loading State -->
      <div v-if="userProfileStore.loading" class="text-center">
        <p>Loading settings...</p>
      </div>
      <!-- Error State -->
      <div v-else-if="userProfileStore.error" class="alert alert-danger">
        {{ userProfileStore.error }}
      </div>
      <!-- Tabs -->
      <ul v-else class="nav nav-tabs mb-4">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'profile' }"
            @click.prevent="activeTab = 'profile'"
            href="#"
          >
            My Profile
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'login' }"
            @click.prevent="activeTab = 'login'"
            href="#"
          >
            Login Details
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'notifications' }"
            @click.prevent="activeTab = 'notifications'"
            href="#"
          >
            Notifications
          </a>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="tab-pane fade show active">
          <ProfileSetting :user="user" @save="saveProfile" />
        </div>

        <!-- Login Details Tab -->
        <div v-if="activeTab === 'login'" class="tab-pane fade show active">
          <login-settings
            :user="user"
            @update-email="updateEmail"
            @change-password="changePassword"
          />
        </div>

        <!-- Notifications Tab -->
        <div
          v-if="activeTab === 'notifications'"
          class="tab-pane fade show active"
        >
          <notification-settings
            :notifications="notifications"
            @update="updateNotifications"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import LoginSettings from "@/components/Applicants/settings/LoginSettings.vue";
import NotificationSettings from "@/components/Applicants/settings/NotificationSettings.vue";
import ProfileSetting from "@/components/Applicants/settings/ProfileSetting.vue";

import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";
import {  ref } from "vue";

export default {
  name: "SettingsPage",
  components: {
    DashboardHeader,
    NotificationSettings,
    ProfileSetting,
    LoginSettings,
  },
  setup() {
    const userProfileStore = useUserProfileStore();
    const errorMessage = ref(null); // Added for user feedback
    return { userProfileStore, errorMessage };
  },
  data() {
    return {
      activeTab: "profile",
    };
  },
  computed: {
    user() {
      const profile = this.userProfileStore.selectedProfile;
      return profile
        ? {
            fullName: profile.name,
            email: profile.email,
            phone: profile.phone || "Not specified",
            dateOfBirth: profile.dateOfBirth || "",
            gender: profile.gender || "",
            accountType: profile.accountType || "jobSeeker",
            profilePhoto: profile.profileImage || null,
          }
        : {
            fullName: "Loading...",
            email: "",
            phone: "",
            dateOfBirth: "",
            gender: "",
            accountType: "jobSeeker",
            profilePhoto: null,
          };
    },
    notifications() {
      return this.userProfileStore.notifications || {
        applications: true,
        jobs: false,
        recommendations: false,
      };
    },
    isLoading() {
      return this.userProfileStore.loading;
    },
  },
  methods: {
    async saveProfile(profileData) {
      errorMessage.value = null;
      try {
        const success = await this.userProfileStore.updateProfile({
          name: profileData.fullName,
          email: profileData.email, // Handle email updates here
          phone: profileData.phone,
          dateOfBirth: profileData.dateOfBirth,
          gender: profileData.gender,
          profileImage: profileData.profilePhoto,
        });
        if (!success) {
          errorMessage.value = this.userProfileStore.error || "Failed to save profile";
        }
      } catch (error) {
        errorMessage.value = "Failed to save profile. Please try again.";
        console.error("Failed to save profile:", error);
      }
    },
    async changePassword(passwordData) {
      errorMessage.value = null;
      try {
        const success = await this.userProfileStore.changePassword(passwordData);
        if (!success) {
          errorMessage.value = this.userProfileStore.error || "Failed to change password";
        }
      } catch (error) {
        errorMessage.value = "Failed to change password. Please try again.";
        console.error("Failed to change password:", error);
      }
    },
    async updateNotifications(notificationSettings) {
      errorMessage.value = null;
      try {
        const success = await this.userProfileStore.updateNotifications(notificationSettings);
        if (!success) {
          errorMessage.value = this.userProfileStore.error || "Failed to update notifications";
        }
      } catch (error) {
        errorMessage.value = "Failed to update notifications. Please try again.";
        console.error("Failed to update notifications:", error);
      }
    },
  },
  async mounted() {
    if (!this.userProfileStore.selectedProfile) {
      await this.userProfileStore.fetchProfile();
      if (this.userProfileStore.error) {
        errorMessage.value = this.userProfileStore.error;
      }
    }
    await this.userProfileStore.fetchNotifications();
    if (this.userProfileStore.error) {
      errorMessage.value = this.userProfileStore.error;
    }
  },
};
</script>

<style lang="scss" scoped>
.nav-tabs .nav-link {
  color: #495057;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  position: relative;
}

.nav-tabs .nav-link.active {
  color: #6366f1;
  background-color: transparent;
  font-weight: 500;
  border: none;
}

.nav-tabs .nav-link.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #6366f1;
}

.btn-outline-primary {
  color: #6366f1;
  border-color: #6366f1;
}

.btn-outline-primary:hover {
  background-color: #6366f1;
  color: white;
}

.btn-primary {
  background-color: #6366f1;
  border-color: #6366f1;
}

.btn-primary:hover {
  background-color: #5253cc;
  border-color: #5253cc;
}
</style>