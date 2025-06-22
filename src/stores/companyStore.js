

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/jobhunter-system";

export const useCompanyStore = defineStore("companies", () => {
  // State
  const searchQuery = ref({ keyword : "", location: "" });
  const recommendedCompanies = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed properties
  const totalCompanyCount = computed(() => recommendedCompanies.value.length);

  const getCompaniesByTag = computed(() => {
    return (tag) => recommendedCompanies.value.filter((company) => company.tags.includes(tag));
  });

  const getCompanyById = computed(() => {
    return (companyId) => recommendedCompanies.value.find((company) => company.id === companyId);
  });

  const searchedCompanies = computed(() => {
    let result = recommendedCompanies.value;
    let { keyword, location } = searchQuery.value;

    // Normalize inputs
    keyword = keyword ? keyword.toLowerCase().trim() : "";
    location = location ? location.toLowerCase().trim() : "";

    // Early return if no filters
    if (!keyword && !location) {
      return result;
    }

    // Split keyword into terms, remove empty terms
    const searchTerms = keyword.split(/\s+/).filter((term) => term.length > 0);

    // Filter companies
    result = result.filter((company) => {
      let keywordMatch = true;
      let locationMatch = true;

      // Keyword matching (name, description, tags)
      if (searchTerms.length > 0) {
        const companyText = [
          company.name.toLowerCase(),
          company.description.toLowerCase(),
          ...company.tags.map((tag) => tag.toLowerCase()),
        ].join(" ");

        keywordMatch =
          searchTerms.every((term) => companyText.includes(term)) ||
          searchTerms.some((term) =>
            companyText.split(/\s+/).some((word) => word.startsWith(term))
          );
      }

      // Location matching (location field and tags)
      if (location) {
        const locationText = [
          company.location.toLowerCase(),
          ...company.tags.map((tag) => tag.toLowerCase()),
        ].join(" ");

        locationMatch =
          company.location.toLowerCase().includes(location) ||
          locationText.split(/\s+/).some((word) => word.startsWith(location)) ||
          company.location.toLowerCase().split(",")[0].trim().includes(location);
      }

      return keywordMatch && locationMatch;
    });

    return result;
  });

  // Actions
  async function fetchCompanies({ keyword = "", location = "", page = 1, limit = 30 } = {}) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${API_BASE_URL}/all-companies`, {
        params: { searchkeyparam: keyword, location, page, limit },
      });
      console.log("Raw /all-companies response:", response.data);
      let data = response.data;

      // Handle common API response formats
      if (data && typeof data === "object") {
        if (Array.isArray(data.companies)) {
          data = data.companies;
        } else if (Array.isArray(data.data)) {
          data = data.data;
        } else if (Array.isArray(data.results)) {
          data = data.results;
        }
      }

      // Validate that data is an array
      if (!Array.isArray(data)) {
        console.error("Invalid /all-companies response structure:", data);
        throw new Error(`API response is not an array. Received: ${typeof data}`);
      }

      // Only update recommendedCompanies if fetching all companies (no filters, default pagination)
      if (!keyword && !location && page === 1 && limit >= 30) {
        recommendedCompanies.value = data;
      }
      console.log("Fetched companies:", data);
      return data;
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
      const response = await axios.get(`${API_BASE_URL}/companies/${companyId}`);
      console.log("Raw /companies/:id response:", response.data);
      const company = response.data;

      // Validate response
      if (!company || typeof company !== "object" || !company.id) {
        console.error("Invalid /companies/:id response structure:", company);
        throw new Error("Invalid company data received");
      }

      // Update recommendedCompanies if the company isn't already present
      const existingIndex = recommendedCompanies.value.findIndex((c) => c.id === company.id);
      if (existingIndex === -1) {
        recommendedCompanies.value.push(company);
      } else {
        recommendedCompanies.value[existingIndex] = company;
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
      const response = await axios.get(`${API_BASE_URL}/companies/${companyId}/similar`, {
        params: { limit },
      });
      console.log("Raw /companies/:id/similar response:", response.data);
      let data = response.data;

      // Handle common API response formats
      if (data && typeof data === "object") {
        if (Array.isArray(data.companies)) {
          data = data.companies;
        } else if (Array.isArray(data.data)) {
          data = data.data;
        } else if (Array.isArray(data.results)) {
          data = data.results;
        }
      }

      // Validate that data is an array
      if (!Array.isArray(data)) {
        console.error("Invalid /companies/:id/similar response structure:", data);
        throw new Error(`API response is not an array. Received: ${typeof data}`);
      }

      console.log("Fetched similar companies:", data);
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch similar companies";
      console.error("Fetch similar companies error:", err);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  function setSearchQuery({ keyword = "", location = "" }) {
    searchQuery.value = { keyword, location };
  }

  return {
    recommendedCompanies,
    searchQuery,
    totalCompanyCount,
    getCompaniesByTag,
    getCompanyById,
    searchedCompanies,
    isLoading,
    error,
    fetchCompanies,
    fetchCompanyDetails,
    fetchSimilarCompanies,
    setSearchQuery,
  };
});
