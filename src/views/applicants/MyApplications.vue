<template>
  <div class="applications-container">
    <GreetingSection
      :user-name="selectedProfile?.name || 'User'"
      :date-range="dateRange"
      @dateRangeChanged="handleDateRangeChange"
    />

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
      @update:activeTab="setActiveTab"
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

      <!-- Loading and Error States -->
      <div
        v-if="applicationStore.loading || userProfileStore.loading"
        class="text-center"
      >
        <LoadingSpinner />
      </div>
      <div
        v-else-if="applicationStore.error || userProfileStore.error"
        class="alert alert-danger"
      >
        {{ applicationStore.error || userProfileStore.error }}
      </div>
      <div v-else>
        <!-- Applications Table Component -->
        <ApplicationsTable
          :applications="paginatedApplications"
          @view-application="openApplicationDetails"
          @action-menu="openActionMenu"
        />
        <!-- Empty State -->
        <EmptyState
          v-if="paginatedApplications.length === 0"
          :message="emptyStateMessage"
          icon="briefcase"
        />
      </div>

      <!-- Pagination Component -->
      <Pagination
        v-if="filteredApplications.length > 0"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:page="currentPage = $event"
      />

      <!-- Application Details Modal Component -->
      <ApplicationDetailsModal
        v-if="showDetailsModal"
        :application="selectedApplication"
        @close="closeDetailsModal"
        @withdraw="withdrawApplication"
        @contact="contactRecruiter"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { parse, isAfter, addDays } from "date-fns";
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
import { useApplicationStore } from "@/stores/ApplicantStore/Applications";
import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";

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
  setup() {
    // Use Pinia stores
    const applicationStore = useApplicationStore();
    const userProfileStore = useUserProfileStore();

    // Reactive state
    const dateRange = ref({
      start: "15 May 2025",
      end: "30 May 2025",
    });
    const activeTab = ref("all");
    const searchQuery = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(5);
    const showDetailsModal = ref(false);
    const showFilters = ref(false);
    const showBanner = ref(true);
    const selectedApplication = ref(null);

    // Status tabs aligned with useApplicationStore statuses
    const statusTabs = ref([
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
    ]);

    // Computed properties
    const selectedProfile = computed(() => userProfileStore.selectedProfile);
    const userApplications = computed(() =>
      applicationStore.applications.filter(
        (app) => app.userId === userProfileStore.defaultUserId
      )
    );

    const filteredApplications = computed(() => {
      let filtered = userApplications.value;

      // Filter by date range
      filtered = applicationStore.getApplicationsInDateRange(
        dateRange.value.start,
        dateRange.value.end
      );

      // Filter by active tab
      if (activeTab.value !== "all") {
        filtered = applicationStore.getApplicationsByStatus(activeTab.value);
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        filtered = applicationStore.searchApplications(searchQuery.value);
        if (activeTab.value !== "all") {
          const statusMap = {
            "in-review": "In Review",
            interviewing: "Interviewing",
            shortlisted: "Shortlisted",
            interviewed: "Interviewed",
            assessment: "Assessment",
            offered: "Offered",
            hired: "Hired",
            declined: "Declined",
            unsuitable: "Unsuitable",
          };
          filtered = filtered.filter(
            (app) => app.status === statusMap[activeTab.value]
          );
        }
      }

      return filtered;
    });

    const paginatedApplications = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredApplications.value.slice(start, end);
    });

    const totalPages = computed(() =>
      Math.ceil(filteredApplications.value.length / itemsPerPage.value)
    );

    const emptyStateMessage = computed(() => {
      if (activeTab.value !== "all") {
        return `You don't have any applications with "${getStatusLabel(
          activeTab.value
        )}" status.`;
      } else if (searchQuery.value) {
        return "No applications match your search criteria.";
      } else {
        return "You haven't applied to any jobs in this period.";
      }
    });

    // Methods
    const loadData = async () => {
      try {
        await Promise.all([
          userProfileStore.fetchProfileByUserId(userProfileStore.defaultUserId),
          applicationStore.fetchApplications(),
        ]);
        updateStatusCounts();
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    const updateStatusCounts = () => {
      const statusCounts = applicationStore.getStatusCounts();
      statusTabs.value.forEach((tab) => {
        tab.count = statusCounts[tab.status] || 0;
      });
    };

    const getStatusLabel = (statusKey) => {
      const tab = statusTabs.value.find((t) => t.status === statusKey);
      return tab ? tab.label : statusKey;
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      currentPage.value = 1; // Reset to first page
    };

    const handleSearch = () => {
      currentPage.value = 1; // Reset to first page
    };

    const handleDateRangeChange = (newDateRange) => {
      applicationStore.updateDateRange(newDateRange);
      dateRange.value = { ...newDateRange };
      currentPage.value = 1;
    };

    const openApplicationDetails = async (application) => {
      await applicationStore.fetchApplicationById(application.id);
      selectedApplication.value = applicationStore.selectedApplication;
      showDetailsModal.value = true;
      document.body.style.overflow = "hidden";
    };

    const closeDetailsModal = () => {
      showDetailsModal.value = false;
      selectedApplication.value = null;
      document.body.style.overflow = "auto";
    };

    const openActionMenu = (application) => {
      console.log("Action menu for:", application.companyName);
      // Implement action menu logic (e.g., open dropdown)
    };

    const withdrawApplication = async () => {
      if (!selectedApplication.value) return;
      try {
        await applicationStore.updateApplication(selectedApplication.value.id, {
          ...selectedApplication.value,
          status: "Withdrawn",
        });
        updateStatusCounts();
        closeDetailsModal();
      } catch (err) {
        console.error("Error withdrawing application:", err);
      }
    };

    const contactRecruiter = () => {
      if (selectedApplication.value) {
        console.log(
          "Contacting recruiter:",
          selectedApplication.value.recruiter.name
        );
        // Implement contact logic (e.g., open email client)
        window.location.href = `mailto:${selectedApplication.value.recruiter.email}`;
      }
      closeDetailsModal();
    };

    // Initialize
    onMounted(loadData);

    return {
      userProfileStore,
      applicationStore,
      selectedProfile,
      dateRange,
      activeTab,
      searchQuery,
      currentPage,
      itemsPerPage,
      showDetailsModal,
      showFilters,
      showBanner,
      selectedApplication,
      statusTabs,
      filteredApplications,
      paginatedApplications,
      totalPages,
      emptyStateMessage,
      setActiveTab,
      handleSearch,
      handleDateRangeChange,
      openApplicationDetails,
      closeDetailsModal,
      openActionMenu,
      withdrawApplication,
      contactRecruiter,
    };
  },
};
</script>

<style scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

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

.alert-danger {
  margin: 20px 0;
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
    flex-wrap: wrap;
  }
}
</style>
