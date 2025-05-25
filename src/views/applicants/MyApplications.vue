<template>
  <div class="applications-container">
    <GreetingSection :user-name="user.name" :date-range="dateRange" />

    <!-- Feature Banner -->
    <ApplicationBanner
      :show="showBanner"
      title="New Feature"
      message="You can request a follow-up 7 days after applying for a job if the application status is in review. Only one follow-up is allowed per job."
      @close="showBanner = false"
    />
    <!-- Status Tabs Component -->
    <StatusTabs
      :tabs="statusTabs"
      :activeTab="activeTab"
      @update:activeTab="activeTab = $event"
    />

    <!-- Main Content -->
    <div class="content-section">
      <div class="header-section">
        <h1 class="section-title">Applications History</h1>
        <div class="action-buttons">
          <SearchInput v-model="searchQuery" @input="handleSearch" />
          <FilterButton @click="showFilters = !showFilters" />
        </div>
      </div>
      <!-- Loading State -->

      <!-- Applications Table Component -->
      <ApplicationsTable
        :applications="filteredApplications"
        @view-application="openApplicationDetails"
        @action-menu="openActionMenu"
      />
      <LoadingSpinner v-if="isLoading" />
      <!-- Empty State -->
      <EmptyState
        v-else-if="paginatedApplications.length === 0"
        :message="emptyStateMessage"
        icon="briefcase"
      />

      <!-- Pagination Component -->
      <Pagination 
        v-if="filteredApplications.length > 0"
        :currentPage="currentPage" 
        :totalPages="totalPages" 
        @update:page="currentPage = $event" 
      />
    </div>

    <!-- Application Details Modal Component -->
    <ApplicationDetailsModal
      v-if="showDetailsModal"
      :application="selectedApplication"
      @close="closeDetailsModal"
      @withdraw="withdrawApplication"
      @contact="contactRecruiter"
    />
  </div>
</template>

<script>
import ApplicationBanner from "@/components/Applicants/applications/ApplicationBanner.vue";
import ApplicationDetailsModal from "@/components/Applicants/applications/ApplicationDetailsModal.vue";
import ApplicationsTable from "@/components/Applicants/applications/ApplicationsTable.vue";
import GreetingSection from "@/components/Applicants/applications/GreetingSection.vue";
import StatusTabs from "@/components/Applicants/applications/StatusTabs.vue";
import FilterButton from "@/components/Applicants/comon/FilterButton.vue";
import SearchInput from "@/components/Applicants/comon/SearchInput.vue";
import EmptyState from "@/components/Applicants/applications/EmptyState.vue";
import LoadingSpinner from "@/components/Applicants/comon/LoadingSpinner.vue";
import Pagination from "@/components/Applicants/applications/Pagination.vue";


