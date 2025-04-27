<template>
  <div>
    <filter-section
      title="Type of Employment"
      :items="employmentTypes"
      :selectedItems="selectedFilters.employmentTypes"
      @update:selected="updateSelected('employmentTypes', $event)"
    />

    <filter-section
      title="Categories"
      :items="categories"
      :selectedItems="selectedFilters.categories"
      @update:selected="updateSelected('categories', $event)"
    />

    <filter-section
      title="Job Level"
      :items="jobLevels"
      :selectedItems="selectedFilters.jobLevels"
      @update:selected="updateSelected('jobLevels', $event)"
    />

    <filter-section
      title="Salary Range"
      :items="salaryRanges"
      :selectedItems="selectedFilters.salaryRanges"
      @update:selected="updateSelected('salaryRanges', $event)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import FilterSection from "./FilterSection.vue";

const props = defineProps({
  employmentTypes: Array,
  categories: Array,
  jobLevels: Array,
  salaryRanges: Array,
  selectedFilters: Object,
});

const emit = defineEmits(["update:filters"]);

const updateSelected = (filterType, selectedItems) => {
  emit("update:filters", filterType, selectedItems);
};
</script>

<style>


</style>
