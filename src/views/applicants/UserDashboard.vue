<template>
  <div class="d-flex">
    <div class="container py-2">
      <div class="container-fluid py-1">
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
          <!-- Greeting Section -->
          <GreetingSection
            :user-name="selectedProfile?.name || 'User'"
            :date-range="dateRange"
            @dateRangeChanged="handleDateRangeChange"
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
import { ref, computed, onMounted } from "vue";

import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";
import { useApplicationStore } from "@/stores/ApplicantStore/Applications";
import { useRouter } from "vue-router";
import GreetingSection from "@/components/Applicants/applications/GreetingSection.vue";
import StatCard from "@/components/Admin/Dashboard/StatCard.vue";
import ApplicationStatusChart from "@/components/Applicants/dashboard/ApplicationStatusChart.vue";
import UpcomingInterviews from "@/components/Applicants/dashboard/UpcomingInterviews.vue";
import RecentApplications from "@/components/Applicants/dashboard/RecentApplications.vue";
import LoadingSpinner from "@/components/Applicants/comon/LoadingSpinner.vue";

export default {
  name: "UserDashboard",
  components: {
    GreetingSection,
    StatCard,
    ApplicationStatusChart,
    UpcomingInterviews,
    RecentApplications,
    LoadingSpinner,
  },
  setup() {
    // LocalStorage keys with versioning
    const STORAGE_KEYS = {
      DATE_RANGE: "dashboard_date_range_v1",
      DASHBOARD_STATE: "dashboard_state_v1",
    };

    // Use Pinia stores and router
    const userProfileStore = useUserProfileStore();
    const applicationStore = useApplicationStore();
    const router = useRouter();

    // LocalStorage utility functions
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

    // Reactive state
    const dateRange = ref({
      start: "2025-05-15", // Standardized to yyyy-MM-dd
      end: "2025-07-30",
    });
    const recentApplications = ref([]);
    const applicationStatus = ref([]);
    const upcomingInterviews = ref([]);

    // Computed properties
    const selectedProfile = computed(() => userProfileStore.selectedProfile);

    const userApplications = computed(() => {
      // Assume all applications belong to the authenticated user
      return applicationStore.applications || [];
    });

    const totalJobsApplied = computed(() => userApplications.value.length);

    const interviewedCount = computed(
      () =>
        userApplications.value.filter((app) =>
          ["Interviewing", "Interviewed"].includes(app.status)
        ).length
    );

    // Derive upcoming interviews from application timelines
    const computeUpcomingInterviews = () => {
      const interviews = [];
      userApplications.value.forEach((app) => {
        const interviewSteps =
          app.timeline?.filter(
            (step) =>
              !step.completed &&
              ["Phone Screening", "Technical Interview", "Interview"].includes(
                step.title
              )
          ) || [];
        interviewSteps.forEach((step) => {
          interviews.push({
            id: app.id,
            time: step.date !== "Pending" ? step.date : "TBD",
            name: app.recruiter?.name || "Unknown",
            position: `${app.recruiter?.role || "Recruiter"} at ${
              app.companyName
            }`,
            avatar: app.recruiter?.avatar || null,
            date: step.date !== "Pending" ? step.date : null,
          });
        });
      });
      return interviews.slice(0, 5); // Limit to 5 upcoming interviews
    };

    // Save dashboard state
    const saveDashboardState = () => {
      const dashboardState = {
        totalJobsApplied: totalJobsApplied.value,
        interviewedCount: interviewedCount.value,
        applicationStatus: applicationStatus.value,
        lastUpdated: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEYS.DASHBOARD_STATE, dashboardState);
    };

    // Load dashboard data
    const loadDashboardData = async () => {
      try {
        // Check authentication
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        // Fetch profile if not loaded
        if (!selectedProfile.value) {
          await userProfileStore.fetchProfile();
        }

        // Fetch applications only if empty
        if (!applicationStore.applications.length) {
          await applicationStore.fetchApplications();
        }

        // Filter applications by date range
        recentApplications.value = applicationStore
          .getApplicationsInDateRange(
            dateRange.value.start,
            dateRange.value.end
          )
          .slice(0, 3);

        console.log("Recent Applications:", recentApplications.value);
        

        // Update upcoming interviews
        upcomingInterviews.value = computeUpcomingInterviews();

        // Get status counts for chart
        const statusData = applicationStore.getStatusCounts();
        const chartData = [
          {
            name: "Hired",
            value: statusData.hired || 0,
            color: "#4640DE",
            percentage: statusData.percentage?.hired || 0,
          },
          {
            name: "Interviewed/Interviewing",
            value:
              (statusData.interviewed || 0) + (statusData.interviewing || 0),
            color: "#E9EBFD",
            percentage:
              (statusData.percentage?.interviewed || 0) +
              (statusData.percentage?.interviewing || 0),
          },
        ];
        applicationStatus.value = chartData;
        saveDashboardState();
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        applicationStore.error = err.message || "Failed to load dashboard data";
      }
    };

    // Handle date range changes
    const handleDateRangeChange = (newDateRange) => {
      dateRange.value = { ...newDateRange };
      applicationStore.updateDateRange(newDateRange);
      loadDashboardData();
    };

    // Initialize on mount
    onMounted(async () => {
      const storedDateRange = loadFromStorage(
        STORAGE_KEYS.DATE_RANGE,
        dateRange.value
      );
      dateRange.value = {
        start: storedDateRange.start || "2025-05-15",
        end: storedDateRange.end || "2025-05-30",
      };
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
    };
  },
  methods: {
    async handleViewApplication(application) {
      try {
        await this.applicationStore.fetchApplication(application.id);
        this.$router.push(`/applications/${application.id}`);
      } catch (err) {
        console.error("Error fetching application:", err);
        this.applicationStore.error = "Failed to load application details";
      }
    },
    async handleEditApplication(application) {
      console.log("Edit application:", application);
      this.$router.push(`/applications/${application.id}/edit`);
    },
    async handleDeleteApplication(application) {
      if (
        confirm(
          `Are you sure you want to delete the application for ${application.companyName}?`
        )
      ) {
        try {
          await this.applicationStore.deleteApplication(application.id);
          await this.loadDashboardData();
        } catch (err) {
          console.error("Error deleting application:", err);
          this.applicationStore.error = "Failed to delete application";
        }
      }
    },
    async handleViewAllApplications() {
      this.$router.push("/applications");
    },
  },
};
</script>
<style scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

.d-flex {
  display: flex;
  justify-content: center;
}

.container {
  max-width: 1200px;
}

.container-fluid {
  padding: 0;
}

.alert-danger {
  margin: 20px 0;
}

@media (max-width: 768px) {
  .row.col-md-3 {
    flex-direction: column;
  }
}
</style>
