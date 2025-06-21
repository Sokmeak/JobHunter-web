import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCompanyStore } from "./companyStore";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/jobhunter-system";

// Mock API functions
const mockApi = {
  async fetchJobs() {
    const response = await axios.get(`${API_BASE_URL}/all-jobs`);
    return response.data;
  },
  async fetchFilterOptions() {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500)
    );
    if (Math.random() < 0.05) {
      throw new Error("Failed to fetch filter options from server");
    }
    return {
      employmentTypes: [
        { id: "full-time", label: "Full-time", count: 25 },
        { id: "part-time", label: "Part-Time", count: 3 },
        { id: "internship", label: "Internship", count: 2 },
        { id: "freelance", label: "Freelance", count: 1 },
      ],
      categories: [
        { id: "design", label: "Design", count: 6 },
        { id: "sales", label: "Sales", count: 2 },
        { id: "marketing", label: "Marketing", count: 4 },
        { id: "business", label: "Business", count: 2 },
        { id: "hr", label: "Human Resource", count: 1 },
        { id: "finance", label: "Finance", count: 0 },
        { id: "engineering", label: "Engineering", count: 12 },
        { id: "technology", label: "Technology", count: 13 },
      ],
      jobLevels: [
        { id: "entry level", label: "Entry Level", count: 7 },
        { id: "junior", label: "Junior", count: 10 },
        { id: "senior level", label: "Senior Level", count: 10 },
        { id: "manager", label: "Manager", count: 3 },
      ],
      salaryRanges: [
        { id: "range1", label: "$500 - $1000", count: 6 },
        { id: "range2", label: "$1000 - $1500", count: 3 },
        { id: "range3", label: "$1500 - $2000", count: 11 },
        { id: "range4", label: "$3000 or above", count: 10 },
      ],
    };
  },
};

