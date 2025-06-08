import { ref } from "vue";
import { defineStore } from "pinia";

// Mock profile data
const mockProfiles = [
  {
    userId: 0,
    name: "Jake Gyll",
    title: "Product Designer",
    company: "Twitter",
    location: "Manchester, UK",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    about:
      "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
    email: "jakegyll@email.com",
    phone: "+44 1245 572 135",
    languages: ["English", "French"],
    socialLinks: [
      { platform: "Instagram", url: "instagram.com/jakegyll" },
      { platform: "Twitter", url: "twitter.com/jakegyll" },
      { platform: "Website", url: "www.jakegyll.com" },
    ],
    experiences: [
      {
        title: "Product Designer",
        company: "Twitter",
        type: "Full-Time",
        period: "Jun 2019 - Present (1y 1m)",
        location: "Manchester, UK",
        logo: "https://logo.clearbit.com/twitter.com",
        description:
          "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
      },
      {
        title: "Growth Marketing Designer",
        company: "GoDaddy",
        type: "Full-Time",
        period: "Jun 2011 - May 2019 (8y)",
        location: "Manchester, UK",
        logo: "https://logo.clearbit.com/godaddy.com",
        description:
          "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives",
      },
    ],
    moreExperiences: 3,
    education: [
      {
        id: 1,
        university: "Harvard University",
        degree: "Postgraduate degree, Applied Psychology",
        years: "2010 - 2012",
        logo: "https://logo.clearbit.com/harvard.edu",
        description:
          "As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.",
      },
      {
        id: 2,
        university: "University of Toronto",
        degree: "Bachelor of Arts, Visual Communication",
        years: "2005 - 2009",
        logo: "https://logo.clearbit.com/utoronto.ca",
        description: "",
      },
    ],
    moreEducation: 2,
    skills: [
      "Communication",
      "Analytics",
      "Facebook Ads",
      "Content Planning",
      "Community Manager",
    ],
    portfolios: [
      {
        title: "Clinically - clinic & health care website",
        image: "https://via.placeholder.com/150/e8e8ff/333333?text=Health",
      },
      {
        title: "Growthy - SaaS Analytics & Sales Website",
        image: "https://via.placeholder.com/150/d8d8ff/333333?text=SaaS",
      },
      {
        title: "Planna - Project Management App",
        image: "https://via.placeholder.com/150/c8c8ff/333333?text=PM",
      },
      {
        title: "Furnio - furniture ecommerce",
        image: "https://via.placeholder.com/150/b8b8ff/333333?text=Ecom",
      },
    ],
  },
  // Additional mock profile for testing multiple users
  {
    userId: 1,
    name: "Emma Watson",
    title: "UX Designer",
    company: "Google",
    location: "London, UK",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    about:
      "Passionate UX designer with a focus on creating user-centered digital experiences. Currently working at Google, I specialize in interaction design and usability testing.",
    email: "emma.watson@email.com",
    phone: "+44 9876 543 210",
    languages: ["English", "Spanish"],
    socialLinks: [
      { platform: "LinkedIn", url: "linkedin.com/in/emmawatson" },
      { platform: "Twitter", url: "twitter.com/emmawatson" },
    ],
    experiences: [
      {
        title: "UX Designer",
        company: "Google",
        type: "Full-Time",
        period: "Jan 2020 - Present (5y)",
        location: "London, UK",
        logo: "https://logo.clearbit.com/google.com",
        description:
          "Designed user interfaces for Google products, focusing on accessibility and user engagement.",
      },
    ],
    moreExperiences: 2,
    education: [
      {
        id: 1,
        university: "University College London",
        degree: "Master's in Human-Computer Interaction",
        years: "2016 - 2018",
        logo: "https://logo.clearbit.com/ucl.ac.uk",
        description: "Specialized in user experience and interface design.",
      },
    ],
    moreEducation: 1,
    skills: ["UX Design", "Figma", "User Research", "Prototyping"],
    portfolios: [
      {
        title: "HealthApp - Mobile Wellness Platform",
        image: "https://via.placeholder.com/150/e8e8ff/333333?text=HealthApp",
      },
    ],
  },
];

// Mock API functions
const mockApi = {
  getAllProfiles: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(mockProfiles)));
      }, 500); // Simulate network delay
    });
  },
  getProfileByUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const profile = mockProfiles.find((p) => p.userId === userId);
        if (profile) {
          resolve(JSON.parse(JSON.stringify(profile)));
        } else {
          reject(new Error("Profile not found"));
        }
      }, 500); // Simulate network delay
    });
  },
  updateProfile: async (userId, updatedProfile) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockProfiles.findIndex((p) => p.userId === userId);
        if (index !== -1) {
          mockProfiles[index] = { ...mockProfiles[index], ...updatedProfile };
          resolve(JSON.parse(JSON.stringify(mockProfiles[index])));
        } else {
          reject(new Error("Profile not found"));
        }
      }, 500); // Simulate network delay
    });
  },
};

