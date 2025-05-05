<template>
  <div>
    <pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:page="updatePage"
    />
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fs-3 fw-bold mb-0">All Jobs</h2>
        <p class="text-secondary small">Showing {{ totalResults }} results</p>
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

    <div
      :class="[
        viewMode === 'list'
          ? 'd-flex flex-column gap-4' // more vertical spacing in list view
          : 'row row-cols-1 row-cols-md-2 g-4', // grid view with better spacing
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
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:page="updatePage"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";
import { GridIcon, ListIcon } from "lucide-vue-next";
import JobCard from "./JobCard.vue";
import Pagination from "../sharecomponents/Pagination.vue";

const viewMode = ref("list");

const props = defineProps({
  jobs: Array,
  totalResults: Number,
  currentPage: Number,
});

const emit = defineEmits(["update:page"]);
const jobsPerPage = 10; // Customize this as needed
const totalPages = computed(() => {
  props.totalResults = props.totalResults || 0;

  const pages = Math.ceil(props.totalResults / jobsPerPage);
  return pages > 0 ? pages : 1; // Ensure at least one page
});

const updatePage = (page) => {
  emit("update:page", page);
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; /* <-- important */

.primary-color {
  color: var(--primary-color);
}
.gap-3 {
  gap: 1.5rem !important;
}
.btn{
  color: var(--primary-color)

}
</style>
