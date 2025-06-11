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

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Email Preferences -->
    <div class="card mt-4">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Email Preferences</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveEmailPreferences">
          <div class="mb-3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="emailNotifications"
                v-model="accountData.emailPreferences.notifications"
              />
              <label
                class="form-check-label fw-semibold"
                for="emailNotifications"
              >
                Email Notifications
              </label>
              <div class="form-text">
                Receive email notifications about important updates
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="marketingEmails"
                v-model="accountData.emailPreferences.marketing"
              />
              <label class="form-check-label fw-semibold" for="marketingEmails">
                Marketing Emails
              </label>
              <div class="form-text">
                Receive emails about new features and promotions
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="weeklyDigest"
                v-model="accountData.emailPreferences.weeklyDigest"
              />
              <label class="form-check-label fw-semibold" for="weeklyDigest">
                Weekly Digest
              </label>
              <div class="form-text">
                Receive a weekly summary of your recruitment activity
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Connected Accounts -->
    <div class="card mt-4">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Connected Accounts</h5>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center">
            <i
              class="bi bi-google me-3 text-danger"
              style="font-size: 1.5rem"
            ></i>
            <div>
              <h6 class="mb-0 fw-semibold">Google</h6>
              <small class="text-muted">{{
                accountData.connectedAccounts.google
                  ? "Connected"
                  : "Not connected"
              }}</small>
            </div>
          </div>
          <button
            class="btn btn-sm"
            :class="
              accountData.connectedAccounts.google
                ? 'btn-outline-danger'
                : 'btn-outline-primary'
            "
            @click="toggleConnection('google')"
          >
            {{
              accountData.connectedAccounts.google ? "Disconnect" : "Connect"
            }}
          </button>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center">
            <i
              class="bi bi-linkedin me-3 text-primary"
              style="font-size: 1.5rem"
            ></i>
            <div>
              <h6 class="mb-0 fw-semibold">LinkedIn</h6>
              <small class="text-muted">{{
                accountData.connectedAccounts.linkedin
                  ? "Connected"
                  : "Not connected"
              }}</small>
            </div>
          </div>
          <button
            class="btn btn-sm"
            :class="
              accountData.connectedAccounts.linkedin
                ? 'btn-outline-danger'
                : 'btn-outline-primary'
            "
            @click="toggleConnection('linkedin')"
          >
            {{
              accountData.connectedAccounts.linkedin ? "Disconnect" : "Connect"
            }}
          </button>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i
              class="bi bi-microsoft me-3 text-success"
              style="font-size: 1.5rem"
            ></i>
            <div>
              <h6 class="mb-0 fw-semibold">Microsoft</h6>
              <small class="text-muted">{{
                accountData.connectedAccounts.microsoft
                  ? "Connected"
                  : "Not connected"
              }}</small>
            </div>
          </div>
          <button
            class="btn btn-sm"
            :class="
              accountData.connectedAccounts.microsoft
                ? 'btn-outline-danger'
                : 'btn-outline-primary'
            "
            @click="toggleConnection('microsoft')"
          >
            {{
              accountData.connectedAccounts.microsoft ? "Disconnect" : "Connect"
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account -->
    <div class="card mt-4 border-danger">
      <div class="card-header bg-white border-danger">
        <h5 class="mb-0 fw-bold text-danger">Danger Zone</h5>
      </div>
      <div class="card-body">
        <h6 class="fw-bold">Delete Account</h6>
        <p class="text-muted mb-3">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button class="btn btn-danger" @click="confirmDeleteAccount">
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AccountSettings",
  setup() {
    const accountData = ref({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@stripe.com",
      phone: "+1 (555) 123-4567",
      jobTitle: "HR Manager",
      department: "Human Resources",
      timezone: "America/New_York",
      language: "en",
      avatar: "/placeholder.svg?height=80&width=80",
      emailPreferences: {
        notifications: true,
        marketing: false,
        weeklyDigest: true,
      },
      connectedAccounts: {
        google: true,
        linkedin: false,
        microsoft: false,
      },
    });

    const passwordData = ref({
      current: "",
      new: "",
      confirm: "",
    });

    const saveAccount = () => {
      // In a real app, this would make an API call to update the user's profile
      alert("Account settings updated successfully!");
    };

    const changePassword = () => {
      if (passwordData.value.new !== passwordData.value.confirm) {
        alert("New passwords do not match!");
        return;
      }

      // Password validation
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(passwordData.value.new)) {
        alert(
          "Password must be at least 8 characters and include a number and special character."
        );
        return;
      }

      // In a real app, this would make an API call to update the user's password
      alert("Password updated successfully!");
      passwordData.value = { current: "", new: "", confirm: "" };
    };

    const saveEmailPreferences = () => {
      // In a real app, this would make an API call to update email preferences
      alert("Email preferences updated successfully!");
    };

    const toggleConnection = (account) => {
      // Toggle the connection status
      accountData.value.connectedAccounts[account] =
        !accountData.value.connectedAccounts[account];

      // In a real app, this would make an API call to connect/disconnect the account
      const status = accountData.value.connectedAccounts[account]
        ? "connected"
        : "disconnected";
      alert(
        `${
          account.charAt(0).toUpperCase() + account.slice(1)
        } account ${status} successfully!`
      );
    };

    const confirmDeleteAccount = () => {
      if (
        confirm(
          "Are you sure you want to delete your account? This action cannot be undone."
        )
      ) {
        // In a real app, this would make an API call to delete the user's account
        alert(
          "Account deletion request submitted. You will receive a confirmation email."
        );
      }
    };

    return {
      accountData,
      passwordData,
      saveAccount,
      changePassword,
      saveEmailPreferences,
      toggleConnection,
      confirmDeleteAccount,
    };
  },
};
</script>

<style scoped>
.form-switch .form-check-input {
  width: 2.5em;
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
</style>
