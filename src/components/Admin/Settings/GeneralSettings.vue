<template>
    <div class="general-settings">
      <!-- Platform Settings Section -->
      <div class="settings-section">
        <div class="section-header">
          <h2 class="section-title">Platform Settings</h2>
          <p class="section-subtitle">Configure basic platform information and settings</p>
        </div>
        
        <form @submit.prevent="savePlatformSettings" class="settings-form">
          <div class="form-group">
            <label for="platformName" class="form-label">Platform Name</label>
            <input
              id="platformName"
              v-model="platformSettings.name"
              type="text"
              class="form-input"
              placeholder="Enter platform name"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="platformUrl" class="form-label">Platform URL</label>
            <input
              id="platformUrl"
              v-model="platformSettings.url"
              type="url"
              class="form-input"
              placeholder="https://example.com"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="adminEmail" class="form-label">Admin Email</label>
            <input
              id="adminEmail"
              v-model="platformSettings.adminEmail"
              type="email"
              class="form-input"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="timezone" class="form-label">Default Time Zones</label>
            <div class="select-wrapper">
              <select
                id="timezone"
                v-model="platformSettings.timezone"
                class="form-select"
                required
              >
                <option value="">Select timezone</option>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
                <option value="GMT">GMT (Greenwich Mean Time)</option>
                <option value="CET">CET (Central European Time)</option>
                <option value="JST">JST (Japan Standard Time)</option>
                <option value="AEST">AEST (Australian Eastern Standard Time)</option>
              </select>
              <ChevronDown class="select-icon" />
            </div>
          </div>
          
          <button type="submit" class="save-button" :disabled="!isPlatformFormValid">
            <Save class="button-icon" />
            Save Change
          </button>
        </form>
      </div>
  
      <!-- Maintenance Mode Section -->
      <div class="settings-section">
        <div class="section-header">
          <h2 class="section-title">Maintenance Mode</h2>
          <p class="section-subtitle">Enable maintenance to temporarily disable the platform</p>
        </div>
        
        <form @submit.prevent="saveMaintenanceSettings" class="settings-form">
          <div class="form-group">
            <div class="toggle-group">
              <div class="toggle-info">
                <label for="maintenanceMode" class="toggle-label">Maintenance Mode</label>
                <p class="toggle-description">When enabled, users will see the maintenance page.</p>
              </div>
              <ToggleSwitch 
                id="maintenanceMode"
                v-model="maintenanceSettings.enabled"
                :disabled="false"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="maintenanceMessage" class="form-label">Maintenance Message</label>
            <textarea
              id="maintenanceMessage"
              v-model="maintenanceSettings.message"
              class="form-textarea"
              rows="4"
              placeholder="We're currently performing scheduled maintenance. Please check back soon!"
            ></textarea>
          </div>
          
          <button type="submit" class="save-button">
            <Save class="button-icon" />
            Save Change
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { ChevronDown, Save } from 'lucide-vue-next';
  import ToggleSwitch from './ToggleSwitch.vue';
  
  // Platform Settings
  const platformSettings = ref({
    name: 'Job Hunter',
    url: 'https://jobhunter.com',
    adminEmail: 'admin@jobhunter.com',
    timezone: 'UTC'
  });
  
  // Maintenance Settings
  const maintenanceSettings = ref({
    enabled: true,
    message: "We're currently performing scheduled maintenance. Please check back soon!"
  });
  
  // Computed properties
  const isPlatformFormValid = computed(() => {
    return platformSettings.value.name && 
           platformSettings.value.url && 
           platformSettings.value.adminEmail && 
           platformSettings.value.timezone;
  });
  
  // Methods
  const savePlatformSettings = () => {
    // Simulate API call
    console.log('Saving platform settings:', platformSettings.value);
    
    // Show success message
    showSuccessMessage('Platform settings saved successfully!');
  };
  
  const saveMaintenanceSettings = () => {
    // Simulate API call
    console.log('Saving maintenance settings:', maintenanceSettings.value);
    
    // Show success message
    showSuccessMessage('Maintenance settings saved successfully!');
  };
  
  const showSuccessMessage = (message) => {
    // In a real app, you would use a toast notification system
    alert(message);
  };
  </script>
  
  <style scoped>
  .general-settings {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  
  .settings-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .section-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
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
  
  .settings-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
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
  
  .form-input,
  .form-select,
  .form-textarea {
    padding: 12px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s;
    background-color: #f9fafb;
  }
  
  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    background-color: white;
  }
  
  .select-wrapper {
    position: relative;
  }
  
  .form-select {
    appearance: none;
    padding-right: 48px;
    cursor: pointer;
  }
  
  .select-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #6b7280;
    pointer-events: none;
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
  }
  
  .toggle-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
  }
  
  .toggle-info {
    flex: 1;
  }
  
  .toggle-label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    display: block;
    margin-bottom: 4px;
  }
  
  .toggle-description {
    font-size: 12px;
    color: #6b7280;
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
    .toggle-group {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .save-button {
      align-self: stretch;
    }
  }
  </style>