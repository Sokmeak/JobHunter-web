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
              @click="toggleTwoFactor"
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
            @click="terminateAllSessions"
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
                @click="terminateSession(session.id)"
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
          <button class="btn btn-primary" @click="saveSecuritySettings">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Security",
  setup() {
    const security = ref({
      twoFactor: {
        enabled: false,
      },
      sessions: [
        {
          id: 1,
          device: "MacBook Pro",
          location: "San Francisco, CA",
          browser: "Chrome 120.0",
          lastActive: "2 minutes ago",
          current: true,
        },
        {
          id: 2,
          device: "iPhone 15",
          location: "San Francisco, CA",
          browser: "Safari Mobile",
          lastActive: "1 hour ago",
          current: false,
        },
      ],
      preferences: {
        emailOnLogin: true,
        sessionTimeout: true,
      },
    });

    const getDeviceIcon = (device) => {
      if (device.includes("iPhone") || device.includes("Android")) {
        return "bi bi-phone";
      } else if (device.includes("Mac") || device.includes("Windows")) {
        return "bi bi-laptop";
      }
      return "bi bi-device-hdd";
    };

    const toggleTwoFactor = () => {
      security.value.twoFactor.enabled = !security.value.twoFactor.enabled;
      const action = security.value.twoFactor.enabled ? "enabled" : "disabled";
      alert(`Two-factor authentication ${action}`);
    };

    const terminateSession = (sessionId) => {
      if (confirm("Are you sure you want to terminate this session?")) {
        const index = security.value.sessions.findIndex(
          (s) => s.id === sessionId
        );
        if (index > -1) {
          security.value.sessions.splice(index, 1);
        }
      }
    };

    const terminateAllSessions = () => {
      if (
        confirm(
          "This will sign you out of all devices except this one. Continue?"
        )
      ) {
        security.value.sessions = security.value.sessions.filter(
          (s) => s.current
        );
        alert("All other sessions have been terminated");
      }
    };

    const saveSecuritySettings = () => {
      alert("Security preferences saved successfully!");
    };

    return {
      security,
      getDeviceIcon,
      toggleTwoFactor,
      terminateSession,
      terminateAllSessions,
      saveSecuritySettings,
    };
  },
};
</script>
