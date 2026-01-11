import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCompanyStore } from "./companyStore";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const subPrefix = "jobhunter-system"; // Confirmed working API prefix

const mockApi = {
  async fetchJobs({
    page = 1,
    limit = 30,
    keyword = "",
    location = "",
    jobType = [],
    tags = [],
    techStacks = [], // Added to match JobSearchOptions
    experience = [],
    salaryMin = "",
    salaryMax = "",
    remote = "",
    sortBy = "relevance",
    sortOrder = "DESC",
    fuzzySearch = false,
  } = {}) {
    console.log(
      "API_BASE_URL:",
      API_BASE_URL,
      "subPrefix:",
      subPrefix,
      "Time:",
      new Date().toLocaleString("en-US", { timeZone: "+07:00" })
    );
    const response = await axios.get(`${API_BASE_URL}/${subPrefix}/all-jobs`, {
      params: {
        page,
        limit,
        keyword: keyword || "",
        location: location || "",
        jobType: jobType.length ? jobType.join(",") : "",
        tags: tags.length ? tags.join(",") : "",
        techStacks: techStacks.length ? techStacks.join(",") : "",
        experience: experience.length ? experience.join(",") : "",
        salaryMin: salaryMin || "",
        salaryMax: salaryMax || "",
        remote: remote === true ? "true" : remote === false ? "false" : "",
        sortBy,
        sortOrder,
        fuzzySearch,
      },
    });
    return response.data; // Returns { jobs: Job[], total: number, facets?: SearchFacets }
  },
  async fetchJobById(id) {
    const response = await axios.get(`${API_BASE_URL}/${subPrefix}/jobs/${id}`);
    return response.data; // Returns Job
  },
  async fetchSimilarJobs(id, limit = 5) {
    const response = await axios.get(
      `${API_BASE_URL}/${subPrefix}/jobs/${id}/similar`,
      {
        params: { limit },
      }
    );
    return response.data; // Returns { jobs: Job[], total: number }
  },
  async fetchFilterOptions() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${subPrefix}/filter-options`
      );
      return response.data; // Returns { jobTypes, categories, experienceLevels, salaryRanges }
    } catch (err) {
      console.warn(
        "Filter options endpoint failed, using fallback:",
        err.message
      );
      return {
        jobTypes: [
          { id: "full-time", label: "Full-Time", count: 25 },
          { id: "part-time", label: "Part-Time ", count: 3 },
          // { id: "internship", label: "Internship", count: 2 },
          // { id: "freelance", label: "Freelance", count: 1 },
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
        experienceLevels: [
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
    }
  },
};

export const useJobStore = defineStore("jobStore", () => {
  // State
  const searchQuery = ref({
    keyword: "",
    location: "",
    jobType: [],
    tags: [],
    techStacks: [], // Added to match JobSearchOptions
    experience: [],
    salaryRange: { min: "", max: "" },
    remote: "",
    sortBy: "relevance",
    sortOrder: "DESC",
    fuzzySearch: false,
  });
  const highDemandJobs = ref([]);
  const latestJobs = ref([]);
  const currentPage = ref(1);
  const itemsPerPage = ref(6);
  const jobs = ref([]);
  const totalJobs = ref(0);
  const employmentTypes = ref([]);
  const categories = ref([]);
  const jobLevels = ref([]);
  const salaryRanges = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed properties
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalJobs.value / itemsPerPage.value))
  );
  const hasFilters = computed(() => {
    const { jobType, tags, techStacks, experience, salaryRange, remote } =
      searchQuery.value;
    return (
      jobType.length > 0 ||
      tags.length > 0 ||
      techStacks.length > 0 ||
      experience.length > 0 ||
      salaryRange.min !== "" ||
      salaryRange.max !== "" ||
      remote !== ""
    );
  });

  const selectedFilters = computed(() => {
    const { jobType, tags, experience, salaryRange } = searchQuery.value;
    const salaryRangeIds = [];

    // Map salary range back to IDs
    if (salaryRange.min || salaryRange.max) {
      if (salaryRange.min === "500" && salaryRange.max === "1000") {
        salaryRangeIds.push("range1");
      } else if (salaryRange.min === "1000" && salaryRange.max === "1500") {
        salaryRangeIds.push("range2");
      } else if (salaryRange.min === "1500" && salaryRange.max === "2000") {
        salaryRangeIds.push("range3");
      } else if (salaryRange.min === "3000") {
        salaryRangeIds.push("range4");
      }
    }

    return {
      employmentTypes: jobType || [],
      categories: tags || [],
      jobLevels: experience || [],
      salaryRanges: salaryRangeIds,
    };
  });

  async function fetchJobs() {
    const companyStore = useCompanyStore();
    isLoading.value = true;
    error.value = null;
    try {
      let companies = companyStore.companies || [];
      if (!companies.length) {
        companies = await companyStore.fetchCompanies();
        if (!companyStore.companies?.length && Array.isArray(companies)) {
          companyStore.companies = companies;
        }
      }

      const response = await mockApi.fetchJobs({
        page: currentPage.value,
        limit: itemsPerPage.value,
        keyword: searchQuery.value.keyword,
        location: searchQuery.value.location,
        jobType: searchQuery.value.jobType,
        tags: searchQuery.value.tags,
        techStacks: searchQuery.value.techStacks, // Added
        experience: searchQuery.value.experience,
        salaryMin: searchQuery.value.salaryRange.min,
        salaryMax: searchQuery.value.salaryRange.max,
        remote: searchQuery.value.remote,
        sortBy: searchQuery.value.sortBy,
        sortOrder: searchQuery.value.sortOrder,
        fuzzySearch: searchQuery.value.fuzzySearch,
      });
      console.log("Raw API response:", response);
      const { jobs: jobData, total } = response;

      if (!Array.isArray(jobData)) {
        console.error("Invalid API response structure:", jobData);
        throw new Error(
          `API response is not an array. Received: ${typeof jobData}`
        );
      }

      jobs.value = jobData.map((job) => {
        const company = companies.find((c) => c.id === job.company_id);
        return {
          ...job,
          companyName: company ? company.name : "Unknown Company",
          companyLogo: company ? company.brand_logo_thumbnail : null,
          companyLocation: company ? company.headquarters_location : null,
        };
      });
      totalJobs.value = total;
      console.log("Mapped jobs:", jobs.value);
    } catch (err) {
      error.value = err.message || "Failed to fetch jobs";
      jobs.value = [];
      totalJobs.value = 0;
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
      employmentTypes.value = data.jobTypes || [];
      categories.value = data.categories || [];
      jobLevels.value = data.experienceLevels || [];
      salaryRanges.value = data.salaryRanges || [];
    } catch (err) {
      error.value = err.message || "Failed to fetch filter options";
      console.error("Fetch filter options error:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchHighDemandHighSalaryJobs() {
    const companyStore = useCompanyStore();
    isLoading.value = true;
    error.value = null;
    try {
      let companies = companyStore.companies || [];
      if (!companies.length) {
        companies = await companyStore.fetchCompanies();
        if (!companyStore.companies?.length && Array.isArray(companies)) {
          companyStore.companies = companies;
        }
      }

      const response = await mockApi.fetchJobs({
        page: 1,
        limit: 30,
        sortBy: "relevance",
        sortOrder: "DESC",
      });
      console.log("Raw API response (high demand):", response);
      const { jobs: jobData } = response;

      if (!Array.isArray(jobData)) {
        console.error("Invalid API response structure:", jobData);
        throw new Error(
          `API response is not an array. Received: ${typeof jobData}`
        );
      }

      highDemandJobs.value = jobData
        .filter((job) => job.applicant_applied > 5)
        .map((job) => {
          const company = companies.find((c) => c.id === job.company_id);
          return {
            ...job,
            companyName: company ? company.name : "Unknown Company",
            companyLogo: company ? company.brand_logo_thumbnail : null,
            companyLocation: company ? company.headquarters_location : null,
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
      let companies = companyStore.companies || [];
      if (!companies.length) {
        companies = await companyStore.fetchCompanies();
        if (!companyStore.companies?.length && Array.isArray(companies)) {
          companyStore.companies = companies;
        }
      }

      const response = await mockApi.fetchJobs({
        page: 1,
        limit: 4,
        sortBy: "created_at",
        sortOrder: "DESC",
      });
      console.log("Raw API response (latest):", response);
      const { jobs: jobData } = response;

      if (!Array.isArray(jobData)) {
        console.error("Invalid API response structure:", jobData);
        throw new Error(
          `API response is not an array. Received: ${typeof jobData}`
        );
      }

      latestJobs.value = jobData.map((job) => {
        const company = companies.find((c) => c.id === job.company_id);
        return {
          ...job,
          companyName: company ? company.name : "Unknown Company",
          companyLogo: company ? company.brand_logo_thumbnail : null,
          companyLocation: company ? company.headquarters_location : null,
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

  async function fetchSimilarJobs(jobId) {
    const companyStore = useCompanyStore();
    isLoading.value = true;
    error.value = null;
    try {
      let companies = companyStore.companies || [];
      if (!companies.length) {
        companies = await companyStore.fetchCompanies();
        if (!companyStore.companies?.length && Array.isArray(companies)) {
          companyStore.companies = companies;
        }
      }

      const response = await mockApi.fetchSimilarJobs(jobId, 5);
      console.log("Raw API response (similar jobs):", response);
      const { jobs: jobData } = response;

      if (!Array.isArray(jobData)) {
        console.error("Invalid API response structure:", jobData);
        throw new Error(
          `API response is not an array. Received: ${typeof jobData}`
        );
      }

      return jobData.map((job) => {
        const company = companies.find((c) => c.id === job.company_id);
        return {
          ...job,
          companyName: company ? company.name : "Unknown Company",
          companyLogo: company ? company.brand_logo_thumbnail : null,
          companyLocation: company ? company.headquarters_location : null,
        };
      });
    } catch (err) {
      error.value = err.message || "Failed to fetch similar jobs";
      console.error("Fetch error:", err);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchJobById(id) {
    isLoading.value = true;
    error.value = null;
    try {
      const companyStore = useCompanyStore();
      let companies = companyStore.companies || [];
      if (!companies.length) {
        companies = await companyStore.fetchCompanies();
        if (!companyStore.companies?.length && Array.isArray(companies)) {
          companyStore.companies = companies;
        }
      }

      const job = await mockApi.fetchJobById(id);
      console.log("Raw /jobs/:id response:", job);

      if (!job || typeof job !== "object" || !job.id) {
        console.error("Invalid /jobs/:id response structure:", job);
        throw new Error("Invalid job data received");
      }

      const company = companies.find((c) => c.id === job.company_id);
      return {
        ...job,
        companyName: company ? company.name : "Unknown Company",
        companyLogo: company ? company.brand_logo_thumbnail : null,
        companyLocation: company ? company.headquarters_location : null,
      };
    } catch (err) {
      error.value = err.message || "Failed to fetch job";
      console.error("Fetch job error:", err);
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  function setSearchQuery(queryObj) {
    searchQuery.value = {
      ...searchQuery.value,
      keyword: queryObj.keyword?.trim() || "",
      location: queryObj.location?.trim() || "",
      jobType: queryObj.employmentTypes || [],
      tags: queryObj.categories || [],
      techStacks: queryObj.techStacks || [], // Added
      experience: queryObj.jobLevels || [],
      salaryRange: queryObj.salaryRange || { min: "", max: "" },
      remote: queryObj.remote ?? "",
      sortBy: queryObj.sortBy || "relevance",
      sortOrder: queryObj.sortOrder || "DESC",
      fuzzySearch: queryObj.fuzzySearch || false,
    };
    currentPage.value = 1;
    return fetchJobs();
  }

  function clearSearch() {
    searchQuery.value = {
      keyword: "",
      location: "",
      jobType: [],
      tags: [],
      techStacks: [], // Added
      experience: [],
      salaryRange: { min: "", max: "" },
      remote: "",
      sortBy: "relevance",
      sortOrder: "DESC",
      fuzzySearch: false,
    };
    currentPage.value = 1;

    // Clear URL parameters by navigating to clean jobs page
    const url = new URL(window.location);
    url.search = ""; // Remove all query parameters
    window.history.pushState({}, "", url.pathname); // Keep only the path, remove all params

    return fetchJobs();
  }

  function updateFilters(filterType, value) {
    if (filterType === "employmentTypes") {
      searchQuery.value.jobType = value || [];
    } else if (filterType === "categories") {
      searchQuery.value.tags = value || [];
    } else if (filterType === "techStacks") {
      // Added
      searchQuery.value.techStacks = value || [];
    } else if (filterType === "jobLevels") {
      searchQuery.value.experience = value || [];
    } else if (filterType === "salaryRanges") {
      const salaryRangeMap = {
        range1: { min: "500", max: "1000" },
        range2: { min: "1000", max: "1500" },
        range3: { min: "1500", max: "2000" },
        range4: { min: "3000", max: "" },
      };
      searchQuery.value.salaryRange = value.length
        ? salaryRangeMap[value[0]]
        : { min: "", max: "" };
    } else if (filterType === "remote") {
      searchQuery.value.remote = value ?? "";
    }
    currentPage.value = 1;
    return fetchJobs();
  }

  function updatePage(page) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return fetchJobs();
  }

  function updatePerPage(perPage) {
    itemsPerPage.value = perPage;
    currentPage.value = 1;
    return fetchJobs();
  }

  function updateUrl() {
    const url = new URL(window.location);
    const {
      keyword,
      location,
      jobType,
      tags,
      techStacks,
      experience,
      salaryRange,
      remote,
      sortBy,
      sortOrder,
      fuzzySearch,
    } = searchQuery.value;
    url.searchParams.set("keyword", keyword || ""); // Updated from searchkeyparam
    url.searchParams.set("location", location || "");
    url.searchParams.set("jobType", jobType.length ? jobType.join(",") : "");
    url.searchParams.set("tags", tags.length ? tags.join(",") : "");
    url.searchParams.set(
      "techStacks",
      techStacks.length ? techStacks.join(",") : ""
    );
    url.searchParams.set(
      "experience",
      experience.length ? experience.join(",") : ""
    );
    url.searchParams.set("salaryMin", salaryRange.min || "");
    url.searchParams.set("salaryMax", salaryRange.max || "");
    url.searchParams.set(
      "remote",
      remote === true ? "true" : remote === false ? "false" : ""
    );
    url.searchParams.set("sortBy", sortBy || "relevance");
    url.searchParams.set("sortOrder", sortOrder || "DESC");
    url.searchParams.set("fuzzySearch", fuzzySearch.toString());
    window.history.pushState({}, "", url);
  }

  function initializeFromUrl() {
    const url = new URL(window.location);
    searchQuery.value = {
      keyword: url.searchParams.get("keyword") || "", // Updated from searchkeyparam
      location: url.searchParams.get("location") || "",
      jobType:
        url.searchParams.get("jobType")?.split(",").filter(Boolean) || [],
      tags: url.searchParams.get("tags")?.split(",").filter(Boolean) || [],
      techStacks:
        url.searchParams.get("techStacks")?.split(",").filter(Boolean) || [], // Added
      experience:
        url.searchParams.get("experience")?.split(",").filter(Boolean) || [],
      salaryRange: {
        min: url.searchParams.get("salaryMin") || "",
        max: url.searchParams.get("salaryMax") || "",
      },
      remote:
        url.searchParams.get("remote") === "true"
          ? true
          : url.searchParams.get("remote") === "false"
          ? false
          : "",
      sortBy: url.searchParams.get("sortBy") || "relevance",
      sortOrder: url.searchParams.get("sortOrder") || "DESC",
      fuzzySearch: url.searchParams.get("fuzzySearch") === "true",
    };
  }

  // Getters
  const getJobById = async (id) => {
    return fetchJobById(id);
  };

  const getAllJobs = () => {
    return jobs.value;
  };

  return {
    highDemandJobs,
    searchQuery,
    employmentTypes,
    categories,
    jobLevels,
    salaryRanges,
    selectedFilters,
    jobs,
    currentPage,
    itemsPerPage,
    totalJobs,
    totalPages,
    hasFilters,
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
    fetchSimilarJobs,
  };
});
