<!-- <template>
  <div class="company-results">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fs-4 fw-bold">All Jobs</h2>
        <p class="small text-muted">Showing {{ totalResults }} results</p>
      </div>

      <div class="d-flex align-items-center">
        <div class="sort-by me-3">
          <span class="small me-2">Sort by:</span>
          <select
            v-model="sortOption"
            class="form-select form-select-sm"
            @change="$emit('sort-change', sortOption)"
          >
            <option value="relevant">Most relevant</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div class="btn-group">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            :class="{ active: viewMode === 'grid' }"
            @click="changeViewMode('grid')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-grid"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zM10.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
              />
            </svg>
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            :class="{ active: viewMode === 'list' }"
            @click="changeViewMode('list')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>


    <div :class="viewMode === 'grid' ? 'row row-cols-1 row-cols-md-2 g-4' : ''">
      <div
        v-for="company in companies"
        :key="company.id"
        :class="viewMode === 'grid' ? 'col' : 'mb-3'"
      >
     

        <RecommendedCompanyCard :company="company"> </RecommendedCompanyCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import RecommendedCompanyCard from "./RecommendedCompanyCard.vue";

const props = defineProps({
  companies: {
    type: Array,
    required: true,
  },
  totalResults: {
    type: Number,
    default: 0,
  },
  initialViewMode: {
    type: String,
    default: "grid",
  },
  initialSortOption: {
    type: String,
    default: "relevant",
  },
});

const emit = defineEmits(["view-change", "sort-change"]);

const viewMode = ref(props.initialViewMode);
const sortOption = ref(props.initialSortOption);

// Change view mode and emit event
function changeViewMode(mode) {
  viewMode.value = mode;
  emit("view-change", mode);
}

// Generate consistent background color for company logos
function getLogoBackground(name) {
  const colors = [
    "#0d6efd", // primary
    "#6610f2", // purple
    "#6f42c1", // indigo
    "#d63384", // pink
    "#dc3545", // danger
    "#fd7e14", // orange
    "#198754", // success
  ];

  // Use the sum of character codes to pick a color
  const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
}

// Get appropriate class for tag based on tag name
function getTagClass(tag) {
  const tagClasses = {
    Business: "bg-success bg-opacity-25 text-success",
    Blockchain: "bg-warning bg-opacity-25 text-warning",
    "Payment gateway": "bg-primary bg-opacity-25 text-primary",
    Fintech: "bg-purple bg-opacity-25 text-purple",
    Consumer: "bg-info bg-opacity-25 text-info",
    Crypto: "bg-warning bg-opacity-25 text-warning",
    Payments: "bg-primary bg-opacity-25 text-primary",
    Banking: "bg-indigo bg-opacity-25 text-indigo",
    Exchange: "bg-warning bg-opacity-25 text-warning",
    Investing: "bg-success bg-opacity-25 text-success",
    Saas: "bg-secondary bg-opacity-25 text-secondary",
  };

  return tagClasses[tag] || "bg-secondary bg-opacity-25 text-secondary";
}
</script>

<style scoped>
.company-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


.bg-purple {
  background-color: rgba(111, 66, 193, 0.2);
}

.text-purple {
  color: #6f42c1;
}

.bg-indigo {
  background-color: rgba(102, 16, 242, 0.2);
}

.text-indigo {
  color: #6610f2;
}
</style> -->

<template>
  <div class="company-results">
    <!-- Header with result count and sorting/view options -->
    <div class="header-section">
      <div class="results-info">
        <h2 class="results-title">All Jobs</h2>
        <p class="results-count" v-if="totalResults > 0">
          Showing {{ formatNumber(totalResults) }}
          {{ totalResults === 1 ? "result" : "results" }}
        </p>
        <p class="results-count" v-else-if="!isLoading">No results found</p>
      </div>

      <div class="controls-section" v-if="totalResults > 0 || isLoading">
        <div class="sort-controls">
          <label for="sort-select" class="sort-label">Sort by:</label>
          <select
            id="sort-select"
            v-model="sortOption"
            class="sort-select"
            @change="$emit('sort-change', sortOption)"
          >
            <option value="relevant">Most relevant</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Company name</option>
            <option value="size">Company size</option>
          </select>
        </div>

        <div class="view-toggle">
          <button
            type="button"
            class="view-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="changeViewMode('grid')"
            aria-label="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zM10.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
              />
            </svg>
          </button>
          <button
            type="button"
            class="view-btn"
            :class="{ active: viewMode === 'list' }"
            @click="changeViewMode('list')"
            aria-label="List view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div
        class="loading-grid"
        :class="viewMode === 'grid' ? 'grid-layout' : 'list-layout'"
      >
        <div v-for="n in 6" :key="n" class="loading-card">
          <div class="loading-shimmer"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="companies.length === 0" class="empty-state">
      <div class="empty-content">
        <div class="empty-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
            <circle cx="12" cy="10" r="2" />
          </svg>
        </div>

        <h3 class="empty-title">No companies found</h3>
        <p class="empty-description">
          We couldn't find any companies matching your criteria.
          <br />Try adjusting your search filters or explore different options.
        </p>

        <div class="empty-actions">
          <button class="btn-primary" @click="$emit('clear-search')">
            Clear all filters
          </button>
          <button class="btn-secondary" @click="$emit('browse-all')">
            Browse all companies
          </button>
        </div>

        <!-- Suggestions -->
        <div class="suggestions" v-if="searchSuggestions.length > 0">
          <p class="suggestions-title">Try searching for:</p>
          <div class="suggestions-list">
            <button
              v-for="suggestion in searchSuggestions"
              :key="suggestion"
              class="suggestion-tag"
              @click="$emit('search-suggestion', suggestion)"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Company cards grid/list -->
    <div
      v-else
      :class="viewMode === 'grid' ? 'companies-grid' : 'companies-list'"
    >
      <div v-for="company in companies" :key="company.id" class="company-item">
        <RecommendedCompanyCard :company="company" :view-mode="viewMode" />
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && companies.length > 0" class="load-more-section">
      <button
        class="btn-load-more"
        @click="$emit('load-more')"
        :disabled="isLoadingMore"
      >
        <span v-if="isLoadingMore">Loading...</span>
        <span v-else>Load more companies</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import RecommendedCompanyCard from "./RecommendedCompanyCard.vue";

