import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Mock API functions to simulate backend calls
const mockApi = {
  async fetchJobs() {
    // Simulate network delay (1-2 seconds)
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 1000)
    );

    // Simulate occasional API failure (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch jobs from server");
    }

    return [
      {
        id: 1,
        title: "Social Media Assistant",
        company: "Nomad",
        location: "Paris, France",
        logo: "/company-logos/nomad.png",
        tags: ["Full-Time", "Marketing", "Design"],
        applied: 5,
        capacity: 10,
      },
      {
        id: 2,
        title: "Brand Designer",
        company: "Dropbox",
        location: "San Francisco, USA",
        logo: "/company-logos/dropbox.png",
        tags: ["Full-Time", "Marketing", "Design"],
        applied: 2,
        capacity: 8,
      },
      {
        id: 3,
        title: "Interactive Developer",
        company: "Terraform",
        location: "Hamburg, Germany",
        logo: "/company-logos/terraform.png",
        tags: ["Full-Time", "Marketing", "Design"],
        applied: 8,
        capacity: 12,
      },
      {
        id: 4,
        title: "Email Marketing",
        company: "Revolut",
        location: "Madrid, Spain",
        logo: "/company-logos/revolut.png",
        tags: ["Full-Time", "Marketing", "Design"],
        applied: 0,
        capacity: 10,
      },
      {
        id: 5,
        title: "Lead Engineer",
        company: "Canva",
        location: "Ankara, Turkey",
        logo: "/company-logos/canva.png",
        tags: ["Full-Time", "Marketing", "Design"],
        applied: 5,
        capacity: 10,
      },
      {
        id: 6,
        title: "Product Designer",
        company: "ClassPass",
        location: "Berlin, Germany",
        logo: "/company-logos/classpass.png",
        tags: ["Full-Time", "Marketing", "Design"],
        applied: 5,
        capacity: 10,
      },
      {
        id: 7,
        title: "Customer Manager",
        company: "Pitch",
        location: "Berlin, Germany",
        logo: "/company-logos/pitch.png",
        tags: ["Full-Time", "Marketing", "Design"],
        applied: 5,
        capacity: 10,
      },
      {
        id: 8,
        title: "UI/UX Designer",
        company: "Figma",
        location: "New York, USA",
        logo: "/company-logos/figma.png",
        tags: ["Remote", "Design"],
        applied: 3,
        capacity: 7,
      },
      {
        id: 9,
        title: "Frontend Developer",
        company: "Vercel",
        location: "Amsterdam, Netherlands",
        logo: "/company-logos/vercel.png",
        tags: ["Full-Time", "Engineering"],
        applied: 4,
        capacity: 9,
      },
      {
        id: 10,
        title: "Community Manager",
        company: "Notion",
        location: "Toronto, Canada",
        logo: "/company-logos/notion.png",
        tags: ["Part-Time", "Marketing"],
        applied: 6,
        capacity: 10,
      },
      {
        id: 11,
        title: "DevOps Engineer",
        company: "GitLab",
        location: "Remote",
        logo: "/company-logos/gitlab.png",
        tags: ["Remote", "Engineering"],
        applied: 2,
        capacity: 5,
      },
      {
        id: 12,
        title: "Content Writer",
        company: "Buffer",
        location: "London, UK",
        logo: "/company-logos/buffer.png",
        tags: ["Freelance", "Writing"],
        applied: 1,
        capacity: 4,
      },
      {
        id: 13,
        title: "QA Tester",
        company: "Trello",
        location: "Rome, Italy",
        logo: "/company-logos/trello.png",
        tags: ["Full-Time", "Engineering"],
        applied: 4,
        capacity: 6,
      },
      {
        id: 14,
        title: "Growth Marketer",
        company: "Zapier",
        location: "Sydney, Australia",
        logo: "/company-logos/zapier.png",
        tags: ["Full-Time", "Marketing"],
        applied: 3,
        capacity: 10,
      },
      {
        id: 15,
        title: "Support Specialist",
        company: "Slack",
        location: "Lisbon, Portugal",
        logo: "/company-logos/slack.png",
        tags: ["Remote", "Support"],
        applied: 2,
        capacity: 6,
      },
      {
        id: 16,
        title: "Data Analyst",
        company: "Klarna",
        location: "Stockholm, Sweden",
        logo: "/company-logos/klarna.png",
        tags: ["Full-Time", "Data"],
        applied: 7,
        capacity: 10,
      },
      {
        id: 17,
        title: "Motion Designer",
        company: "Adobe",
        location: "Tokyo, Japan",
        logo: "/company-logos/adobe.png",
        tags: ["Full-Time", "Design"],
        applied: 2,
        capacity: 8,
      },
      {
        id: 18,
        title: "Tech Recruiter",
        company: "LinkedIn",
        location: "Dublin, Ireland",
        logo: "/company-logos/linkedin.png",
        tags: ["Full-Time", "HR"],
        applied: 6,
        capacity: 9,
      },
      {
        id: 19,
        title: "Mobile Developer",
        company: "Spotify",
        location: "Oslo, Norway",
        logo: "/company-logos/spotify.png",
        tags: ["Full-Time", "Engineering"],
        applied: 5,
        capacity: 10,
      },
      {
        id: 20,
        title: "AI Research Intern",
        company: "DeepMind",
        location: "London, UK",
        logo: "/company-logos/deepmind.png",
        tags: ["Internship", "AI"],
        applied: 10,
        capacity: 10,
      },
    ];
  },

  async fetchFilterOptions() {
    // Simulate network delay (0.5-1.5 seconds)
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500)
    );

    // Simulate occasional API failure (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Failed to fetch filter options from server");
    }

    return {
      employmentTypes: [
        { id: "full-time", label: "Full-time", count: 3 },
        { id: "part-time", label: "Part-Time", count: 5 },
        { id: "internship", label: "Internship", count: 24 },
      ],
      categories: [
        { id: "design", label: "Design", count: 24 },
        { id: "sales", label: "Sales", count: 3 },
        { id: "marketing", label: "Marketing", count: 3 },
        { id: "business", label: "Business", count: 3 },
        { id: "hr", label: "Human Resource", count: 6 },
        { id: "finance", label: "Finance", count: 4 },
        { id: "engineering", label: "Engineering", count: 4 },
        { id: "technology", label: "Technology", count: 5 },
      ],
      jobLevels: [
        { id: "entry", label: "Entry Level", count: 57 },
        { id: "junior", label: "Junior", count: 3 },
        { id: "senior", label: "Senior Level", count: 5 },
        { id: "manager", label: "Manager", count: 12 },
      ],
      salaryRanges: [
        { id: "range1", label: "$700 - $1000", count: 4 },
        { id: "range2", label: "$100 - $1500", count: 6 },
        { id: "range3", label: "$1500 - $2000", count: 10 },
        { id: "range4", label: "$3000 or above", count: 4 },
      ],
    };
  },
};

