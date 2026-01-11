<template>
  <div class="notification-settings">
    <!-- Email Notifications Section -->
    <div class="settings-section">
      <div class="section-header">
        <div class="section-title-wrapper">
          <Mail class="section-icon" />
          <h2 class="section-title">Email Notifications</h2>
        </div>
        <p class="section-subtitle">Configure email notification settings</p>
      </div>
      
      <div class="notification-list">
        <div 
          v-for="notification in emailNotifications" 
          :key="notification.id"
          class="notification-item"
        >
          <div class="notification-info">
            <h3 class="notification-title">{{ notification.title }}</h3>
            <p class="notification-description">{{ notification.description }}</p>
          </div>
          <ToggleSwitch 
            :id="`email-${notification.id}`"
            v-model="notification.enabled"
          />
        </div>
      </div>

      <!-- Email Configuration Form -->
      <form @submit.prevent="saveNotificationSettings" class="email-config-form">
        <div class="form-group">
          <label for="senderName" class="form-label">Email Sender Name</label>
          <input
            id="senderName"
            v-model="emailConfig.senderName"
            type="text"
            class="form-input"
            placeholder="Enter sender name"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="fromEmail" class="form-label">From Email Address</label>
          <input
            id="fromEmail"
            v-model="emailConfig.fromEmail"
            type="email"
            class="form-input"
            placeholder="notification@example.com"
            required
          />
        </div>
        
        <button type="submit" class="save-button" :disabled="!isFormValid">
          <Save class="button-icon" />
          Save Change
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Mail, Save } from 'lucide-vue-next';
import ToggleSwitch from './ToggleSwitch.vue';

// Email notifications
const emailNotifications = ref([
  {
    id: 'email-notifications',
    title: 'Email Notifications',
    description: 'Enable email notifications for users',
    enabled: true
  },
  {
    id: 'marketing-emails',
    title: 'Marketing Emails',
    description: 'Send marketing and promotional emails',
    enabled: false
  },
  {
    id: 'job-alerts',
    title: 'Job Alerts',
    description: 'Send job alerts to job seekers',
    enabled: true
  }
]);

// Email configuration
const emailConfig = ref({
  senderName: 'Job Hunter Team',
  fromEmail: 'notification@jobhunter.com'
});

// Computed properties
const isFormValid = computed(() => {
  return emailConfig.value.senderName.trim() && 
         emailConfig.value.fromEmail.trim() &&
         isValidEmail(emailConfig.value.fromEmail);
});

// Methods
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const saveNotificationSettings = () => {
  const settings = {
    notifications: emailNotifications.value,
    config: emailConfig.value
  };
  
  console.log('Saving notification settings:', settings);
  
  // Show success message
  showSuccessMessage('Notification settings saved successfully!');
};

const showSuccessMessage = (message) => {
  // In a real app, you would use a toast notification system
  alert(message);
};
</script>

<style scoped>
.notification-settings {
  display: flex;
  flex-direction: column;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  width: 20px;
  height: 20px;
  color: #4f46e5;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.section-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.notification-info {
  flex: 1;
  margin-right: 16px;
}

.notification-title {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 4px 0;
}

.notification-description {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.email-config-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9fafb;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  background-color: white;
}

.form-input:invalid {
  border-color: #ef4444;
}

.save-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start;
}

.save-button:hover:not(:disabled) {
  background-color: #4338ca;
}

.save-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .notification-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .notification-item:last-child {
    border-bottom: none;
  }
  
  .notification-info {
    margin-right: 0;
  }
  
  .save-button {
    align-self: stretch;
  }
  
  .section-title-wrapper {
    gap: 8px;
  }
  
  .section-icon {
    width: 18px;
    height: 18px;
  }
}
</style>