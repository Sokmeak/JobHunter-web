<template>
  <div class="api-keys-settings">
    <!-- API Keys -->
    <div class="card mb-4">
      <div class="card-header bg-white border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0 fw-bold">API Keys</h5>
          <button class="btn btn-primary" @click="toggleCreateModal(true)">
            <i class="bi bi-plus me-1"></i>
            Create New Key
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="key in apiKeys" :key="key.id">
              <td>
                <h6 class="mb-0 fw-semibold">{{ key.name }}</h6>
                <small class="text-muted">{{ key.description }}</small>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <code class="me-2">{{ key.masked }}</code>
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    @click="copyKey(key.value)"
                  >
                    <i class="bi bi-copy"></i>
                  </button>
                </div>
              </td>
              <td class="text-muted">{{ key.created }}</td>
              <td>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteKey(key.id)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showCreateModal"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Create New API Key</h5>
            <button
              type="button"
              class="btn-close"
              @click="toggleCreateModal(false)"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createApiKey">
              <div class="mb-3">
                <label class="form-label fw-semibold"
                  >Key Name <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="newKey.name"
                  placeholder="e.g. Production API Key"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Description</label>
                <textarea
                  class="form-control"
                  rows="2"
                  v-model="newKey.description"
                  placeholder="Brief description of what this key will be used for"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-outline-secondary"
              @click="toggleCreateModal(false)"
            >
              Cancel
            </button>
            <button class="btn btn-primary" @click="createApiKey">
              Create API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApiKeyStore } from "@/stores/company/apiKeyStore";

const store = useApiKeyStore();
const { apiKeys, showCreateModal, newKey } = storeToRefs(store);
const { toggleCreateModal, copyKey, createApiKey, deleteKey } = store;
</script>
