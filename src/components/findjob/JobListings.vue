<template>
  <div class="job-listings">
    <!-- Header with Title, Sort, and View Toggle -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fs-3 fw-bold mb-0">All Jobs</h2>
        <p class="text-secondary small">Showing {{ totalItems }} results</p>
      </div>
      <div class="d-flex align-items-center gap-3">
        <!-- Sort Dropdown -->
        <div class="d-flex align-items-center">
          <span class="text-secondary small me-2">Sort by:</span>
          <select
            v-model="sortOption"
            class="form-select form-select-sm"
            @change="sortJobs"
          >
            <option value="relevant">Most relevant</option>
            <option value="newest">Newest</option>
            <option value="salary">Highest salary</option>
          </select>
        </div>
        <!-- View Mode Toggle -->
        <div class="btn-group">
          <button
            class="btn btn-sm"
            :class="
              viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="viewMode = 'grid'"
            title="Grid View"
          >
            <grid-icon size="16" />
          </button>
          <button
            class="btn btn-sm"
            :class="
              viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="viewMode = 'list'"
            title="List View"
          >
            <list-icon size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- Job Listings -->
    <div
      :class="[
        viewMode === 'list'
          ? 'd-flex flex-column gap-4'
          : 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4',
      ]"
    >
      <div
        v-for="job in sortedJobs"
        :key="job.id"
        :class="viewMode === 'grid' ? 'col' : ''"
      >
        <job-card :job="job" :context="context" />
      </div>
    </div>

    <!-- Pagination -->
    <pagination
      v-if="totalItems > initialPerPage"
      :total-items="totalItems"
      :initial-page="initialPage"
      :initial-per-page="initialPerPage"
      @page-change="emit('page-change', $event)"
      @per-page-change="emit('per-page-change', $event)"
      class="mt-5"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { GridIcon, ListIcon } from "lucide-vue-next";
import JobCard from "./JobCard.vue";
import Pagination from "../sharecomponents/Pagination.vue";

// Props
const props = defineProps({
  context: {
    type: String,
    default: "Landing",
  },
  jobs: {
    type: Array,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  initialPage: {
    type: Number,
    default: 1,
  },
  initialPerPage: {
    type: Number,
    default: 6,
  },
});

// Emits
const emit = defineEmits(["page-change", "per-page-change", "sort-change"]);

// Reactive state
const viewMode = ref("list");
const sortOption = ref("relevant");

// Computed property for sorted jobs
const sortedJobs = computed(() => {
  const jobsCopy = [...props.jobs];
  switch (sortOption.value) {
    case "newest":
      return jobsCopy.sort(
        (a, b) => new Date(b.posted_at) - new Date(a.posted_at)
      );
    case "salary":
      return jobsCopy.sort((a, b) => {
        const getSalary = (job) => {
          if (!job.salary_range) return 0;
          const match = job.salary_range.match(/(\d+)/);
          return match ? parseInt(match[0]) : 0;
        };
        return getSalary(b) - getSalary(a);
      });
    case "relevant":
    default:
      return jobsCopy; // Maintain original order or apply relevance logic if available
  }
});

// Methods
function sortJobs() {
  emit("sort-change", sortOption.value);
}
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *;

.job-listings {
  padding: 1rem 0;
}

.fs-3 {
  font-size: 1.75rem !important;
}

.text-secondary {
  color: #6c757d !important;
}

.gap-3 {
  gap: 1.5rem !important;
}

.btn-primary {
  background-color: var(--primary-color, #007bff);
  border-color: var(--primary-color, #007bff);
  color: white;
}

.btn-outline-secondary {
  border-color: #dee2e6;
  color: #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #f8f9fa;
  border-color: #ced4da;
  color: #495057;
}

.form-select-sm {
  min-width: 120px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.d-flex.flex-column.gap-4 {
  gap: 1.5rem !important;
}

.row.g-4 {
  gap: 1.5rem;
}
</style>
