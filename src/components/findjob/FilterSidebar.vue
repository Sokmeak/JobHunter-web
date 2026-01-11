<template>
  <div>
    <filter-section
      title="Type of Employment"
      :items="employmentTypes || []"
      :selectedItems="selectedFilters?.employmentTypes || []"
      @update:selected="updateSelected('employmentTypes', $event)"
    />

    <filter-section
      title="Categories"
      :items="categories || []"
      :selectedItems="selectedFilters?.categories || []"
      @update:selected="updateSelected('categories', $event)"
    />

    <filter-section
      title="Job Level"
      :items="jobLevels || []"
      :selectedItems="selectedFilters?.jobLevels || []"
      @update:selected="updateSelected('jobLevels', $event)"
    />

    <filter-section
      title="Salary Range"
      :items="salaryRanges || []"
      :selectedItems="selectedFilters?.salaryRanges || []"
      @update:selected="updateSelected('salaryRanges', $event)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import FilterSection from "../sharecomponents/FilterSection.vue";

const props = defineProps({
  employmentTypes: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
  jobLevels: {
    type: Array,
    default: () => [],
  },
  salaryRanges: {
    type: Array,
    default: () => [],
  },
  selectedFilters: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:filters"]);

const updateSelected = (filterType, selectedItems) => {
  // console.log(selectedItems);

  emit("update:filters", filterType, selectedItems);
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; /* <-- important */

.primary-color {
  color: var(--primary-color);
}
</style>
