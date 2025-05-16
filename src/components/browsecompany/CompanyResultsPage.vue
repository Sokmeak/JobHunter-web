<template>
  <div class="company-results">
    <!-- Header with result count and sorting/view options -->
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

    <!-- Company cards grid/list -->
    <div :class="viewMode === 'grid' ? 'row row-cols-1 row-cols-md-2 g-4' : ''">
      <div
        v-for="company in companies"
        :key="company.id"
        :class="viewMode === 'grid' ? 'col' : 'mb-3'"
      >
        <!-- <div class="card h-100" :class="viewMode === 'list' ? 'd-flex flex-row' : ''"> -->
        <!-- Company logo -->

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

/* Custom colors for badges */
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
</style>
