<template>
  <div class="container py-4">
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
          <filter-sidebar
            :employmentTypes="employmentTypes"
            :categories="categories"
            :jobLevels="jobLevels"
            :salaryRanges="salaryRanges"
            :selectedFilters="selectedFilters"
            @update:filters="updateFilters"
          />
        </div>

        <div class="col-lg-9">
          <!-- Search query feedback -->
          <div
            v-if="searchQuery.keyword || searchQuery.location"
            class="d-flex justify-content-between align-items-center mb-3"
          >
            <p class="text-muted mb-0">
              Showing results for:
              <strong v-if="searchQuery.keyword"
                >"{{ searchQuery.keyword }}"</strong
              >
              <span v-if="searchQuery.keyword && searchQuery.location">
                in
              </span>
              <strong v-if="searchQuery.location"
                >"{{ searchQuery.location }}"</strong
              >
            </p>
            <button @click="clearSearch" class="btn btn-sm btn-link">
              Clear search
            </button>
          </div>

          <!-- Empty state when no results found -->
          <div v-if="filteredJobs.length === 0" class="text-center py-5">
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
            <h3 class="fs-4 fw-bold">No jobs found</h3>
            <p class="text-muted">
              We couldn't find any jobs matching
              <span v-if="searchQuery.keyword"
                >'{{ searchQuery.keyword }}'</span
              >
              <span v-if="searchQuery.keyword && searchQuery.location">
                in
              </span>
              <span v-if="searchQuery.location"
                >'{{ searchQuery.location }}'</span
              >
              <span
                v-if="
                  !searchQuery.keyword && !searchQuery.location && hasFilters
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
          <job-listings
            v-if="filteredJobs.length > 0"
            :jobs="filteredJobs"
            :total-items="totalJobs"
            :initial-page="currentPage"
            :initial-per-page="itemsPerPage"
            @page-change="updatePage"
            @per-page-change="updatePerPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { onMounted } from "vue";
import HeroSection from "@/components/sharecomponents/HeroSection.vue";
import FilterSidebar from "@/components/findjob/FilterSidebar.vue";
import JobListings from "@/components/findjob/JobListings.vue";

// Data for HeroSection
const title = "Dream Job";
const subtitle = "Explore thousands of job opportunities in one place.";
const popularTags = ["UI Designer", "UX Developer", "Android", "Admin"];
const heroPlaceholder = "Start with a job keyword...";

// Search state
const searchQuery = ref({ keyword: "", location: "" });
const selectedFilters = ref({
  employmentTypes: [],
  categories: [],
  jobLevels: [],
  salaryRanges: [],
});
const heroSection = ref(null);

// Filter options
const employmentTypes = [
  { id: "full-time", label: "Full-time", count: 3 },
  { id: "part-time", label: "Part-Time", count: 5 },
  { id: "internship", label: "Internship", count: 24 },
];
const categories = [
  { id: "design", label: "Design", count: 24 },
  { id: "sales", label: "Sales", count: 3 },
  { id: "marketing", label: "Marketing", count: 3 },
  { id: "business", label: "Business", count: 3 },
  { id: "hr", label: "Human Resource", count: 6 },
  { id: "finance", label: "Finance", count: 4 },
  { id: "engineering", label: "Engineering", count: 4 },
  { id: "technology", label: "Technology", count: 5 },
];
const jobLevels = [
  { id: "entry", label: "Entry Level", count: 57 },
  { id: "junior", label: "Junior", count: 3 },
  { id: "senior", label: "Senior Level", count: 5 },
  { id: "manager", label: "Manager", count: 12 },
];
const salaryRanges = [
  { id: "range1", label: "$700 - $1000", count: 4 },
  { id: "range2", label: "$100 - $1500", count: 6 },
  { id: "range3", label: "$1500 - $2000", count: 10 },
  { id: "range4", label: "$3000 or above", count: 4 },
];

