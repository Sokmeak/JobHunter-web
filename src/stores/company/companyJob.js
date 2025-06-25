// stores/company/companyJob.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useCompanyJobStore = defineStore("companyJobStore", () => {
  const loading = ref(false);
  const jobs = ref([]);
  const currentJob = ref(null);
  const error = ref(null);

  // Simple notification functions
  const showSuccess = (message) => {
    console.log("✅ Success:", message);
    // You can replace this with any notification library you prefer
    // For now, we'll use browser notifications or simple alerts
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Success", { body: message, icon: "/favicon.ico" });
    }
  };

  const showError = (message) => {
    console.error("❌ Error:", message);
    // For errors, we might want to show an alert
    alert("Error: " + message);
  };

  // Computed properties
  const activeJobs = computed(() =>
    jobs.value.filter((job) => job.is_visible && job.status !== "Draft")
  );

  const draftJobs = computed(() =>
    jobs.value.filter((job) => job.status === "Draft" || !job.is_visible)
  );

  const totalJobs = computed(() => jobs.value.length);

  // API helper function
  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // Fetch all jobs for the company
  async function fetchJobs(page = 1, limit = 10) {
    try {
      loading.value = true;
      error.value = null;

      const response = await axios.get(`${API_BASE_URL}/companies/jobs`, {
        headers: getAuthHeaders(),
        params: { page, limit },
      });

      if (response.data && response.data.jobs) {
        jobs.value = response.data.jobs;
        console.log("Jobs fetched successfully:", jobs.value.length);
        return response.data;
      } else {
        console.warn("No jobs data in response");
        jobs.value = [];
        return { jobs: [], total: 0 };
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      error.value = err.message || "Failed to load jobs";
      showError("Failed to load jobs");
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Create a new job
  async function createJob(jobData) {
    try {
      loading.value = true;
      error.value = null;

      // Transform frontend data to backend format
      const backendJobData = transformToBackendFormat(jobData);

      console.log("Creating job with data:", backendJobData);

      const response = await axios.post(
        `${API_BASE_URL}/companies/jobs`,
        backendJobData,
        {
          headers: getAuthHeaders(),
        }
      );

      console.log("Job created successfully:", response.data);

      // Add the new job to the local store immediately
      const newJob = response.data;
      jobs.value.push(newJob);

      showSuccess("Job created successfully!");
      return newJob;
    } catch (err) {
      console.error("Error creating job:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to create job";
      error.value = errorMessage;
      showError(errorMessage);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Update an existing job
  async function updateJob(jobId, jobData) {
    try {
      loading.value = true;
      error.value = null;

      const backendJobData = transformToBackendFormat(jobData);

      const response = await axios.put(
        `${API_BASE_URL}/companies/jobs/${jobId}`,
        backendJobData,
        {
          headers: getAuthHeaders(),
        }
      );

      // Update the job in local store
      const index = jobs.value.findIndex((job) => job.id === jobId);
      if (index !== -1) {
        jobs.value[index] = response.data;
      }

      showSuccess("Job updated successfully!");
      return response.data;
    } catch (err) {
      console.error("Error updating job:", err);
      error.value = "Failed to update job";
      showError("Failed to update job");
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Delete a job
  async function deleteJob(jobId) {
    try {
      loading.value = true;
      error.value = null;

      await axios.delete(`${API_BASE_URL}/companies/jobs/${jobId}`, {
        headers: getAuthHeaders(),
      });

      // Remove job from local store
      const index = jobs.value.findIndex((job) => job.id === jobId);
      if (index !== -1) {
        jobs.value.splice(index, 1);
      }

      showSuccess("Job deleted successfully!");
    } catch (err) {
      console.error("Error deleting job:", err);
      error.value = "Failed to delete job";
      showError("Failed to delete job");
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Get a single job
  async function getJobById(jobId) {
    try {
      loading.value = true;
      error.value = null;

      const response = await axios.get(
        `${API_BASE_URL}/companies/jobs/${jobId}`,
        {
          headers: getAuthHeaders(),
        }
      );

      currentJob.value = response.data;
      return response.data;
    } catch (err) {
      console.error("Error fetching job:", err);
      error.value = "Failed to load job details";
      showError("Failed to load job details");
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Get job by ID from local store (for immediate access)
  function getJobById_Local(jobId) {
    return jobs.value.find((job) => job.id === parseInt(jobId)) || null;
  }

  // Duplicate a job
  async function duplicateJob(jobId) {
    try {
      const originalJob = getJobById_Local(jobId) || (await getJobById(jobId));

      const duplicatedJobData = {
        ...originalJob,
        title: `${originalJob.title} Cre(Copy)`,
        is_visible: false, // Start as draft
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      };

      return await createJob(duplicatedJobData);
    } catch (err) {
      showError("Failed to duplicate job");
      throw err;
    }
  }

  // Transform frontend job data to backend format
  function transformToBackendFormat(frontendData) {
    return {
      title: frontendData.title,
      description: frontendData.description,
      responsibility: Array.isArray(frontendData.responsibilities)
        ? frontendData.responsibilities.filter((r) => r && r.trim())
        : [],
      qualification: frontendData.education || frontendData.qualification,
      job_type: frontendData.jobType,
      skill_required: frontendData.category,
      salary_range: getSalaryRange(frontendData),
      level: frontendData.jobLevel,
      expired_date: frontendData.expireDate || null,
      who_you_are: Array.isArray(frontendData.whoYouAre)
        ? frontendData.whoYouAre.filter((q) => q && q.trim())
        : [],
      nice_to_haves: Array.isArray(frontendData.niceToHaves)
        ? frontendData.niceToHaves.filter((n) => n && n.trim())
        : [],
      tags: [frontendData.category, frontendData.jobLevel].filter(Boolean),
      perks_benefits: transformPerksAndBenefits(frontendData),
      is_visible: true, // Make job visible by default
    };
  }

  // Helper function to format salary range
  function getSalaryRange(data) {
    if (data.salaryType === "Range" && data.salaryMin && data.salaryMax) {
      return `${data.currency || "USD"} ${data.salaryMin} - ${data.salaryMax}`;
    } else if (data.salaryType === "Starting Amount" && data.salaryMin) {
      return `${data.currency || "USD"} ${data.salaryMin}+`;
    } else if (data.salaryType === "Maximum Amount" && data.salaryMax) {
      return `Up to ${data.currency || "USD"} ${data.salaryMax}`;
    } else if (data.salaryType === "Exact Amount" && data.salaryMin) {
      return `${data.currency || "USD"} ${data.salaryMin}`;
    }
    return null;
  }

  // Helper function to transform perks and benefits
  function transformPerksAndBenefits(data) {
    const perksMap = {
      "full-healthcare": "Comprehensive health coverage",
      "unlimited-vacation": "Unlimited vacation policy",
      "skill-development": "Professional development budget",
      "team-summits": "Annual team retreats",
      "remote-working": "Remote work options",
      "commuter-benefits": "Commuter benefits",
      "we-give-back": "Community giving program",
      "free-gym": "Gym membership",
    };

    const benefitsMap = {
      "health-insurance": "Health insurance",
      "dental-insurance": "Dental insurance",
      "vision-insurance": "Vision insurance",
      "life-insurance": "Life insurance",
      "paid-time-off": "Paid time off",
      "retirement-plan": "401(k) retirement plan",
      "flexible-schedule": "Flexible working hours",
      "professional-development": "Professional development opportunities",
    };

    const result = {};

    // Add selected perks
    if (Array.isArray(data.perks)) {
      data.perks.forEach((perk) => {
        if (perksMap[perk]) {
          result[perk.replace(/-/g, "_")] = perksMap[perk];
        }
      });
    }

    // Add selected benefits
    if (Array.isArray(data.benefits)) {
      data.benefits.forEach((benefit) => {
        if (benefitsMap[benefit]) {
          result[benefit.replace(/-/g, "_")] = benefitsMap[benefit];
        }
      });
    }

    return Object.keys(result).length > 0 ? result : null;
  }

  // Transform backend job data to frontend format (for editing)
  function transformToFrontendFormat(backendJob) {
    return {
      id: backendJob.id,
      title: backendJob.title || "",
      category: backendJob.skill_required || "",
      jobType: backendJob.job_type || "",
      salaryType: "Range", // Default
      salaryMin: "",
      salaryMax: "",
      currency: "$",
      education: backendJob.qualification || "",
      experience: "",
      jobLevel: backendJob.level || "",
      expireDate: backendJob.expired_date || "",
      description: backendJob.description || "",
      responsibilities: backendJob.responsibility || [],
      whoYouAre: backendJob.who_you_are || [],
      niceToHaves: backendJob.nice_to_haves || [],
      perks: [], // Would need to reverse engineer from perks_benefits
      benefits: [],
      status: backendJob.is_visible ? "Live" : "Draft",
    };
  }

  return {
    // State
    loading,
    jobs,
    currentJob,
    error,

    // Computed
    activeJobs,
    draftJobs,
    totalJobs,

    // Actions
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
    getJobById_Local,
    duplicateJob,
    transformToFrontendFormat,

    // Utils
    transformToBackendFormat,
  };
});
