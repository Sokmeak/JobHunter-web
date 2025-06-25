import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

// Ensure the API base URL is set in your environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const subPrefixJobSeeker = "job-seekers";

// Mock API functions
const mockApi = {
  async getApplications() {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Raw /applications response:", response.data);

    return response.data; // Returns array of applications
  },
  async getApplicationById(id) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns single application
  },
  async updateApplication(id, updatedApplication) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.patch(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      updatedApplication,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns updated application
  },
  async deleteApplication(id) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    await axios.delete(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

// Pinia store for applications
export const useApplicationStore = defineStore("application", () => {
  // Reactive state
  const applications = ref([]);
  const selectedApplication = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const dateRange = ref({
    start: "15 May 2025",
    end: "30 May 2025",
  });

  // Function to update date range
  const updateDateRange = (newDateRange) => {
    dateRange.value.start = newDateRange.start;
    dateRange.value.end = newDateRange.end;
  };

  // Function to get applications within date range
  const getApplicationsInDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return applications.value.filter((app) => {
      const appDate = new Date(app.dateApplied);
      return appDate >= start && appDate <= end;
    });
  };

  // Utility functions for data manipulation
  const getRecentApplications = (maxItems = 5) => {
    return applications.value
      .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
      .slice(0, maxItems);
  };

  const getApplicationsByStatus = (status) => {
    if (status === "all") return applications.value;
    const statusMap = {
      "in-review": "In Review",
      interviewing: "Interviewing",
      assessment: "Assessment",
      offered: "Offered",
      hired: "Hired",
      unsuitable: "Unsuitable",
      declined: "Declined",
      shortlisted: "Shortlisted",
      interviewed: "Interviewed",
    };
    return applications.value.filter(
      (app) =>
        app.status === statusMap[status] ||
        app.status.toLowerCase() === status.toLowerCase()
    );
  };

  const getStatusCounts = () => {
    const filteredApplications = getApplicationsInDateRange(
      dateRange.value.start,
      dateRange.value.end
    );
    const total = filteredApplications.length;
    const counts = {
      all: total,
      hired: 0,
      interviewed: 0,
      percentage: {
        hired: 0,
        interviewed: 0,
      },
    };

    filteredApplications.forEach((app) => {
      const status = app.status.toLowerCase();
      if (status === "hired") counts.hired += 1;
      else if (status === "interviewed") counts.interviewed += 1;
    });

    if (total > 0) {
      counts.percentage.hired = Math.round((counts.hired / total) * 100);
      counts.percentage.interviewed = Math.round(
        (counts.interviewed / total) * 100
      );
    }

    return counts;
  };

  const searchApplications = (query) => {
    if (!query.trim()) return applications.value;
    const searchTerm = query.toLowerCase();
    return applications.value.filter(
      (app) =>
        app.companyName.toLowerCase().includes(searchTerm) ||
        app.role.toLowerCase().includes(searchTerm) ||
        app.jobTitle.toLowerCase().includes(searchTerm)
    );
  };

  // Fetch all applications
  const fetchApplications = async () => {
    loading.value = true;
    error.value = null;
    try {
      const apps = await mockApi.getApplications();
      applications.value = Array.isArray(apps) ? apps : [];
    } catch (err) {
      error.value = err.message || "Failed to fetch applications";
      console.error("Fetch applications error:", err);
      applications.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Fetch a single application by ID
  const fetchApplication = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const app = await mockApi.getApplicationById(id);
      selectedApplication.value = app;
    } catch (err) {
      error.value = err.message || "Failed to fetch application";
      console.error("Error fetching application:", err);
      selectedApplication.value = null;
    } finally {
      loading.value = false;
    }
  };

  // Update an application
  const updateApplication = async (id, updatedApplication) => {
    loading.value = true;
    error.value = null;
    try {
      const updatedApp = await mockApi.updateApplication(
        id,
        updatedApplication
      );
      const index = applications.value.findIndex((app) => app.id === id);
      if (index !== -1) {
        applications.value[index] = updatedApp;
        if (selectedApplication.value && selectedApplication.value.id === id) {
          selectedApplication.value = updatedApp;
        }
      } else {
        throw new Error("Application not found");
      }
    } catch (err) {
      error.value = err.message || "Failed to update application";
      console.error("Update application error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Delete an application
  const deleteApplication = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await mockApi.deleteApplication(id);
      const index = applications.value.findIndex((app) => app.id === id);
      if (index !== -1) {
        applications.value.splice(index, 1);
        if (selectedApplication.value && selectedApplication.value.id === id) {
          selectedApplication.value = null;
        }
      } else {
        throw new Error("Application not found");
      }
    } catch (err) {
      error.value = err.message || "Failed to delete application";
      console.error("Delete application error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Initialize the store
  const init = () => {
    console.log("Initializing application store...");
    fetchApplications();
  };

  // Run initialization
  init();

  // Return reactive state and methods
  return {
    applications,
    selectedApplication,
    loading,
    error,
    dateRange,
    updateDateRange,
    getApplicationsInDateRange,
    getRecentApplications,
    getApplicationsByStatus,
    getStatusCounts,
    searchApplications,
    fetchApplications,
    fetchApplication,
    updateApplication,
    deleteApplication,
    init,
  };
});
