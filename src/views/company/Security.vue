<template>
  <div class="security-settings">
    <!-- Two-Factor Authentication -->
    <div class="card mb-4">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Two-Factor Authentication</h5>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="fw-semibold mb-1">Authenticator App</h6>
            <p class="text-muted mb-0">
              Use an authenticator app to generate verification codes
            </p>
          </div>
          <div>
            <span
              v-if="security.twoFactor.enabled"
              class="badge bg-success me-2"
              >Enabled</span
            >
            <span v-else class="badge bg-secondary me-2">Disabled</span>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="toggleTwoFactorHandler"
            >
              {{ security.twoFactor.enabled ? "Disable" : "Enable" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Sessions -->
    <div class="card mb-4">
      <div class="card-header bg-white border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0 fw-bold">Active Sessions</h5>
          <button
            class="btn btn-outline-danger btn-sm"
            @click="terminateAllSessionsHandler"
          >
            Terminate All Sessions
          </button>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="list-group list-group-flush">
          <div
            class="list-group-item"
            v-for="session in security.sessions"
            :key="session.id"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <i
                  :class="getDeviceIcon(session.device)"
                  class="me-3 text-muted"
                ></i>
                <div>
                  <h6 class="mb-1 fw-semibold">{{ session.device }}</h6>
                  <div class="small text-muted">
                    {{ session.location }} • {{ session.browser }}
                    <span v-if="session.current" class="badge bg-success ms-2"
                      >Current</span
                    >
                  </div>
                  <div class="small text-muted">
                    Last active: {{ session.lastActive }}
                  </div>
                </div>
              </div>
              <button
                v-if="!session.current"
                class="btn btn-outline-danger btn-sm"
                @click="terminateSessionHandler(session.id)"
              >
                Terminate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Preferences -->
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Security Preferences</h5>
      </div>
      <div class="card-body">
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="emailOnLogin"
            v-model="security.preferences.emailOnLogin"
          />
          <label class="form-check-label" for="emailOnLogin">
            <strong>Email me when I sign in from a new device</strong>
            <div class="small text-muted">
              Get notified of suspicious login activity
            </div>
          </label>
        </div>
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="sessionTimeout"
            v-model="security.preferences.sessionTimeout"
          />
          <label class="form-check-label" for="sessionTimeout">
            <strong>Automatic session timeout</strong>
            <div class="small text-muted">
              Sign me out after 30 minutes of inactivity
            </div>
          </label>
        </div>

        <div class="d-flex justify-content-end">
          <button class="btn btn-primary" @click="saveSecuritySettingsHandler">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSecurityStore } from "@/stores/company/security";

const security = useSecurityStore();

const getDeviceIcon = (device) => {
  if (device.includes("iPhone") || device.includes("Android")) {
    return "bi bi-phone";
  } else if (device.includes("Mac") || device.includes("Windows")) {
    return "bi bi-laptop";
  }
  return "bi bi-device-hdd";
};

const toggleTwoFactorHandler = () => {
  const enabled = security.toggleTwoFactor();
  alert(`Two-factor authentication ${enabled ? "enabled" : "disabled"}`);
};

const terminateSessionHandler = (id) => {
  if (confirm("Are you sure you want to terminate this session?")) {
    security.terminateSession(id);
  }
};

const terminateAllSessionsHandler = () => {
  if (
    confirm("This will sign you out of all devices except this one. Continue?")
  ) {
    security.terminateAllSessions();
    alert("All other sessions have been terminated");
  }
};

const saveSecuritySettingsHandler = () => {
  security.saveSecuritySettings();
  alert("Security preferences saved successfully!");
};
</script>