export const useJobStore = defineStore("jobStore", () => {
  // State
  const searchQuery = ref({ keyword: "", location: "" });
  const selectedFilters = ref({
    employmentTypes: [],
    categories: [],
    jobLevels: [],
    salaryRanges: [],
  });
  const currentPage = ref(1);
  const itemsPerPage = ref(6);
  const jobs = ref([]);
  const employmentTypes = ref([]);
  const categories = ref([]);
  const jobLevels = ref([]);
  const salaryRanges = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed properties
  const totalJobs = computed(() => applyFilters(jobs.value).length);
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalJobs.value / itemsPerPage.value))
  );
  const hasFilters = computed(() => {
    const { employmentTypes, categories, jobLevels, salaryRanges } =
      selectedFilters.value;
    return (
      employmentTypes.length > 0 ||
      categories.length > 0 ||
      jobLevels.length > 0 ||
      salaryRanges.length > 0
    );
  });
  const filteredJobs = computed(() => {
    const results = applyFilters(jobs.value);
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return results.slice(start, end);
  });

  // Reusable filter function
  function applyFilters(jobs) {
    let results = [...jobs];

    const keyword = searchQuery.value.keyword?.toLowerCase().trim() || "";
    const location = searchQuery.value.location?.toLowerCase().trim() || "";
    const { employmentTypes, categories, jobLevels, salaryRanges } =
      selectedFilters.value;

    // Apply search filters
    if (keyword || location) {
      results = results.filter((job) => {
        const matchesKeyword = keyword
          ? job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.tags.some((tag) => tag.toLowerCase().includes(keyword))
          : true;
        const matchesLocation = location
          ? job.location
              .split(",")[0]
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-") === location
          : true;
        return matchesKeyword && matchesLocation;
      });
    }

    // Apply sidebar filters

    if (employmentTypes.length > 0) {
      results = results.filter((job) =>
        job.tags.some((tag) => employmentTypes.includes(tag.toLowerCase()))
      );
    }
    if (categories.length > 0) {
      results = results.filter((job) =>
        job.tags.some((tag) => categories.includes(tag.toLowerCase()))
      );
    }
    if (jobLevels.length > 0) {
      results = results.filter((job) =>
        job.tags.some((tag) => jobLevels.includes(tag.toLowerCase()))
      );
    }
    if (salaryRanges.length > 0) {
      // Placeholder: Implement salary range filtering if job data includes salary
    }

    return results;
  }

  // Actions

  async function fetchJobs() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await mockApi.fetchJobs();
      jobs.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchFilterOptions() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await mockApi.fetchFilterOptions();
      employmentTypes.value = data.employmentTypes;
      categories.value = data.categories;
      jobLevels.value = data.jobLevels;
      salaryRanges.value = data.salaryRanges;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  function setSearchQuery(queryObj) {
    searchQuery.value = queryObj;
    currentPage.value = 1;
  }

  function clearSearch() {
    searchQuery.value = { keyword: "", location: "" };
    selectedFilters.value = {
      employmentTypes: [],
      categories: [],
      jobLevels: [],
      salaryRanges: [],
    };
    currentPage.value = 1;
  }

  function updateFilters(filterType, value) {
    selectedFilters.value = {
      ...selectedFilters.value,
      [filterType]: value,
    };
    currentPage.value = 1;
  }

  function updatePage(page) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updatePerPage(perPage) {
    itemsPerPage.value = perPage;
    currentPage.value = 1;
  }

  function updateUrl() {
    const url = new URL(window.location);
    if (searchQuery.value.keyword) {
      url.searchParams.set("keyword", searchQuery.value.keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    if (searchQuery.value.location) {
      url.searchParams.set("location", searchQuery.value.location);
    } else {
      url.searchParams.delete("location");
    }
    window.history.pushState({}, "", url);
  }

  function initializeFromUrl() {
    const url = new URL(window.location);
    searchQuery.value = {
      keyword: url.searchParams.get("keyword") || "",
      location: url.searchParams.get("location") || "",
    };
  }

  return {
    searchQuery,
    selectedFilters,
    employmentTypes,
    categories,
    jobLevels,
    salaryRanges,
    jobs,
    currentPage,
    itemsPerPage,
    totalJobs,
    totalPages,
    hasFilters,
    filteredJobs,
    isLoading,
    error,
    fetchJobs,
    fetchFilterOptions,
    setSearchQuery,
    clearSearch,
    updateFilters,
    updatePage,
    updatePerPage,
    updateUrl,
    initializeFromUrl,
  };
});
