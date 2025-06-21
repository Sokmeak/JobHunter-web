<template>
  <div class="d-flex">
    <div class="container py-2">
      <div class="container-fluid py-1">
        <!-- Loading and Error States -->
        <div v-if="isLoading" class="text-center">
          <p>Loading dashboard...</p>
        </div>
        <div v-else-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <div v-else>
          <!-- Greeting Section -->
          <GreetingSection
            :user-name="selectedProfile?.name || 'User'"
            :date-range="dateRange"
            @date-range-changed="handleDateRangeChange"
          />

          <div class="row mt-1">
            <div class="row col-md-3">
              <div class="col mb-4">
                <StatCard
                  title="Total Jobs Applied"
                  :value="totalJobsApplied"
                  icon="file-text"
                  icon-color="text-secondary"
                />
              </div>
              <div class="col mb-4">
                <StatCard
                  title="Interviews"
                  :value="interviewedCount"
                  icon="question-circle"
                  icon-color="text-secondary"
                />
              </div>
            </div>

            <div class="col-md-4 mb-4">
              <ApplicationStatusChart :status-data="applicationStatus" />
            </div>

            <div class="col-md-5 mb-4">
              <UpcomingInterviews :interviews="upcomingInterviews" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <RecentApplications
                :applications="recentApplications"
                :max-items="3"
                @view-application="handleViewApplication"
                @edit-application="handleEditApplication"
                @delete-application="handleDeleteApplication"
                @view-all-applications="handleViewAllApplications"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import GreetingSection from "@/components/Applicants/applications/GreetingSection.vue";
import StatCard from "@/components/Applicants/dashboard/StatCard.vue";
import ApplicationStatusChart from "@/components/Applicants/dashboard/ApplicationStatusChart.vue";
import UpcomingInterviews from "@/components/Applicants/dashboard/UpcomingInterviews.vue";
import RecentApplications from "@/components/Applicants/dashboard/RecentApplications.vue";
import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";
import { useApplicationStore } from "@/stores/ApplicantStore/Applications";
import { useRouter } from "vue-router";

