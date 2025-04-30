<!-- src/components/settings/LoginDetailsTab.vue -->
<template>
    <div class="login-details-tab">
      <div class="section mb-4">
        <h5 class="section-title">Account Security</h5>
        <p class="text-muted">Manage your login credentials and account security</p>
        <hr>
      </div>
      
      <!-- Email Section -->
      <div class="mb-4">
        <h6 class="fw-medium mb-3">Email Address</h6>
        <div class="row">
          <div class="col-md-8">
            <div class="input-group">
              <input 
                type="email" 
                class="form-control" 
                v-model="email" 
                readonly
              />
              <button class="btn btn-outline-secondary" type="button" @click="changeEmail">
                Change
              </button>
            </div>
            <small class="text-muted">We'll send a verification link to your new email</small>
          </div>
        </div>
      </div>
      
      <!-- Password Section -->
      <div class="mb-4">
        <h6 class="fw-medium mb-3">Password</h6>
        <div class="row">
          <div class="col-md-8">
            <div class="input-group">
              <input 
                type="password" 
                class="form-control" 
                value="********" 
                readonly
              />
              <button class="btn btn-outline-secondary" type="button" @click="changePassword">
                Change
              </button>
            </div>
            <small class="text-muted">Last changed 3 months ago</small>
          </div>
        </div>
      </div>
      
      <!-- Two-Factor Authentication -->
      <div class="mb-4">
        <h6 class="fw-medium mb-3">Two-Factor Authentication (2FA)</h6>
        <div class="form-check form-switch">
          <input 
            class="form-check-input" 
            type="checkbox" 
            id="twofaSwitch" 
            v-model="twoFactorEnabled"
          />
          <label class="form-check-label" for="twofaSwitch">
            {{ twoFactorEnabled ? 'Enabled' : 'Disabled' }}
          </label>
        </div>
        <p class="text-muted small mt-2">
          Enable two-factor authentication for an extra layer of security when signing in.
        </p>
      </div>
      
      <!-- Session Management -->
      <div class="mb-4">
        <h6 class="fw-medium mb-3">Active Sessions</h6>
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <p class="mb-0 fw-medium">Current Session</p>
                <small class="text-muted">Windows 10 • Chrome • Last active now</small>
              </div>
              <span class="badge bg-success">Active</span>
            </div>
            
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p class="mb-0 fw-medium">Mobile App</p>
                <small class="text-muted">iOS 15 • iPhone • Last active 2 days ago</small>
              </div>
              <button class="btn btn-sm btn-outline-danger">Revoke</button>
            </div>
          </div>
        </div>
        <button class="btn btn-outline-danger mt-3">Sign out from all devices</button>
      </div>
      
      <!-- Save Button -->
      <div class="d-flex justify-content-end mt-4">
        <button class="btn btn-primary" @click="saveChanges">Save Changes</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginDetailsTab',
    data() {
      return {
        email: 'Jakegyll@gmail.com',
        twoFactorEnabled: false
      };
    },
    methods: {
      changeEmail() {
        // Logic to change email would go here
        const newEmail = prompt('Enter your new email address:');
        if (newEmail) {
          alert('Verification email sent to: ' + newEmail);
        }
      },
      changePassword() {
        // Logic to change password would go here
        alert('Password change dialog would appear here');
      },
      saveChanges() {
        // Logic to save changes would go here
        alert('Settings saved successfully!');
      }
    }
  };
  </script>
  
  <style scoped>
  .section-title {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  </style>