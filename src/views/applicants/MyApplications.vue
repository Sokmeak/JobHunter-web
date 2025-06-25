<template>
  <div class="applications-container">
    <GreetingSection
      :user-name="selectedProfile?.name || 'User'"
      :date-range="dateRange"
      @dateRangeChanged="handleDateRangeChange"
    />

    <ApplicationBanner
      v-if="showBanner"
      :show="showBanner"
      title="New Feature"
      message="You can request a follow-up 7 days after applying for a job if the application status is in review. Only one follow-up is allowed per job."
      @close="showBanner = false"
    />

    <StatusTabs
      :tabs="statusTabs"
      :active-tab="activeTab"
      @update:activeTab="setActiveTab"
    />

    <div class="content-section">
      <div class="header-section">
        <h1 class="section-title">Applications History</h1>
        <div class="action-buttons">
          <SearchInput v-model="searchQuery" @input="handleSearch" />
          <FilterButton @click="showFilters = !showFilters" />
        </div>
      </div>

      <div v-if="showFilters" class="filters-section">
        <!-- Add filter inputs if needed -->
      </div>

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
        <ApplicationsTable
          :applications="paginatedApplications"
          @view-application="openApplicationDetails"
          @action-menu="openActionMenu"
          @follow-up="requestFollowUp"
        />
        <EmptyState
          v-if="paginatedApplications.length === 0"
          :message="emptyStateMessage"
          icon="briefcase"
        />
      </div>

      <Pagination
        v-if="filteredApplications.length > itemsPerPage"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:page="currentPage = $event"
      />

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
import { parseISO, isAfter, addDays } from "date-fns";
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
    const applicationStore = useApplicationStore();
    const userProfileStore = useUserProfileStore();

    const dateRange = ref({
      start: "2025-06-01",
      end: "2025-06-30",
    });
    const activeTab = ref("all");
    const searchQuery = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(5);
    const showDetailsModal = ref(false);
    const showFilters = ref(false);
    const showBanner = ref(true);
    const selectedApplication = ref(null);
    const actionMenuApplication = ref(null);

    const statusTabs = ref([
      { status: "all", label: "All", count: 0 },
      { status: "submitted", label: "Submitted", count: 0 },
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

    const selectedProfile = computed(() => userProfileStore.selectedProfile);
    const userApplications = computed(() =>
      applicationStore.applications
        .filter((app) => app.user_id === userProfileStore.defaultUserId)
        .map((app) => ({
          ...app,
          companyName: app.job?.CompanyName || app.companyName,
          jobTitle: app.job?.title || app.jobTitle,
          dateApplied: app.createdAt || app.dateApplied,
          companyLogo: app.job?.CompanyLogo || app.companyLogo,
          recruiter: app.recruiter || { name: "Unknown", email: "" },
        }))
    );

    const filteredApplications = computed(() => {
      let filtered = userApplications.value;

      filtered = applicationStore.getApplicationsInDateRange(
        dateRange.value.start,
        dateRange.value.end
      );

      if (activeTab.value !== "all") {
        filtered = filtered.filter(
          (app) =>
            app.status.toLowerCase() === activeTab.value.replace("-", " ")
        );
      }

      if (searchQuery.value.trim()) {
        filtered = applicationStore.searchApplications(searchQuery.value);
      }

      console.log("Filtered applications:", filtered);
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
      if (searchQuery.value) {
        return "No applications match your search criteria.";
      }
      if (activeTab.value !== "all") {
        return `You don't have any applications with "${getStatusLabel(
          activeTab.value
        )}" status.`;
      }
      return "You haven't applied to any jobs in this period.";
    });

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
      console.log("Updated status counts:", statusTabs.value);
    };

    const getStatusLabel = (statusKey) => {
      const tab = statusTabs.value.find((t) => t.status === statusKey);
      return tab
        ? tab.label
        : statusKey.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      currentPage.value = 1;
      updateStatusCounts();
    };

    const handleSearch = () => {
      currentPage.value = 1;
    };

    const handleDateRangeChange = (newDateRange) => {
      applicationStore.updateDateRange(newDateRange);
      dateRange.value = { ...newDateRange };
      currentPage.value = 1;
      updateStatusCounts();
    };

    const openApplicationDetails = async (application) => {
      try {
        await applicationStore.fetchApplication(application.id);
        selectedApplication.value = {
          ...applicationStore.selectedApplication,
          companyName: applicationStore.selectedApplication.job?.CompanyName,
          jobTitle: applicationStore.selectedApplication.job?.title,
          dateApplied: applicationStore.selectedApplication.createdAt,
          companyLogo: applicationStore.selectedApplication.job?.CompanyLogo,
          recruiter: applicationStore.selectedApplication.recruiter || {
            name: "Unknown",
            email: "",
          },
        };
        showDetailsModal.value = true;
        document.body.style.overflow = "hidden";
      } catch (err) {
        console.error("Error fetching application details:", err);
      }
    };

    const closeDetailsModal = () => {
      showDetailsModal.value = false;
      selectedApplication.value = null;
      document.body.style.overflow = "auto";
    };

    const openActionMenu = (application) => {
      actionMenuApplication.value = application;
      console.log("Action menu opened for:", application.jobTitle);
    };

    const canRequestFollowUp = (application) => {
      if (!application || application.status !== "In Review") return false;
      const appliedDate = parseISO(application.dateApplied);
      const sevenDaysAfter = addDays(appliedDate, 7);
      return (
        isAfter(new Date(), sevenDaysAfter) && !application.followUpRequested
      );
    };

    const requestFollowUp = async (application) => {
      if (!application || !canRequestFollowUp(application)) return;
      try {
        await applicationStore.updateApplication(application.id, {
          ...application,
          followUpRequested: true,
        });
        console.log("Follow-up requested for:", application.jobTitle);
        actionMenuApplication.value = null;
      } catch (err) {
        console.error("Error requesting follow-up:", err);
      }
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
      if (selectedApplication.value?.recruiter?.email) {
        window.location.href = `mailto:${selectedApplication.value.recruiter.email}`;
      }
      closeDetailsModal();
    };

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
      requestFollowUp,
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
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.filters-section {
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.alert-danger {
  margin: 20px 0;
  padding: 16px;
  border-radius: 8px;
}

.content-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .applications-container {
    padding: 16px;
  }

  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .action-buttons {
    width: 100%;
    flex-wrap: wrap;
    gap: 8px;
  }

  .content-section {
    padding: 16px;
  }
}
</style>
