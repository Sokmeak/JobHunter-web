<template>
  <div class="sidebar">
    <div class="d-flex align-items-center p-3 mb-3">
      <PrimaryLogo />
    </div>
    <div class="nav-items">
      <router-link to="/applicant/dashboard" class="nav-item" active-class="active">
        <i class="bi bi-house"></i>
        <span>Dashboard</span>
      </router-link>
      
      <router-link to="/applicant/messages" class="nav-item" active-class="active">
        <i class="bi bi-chat"></i>
        <span>Messages</span>
        <span class="badge rounded-pill bg-primary ms-auto">1</span>
      </router-link>
      
      <router-link to="/applicant/my-applications" class="nav-item" active-class="active">
        <i class="bi bi-file-earmark-text"></i>
        <span>My Applications</span>
      </router-link>
      
      <router-link to="/applicant/find-jobs" class="nav-item" active-class="active">
        <i class="bi bi-search"></i>
        <span>Find Jobs</span>
      </router-link>
      
      <router-link to="/applicant/BrowseCompany" class="nav-item" active-class="active">
        <i class="bi bi-building"></i>
        <span>Browse Companies</span>
      </router-link>
      
      <router-link to="/applicant/profile" class="nav-item" active-class="active">
        <i class="bi bi-person"></i>
        <span>My Public Profile</span>
      </router-link>
    </div>
    
    <div class="settings-section">
      <div class="settings-header">SETTINGS</div>
      
      <router-link to="/applicant/settings" class="nav-item" active-class="active">
        <i class="bi bi-gear"></i>
        <span>Settings</span>
      </router-link>
      
      <router-link to="/applicant/help" class="nav-item" active-class="active">
        <i class="bi bi-question-circle"></i>
        <span>Help Center</span>
      </router-link>
    </div>
    
    <div class="user-profile">
      <div class="avatar">
        <img :src="(user && user.avatar) ? user.avatar : 'https://v0.dev/placeholder.svg'" alt="User avatar" class="rounded-circle" />
      </div> 
      <div class="user-info">
        <div class="user-name">{{ user && user.name ? user.name : '' }}</div>
        <div class="user-email">{{ user && user.email ? user.email : '' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryLogo from "@/components/sharecomponents/PrimaryLogo.vue";

export default {
  name: "SidebarNavigation",
  components: {
    PrimaryLogo,
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        email: '',
        avatar: ''
      })
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: white;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
}

.logo-container {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-circle {
  width: 32px;
  height: 32px;
  background-color: #5138ee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.logo-text {
  font-weight: bold;
  font-size: 18px;
}

.nav-items {
  padding: 15px 0;
  flex-grow: 1;
}

.nav-item {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.nav-item:hover {
  background-color: #f8f9fa;
}

.nav-item.active {
  background-color: #f0f0ff;
  color: #5138ee;
  border-left: 3px solid #5138ee;
}

.settings-section {
  padding: 15px 0;
  border-top: 1px solid #e9ecef;
}

.settings-header {
  padding: 0 20px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #adb5bd;
  font-weight: 500;
}

.user-profile {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #e9ecef;
}

.avatar img {
  width: 40px;
  height: 40px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
}

.user-email {
  font-size: 12px;
  color: #6c757d;
}
</style>