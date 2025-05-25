<template>
    <div class="settings-page">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">System Configurations</h1>
          <p class="page-subtitle">Manage platform settings and notifications.</p>
        </div>
      </div>
  
      <div class="settings-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          class="tab-button" 
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
  
      <div class="settings-content">
        <GeneralSettings v-if="activeTab === 'general'" />
        <NotificationSettings v-if="activeTab === 'notification'" />
        <SecuritySettings v-if="activeTab === 'security'" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import GeneralSettings from '@/components/Admin/Settings/GeneralSettings.vue';
  import NotificationSettings from '@/components/Admin/Settings/NotificationSettings.vue';
  import SecuritySettings from '@/components/Admin/Settings/SecuritySettings.vue';
  
  const activeTab = ref('general');
  
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'notification', label: 'Notification' },
    { id: 'security', label: 'Security' }
  ];
  </script>
  
  <style scoped>
  .settings-page {
    padding: 0;
  }
  
  .page-header {
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
  
  .settings-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 32px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .tab-button {
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
  }
  
  .tab-button:hover {
    color: #111827;
  }
  
  .tab-button.active {
    color: #4f46e5;
    border-bottom-color: #4f46e5;
    background-color: #f8f9ff;
  }
  
  .settings-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    padding: 32px;
  }
  
  @media (max-width: 768px) {
    .settings-tabs {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    
    .tab-button {
      white-space: nowrap;
      min-width: 120px;
    }
    
    .settings-content {
      padding: 20px;
    }
  }
  </style>