<template>
  <div class="help-center">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-0">Help Center</h2>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="text-muted">Back to knowledge</span>
        <i class="bi bi-arrow-right text-muted"></i>
      </div>
    </div>

    <!-- Search -->
    <div class="row mb-4">
      <div class="col-md-8">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            placeholder="Ask any questions to search support..."
            v-model="store.searchQuery"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-3">
        <div class="card">
          <div class="card-header bg-white border-bottom">
            <h6 class="mb-0 fw-bold">Help Topics</h6>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <a
                href="#"
                class="list-group-item list-group-item-action border-0"
                :class="{ active: store.selectedCategory === category }"
                v-for="category in store.categories"
                :key="category"
                @click.prevent="store.selectedCategory = category"
              >
                {{ category }}
              </a>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div
            class="card-body text-center"
            style="
              background: linear-gradient(
                135deg,
                var(--primary-color),
                #6366f1
              );
            "
          >
            <div class="text-white">
              <h6 class="fw-bold mb-2">Getting started for your business</h6>
              <p class="small mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <button class="btn btn-light btn-sm">Contact Us</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main -->
      <div class="col-md-9">
        <div class="card">
          <div class="card-body">
            <div
              v-for="topic in store.filteredTopics"
              :key="topic.id"
              class="faq-item border-bottom pb-3 mb-3"
            >
              <div
                class="d-flex justify-content-between align-items-center cursor-pointer"
                @click="store.toggleTopic(topic.id)"
              >
                <h6 class="fw-semibold mb-0">{{ topic.question }}</h6>
                <i
                  :class="[
                    'bi',
                    store.expandedTopics.includes(topic.id)
                      ? 'bi-chevron-up'
                      : 'bi-chevron-down',
                  ]"
                ></i>
              </div>

              <div v-if="store.expandedTopics.includes(topic.id)" class="mt-3">
                <p class="text-muted mb-3">{{ topic.answer }}</p>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="text-muted small me-3"
                      >Was this article helpful?</span
                    >
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-success btn-sm"
                        :class="{ active: topic.helpful === true }"
                        @click="store.markHelpful(topic.id, true)"
                      >
                        <i class="bi bi-hand-thumbs-up me-1"></i> Yes
                      </button>
                      <button
                        class="btn btn-outline-danger btn-sm"
                        :class="{ active: topic.helpful === false }"
                        @click="store.markHelpful(topic.id, false)"
                      >
                        <i class="bi bi-hand-thumbs-down me-1"></i> No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="store.filteredTopics.length === 0"
              class="text-center py-5"
            >
              <i class="bi bi-search fs-1 text-muted mb-3"></i>
              <h5 class="text-muted">No results found</h5>
              <p class="text-muted">
                Try adjusting your search terms or browse categories.
              </p>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-body text-center">
            <h6 class="fw-bold mb-2">Still need help?</h6>
            <p class="text-muted mb-3">
              Can't find what you're looking for? Contact our support team.
            </p>
            <button class="btn btn-primary">
              <i class="bi bi-chat-dots me-1"></i> Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHelpCenterStore } from "@/stores/company/helpCenterStore";
const store = useHelpCenterStore();
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.faq-item:hover {
  background-color: var(--bg-light);
  border-radius: 8px;
  padding: 1rem;
  margin: -1rem;
  margin-bottom: 0.5rem;
}
.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
.btn-group .btn.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}
</style>
