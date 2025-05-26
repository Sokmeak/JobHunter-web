<template>
  <div class="security-settings">
    <!-- Security Settings Section -->
    <div class="settings-section">
      <div class="section-header">
        <div class="section-title-wrapper">
          <Lock class="section-icon" />
          <h2 class="section-title">Security Settings</h2>
        </div>
        <p class="section-subtitle">Manage your account security and authentication options</p>
      </div>
      
      <!-- Change Admin Password -->
      <div class="security-subsection">
        <div class="subsection-header">
          <h3 class="subsection-title">Change Admin Password</h3>
          <p class="subsection-subtitle">Update your administrator password securely</p>
        </div>
      </div>

      <!-- Two-Factor Authentication -->
      <div class="security-subsection">
        <div class="auth-setting">
          <div class="auth-info">
            <h3 class="auth-title">Two-Factor Authentication</h3>
            <p class="auth-description">Require two-factor authentication for admin accounts</p>
          </div>
          <ToggleSwitch 
            id="two-factor-auth"
            v-model="securitySettings.twoFactorEnabled"
          />
        </div>
      </div>

      <!-- Password Change Form -->
      <form @submit.prevent="changePassword" class="password-form">
        <div class="form-group">
          <label for="currentPassword" class="form-label">Current Password</label>
          <input
            id="currentPassword"
            v-model="passwordForm.currentPassword"
            type="password"
            class="form-input"
            placeholder="Enter current password"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="newPassword" class="form-label">New Password</label>
          <input
            id="newPassword"
            v-model="passwordForm.newPassword"
            type="password"
            class="form-input"
            placeholder="Enter new password"
            required
            minlength="8"
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm New Password</label>
          <input
            id="confirmPassword"
            v-model="passwordForm.confirmPassword"
            type="password"
            class="form-input"
            placeholder="Confirm new password"
            required
            minlength="8"
          />
          <p v-if="passwordMismatch" class="error-message">
            Passwords do not match
          </p>
        </div>
        
        <button 
          type="submit" 
          class="save-button" 
          :disabled="!isPasswordFormValid"
        >
          <Save class="button-icon" />
          Save Change
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Lock, Save } from 'lucide-vue-next';
import ToggleSwitch from './ToggleSwitch.vue';

// Security settings
const securitySettings = ref({
  twoFactorEnabled: true
});

// Password form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Computed properties
const passwordMismatch = computed(() => {
  return passwordForm.value.newPassword && 
         passwordForm.value.confirmPassword && 
         passwordForm.value.newPassword !== passwordForm.value.confirmPassword;
});

const isPasswordFormValid = computed(() => {
  return passwordForm.value.currentPassword &&
         passwordForm.value.newPassword &&
         passwordForm.value.confirmPassword &&
         passwordForm.value.newPassword === passwordForm.value.confirmPassword &&
         passwordForm.value.newPassword.length >= 8;
});

// Methods
const changePassword = () => {
  if (!isPasswordFormValid.value) {
    return;
  }

  // Simulate API call
  const passwordData = {
    currentPassword: passwordForm.value.currentPassword,
    newPassword: passwordForm.value.newPassword,
    twoFactorEnabled: securitySettings.value.twoFactorEnabled
  };
  
  console.log('Changing password:', passwordData);
  
  // Clear form after successful change
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  // Show success message
  showSuccessMessage('Password changed successfully!');
};

const showSuccessMessage = (message) => {
  // In a real app, you would use a toast notification system
  alert(message);
};
</script>

<style scoped>
.security-settings {
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

.security-subsection {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.subsection-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.subsection-title {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.subsection-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.auth-setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.auth-info {
  flex: 1;
  margin-right: 16px;
}

.auth-title {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 4px 0;
}

.auth-description {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.password-form {
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

.error-message {
  font-size: 12px;
  color: #ef4444;
  margin: 0;
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
  .auth-setting {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .auth-info {
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