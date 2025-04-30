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
        <button class="btn btn-primary" @click="updateEmail">
          Update Email
        </button>
      </div>
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
        <div class="form-text">Minimum 8 characters</div>
      </div>

      <div>
        <button
          class="btn btn-primary"
          @click="changePassword"
          :disabled="
            !passwordData.oldPassword ||
            !passwordData.newPassword ||
            passwordData.newPassword.length < 8
          "
        >
          Change Password
        </button>
      </div>
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
export default {
  name: "LoginSettings",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newEmail: "",
      passwordData: {
        oldPassword: "",
        newPassword: "",
      },
    };
  },
  methods: {
    updateEmail() {
      if (this.newEmail && this.validateEmail(this.newEmail)) {
        this.$emit("update-email", this.newEmail);
        this.newEmail = "";
      } else {
        alert("Please enter a valid email address");
      }
    },
    changePassword() {
      if (
        this.passwordData.oldPassword &&
        this.passwordData.newPassword &&
        this.passwordData.newPassword.length >= 8
      ) {
        this.$emit("change-password", this.passwordData);
        this.passwordData = {
          oldPassword: "",
          newPassword: "",
        };
      }
    },
    confirmCloseAccount() {
      if (
        confirm(
          "Are you sure you want to close your account? This action cannot be undone."
        )
      ) {
        // Handle account closure
        console.log("Account closure requested");
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
