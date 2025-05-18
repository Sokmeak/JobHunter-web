<template>
  <div class="d-flex">
    <div class="flex-grow-1 vh-100 overflow-auto">
      <DashboardHeader title="Dashboard" />

      <div class="container-fluid py-4">
        <GreetingSection :user-name="user.name" :date-range="dateRange" />

        <div class="row mt-4">
          <div class="col-md-3">
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

          <div class="col-md-5 mb-4">
            <ApplicationStatusChart :status-data="applicationStatus" />
          </div>

          <div class="col-md-4 mb-4">
            <UpcomingInterviews :interviews="upcomingInterviews" />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-12">
            <ApplicationHistory :applications="recentApplications" />
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
import ApplicationHistory from "@/components/Applicants/dashboard/ApplicationHistory.vue";

export default {
  name: "UserDashboard",
  components: {
    DashboardHeader,
    GreetingSection,
    StatCard,
    ApplicationStatusChart,
    UpcomingInterviews,
    ApplicationHistory,
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
        position: "Social Media Assistant",
        company: "Nomad",
        location: "Paris, France",
        type: "Full-Time",
        dateApplied: "2021-07-24",
        status: "In Review",
        statusClass: "warning",
        logoColor: "success",
      },
      {
        id: 2,
        position: "Social Media Assistant",
        company: "Udacity",
        location: "New York, USA",
        type: "Full-Time",
        dateApplied: "2021-07-23",
        status: "Shortlisted",
        statusClass: "primary",
        logoColor: "primary",
      },
      {
        id: 3,
        position: "Social Media Assistant",
        company: "Packer",
        location: "Madrid, Spain",
        type: "Full-Time",
        dateApplied: "2021-07-22",
        status: "Declined",
        statusClass: "danger",
        logoColor: "danger",
      },
    ]);

    const applicationStatus = ref([
      { name: "Unsuitable", value: 0, color: "#6610f2" },
      { name: "Interviewed", value: 0, color: "#dee2e6" },
    ]);

    const upcomingInterviews = ref([
      { time: "10:00 AM", isEmpty: true },
      {
        time: "10:30 AM",
        isEmpty: false,
        interviewer: {
          name: "Joe Bartmann",
          position: "HR Manager at Divvy",
        },
      },
      { time: "11:00 AM", isEmpty: true },
    ]);

    const totalJobsApplied = computed(() => recentApplications.value.length);

    const interviewedCount = computed(() =>
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
