import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { parse, formatDistanceToNow, isValid } from "date-fns";

export const useUserProfileStore = defineStore("userProfile", () => {
  // Reactive state
  const selectedProfile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Validation utility functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const normalizeProfile = (profile) => {
    return {
      id: profile.id || 0,
      userId: profile.user_id || 0,
      name: profile.jobseeker_name?.trim() || "",
      email: profile.jobseeker_email?.trim() || "",
      profileImage: profile.profile_image?.trim() || "",
      headline: profile.headline?.trim() || "",
      bio: profile.bio?.trim() || "",
      currentStatus: profile.current_status?.trim() || "",
      preferredLocation: profile.preferred_location?.trim() || "",
      expectedSalary: Number.isFinite(profile.expected_salary)
        ? profile.expected_salary
        : 0,
      resumes: Array.isArray(profile.resumes) ? profile.resumes : [],
      applications: Array.isArray(profile.applications)
        ? profile.applications
        : [],
      savedJobs: Array.isArray(profile.savedJobs) ? profile.savedJobs : [],
      interviewPreference: profile.interviewPreference || null,
      educationHistory: Array.isArray(profile.educationHistory)
        ? profile.educationHistory.map((edu, index) => ({
            id: edu.id || Date.now() + index,
            university: edu.university?.trim() || "",
            degree: edu.degree?.trim() || "",
            years: edu.years?.trim() || "",
            description: edu.description?.trim() || "",
          }))
        : [],
      workExperience: Array.isArray(profile.workExperience)
        ? profile.workExperience.map((exp, index) => ({
            id: exp.id || Date.now() + index,
            title: exp.title?.trim() || "",
            company: exp.company?.trim() || "",
            type: exp.type?.trim() || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "Present",
            location: exp.location?.trim() || "",
            description: exp.description?.trim() || "",
          }))
        : [],
      skillTags: Array.isArray(profile.skillTags)
        ? profile.skillTags.map((skill) => skill.trim()).filter(Boolean)
        : [],
      interviewInvitations: Array.isArray(profile.interviewInvitations)
        ? profile.interviewInvitations
        : [],
      jobAlerts: Array.isArray(profile.jobAlerts) ? profile.jobAlerts : [],
      createdAt: profile.createdAt || null,
      updatedAt: profile.updatedAt || null,
      deletedAt: profile.deletedAt || null,
    };
  };

  // Actions
  async function fetchProfile() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        "http://localhost:3000/job-seekers/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response data", response.data);

      selectedProfile.value = normalizeProfile(response.data);
      console.log("Fetched job seeker profile:", selectedProfile.value.id);
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch profile";
      console.error("Fetch profile error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function updateProfile(updatedProfile) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return false;
    }

    loading.value = true;
    error.value = null;
    const normalizedProfile = normalizeProfile(updatedProfile);

    // Comprehensive validation
    if (!normalizedProfile.name) {
      error.value = "Name is required";
      loading.value = false;
      return false;
    }
    if (!validateEmail(normalizedProfile.email)) {
      error.value = "Valid email is required";
      loading.value = false;
      return false;
    }
    if (normalizedProfile.workExperience) {
      for (const exp of normalizedProfile.workExperience) {
        if (
          !isValid(parse(exp.startDate, "yyyy-MM-dd", new Date())) ||
          (exp.endDate !== "Present" &&
            !isValid(parse(exp.endDate, "yyyy-MM-dd", new Date())))
        ) {
          error.value = `Invalid date in experience: ${exp.title}`;
          loading.value = false;
          return false;
        }
        if (!exp.title || !exp.company) {
          error.value = `Experience missing title or company: ${
            exp.title || "Unknown"
          }`;
          loading.value = false;
          return false;
        }
      }
    }
    if (normalizedProfile.educationHistory) {
      for (const edu of normalizedProfile.educationHistory) {
        if (!edu.university || !edu.degree) {
          error.value = `Education missing university or degree: ${
            edu.degree || "Unknown"
          }`;
          loading.value = false;
          return false;
        }
      }
    }
    if (
      normalizedProfile.profileImage &&
      !validateUrl(normalizedProfile.profileImage)
    ) {
      error.value = "Invalid profile image URL";
      loading.value = false;
      return false;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/job-seekers/profile",
        normalizedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      selectedProfile.value = normalizeProfile(response.data);
      console.log("Updated job seeker profile:", selectedProfile.value.id);
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to update profile";
      console.error("Update profile error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  function computeExperienceDuration(startDate, endDate) {
    try {
      const start = parse(startDate, "yyyy-MM-dd", new Date());
      const end =
        endDate === "Present"
          ? new Date()
          : parse(endDate, "yyyy-MM-dd", new Date());
      if (!isValid(start) || !isValid(end)) {
        error.value = "Invalid date format";
        return "Unknown duration";
      }
      return formatDistanceToNow(start, { addSuffix: false });
    } catch (err) {
      error.value = "Error computing duration";
      console.error("Compute duration error:", err);
      return "Invalid date";
    }
  }

  // Initialize the store
  function init() {
    console.log("Initializing userProfile store...");
  }

  init();

  return {
    selectedProfile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    computeExperienceDuration,
    init,
  };
});
