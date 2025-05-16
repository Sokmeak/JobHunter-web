<template>
  <div class="search-results-page">
    <!-- Main content area with filters and results -->
    <div class="row mt-4">
      <!-- Left sidebar with filters -->
      <div class="col-md-3">
        <FilterCompanySidebar
          :initial-industries="selectedIndustries"
          :initial-sizes="selectedSizes"
          @filter-change="handleFilterChange"
        />
      </div>

      <!-- Right side with results and pagination -->
      <div class="col-md-9">
        <!-- Empty state when no results found -->
        <div v-if="filteredCompanies.length === 0" class="text-center py-5">
          <div class="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="currentColor"
              class="bi bi-search text-muted"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </div>
          <h3 class="fs-4 fw-bold">No results found</h3>
          <p class="text-muted">
            We couldn't find any companies matching "{{ searchQuery.keyword }}"
          </p>
          <button class="btn btn-outline-primary mt-3" @click="clearSearch">
            Clear search
          </button>
        </div>

        <!-- Results when companies are found -->
        <template v-else>
          <CompanyResults
            :companies="paginatedCompanies"
            :total-results="filteredCompanies.length"
            :initial-view-mode="viewMode"
            :initial-sort-option="sortBy"
            @view-change="handleViewChange"
            @sort-change="handleSortChange"
          />

          <Pagination
            :total-items="filteredCompanies.length"
            :initial-page="currentPage"
            :initial-per-page="itemsPerPage"
            @page-change="handlePageChange"
            @per-page-change="handlePerPageChange"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import FilterCompanySidebar from "./FilterCompanySidebar.vue";
import CompanyResults from "./CompanyResultsPage.vue";
import Pagination from "../sharecomponents/Pagination.vue";

