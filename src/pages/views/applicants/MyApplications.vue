<template>
  <div class="d-flex">
    <SidebarNavigation />
    <div class="flex-grow-1 p-3">
      <DashboardHeader @goBack="handleGoBack" />
      <h2 class="mt-3">Keep it up, Jake</h2>
      <p>Here is job applications status from July 19 - July 25.</p>
      <FeatureBanner />
      <ApplicationsTabs :tabs="tabs" :activeTab.sync="activeTab" />
      <div class="d-flex justify-content-end gap-2 mt-3">
        <input
          type="text"
          class="form-control w-25"
          placeholder="Search"
          v-model="searchQuery"
        />
        <button class="btn btn-outline-primary" @click="applyFilter">Filter</button>
      </div>
      <ApplicationsTable :applications="filteredApplications" />
      <ApplicationsPagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @changePage="changePage"
      />
    </div>
  </div>
</template>

<script>
import FeatureBanner from "@/components/Applicants/applications/FeatureBanner.vue";
import ApplicationsTabs from "@/components/Applicants/applications/ApplicationsTabs.vue";
import ApplicationsTable from "@/components/Applicants/applications/ApplicationsTable.vue";
import ApplicationsPagination from "@/components/Applicants/applications/ApplicationsPagination.vue";
import SidebarNavigation from "@/components/Applicants/layout/SidebarNavigation.vue";
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";

export default {
  name: "ApplicationsPage",
  components: {
    SidebarNavigation,
    DashboardHeader,
    FeatureBanner,
    ApplicationsTabs,
    ApplicationsTable,
    ApplicationsPagination,
  },
  data() {
    return {
      tabs: [
        { label: "All", count: 45 },
        { label: "In Review", count: 34 },
        { label: "Interviewing", count: 18 },
        { label: "Assessment", count: 5 },
        { label: "Offered", count: 2 },
        { label: "Hired", count: 1 },
      ],
      activeTab: "All",
      searchQuery: "",
      applications: [
        {
          company: "Nomad",
          role: "Social Media Assistant",
          date: "2021-07-24",
          status: "In Review",
        },
        {
          company: "Udacity",
          role: "Social Media Assistant",
          date: "2021-07-20",
          status: "Shortlisted",
        },
        {
          company: "Packer",
          role: "Social Media Assistant",
          date: "2021-07-16",
          status: "Offered",
        },
        {
          company: "Divvy",
          role: "Social Media Assistant",
          date: "2021-07-14",
          status: "Interviewing",
        },
        {
          company: "DigitalOcean",
          role: "Social Media Assistant",
          date: "2021-07-10",
          status: "Unsuitable",
        },
      ],
      currentPage: 1,
      totalPages: 5,
    };
  },
  computed: {
    filteredApplications() {
      return this.applications;
    },
  },
  methods: {
    handleGoBack() {
      // Navigation logic
    },
    applyFilter() {
      // Filtering logic
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>