// Jobs data
const jobs = ref([
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "/company-logos/nomad.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    logo: "/company-logos/dropbox.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 2,
    capacity: 8,
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    logo: "/company-logos/terraform.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 8,
    capacity: 12,
  },
  {
    id: 4,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    logo: "/company-logos/revolut.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 0,
    capacity: 10,
  },
  {
    id: 5,
    title: "Lead Engineer",
    company: "Canva",
    location: "Ankara, Turkey",
    logo: "/company-logos/canva.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 6,
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    logo: "/company-logos/classpass.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 7,
    title: "Customer Manager",
    company: "Pitch",
    location: "Berlin, Germany",
    logo: "/company-logos/pitch.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 8,
    title: "UI/UX Designer",
    company: "Figma",
    location: "New York, USA",
    logo: "/company-logos/figma.png",
    tags: ["Remote", "Design"],
    applied: 3,
    capacity: 7,
  },
  {
    id: 9,
    title: "Frontend Developer",
    company: "Vercel",
    location: "Amsterdam, Netherlands",
    logo: "/company-logos/vercel.png",
    tags: ["Full-Time", "Engineering"],
    applied: 4,
    capacity: 9,
  },
  {
    id: 10,
    title: "Community Manager",
    company: "Notion",
    location: "Toronto, Canada",
    logo: "/company-logos/notion.png",
    tags: ["Part-Time", "Marketing"],
    applied: 6,
    capacity: 10,
  },
  {
    id: 11,
    title: "DevOps Engineer",
    company: "GitLab",
    location: "Remote",
    logo: "/company-logos/gitlab.png",
    tags: ["Remote", "Engineering"],
    applied: 2,
    capacity: 5,
  },
  {
    id: 12,
    title: "Content Writer",
    company: "Buffer",
    location: "London, UK",
    logo: "/company-logos/buffer.png",
    tags: ["Freelance", "Writing"],
    applied: 1,
    capacity: 4,
  },
  {
    id: 13,
    title: "QA Tester",
    company: "Trello",
    location: "Rome, Italy",
    logo: "/company-logos/trello.png",
    tags: ["Full-Time", "Engineering"],
    applied: 4,
    capacity: 6,
  },
  {
    id: 14,
    title: "Growth Marketer",
    company: "Zapier",
    location: "Sydney, Australia",
    logo: "/company-logos/zapier.png",
    tags: ["Full-Time", "Marketing"],
    applied: 3,
    capacity: 10,
  },
  {
    id: 15,
    title: "Support Specialist",
    company: "Slack",
    location: "Lisbon, Portugal",
    logo: "/company-logos/slack.png",
    tags: ["Remote", "Support"],
    applied: 2,
    capacity: 6,
  },
  {
    id: 16,
    title: "Data Analyst",
    company: "Klarna",
    location: "Stockholm, Sweden",
    logo: "/company-logos/klarna.png",
    tags: ["Full-Time", "Data"],
    applied: 7,
    capacity: 10,
  },
  {
    id: 17,
    title: "Motion Designer",
    company: "Adobe",
    location: "Tokyo, Japan",
    logo: "/company-logos/adobe.png",
    tags: ["Full-Time", "Design"],
    applied: 2,
    capacity: 8,
  },
  {
    id: 18,
    title: "Tech Recruiter",
    company: "LinkedIn",
    location: "Dublin, Ireland",
    logo: "/company-logos/linkedin.png",
    tags: ["Full-Time", "HR"],
    applied: 6,
    capacity: 9,
  },
  {
    id: 19,
    title: "Mobile Developer",
    company: "Spotify",
    location: "Oslo, Norway",
    logo: "/company-logos/spotify.png",
    tags: ["Full-Time", "Engineering"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 20,
    title: "AI Research Intern",
    company: "DeepMind",
    location: "London, UK",
    logo: "/company-logos/deepmind.png",
    tags: ["Internship", "AI"],
    applied: 10,
    capacity: 10,
  },
]);

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(6);
const totalJobs = computed(() => applyFilters(jobs.value).length);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalJobs.value / itemsPerPage.value))
);

// Check if any filters are applied
const hasFilters = computed(() => {
  const { employmentTypes, categories, jobLevels, salaryRanges } =
    selectedFilters.value;
  return (
    employmentTypes.length > 0 ||
    categories.length > 0 ||
    jobLevels.length > 0 ||
    salaryRanges.length > 0
  );
});

// Update filters
const updateFilters = (filterType, value) => {
  selectedFilters.value = {
    ...selectedFilters.value,
    [filterType]: value,
  };
  currentPage.value = 1;
};

// Computed properties
const filteredJobs = computed(() => {
  const results = applyFilters(jobs.value);
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return results.slice(start, end);
});

// Reusable filter function
function applyFilters(jobs) {
  let results = [...jobs];

  const keyword = searchQuery.value.keyword?.toLowerCase().trim() || "";
  const location = searchQuery.value.location?.toLowerCase().trim() || "";
  const { employmentTypes, categories, jobLevels, salaryRanges } =
    selectedFilters.value;

  // Apply search filters
  if (keyword || location) {
    results = results.filter((job) => {
      const matchesKeyword = keyword
        ? job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword) ||
          job.tags.some((tag) => tag.toLowerCase().includes(keyword))
        : true;
      const matchesLocation = location
        ? job.location
            .split(",")[0]
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-") === location
        : true;
      return matchesKeyword && matchesLocation;
    });
  }

  // Apply sidebar filters
  if (employmentTypes.length > 0) {
    results = results.filter((job) =>
      job.tags.some((tag) => employmentTypes.includes(tag.toLowerCase()))
    );
  }
  if (categories.length > 0) {
    results = results.filter((job) =>
      job.tags.some((tag) => categories.includes(tag.toLowerCase()))
    );
  }
  if (jobLevels.length > 0) {
    results = results.filter((job) =>
      job.tags.some((tag) => jobLevels.includes(tag.toLowerCase()))
    );
  }
  if (salaryRanges.length > 0) {
    // Placeholder: Implement salary range filtering if job data includes salary
  }

  return results;
}

// Methods
function handleSearch(queryObj) {
  searchQuery.value = queryObj;
  currentPage.value = 1;
  updateUrl();
}

function clearSearch() {
  searchQuery.value = { keyword: "", location: "" };
  selectedFilters.value = {
    employmentTypes: [],
    categories: [],
    jobLevels: [],
    salaryRanges: [],
  };
  currentPage.value = 1;
  updateUrl();
  heroSection.value?.clearSearch(); // Ensure HeroSection clears SearchJob inputs
}

function updatePage(page) {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updatePerPage(perPage) {
  itemsPerPage.value = perPage;
  currentPage.value = 1;
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

// Initialize from URL
onMounted(() => {
  const url = new URL(window.location);
  searchQuery.value = {
    keyword: url.searchParams.get("keyword") || "",
    location: url.searchParams.get("location") || "",
  };
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