export default {
  name: "ApplicationsHistory",
  components: {
    StatusTabs,
    SearchInput,
    FilterButton,
    ApplicationsTable,
    EmptyState,
    LoadingSpinner,
    Pagination,
    GreetingSection,
    ApplicationBanner,
    ApplicationDetailsModal,
  },
  data() {
    return {
      user: {
        name: "Jake",
        email: "jakegyll@email.com",
        fullName: "Jake Gyll",
      },
      dateRange: {
        start: "Jul 19",
        end: "Jul 25",
      },
      activeTab: "all",
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
      isLoading: false,
      showDetailsModal: false,
      showFilters: false,
      selectedApplication: null,
      statusTabs: [
        { status: "all", label: "All", count: 0 },
        { status: "in-review", label: "In Review", count: 0 },
        { status: "interviewing", label: "Interviewing", count: 0 },
        { status: "assessment", label: "Assessment", count: 0 },
        { status: "offered", label: "Offered", count: 0 },
        { status: "hired", label: "Hired", count: 0 },
      ],
      applications: [],
    };
  },
  computed: {
    filteredApplications() {
      let filtered = this.applications;

      // Filter by active tab
      if (this.activeTab !== "all") {
        const statusMap = {
          "in-review": "In Review",
          interviewing: "Interviewing",
          assessment: "Assessment",
          offered: "Offered",
          hired: "Hired",
          unsuitable: "Unsuitable",
        };

        filtered = filtered.filter(
          (app) => app.status === statusMap[this.activeTab]
        );
      }

      // Filter by search query
      if (this.searchQuery.trim() !== "") {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (app) =>
            app.companyName.toLowerCase().includes(query) ||
            app.role.toLowerCase().includes(query)
        );
      }

      return filtered;
    },
    paginatedApplications() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredApplications.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredApplications.length / this.itemsPerPage);
    },
    emptyStateMessage() {
      if (this.activeTab !== "all") {
        return `You don't have any applications with "${this.getStatusLabel(
          this.activeTab
        )}" status.`;
      } else if (this.searchQuery) {
        return "No applications match your search criteria.";
      } else {
        return "You haven't applied to any jobs in this period.";
      }
    },
  },
  created() {
    // Load applications when component is created
    this.loadApplications();
  },
  methods: {
    loadApplications() {
      this.isLoading = true;

      // Simulate API delay
      setTimeout(() => {
        // In a real app, this would be an API call
        this.applications = [
          {
            id: 1,
            companyName: "Nomad",
            companyLogo: "https://logo.clearbit.com/twitter.com",
            logoBackground: "#e6f7f0",
            role: "Social Media Assistant",
            dateApplied: "24 July 2021",
            status: "In Review",
            location: "Remote",
            employmentType: "Full-time",
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
                date: "24 July 2021",
                description:
                  "Your application has been successfully submitted.",
                completed: true,
              },
              {
                title: "Application Under Review",
                date: "25 July 2021",
                description:
                  "Our team is currently reviewing your application.",
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
            id: 2,
            companyName: "Udacity",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#e6f7ff",
            role: "Social Media Assistant",
            dateApplied: "20 July 2021",
            status: "Shortlisted",
            location: "San Francisco, CA",
            employmentType: "Full-time",
            salaryRange: "$45,000 - $65,000",
            jobDescription:
              "Join our dynamic marketing team as a Social Media Assistant. You'll help create compelling content and manage our social media presence across multiple platforms.",
            requirements: [
              "Bachelor's degree in Marketing or related field",
              "1-3 years of social media experience",
              "Creative mindset with attention to detail",
              "Knowledge of content creation tools",
              "Understanding of social media trends",
            ],
            timeline: [
              {
                title: "Application Submitted",
                date: "20 July 2021",
                description:
                  "Your application has been successfully submitted.",
                completed: true,
              },
              {
                title: "Application Reviewed",
                date: "22 July 2021",
                description:
                  "Your application has been reviewed and shortlisted.",
                completed: true,
              },
              {
                title: "First Interview Scheduled",
                date: "28 July 2021",
                description: "First round interview scheduled.",
                completed: false,
              },
            ],
            recruiter: {
              name: "Mike Chen",
              role: "Talent Acquisition Specialist",
              email: "mike.chen@udacity.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 3,
            companyName: "Packer",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#fff0f5",
            role: "Social Media Assistant",
            dateApplied: "16 July 2021",
            status: "Offered",
            location: "Remote",
            employmentType: "Full-time",
            salaryRange: "$50,000 - $70,000",
            jobDescription:
              "We are hiring a Social Media Assistant to create content, run ad campaigns, and build our online community.",
            requirements: [
              "Bachelor's in Communications or related",
              "3+ years of social media experience",
              "Creativity and eye for design",
              "Familiarity with paid ad strategies",
              "Team collaboration skills",
            ],
            timeline: [
              {
                title: "Application Submitted",
                date: "16 July 2021",
                description: "Application submitted to Packer.",
                completed: true,
              },
              {
                title: "Offer Extended",
                date: "20 July 2021",
                description: "You have received a job offer.",
                completed: true,
              },
            ],
            recruiter: {
              name: "James Lee",
              role: "Hiring Manager",
              email: "james.lee@packer.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 4,
            companyName: "Divvy",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#fffbe6",
            role: "Social Media Assistant",
            dateApplied: "14 July 2021",
            status: "Unsuitable",
            location: "Remote",
            employmentType: "Full-time",
            salaryRange: "$48,000 - $68,000",
            jobDescription:
              "Join our team to lead community engagement and manage our social media strategy across platforms.",
            requirements: [
              "Bachelor's degree in a related field",
              "2+ years experience managing brand channels",
              "Ability to run A/B tests and evaluate impact",
              "Creative and analytical thinker",
              "Excellent time management skills",
            ],
            timeline: [
              {
                title: "Application Submitted",
                date: "14 July 2021",
                description: "You applied for the Social Media Assistant role.",
                completed: true,
              },
              {
                title: "Interview Scheduled",
                date: "16 July 2021",
                description: "Interview scheduled with the marketing team.",
                completed: true,
              },
            ],
            recruiter: {
              name: "Anna Wells",
              role: "Recruiter",
              email: "anna.wells@divvy.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },

          {
            id: 5,
            companyName: "Buffer",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#e0f7fa",
            role: "Social Media Assistant",
            dateApplied: "25 July 2021",
            status: "In Review",
            location: "Remote",
            employmentType: "Full-time",
            salaryRange: "$45,000 - $65,000",
            jobDescription:
              "Help plan and execute social media strategies to boost engagement and brand awareness.",
            requirements: [
              "Bachelor’s in Communications or similar",
              "Experience with Buffer tools",
              "Strong analytical skills",
              "Creativity in content creation",
            ],
            timeline: [],
            recruiter: {
              name: "John Smith",
              role: "Talent Acquisition",
              email: "john@buffer.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 6,
            companyName: "Zapier",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#fce4ec",
            role: "Social Media Assistant",
            dateApplied: "22 July 2021",
            status: "Shortlisted",
            location: "Remote",
            employmentType: "Part-time",
            salaryRange: "$30,000 - $45,000",
            jobDescription:
              "Assist with the creation and scheduling of social media posts, reporting directly to the marketing team.",
            requirements: [
              "Experience in social content scheduling",
              "Basic design skills",
              "Knowledge of automation tools",
              "Effective communication skills",
            ],
            timeline: [],
            recruiter: {
              name: "Maria Lopez",
              role: "HR Coordinator",
              email: "maria@zapier.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 7,
            companyName: "Canva",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#ede7f6",
            role: "Social Media Assistant",
            dateApplied: "18 July 2021",
            status: "Interviewing",
            location: "Sydney, Australia",
            employmentType: "Contract",
            salaryRange: "$50,000 - $70,000",
            jobDescription:
              "Create visual content and assist with community engagement campaigns.",
            requirements: [
              "Expertise in Canva tools",
              "Creative storytelling",
              "Community management experience",
              "Strong time management skills",
            ],
            timeline: [],
            recruiter: {
              name: "Liam Chen",
              role: "Recruiter",
              email: "liam@canva.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 8,
            companyName: "HubSpot",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#f1f8e9",
            role: "Social Media Assistant",
            dateApplied: "15 July 2021",
            status: "Offered",
            location: "Cambridge, MA",
            employmentType: "Full-time",
            salaryRange: "$55,000 - $75,000",
            jobDescription:
              "Support the social media manager in executing campaigns across platforms.",
            requirements: [
              "Bachelor’s degree",
              "3+ years of social media experience",
              "HubSpot CRM knowledge",
              "Excellent writing skills",
            ],
            timeline: [],
            recruiter: {
              name: "Karen Wu",
              role: "Talent Partner",
              email: "karen@hubspot.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 9,
            companyName: "Notion",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#fbe9e7",
            role: "Social Media Assistant",
            dateApplied: "12 July 2021",
            status: "Rejected",
            location: "San Francisco, CA",
            employmentType: "Internship",
            salaryRange: "$20/hr",
            jobDescription:
              "Create engaging posts and support product marketing efforts.",
            requirements: [
              "Knowledge of Notion tools",
              "Social platform familiarity",
              "Strong communication skills",
              "Interest in productivity tech",
            ],
            timeline: [],
            recruiter: {
              name: "Alex Kim",
              role: "Hiring Manager",
              email: "alex@notion.so",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 10,
            companyName: "Grammarly",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#e8f5e9",
            role: "Social Media Assistant",
            dateApplied: "11 July 2021",
            status: "Pending",
            location: "Remote",
            employmentType: "Full-time",
            salaryRange: "$48,000 - $66,000",
            jobDescription:
              "Manage engagement across platforms and support branding strategy.",
            requirements: [
              "Excellent grammar skills",
              "Engaging content writing",
              "Analytics experience",
              "Self-driven and organized",
            ],
            timeline: [],
            recruiter: {
              name: "Nina Reyes",
              role: "HR Specialist",
              email: "nina@grammarly.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 11,
            companyName: "Trello",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#f9fbe7",
            role: "Social Media Assistant",
            dateApplied: "10 July 2021",
            status: "Shortlisted",
            location: "New York, NY",
            employmentType: "Part-time",
            salaryRange: "$35,000 - $50,000",
            jobDescription:
              "Build social calendars and develop campaign ideas for productivity audiences.",
            requirements: [
              "Organized and creative",
              "Experience with Trello boards",
              "Social content strategy knowledge",
              "Passion for teamwork tools",
            ],
            timeline: [],
            recruiter: {
              name: "Oliver Stone",
              role: "HR Lead",
              email: "oliver@trello.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 12,
            companyName: "Hootsuite",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#e1f5fe",
            role: "Social Media Assistant",
            dateApplied: "08 July 2021",
            status: "Interviewing",
            location: "Vancouver, Canada",
            employmentType: "Full-time",
            salaryRange: "$50,000 - $70,000",
            jobDescription:
              "Manage publishing tools and report on performance insights.",
            requirements: [
              "Strong Hootsuite tool experience",
              "Excellent organizational skills",
              "Collaborative mindset",
              "Experience with performance metrics",
            ],
            timeline: [],
            recruiter: {
              name: "Ella Nash",
              role: "People Ops",
              email: "ella@hootsuite.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 13,
            companyName: "Slack",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#f3e5f5",
            role: "Social Media Assistant",
            dateApplied: "06 July 2021",
            status: "Assessment",
            location: "Remote",
            employmentType: "Contract",
            salaryRange: "$55,000 - $68,000",
            jobDescription:
              "Help create memes, tips, and community content across multiple platforms.",
            requirements: [
              "Sense of humor",
              "Slack product familiarity",
              "Content marketing experience",
              "Understanding of brand tone",
            ],
            timeline: [],
            recruiter: {
              name: "Bryce Thomas",
              role: "Recruiter",
              email: "bryce@slack.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },
          {
            id: 14,
            companyName: "Asana",
            companyLogo: "https://v0.dev/placeholder.svg?height=40&width=40",
            logoBackground: "#fff3e0",
            role: "Social Media Assistant",
            dateApplied: "05 July 2021",
            status: "Hired",
            location: "San Francisco, CA",
            employmentType: "Full-time",
            salaryRange: "$60,000 - $75,000",
            jobDescription:
              "Support the marketing team with social publishing and team productivity campaigns.",
            requirements: [
              "Familiarity with Asana app",
              "Strong collaboration skills",
              "Excellent grammar and voice",
              "Attention to branding",
            ],
            timeline: [],
            recruiter: {
              name: "Maya Patel",
              role: "Talent Recruiter",
              email: "maya@asana.com",
              avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
            },
          },

          // Add more application objects as needed
        ];

        // Update status counts after loading applications
        this.updateStatusCounts();
        this.isLoading = false;
      }, 1000);
    },

    updateStatusCounts() {
      // Count applications by status
      const statusCounts = {
        all: this.applications.length,
      };

      // Count each status
      this.applications.forEach((app) => {
        const statusKey = this.getStatusKey(app.status);
        if (!statusCounts[statusKey]) {
          statusCounts[statusKey] = 0;
        }
        statusCounts[statusKey]++;
      });

      // Update tab counts
      this.statusTabs.forEach((tab) => {
        tab.count = statusCounts[tab.status] || 0;
      });
    },

    getStatusKey(status) {
      // Convert status to key format (lowercase with hyphens)
      return status.toLowerCase().replace(/\s+/g, "-");
    },

    getStatusLabel(statusKey) {
      // Find the tab with the matching status key and return its label
      const tab = this.statusTabs.find((t) => t.status === statusKey);
      return tab ? tab.label : statusKey;
    },

    setActiveTab(tab) {
      this.activeTab = tab;
      this.currentPage = 1; // Reset to first page when changing tabs
    },

    handleSearch() {
      this.currentPage = 1; // Reset to first page when searching
    },

    openApplicationDetails(application) {
      this.selectedApplication = application;
      this.showDetailsModal = true;
      document.body.style.overflow = "hidden";
    },

    closeDetailsModal() {
      this.showDetailsModal = false;
      this.selectedApplication = null;
      document.body.style.overflow = "auto";
    },

    openActionMenu(application) {
      console.log("Action menu for:", application.companyName);
    },

    withdrawApplication() {
      console.log(
        "Withdrawing application for:",
        this.selectedApplication.companyName
      );
      // In a real app, you would call an API to update the application status
      const index = this.applications.findIndex(
        (app) => app.id === this.selectedApplication.id
      );
      if (index !== -1) {
        this.applications[index].status = "Withdrawn";
        this.updateStatusCounts();
      }
      this.closeDetailsModal();
    },

    contactRecruiter() {
      console.log(
        "Contacting recruiter:",
        this.selectedApplication.recruiter.name
      );
      this.closeDetailsModal();
    },
  },
};
</script>

<style scoped>
.applications-container {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .action-buttons {
    width: 100%;
  }
}
</style>