export default {
  name: "UserDashboard",
  components: {
    GreetingSection,
    StatCard,
    ApplicationStatusChart,
    UpcomingInterviews,
    RecentApplications,
  },
  setup() {
    const STORAGE_KEYS = {
      DATE_RANGE: "dashboard_date_range_v1",
      DASHBOARD_STATE: "dashboard_state_v1",
    };

    const userProfileStore = useUserProfileStore();
    const applicationStore = useApplicationStore();
    const router = useRouter();

    const saveToStorage = (key, data) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
      }
    };

    const loadFromStorage = (key, defaultValue = null) => {
      try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
      }
    };

    const dateRange = ref({
      start: "15 May 2025",
      end: "30 May 2025",
    });
    const recentApplications = ref([]);
    const applicationStatus = ref([
      { name: "Loading", value: 0, color: "#e5e7eb" },
    ]);
    const upcomingInterviews = ref([]);
    const errorMessage = ref(null);

    const isLoading = computed(() => 
      applicationStore.loading || userProfileStore.loading
    );

    const selectedProfile = computed(() => userProfileStore.selectedProfile);

    const userApplications = computed(() => {
      if (!selectedProfile.value?.userId) return applicationStore.applications;
      return applicationStore.applications.filter(
        (app) => app.userId === selectedProfile.value.userId
      );
    });

    const totalJobsApplied = computed(() => userApplications.value.length);

    const interviewedCount = computed(() =>
      userApplications.value.filter((app) => app.status === "Interviewing").length
    );

    const computeUpcomingInterviews = () => {
      const interviews = [];
      userApplications.value.forEach((app) => {
        const interviewSteps = (app.timeline || []).filter(
          (step) =>
            !step.completed &&
            ["Phone Screening", "Technical Interview", "Interview"].includes(step.title)
        );
        
        interviewSteps.forEach((step) => {
          interviews.push({
            id: app.id,
            time: step.date !== "Pending" ? step.date : "TBD",
            name: app.recruiter?.name || "Unknown",
            position: `${app.recruiter?.role || "Recruiter"} at ${app.companyName || "Unknown"}`,
            avatar: app.recruiter?.avatar || null,
            date: step.date !== "Pending" ? step.date : null,
          });
        });
      });
      return interviews.slice(0, 5);
    };

    watch(
      dateRange,
      (newDateRange) => {
        saveToStorage(STORAGE_KEYS.DATE_RANGE, newDateRange);
        loadDashboardData();
      },
      { deep: true }
    );

    watch(
      () => applicationStore.applications,
      () => {
        loadDashboardData();
      },
      { deep: true }
    );

    const saveDashboardState = () => {
      const dashboardState = {
        totalJobsApplied: totalJobsApplied.value,
        interviewedCount: interviewedCount.value,
        applicationStatus: applicationStatus.value,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEYS.DASHBOARD_STATE, dashboardState);
    };

    const loadDashboardData = async () => {
      try {
        errorMessage.value = null;

        if (!selectedProfile.value) {
          await userProfileStore.fetchProfile();
        }

        if (!applicationStore.applications.length) {
          await applicationStore.fetchApplications();
        }

        recentApplications.value = applicationStore
          .getApplicationsInDateRange(dateRange.value.start, dateRange.value.end)
          .slice(0, 3);

        upcomingInterviews.value = computeUpcomingInterviews();

        const statusData = applicationStore.getStatusCounts();
        applicationStatus.value = [
          {
            name: "Hired",
            value: statusData.hired || 0,
            color: "#4640DE",
            percentage: statusData.percentage?.hired || 0,
          },
          {
            name: "Interviewed",
            value: statusData.interviewed || 0,
            color: "#E9EBFD",
            percentage: statusData.percentage?.interviewed || 0,
          },
        ];

        saveDashboardState();
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        errorMessage.value = "Failed to load dashboard data";
      }
    };

    const handleDateRangeChange = (newDateRange) => {
      if (newDateRange?.start && newDateRange?.end) {
        applicationStore.updateDateRange(newDateRange);
        dateRange.value = { ...newDateRange };
      }
    };

    onMounted(async () => {
      const storedDateRange = loadFromStorage(STORAGE_KEYS.DATE_RANGE);
      if (storedDateRange?.start && storedDateRange?.end) {
        dateRange.value = storedDateRange;
      }
      await loadDashboardData();
    });

    return {
      userProfileStore,
      applicationStore,
      selectedProfile,
      dateRange,
      applicationStatus,
      upcomingInterviews,
      recentApplications,
      totalJobsApplied,
      interviewedCount,
      loadDashboardData,
      handleDateRangeChange,
      errorMessage,
      isLoading,
    };
  },
  methods: {
    async handleViewApplication(application) {
      if (!application?.id) return;
      try {
        await this.applicationStore.fetchApplicationById(application.id);
        await this.$router.push(`/applications/${application.id}`);
      } catch (error) {
        console.error("Error viewing application:", error);
        this.errorMessage = "Failed to view application";
      }
    },
    async handleEditApplication(application) {
      if (!application?.id) return;
      try {
        await this.$router.push(`/applications/${application.id}/edit`);
      } catch (error) {
        console.error("Error editing application:", error);
        this.errorMessage = "Failed to edit application";
      }
    },
    async handleDeleteApplication(application) {
      if (!application?.id || !application?.companyName) return;
      if (
        confirm(
          `Are you sure you want to delete the application for ${application.companyName}?`
        )
      ) {
        try {
          await this.applicationStore.deleteApplication(application.id);
          await this.loadDashboardData();
        } catch (error) {
          console.error("Error deleting application:", error);
          this.errorMessage = "Failed to delete application";
        }
      }
    },
    async handleViewAllApplications() {
      try {
        await this.$router.push("/applications");
      } catch (error) {
        console.error("Error viewing all applications:", error);
        this.errorMessage = "Failed to view applications";
      }
    },
  },
};
</script>

<style scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

body {
  font-family: "Inter", sans-serif;
  background-color: #f8f9fa;
}
</style>