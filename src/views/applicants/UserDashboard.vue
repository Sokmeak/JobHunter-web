<template>
  <div class="d-flex">
    <div class="container py-2">
      <div class="container-fluid py-1">
        <!-- Loading and Error States -->
        <div
          v-if="applicationStore.loading || userProfileStore.loading"
          class="text-center"
        >
          <p>Loading dashboard...</p>
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
import { ref, computed, onMounted, watch } from "vue";
import GreetingSection from "@/components/Applicants/applications/GreetingSection.vue";
import StatCard from "@/components/Applicants/dashboard/StatCard.vue";
import ApplicationStatusChart from "@/components/Applicants/dashboard/ApplicationStatusChart.vue";
import UpcomingInterviews from "@/components/Applicants/dashboard/UpcomingInterviews.vue";
import RecentApplications from "@/components/Applicants/dashboard/RecentApplications.vue";
import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";
import { useApplicationStore } from "@/stores/ApplicantStore/Applications";

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
    // Use Pinia stores
    const userProfileStore = useUserProfileStore();
    const applicationStore = useApplicationStore();

    // Reactive state
    const dateRange = ref({
      start: "15 May 2025",
      end: "30 May 2025",
    });
    const recentApplications = ref([]);
    const applicationStatus = ref([
      { name: "Loading", value: 0, color: "#e5e7eb" },
    ]);
    const upcomingInterviews = ref([]);
    const selectedUserId = ref(userProfileStore.defaultUserId);

    // Computed properties
    const userProfiles = computed(() => userProfileStore.userProfiles);
    const selectedProfile = computed(() => userProfileStore.selectedProfile);

    const userApplications = computed(() =>
      applicationStore.applications.filter(
        (app) => app.userId === selectedUserId.value
      )
    );

    const totalJobsApplied = ref(0);
    const interviewedCount = ref(0);

    // Derive upcoming interviews from application timelines
    const computeUpcomingInterviews = () => {
      const interviews = [];
      userApplications.value.forEach((app) => {
        const interviewSteps = app.timeline.filter(
          (step) =>
            !step.completed &&
            ["Phone Screening", "Technical Interview", "Interview"].includes(
              step.title
            )
        );
        interviewSteps.forEach((step) => {
          interviews.push({
            id: app.id,
            time: step.date !== "Pending" ? step.date : "TBD",
            name: app.recruiter.name,
            position: `${app.recruiter.role} at ${app.companyName}`,
            avatar: app.recruiter.avatar,
            date: step.date !== "Pending" ? step.date : null,
          });
        });
      });
      return interviews.slice(0, 5); // Limit to 5 upcoming interviews
    };

    // Watchers
    watch(
      dateRange,
      () => {
        loadDashboardData();
      },
      { deep: true }
    );

    watch(selectedUserId, () => {
      loadDashboardData();
    });

    watch(
      () => applicationStore.applications,
      () => {
        loadDashboardData();
      },
      { deep: true }
    );

    // Load dashboard data
    const loadDashboardData = async () => {
      try {
        // Fetch profiles if not loaded
        if (!userProfiles.value.length) {
          await userProfileStore.fetchAllProfiles();
        }

        // Fetch profile for selected user
        if (
          !selectedProfile.value ||
          selectedProfile.value.userId !== selectedUserId.value
        ) {
          await userProfileStore.fetchProfileByUserId(selectedUserId.value);
        }

        // Fetch applications if not loaded
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

        // Update total jobs applied and interviewed count
        totalJobsApplied.value = applicationStore.getApplicationsInDateRange(
          dateRange.value.start,
          dateRange.value.end
        ).length;

        interviewedCount.value = applicationStore
          .getApplicationsInDateRange(
            dateRange.value.start,
            dateRange.value.end
          )
          .filter((app) => ["Interviewing"].includes(app.status)).length;

        // Update upcoming interviews
        upcomingInterviews.value = computeUpcomingInterviews();

        // Get status counts for chart
        const statusData = applicationStore.getStatusCounts();
        const chartData = [
          {
            name: "Hired",
            value: statusData.hired || 0,
            color: "#4640DE",
            percentage: statusData.percentage.hired || 0,
          },
          {
            name: "Interviewed",
            value: statusData.interviewed || 0,
            color: "#E9EBFD",
            percentage: statusData.percentage.interviewed || 0,
          },
        ];
        applicationStatus.value = chartData;
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        applicationStore.error = "Failed to load dashboard data";
      }
    };

    // Handle date range changes
    const handleDateRangeChange = (newDateRange) => {
      applicationStore.updateDateRange(newDateRange);
      dateRange.value = { ...newDateRange };
    };

    // Handle user profile change
    const handleUserChange = async (userId) => {
      selectedUserId.value = userId;
      await userProfileStore.fetchProfileByUserId(userId);
      loadDashboardData();
    };

    // Clear stored data
    const clearStoredData = () => {
      selectedUserId.value = userProfileStore.defaultUserId;
      applicationStore.init();
      userProfileStore.init();
      loadDashboardData();
    };

    // Initialize on mount
    onMounted(async () => {
      await loadDashboardData();
    });

    return {
      userProfileStore,
      applicationStore,
      userProfiles,
      selectedProfile,
      selectedUserId,
      dateRange,
      applicationStatus,
      upcomingInterviews,
      recentApplications,
      totalJobsApplied,
      interviewedCount,
      loadDashboardData,
      handleDateRangeChange,
      handleUserChange,
      clearStoredData,
    };
  },
  methods: {
    async handleViewApplication(application) {
      await this.applicationStore.fetchApplicationById(application.id);
      this.$router.push(`/applications/${application.id}`);
    },
    async handleEditApplication(application) {
      this.$router.push(`/applications/${application.id}/edit`);
    },
    async handleDeleteApplication(application) {
      if (
        confirm(
          `Are you sure you want to delete the application for ${application.companyName}?`
        )
      ) {
        await this.applicationStore.deleteApplication(application.id);
        await this.loadDashboardData();
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

body {
  font-family: "Inter", sans-serif;
  background-color: #f8f9fa;
}
</style>