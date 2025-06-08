<template>
  <div class="company-page">
    <!-- <div v-else-if="error" class="error">Error: {{ error }}</div> -->
    <div class="content-wrapper">
      <div class="sidebar">
        <FilterCompanySidebar
          :search-query="companyStore.searchQuery"
          :initial-industries="selectedIndustries"
          :initial-sizes="selectedSizes"
          @search="handleSearch"
          @filter-change="handleFilterChange"
        />
      </div>
      <div class="main-content">
        <div class="results">
          <CompanyResults
            :context="context"     
            :companies="paginatedCompanies"
            :total-results="filteredCompanies.length"
            :view-mode="viewMode"
            @view-change="handleViewChange"
            @sort-change="handleSortChange"
            @clear-search="clearSearch"
          />
        </div>
        <div class="pagination">
          <Pagination
            :current-page="currentPage"
            :total-items="filteredCompanies.length"
            :items-per-page="itemsPerPage"
            @page-change="handlePageChange"
            @per-page-change="handlePerPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useCompanyStore } from "../../stores/companyStore";
import FilterCompanySidebar from "./FilterCompanySidebar.vue";
import CompanyResults from "./CompanyResultsPage.vue";
import Pagination from "../sharecomponents/Pagination.vue";

const companyStore = useCompanyStore();

const props = defineProps({
  context: {
    type: String,
    default: "Landing", // or "Dashboard"
  },
  initialSearchQuery: {
    type: Object,
    default: () => ({ keyword: "", location: "" }),
  },
  context: {
    type: String,
    default: "Landing",
  },
});

const emit = defineEmits(["clear-search"]);

// Filter and view state
const viewMode = ref("grid");
const currentPage = ref(1);
const itemsPerPage = ref(6);
const sortBy = ref("relevant");
const selectedIndustries = ref([]);
const selectedSizes = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Sync store's searchQuery with prop
watch(
  () => props.initialSearchQuery,
  (newVal) => {
    companyStore.setSearchQuery(newVal);
  },
  { deep: true }
);

// Fetch companies on mount
onMounted(async () => {
  isLoading.value = true;
  try {
    await companyStore.fetchCompanies();
    if (props.initialSearchQuery.keyword || props.initialSearchQuery.location) {
      companyStore.setSearchQuery(props.initialSearchQuery);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const keyword = urlParams.get("keyword") || "";
      const location = urlParams.get("location") || "";
      if (keyword || location) {
        companyStore.setSearchQuery({ keyword, location });
      }
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
});

// Event handlers
function handleSearch({ keyword, location }) {
  companyStore.setSearchQuery({ keyword, location });
  currentPage.value = 1;
}

function handleFilterChange(filters) {
  selectedIndustries.value = filters.industries;
  console.log("Selected industries:", filters.industries);
  selectedSizes.value = filters.sizes;
  console.log("Selected sizes:", filters.sizes);
  currentPage.value = 1;
}

function handleViewChange(mode) {
  viewMode.value = mode;
}

function handleSortChange(option) {
  sortBy.value = option;
  currentPage.value = 1;
}

function handlePageChange(page) {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handlePerPageChange(perPage) {
  itemsPerPage.value = perPage;
  currentPage.value = 1;
}

function clearSearch() {
  console.log("Clear search triggered");
  companyStore.setSearchQuery({ keyword: "", location: "" });
  selectedIndustries.value = [];
  selectedSizes.value = [];
  emit("clear-search");
}

// Computed properties
const filteredCompanies = computed(() => {
  let result = companyStore.searchedCompanies || [];
  console.log("Initial searched companies:", result.length);

  if (!result || result.length === 0) {
    console.log("No companies after search filter");
    return [];
  }

  // Apply industry filter
  if (selectedIndustries.value.length > 0) {
    const lowerCaseIndustries = selectedIndustries.value.map((industry) =>
      industry.toLowerCase()
    );
    result = result.filter((company) =>
      company.tags.some((tag) =>
        lowerCaseIndustries.includes(tag.toLowerCase())
      )
    );
    console.log("After industry filter:", result.length);
  }

  // Apply size filter (placeholder logic)
  if (selectedSizes.value.length > 0) {
    result = result.filter((company) => {
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
    console.log("After size filter:", result.length);
  }

  // Apply sorting
  if (sortBy.value === "newest") {
    result = [...result].sort((a, b) => b.id - a.id);
  } else if (sortBy.value === "oldest") {
    result = [...result].sort((a, b) => a.id - b.id);
  } else if (sortBy.value === "relevant" && companyStore.searchQuery.keyword) {
    const query = companyStore.searchQuery.keyword.toLowerCase();
    result = [...result].sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(query) ? 1 : 0;
      const bNameMatch = b.name.toLowerCase().includes(query) ? 1 : 0;
      return bNameMatch - aNameMatch;
    });
  }

  console.log("Final filtered companies:", result.length);
  return result;
});

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCompanies.value.slice(start, end);
});
</script>

<template>
  <div class="company-page">
    <!-- <div v-else-if="error" class="error">Error: {{ error }}</div> -->
    <div class="content-wrapper">
      <div class="sidebar">
        <FilterCompanySidebar
          :search-query="companyStore.searchQuery"
          :initial-industries="selectedIndustries"
          :initial-sizes="selectedSizes"
          @search="handleSearch"
          @filter-change="handleFilterChange"
        />
      </div>
      <div class="main-content">
        <div class="results">
          <CompanyResults
            :context="context"
            :companies="paginatedCompanies"
            :total-results="filteredCompanies.length"
            :view-mode="viewMode"
            @view-change="handleViewChange"
            @sort-change="handleSortChange"
            @clear-search="clearSearch"
          />
        </div>
        <div class="pagination">
          <Pagination
            :current-page="currentPage"
            :total-items="filteredCompanies.length"
            :items-per-page="itemsPerPage"
            @page-change="handlePageChange"
            @per-page-change="handlePerPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.company-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 20px;
}

.sidebar {
  flex: 0 0 25%; /* 25% width for sidebar */
  max-width: 300px; /* Optional: cap the width */
}

.main-content {
  flex: 1; /* Take remaining space */
  display: flex;
  flex-direction: column;
}

.results {
  flex: 1; /* Allow results to grow */
}

.pagination {
  margin-top: 20px;
  width: 100%;
}

.loading,
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #666;
}

/* Responsive design */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar {
    flex: none;
    max-width: none;
    width: 100%;
  }
}
</style>