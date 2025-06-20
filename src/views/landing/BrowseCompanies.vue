<template>
  <div class="container py-4">
    <!-- Hero Section -->
    <HeroSection
      ref="heroSection"
      :title="title"
      :subtitle="subtitle"
      :popular-tags="popularTags"
      :placeholder="companyPlaceholder"
      @search="handleSearch"
      @clearSearch="clearSearch"
    />

    <!-- Show default content when no search query -->
    <template v-if="!searchQuery.keyword && !searchQuery.location">
      <RecommendedCompanyCardSection :context="context" />
      <CompaniesByCategorySection />
    </template>

    <!-- Show search results when there is a search query -->
    <template v-else>
      <SearchResultsPage
        :initial-search-query="searchQuery"
        @clear-search="clearSearch"
        :context="context"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeroSection from "@/components/sharecomponents/HeroSection.vue";
import RecommendedCompanyCardSection from "@/components/browsecompany/RecommendedCompanyCardSection.vue";
import CompaniesByCategorySection from "@/components/browsecompany/CompaniesByCategorySection.vue";
import SearchResultsPage from "@/components/browsecompany/SearchResultsPage.vue";

// Props
defineProps({
  initialSearchQuery: {
    type: Object,
    default: () => ({ keyword: "", location: "" }),
  },
});

const context = "Landing";

// Refs
const searchQuery = ref({ keyword: "", location: "" });

const title = ref("Dream Companies");
const subtitle = ref("Find the dream companies you dream work for!");
const popularTags = ref(["Twitter", "Microsoft", "Apple", "Facebook"]);
const companyPlaceholder = ref("Company or Organization name...");
const heroSection = ref(null);

// Initialize search query from URL on mount
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword") || "";
  const location = urlParams.get("location") || "";
  if (keyword || location) {
    searchQuery.value = { keyword, location };
  }
});

// Event Handlers
function handleSearch({ keyword, location }) {
  searchQuery.value = { keyword, location };
  console.log("Search query:", searchQuery.value);
  updateUrl();
}

function clearSearch() {
  searchQuery.value = { keyword: "", location: "" };
  console.log("Clear search triggered");
  updateUrl();
  heroSection.value?.clearSearch(); // Programmatically clear search inputs
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
  // Remove legacy 'q' parameter
  url.searchParams.delete("q");
  window.history.pushState({}, "", url);
}
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *;

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
