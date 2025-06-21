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
      languages: Array.isArray(profile.languages) ? profile.languages : [],
      educationHistory: Array.isArray(profile.educationHistory)
        ? profile.educationHistory.map((edu, index) => ({
            id: Number(edu.id) || Date.now() + index,
            university: edu.university?.trim() || "",
            degree: edu.degree?.trim() || "",
            years: edu.years?.trim() || "",
            description: edu.description?.trim() || "",
          }))
        : [],
      workExperience: Array.isArray(profile.workExperience)
        ? profile.workExperience.map((exp, index) => ({
            id: Number(exp.id) || Date.now() + index,
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
        ? profile.skillTags.map((skill, index) => ({
            id: Number(skill.id) || Date.now() + index,
            skill: skill.skill?.trim() || "",
          }))
        : [],
      portfolios: Array.isArray(profile.portfolios)
        ? profile.portfolios.map((portfolio, index) => ({
            id: Number(portfolio.id) || Date.now() + index,
            title: portfolio.title?.trim() || "",
            url: portfolio.url?.trim() || "",
            description: portfolio.description?.trim() || "",
          }))
        : [],
      socialLinks: Array.isArray(profile.socialLinks)
        ? profile.socialLinks.map((link, index) => ({
            id: Number(link.id) || Date.now() + index,
            url: link.url?.trim() || "",
            platform: link.platform?.trim() || "",
          }))
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

  // Helper function for authenticated API calls
  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Actions
  async function fetchProfile() {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        "http://localhost:3000/job-seekers/profile",
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile(response.data || {});
      console.log("Fetched job seeker profile:", selectedProfile.value.id);
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch profile";
      console.error("Fetch profile error:", err);
      selectedProfile.value = normalizeProfile({});
    } finally {
      loading.value = false;
    }
  }

  async function updateProfile(updatedProfile) {
    loading.value = true;
    error.value = null;
    const normalizedProfile = normalizeProfile(updatedProfile || {});

    // Validation
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
          error.value = `Invalid date in experience: ${exp.title || "Unknown"}`;
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
      const response = await axios.patch(
        "http://localhost:3000/job-seekers/profile",
        normalizedProfile,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile(response.data || {});
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
    loading.value = true;
    error.value = null;
    try {
      if (!educationData?.university || !educationData?.degree) {
        throw new Error("University and degree are required");
      }
      const response = await axios.post(
        "http://localhost:3000/job-seekers/education-history",
        educationData,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        educationHistory: [
          ...(selectedProfile.value?.educationHistory || []),
          response.data,
        ],
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to add education";
      console.error("Add education error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function updateEducation(index, educationData) {
    loading.value = true;
    error.value = null;
    try {
      if (!educationData?.university || !educationData?.degree) {
        throw new Error("University and degree are required");
      }
      const educationId = Number(
        selectedProfile.value?.educationHistory[index]?.id
      );
      if (!educationId) {
        throw new Error("Invalid education entry");
      }
      const response = await axios.patch(
        `http://localhost:3000/job-seekers/education-history/${educationId}`,
        educationData,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        educationHistory: (selectedProfile.value?.educationHistory || []).map(
          (edu, i) => (i === index ? response.data : edu)
        ),
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to update education";
      console.error("Update education error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function deleteEducation(index) {
    loading.value = true;
    error.value = null;
    try {
      const educationId = Number(
        selectedProfile.value?.educationHistory[index]?.id
      );
      if (!educationId) {
        throw new Error("Invalid education entry");
      }
      await axios.delete(
        `http://localhost:3000/job-seekers/education-history/${educationId}`,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        educationHistory: (
          selectedProfile.value?.educationHistory || []
        ).filter((_, i) => i !== index),
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to delete education";
      console.error("Delete education error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function addSkill(skillData) {
    loading.value = true;
    error.value = null;
    try {
      if (!skillData?.skill?.trim()) {
        throw new Error("Skill is required");
      }
      const response = await axios.post(
        "http://localhost:3000/job-seekers/skill-tags",
        { skill: skillData.skill.trim() },
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        skillTags: [...(selectedProfile.value?.skillTags || []), response.data],
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to add skill";
      console.error("Add skill error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function removeSkill(index) {
    loading.value = true;
    error.value = null;
    try {
      const skillId = Number(selectedProfile.value?.skillTags[index]?.id);
      if (!skillId) {
        throw new Error("Invalid skill entry");
      }
      await axios.delete(
        `http://localhost:3000/job-seekers/skill-tags/${skillId}`,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        skillTags: (selectedProfile.value?.skillTags || []).filter(
          (_, i) => i !== index
        ),
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to remove skill";
      console.error("Remove skill error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function addPortfolio(portfolioData) {
    loading.value = true;
    error.value = null;
    try {
      if (!portfolioData?.title || !portfolioData?.url) {
        throw new Error("Portfolio title and URL are required");
      }
      if (!validateUrl(portfolioData.url)) {
        throw new Error("Invalid portfolio URL");
      }
      const response = await axios.post(
        "http://localhost:3000/job-seekers/portfolios",
        portfolioData,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        portfolios: [
          ...(selectedProfile.value?.portfolios || []),
          response.data,
        ],
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to add portfolio";
      console.error("Add portfolio error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function updatePortfolio(index, portfolioData) {
    loading.value = true;
    error.value = null;
    try {
      if (!portfolioData?.title || !portfolioData?.url) {
        throw new Error("Portfolio title and URL are required");
      }
      if (!validateUrl(portfolioData.url)) {
        throw new Error("Invalid portfolio URL");
      }
      const portfolioId = Number(selectedProfile.value?.portfolios[index]?.id);
      if (!portfolioId) {
        throw new Error("Invalid portfolio entry");
      }
      const response = await axios.patch(
        `http://localhost:3000/job-seekers/portfolios/${portfolioId}`,
        portfolioData,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        portfolios: (selectedProfile.value?.portfolios || []).map((port, i) =>
          i === index ? response.data : port
        ),
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to update portfolio";
      console.error("Update portfolio error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function deletePortfolio(index) {
    loading.value = true;
    error.value = null;
    try {
      const portfolioId = Number(selectedProfile.value?.portfolios[index]?.id);
      if (!portfolioId) {
        throw new Error("Invalid portfolio entry");
      }
      await axios.delete(
        `http://localhost:3000/job-seekers/portfolios/${portfolioId}`,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        portfolios: (selectedProfile.value?.portfolios || []).filter(
          (_, i) => i !== index
        ),
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to delete portfolio";
      console.error("Delete portfolio error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function saveSocialLinks(socialLinks) {
    loading.value = true;
    error.value = null;
    try {
      const validatedLinks = (socialLinks || []).filter(
        (link) => link.url && validateUrl(link.url)
      );
      if (!validatedLinks.length) {
        throw new Error("At least one valid URL is required");
      }
      const response = await axios.post(
        "http://localhost:3000/job-seekers/social-links",
        validatedLinks,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        socialLinks: response.data || [],
      });
      return true;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to save social links";
      console.error("Save social links error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function addExperience(experienceData) {
    loading.value = true;
    error.value = null;
    try {
      if (!experienceData?.title || !experienceData?.company) {
        throw new Error("Title and company are required");
      }
      if (
        !isValid(parse(experienceData.startDate, "yyyy-MM-dd", new Date())) ||
        (experienceData.endDate !== "Present" &&
          !isValid(parse(experienceData.endDate, "yyyy-MM-dd", new Date())))
      ) {
        throw new Error("Invalid date format");
      }
      const response = await axios.post(
        "http://localhost:3000/job-seekers/work-experience",
        experienceData,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        workExperience: [
          ...(selectedProfile.value?.workExperience || []),
          response.data,
        ],
      });
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to add experience";
      console.error("Add experience error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function updateExperience(index, experienceData) {
    loading.value = true;
    error.value = null;
    try {
      if (!experienceData?.title || !experienceData?.company) {
        throw new Error("Title and company are required");
      }
      if (
        !isValid(parse(experienceData.startDate, "yyyy-MM-dd", new Date())) ||
        (experienceData.endDate !== "Present" &&
          !isValid(parse(experienceData.endDate, "yyyy-MM-dd", new Date())))
      ) {
        throw new Error("Invalid date format");
      }
      const experienceId = Number(
        selectedProfile.value?.workExperience[index]?.id
      );
      if (!experienceId) {
        throw new Error("Invalid experience entry");
      }
      const response = await axios.patch(
        `http://localhost:3000/job-seekers/work-experience/${experienceId}`,
        experienceData,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        workExperience: (selectedProfile.value?.workExperience || []).map(
          (exp, i) => (i === index ? response.data : exp)
        ),
      });
      return true;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to update experience";
      console.error("Update experience error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function deleteExperience(index) {
    loading.value = true;
    error.value = null;
    try {
      const experienceId = Number(
        selectedProfile.value?.workExperience[index]?.id
      );
      if (!experienceId) {
        throw new Error("Invalid experience entry");
      }
      await axios.delete(
        `http://localhost:3000/job-seekers/work-experience/${experienceId}`,
        getAuthHeaders()
      );
      selectedProfile.value = normalizeProfile({
        ...selectedProfile.value,
        workExperience: (selectedProfile.value?.workExperience || []).filter(
          (_, i) => i !== index
        ),
      });
      return true;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to delete experience";
      console.error("Delete experience error:", err);
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
