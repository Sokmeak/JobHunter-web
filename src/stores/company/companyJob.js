// stores/company/companyJob.js - COMPLETE FINAL VERSION
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
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Success", { body: message, icon: "/favicon.ico" });
    }
  };

  const showError = (message) => {
    console.error("❌ Error:", message);
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
    console.log("🔑 Using token:", token ? "Present" : "Missing");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // Fetch all jobs for the company
  async function fetchJobs(page = 1, limit = 100) {
    try {
      loading.value = true;
      error.value = null;

      console.log("🔍 Fetching jobs from API...");

      const response = await axios.get(`${API_BASE_URL}/companies/jobs`, {
        headers: getAuthHeaders(),
        params: { page, limit },
      });

      console.log("📊 Jobs API response:", response.data);

      // Handle different response formats
      if (
        response.data &&
        response.data.jobs &&
        Array.isArray(response.data.jobs)
      ) {
        jobs.value = response.data.jobs;
        console.log(
          "✅ Jobs loaded from response.data.jobs:",
          jobs.value.length
        );
      } else if (Array.isArray(response.data)) {
        jobs.value = response.data;
        console.log("✅ Jobs loaded from direct array:", jobs.value.length);
      } else {
        console.warn("⚠️ Unexpected response format, setting empty array");
        jobs.value = [];
      }

      return { jobs: jobs.value, total: jobs.value.length };
    } catch (err) {
      console.error("❌ Error fetching jobs:", err);
      error.value = err.message || "Failed to load jobs";
      jobs.value = [];
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

      const backendJobData = transformToBackendFormat(jobData);
      console.log("🚀 Creating job with data:", backendJobData);

      const response = await axios.post(
        `${API_BASE_URL}/companies/jobs`,
        backendJobData,
        {
          headers: getAuthHeaders(),
        }
      );

      console.log("✅ Job created successfully:", response.data);

      // Add the new job to the local store immediately
      const newJob = response.data;
      jobs.value.unshift(newJob);

      showSuccess("Job created successfully!");
      return newJob;
    } catch (err) {
      console.error("❌ Error creating job:", err);
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
      console.log("📝 Updating job:", jobId, backendJobData);

      const response = await axios.put(
        `${API_BASE_URL}/companies/jobs/${jobId}`,
        backendJobData,
        {
          headers: getAuthHeaders(),
        }
      );

      // Update the job in local store
      const index = jobs.value.findIndex((job) => job.id === parseInt(jobId));
      if (index !== -1) {
        jobs.value[index] = response.data;
        console.log("✅ Job updated in local store");
      }

      showSuccess("Job updated successfully!");
      return response.data;
    } catch (err) {
      console.error("❌ Error updating job:", err);
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

      console.log("🗑️ Deleting job:", jobId);

      await axios.delete(`${API_BASE_URL}/companies/jobs/${jobId}`, {
        headers: getAuthHeaders(),
      });

      // Remove job from local store
      const index = jobs.value.findIndex((job) => job.id === parseInt(jobId));
      if (index !== -1) {
        jobs.value.splice(index, 1);
        console.log("✅ Job removed from local store");
      }

      showSuccess("Job deleted successfully!");
      return true;
    } catch (err) {
      console.error("❌ Error deleting job:", err);
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

      console.log("🔍 Fetching job by ID:", jobId);

      const response = await axios.get(
        `${API_BASE_URL}/companies/jobs/${jobId}`,
        {
          headers: getAuthHeaders(),
        }
      );

      currentJob.value = response.data;
      console.log("✅ Job fetched by ID:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Error fetching job:", err);
      error.value = "Failed to load job details";
      showError("Failed to load job details");
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Get job by ID from local store
  function getJobById_Local(jobId) {
    const job = jobs.value.find((job) => job.id === parseInt(jobId)) || null;
    console.log(
      "🔍 Getting job from local store:",
      jobId,
      job ? "Found" : "Not found"
    );
    return job;
  }

  // Duplicate a job
  async function duplicateJob(jobId) {
    try {
      console.log("📋 Duplicating job:", jobId);
      const originalJob = getJobById_Local(jobId) || (await getJobById(jobId));

      if (!originalJob) {
        throw new Error("Original job not found");
      }

      const duplicatedJobData = transformToFrontendFormat(originalJob);
      duplicatedJobData.title = `${originalJob.title} (Copy)`;
      duplicatedJobData.is_visible = false;
      delete duplicatedJobData.id;
      delete duplicatedJobData.created_at;
      delete duplicatedJobData.updated_at;

      return await createJob(duplicatedJobData);
    } catch (err) {
      console.error("❌ Error duplicating job:", err);
      showError("Failed to duplicate job");
      throw err;
    }
  }

  // Transform frontend job data to backend format
  function transformToBackendFormat(frontendData) {
    console.log(
      "🔄 Transforming frontend data to backend format:",
      frontendData
    );

    const transformed = {
      title: frontendData.title,
      description: frontendData.description || "",
      responsibility: Array.isArray(frontendData.responsibilities)
        ? frontendData.responsibilities.filter((r) => r && r.trim())
        : [],
      qualification:
        frontendData.education || frontendData.qualification || null,
      job_type: frontendData.jobType,
      skill_required: frontendData.category,
      salary_range: getSalaryRange(frontendData),
      level: frontendData.jobLevel || null,
      expired_date: frontendData.expireDate || null,
      who_you_are: Array.isArray(frontendData.whoYouAre)
        ? frontendData.whoYouAre.filter((q) => q && q.trim())
        : [],
      nice_to_haves: Array.isArray(frontendData.niceToHaves)
        ? frontendData.niceToHaves.filter((n) => n && n.trim())
        : [],
      tags: [frontendData.category, frontendData.jobLevel].filter(Boolean),
      perks_benefits: transformPerksAndBenefits(frontendData),
      is_visible: frontendData.is_visible !== false,
      location: frontendData.location || null,
      capacity: frontendData.capacity || null,
    };

    console.log("✅ Transformed data:", transformed);
    return transformed;
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

    if (Array.isArray(data.perks)) {
      data.perks.forEach((perk) => {
        if (perksMap[perk]) {
          result[perk.replace(/-/g, "_")] = perksMap[perk];
        }
      });
    }

    if (Array.isArray(data.benefits)) {
      data.benefits.forEach((benefit) => {
        if (benefitsMap[benefit]) {
          result[benefit.replace(/-/g, "_")] = benefitsMap[benefit];
        }
      });
    }

    return Object.keys(result).length > 0 ? result : null;
  }

  // Transform backend job data to frontend format
  function transformToFrontendFormat(backendJob) {
    console.log("🔄 Transforming backend data to frontend format:", backendJob);

    let salaryData = {
      salaryType: "",
      salaryMin: "",
      salaryMax: "",
      currency: "USD",
    };

    if (backendJob.salary_range) {
      const salaryRange = backendJob.salary_range;
      if (salaryRange.includes(" - ")) {
        salaryData.salaryType = "Range";
        const parts = salaryRange.split(" - ");
        salaryData.salaryMin = parts[0].replace(/[^\d]/g, "");
        salaryData.salaryMax = parts[1].replace(/[^\d]/g, "");
        salaryData.currency = parts[0].replace(/[\d\s-]/g, "");
      } else if (salaryRange.includes("+")) {
        salaryData.salaryType = "Starting Amount";
        salaryData.salaryMin = salaryRange.replace(/[^\d]/g, "");
        salaryData.currency = salaryRange.replace(/[\d\s+]/g, "");
      }
    }

    const transformed = {
      id: backendJob.id,
      title: backendJob.title || "",
      category: backendJob.skill_required || "",
      jobType: backendJob.job_type || "",
      ...salaryData,
      education: backendJob.qualification || "",
      experience: "",
      jobLevel: backendJob.level || "",
      expireDate: backendJob.expired_date || "",
      description: backendJob.description || "",
      responsibilities: backendJob.responsibility || [""],
      whoYouAre: backendJob.who_you_are || [""],
      niceToHaves: backendJob.nice_to_haves || [""],
      perks: [],
      benefits: [],
      is_visible: backendJob.is_visible !== false,
      location: backendJob.location || "",
      capacity: backendJob.capacity || "",
    };

    console.log("✅ Transformed frontend data:", transformed);
    return transformed;
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
