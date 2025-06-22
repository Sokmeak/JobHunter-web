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
      email: profile.jobseeker_email?.trim() || profile.email?.trim() || "",
      phone: profile.phone?.trim() || "",
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
      portfolios: Array.isArray(profile.portfolios)
        ? profile.portfolios.map((portfolio, index) => ({
            id: portfolio.id || Date.now() + index,
            title: portfolio.title?.trim() || "",
            url: portfolio.url?.trim() || "",
            description: portfolio.description?.trim() || "",
          }))
        : [],
      socialLinks: Array.isArray(profile.socialLinks)
        ? profile.socialLinks.map((link) => ({
            platform: link.platform?.trim() || "",
            url: link.url?.trim() || "",
          }))
        : [],
      languages: Array.isArray(profile.languages)
        ? profile.languages.map((lang) => (lang.trim ? lang.trim() : lang))
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
    const normalizedProfile = normalizeProfile({
      ...selectedProfile.value,
      ...updatedProfile,
    });

    // Validation for profile fields
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
    if (
      normalizedProfile.profileImage &&
      !validateUrl(normalizedProfile.profileImage)
    ) {
      error.value = "Invalid profile image URL";
      loading.value = false;
      return false;
    }
    if (normalizedProfile.portfolios) {
      for (const portfolio of normalizedProfile.portfolios) {
        if (portfolio.url && !validateUrl(portfolio.url)) {
          error.value = `Invalid portfolio URL: ${
            portfolio.title || "Unknown"
          }`;
          loading.value = false;
          return false;
        }
      }
    }
    if (normalizedProfile.socialLinks) {
      for (const link of normalizedProfile.socialLinks) {
        if (link.url && !validateUrl(link.url)) {
          error.value = `Invalid social link URL for ${
            link.platform || "Unknown"
          }`;
          loading.value = false;
          return false;
        }
      }
    }

    try {
      const response = await axios.patch(
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

  async function addEducation(educationData) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(
        "http://localhost:3000/job-seekers/education-history",
        educationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        educationHistory: [
          ...selectedProfile.value.educationHistory,
          response.data,
        ],
      });
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to add education";
      console.error("Add education error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function updateEducation(educationId, educationData) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const response = await axios.patch(
        `http://localhost:3000/job-seekers/education-history/${educationId}`,
        educationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedHistory = selectedProfile.value.educationHistory.map((edu) =>
        edu.id === educationId ? { ...edu, ...response.data } : edu
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        educationHistory: updatedHistory,
      });
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to update education";
      console.error("Update education error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function deleteEducation(educationId) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      await axios.delete(
        `http://localhost:3000/job-seekers/education-history/${educationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedHistory = selectedProfile.value.educationHistory.filter(
        (edu) => edu.id !== educationId
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        educationHistory: updatedHistory,
      });
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to delete education";
      console.error("Delete education error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function addSkill(skill) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const skillData = { skill: skill.skill || skill };
      const response = await axios.post(
        "http://localhost:3000/job-seekers/skill-tags",
        skillData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        skillTags: [...selectedProfile.value.skillTags, response.data.skill],
      });
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to add skill";
      console.error("Add skill error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function removeSkill(skillId) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      await axios.delete(
        `http://localhost:3000/job-seekers/skill-tags/${skillId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedSkills = selectedProfile.value.skillTags.filter(
        (_, i) => selectedProfile.value.skillTags[i].id !== skillId
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        skillTags: updatedSkills,
      });
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to remove skill";
      console.error("Remove skill error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function addPortfolio(portfolioData) {
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }
    const newPortfolio = {
      id: Date.now(),
      title: portfolioData.title || "",
      url: portfolioData.url || "",
      description: portfolioData.description || "",
    };
    const updatedProfile = {
      portfolios: [...selectedProfile.value.portfolios, newPortfolio],
    };
    await updateProfile(updatedProfile);
  }

  async function updatePortfolio(portfolioId, portfolioData) {
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }
    const updatedPortfolio = {
      id: portfolioId,
      title: portfolioData.title || "",
      url: portfolioData.url || "",
      description: portfolioData.description || "",
    };
    const updatedPortfolios = selectedProfile.value.portfolios.map(
      (portfolio) =>
        portfolio.id === portfolioId ? updatedPortfolio : portfolio
    );
    await updateProfile({ portfolios: updatedPortfolios });
  }

  async function deletePortfolio(portfolioId) {
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }
    const updatedPortfolios = selectedProfile.value.portfolios.filter(
      (portfolio) => portfolio.id !== portfolioId
    );
    await updateProfile({ portfolios: updatedPortfolios });
  }

  async function saveSocialLinks(socialLinks) {
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }
    await updateProfile({ socialLinks });
  }

  async function addExperience(experienceData) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(
        "http://localhost:3000/job-seekers/work-experience",
        experienceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        workExperience: [
          ...selectedProfile.value.workExperience,
          response.data,
        ],
      });
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to add experience";
      console.error("Add experience error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function updateExperience(experienceId, experienceData) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const response = await axios.patch(
        `http://localhost:3000/job-seekers/work-experience/${experienceId}`,
        experienceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedExperiences = selectedProfile.value.workExperience.map(
        (exp) => (exp.id === experienceId ? { ...exp, ...response.data } : exp)
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        workExperience: updatedExperiences,
      });
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to update experience";
      console.error("Update experience error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function deleteExperience(experienceId) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "No authentication token found";
      return;
    }
    if (!selectedProfile.value) {
      error.value = "No profile loaded";
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      await axios.delete(
        `http://localhost:3000/job-seekers/work-experience/${experienceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedExperiences = selectedProfile.value.workExperience.filter(
        (exp) => exp.id !== experienceId
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        workExperience: updatedExperiences,
      });
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to delete experience";
      console.error("Delete experience error:", err);
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
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    removeSkill,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    saveSocialLinks,
    addExperience,
    updateExperience,
    deleteExperience,
    computeExperienceDuration,
    init,
  };
});
