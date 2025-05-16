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
      <RecommendedCompanyCardSection />
      <CompaniesByCategorySection />
    </template>

    <!-- Show search results when there is a search query -->
    <template v-else>
      <SearchResultsPage
        :initial-search-query="searchQuery.keyword"
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

const searchQuery = ref({ keyword: "", location: "" });

const title = ref("dream companies");
const subtitle = ref("Find the dream companies you dream work for!");
const popularTags = ref(["Twitter", "Microsoft", "Apple", "Facebook"]);
const companyPlaceholder = ref("Company or Organization name...");
const heroSection = ref(null);

// Event Handlers
function handleSearch(query) {
  searchQuery.value.keyword = query;
  console.log("Search query:", searchQuery.value);

  // Update URL with search query
  const url = new URL(window.location);
  url.searchParams.set("q", query);
  window.history.pushState({}, "", url);
}

function clearSearch() {
  searchQuery.value = { keyword: "", location: "" };
  updateUrl();
  console.log("Clear is trigger : ");
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
  window.history.pushState({}, "", url);
}
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; // Import your SCSS variables
</style>
