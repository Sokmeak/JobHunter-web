<template>
<div class="settings">
  <!-- Header -->
  <div class="mb-4">
    <h2 class="mb-1 fw-bold">Settings</h2>
    <p class="text-muted mb-0">Manage your account and company preferences</p>
  </div>

  <div class="row g-4">
    <!-- Settings Navigation -->
    <div class="col-lg-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
          <div class="list-group list-group-flush">
            <button 
              v-for="section in settingSections"
              :key="section.id"
              class="list-group-item list-group-item-action border-0 d-flex align-items-center"
              :class="{ active: activeSection === section.id }"
              @click="activeSection = section.id"
            >
              <i :class="section.icon" class="me-3"></i>
              {{ section.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings Content -->
    <div class="col-lg-9">
      <!-- Company Profile -->
      <div v-if="activeSection === 'company'" class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Company Profile</h5>
          
          <form @submit.prevent="saveCompanySettings">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-medium">Company Name</label>
                <input type="text" class="form-control" v-model="companySettings.name">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Industry</label>
                <select class="form-select" v-model="companySettings.industry">
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Company Size</label>
                <select class="form-select" v-model="companySettings.size">
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Website</label>
                <input type="url" class="form-control" v-model="companySettings.website">
              </div>
              <div class="col-12">
                <label class="form-label fw-medium">Company Description</label>
                <textarea class="form-control" rows="4" v-model="companySettings.description"></textarea>
              </div>
              <div class="col-12">
                <label class="form-label fw-medium">Address</label>
                <textarea class="form-control" rows="3" v-model="companySettings.address"></textarea>
              </div>
            </div>
            
            <div class="mt-4">
              <button type="submit" class="btn btn-primary me-2">Save Changes</button>
              <button type="button" class="btn btn-outline-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Account Settings -->
      <div v-if="activeSection === 'account'" class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Account Settings</h5>
          
          <form @submit.prevent="saveAccountSettings">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-medium">First Name</label>
                <input type="text" class="form-control" v-model="accountSettings.firstName">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Last Name</label>
                <input type="text" class="form-control" v-model="accountSettings.lastName">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Email</label>
                <input type="email" class="form-control" v-model="accountSettings.email">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Phone</label>
                <input type="tel" class="form-control" v-model="accountSettings.phone">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Job Title</label>
                <input type="text" class="form-control" v-model="accountSettings.jobTitle">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Department</label>
                <input type="text" class="form-control" v-model="accountSettings.department">
              </div>
            </div>
            
            <div class="mt-4">
              <button type="submit" class="btn btn-primary me-2">Save Changes</button>
              <button type="button" class="btn btn-outline-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Notifications -->
      <div v-if="activeSection === 'notifications'" class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Notification Preferences</h5>
          
          <div class="notification-settings">
            <div class="mb-4">
              <h6 class="fw-medium mb-3">Email Notifications</h6>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" v-model="notificationSettings.newApplications" id="newApplications">
                <label class="form-check-label" for="newApplications">
                  New job applications
                </label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" v-model="notificationSettings.interviewReminders" id="interviewReminders">
                <label class="form-check-label" for="interviewReminders">
                  Interview reminders
                </label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" v-model="notificationSettings.statusUpdates" id="statusUpdates">
                <label class="form-check-label" for="statusUpdates">
                  Application status updates
                </label>
              </div>
            </div>

            <div class="mb-4">
              <h6 class="fw-medium mb-3">Push Notifications</h6>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" v-model="notificationSettings.pushApplications" id="pushApplications">
                <label class="form-check-label" for="pushApplications">
                  New applications
                </label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" v-model="notificationSettings.pushMessages" id="pushMessages">
                <label class="form-check-label" for="pushMessages">
                  Messages from candidates
                </label>
              </div>
            </div>
            
            <button class="btn btn-primary" @click="saveNotificationSettings">Save Preferences</button>
          </div>
        </div>
      </div>

      <!-- Security -->
      <div v-if="activeSection === 'security'" class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Security Settings</h5>
          
          <div class="security-settings">
            <!-- Change Password -->
            <div class="mb-4">
              <h6 class="fw-medium mb-3">Change Password</h6>
              <form @submit.prevent="changePassword">
                <div class="mb-3">
                  <label class="form-label">Current Password</label>
                  <input type="password" class="form-control" v-model="passwordForm.current">
                </div>
                <div class="mb-3">
                  <label class="form-label">New Password</label>
                  <input type="password" class="form-control" v-model="passwordForm.new">
                </div>
                <div class="mb-3">
                  <label class="form-label">Confirm New Password</label>
                  <input type="password" class="form-control" v-model="passwordForm.confirm">
                </div>
                <button type="submit" class="btn btn-primary">Update Password</button>
              </form>
            </div>

            <!-- Two-Factor Authentication -->
            <div class="mb-4">
              <h6 class="fw-medium mb-3">Two-Factor Authentication</h6>
              <div class="d-flex align-items-center justify-content-between p-3 border rounded">
                <div>
                  <div class="fw-medium">Two-Factor Authentication</div>
                  <small class="text-muted">Add an extra layer of security to your account</small>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="securitySettings.twoFactor" id="twoFactor">
                  <label class="form-check-label" for="twoFactor"></label>
                </div>
              </div>
            </div>

            <!-- Login Sessions -->
            <div class="mb-4">
              <h6 class="fw-medium mb-3">Active Sessions</h6>
              <div class="sessions-list">
                <div v-for="session in activeSessions" :key="session.id" class="d-flex align-items-center justify-content-between p-3 border rounded mb-2">
                  <div>
                    <div class="fw-medium">{{ session.device }}</div>
                    <small class="text-muted">{{ session.location }} • {{ session.lastActive }}</small>
                  </div>
                  <button class="btn btn-sm btn-outline-danger" @click="revokeSession(session.id)">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Billing -->
      <div v-if="activeSection === 'billing'" class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Billing & Subscription</h5>
          
          <div class="billing-info">
            <!-- Current Plan -->
            <div class="mb-4">
              <h6 class="fw-medium mb-3">Current Plan</h6>
              <div class="card bg-primary-subtle border-primary">
                <div class="card-body p-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-1 text-primary">Professional Plan</h6>
                      <p class="text-muted mb-0">$99/month • Up to 50 job postings</p>
                    </div>
                    <button class="btn btn-outline-primary btn-sm">Upgrade</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="mb-4">
              <h6 class="fw-medium mb-3">Payment Method</h6>
              <div class="d-flex align-items-center justify-content-between p-3 border rounded">
                <div class="d-flex align-items-center">
                  <i class="bi bi-credit-card fs-4 me-3 text-primary"></i>
                  <div>
                    <div class="fw-medium">•••• •••• •••• 4242</div>
                    <small class="text-muted">Expires 12/25</small>
                  </div>
                </div>
                <button class="btn btn-sm btn-outline-secondary">Update</button>
              </div>
            </div>

            <!-- Billing History -->
            <div class="mb-4">
              <h6 class="fw-medium mb-3">Billing History</h6>
              <div class="table-responsive">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="invoice in billingHistory" :key="invoice.id">
                      <td>{{ invoice.date }}</td>
                      <td>{{ invoice.description }}</td>
                      <td>${{ invoice.amount }}</td>
                      <td>
                        <span class="badge bg-success-subtle text-success">{{ invoice.status }}</span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-outline-secondary">Download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const activeSection = ref('company')

const settingSections = ref([
  { id: 'company', name: 'Company Profile', icon: 'bi bi-building' },
  { id: 'account', name: 'Account Settings', icon: 'bi bi-person' },
  { id: 'notifications', name: 'Notifications', icon: 'bi bi-bell' },
  { id: 'security', name: 'Security', icon: 'bi bi-shield-check' },
  { id: 'billing', name: 'Billing', icon: 'bi bi-credit-card' }
])

const companySettings = ref({
  name: 'TechCorp Solutions',
  industry: 'Technology',
  size: '51-200',
  website: 'https://techcorp.com',
  description: 'We are a leading technology company focused on innovative solutions.',
  address: '123 Tech Street, San Francisco, CA 94105'
})

const accountSettings = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@techcorp.com',
  phone: '+1 (555) 123-4567',
  jobTitle: 'HR Manager',
  department: 'Human Resources'
})

