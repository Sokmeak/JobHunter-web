import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const subPrefix = "jobhunter-system";

export const useCompanyStore = defineStore("companies", () => {
  // State
  const searchQuery = ref({
    keyword: "",
    location: "",
    tags: [],
    techStacks: [],
    sortBy: "name",
    sortOrder: "ASC",
    fuzzySearch: false,
    includeInactive: false,
    page: 1,
    limit: 30,
  });
  const companies = ref([]);
  const totalCount = ref(0);
  const facets = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed properties
  const totalCompanyCount = computed(() => totalCount.value);

  const getCompaniesByTag = computed(() => {
    return (tag) =>
      companies.value.filter((company) => company.tags?.includes(tag));
  });

  const getCompanyById = computed(() => {
    return (companyId) =>
      companies.value.find((company) => company.id === companyId);
  });

  // Actions
  async function fetchCompanies({
    keyword = searchQuery.value.keyword || "",
    location = searchQuery.value.location || "",
    tags = searchQuery.value.tags || [],
    techStacks = searchQuery.value.techStacks || [],
    sortBy = searchQuery.value.sortBy || "name",
    sortOrder = searchQuery.value.sortOrder || "ASC",
    fuzzySearch = searchQuery.value.fuzzySearch || false,
    includeInactive = searchQuery.value.includeInactive || false,
    page = searchQuery.value.page || 1,
    limit = searchQuery.value.limit || 30,
  } = {}) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${subPrefix}/all-companies`,
        {
          params: {
            keyword,
            location,
            tags: tags?.length ? tags.join(",") : undefined,
            techStacks: techStacks?.length ? techStacks.join(",") : undefined,
            sortBy,
            sortOrder,
            fuzzySearch,
            includeInactive,
            page,
            limit,
          },
        }
      );
      console.log("Raw /all-companies response:", response.data);

      const {
        companies: fetchedCompanies,
        total,
        facets: responseFacets,
      } = response.data;

      // Validate response
      if (!Array.isArray(fetchedCompanies)) {
        console.error(
          "Invalid /all-companies response structure:",
          response.data
        );
        throw new Error("API response companies is not an array");
      }

      // Update state
      companies.value = fetchedCompanies;
      totalCount.value = total || fetchedCompanies.length;
      facets.value = responseFacets || null;

      console.log(
        "Fetched companies:",
        fetchedCompanies,
        "Total:",
        total,
        "Facets:",
        responseFacets
      );
      return fetchedCompanies;
    } catch (err) {
      error.value = err.message || "Failed to fetch companies";
      console.error("Fetch companies error:", err);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchCompanyDetails(companyId) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${subPrefix}/companies/${companyId}`
      );
      console.log("Raw /companies/:id response:", response.data);
      const company = response.data;

      // Validate response
      if (!company || typeof company !== "object" || !company.id) {
        console.error("Invalid /companies/:id response structure:", company);
        throw new Error("Invalid company data received");
      }

      // Update companies if the company isn't already present
      const existingIndex = companies.value.findIndex(
        (c) => c.id === company.id
      );
      if (existingIndex === -1) {
        companies.value.push(company);
      } else {
        companies.value[existingIndex] = company;
      }
      console.log("Fetched company details:", company);
      return company;
    } catch (err) {
      error.value = err.message || "Failed to fetch company details";
      console.error("Fetch company details error:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchSimilarCompanies(companyId, { limit = 5 } = {}) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${subPrefix}/companies/${companyId}/similar`,
        {
          params: { limit },
        }
      );
      console.log("Raw /companies/:id/similar response:", response.data);
      const { companies: similarCompanies } = response.data;

      // Validate response
      if (!Array.isArray(similarCompanies)) {
        console.error(
          "Invalid /companies/:id/similar response structure:",
          response.data
        );
        throw new Error("API response companies is not an array");
      }

      console.log("Fetched similar companies:", similarCompanies);
      return similarCompanies;
    } catch (err) {
      error.value = err.message || "Failed to fetch similar companies";
      console.error("Fetch similar companies error:", err);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  function setSearchQuery({
    keyword = "",
    location = "",
    tags = [],
    techStacks = [],
    sortBy = "name",
    sortOrder = "ASC",
    fuzzySearch = false,
    includeInactive = false,
    page = 1,
    limit = 30,
  } = {}) {
    console.log("Setting search query:", {
      keyword,
      location,
      tags,
      techStacks,
      sortBy,
      sortOrder,
      fuzzySearch,
      includeInactive,
      page,
      limit,
    });

    searchQuery.value = {
      keyword: keyword.trim(),
      location: location.trim(),
      tags: Array.isArray(tags) ? tags : [],
      techStacks: Array.isArray(techStacks) ? techStacks : [],
      sortBy,
      sortOrder,
      fuzzySearch,
      includeInactive,
      page,
      limit,
    };

    // Trigger a fetch with the new search parameters
    return fetchCompanies(searchQuery.value);
  }

  return {
    companies,
    searchQuery,
    totalCompanyCount,
    facets,
    getCompaniesByTag,
    getCompanyById,
    isLoading,
    error,
    fetchCompanies,
    fetchCompanyDetails,
    fetchSimilarCompanies,
    setSearchQuery,
  };
});
