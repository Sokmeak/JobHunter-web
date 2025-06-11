<template>
  <div class="api-keys-settings">
    <!-- API Keys -->
    <div class="card mb-4">
      <div class="card-header bg-white border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0 fw-bold">API Keys</h5>
          <button class="btn btn-primary" @click="showCreateModal = true">
            <i class="bi bi-plus me-1"></i>
            Create New Key
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th class="border-0">Name</th>
              <th class="border-0">Key</th>
              <th class="border-0">Created</th>
              <th class="border-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="key in apiKeys" :key="key.id">
              <td>
                <div>
                  <h6 class="mb-0 fw-semibold">{{ key.name }}</h6>
                  <small class="text-muted">{{ key.description }}</small>
                </div>
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
                  @click="deleteKey(key)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create API Key Modal -->
    <div
      class="modal fade show d-block"
      v-if="showCreateModal"
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
              @click="showCreateModal = false"
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
              type="button"
              class="btn btn-outline-secondary"
              @click="showCreateModal = false"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-primary" @click="createApiKey">
              Create API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ApiKeys",
  setup() {
    const showCreateModal = ref(false);

    const apiKeys = ref([
      {
        id: 1,
        name: "Production API",
        description: "Main production API key",
        value: "jh_live_1234567890abcdef1234567890abcdef",
        masked: "jh_live_1234...cdef",
        created: "Dec 1, 2023",
      },
    ]);

    const newKey = ref({
      name: "",
      description: "",
    });

    const copyKey = (keyValue) => {
      navigator.clipboard.writeText(keyValue).then(() => {
        alert("API key copied to clipboard!");
      });
    };

    const createApiKey = () => {
      if (!newKey.value.name) {
        alert("Please enter a key name");
        return;
      }

      const generatedKey =
        "jh_live_" + Math.random().toString(36).substring(2, 34);

      apiKeys.value.push({
        id: Date.now(),
        name: newKey.value.name,
        description: newKey.value.description,
        value: generatedKey,
        masked: generatedKey.substring(0, 12) + "..." + generatedKey.slice(-4),
        created: "Just now",
      });

      showCreateModal.value = false;
      newKey.value = { name: "", description: "" };
      alert("API key created successfully!");
    };

    const deleteKey = (key) => {
      if (
        confirm(`Are you sure you want to delete the API key "${key.name}"?`)
      ) {
        const index = apiKeys.value.findIndex((k) => k.id === key.id);
        if (index > -1) {
          apiKeys.value.splice(index, 1);
        }
      }
    };

    return {
      showCreateModal,
      apiKeys,
      newKey,
      copyKey,
      createApiKey,
      deleteKey,
    };
  },
};
</script>
