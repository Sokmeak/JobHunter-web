// stores/company/companyProfileStore.js - Fixed with correct DTO structure
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "./auth";

const API_BASE_URL = "http://localhost:3000";

export const useCompanyProfileStore = defineStore("companyProfileStore", () => {
  const authStore = useAuthStore();

  const loading = ref(false);
  const error = ref(null);
  const profileExists = ref(false);
  const hasTriedFetching = ref(false);

  const companyData = ref({
    name: "",
    hr_contact_name: "",
    hr_contact_email: "",
    logo: "",
    industry: "",
    size: "",
    foundedYear: null,
    website: "",
    linkedin: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const getAuthHeaders = () => {
    const token = authStore.token || localStorage.getItem("access_token");
    if (!token) {
      authStore.logout();
      throw new Error("No authentication token found. Please log in again.");
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Extract user ID from JWT token
  const getUserIdFromToken = () => {
    const token = authStore.token || localStorage.getItem("access_token");
    if (!token) return null;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const payload = JSON.parse(jsonPayload);
      return payload.id; // Based on your JWT payload structure
    } catch (err) {
      console.error("Failed to extract user ID from token:", err);
      return null;
    }
  };

  const fetchProfile = async () => {
    if (hasTriedFetching.value && !profileExists.value) {
      return null;
    }

    try {
      loading.value = true;
      error.value = null;

      // First try to get from your existing auth store
      if (authStore.company) {
        mapCompanyDataFromAuth(authStore.company);
        profileExists.value = true;
        hasTriedFetching.value = true;
        return authStore.company;
      }

      // If not in auth store, fetch from API using the existing method
      await authStore.fetchCompanyProfile();

      if (authStore.company) {
        mapCompanyDataFromAuth(authStore.company);
        profileExists.value = true;
        hasTriedFetching.value = true;
        return authStore.company;
      } else {
        profileExists.value = false;
        hasTriedFetching.value = true;
        return null;
      }
    } catch (err) {
      hasTriedFetching.value = true;

      if (err.response?.status === 401) {
        error.value = "Authentication failed. Please log in again.";
        authStore.logout();
      } else if (err.response?.status === 404) {
        profileExists.value = false;
        error.value = null;
        return null;
      } else {
        error.value = err.message || "Failed to fetch company profile";
        profileExists.value = false;
      }

      if (err.response?.status === 404) {
        return null;
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const mapCompanyDataFromAuth = (company) => {
    companyData.value = {
      name: company.name || "",
      hr_contact_name: company.hr_contact_name || "",
      hr_contact_email: company.hr_contact_email || "",
      logo: company.brand_logo || "",
      industry: company.industry || "",
      size: company.employee_count || "",
      foundedYear: company.founded_date
        ? new Date(company.founded_date).getFullYear()
        : null,
      website: company.website_url || "",
      linkedin: company.linkedin_url || "",
      description: company.culture_description || "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    };
  };

  const saveProfile = async () => {
    try {
      loading.value = true;
      error.value = null;

      const headers = getAuthHeaders();
      const userId = getUserIdFromToken();

      if (!userId) {
        throw new Error("Unable to get user ID from token");
      }

      // ✅ Fixed payload to match your CreateCompanyDto structure exactly
      const payload = {
        user_id: userId,
        culture_description: companyData.value.description || "",
        name: companyData.value.name,
        website_url: companyData.value.hr_contact_email || "", // ⚠️ TEMPORARY: Using email because DTO expects email here
        employee_count: companyData.value.size || "",
        email: companyData.value.hr_contact_email || "", // Required email field
        hr_contact_name: companyData.value.hr_contact_name || "",
        hr_contact_email: companyData.value.hr_contact_email || "",
        founded_date: companyData.value.foundedYear
          ? `${companyData.value.foundedYear}-01-01`
          : "",
        industry: companyData.value.industry || "",
        office_location: "", // Required field in your DTO
        twitter_url: "",
        facebook_url: "",
        linkedin_url: companyData.value.linkedin || "",
        brand_logo: companyData.value.logo || "",
        headquarters_location: "",
        isActive: true,
        isVerified: false,
        // Optional fields
        tags: [],
        benifits: [], // Note: there's a typo in your DTO - should be "benefits"
      };

      // 🔍 Additional validation to help debug
      console.log("🔍 Validating payload fields:");
      console.log("📧 email field:", payload.email);
      console.log(
        "🌐 website_url field (currently email due to DTO):",
        payload.website_url
      );
      console.log(
        "👤 user_id:",
        payload.user_id,
        "- Is number?",
        typeof payload.user_id === "number"
      );

      // Ensure user_id is a number
      if (typeof payload.user_id !== "number") {
        payload.user_id = parseInt(payload.user_id);
        console.log("🔄 Converted user_id to number:", payload.user_id);
      }

      // 🔍 DEBUG: Log what we're sending
      console.log("📤 Sending payload:", payload);
      console.log("🔄 Profile exists:", profileExists.value);
      console.log(
        "🎯 URL:",
        profileExists.value ? "PUT /companies" : "POST /companies"
      );

      let response;
      if (profileExists.value) {
        response = await axios.put(`${API_BASE_URL}/companies`, payload, {
          headers,
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/companies`, payload, {
          headers,
        });
      }

      // 🔍 DEBUG: Log the response
      console.log("✅ Response:", response.data);

      profileExists.value = true;
      hasTriedFetching.value = true;

      // Update the auth store with the new data
      authStore.company = response.data;
      mapCompanyDataFromAuth(response.data);

      alert("Company profile updated successfully!");
      return response.data;
    } catch (err) {
      // 🔍 DEBUG: Log the full error
      console.error("❌ Full error:", err);
      console.error("❌ Error response:", err.response?.data);
      console.error("❌ Error status:", err.response?.status);
      console.error("❌ Error message:", err.response?.data?.message);

      if (err.response?.status === 401) {
        error.value = "Authentication failed. Please log in again.";
        authStore.logout();
      } else {
        error.value =
          err.response?.data?.message ||
          err.message ||
          "Failed to save company profile";
        alert("Error: " + error.value);
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const uploadLogo = async (file) => {
    try {
      loading.value = true;
      error.value = null;

      if (!file.type.startsWith("image/")) {
        throw new Error("Please select a valid image file");
      }

      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size exceeds 2MB limit");
      }

      const headers = getAuthHeaders();

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API_BASE_URL}/companies/media/logo`,
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        const logoUrl =
          response.data.url || response.data.brand_logo || response.data;
        companyData.value.logo = logoUrl;

        // Update the auth store as well
        if (authStore.company) {
          authStore.company.brand_logo = logoUrl;
        }

        alert("Logo uploaded successfully!");
        return response.data;
      }
    } catch (err) {
      error.value = err.message || "Failed to upload logo";
      alert("Error: " + error.value);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setLogoFromUrl = (imageUrl) => {
    try {
      new URL(imageUrl);
      companyData.value.logo = imageUrl;

      // Update the auth store as well
      if (authStore.company) {
        authStore.company.brand_logo = imageUrl;
      }

      alert("Logo updated successfully!");
    } catch (err) {
      alert("Invalid image URL provided");
      throw err;
    }
  };

  const removeLogo = () => {
    companyData.value.logo = "";

    // Update the auth store as well
    if (authStore.company) {
      authStore.company.brand_logo = "";
    }

    alert("Logo removed successfully!");
  };

  const resetProfile = () => {
    companyData.value = {
      name: "",
      hr_contact_name: "",
      hr_contact_email: "",
      logo: "",
      industry: "",
      size: "",
      foundedYear: null,
      website: "",
      linkedin: "",
      description: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    };
    profileExists.value = false;
    hasTriedFetching.value = false;
    error.value = null;
  };

  const isEmptyProfile = () => {
    return !profileExists.value && hasTriedFetching.value;
  };

  return {
    companyData,
    loading,
    error,
    profileExists,
    hasTriedFetching,
    fetchProfile,
    saveProfile,
    uploadLogo,
    setLogoFromUrl,
    removeLogo,
    resetProfile,
    isEmptyProfile,
  };
});
