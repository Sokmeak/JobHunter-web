<!-- <template>
  <div class="filter-sidebar pe-4">
    <div class="filter-section mb-4">
      <h3 class="fs-5 fw-medium mb-3">Industry</h3>
      <div
        v-for="(industry, index) in industries"
        :key="`industry-${index}`"
        class="mb-2"
      >
        <div class="form-check d-flex justify-content-between">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`industry-${index}`"
            :value="industry.label"
            v-model="selectedIndustries"
            @change="emitFilterChange"
          />
          <label
            class="form-check-label w-100 ms-2 d-flex justify-content-between"
            :for="`industry-${index}`"
          >
            <span class="small">{{ industry.label }}</span>
            <span class="small text-muted">({{ industry.count }})</span>
          </label>
        </div>
      </div>
    </div>

    <div class="filter-section">
      <h3 class="fs-5 fw-medium mb-3">Company Size</h3>
      <div
        v-for="(size, index) in companySizes"
        :key="`size-${index}`"
        class="mb-2"
      >
        <div class="form-check d-flex justify-content-between">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`size-${index}`"
            :value="size.range"
            v-model="selectedSizes"
            @change="emitFilterChange"
          />
          <label
            class="form-check-label w-100 ms-2 d-flex justify-content-between"
            :for="`size-${index}`"
          >
            <span class="small">{{ size.label }}</span>
            <span class="small text-muted">({{ size.count }})</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="filter-sidebar">
    <filter-section
      title="Industry"
      :items="industries"
      v-model="selectedIndustries"
      :selectedItems="selectedFilters.industries"
      @update:selected="updateSelected('industries', $event)"
    />

    <filter-section
      title="Company Size"
      :items="companySizes"
      :selectedItems="selectedFilters.sizes"
      v-model="selectedSizes"
      @update:selected="updateSelected('sizes', $event)"
    />
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import FilterSection from "../sharecomponents/FilterSection.vue";

const props = defineProps({
  initialIndustries: {
    type: Array,
    default: () => [],
  },
  initialSizes: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["filter-change"]);

// Industry filter data
const industries = ref([
  { id: "advertising", label: "Advertising", count: 43 },
  { id: "business service", label: "Business Service", count: 4 },
  { id: "tech", label: "Tech", count: 5 },
  { id: "cloud", label: "Cloud", count: 15 },
  { id: "consumer tech", label: "Consumer Tech", count: 5 },
  { id: "education", label: "Education", count: 34 },
  { id: "fintech", label: "Fintech", count: 45 },
  { id: "gaming", label: "Gaming", count: 33 },
  { id: "food beverage", label: "Food & Beverage", count: 5 },
  { id: "healthcare", label: "Healthcare", count: 3 },
  { id: "hosting", label: "Hosting", count: 5 },
  { id: "media", label: "Media", count: 4 },
]);

// Company size filter data
const companySizes = ref([
  { id: "1-50", label: "1-50", count: 25 },
  { id: "51-150", label: "51-150", count: 57 },
  { id: "151-250", label: "151-250", count: 45 },
  { id: "251-500", label: "251-500", count: 4 },
  { id: "501-1000", label: "501-1000", count: 43 },
  { id: "1000-above", label: "1000 - above", count: 23 },
]);

// Selected filters
const selectedFilters = reactive({
  industries: props.initialIndustries,
  sizes: props.initialSizes,
});

// Watch for prop changes
watch(
  () => props.initialIndustries,
  (newVal) => {
    selectedFilters.industries = newVal;
  },
  { deep: true }
);

watch(
  () => props.initialSizes,
  (newVal) => {
    selectedFilters.sizes = newVal;
  },
  { deep: true }
);

// Update selected filters
const updateSelected = (filterType, selectedItems) => {
  selectedFilters[filterType] = selectedItems;
  emitFilterChange();
};

// Emit filter changes to parent
function emitFilterChange() {
  emit("filter-change", {
    industries: selectedFilters.industries,
    sizes: selectedFilters.sizes,
  });
}
</script>

<style lang="scss" scoped>
.filter-sidebar {
  padding-right: 1rem;
}
</style>