const props = defineProps({
  initialSearchQuery: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["clear-search"]);

// Search and filter state
const searchQuery = ref(props.initialSearchQuery);
const viewMode = ref("grid");
const currentPage = ref(1);
const itemsPerPage = ref(6); // 6 items per page (3x2 grid)
const sortBy = ref("relevant");
const selectedIndustries = ref([]);
const selectedSizes = ref([]);

// Watch for prop changes
watch(
  () => props.initialSearchQuery,
  (newVal) => {
    searchQuery.value = newVal;
  }
);

// Sample companies data - expanded with more companies including Google
const companies = ref([
  {
    id: 1,
    name: "Nomad",
    logo: "https://logo.clearbit.com/nomadproject.io",
    logoBg: "#e7f5f0",
    jobCount: 3,
    description:
      "Nomad is located in Paris, France. Nomad has generated $128,000 in sales (USD).",
    tags: ["Business Service"],
  },
  {
    id: 2,
    name: "Discord",
    logo: "https://logo.clearbit.com/discord.com",
    logoBg: "#5865f2",
    jobCount: 3,
    description:
      "We'd love to work with someone like you. We care about creating a delightful experience.",
    tags: ["Business Service"],
  },
  {
    id: 3,
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    logoBg: "#4285f4",
    jobCount: 5,
    description:
      "Google is based in Mountain View, California. It generates over $200 billion in revenue annually.",
    tags: ["Tech", "Search Engine"],
  },
  {
    id: 4,
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    logoBg: "#f1f1f1",
    jobCount: 10,
    description:
      "Apple is a leading technology company known for its innovation in consumer electronics and software.",
    tags: ["Tech", "Consumer Electronics"],
  },
  {
    id: 5,
    name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
    logoBg: "#1db954",
    jobCount: 7,
    description:
      "Spotify is a popular streaming service offering a vast library of music and podcasts.",
    tags: ["Music", "Streaming"],
  },
  {
    id: 6,
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    logoBg: "#e82127",
    jobCount: 4,
    description:
      "Tesla, Inc. is an electric vehicle and clean energy company based in Palo Alto, California.",
    tags: ["Tech", "Electric Vehicles"],
  },
]);

// // Event handlers
// function handleSearch(query) {
//   searchQuery.value = query;
//   currentPage.value = 1; // Reset to first page on new search
// }

function handleFilterChange(filters) {
  selectedIndustries.value = filters.industries;

  // Destructure the first industry
  const [firstIndustry] = selectedIndustries.value || [];
  console.log("First industry:", firstIndustry); // Output: "advertising"

  selectedSizes.value = filters.sizes;
  currentPage.value = 1; // Reset to first page on filter change
}

function handleViewChange(mode) {
  viewMode.value = mode;
}

function handleSortChange(option) {
  sortBy.value = option;
  currentPage.value = 1; // Reset to first page on sort change
}

function handlePageChange(page) {
  currentPage.value = page;
  // Scroll to top of results
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handlePerPageChange(perPage) {
  itemsPerPage.value = perPage;
  currentPage.value = 1; // Reset to first page when changing items per page
}

function clearSearch() {
  console.log("trigger clear in company page");
  emit("clear-search");
}

// Computed properties
const filteredCompanies = computed(() => {
  let result = companies.value;

  // Filter by search query
  if (searchQuery.value) {
    // filter only keyword
    console.log("query", searchQuery.value.keyword);
    const searchTerms = searchQuery.value.keyword.toLowerCase().split(" ");

    result = result.filter((company) => {
      // Check if any search term matches company name, description, or tags
      return searchTerms.some(
        (term) =>
          company.name.toLowerCase().includes(term) ||
          company.description.toLowerCase().includes(term) ||
          company.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    });
  }

  // Apply industry filter with case-insensitive matching
  if (selectedIndustries.value.length > 0) {
    const lowerCaseIndustries = selectedIndustries.value.map((industry) =>
      industry.toLowerCase()
    );
    result = result.filter((company) => {
      return company.tags.some((tag) =>
        lowerCaseIndustries.includes(tag.toLowerCase())
      );
    });
  }
  // Apply size filter if any selected
  if (selectedSizes.value.length > 0) {
    // In a real app, you would filter by company size here
    // For demo purposes, we'll just filter randomly based on the company ID
    result = result.filter((company) => {
      // This is just a placeholder logic - replace with actual size filtering
      if (selectedSizes.value.includes("1-50") && company.id % 6 === 0)
        return true;
      if (selectedSizes.value.includes("51-150") && company.id % 6 === 1)
        return true;
      if (selectedSizes.value.includes("151-250") && company.id % 6 === 2)
        return true;
      if (selectedSizes.value.includes("251-500") && company.id % 6 === 3)
        return true;
      if (selectedSizes.value.includes("501-1000") && company.id % 6 === 4)
        return true;
      if (selectedSizes.value.includes("1000 - above") && company.id % 6 === 5)
        return true;
      return false;
    });
  }

  // Apply sorting
  if (sortBy.value === "newest") {
    // Sort by ID descending (assuming newer companies have higher IDs)
    result = [...result].sort((a, b) => b.id - a.id);
  } else if (sortBy.value === "oldest") {
    // Sort by ID ascending
    result = [...result].sort((a, b) => a.id - b.id);
  } else {
    // For 'relevant' sorting, prioritize exact matches in name
    if (searchQuery.value) {
      const query = searchQuery.value.keyword.toLowerCase();
      result = [...result].sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().includes(query) ? 1 : 0;
        const bNameMatch = b.name.toLowerCase().includes(query) ? 1 : 0;
        return bNameMatch - aNameMatch;
      });
    }
  }

  return result;
});

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCompanies.value.slice(start, end);
});

// Set initial search query from URL if present
onMounted(() => {
  if (props.initialSearchQuery) {
    searchQuery.value = props.initialSearchQuery;
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("q");
    if (queryParam) {
      searchQuery.value = queryParam;
    }
  }
});
</script>
