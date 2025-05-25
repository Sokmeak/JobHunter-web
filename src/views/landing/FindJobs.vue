<template>
  <div class="container py-4">
    <!-- Loading state -->
    <div v-if="jobStore.isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Fetching job listings...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="jobStore.error" class="text-center py-5">
      <div class="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          fill="currentColor"
          class="bi bi-exclamation-triangle text-danger"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
          />
          <path
            d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"
          />
        </svg>
      </div>
      <h3 class="fs-4 fw-bold">Error</h3>
      <p class="text-muted">{{ jobStore.error }}</p>
      <button class="btn btn-outline-primary mt-3" @click="fetchData">
        Retry
      </button>
    </div>

    <!-- Main content -->
    <div v-else>
      <HeroSection
        :title="title"
        :subtitle="subtitle"
        :popular-tags="popularTags"
        :placeholder="heroPlaceholder"
        @search="handleSearch"
        @clear-search="clearSearch"
        ref="heroSection"
      />

      <div class="container py-4">
        <div class="row g-4">
          <div class="col-lg-3">
            <FilterSidebar
              :employment-types="jobStore.employmentTypes"
              :categories="jobStore.categories"
              :job-levels="jobStore.jobLevels"
              :salary-ranges="jobStore.salaryRanges"
              :selected-filters="jobStore.selectedFilters"
              @update:filters="updateFilters"
            />
          </div>

          <div class="col-lg-9">
            <!-- Search query feedback -->
            <div
              v-if="
                jobStore.searchQuery.keyword || jobStore.searchQuery.location
              "
              class="d-flex justify-content-between align-items-center mb-3"
            >
              <p class="text-muted mb-0">
                Showing results for:
                <strong v-if="jobStore.searchQuery.keyword"
                  >"{{ jobStore.searchQuery.keyword }}"</strong
                >
                <span
                  v-if="
                    jobStore.searchQuery.keyword &&
                    jobStore.searchQuery.location
                  "
                >
                  in
                </span>
                <strong v-if="jobStore.searchQuery.location"
                  >"{{ jobStore.searchQuery.location }}"</strong
                >
              </p>
              <button
                v-if="jobStore.filteredJobs.length > 0"
                @click="clearSearch"
                class="btn btn-danger"
              >
                Clear search
              </button>
            </div>

            <!-- Empty state when no results found -->
            <div
              v-if="jobStore.filteredJobs.length === 0"
              class="text-center py-5"
            >
              <div class="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="68"
                  height="68"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                  />
                </svg>
              </div>
              <h3 class="fs-4 fw-bold">No jobs found</h3>
              <p class="text-muted">
                We couldn't find any jobs matching
                <span v-if="jobStore.searchQuery.keyword"
                  >'{{ jobStore.searchQuery.keyword }}'</span
                >
                <span
                  v-if="
                    jobStore.searchQuery.keyword &&
                    jobStore.searchQuery.location
                  "
                >
                  in
                </span>
                <span v-if="jobStore.searchQuery.location"
                  >'{{ jobStore.searchQuery.location }}'</span
                >
                <span
                  v-if="
                    !jobStore.searchQuery.keyword &&
                    !jobStore.searchQuery.location &&
                    jobStore.hasFilters
                  "
                >
                  your selected filters
                </span>
              </p>
              <button class="btn btn-outline-primary mt-3" @click="clearSearch">
                Clear search and filters
              </button>
            </div>

            <!-- Job listings (with pagination) -->
            <JobListings
              v-if="jobStore.filteredJobs.length > 0"
              :jobs="jobStore.filteredJobs"
              :total-items="jobStore.totalJobs"
              :initial-page="jobStore.currentPage"
              :initial-per-page="jobStore.itemsPerPage"
              @page-change="jobStore.updatePage"
              @per-page-change="jobStore.updatePerPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useJobStore } from "@/stores/jobStore";
import HeroSection from "@/components/sharecomponents/HeroSection.vue";
import FilterSidebar from "@/components/findjob/FilterSidebar.vue";
import JobListings from "@/components/findjob/JobListings.vue";

// Data for HeroSection
const title = "Dream Job";
const subtitle = "Explore thousands of job opportunities in one place.";
const popularTags = ["UI Designer", "UX Developer", "Android", "Admin"];
const heroPlaceholder = "Start with a job keyword...";

// Pinia store
const jobStore = useJobStore();
const heroSection = ref(null);

// Methods
async function fetchData() {
  await Promise.all([jobStore.fetchJobs(), jobStore.fetchFilterOptions()]);
}

function handleSearch(queryObj) {
  jobStore.setSearchQuery(queryObj);
  jobStore.updateUrl();
}

function clearSearch() {
  jobStore.clearSearch();
  jobStore.updateUrl();
  heroSection.value?.clearSearch(); // Ensure HeroSection clears SearchJob inputs
}

function updateFilters(filterType, value) {
  
  jobStore.updateFilters(filterType, value);
}

// Initialize from URL and fetch data
onMounted(async () => {
  jobStore.initializeFromUrl();
  await fetchData();
});
</script>

<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";

body {
  font-family: "Inter", sans-serif;
  color: #333;
  background-color: #f8f9fa;
}

/* Pagination styling */
.pagination {
  gap: 0.75rem;
  margin-top: 2rem;
}

.page-item {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.page-link {
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s, color 0.2s;
}

.page-link:hover {
  background-color: var(--primary-color, #007bff);
  color: white;
}

.page-item.active .page-link {
  background-color: var(--primary-color, #007bff);
  border-color: var(--primary-color, #007bff);
  color: white;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
