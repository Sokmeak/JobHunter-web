<template>
  <div class="d-flex">
    <!-- <SidebarNavigation :activeItem="'My Applications'" /> -->
      <div class="main-content">
        <DashboardHeader title="My Application" />
        <ApplicationHeader :userName="'Jake'" :dateRange="'Jul 19 - Jul 25'" />
        <NotificationCard />
        <StatusTabs :tabs="statusTabs" />

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Applications History</h5>
          <div class="d-flex">
            <div class="input-group me-2">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0"
                placeholder="Search"
              />
            </div>
            <button class="btn btn-outline-secondary d-flex align-items-center">
              <i class="bi bi-funnel me-2"></i> Filter
            </button>
          </div>
        </div>

        <ApplicationsTable :applications="applications" />
        <Pagination :currentPage="1" :totalPages="33" />
      </div>
    </div>
</template>

<script>
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import ApplicationHeader from "@/components/Applicants/applications/ApplicationHeader.vue";
import NotificationCard from "@/components/Applicants/applications/NotificationCard.vue";
import StatusTabs from "@/components/Applicants/applications/StatusTabs.vue";
import ApplicationsTable from "@/components/Applicants/applications/ApplicationsTable.vue";
import Pagination from "@/components/Applicants/applications/Pagination.vue";

export default {
  name: "ApplicationsHistory",
  components: {
    DashboardHeader,
    ApplicationHeader,
    NotificationCard,
    StatusTabs,
    ApplicationsTable,
    Pagination,
  },
  data() {
    return {
      statusTabs: [
        { name: "All", count: 45, active: true },
        { name: "In Review", count: 34, active: false },
        { name: "Interviewing", count: 18, active: false },
        { name: "Assessment", count: 5, active: false },
        { name: "Offered", count: 2, active: false },
        { name: "Hired", count: 1, active: false },
      ],
      applications: [
        {
          id: 1,
          company: { name: "Nomad", logo: "N" },
          role: "Social Media Assistant",
          dateApplied: "24 July 2021",
          status: "In Review",
        },
        {
          id: 2,
          company: { name: "Udacity", logo: "U" },
          role: "Social Media Assistant",
          dateApplied: "20 July 2021",
          status: "Shortlisted",
        },
        {
          id: 3,
          company: { name: "Packer", logo: "P" },
          role: "Social Media Assistant",
          dateApplied: "16 July 2021",
          status: "Offered",
        },
        {
          id: 4,
          company: { name: "Divvy", logo: "D" },
          role: "Social Media Assistant",
          dateApplied: "14 July 2021",
          status: "Interviewing",
        },
        {
          id: 5,
          company: { name: "DigitalOcean", logo: "DO" },
          role: "Social Media Assistant",
          dateApplied: "10 July 2021",
          status: "Unsuitable",
        },
      ],
    };
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100%;
  background-color: #f5f6f8;
}

.main-wrapper {
  display: flex;
  flex-direction: column;
}

.main-content {
  padding: 25px 30px;
  background-color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
