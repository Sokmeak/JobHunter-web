import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { parse, formatDistanceToNow, isValid } from "date-fns";


const mockUserProfiles = [
  {
    userId: 0,
    name: "Jake Gyll",
    title: "Product Designer",
    company: "Twitter",
    location: "Manchester, UK",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    banner: null,
    bannerGradient:
      "linear-gradient(90deg, #ffd1dc 0%, #c995c0 50%, #6b4887 100%)",
    about:
      "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
    email: "jakegyll@email.com",
    phone: "+44 1245 572 135",
    languages: ["English", "French"],
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/jakegyll" },
      { platform: "Twitter", url: "https://twitter.com/jakegyll" },
      { platform: "Website", url: "https://www.jakegyll.com" },
    ],
    openToOpportunities: true,
    experiences: [
      {
        id: 1,
        title: "Product Designer",
        company: "Twitter",
        type: "Full-Time",
        startDate: "2019-06-01",
        endDate: "Present",
        location: "Manchester, UK",
        logo: "https://logo.clearbit.com/twitter.com",
        description:
          "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
      },
      {
        id: 2,
        title: "Growth Marketing Designer",
        company: "GoDaddy",
        type: "Full-Time",
        startDate: "2011-06-01",
        endDate: "2019-05-31",
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
        id: 1,
        title: "Clinically - clinic & health care website",
        image: "https://via.placeholder.com/150/e8e8ff/333333?text=Health",
      },
      {
        id: 2,
        title: "Growthy - SaaS Analytics & Sales Website",
        image: "https://via.placeholder.com/150/d8d8ff/333333?text=SaaS",
      },
      {
        id: 3,
        title: "Planna - Project Management App",
        image: "https://via.placeholder.com/150/c8c8ff/333333?text=PM",
      },
      {
        id: 4,
        title: "Furnio - furniture ecommerce",
        image: "https://via.placeholder.com/150/b8b8ff/333333?text=Ecom",
      },
    ],
  },
  {
    userId: 1,
    name: "Emma Stone",
    title: "Software Engineer",
    company: "Google",
    location: "London, UK",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    banner: null,
    bannerGradient: "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",
    about:
      "Passionate software engineer with a focus on building scalable web applications. Currently working at Google to enhance search functionalities and improve user experience.\n\nSkilled in full-stack development, cloud computing, and DevOps practices.",
    email: "emmastone@email.com",
    phone: "+44 207 555 9876",
    languages: ["English", "Spanish"],
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/emmastone" },
      { platform: "GitHub", url: "https://github.com/emmastone" },
      { platform: "Website", url: "https://www.emmastone.dev" },
    ],
    openToOpportunities: false,
    experiences: [
      {
        id: 1,
        title: "Software Engineer",
        company: "Google",
        type: "Full-Time",
        startDate: "2020-03-01",
        endDate: "Present",
        location: "London, UK",
        logo: "https://logo.clearbit.com/google.com",
        description:
          "Developed and optimized search algorithms, improving response time by 20% and user satisfaction scores.",
      },
      {
        id: 2,
        title: "Junior Developer",
        company: "Microsoft",
        type: "Full-Time",
        startDate: "2017-01-01",
        endDate: "2020-02-29",
        location: "London, UK",
        logo: "https://logo.clearbit.com/microsoft.com",
        description:
          "Contributed to Azure cloud platform, automating deployment pipelines for enterprise clients.",
      },
    ],
    moreExperiences: 2,
    education: [
      {
        id: 1,
        university: "Imperial College London",
        degree: "Master of Science, Computer Science",
        years: "2015 - 2016",
        logo: "https://logo.clearbit.com/imperial.ac.uk",
        description:
          "Focused on distributed systems and machine learning applications.",
      },
      {
        id: 2,
        university: "University of Oxford",
        degree: "Bachelor of Science, Software Engineering",
        years: "2011 - 2015",
        logo: "https://logo.clearbit.com/ox.ac.uk",
        description: "",
      },
    ],
    moreEducation: 1,
    skills: ["JavaScript", "Python", "Cloud Computing", "CI/CD", "React"],
    portfolios: [
      {
        id: 1,
        title: "SearchOptix - Search Engine Tool",
        image: "https://via.placeholder.com/150/e8e8ff/333333?text=Search",
      },
      {
        id: 2,
        title: "CloudSync - Cloud Management App",
        image: "https://via.placeholder.com/150/d8d8ff/333333?text=Cloud",
      },
    ],
  },
  {
    userId: 2,
    name: "Liam Chen",
    title: "Data Scientist",
    company: "Meta",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    banner: null,
    bannerGradient: "linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)",
    about:
      "Data scientist with expertise in machine learning and data visualization. Working at Meta to analyze user behavior and optimize ad targeting.\n\nLove turning raw data into actionable insights for business growth.",
    email: "liamchen@email.com",
    phone: "+1 415 555 1234",
    languages: ["English", "Mandarin"],
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/liamchen" },
      { platform: "Twitter", url: "https://twitter.com/liamchen" },
      { platform: "Website", url: "https://www.liamchenanalytics.com" },
    ],
    openToOpportunities: true,
    experiences: [
      {
        id: 1,
        title: "Data Scientist",
        company: "Meta",
        type: "Full-Time",
        startDate: "2021-08-01",
        endDate: "Present",
        location: "San Francisco, CA",
        logo: "https://logo.clearbit.com/meta.com",
        description:
          "Built ML models to enhance ad targeting, increasing click-through rates by 15%.",
      },
      {
        id: 2,
        title: "Data Analyst",
        company: "Amazon",
        type: "Full-Time",
        startDate: "2018-05-01",
        endDate: "2021-07-31",
        location: "Seattle, WA",
        logo: "https://logo.clearbit.com/amazon.com",
        description:
          "Analyzed customer purchase data to recommend product improvements.",
      },
    ],
    moreExperiences: 1,
    education: [
      {
        id: 1,
        university: "Stanford University",
        degree: "Master of Science, Data Science",
        years: "2016 - 2018",
        logo: "https://logo.clearbit.com/stanford.edu",
        description:
          "Specialized in statistical modeling and big data technologies.",
      },
      {
        id: 2,
        university: "UC Berkeley",
        degree: "Bachelor of Science, Statistics",
        years: "2012 - 2016",
        logo: "https://logo.clearbit.com/berkeley.edu",
        description: "",
      },
    ],
    moreEducation: false,
    skills: ["Python", "JavaScript", "Machine Learning", "SQL", "Tableau"],
    portfolios: [
      {
        id: 1,
        title: "AdVision - Ad Targeting Model",
        image: "https://via.placeholder.com/150/e8e8ff/333333?text=Ads",
      },
      {
        id: 2,
        title: "DataViz - Interactive Dashboard",
        image: "https://via.placeholder.com/150/d8d8ff/333333?text=Data",
      },
    ],
  },
];

