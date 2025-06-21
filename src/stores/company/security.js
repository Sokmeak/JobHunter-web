import { defineStore } from "pinia";
import { ref } from "vue";

export const useSecurityStore = defineStore("security", () => {
  const twoFactor = ref({ enabled: false });
  const sessions = ref([
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
  ]);
  const preferences = ref({
    emailOnLogin: true,
    sessionTimeout: true,
  });

  function toggleTwoFactor() {
    twoFactor.value.enabled = !twoFactor.value.enabled;
    return twoFactor.value.enabled;
  }

  function terminateSession(sessionId) {
    const index = sessions.value.findIndex((s) => s.id === sessionId);
    if (index > -1) sessions.value.splice(index, 1);
  }

  function terminateAllSessions() {
    sessions.value = sessions.value.filter((s) => s.current);
  }

  function saveSecuritySettings() {
    // API call can be done here
  }

  return {
    twoFactor,
    sessions,
    preferences,
    toggleTwoFactor,
    terminateSession,
    terminateAllSessions,
    saveSecuritySettings,
  };
});
