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
        :applications="paginatedApplications"
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

// Import shared data
import { 
  applicationsData, 
  getApplicationsByStatus, 
  getStatusCounts, 
  searchApplications 
} from "@/stores/ApplicantStore/Applications.js";
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
      showBanner: true,
      selectedApplication: null,
      statusTabs: [
        { status: "all", label: "All", count: 0 },
        { status: "in-review", label: "In Review", count: 0 },
        { status: "interviewing", label: "Interviewing", count: 0 },
        { status: "shortlisted", label: "Shortlisted", count: 0 },
        { status: "interviewed", label: "Interviewed", count: 0 },
        { status: "assessment", label: "Assessment", count: 0 },
        { status: "offered", label: "Offered", count: 0 },
        { status: "hired", label: "Hired", count: 0 },
        { status: "declined", label: "Declined", count: 0 },
        { status: "unsuitable", label: "Unsuitable", count: 0 },
      ],
      applications: [],
    };
  },
  computed: {
    filteredApplications() {
      let filtered = this.applications;

      // Filter by active tab
      if (this.activeTab !== "all") {
        filtered = getApplicationsByStatus(this.activeTab);
      }

      // Filter by search query
      if (this.searchQuery.trim() !== "") {
        filtered = searchApplications(this.searchQuery).filter(app => {
          if (this.activeTab === "all") return true;
          
          const statusMap = {
            "in-review": "In Review",
            "interviewing": "Interviewing",
            "shortlisted": "Shortlisted", 
            "interviewed": "Interviewed",
            "assessment": "Assessment",
            "offered": "Offered",
            "hired": "Hired",
            "declined": "Declined",
            "unsuitable": "Unsuitable",
          };
          
          return app.status === statusMap[this.activeTab];
        });
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
        // Use shared data instead of hardcoded data
        this.applications = [...applicationsData];
        
        // Update status counts after loading applications
        this.updateStatusCounts();
        this.isLoading = false;
      }, 1000);
    },

    updateStatusCounts() {
      // Get counts from shared data utility
      const statusCounts = getStatusCounts();
      
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
        
        // Also update the shared data
        const sharedIndex = applicationsData.findIndex(
          (app) => app.id === this.selectedApplication.id
        );
        if (sharedIndex !== -1) {
          applicationsData[sharedIndex].status = "Withdrawn";
        }
        
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