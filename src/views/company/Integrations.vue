<template>
  <div class="integrations-settings">
    <!-- Available Integrations -->
    <div class="mb-4">
      <h5 class="fw-bold mb-3">Available Integrations</h5>
      <div class="row">
        <div
          class="col-lg-6 mb-4"
          v-for="integration in store.availableIntegrations"
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
                    <span
                      :class="[
                        'badge',
                        integration.connected ? 'bg-success' : 'bg-secondary',
                      ]"
                    >
                      {{
                        integration.connected ? "Connected" : "Not Connected"
                      }}
                    </span>
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
                      @click="store.toggleIntegration(integration.id)"
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

<script setup>
import { useIntegrationStore } from "@/stores/company/integrationStore";
const store = useIntegrationStore();
</script>
