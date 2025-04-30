<!-- src/components/settings/AccountSettings.vue -->
<template>
  <div class="settings-container">
    <div class="flex-grow-1 vh-100 overflow-auto">
      <DashboardHeader title="Findjob" />
    
    <div class="tab-content mt-4">
      <ProfileTab v-if="activeTab === 'My Profile'" />
      <LoginDetailsTab v-if="activeTab === 'Login Details'" />
      <NotificationsTab v-if="activeTab === 'Notifications'" />
    </div>
  </div>
  </div>
</template>

<script>
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import ProfileTab from '@/components/Applicants/settings/ProfileTab.vue';
import NotificationsTab from '@/components/Applicants/settings/NotificationsTab.vue';
import LoginDetailsTab from "@/components/Applicants/settings/LoginDetailsTab.vue";

export default {
  name: 'AccountSettings',
  components: {
    ProfileTab,
    LoginDetailsTab,
    NotificationsTab
  },
  data() {
    return {
      tabs: ['My Profile', 'Login Details', 'Notifications'],
      activeTab: 'My Profile'
    };
  },
  methods: {
    changeTab(tabName) {
      this.activeTab = tabName;
    },
    goToHomepage() {
      // Use Vue Router to navigate back to homepage
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.settings-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
}
</style>