export const useJobStore = defineStore("jobStore", () => {
  // State
  const searchQuery = ref({ keyword: "", location: "" });
  const selectedFilters = ref({
    employmentTypes: [],
    categories: [],
    jobLevels: [],
    salaryRanges: [],
  });
  const highDemandJobs = ref([]);
  const latestJobs = ref([]);
  const currentPage = ref(1);
  const itemsPerPage = ref(6);
  const jobs = ref([]);
  const employmentTypes = ref([]);
  const categories = ref([]);
  const jobLevels = ref([]);
  const salaryRanges = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed properties
  const totalJobs = computed(() => applyFilters(jobs.value).length);
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalJobs.value / itemsPerPage.value))
  );
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
  const filteredJobs = computed(() => {
    const results = applyFilters(jobs.value);
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return results.length ? results.slice(start, end) : [];
  });

  // Reusable filter function
  function applyFilters(jobs) {
    let results = [...jobs];
    const keyword = searchQuery.value.keyword?.toLowerCase().trim() || "";
    const location =
      searchQuery.value.location?.toLowerCase().trim().replace(/\s+/g, "-") ||
      "";
    const { employmentTypes, categories, jobLevels, salaryRanges } =
      selectedFilters.value;

    // Apply search filters
    if (keyword || location) {
      results = results.filter((job) => {
        const matchesKeyword = keyword
          ? job.title.toLowerCase().includes(keyword) ||
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
        employmentTypes
          .map((type) => type.toLowerCase())
          .includes(job.job_type.toLowerCase())
      );
    }

    if (categories.length > 0) {
      results = results.filter((job) =>
        job.tags.some((tag) => categories.includes(tag.toLowerCase()))
      );
    }

    if (jobLevels.length > 0) {
      results = results.filter((job) =>
        jobLevels.includes(job.level.toLowerCase())
      );
    }

    if (salaryRanges.length > 0) {
      const salaryRangeMap = {
        range1: { min: 500, max: 1000 },
        range2: { min: 1000, max: 1500 },
        range3: { min: 1500, max: 2000 },
        range4: { min: 3000, max: Infinity },
      };
      results = results.filter((job) => {
        const salaryRange = job.salary_range.replace(/[^0-9-]/g, "");
        if (salaryRange.includes("or above")) {
          const minSalary = Number(salaryRange.replace(" or above", ""));
          return salaryRanges.some((range) => {
            const { min } = salaryRangeMap[range];
            return minSalary >= min;
          });
        }
        const [minSalary, maxSalary] = salaryRange.split("-").map(Number);
        if (minSalary && maxSalary) {
          return salaryRanges.some((range) => {
            const { min, max } = salaryRangeMap[range];
            return minSalary >= min && maxSalary <= max;
          });
        }
        return false;
      });
    }

    return results;
  }

  async function fetchJobs() {
    const companyStore = useCompanyStore();
    isLoading.value = true;
    error.value = null;
    try {
      // Ensure companies are fetched and use the result
      let companies = companyStore.companies || [];
      if (!companies.length) {
        companies = await companyStore.fetchCompanies();
        // Update store if fetchCompanies doesn't automatically do so
        if (!companyStore.companies?.length && Array.isArray(companies)) {
          companyStore.companies = companies; // Ensure store is updated
        }
      }

      const response = await mockApi.fetchJobs();
      console.log("Raw API response:", response); // Log raw response
      let data = response;

      // Handle common API response formats
      if (data && typeof data === "object") {
        if (Array.isArray(data.jobs)) {
          data = data.jobs;
        } else if (Array.isArray(data.data)) {
          data = data.data;
        } else if (Array.isArray(data.results)) {
          data = data.results;
        }
      }

      // Validate that data is an array
      if (!Array.isArray(data)) {
        console.error("Invalid API response structure:", data);
        throw new Error(
          `API response is not an array. Received: ${typeof data}`
        );
      }

      // Use local companies variable to avoid reactivity issues
      jobs.value = data.map((job) => {
        const company = companies.find((c) => c.id === job.company_id);
        if (!company) {
          console.warn(
            `No company found for job ${job.id} with company_id ${job.company_id}`
          );
        }
        return {
          ...job,
          companyName: company ? company.name : "Unknown Company",
          companyLogo: company ? company.logo : null,
          companyLocation: company ? company.location : null,
        };
      });
      console.log("Mapped jobs:", jobs.value); // Log mapped jobs
    } catch (err) {
      error.value = err.message || "Failed to fetch jobs";
      jobs.value = [];
      console.error("Fetch error:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchFilterOptions() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await mockApi.fetchFilterOptions();
      employmentTypes.value = data.employmentTypes;
      categories.value = data.categories;
      jobLevels.value = data.jobLevels;
      salaryRanges.value = data.salaryRanges;
    } catch (err) {
      error.value = err.message || "Failed to fetch filter options";
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchHighDemandHighSalaryJobs() {
    const companyStore = useCompanyStore();
    isLoading.value = true;
    error.value = null;
    try {
      if (!companyStore.companies || companyStore.companies.length === 0) {
        await companyStore.fetchCompanies();
      }
      const response = await mockApi.fetchJobs();
      console.log("Raw API response (high demand):", response);
      let data = response;

      if (data && typeof data === "object") {
        if (Array.isArray(data.jobs)) {
          data = data.jobs;
        } else if (Array.isArray(data.data)) {
          data = data.data;
        } else if (Array.isArray(data.results)) {
          data = data.results;
        }
      }

      if (!Array.isArray(data)) {
        console.error("Invalid API response structure:", data);
        throw new Error(
          `API response is not an array. Received: ${typeof data}`
        );
      }

      highDemandJobs.value = data
        .filter((job) => job.applicant_applied > 5)
        .map((job) => {
          const company = Array.isArray(companyStore.companies)
            ? companyStore.companies.find((c) => c.id === job.company_id)
            : null;
          return {
            ...job,
            companyName: company ? company.name : "Unknown Company",
          };
        });
      console.log("High demand jobs:", highDemandJobs.value);
    } catch (err) {
      error.value = err.message || "Failed to fetch high demand jobs";
      highDemandJobs.value = [];
      console.error("Fetch error:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchLatestJobs() {
    const companyStore = useCompanyStore();
    isLoading.value = true;
    error.value = null;
    try {
      if (!companyStore.companies || companyStore.companies.length === 0) {
        await companyStore.fetchCompanies();
      }
      const response = await mockApi.fetchJobs();
      console.log("Raw API response (latest):", response);
      let data = response;

      if (data && typeof data === "object") {
        if (Array.isArray(data.jobs)) {
          data = data.jobs;
        } else if (Array.isArray(data.data)) {
          data = data.data;
        } else if (Array.isArray(data.results)) {
          data = data.results;
        }
      }

      if (!Array.isArray(data)) {
        console.error("Invalid API response structure:", data);
        throw new Error(
          `API response is not an array. Received: ${typeof data}`
        );
      }

      const sortedJobs = [...data].sort(
        (a, b) => new Date(b.posted_at) - new Date(a.posted_at)
      );
      latestJobs.value = sortedJobs.slice(0, 4).map((job) => {
        const company = Array.isArray(companyStore.companies)
          ? companyStore.companies.find((c) => c.id === job.company_id)
          : null;
        return {
          ...job,
          companyName: company ? company.name : "Unknown Company",
        };
      });
      console.log("Latest jobs:", latestJobs.value);
    } catch (err) {
      error.value = err.message || "Failed to fetch latest jobs";
      latestJobs.value = [];
      console.error("Fetch error:", err);
    } finally {
      isLoading.value = false;
    }
  }

  function setSearchQuery(queryObj) {
    searchQuery.value = queryObj;
    currentPage.value = 1;
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
  }

  function updateFilters(filterType, value) {
    selectedFilters.value = {
      ...selectedFilters.value,
      [filterType]: value,
    };
    currentPage.value = 1;
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

  function initializeFromUrl() {
    const url = new URL(window.location);
    searchQuery.value = {
      keyword: url.searchParams.get("keyword") || "",
      location: url.searchParams.get("location") || "",
    };
  }

  // Getters
  const getJobById = (id) => {
    return jobs.value.find((job) => job.id === id);
  };
  const getAllJobs = () => {
    return jobs.value;
  };

  return {
    highDemandJobs,
    searchQuery,
    selectedFilters,
    employmentTypes,
    categories,
    jobLevels,
    salaryRanges,
    jobs,
    currentPage,
    itemsPerPage,
    totalJobs,
    totalPages,
    hasFilters,
    filteredJobs,
    isLoading,
    error,
    latestJobs,
    fetchJobs,
    fetchFilterOptions,
    setSearchQuery,
    clearSearch,
    updateFilters,
    updatePage,
    updatePerPage,
    updateUrl,
    initializeFromUrl,
    getJobById,
    getAllJobs,
    fetchHighDemandHighSalaryJobs,
    fetchLatestJobs,
  };
});
