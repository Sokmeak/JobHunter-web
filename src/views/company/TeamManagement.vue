<template>
  <div class="account-settings">
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Account Settings</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveAccount">
          <!-- Profile Picture -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Profile Picture</label>
            <div class="d-flex align-items-center">
              <div class="me-3">
                <img
                  :src="accountData.avatar"
                  class="rounded-circle"
                  width="80"
                  height="80"
                  alt="Profile Picture"
                />
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2"
                >
                  <i class="bi bi-upload me-1"></i>
                  Upload New Picture
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm">
                  Remove
                </button>
                <div class="small text-muted mt-1">
                  Recommended size: 400x400px. Max file size: 2MB.
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >First Name <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                v-model="accountData.firstName"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Last Name <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                v-model="accountData.lastName"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Email Address <span class="text-danger">*</span></label
              >
              <input
                type="email"
                class="form-control"
                v-model="accountData.email"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Phone Number</label>
              <input
                type="tel"
                class="form-control"
                v-model="accountData.phone"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Job Title</label>
              <input
                type="text"
                class="form-control"
                v-model="accountData.jobTitle"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Department</label>
              <select class="form-select" v-model="accountData.department">
                <option value="">Select Department</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Time Zone</label>
              <select class="form-select" v-model="accountData.timezone">
                <option value="">Select Time Zone</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                <option value="Europe/Paris">
                  Central European Time (CET)
                </option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Language</label>
              <select class="form-select" v-model="accountData.language">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
              </select>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-outline-secondary">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Change Password -->
    <div class="card mt-4">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Change Password</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="changePassword">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Current Password</label>
              <input
                type="password"
                class="form-control"
                v-model="passwordData.current"
                required
              />
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">New Password</label>
              <input
                type="password"
                class="form-control"
                v-model="passwordData.new"
                required
              />
              <div class="form-text">
                Password must be at least 8 characters and include a number and
                special character.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Confirm New Password</label>
              <input
                type="password"
                class="form-control"
                v-model="passwordData.confirm"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountData: {
        avatar: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobTitle: "",
        department: "",
        timezone: "",
        language: "en",
      },
      passwordData: {
        current: "",
        new: "",
        confirm: "",
      },
    };
  },
  methods: {
    saveAccount() {
      // Implement your save logic here
      // For now, just log the data
      console.log("Saving account:", this.accountData);
    },
    changePassword() {
      // Implement your password change logic here
      console.log("Changing password:", this.passwordData);
    },
  },
};
</script>