const notificationSettings = ref({
  newApplications: true,
  interviewReminders: true,
  statusUpdates: false,
  pushApplications: true,
  pushMessages: false
})

const securitySettings = ref({
  twoFactor: false
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const activeSessions = ref([
  {
    id: 1,
    device: 'MacBook Pro',
    location: 'San Francisco, CA',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    device: 'iPhone 15',
    location: 'San Francisco, CA',
    lastActive: '1 day ago'
  }
])

const billingHistory = ref([
  {
    id: 1,
    date: 'Jan 1, 2024',
    description: 'Professional Plan',
    amount: '99.00',
    status: 'Paid'
  },
  {
    id: 2,
    date: 'Dec 1, 2023',
    description: 'Professional Plan',
    amount: '99.00',
    status: 'Paid'
  }
])

const saveCompanySettings = () => {
  console.log('Saving company settings:', companySettings.value)
}

const saveAccountSettings = () => {
  console.log('Saving account settings:', accountSettings.value)
}

const saveNotificationSettings = () => {
  console.log('Saving notification settings:', notificationSettings.value)
}

const changePassword = () => {
  console.log('Changing password')
}

const revokeSession = (sessionId) => {
  console.log('Revoking session:', sessionId)
}
</script>

<style scoped>
.list-group-item.active {
  background-color: #6366f1;
  border-color: #6366f1;
}

.form-control:focus,
.form-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.form-check-input:checked {
  background-color: #6366f1;
  border-color: #6366f1;
}
</style>
