<template>
  <div class="d-flex">
    <div class="container py-2">
      <div class="container-fluid py-1">
        <GreetingSection :user-name="user.name" :date-range="dateRange" />

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
                title="Interviewed"
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
</template>

<script>
import { ref, computed, onMounted } from "vue";
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import GreetingSection from "@/components/Applicants/applications/GreetingSection.vue";
import StatCard from "@/components/Applicants/dashboard/StatCard.vue";
import ApplicationStatusChart from "@/components/Applicants/dashboard/ApplicationStatusChart.vue";
import UpcomingInterviews from "@/components/Applicants/dashboard/UpcomingInterviews.vue";
import RecentApplications from "@/components/Applicants/dashboard/RecentApplications.vue";

// Import shared data
import { 
  applicationsData, 
  getRecentApplications, 
  getStatusCounts 
}  from "@/stores/Applications.js";

export default {
  name: "UserDashboard",
  components: {
    DashboardHeader,
    GreetingSection,
    StatCard,
    ApplicationStatusChart,
    UpcomingInterviews,
    RecentApplications,
  },
  setup() {
    const user = ref({
      name: "Jake",
      email: "jakegyll@email.com",
      fullName: "Jake Gyll",
    });

    const dateRange = ref({
      start: "Jul 19",
      end: "Jul 25",
    });

    const recentApplications = ref([]);
    const applicationStatus = ref([
      { name: "Loading", value: 0, color: "#e5e7eb" }
    ]);

    const upcomingInterviews = ref([
      {
        id: 1,
        time: '10:30 AM',
        name: 'Joe Bartmann',
        position: 'HR Manager at Divvy',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        date: '2025-05-25' 
      },
      {
        id: 2,
        time: '2:00 PM',
        name: 'Sarah Johnson',
        position: 'Tech Lead at StartupCo',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        date: '2025-05-26'
      }
    ]);

    const totalJobsApplied = computed(() => applicationsData.length);

    const interviewedCount = computed(() => {
      return applicationsData.filter(
        (app) => app.status.toLowerCase() === "interviewed" || 
                 app.status.toLowerCase() === "interviewing"
      ).length;
    });

    // Load dashboard data
    const loadDashboardData = () => {
      // Get recent applications (last 3)
      recentApplications.value = getRecentApplications(3);

      // Get status counts for chart
      const statusCounts = getStatusCounts();
      
      // Create chart data with colors
      const chartData = [
        
        { 
          name: "Interviewed", 
          value: statusCounts["interviewed"] || 0, 
          color: "#4640DE" 
        },
        
        { 
          name: "Unsuitable", 
          value: statusCounts["unsuitable"] || 0, 
          color: "#6b7280" 
        }
      ].filter(item => item.value > 0); // Only show statuses with applications
      
      // Ensure we always have at least one item for the chart
      if (chartData.length === 0) {
        applicationStatus.value = [
          { name: "No Applications", value: 1, color: "#e5e7eb" }
        ];
      } else {
        applicationStatus.value = chartData;
      }
    };

    onMounted(() => {
      loadDashboardData();
    });

    return {
      user,
      dateRange,
      applicationStatus,
      upcomingInterviews,
      recentApplications,
      totalJobsApplied,
      interviewedCount,
      loadDashboardData,
    };
  },
  methods: {
    handleViewApplication(application) {
      console.log("View application:", application);
      // Navigate to application details
      this.$router.push(`/applications/${application.id}`);
    },
    handleEditApplication(application) {
      console.log("Edit application:", application);
      // Open edit modal or navigate to edit page
    },
    handleDeleteApplication(application) {
      console.log("Delete application:", application);
      // Show confirmation dialog and delete
      if (confirm(`Are you sure you want to delete the application for ${application.companyName}?`)) {
        // In a real app, you would call an API to delete the application
        const index = applicationsData.findIndex(app => app.id === application.id);
        if (index !== -1) {
          applicationsData.splice(index, 1);
          // Refresh dashboard data
          this.loadDashboardData();
        }
      }
    },
    handleViewAllApplications() {
      console.log("View all applications");
      // Navigate to applications list page
      this.$router.push('/applications');
    },
  },
};
</script>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

body {
  font-family: "Inter", sans-serif;
  background-color: #f8f9fa;
}
</style>