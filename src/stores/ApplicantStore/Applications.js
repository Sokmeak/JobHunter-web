import { ref } from "vue";
import { defineStore } from "pinia";

// Mock application data
const mockApplications = [
  {
    userId: 0,
    id: 1,
    companyName: "Nomad",
    companyLogo: "https://logo.clearbit.com/nomadlist.com",
    logoBackground: "#e6f7f0",
    role: "Social Media Assistant",
    jobTitle: "Social Media Assistant",
    dateApplied: "24 May 2025",
    status: "Interviewed",
    location: "Remote",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$40,000 - $60,000",
    jobDescription:
      "We are looking for a creative and enthusiastic Social Media Assistant to join our marketing team. You will be responsible for creating engaging content, managing social media accounts, and analyzing performance metrics.",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "2+ years of experience in social media management",
      "Proficiency in social media platforms (Instagram, Facebook, Twitter, LinkedIn)",
      "Strong written and verbal communication skills",
      "Experience with social media analytics tools",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "24 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "25 May 2025",
        description: "Our team is currently reviewing your application.",
        completed: true,
      },
      {
        title: "Phone Screening",
        date: "Pending",
        description: "Initial phone screening with HR team.",
        completed: false,
      },
      {
        title: "Technical Interview",
        date: "Pending",
        description: "Technical interview with the hiring manager.",
        completed: false,
      },
    ],
    recruiter: {
      name: "Sarah Johnson",
      role: "HR Manager",
      email: "sarah.johnson@nomad.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
];

// Mock API functions
const mockApi = {
  getApplications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(mockApplications)));
      }, 500); // Simulate network delay
    });
  },
  getApplicationById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const application = mockApplications.find((app) => app.id === id);
        if (application) {
          resolve(JSON.parse(JSON.stringify(application)));
        } else {
          reject(new Error("Application not found"));
        }
      }, 500); // Simulate network delay
    });
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

  // Fetch all applications from mock API
  const fetchApplications = async () => {
    loading.value = true;
    error.value = null;
    try {
      const apps = await mockApi.getApplications();
      applications.value = apps;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Fetch a single application by ID from mock API
  const fetchApplicationById = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const app = await mockApi.getApplicationById(id);
      selectedApplication.value = app;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Update an application
  const updateApplication = async (id, updatedApplication) => {
    loading.value = true;
    error.value = null;
    try {
      const index = applications.value.findIndex((app) => app.id === id);
      if (index !== -1) {
        applications.value[index] = {
          ...applications.value[index],
          ...updatedApplication,
        };
        if (selectedApplication.value && selectedApplication.value.id === id) {
          selectedApplication.value = {
            ...selectedApplication.value,
            ...updatedApplication,
          };
        }
      } else {
        throw new Error("Application not found");
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Delete an application
  const deleteApplication = async (id) => {
    loading.value = true;
    error.value = null;
    try {
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
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Initialize the store
  const init = () => {
    applications.value = [...mockApplications];
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
    fetchApplicationById,
    updateApplication,
    deleteApplication,
    init,
  };
});
