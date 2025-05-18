<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fs-3 fw-bold mb-0">All Jobs</h2>
        <p class="text-secondary small">Showing {{ totalItems }} results</p>
      </div>
      <div class="d-flex align-items-center gap-3">
        <div class="d-flex align-items-center">
          <span class="text-secondary small me-2">Sort by:</span>
          <div class="position-relative">
            <select class="form-select form-select-sm">
              <option>Most relevant</option>
              <option>Newest</option>
              <option>Highest salary</option>
            </select>
          </div>
        </div>

        <div class="btn-group">
          <button
            class="btn btn-sm"
            :class="
              viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="viewMode = 'grid'"
          >
            <grid-icon size="16" />
          </button>
          <button
            class="btn btn-sm"
            :class="
              viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="viewMode = 'list'"
          >
            <list-icon size="16" />
          </button>
        </div>
      </div>
    </div>

    <div>
      <pagination
        :total-items="totalItems"
        :initial-page="initialPage"
        :initial-per-page="initialPerPage"
        @page-change="emit('page-change', $event)"
        @per-page-change="emit('per-page-change', $event)"
      />
    </div>

    <div
      :class="[
        viewMode === 'list'
          ? 'd-flex flex-column gap-4'
          : 'row row-cols-1 row-cols-md-2 g-4',
      ]"
    >
      <div
        v-for="job in jobs"
        :key="job.id"
        :class="viewMode === 'grid' ? 'col' : ''"
      >
        <job-card :job="job" />
      </div>
    </div>

    <pagination
      :total-items="totalItems"
      :initial-page="initialPage"
      :initial-per-page="initialPerPage"
      @page-change="emit('page-change', $event)"
      @per-page-change="emit('per-page-change', $event)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { GridIcon, ListIcon } from "lucide-vue-next";
import JobCard from "./JobCard.vue";
import Pagination from "../sharecomponents/Pagination.vue";

const viewMode = ref("list");

const props = defineProps({
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

const emit = defineEmits(["page-change", "per-page-change"]);
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *;

.primary-color {
  color: var(--primary-color);
}
.gap-3 {
  gap: 1.5rem !important;
}
.btn {
  color: var(--primary-color);
}
/* Increase gap between pagination items */
.pagination {
  gap: 0.75rem; /* Adds space between pagination items */
}

.page-item {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.page-link {
  padding: 0.5rem 0.75rem; /* Ensure buttons have consistent padding */
}
</style>
