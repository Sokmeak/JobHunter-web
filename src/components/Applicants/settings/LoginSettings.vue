<template>
  <div>
    <div class="section mb-4">
      <h5 class="mb-2">Basic Information</h5>
      <p class="text-muted mb-4">
        This is login information that you can update anytime.
      </p>
    </div>

    <div class="section mb-4">
      <h5 class="mb-3">Update Email</h5>
      <p class="text-muted mb-3">
        Update your email address to make sure it is safe
      </p>

      <div class="d-flex align-items-start mb-3">
        <div class="flex-grow-1">
          <div class="current-email mb-1">{{ user.email }}</div>
          <div class="text-success">
            <i class="bi bi-check-circle me-1"></i>
            Your email address is verified.
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="newEmail" class="form-label">Update Email</label>
        <input
          type="email"
          class="form-control"
          id="newEmail"
          v-model="newEmail"
          placeholder="Enter your new email"
        />
      </div>

      <div>
        <button
          class="btn btn-primary"
          @click="updateEmail"
          :disabled="isSaving || !newEmail"
        >
          {{ isSaving ? "Updating..." : "Update Email" }}
        </button>
      </div>
      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </div>

    <div class="section mb-4">
      <h5 class="mb-3">New Password</h5>
      <p class="text-muted mb-3">
        Manage your password to make sure it is safe
      </p>

      <div class="mb-3">
        <label for="oldPassword" class="form-label">Old Password</label>
        <input
          type="password"
          class="form-control"
          id="oldPassword"
          v-model="passwordData.oldPassword"
          placeholder="Enter your old password"
        />
        <div class="form-text">Minimum 8 characters</div>
      </div>

      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          type="password"
          class="form-control"
          id="newPassword"
          v-model="passwordData.newPassword"
          placeholder="Enter your new password"
        />
        <div class="form-text">Minimum 8 characters, include letters and numbers</div>
      </div>

      <div>
        <button
          class="btn btn-primary"
          @click="changePassword"
          :disabled="isSaving || !isPasswordValid"
        >
          {{ isSaving ? "Changing..." : "Change Password" }}
        </button>
      </div>
      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </div>

    <div class="d-flex justify-content-between align-items-center">
      <button class="btn btn-link text-danger p-0" @click="confirmCloseAccount">
        Close Account
      </button>
      <div class="text-danger">
        <i class="bi bi-exclamation-circle"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";

export default {
  name: "LoginSettings",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const profileStore = useUserProfileStore();
    return { profileStore };
  },
  data() {
    return {
      newEmail: "",
      passwordData: {
        oldPassword: "",
        newPassword: "",
      },
      error: null,
      isSaving: false,
    };
  },
  computed: {
    isPasswordValid() {
      return (
        this.passwordData.oldPassword &&
        this.passwordData.newPassword &&
        this.passwordData.newPassword.length >= 8 &&
        /[a-zA-Z]/.test(this.passwordData.newPassword) &&
        /[0-9]/.test(this.passwordData.newPassword)
      );
    },
  },
  methods: {
    async updateEmail() {
      if (!this.validateEmail(this.newEmail)) {
        this.error = "Please enter a valid email address.";
        return;
      }

      this.error = null;
      this.isSaving = true;

      try {
        const profileData = { jobseeker_email: this.newEmail };
        const success = await this.profileStore.updateProfile(profileData);
        if (success) {
          await this.profileStore.fetchProfile();
          this.newEmail = "";
          this.$emit("email-updated", profileData.jobseeker_email);
        } else {
          throw new Error("Email update failed.");
        }
      } catch (err) {
        this.error = this.profileStore.error || "Failed to update email. Please try again.";
        console.error("Update email error:", err);
      } finally {
        this.isSaving = false;
      }
    },
    async changePassword() {
      if (!this.isPasswordValid) {
        this.error = "Please enter valid passwords (minimum 8 characters, letters, and numbers).";
        return;
      }

      this.error = null;
      this.isSaving = true;

      try {
        const success = await this.profileStore.changePassword({
          currentPassword: this.passwordData.oldPassword,
          newPassword: this.passwordData.newPassword,
        });
        if (success) {
          this.passwordData = { oldPassword: "", newPassword: "" };
          this.$emit("password-changed");
        } else {
          throw new Error("Password change failed.");
        }
      } catch (err) {
        this.error = this.profileStore.error || "Failed to change password. Please try again.";
        console.error("Change password error:", err);
      } finally {
        this.isSaving = false;
      }
    },
    async confirmCloseAccount() {
      if (
        !confirm(
          "Are you sure you want to close your account? This action cannot be undone."
        )
      ) {
        return;
      }

      this.error = null;
      this.isSaving = true;

      try {
        // Placeholder: No backend endpoint exists
        console.warn("Account closure requested - no backend endpoint available.");
        this.error = "Account closure is not supported yet. Please contact support.";
      } catch (err) {
        this.error = "Failed to close account. Please try again.";
        console.error("Close account error:", err);
      } finally {
        this.isSaving = false;
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
.section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 20px;
}

.current-email {
  font-weight: 500;
}

.btn-link {
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>