// Mock API functions with retry logic
const mockApi = {
  getAllProfiles: async (retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              typeof structuredClone === "function"
                ? structuredClone(mockUserProfiles)
                : JSON.parse(JSON.stringify(mockUserProfiles))
            );
          }, 500);
        });
      } catch (err) {
        if (attempt === retries)
          throw new Error("Failed to fetch all profiles");
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  },
  getProfileByUserId: async (userId, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            const profile = mockUserProfiles.find((p) => p.userId === userId);
            if (profile) {
              resolve(
                typeof structuredClone === "function"
                  ? structuredClone(profile)
                  : JSON.parse(JSON.stringify(profile))
              );
            } else {
              reject(new Error("User profile not found"));
            }
          }, 500);
        });
      } catch (err) {
        if (attempt === retries) throw err;
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  },
};

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
    ...profile,
    name: profile.name?.trim() || "",
    email: profile.email?.trim() || "",
    title: profile.title?.trim() || "",
    company: profile.company?.trim() || "",
    location: profile.location?.trim() || "",
    about: profile.about?.trim() || "",
    phone: profile.phone?.trim() || "",
    languages: Array.isArray(profile.languages)
      ? profile.languages.map((lang) => lang.trim()).filter(Boolean)
      : [],
    socialLinks: Array.isArray(profile.socialLinks)
      ? profile.socialLinks
          .map((link) => ({
            platform: link.platform?.trim() || "",
            url: link.url?.trim() || "",
          }))
          .filter((link) => link.platform && validateUrl(link.url))
      : [],
    openToOpportunities: Boolean(profile.openToOpportunities),
    experiences: Array.isArray(profile.experiences)
      ? profile.experiences.map((exp, index) => ({
          id: exp.id || Date.now() + index,
          title: exp.title?.trim() || "",
          company: exp.company?.trim() || "",
          type: exp.type?.trim() || "",
          startDate: exp.startDate || "",
          endDate: exp.endDate || "Present",
          location: exp.location?.trim() || "",
          logo: exp.logo?.trim() || "",
          description: exp.description?.trim() || "",
        }))
      : [],
    moreExperiences: Number.isInteger(profile.moreExperiences)
      ? profile.moreExperiences
      : 0,
    education: Array.isArray(profile.education)
      ? profile.education.map((edu, index) => ({
          id: edu.id || Date.now() + index,
          university: edu.university?.trim() || "",
          degree: edu.degree?.trim() || "",
          years: edu.years?.trim() || "",
          logo: edu.logo?.trim() || "",
          description: edu.description?.trim() || "",
        }))
      : [],
    moreEducation: Number.isInteger(profile.moreEducation)
      ? profile.moreEducation
      : false,
    skills: Array.isArray(profile.skills)
      ? profile.skills.map((skill) => skill.trim()).filter(Boolean)
      : [],
    portfolios: Array.isArray(profile.portfolios)
      ? profile.portfolios.map((port, index) => ({
          id: port.id || Date.now() + index,
          title: port.title?.trim() || "",
          image: port.image?.trim() || "",
        }))
      : [],
  };
};

