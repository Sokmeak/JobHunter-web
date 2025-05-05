<template>
  <div class="container py-4">
    <!-- Show default content when no search query -->

    <HeroSection
      :title="title"
      :subtitle="subtitle"
      :popular-tags="popularTags"
      @search="handleSearch"
    />
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
import HeroSection from "@/components/sharecomponents/HeroSection.vue";
import RecommendedCompanyCardSection from "@/components/browsecompany/RecommendedCompanyCardSection.vue";
import CompaniesByCategorySection from "@/components/browsecompany/CompaniesByCategorySection.vue";
import SearchResultsPage from "@/components/browsecompany/SearchResultsPage.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

// Add this at the top of the script
const props = defineProps({
  initialSearchQuery: String,
});

// Update searchQuery initialization
const searchQuery = ref(props.initialSearchQuery || "");

const title = ref("Find your dream companies");
const subtitle = ref("Find the dream companies you dream work for");
const popularTags = ref(["Twitter", "Microsoft", "Apple", "Facebook"]);

// Event handlers
function handleSearch(query) {
  searchQuery.value = query;
  console.log("Search query:", searchQuery.value);

  // Update URL with search query
  const url = new URL(window.location);
  url.searchParams.set("q", query);
  window.history.pushState({}, "", url);
}
function clearSearch() {}

// function clearSearch() {
//   searchQuery.value = "";

//   Remove search query from URL
//   const url = new URL(window.location);
//   url.searchParams.delete('q');
//   window.history.pushState({}, '', url);
// }

// return {
//   searchQuery,
//   title,
//   subtitle,
//   popularTags,
//   handleSearch,
//   clearSearch,
// };

// export default {
//   name: "BrowseCompanies",
//   components: {
//     HeroSection,
//     CompaniesByCategorySection,
//     RecommendedCompanyCardSection,
//   },

//   // data() {
//   //   return {
//   //     title: "Dream Company",
//   //     subtitle: "Explore thousands of companies in one place.",
//   //     popularTags: ["UI Designer", "UX Developer", "Android", "Admin"],
//   //   };
//   // },
// };
</script>
<style lang="scss" scoped>
@use "@/style/variables.css" as *; // <-- important
</style>
