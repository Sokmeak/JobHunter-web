import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    email: {
      newApplications: true,
      interviewReminders: true,
      statusUpdates: true,
      weeklyReports: true,
      teamUpdates: false,
      systemUpdates: true,
    },
    push: {
      newApplications: true,
      interviews: true,
      urgent: true,
      messages: false,
    },
    frequency: {
      email: "immediate",
      reports: "weekly",
    },
  }),
  actions: {
    updatePreferences(prefs) {
      this.email = prefs.email;
      this.push = prefs.push;
      this.frequency = prefs.frequency;
    },
  },
});