// Pinia store for user profiles
export const useUserProfileStore = defineStore("userProfile", () => {
  // Reactive state
  const userProfiles = ref([]);
  const selectedProfile = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const defaultUserId = ref(0); // Default to first user

  // Fetch all profiles from mock API
  const fetchAllProfiles = async () => {
    loading.value = true;
    error.value = null;
    try {
      const profiles = await mockApi.getAllProfiles();
      userProfiles.value = profiles;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Fetch a single profile by userId from mock API
  const fetchProfileByUserId = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const profile = await mockApi.getProfileByUserId(userId);
      selectedProfile.value = profile;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Update profile
  const updateProfile = async (userId, updatedProfile) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await mockApi.updateProfile(userId, updatedProfile);
      selectedProfile.value = updated;
      const index = userProfiles.value.findIndex((p) => p.userId === userId);
      if (index !== -1) {
        userProfiles.value[index] = updated;
      }
      saveToLocalStorage();
      console.log("Updated profile:", updatedProfile);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Add education
  const addEducation = async (userId, educationData) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newEducation = [educationData, ...profile.education];
      const updatedProfile = { ...profile, education: newEducation };
      await updateProfile(userId, updatedProfile);
      console.log("Added education:", educationData);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Update education
  const updateEducation = async (userId, index, educationData) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newEducation = [...profile.education];
      newEducation[index] = educationData;
      const updatedProfile = { ...profile, education: newEducation };
      await updateProfile(userId, updatedProfile);
      console.log("Updated education at index", index, ":", educationData);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Delete education
  const deleteEducation = async (userId, index) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newEducation = profile.education.filter((_, i) => i !== index);
      const updatedProfile = { ...profile, education: newEducation };
      await updateProfile(userId, updatedProfile);
      console.log("Deleted education at index:", index);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Add skill
  const addSkill = async (userId, skill) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      if (!profile.skills.includes(skill)) {
        const newSkills = [...profile.skills, skill];
        const updatedProfile = { ...profile, skills: newSkills };
        await updateProfile(userId, updatedProfile);
        console.log("Added skill:", skill);
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Remove skill
  const removeSkill = async (userId, index) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newSkills = profile.skills.filter((_, i) => i !== index);
      const updatedProfile = { ...profile, skills: newSkills };
      await updateProfile(userId, updatedProfile);
      console.log("Removed skill at index:", index);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Add portfolio
  const addPortfolio = async (userId, portfolioData) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newPortfolios = [portfolioData, ...profile.portfolios];
      const updatedProfile = { ...profile, portfolios: newPortfolios };
      await updateProfile(userId, updatedProfile);
      console.log("Added portfolio:", portfolioData);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Edit portfolio
  const editPortfolio = async (userId, index, portfolioData) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newPortfolios = [...profile.portfolios];
      newPortfolios[index] = portfolioData;
      const updatedProfile = { ...profile, portfolios: newPortfolios };
      await updateProfile(userId, updatedProfile);
      console.log("Edited portfolio at index:", index);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Delete portfolio
  const deletePortfolio = async (userId, index) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newPortfolios = profile.portfolios.filter((_, i) => i !== index);
      const updatedProfile = { ...profile, portfolios: newPortfolios };
      await updateProfile(userId, updatedProfile);
      console.log("Deleted portfolio at index:", index);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Save social links
  const saveSocialLinks = async (userId, updatedLinks) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const updatedProfile = { ...profile, socialLinks: updatedLinks };
      await updateProfile(userId, updatedProfile);
      console.log("Saved social links:", updatedLinks);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Add experience
  const addExperience = async (userId, experienceData) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newExperiences = [experienceData, ...profile.experiences];
      const updatedProfile = { ...profile, experiences: newExperiences };
      await updateProfile(userId, updatedProfile);
      console.log("Added experience:", experienceData);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Update experience
  const updateExperience = async (userId, index, experienceData) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newExperiences = [...profile.experiences];
      newExperiences[index] = experienceData;
      const updatedProfile = { ...profile, experiences: newExperiences };
      await updateProfile(userId, updatedProfile);
      console.log("Updated experience at index", index, ":", experienceData);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Delete experience
  const deleteExperience = async (userId, index) => {
    loading.value = true;
    error.value = null;
    try {
      const profile =
        userProfiles.value.find((p) => p.userId === userId) ||
        selectedProfile.value;
      if (!profile) throw new Error("Profile not found");
      const newExperiences = profile.experiences.filter((_, i) => i !== index);
      const updatedProfile = { ...profile, experiences: newExperiences };
      await updateProfile(userId, updatedProfile);
      console.log("Deleted experience at index:", index);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Save to localStorage for persistence
  const saveToLocalStorage = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("userProfiles", JSON.stringify(userProfiles.value));
      if (selectedProfile.value) {
        localStorage.setItem(
          "selectedProfile",
          JSON.stringify(selectedProfile.value)
        );
      }
    }
  };

  // Load from localStorage
  const loadFromLocalStorage = () => {
    if (typeof localStorage !== "undefined") {
      const storedProfiles = localStorage.getItem("userProfiles");
      if (storedProfiles) {
        userProfiles.value = JSON.parse(storedProfiles);
      }
      const storedSelectedProfile = localStorage.getItem("selectedProfile");
      if (storedSelectedProfile) {
        selectedProfile.value = JSON.parse(storedSelectedProfile);
      }
    }
  };

  // Initialize the store
  const init = () => {
    loadFromLocalStorage();
    if (!userProfiles.value.length) {
      fetchAllProfiles();
    }
    if (!selectedProfile.value) {
      fetchProfileByUserId(defaultUserId.value);
    }
  };

  // Run initialization
  init();

  // Return reactive state and methods
  return {
    userProfiles,
    selectedProfile,
    loading,
    error,
    defaultUserId,
    fetchAllProfiles,
    fetchProfileByUserId,
    updateProfile,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    removeSkill,
    addPortfolio,
    editPortfolio,
    deletePortfolio,
    saveSocialLinks,
    addExperience,
    updateExperience,
    deleteExperience,
    saveToLocalStorage,
    loadFromLocalStorage,
    init,
  };
});
