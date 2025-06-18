import { defineStore } from "pinia";
import { ref } from "vue";

export const useIntegrationStore = defineStore("integrationStore", () => {
  const availableIntegrations = ref([
    {
      id: 1,
      name: "Slack",
      description:
        "Get notifications and updates directly in your Slack workspace",
      category: "Communication",
      logo: "/placeholder.svg?height=48&width=48",
      connected: true,
    },
    {
      id: 2,
      name: "Google Calendar",
      description: "Sync interview schedules with your Google Calendar",
      category: "Calendar",
      logo: "/placeholder.svg?height=48&width=48",
      connected: false,
    },
    {
      id: 3,
      name: "Zoom",
      description: "Automatically create Zoom meetings for interviews",
      category: "Video Conferencing",
      logo: "/placeholder.svg?height=48&width=48",
      connected: false,
    },
  ]);

  const toggleIntegration = (integrationId) => {
    const item = availableIntegrations.value.find(
      (i) => i.id === integrationId
    );
    if (item) {
      item.connected = !item.connected;
      const status = item.connected ? "connected" : "disconnected";
      alert(`${item.name} ${status} successfully!`);
    }
  };

  return {
    availableIntegrations,
    toggleIntegration,
  };
});
