<template>
  <div class="integrations-settings">
    <!-- Available Integrations -->
    <div class="mb-4">
      <h5 class="fw-bold mb-3">Available Integrations</h5>
      <div class="row">
        <div
          class="col-lg-6 mb-4"
          v-for="integration in availableIntegrations"
          :key="integration.id"
        >
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex align-items-start">
                <img
                  :src="integration.logo"
                  class="me-3"
                  width="48"
                  height="48"
                  :alt="integration.name"
                />
                <div class="flex-grow-1">
                  <div
                    class="d-flex justify-content-between align-items-start mb-2"
                  >
                    <h6 class="fw-bold mb-0">{{ integration.name }}</h6>
                    <span v-if="integration.connected" class="badge bg-success"
                      >Connected</span
                    >
                    <span v-else class="badge bg-secondary">Not Connected</span>
                  </div>
                  <p class="text-muted small mb-3">
                    {{ integration.description }}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="small text-muted">
                      {{ integration.category }}
                    </div>
                    <button
                      class="btn btn-sm"
                      :class="
                        integration.connected
                          ? 'btn-outline-danger'
                          : 'btn-primary'
                      "
                      @click="toggleIntegration(integration)"
                    >
                      {{ integration.connected ? "Disconnect" : "Connect" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Integrations",
  setup() {
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

    const toggleIntegration = (integration) => {
      integration.connected = !integration.connected;
      const status = integration.connected ? "connected" : "disconnected";
      alert(`${integration.name} ${status} successfully!`);
    };

    return {
      availableIntegrations,
      toggleIntegration,
    };
  },
};
</script>
