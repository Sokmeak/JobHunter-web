<template>
  <div class="account-settings">
    <!-- Account Info -->
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Account Settings</h5>
        <small class="text-muted">
          {{
            accountExists
              ? "Update your account information"
              : "Set up your account information"
          }}
        </small>
      </div>
      <div class="card-body">
        <!-- Loading State -->
        <div v-if="loading && !hasTriedFetching" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading account information...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger">
          <h6>Error Loading Account</h6>
          <p>{{ error }}</p>
          <button @click="loadAccount" class="btn btn-sm btn-primary">
            Try Again
          </button>
        </div>

        <!-- New Account Message -->
        <div v-else-if="isEmptyAccount" class="alert alert-info">
          <h6>
            <i class="bi bi-info-circle me-2"></i>Let's set up your account
          </h6>
          <p class="mb-0">
            Complete your account information below to personalize your
            experience.
          </p>
        </div>

        <!-- Account Form -->
        <form
          v-if="!loading || hasTriedFetching"
          @submit.prevent="handleUpdateAccount"
        >
          <!-- Profile Picture -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Profile Picture</label>
            <div class="d-flex align-items-center">
              <div class="me-3">
                <div class="avatar-container">
                  <img
                    v-if="account.avatar"
                    :src="account.avatar"
                    class="rounded-circle profile-avatar"
                    width="80"
                    height="80"
                    alt="Profile Picture"
                    @error="account.avatar = ''"
                  />
                  <div
                    v-else
                    class="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-person fs-1 text-muted"></i>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2"
                  :disabled="loading"
                >
                  <i class="bi bi-upload me-1"></i>
                  {{ account.avatar ? "Change Picture" : "Upload Picture" }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="handleRemoveAvatar"
                  :disabled="loading || !account.avatar"
                >
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
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">
                First Name <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                v-model="account.firstName"
                placeholder="Enter your first name"
                required
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">
                Last Name <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                v-model="account.lastName"
                placeholder="Enter your last name"
                required
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">
                Email Address <span class="text-danger">*</span>
              </label>
              <input
                type="email"
                class="form-control"
                v-model="account.email"
                placeholder="name@example.com"
                required
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Phone Number</label>
              <input
                type="tel"
                class="form-control"
                v-model="account.phone"
                placeholder="+1 (555) 123-4567"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Job Title</label>
              <input
                type="text"
                class="form-control"
                v-model="account.jobTitle"
                placeholder="e.g. HR Manager"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Department</label>
              <select
                class="form-select"
                v-model="account.department"
                :disabled="loading"
              >
                <option value="">Select Department</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="Legal">Legal</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Time Zone</label>
              <select
                class="form-select"
                v-model="account.timezone"
                :disabled="loading"
              >
                <option value="">Select Time Zone</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Australia/Sydney">Sydney (AEST)</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Language</label>
              <select
                class="form-select"
                v-model="account.language"
                :disabled="loading"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="resetAccountForm"
              :disabled="loading"
            >
              Reset
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              {{ accountExists ? "Update Account" : "Create Account" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Change Password -->
    <div class="card mt-4">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Change Password</h5>
        <small class="text-muted"
          >Update your account password for security</small
        >
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
                placeholder="Enter current password"
                required
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3"></div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">New Password</label>
              <input
                type="password"
                class="form-control"
                v-model="password.new"
                placeholder="Enter new password"
                required
                :disabled="loading"
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
                placeholder="Confirm new password"
                required
                :disabled="loading"
              />
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
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
        <small class="text-muted"
          >Control what emails you receive from us</small
        >
      </div>
      <div class="card-body">
        <form @submit.prevent="handleUpdateEmailPreferences">
          <div class="mb-3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="notifications"
                v-model="account.emailPreferences.notifications"
                :disabled="loading"
              />
              <label class="form-check-label fw-semibold" for="notifications">
                Notifications
              </label>
              <div class="form-text">
                Receive important notifications about your account and activity
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="marketing"
                v-model="account.emailPreferences.marketing"
                :disabled="loading"
              />
              <label class="form-check-label fw-semibold" for="marketing">
                Marketing
              </label>
              <div class="form-text">
                Receive marketing emails about new features and promotions
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="weeklyDigest"
                v-model="account.emailPreferences.weeklyDigest"
                :disabled="loading"
              />
              <label class="form-check-label fw-semibold" for="weeklyDigest">
                Weekly Digest
              </label>
              <div class="form-text">
                Receive a weekly summary of your account activity
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" :disabled="loading">
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
        <small class="text-muted">Manage your social account connections</small>
      </div>
      <div class="card-body">
        <div
          class="d-flex justify-content-between align-items-center py-3 border-bottom"
          v-for="(connected, key) in account.connectedAccounts"
          :key="key"
        >
          <div class="d-flex align-items-center">
            <i
              :class="getServiceIcon(key)"
              class="me-3 fs-4"
              :style="{ color: getServiceColor(key) }"
            ></i>
            <div>
              <h6 class="mb-0 fw-semibold">
                {{ formatServiceName(key) }}
              </h6>
              <small class="text-muted">
                {{ connected ? "Connected" : "Not connected" }}
              </small>
            </div>
          </div>
          <button
            class="btn btn-sm"
            :class="connected ? 'btn-outline-danger' : 'btn-outline-primary'"
            @click="handleToggleConnection(key)"
            :disabled="loading"
          >
            {{ connected ? "Disconnect" : "Connect" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="card mt-4 border-danger">
      <div class="card-header bg-white border-danger">
        <h5 class="mb-0 fw-bold text-danger">
          <i class="bi bi-exclamation-triangle me-2"></i>Danger Zone
        </h5>
      </div>
      <div class="card-body">
        <h6 class="fw-bold">Delete Account</h6>
        <p class="text-muted mb-3">
          Once you delete your account, there is no going back. This will
          permanently delete your company profile, all job postings, and
          applications.
        </p>
        <button
          class="btn btn-danger"
          @click="handleConfirmDeleteAccount"
          :disabled="loading"
        >
          <i class="bi bi-trash me-2"></i>Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/company/accountStore";
import { useCompanyProfileStore } from "@/stores/company/companyProfileStore";
import { useAuthStore } from "@/stores/company/auth";
// Store setup
const store = useAccountStore();
const { account, password, loading, error, accountExists, hasTriedFetching } =
  storeToRefs(store);
const {
  fetchAccount,
  updateAccount,
  changePassword,
  updateEmailPreferences,
  toggleConnection,
  confirmDeleteAccount,
  isEmptyAccount,
} = store;

// Load account data when component mounts
onMounted(async () => {
  console.log("🚀 AccountSetting component mounted");

  if (!hasTriedFetching.value) {
    await loadAccount();
  } else {
    console.log("ℹ️ Already tried fetching, skipping to avoid loops");
  }
});

// Load account data
const loadAccount = async () => {
  try {
    console.log("📥 Attempting to load account data...");
    await fetchAccount();

    if (accountExists.value) {
      console.log("✅ Account data loaded successfully");
    } else {
      console.log("ℹ️ No account data exists yet - ready for creation");
    }
  } catch (err) {
    console.error("❌ Failed to load account data:", err);
  }
};

// Handle account update
const handleUpdateAccount = async () => {
  try {
    console.log("💾 Updating account...");
    await updateAccount();
    console.log("✅ Account updated successfully");
  } catch (err) {
    console.error("❌ Failed to update account:", err);
  }
};

// Handle password change
const handleChangePassword = async () => {
  try {
    console.log("🔐 Changing password...");
    await changePassword();
    console.log("✅ Password changed successfully");
  } catch (err) {
    console.error("❌ Failed to change password:", err);
  }
};

// Handle email preferences update
const handleUpdateEmailPreferences = async () => {
  try {
    console.log("📧 Updating email preferences...");
    await updateEmailPreferences();
    console.log("✅ Email preferences updated successfully");
  } catch (err) {
    console.error("❌ Failed to update email preferences:", err);
  }
};

// Handle connection toggle
const handleToggleConnection = async (service) => {
  try {
    console.log(`🔗 Toggling ${service} connection...`);
    await toggleConnection(service);
    console.log(`✅ ${service} connection toggled successfully`);
  } catch (err) {
    console.error(`❌ Failed to toggle ${service} connection:`, err);
  }
};

// Handle account deletion
const handleConfirmDeleteAccount = async () => {
  try {
    console.log("🗑️ Initiating account deletion...");
    await confirmDeleteAccount();
    console.log("✅ Account deletion completed");
  } catch (err) {
    console.error("❌ Failed to delete account:", err);
  }
};

// Remove avatar
const handleRemoveAvatar = () => {
  if (!confirm("Are you sure you want to remove your profile picture?")) {
    return;
  }

  try {
    console.log("🗑️ Removing avatar...");
    account.value.avatar = "";
    console.log("✅ Avatar removed successfully");
    alert("Profile picture removed successfully!");
  } catch (err) {
    console.error("❌ Failed to remove avatar:", err);
    alert("Failed to remove profile picture");
  }
};

// Reset account form
const resetAccountForm = () => {
  if (
    confirm(
      "Are you sure you want to reset all changes? This will reload the original data."
    )
  ) {
    if (accountExists.value) {
      loadAccount();
    } else {
      store.resetAccount();
    }
  }
};

// Utility functions
const formatServiceName = (service) => {
  const names = {
    google: "Google",
    linkedin: "LinkedIn",
    microsoft: "Microsoft",
  };
  return names[service] || service.charAt(0).toUpperCase() + service.slice(1);
};

const getServiceIcon = (service) => {
  const icons = {
    google: "bi bi-google",
    linkedin: "bi bi-linkedin",
    microsoft: "bi bi-microsoft",
  };
  return icons[service] || "bi bi-link";
};

const getServiceColor = (service) => {
  const colors = {
    google: "#4285f4",
    linkedin: "#0077b5",
    microsoft: "#00a1f1",
  };
  return colors[service] || "#6c757d";
};
</script>

<style scoped>
.avatar-container {
  width: 80px;
  height: 80px;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border: 2px dashed #dee2e6;
  background-color: #f8f9fa;
  transition: border-color 0.2s ease;
}

.avatar-placeholder:hover {
  border-color: #4640de;
  background-color: #f0f4ff;
}

.profile-avatar {
  border: 2px solid #e9ecef;
  object-fit: cover;
  transition: border-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-avatar:hover {
  border-color: #4640de;
}

.form-switch .form-check-input {
  width: 2.5em;
}

.form-check-input:checked {
  background-color: #4640de;
  border-color: #4640de;
}

.form-control:disabled,
.form-select:disabled {
  background-color: #f8f9fa;
  opacity: 0.8;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.border-danger {
  border-color: #dc3545 !important;
}

.alert-info {
  background-color: #e7f3ff;
  border-color: #b3d9ff;
  color: #0c5460;
}

.form-control:focus,
.form-select:focus {
  border-color: #4640de;
  box-shadow: 0 0 0 0.2rem rgba(70, 64, 222, 0.25);
}

.btn-primary {
  background-color: #4640de;
  border-color: #4640de;
}

.btn-primary:hover {
  background-color: #3b36b8;
  border-color: #3b36b8;
}

.btn-outline-primary {
  color: #4640de;
  border-color: #4640de;
}

.btn-outline-primary:hover {
  background-color: #4640de;
  border-color: #4640de;
  color: white;
}

@media (max-width: 768px) {
  .d-flex.justify-content-end {
    flex-direction: column;
    gap: 0.5rem;
  }

  .d-flex.justify-content-end .btn {
    width: 100%;
  }

  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start !important;
  }
}
</style>
