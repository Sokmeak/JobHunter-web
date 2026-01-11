<template>
  <div class="bg-light py-5">
    <div class="container">
      <div class="text-center mb-4">
        <h1 class="display-5 fw-bold mb-2">
          Find your
          <span class="text-primary position-relative">
            {{ title }}
          </span>
        </h1>
        <img
          src="../../assets/images/highlight.svg"
          width="300px"
          alt="highlight"
          class="highlight-img"
        />
        <p class="text-secondary mt-2">
          {{ subtitle }}
        </p>
      </div>

      <!-- SearchJob component -->
      <SearchJob
        v-model="searchValue"
        :placeholder="placeholder"
        ref="searchJobComponent"
        @search="handleSearch"
      />

      <!-- Popular tags -->
      <div class="text-left text-secondary small">
        Popular:
        <span
          v-for="(tag, index) in popularTags"
          :key="index"
          class="badge rounded-pill bg-light text-dark me-2 small"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SearchJob from "./SearchJob.vue";

// Props
defineProps({
  title: String,
  subtitle: String,
  popularTags: Array,
  placeholder: {
    type: String,
    default: "Job title or keyword",
  },
});

// Emits
const emit = defineEmits(["search", "clear-search"]);

// Refs
const searchJobComponent = ref(null);
const searchValue = ref({ keyword: "", location: "" });

// Methods
function handleSearch(query) {
  console.log("Search query from HeroSection:", query);
  searchValue.value = query;
  emit("search", query);
}

function clearSearch() {
  searchJobComponent.value?.clearSearch();
  searchValue.value = { keyword: "", location: "" };
  console.log("Search inputs cleared in HeroSection");
  emit("clear-search");
}

// Expose clearSearch to parent
defineExpose({
  clearSearch,
});
</script>

<style scoped>
@media (min-width: 768px) {
  .border-end-md {
    border-right: 1px solid #dee2e6;
  }
}

.bg-light {
  background-color: #f8f9fa !important;
}

.text-primary {
  color: #5b9af5 !important;
}

.card {
  border-radius: 12px;
  border: none;
}

.form-control:focus {
  box-shadow: none;
}

.form-control {
  font-size: 0.95rem;
}

.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 1.5rem !important;
}
</style>
