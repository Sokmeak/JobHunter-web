<template>
  <div class="d-flex">
     <div class="container py-4">
      <!-- <HeroSection
        ref="heroSection"
        :title="title"
        :subtitle="subtitle"
        :popular-tags="popularTags"
        :placeholder="companyPlaceholder"
        @search="handleSearch"
        @clearSearch="clearSearch"
      /> -->

      <!-- SearchJob component -->
      <SearchJob
        v-model="searchValue"
        :placeholder="placeholder"
        ref="searchJobComponent"
        @search="handleSearch"
      />

      <SearchResultsPage
         :context="context"
        :initial-search-query="searchQuery.keyword"
        @clear-search="clearSearch"
      />
    </div>

    <!-- search -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import SearchJob from "@/components/sharecomponents/SearchJob.vue";
import SearchResultsPage from "@/components/browsecompany/SearchResultsPage.vue";

const context = "Applicant";


// const companies = [
//   {
//     id: 1,
//     name: "Stripe",
//     logo: "https://logo.clearbit.com/Stripe.com",
//     description:
//       "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools...",
//     jobCount: 7,
//     tags: ["Business", "Payment gateway"],
//   },
//   {
//     id: 2,
//     name: "Truebill",
//     logo: "https://logo.clearbit.com/Truebill.com",
//     description:
//       "Take control of your money. Truebill develops a mobile app that helps consumers take control of their financial...",
//     jobCount: 7,
//     tags: ["Business"],
//   },
//   {
//     id: 3,
//     name: "Square",
//     logo: "https://logo.clearbit.com/Stripe.com",
//     description:
//       "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses.",
//     jobCount: 7,
//     tags: ["Business", "Blockchain"],
//   },
//   {
//     id: 4,
//     name: "Coinbase",
//     logo: "https://logo.clearbit.com/Coinbase.com",
//     description:
//       "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies.",
//     jobCount: 7,
//     tags: ["Business", "Blockchain"],
//   },
//   {
//     id: 5,
//     name: "Robinhood",
//     logo: "https://logo.clearbit.com/Robinhood.com",
//     description:
//       "Robinhood is lowering barriers, removing fees, and providing greater access to financial information.",
//     jobCount: 7,
//     tags: ["Business"],
//   },
//   {
//     id: 6,
//     name: "Kraken",
//     logo: "https://logo.clearbit.com/Kraken.com",
//     description:
//       "Based in San Francisco, Kraken is the world's largest global bitcoin exchange in euro volume and liquidity.",
//     jobCount: 7,
//     tags: ["Business", "Blockchain"],
//   },
// ];

const searchQuery = ref({ keyword: "", location: "" });

const placeholder = ref("Company or Organization name...");

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
