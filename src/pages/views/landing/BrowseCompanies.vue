<template>
  <div class="container py-4">
    <!-- Hero Section -->
    <HeroSection
      ref="heroSectionComponent"
      :title="title"
      :subtitle="subtitle"
      :popular-tags="popularTags"
      @search="handleSearch"
      @clearSearch="clearSearch"
    />

    <!-- Show default content when no search query -->
    <template v-if="!searchQuery">
      <RecommendedCompanyCardSection />
      <CompaniesByCategorySection />
    </template>

    <!-- Show search results when there is a search query -->
    <template v-else>
      <SearchResultsPage
        :initial-search-query="searchQuery"
        @clear-search="clearSearch"
      />
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeroSection from "@/components/sharecomponents/HeroSection.vue";
import RecommendedCompanyCardSection from "@/components/browsecompany/RecommendedCompanyCardSection.vue";
import CompaniesByCategorySection from "@/components/browsecompany/CompaniesByCategorySection.vue";
import SearchResultsPage from "@/components/browsecompany/SearchResultsPage.vue";

// Props
defineProps({
  initialSearchQuery: String,
});

// Refs
const heroSectionComponent = ref(null);
const searchQuery = ref( "");
const title = ref("dream companies");
const subtitle = ref("Find the dream companies you dream work for!");
const popularTags = ref(["Twitter", "Microsoft", "Apple", "Facebook"]);

// Event Handlers
function handleSearch(query) {
  searchQuery.value = query;
  console.log("Search query:", searchQuery.value);

  // Update URL with search query
  const url = new URL(window.location);
  url.searchParams.set("q", query);
  window.history.pushState({}, "", url);
}

function clearSearch() {
  // Clear search query
  searchQuery.value = "";

  // Call clearSearch from HeroSection
  heroSectionComponent.value?.clearSearch();

  console.log("Search inputs cleared in BrowseCompanies");

  // Remove search query from URL
  const url = new URL(window.location);
  url.searchParams.delete("q");
  window.history.pushState({}, "", url);
}
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; // Import your SCSS variables
</style>
