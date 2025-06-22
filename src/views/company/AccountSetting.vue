<template>
  <div class="account-settings">
    <!-- Account Info -->
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Account Settings</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateAccount">
          <!-- Profile Picture -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Profile Picture</label>
            <div class="d-flex align-items-center">
              <div class="me-3">
                <img
                  :src="account.avatar"
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

          <!-- Account Fields -->
          <div class="row">
            <div
              class="col-md-6 mb-3"
              v-for="(value, key) in accountFields"
              :key="key"
            >
              <label class="form-label fw-semibold">
                {{ value.label }}
                <span v-if="value.required" class="text-danger">*</span>
              </label>
              <input
                v-if="
                  value.type === 'text' ||
                  value.type === 'email' ||
                  value.type === 'tel'
                "
                :type="value.type"
                class="form-control"
                v-model="account[key]"
                :required="value.required"
              />
              <select
                v-else-if="value.type === 'select'"
                class="form-select"
                v-model="account[key]"
              >
                <option v-for="opt in value.options" :key="opt" :value="opt">
                  {{ opt }}
                </option>
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
        <form @submit.prevent="handleChangePassword">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Current Password</label>
              <input
                type="password"
                class="form-control"
                v-model="password.current"
                required
              />
            </div>
            <div class="col-md-6 mb-3"></div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">New Password</label>
              <input
                type="password"
                class="form-control"
                v-model="password.new"
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
                v-model="password.confirm"
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
        <form @submit.prevent="updateEmailPreferences">
          <div
            class="mb-3"
            v-for="(val, key) in account.emailPreferences"
            :key="key"
          >
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="key"
                v-model="account.emailPreferences[key]"
              />
              <label class="form-check-label fw-semibold" :for="key">
                {{ key.charAt(0).toUpperCase() + key.slice(1) }}
              </label>
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
        <div
          class="d-flex justify-content-between align-items-center mb-3"
          v-for="(connected, key) in account.connectedAccounts"
          :key="key"
        >
          <div class="d-flex align-items-center">
            <i
              :class="'bi bi-' + key + ' me-3'"
              :style="{ fontSize: '1.5rem' }"
            ></i>
            <div>
              <h6 class="mb-0 fw-semibold">
                {{ key.charAt(0).toUpperCase() + key.slice(1) }}
              </h6>
              <small class="text-muted">{{
                connected ? "Connected" : "Not connected"
              }}</small>
            </div>
          </div>
          <button
            class="btn btn-sm"
            :class="connected ? 'btn-outline-danger' : 'btn-outline-primary'"
            @click="toggleConnection(key)"
          >
            {{ connected ? "Disconnect" : "Connect" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="card mt-4 border-danger">
      <div class="card-header bg-white border-danger">
        <h5 class="mb-0 fw-bold text-danger">Danger Zone</h5>
      </div>
      <div class="card-body">
        <h6 class="fw-bold">Delete Account</h6>
        <p class="text-muted mb-3">
          Once you delete your account, there is no going back.
        </p>
        <button class="btn btn-danger" @click="confirmDeleteAccount">
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useAccountStore } from "@/stores/company/accountStore";

const {
  account,
  password,
  updateAccount,
  updateEmailPreferences,
  toggleConnection,
  confirmDeleteAccount,
  changePassword,
} = useAccountStore();

const accountFields = {
  firstName: { label: "First Name", type: "text", required: true },
  lastName: { label: "Last Name", type: "text", required: true },
  email: { label: "Email Address", type: "email", required: true },
  phone: { label: "Phone Number", type: "tel", required: false },
  jobTitle: { label: "Job Title", type: "text", required: false },
  department: {
    label: "Department",
    type: "select",
    required: false,
    options: [
      "Human Resources",
      "Engineering",
      "Marketing",
      "Sales",
      "Operations",
      "Finance",
    ],
  },
  timezone: {
    label: "Time Zone",
    type: "select",
    required: false,
    options: [
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
    ],
  },
  language: {
    label: "Language",
    type: "select",
    required: false,
    options: ["en", "es", "fr", "de", "it", "pt"],
  },
};

const handleChangePassword = () => {
  changePassword();
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