const props = defineProps({
  companies: {
    type: Array,
    required: true,
  },
  totalResults: {
    type: Number,
    default: 0,
  },
  initialViewMode: {
    type: String,
    default: "grid",
  },
  initialSortOption: {
    type: String,
    default: "relevant",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isLoadingMore: {
    type: Boolean,
    default: false,
  },
  hasMore: {
    type: Boolean,
    default: false,
  },
  searchSuggestions: {
    type: Array,
    default: () => [
      "Technology",
      "Fintech",
      "Healthcare",
      "E-commerce",
      "AI & Machine Learning",
    ],
  },
});

const emit = defineEmits([
  "view-change",
  "sort-change",
  "clear-search",
  "browse-all",
  "search-suggestion",
  "load-more",
]);

const viewMode = ref(props.initialViewMode);
const sortOption = ref(props.initialSortOption);

// Change view mode and emit event
function changeViewMode(mode) {
  viewMode.value = mode;
  emit("view-change", mode);
}

// Format number with commas
function formatNumber(num) {
  return num.toLocaleString();
}

// Generate consistent background color for company logos
function getLogoBackground(name) {
  const colors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
    "#84cc16", // lime
  ];

  const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
}

// Get appropriate class for tag based on tag name
function getTagClass(tag) {
  const tagClasses = {
    Business: "tag-success",
    Blockchain: "tag-warning",
    "Payment gateway": "tag-primary",
    Fintech: "tag-purple",
    Consumer: "tag-info",
    Crypto: "tag-warning",
    Payments: "tag-primary",
    Banking: "tag-indigo",
    Exchange: "tag-warning",
    Investing: "tag-success",
    Saas: "tag-secondary",
  };

  return tagClasses[tag] || "tag-secondary";
}
</script>

<style scoped>
.company-results {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
}

.results-info {
  flex: 1;
}

.results-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.results-count {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.controls-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-label {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
}

.sort-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: white;
  min-width: 140px;
}

.sort-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.view-toggle {
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  overflow: hidden;
}

.view-btn {
  padding: 0.5rem;
  background: white;
  border: none;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn:hover {
  background: #f9fafb;
  color: #374151;
}

.view-btn.active {
  background: #3b82f6;
  color: white;
}

.view-btn:not(:last-child) {
  border-right: 1px solid #d1d5db;
}

/* Loading State */
.loading-state {
  margin-top: 2rem;
}

.loading-grid.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading-grid.list-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loading-card {
  background: #f9fafb;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.grid-layout .loading-card {
  height: 200px;
}

.list-layout .loading-card {
  height: 120px;
}

.loading-shimmer {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f9fafb 25%, #f3f4f6 50%, #f9fafb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Empty State */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 3rem 1rem;
}

.empty-content {
  text-align: center;
  max-width: 500px;
}

.empty-icon {
  color: #9ca3af;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.empty-description {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 2rem 0;
}

.empty-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.suggestions {
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
}

.suggestions-title {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.suggestion-tag {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.suggestion-tag:hover {
  background: #e5e7eb;
  color: #1f2937;
}

/* Company Grid/List */
.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.companies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Load More */
.load-more-section {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.btn-load-more {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-load-more:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-load-more:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .company-results {
    padding: 1rem;
  }

  .header-section {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }

  .controls-section {
    justify-content: space-between;
  }

  .companies-grid {
    grid-template-columns: 1fr;
  }

  .empty-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 200px;
  }
}

/* Tag Styles */
.tag-success {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}
.tag-warning {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}
.tag-primary {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}
.tag-purple {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}
.tag-info {
  background: rgba(6, 182, 212, 0.1);
  color: #0891b2;
}
.tag-indigo {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}
.tag-secondary {
  background: rgba(107, 114, 128, 0.1);
  color: #4b5563;
}
</style>
