// import { ref, defineStore } from "vue";

// Mock application data

import { ref } from "vue";
import { defineStore } from "pinia";
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
  {
    userId: 0,
    id: 2,
    companyName: "TechTrend Innovations",
    companyLogo: "https://logo.clearbit.com/techtrend.com",
    logoBackground: "#f0e6f7",
    role: "Software Engineer",
    jobTitle: "Software Engineer",
    dateApplied: "20 May 2025",
    status: "Interviewing",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$90,000 - $120,000",
    jobDescription:
      "Join our engineering team to develop cutting-edge software solutions. You will design, code, and test applications to meet client needs and improve system efficiency.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in software development",
      "Proficiency in JavaScript, Python, and React",
      "Experience with cloud platforms (AWS, Azure)",
      "Strong problem-solving skills",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "20 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "21 May 2025",
        description: "Our team is currently reviewing your application.",
        completed: true,
      },
      {
        title: "Phone Screening",
        date: "28 May 2025",
        description: "Initial phone screening with HR team.",
        completed: true,
      },
      {
        title: "Technical Interview",
        date: "2 Jun 2025",
        description: "Technical interview with the hiring manager.",
        completed: false,
      },
    ],
    recruiter: {
      name: "Michael Lee",
      role: "Recruitment Specialist",
      email: "michael.lee@techtrend.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
  {
    userId: 0,
    id: 3,
    companyName: "GreenWave Solutions",
    companyLogo: "https://logo.clearbit.com/greenwave.com",
    logoBackground: "#e6f0e8",
    role: "Data Analyst",
    jobTitle: "Data Analyst",
    dateApplied: "15 May 2025",
    status: "Offered",
    location: "New York, NY",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$70,000 - $90,000",
    jobDescription:
      "Analyze large datasets to provide actionable insights for business growth. Collaborate with teams to develop reports and dashboards for strategic decision-making.",
    requirements: [
      "Bachelor's degree in Statistics, Data Science, or related field",
      "2+ years of experience in data analysis",
      "Proficiency in SQL, Python, and Tableau",
      "Strong analytical and communication skills",
      "Experience with data visualization tools",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "15 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "16 May 2025",
        description: "Our team is currently reviewing your application.",
        completed: true,
      },
      {
        title: "Phone Screening",
        date: "20 May 2025",
        description: "Initial phone screening with HR team.",
        completed: true,
      },
      {
        title: "Offer Extended",
        date: "28 May 2025",
        description: "An offer has been extended for your consideration.",
        completed: true,
      },
    ],
    recruiter: {
      name: "Emily Davis",
      role: "HR Coordinator",
      email: "emily.davis@greenwave.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
  {
    userId: 0,
    id: 4,
    companyName: "CloudPeak Inc.",
    companyLogo: "https://logo.clearbit.com/cloudpeak.com",
    logoBackground: "#f7f0e6",
    role: "DevOps Engineer",
    jobTitle: "DevOps Engineer",
    dateApplied: "10 May 2025",
    status: "In Review",
    location: "Remote",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$100,000 - $130,000",
    jobDescription:
      "Support our infrastructure by automating deployments and managing cloud environments. Work with development teams to ensure smooth and reliable releases.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in DevOps or systems engineering",
      "Proficiency in Docker, Kubernetes, and AWS",
      "Experience with CI/CD pipelines",
      "Strong scripting skills (Bash, Python)",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "10 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "11 May 2025",
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
      name: "James Carter",
      role: "Senior Recruiter",
      email: "james.carter@cloudpeak.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
  {
    userId: 0,
    id: 5,
    companyName: "BrightFuture Tech",
    companyLogo: "https://logo.clearbit.com/brightfuture.com",
    logoBackground: "#e6e9f7",
    role: "UX Designer",
    jobTitle: "UX Designer",
    dateApplied: "18 May 2025",
    status: "Hired",
    location: "Austin, TX",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$80,000 - $100,000",
    jobDescription:
      "Design user-friendly interfaces for web and mobile applications. Conduct user research and create wireframes to enhance user experience.",
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "3+ years of experience in UX design",
      "Proficiency in Figma, Sketch, and Adobe XD",
      "Experience with user research and usability testing",
      "Strong portfolio of design projects",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "18 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "19 May 2025",
        description: "Our team is currently reviewing your application.",
        completed: true,
      },
      {
        title: "Application Rejected",
        date: "25 May 2025",
        description:
          "We regret to inform you that your application was not selected.",
        completed: true,
      },
    ],
    recruiter: {
      name: "Lisa Nguyen",
      role: "HR Manager",
      email: "lisa.nguyen@brightfuture.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
  {
    userId: 0,
    id: 6,
    companyName: "EcoEnergy Corp",
    companyLogo: "https://logo.clearbit.com/ecoenergy.com",
    logoBackground: "#e6f7e9",
    role: "Project Manager",
    jobTitle: "Project Manager",
    dateApplied: "22 May 2025",
    status: "Hired",
    location: "Chicago, IL",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$85,000 - $110,000",
    jobDescription:
      "Lead renewable energy projects from planning to execution. Coordinate with cross-functional teams to ensure timely delivery and budget compliance.",
    requirements: [
      "Bachelor's degree in Business, Engineering, or related field",
      "5+ years of project management experience",
      "PMP or similar certification preferred",
      "Strong leadership and communication skills",
      "Experience with project management tools (Jira, Trello)",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "22 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "23 May 2025",
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
        title: "Interview",
        date: "Pending",
        description: "Interview with the project management team.",
        completed: false,
      },
    ],
    recruiter: {
      name: "Robert Kim",
      role: "Recruitment Lead",
      email: "robert.kim@ecoenergy.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
  {
    userId: 0,
    id: 7,
    companyName: "HealthSync",
    companyLogo: "https://logo.clearbit.com/healthsync.com",
    logoBackground: "#f7e6e6",
    role: "Product Manager",
    jobTitle: "Product Manager",
    dateApplied: "17 May 2025",
    status: "Interviewing",
    location: "Remote",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$95,000 - $125,000",
    jobDescription:
      "Drive the development of healthcare software products. Collaborate with engineering, design, and marketing teams to deliver innovative solutions.",
    requirements: [
      "Bachelor's degree in Business, Computer Science, or related field",
      "4+ years of product management experience",
      "Experience in healthcare or SaaS products",
      "Strong analytical and problem-solving skills",
      "Proficiency in Agile methodologies",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "17 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "18 May 2025",
        description: "Our team is currently reviewing your application.",
        completed: true,
      },
      {
        title: "Phone Screening",
        date: "22 May 2025",
        description: "Initial phone screening with HR team.",
        completed: true,
      },
      {
        title: "Interview",
        date: "31 May 2025",
        description: "Interview with the product team.",
        completed: false,
      },
    ],
    recruiter: {
      name: "Anna Patel",
      role: "HR Specialist",
      email: "anna.patel@healthsync.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
  {
    userId: 0,
    id: 8,
    companyName: "FinTech Solutions",
    companyLogo: "https://logo.clearbit.com/fintechsolutions.com",
    logoBackground: "#e6f0f7",
    role: "Financial Analyst",
    jobTitle: "Financial Analyst",
    dateApplied: "14 May 2025",
    status: "Interviewed",
    location: "Boston, MA",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$65,000 - $85,000",
    jobDescription:
      "Analyze financial data to support strategic decisions. Prepare reports, forecasts, and models to guide investment and business planning.",
    requirements: [
      "Bachelor's degree in Finance, Economics, or related field",
      "2+ years of experience in financial analysis",
      "Proficiency in Excel and financial modeling",
      "Strong analytical and communication skills",
      "CFA or CPA certification is a plus",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "14 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "15 May 2025",
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
        title: "Interview",
        date: "Pending",
        description: "Interview with the finance team.",
        completed: false,
      },
    ],
    recruiter: {
      name: "David Brown",
      role: "Recruitment Manager",
      email: "david.brown@fintechsolutions.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
  {
    userId: 0,
    id: 9,
    companyName: "CreativeLabs",
    companyLogo: "https://logo.clearbit.com/creativelabs.com",
    logoBackground: "#f7e6f0",
    role: "Graphic Designer",
    jobTitle: "Graphic Designer",
    dateApplied: "21 May 2025",
    status: "In Review",
    location: "Los Angeles, CA",
    employmentType: "Contract",
    jobType: "Contract",
    salaryRange: "$50,000 - $70,000",
    jobDescription:
      "Create visually stunning graphics for marketing campaigns, websites, and branding materials. Collaborate with the creative team to bring concepts to life.",
    requirements: [
      "Bachelor's degree in Graphic Design or related field",
      "3+ years of experience in graphic design",
      "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Strong portfolio showcasing design skills",
      "Ability to work under tight deadlines",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "21 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "22 May 2025",
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
        title: "Portfolio Review",
        date: "Pending",
        description: "Review of your design portfolio by the creative team.",
        completed: false,
      },
    ],
    recruiter: {
      name: "Olivia Smith",
      role: "HR Coordinator",
      email: "olivia.smith@creativelabs.com",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
    },
  },
  {
    userId: 0,
    id: 10,
    companyName: "DataCore Analytics",
    companyLogo: "https://logo.clearbit.com/datacore.com",
    logoBackground: "#e6e6f7",
    role: "Machine Learning Engineer",
    jobTitle: "Machine Learning Engineer",
    dateApplied: "19 May 2025",
    status: "Phone Screening",
    location: "Remote",
    employmentType: "Full-time",
    jobType: "Full-Time",
    salaryRange: "$110,000 - $140,000",
    jobDescription:
      "Develop and deploy machine learning models to solve complex data problems. Work with data scientists and engineers to optimize algorithms and systems.",
    requirements: [
      "Master's degree in Computer Science, Data Science, or related field",
      "3+ years of experience in machine learning",
      "Proficiency in Python, TensorFlow, and PyTorch",
      "Experience with big data technologies (Hadoop, Spark)",
      "Strong problem-solving and analytical skills",
    ],
    timeline: [
      {
        title: "Application Submitted",
        date: "19 May 2025",
        description: "Your application has been successfully submitted.",
        completed: true,
      },
      {
        title: "Application Under Review",
        date: "20 May 2025",
        description: "Our team is currently reviewing your application.",
        completed: true,
      },
      {
        title: "Phone Screening",
        date: "29 May 2025",
        description: "Initial phone screening with HR team.",
        completed: true,
      },
      {
        title: "Technical Interview",
        date: "Pending",
        description: "Technical interview with the engineering team.",
        completed: false,
      },
    ],
    recruiter: {
      name: "Sophia Martinez",
      role: "Senior Recruiter",
      email: "sophia.martinez@datacore.com",
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

// Date range configuration
const dateRange = ref({
  start: "Jul 15",
  end: "Jul 25",
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
  return mockApplications.filter((app) => {
    const appDate = new Date(app.dateApplied);
    return appDate >= start && appDate <= end;
  });
};

// Utility functions for data manipulation
const getRecentApplications = (maxItems = 5) => {
  return mockApplications
    .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
    .slice(0, maxItems);
};

const getApplicationsByStatus = (status) => {
  if (status === "all") return mockApplications;
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
  return mockApplications.filter(
    (app) =>
      app.status === statusMap[status] ||
      app.status.toLowerCase() === status.toLowerCase()
  );
};

// const getStatusCounts = () => {
//   const filteredApplications = getApplicationsInDateRange(
//     dateRange.value.start,
//     dateRange.value.end
//   );
//   const counts = { all: filteredApplications.length };
//   filteredApplications.forEach((app) => {
//     const statusKey = app.status.toLowerCase().replace(/\s+/g, "-");
//     counts[statusKey] = (counts[statusKey] || 0) + 1;
//   });
//   return counts;
// };

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
  if (!query.trim()) return mockApplications;
  const searchTerm = query.toLowerCase();
  return mockApplications.filter(
    (app) =>
      app.companyName.toLowerCase().includes(searchTerm) ||
      app.role.toLowerCase().includes(searchTerm) ||
      app.jobTitle.toLowerCase().includes(searchTerm)
  );
};

// Pinia store for applications
export const useApplicationStore = defineStore("application", () => {
  // Reactive state
  const applications = ref([]);
  const selectedApplication = ref(null);
  const loading = ref(false);
  const error = ref(null);

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
      const index = mockApplications.findIndex((app) => app.id === id);
      if (index !== -1) {
        mockApplications[index] = {
          ...mockApplications[index],
          ...updatedApplication,
        };
        if (selectedApplication.value && selectedApplication.value.id === id) {
          selectedApplication.value = {
            ...selectedApplication.value,
            ...updatedApplication,
          };
        }
        applications.value = [...mockApplications];
        saveToLocalStorage();
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
      const index = mockApplications.findIndex((app) => app.id === id);
      if (index !== -1) {
        mockApplications.splice(index, 1);
        if (selectedApplication.value && selectedApplication.value.id === id) {
          selectedApplication.value = null;
        }
        applications.value = [...mockApplications];
        saveToLocalStorage();
      } else {
        throw new Error("Application not found");
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Save to localStorage for persistence
  const saveToLocalStorage = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("applications", JSON.stringify(mockApplications));
    }
  };

  // Load from localStorage
  const loadFromLocalStorage = () => {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("applications");
      if (stored) {
        const parsed = JSON.parse(stored);
        mockApplications.length = 0;
        mockApplications.push(...parsed);
        applications.value = [...mockApplications];
      }
    }
  };

  // Initialize the store
  const init = () => {
    loadFromLocalStorage();
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
    saveToLocalStorage,
    loadFromLocalStorage,
    init,
  };
});
