import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: {
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
    },
  }),
  actions: {
    saveNotifications() {
      // Here you would usually send API request to save settings
      alert("Notification preferences saved successfully!");
    },
    resetDefaults() {
      this.notifications = {
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
      };
      alert("Notification preferences reset to defaults!");
    },
  },
});
