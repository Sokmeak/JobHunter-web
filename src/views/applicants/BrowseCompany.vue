<template>
  <div class="d-flex">
    <div class="container py-4">
      <!-- SearchJob component -->
      <SearchJob
        v-model="searchValue"
        :placeholder="placeholder"
        ref="searchJobComponent"
        @search="handleSearch"
      />

      <!-- Show default content when no search query -->
      <template v-if="!searchQuery.keyword && !searchQuery.location">
        <RecommendedCompanyCardSection :context="context" />
        <CompaniesByCategorySection />
      </template>

      <!-- Show search results when there is a search query -->
      <template v-else>
        <SearchResultsPage
          :context="context"
          :initial-search-query="searchQuery"
          @clear-search="clearSearch"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SearchJob from "@/components/sharecomponents/SearchJob.vue";
import SearchResultsPage from "@/components/browsecompany/SearchResultsPage.vue";
import RecommendedCompanyCardSection from "@/components/browsecompany/RecommendedCompanyCardSection.vue";
import CompaniesByCategorySection from "@/components/browsecompany/CompaniesByCategorySection.vue";

const context = "Applicant";

const searchQuery = ref({ keyword: "", location: "" });
const searchValue = ref("");
const placeholder = ref("Company or Organization name...");
const searchJobComponent = ref(null);

// Initialize search query from URL on mount
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword") || "";
  const location = urlParams.get("location") || "";
  if (keyword || location) {
    searchQuery.value = { keyword, location };
    searchValue.value = keyword;
  }
});

// Event Handlers
function handleSearch(query) {
  searchQuery.value.keyword = query;
  searchQuery.value.location = "";
  console.log("Search query:", searchQuery.value);
  updateUrl();
}

function clearSearch() {
  searchQuery.value = { keyword: "", location: "" };
  searchValue.value = "";
  updateUrl();
  console.log("Clear search triggered");
  searchJobComponent.value?.clearSearch(); // Programmatically clear search inputs
}

function updateUrl() {
  const url = new URL(window.location);
  if (searchQuery.value.keyword) {
    url.searchParams.set("keyword", searchQuery.value.keyword);
  } else {
    url.searchParams.delete("keyword");
  }
  if (searchQuery.value.location) {
    url.searchParams.set("location", searchQuery.value.location);
  } else {
    url.searchParams.delete("location");
  }
  // Remove legacy parameters
  url.searchParams.delete("q");
  window.history.pushState({}, "", url);
}
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *;
.browse-companies {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.popular-tag {
  display: inline-block;
  margin-right: 8px;
  font-size: 14px;
  color: #5138ee;
  cursor: pointer;
}

.popular-tag:hover {
  text-decoration: underline;
}

.view-options .btn.active {
  background-color: #e9ecef;
}
</style>
