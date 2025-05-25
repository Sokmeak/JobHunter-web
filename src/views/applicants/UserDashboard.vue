<template>
  <div class="d-flex">
    <div class="container py-4">
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
              :max-items="5"
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
import { ref, computed } from "vue";
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import GreetingSection from "@/components/Applicants/applications/GreetingSection.vue";
import StatCard from "@/components/Applicants/dashboard/StatCard.vue";
import ApplicationStatusChart from "@/components/Applicants/dashboard/ApplicationStatusChart.vue";
import UpcomingInterviews from "@/components/Applicants/dashboard/UpcomingInterviews.vue";
import RecentApplications from "@/components/Applicants/dashboard/RecentApplications.vue";

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

    const recentApplications = ref([
      {
        id: 1,
        jobTitle: "Social Media Assistant",
        companyName: "Nomad",
        companyLogo: "https://logo.clearbit.com/nomadlist.com",
        location: "Paris, France",
        jobType: "Full-Time",
        dateApplied: "24 July 2021",
        status: "In Review",
      },
      {
        id: 2,
        jobTitle: "Frontend Developer",
        companyName: "Udacity",
        companyLogo: "https://logo.clearbit.com/udacity.com",
        location: "New York, USA",
        jobType: "Full-Time",
        dateApplied: "23 July 2021",
        status: "Shortlisted",
      },
      {
        id: 3,
        jobTitle: "UI/UX Designer",
        companyName: "Packer",
        companyLogo: "https://logo.clearbit.com/packer.io",
        location: "Madrid, Spain",
        jobType: "Full-Time",
        dateApplied: "22 July 2021",
        status: "Declined",
      },
    ]);

    const applicationStatus = ref([
      { name: "Unsuitable", value: 0, color: "#6610f2" },
      { name: "Interviewed", value: 0, color: "#dee2e6" },
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
    date: '2025-05-26' // Tomorrow's date
  }
])

    const totalJobsApplied = computed(() => recentApplications.value.length);

    const interviewedCount = computed(
      () =>
        recentApplications.value.filter(
          (app) => app.status.toLowerCase() === "interviewed"
        ).length
    );

    return {
      user,
      dateRange,
      applicationStatus,
      upcomingInterviews,
      recentApplications,
      totalJobsApplied,
      interviewedCount,
    };
  },
  methods: {
    handleViewApplication(application) {
      console.log("View application:", application);
      // Navigate to application details
    },
    handleEditApplication(application) {
      console.log("Edit application:", application);
      // Open edit modal or navigate to edit page
    },
    handleDeleteApplication(application) {
      console.log("Delete application:", application);
      // Show confirmation dialog and delete
    },
    handleViewAllApplications() {
      console.log("View all applications");
      // Navigate to applications list page
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
