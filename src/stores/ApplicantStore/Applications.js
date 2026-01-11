import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { parseISO, isWithinInterval } from "date-fns";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const subPrefixJobSeeker = "job-seekers";

const mockApi = {
  async getApplications() {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Raw /applications response:", response.data);
    return response.data;
  },
  async getApplicationById(id) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
  async updateApplication(id, updatedApplication) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.patch(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      updatedApplication,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
  async deleteApplication(id) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    await axios.delete(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  async applyForJob(applicationData) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No authentication token found");

    // const formData = new FormData();
    // Object.entries(applicationData).forEach(([key, value]) => {
    //   if (key === "resume" && value) {
    //     formData.append("resume", value);
    //   } else if (value !== undefined && value !== null) {
    //     formData.append(key, String(value)); // Convert to string
    //   }
    // });

    // console.log("FormData entries:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value instanceof File ? value.name : value}`);
    // }

    console.log("Application data before submission:", applicationData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/${subPrefixJobSeeker}/applications`,
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );
      console.log("Application submission response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Apply for job error:", error);
      console.error("Backend response:", error.response?.data);
      throw error;
    }
  },
};

export const useApplicationStore = defineStore("application", () => {
  const applications = ref([]);
  const selectedApplication = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const dateRange = ref({
    start: "2025-06-01",
    end: "2025-06-30",
  });

  const updateDateRange = (newDateRange) => {
    dateRange.value = { ...newDateRange };
    console.log("Updated date range:", dateRange.value);
  };

  const getApplicationsInDateRange = (startDate, endDate) => {
    try {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      console.log("Filtering applications from", start, "to", end);
      return applications.value.filter((app) => {
        const appDate = parseISO(app.createdAt);
        return isWithinInterval(appDate, { start, end });
      });
    } catch (err) {
      console.error("Error filtering applications by date range:", err);
      return applications.value;
    }
  };

  const getRecentApplications = (maxItems = 5) => {
    return applications.value
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
      submitted: "Submitted",
    };
    const mappedStatus = statusMap[status] || status;
    return applications.value.filter(
      (app) => app.status.toLowerCase() === mappedStatus.toLowerCase()
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
      submitted: 0,
      inReview: 0,
      interviewing: 0,
      shortlisted: 0,
      interviewed: 0,
      assessment: 0,
      offered: 0,
      hired: 0,
      declined: 0,
      unsuitable: 0,
      percentage: {
        submitted: 0,
        inReview: 0,
        interviewing: 0,
        shortlisted: 0,
        interviewed: 0,
        assessment: 0,
        offered: 0,
        hired: 0,
        declined: 0,
        unsuitable: 0,
      },
    };

    filteredApplications.forEach((app) => {
      const status = app.status?.toLowerCase() || "";
      if (status === "submitted") counts.submitted += 1;
      else if (status === "in review") counts.inReview += 1;
      else if (status === "interviewing") counts.interviewing += 1;
      else if (status === "shortlisted") counts.shortlisted += 1;
      else if (status === "interviewed") counts.interviewed += 1;
      else if (status === "assessment") counts.assessment += 1;
      else if (status === "offered") counts.offered += 1;
      else if (status === "hired") counts.hired += 1;
      else if (status === "declined") counts.declined += 1;
      else if (status === "unsuitable") counts.unsuitable += 1;
    });

    if (total > 0) {
      counts.percentage.submitted = Math.round(
        (counts.submitted / total) * 100
      );
      counts.percentage.inReview = Math.round((counts.inReview / total) * 100);
      counts.percentage.interviewing = Math.round(
        (counts.interviewing / total) * 100
      );
      counts.percentage.shortlisted = Math.round(
        (counts.shortlisted / total) * 100
      );
      counts.percentage.interviewed = Math.round(
        (counts.interviewed / total) * 100
      );
      counts.percentage.assessment = Math.round(
        (counts.assessment / total) * 100
      );
      counts.percentage.offered = Math.round((counts.offered / total) * 100);
      counts.percentage.hired = Math.round((counts.hired / total) * 100);
      counts.percentage.declined = Math.round((counts.declined / total) * 100);
      counts.percentage.unsuitable = Math.round(
        (counts.unsuitable / total) * 100
      );
    }

    console.log("Status counts:", counts);
    return counts;
  };

  const searchApplications = (query) => {
    if (!query.trim()) return applications.value;
    const searchTerm = query.toLowerCase();
    return applications.value.filter(
      (app) =>
        app.job?.CompanyName?.toLowerCase().includes(searchTerm) ||
        app.job?.title?.toLowerCase().includes(searchTerm) ||
        app.fullName?.toLowerCase().includes(searchTerm)
    );
  };

  const fetchApplications = async () => {
    loading.value = true;
    error.value = null;
    try {
      const apps = await mockApi.getApplications();
      applications.value = Array.isArray(apps) ? apps : [];
      console.log("Fetched applications:", applications.value);
    } catch (err) {
      error.value = err.message || "Failed to fetch applications";
      console.error("Fetch applications error:", err);
      applications.value = [];
    } finally {
      loading.value = false;
    }
  };

  const fetchApplication = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const app = await mockApi.getApplicationById(id);
      selectedApplication.value = app;
      console.log("Fetched application:", app);
    } catch (err) {
      error.value = err.message || "Failed to fetch application";
      console.error("Error fetching application:", err);
      selectedApplication.value = null;
    } finally {
      loading.value = false;
    }
  };

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
        if (selectedApplication.value?.id === id) {
          selectedApplication.value = updatedApp;
        }
      } else {
        throw new Error("Application not found");
      }
      console.log("Updated application:", updatedApp);
    } catch (err) {
      error.value = err.message || "Failed to update application";
      console.error("Update application error:", err);
    } finally {
      loading.value = false;
    }
  };

  const deleteApplication = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await mockApi.deleteApplication(id);
      applications.value = applications.value.filter((app) => app.id !== id);
      if (selectedApplication.value?.id === id) {
        selectedApplication.value = null;
      }
      console.log("Deleted application:", id);
    } catch (err) {
      error.value = err.message || "Failed to delete application";
      console.error("Delete application error:", err);
    } finally {
      loading.value = false;
    }
  };

  const applyForJob = async (applicationData) => {
    loading.value = true;
    error.value = null;
    try {
      const newApplication = await mockApi.applyForJob(applicationData);
      applications.value.push(newApplication);
      return newApplication;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        err.message ||
        "Failed to submit application";
      console.error("Apply for job error:", err);
      console.error("Backend response:", err.response?.data);
      throw err;
    } finally {
      loading.value = false;
    }
  };

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
    applyForJob,
  };
});
