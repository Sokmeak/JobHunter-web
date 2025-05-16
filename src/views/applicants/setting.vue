<template>
  <div class="sd-flex">
    <!-- Header -->
    <div class="flex-grow-1 vh-100 overflow-auto">
      <DashboardHeader title="Setting" />

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-4">
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

export default {
  name: "SettingsPage",
  components: {
  DashboardHeader,
  NotificationSettings,
  ProfileSetting,
  LoginSettings
  
  },
  data() {
    return {
      activeTab: "profile",
      user: {
        fullName: "Jake Gyll",
        email: "jakegyll@email.com",
        phone: "+44 1245 572 135",
        dateOfBirth: "09/08/1997",
        gender: "Male",
        accountType: "jobSeeker",
        profilePhoto: null,
      },
      notifications: {
        applications: true,
        jobs: false,
        recommendations: false,
      },
    };
  },
  methods: {
    saveProfile(profileData) {
      // Handle profile save
      console.log("Saving profile:", profileData);
      // API call would go here
    },
    updateEmail(newEmail) {
      // Handle email update
      console.log("Updating email to:", newEmail);
      // API call would go here
    },
    changePassword(passwordData) {
      // Handle password change
      console.log("Changing password");
      // API call would go here
    },
    updateNotifications(notificationSettings) {
      // Handle notification settings update
      console.log("Updating notifications:", notificationSettings);
      this.notifications = notificationSettings;
      // API call would go here
    },
  },
   
};
</script>

<style scoped>
.settings-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
}

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