// Pinia store for user profiles
export const useUserProfileStore = defineStore("userProfile", () => {
  // Reactive state
  const userProfiles = ref([]);
  const selectedProfile = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const defaultUserId = ref(0);
  const storageVersion = ref("1.0.0"); // Version for localStorage data

  // Fetch all profiles from mock API
  const fetchAllProfiles = async () => {
    loading.value = true;
    error.value = null;
    try {
      const profiles = await mockApi.getAllProfiles();
      userProfiles.value = profiles.map(normalizeProfile);
      console.log("Fetched all profiles:", userProfiles.value.length);
    } catch (err) {
      error.value = err.message || "Failed to fetch profiles";
      console.error("Fetch all profiles error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Fetch a single profile by userId from mock API
  const fetchProfileByUserId = async (userId) => {
    if (!Number.isInteger(userId)) {
      error.value = "Invalid user ID";
      return;
    }
    loading.value = true;
    error.value = null;
    try {
      const profile = await mockApi.getProfileByUserId(userId);
      selectedProfile.value = normalizeProfile(profile);
      console.log("Fetched profile for userId:", userId);
    } catch (err) {
      error.value = err.message || "Failed to fetch profile";
      console.error("Fetch profile error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Update a user profile with enhanced validation and optimistic updates
  const updateUserProfile = async (userId, updatedProfile, retries = 3) => {
    if (!Number.isInteger(userId)) {
      error.value = "Invalid user ID";
      return false;
    }
    loading.value = true;
    error.value = null;

    // Normalize and validate input
    const normalizedProfile = normalizeProfile(updatedProfile);

    // Comprehensive validation
    if (!normalizedProfile.name) {
      error.value = "User name is required";
      loading.value = false;
      return false;
    }
    if (!validateEmail(normalizedProfile.email)) {
      error.value = "Valid email is required";
      loading.value = false;
      return false;
    }
    if (normalizedProfile.experiences) {
      for (const exp of normalizedProfile.experiences) {
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
    if (normalizedProfile.education) {
      for (const edu of normalizedProfile.education) {
        if (!edu.university || !edu.degree) {
          error.value = `Education missing university or degree: ${
            edu.degree || "Unknown"
          }`;
          loading.value = false;
          return false;
        }
      }
    }
    if (normalizedProfile.socialLinks) {
      for (const link of normalizedProfile.socialLinks) {
        if (!link.platform || !validateUrl(link.url)) {
          error.value = `Invalid social link: ${link.platform || "Unknown"}`;
          loading.value = false;
          return false;
        }
      }
    }
    if (normalizedProfile.portfolios) {
      for (const port of normalizedProfile.portfolios) {
        if (!port.title || !validateUrl(port.image)) {
          error.value = `Invalid portfolio: ${port.title || "Unknown"}`;
          loading.value = false;
          return false;
        }
      }
    }

    // Optimistic update
    const index = mockUserProfiles.findIndex((p) => p.userId === userId);
    if (index === -1) {
      error.value = "User profile not found";
      loading.value = false;
      return false;
    }
    const originalProfile = { ...mockUserProfiles[index] };
    mockUserProfiles[index] = {
      ...originalProfile,
      ...normalizedProfile,
      userId,
    };
    if (selectedProfile.value?.userId === userId) {
      selectedProfile.value = {
        ...selectedProfile.value,
        ...normalizedProfile,
        userId,
      };
    }
    userProfiles.value = [...mockUserProfiles];

    // Simulate async update with retries
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        saveToLocalStorage();
        console.log("Updated profile for userId:", userId, normalizedProfile);
        loading.value = false;
        return true;
      } catch (err) {
        console.error(`Update attempt ${attempt} failed:`, err);
        if (attempt === retries) {
          // Revert optimistic update on final failure
          mockUserProfiles[index] = originalProfile;
          if (selectedProfile.value?.userId === userId) {
            selectedProfile.value = originalProfile;
          }
          userProfiles.value = [...mockUserProfiles];
          error.value = err.message || "Failed to update profile";
          loading.value = false;
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  };

  // Delete a user profile
  const deleteUserProfile = async (userId) => {
    if (!Number.isInteger(userId)) {
      error.value = "Invalid user ID";
      return false;
    }
    loading.value = true;
    error.value = null;
    try {
      const index = mockUserProfiles.findIndex((p) => p.userId === userId);
      if (index === -1) {
        throw new Error("Profile not found");
      }
      if (userId === defaultUserId.value) {
        throw new Error("Cannot delete the default user");
      }
      const deletedProfile = mockUserProfiles.splice(index, 1)[0];
      if (selectedProfile.value?.userId === userId) {
        selectedProfile.value = null;
      }
      userProfiles.value = [...mockUserProfiles];
      saveToLocalStorage();
      console.log("Deleted profile for userId:", userId);
      return true;
    } catch (err) {
      error.value = err.message || "Failed to delete profile";
      console.error("Delete profile error:", err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Search profiles by name, title, company, or skills
  const searchProfiles = (query) => {
    if (!query?.trim()) return userProfiles.value;
    const searchTerm = query.toLowerCase().trim();
    return userProfiles.value.filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchTerm) ||
        profile.title.toLowerCase().includes(searchTerm) ||
        profile.company.toLowerCase().includes(searchTerm) ||
        profile.skills.some((skill) => skill.toLowerCase().includes(searchTerm))
    );
  };

  // Filter profiles by location
  const filterProfilesByLocation = (location) => {
    if (!location?.trim()) return userProfiles.value;
    return userProfiles.value.filter((profile) =>
      profile.location.toLowerCase().includes(location.toLowerCase().trim())
    );
  };

  // Get count of skills by skill
  const getSkillCounts = computed(() => {
    const counts = {};
    userProfiles.value.forEach((profile) => {
      profile.skills.forEach((skill) => {
        counts[skill] = (counts[skill] || 0) + 1;
      });
    });
    return counts;
  });

  // Compute duration for experiences
  const computeExperienceDuration = (startDate, endDate) => {
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
  };

  // Save to localStorage with versioning and compression
  const saveToLocalStorage = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const data = {
          version: storageVersion.value,
          profiles: mockUserProfiles,
        };
        // Basic compression: remove unnecessary whitespace
        const compressed = JSON.stringify(data, (key, value) =>
          typeof value === "string" ? value.trim() : value
        );
        localStorage.setItem("userProfiles", compressed);
        console.log("Saved profiles to localStorage");
      }
    } catch (err) {
      error.value = "Could not save profiles to local storage";
      console.error("Save to localStorage error:", err);
    }
  };

  // Load from localStorage with validation and migration
  const loadFromLocalStorage = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const stored = localStorage.getItem("userProfiles");
        if (stored) {
          const data = JSON.parse(stored);
          if (data.version !== storageVersion.value) {
            console.warn("Data version mismatch, migrating...");
            // Basic migration: normalize profiles
            mockUserProfiles.length = 0;
            mockUserProfiles.push(...data.profiles.map(normalizeProfile));
          } else {
            mockUserProfiles.length = 0;
            mockUserProfiles.push(...data.profiles);
          }
          userProfiles.value = [...mockUserProfiles];
          console.log(
            "Loaded profiles from localStorage:",
            userProfiles.value.length
          );
        } else {
          console.log("No profiles found in localStorage, using mock data");
          userProfiles.value = [...mockUserProfiles];
        }
      }
    } catch (err) {
      error.value = "Failed to load profiles from local storage";
      console.error("Load from localStorage error:", err);
      userProfiles.value = [...mockUserProfiles]; // Fallback to mock data
    }
  };

  // Initialize the store
  const init = () => {
    console.log("Initializing userProfile store...");
    loadFromLocalStorage();
    if (userProfiles.value.length === 0) {
      console.warn("No profiles loaded, initializing with mock data");
      userProfiles.value = [...mockUserProfiles];
    }
    console.log(
      "Store initialized with",
      userProfiles.value.length,
      "profiles"
    );
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
    updateUserProfile,
    deleteUserProfile,
    searchProfiles,
    filterProfilesByLocation,
    getSkillCounts,
    computeExperienceDuration,
    saveToLocalStorage,
    loadFromLocalStorage,
    init,
  };
});
