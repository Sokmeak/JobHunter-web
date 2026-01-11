import { defineStore } from "pinia";

export const useSecurityStore = defineStore("security", {
  state: () => ({
    twoFactorEnabled: false,
    sessions: [],
    preferences: {
      emailOnLogin: true,
      sessionTimeout: true,
    },
  }),
  actions: {
    toggleTwoFactor() {
      this.twoFactorEnabled = !this.twoFactorEnabled;
    },
    setSessions(sessions) {
      this.sessions = sessions;
    },
    terminateSession(id) {
      this.sessions = this.sessions.filter((s) => s.id !== id);
    },
    terminateAllExceptCurrent() {
      this.sessions = this.sessions.filter((s) => s.current);
    },
  },
});
