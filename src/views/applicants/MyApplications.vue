<template>
  <div class="my-applications-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <h2 class="greeting">Keep it up, Jake</h2>
        <p class="subtitle">Here is job applications status from July 19 - July 25.</p>
      </div>
      <div class="date-range">
        <span class="date-text">Jul 19 - Jul 25</span>
        <i class="bi bi-calendar3"></i>
      </div>
    </div>

    <!-- Feature Banner -->
    <ApplicationBanner
      :show="showBanner"
      title="New Feature"
      message="You can request a follow-up 7 days after applying for a job if the application status is in review. Only one follow-up is allowed per job."
      @close="showBanner = false"
    />

    <!-- Status Tabs -->
    <StatusTabs
      :tabs="statusTabs"
      :active-tab="activeTab"
      :hide-empty-tabs="false"
      @tab-changed="setActiveTab"
    />
    <!-- Applications Section -->
    <div class="applications-section">
      <div class="section-header">
        <h3>Applications History</h3>
        <SearchFilter
          :search-query="searchQuery"
          @search-changed="updateSearch"
          @filter-clicked="toggleFilter"
        />
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p>Loading your applications...</p>
      </div>

      <!-- Empty State -->
      <EmptyState 
        v-else-if="filteredApplications.length === 0"
        title="No applications found"
        :message="emptyStateMessage"
        icon="bi bi-file-earmark-text"
      >
        <template #action>
          <router-link to="/applicant/find-jobs" class="btn btn-primary mt-3">
            Find Jobs to Apply
          </router-link>
        </template>
      </EmptyState>

      <!-- Applications Table -->
      <template v-else>
        <ApplicationTable
          :applications="paginatedApplications"
          :start-index="(currentPage - 1) * itemsPerPage"
          @view-details="viewApplication"
          @follow-up="followUpApplication"
          @withdraw="withdrawApplication"
        />

        <!-- Pagination -->
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-changed="setCurrentPage"
        />
      </template>
    </div>
  </div>
</template>

<script>
import ApplicationBanner from '@/components/Applicants/applications/ApplicationBanner.vue';
import ApplicationsTable from '@/components/Applicants/applications/ApplicationsTable.vue';
import EmptyState from '@/components/Applicants/applications/EmptyState.vue';
import Pagination from '@/components/Applicants/applications/Pagination.vue';
import SearchFilter from '@/components/Applicants/applications/SearchFilter.vue';
import StatusTabs from '@/components/Applicants/applications/StatusTabs.vue';



export default {
  name: 'MyApplications',
  components: {
    ApplicationBanner,
    StatusTabs,
    SearchFilter,
    ApplicationsTable,
    Pagination,
    EmptyState
  },
  data() {
    return {
      showBanner: true,
      activeTab: 'all',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      isLoading: false,
      statusTabs: [
        { key: 'all', label: 'All', count: 0 },
        { key: 'in-review', label: 'In Review', count: 0 },
        { key: 'interviewing', label: 'Interviewing', count: 0 },
        { key: 'assessment', label: 'Assessment', count: 0 },
        { key: 'offered', label: 'Offered', count: 0 },
        { key: 'hired', label: 'Hired', count: 0 }
      ],
      applications: [],
      filteredApplications: []
    };
  },
  computed: {
    paginatedApplications() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredApplications.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredApplications.length / this.itemsPerPage);
    },
    emptyStateMessage() {
      if (this.activeTab !== 'all') {
        return `You don't have any applications with "${this.getStatusLabel(this.activeTab)}" status.`;
      } else if (this.searchQuery) {
        return 'No applications match your search criteria.';
      } else {
        return 'You haven\'t applied to any jobs in this period.';
      }
    }
  },
  created() {
    // Simulate API call to get applications
    this.loadApplications();
  },
  mounted() {
    this.$emit('update-page-title', 'My Applications');
  },
  methods: {
    loadApplications() {
      this.isLoading = true;
      
      // Simulate API delay
      setTimeout(() => {
        // In a real app, this would be an API call
        this.applications = [
          {
            id: 1,
            companyName: 'Nomad',
            companyLogo: 'https://v0.dev/placeholder.svg?height=40&width=40',
            role: 'Social Media Assistant',
            dateApplied: '2021-07-24',
            status: 'Shortlisted'
          },
          {
            id: 2,
            companyName: 'Udacity',
            companyLogo: 'https://v0.dev/placeholder.svg?height=40&width=40',
            role: 'Social Media Assistant',
            dateApplied: '2021-07-20',
            status: 'Shortlisted'
          },
          {
            id: 3,
            companyName: 'Packer',
            companyLogo: 'https://v0.dev/placeholder.svg?height=40&width=40',
            role: 'Social Media Assistant',
            dateApplied: '2021-07-16',
            status: 'Offered'
          },
          {
            id: 4,
            companyName: 'Divvy',
            companyLogo: 'https://v0.dev/placeholder.svg?height=40&width=40',
            role: 'Social Media Assistant',
            dateApplied: '2021-07-14',
            status: 'Interviewing'
          },
          {
            id: 5,
            companyName: 'DigitalOcean',
            companyLogo: 'https://v0.dev/placeholder.svg?height=40&width=40',
            role: 'Social Media Assistant',
            dateApplied: '2021-07-10',
            status: 'Unsuitable'
          }
        ];
        
        // Update status tabs with actual counts
        this.updateStatusCounts();
        this.filteredApplications = [...this.applications];
        this.isLoading = false;
      }, 1000);
    },
    updateStatusCounts() {
      // Count applications by status
      const statusCounts = {
        all: this.applications.length
      };
      
      // Map application statuses to tab keys
      const statusMap = {
        'In Review': 'in-review',
        'Shortlisted': 'shortlisted',
        'Interviewing': 'interviewing',
        'Assessment': 'assessment',
        'Offered': 'offered',
        'Hired': 'hired',
        'Unsuitable': 'unsuitable'
      };
      
      // Initialize all counts to 0
      this.statusTabs.forEach(tab => {
        statusCounts[tab.key] = 0;
      });
      
      // Count applications by status
      this.applications.forEach(app => {
        const tabKey = statusMap[app.status];
        if (tabKey && statusCounts.hasOwnProperty(tabKey)) {
          statusCounts[tabKey]++;
        }
      });
      
      // Update tab counts
      this.statusTabs = this.statusTabs.map(tab => ({
        ...tab,
        count: statusCounts[tab.key] || 0
      }));
    },
    getStatusLabel(tabKey) {
      const tab = this.statusTabs.find(t => t.key === tabKey);
      return tab ? tab.label : '';
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      this.filterApplications();
    },
    updateSearch(query) {
      this.searchQuery = query;
      this.filterApplications();
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    filterApplications() {
      let filtered = [...this.applications];
      
      // Filter by status tab
      if (this.activeTab !== 'all') {
        const statusMap = {
          'in-review': 'In Review',
          'interviewing': 'Interviewing',
          'assessment': 'Assessment',
          'offered': 'Offered',
          'hired': 'Hired',
          'shortlisted': 'Shortlisted',
          'unsuitable': 'Unsuitable'
        };
        filtered = filtered.filter(app => app.status === statusMap[this.activeTab]);
      }
      
      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter(app => 
          app.companyName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          app.role.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      this.filteredApplications = filtered;
      this.currentPage = 1;
    },
    toggleFilter() {
      console.log('Toggle filter modal');
    },
    viewApplication(application) {
      this.$router.push(`/applicant/applications/${application.id}`);
    },
    followUpApplication(application) {
      console.log('Follow up for', application.companyName);
    },
    withdrawApplication(application) {
      console.log('Withdraw application for', application.companyName);
    }
  }
};
</script>

<style scoped>
.my-applications-page {
  padding: 0;
  background-color: #ffffff;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.header-content h2.greeting {
  font-size: 24px;
  font-weight: 600;
  color: #202124;
  margin: 0 0 8px 0;
}

.header-content .subtitle {
  font-size: 14px;
  color: #5f6368;
  margin: 0;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e8eaed;
}

.date-text {
  font-size: 14px;
  font-weight: 500;
  color: #202124;
}

.applications-section {
  background-color: #ffffff;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #202124;
  margin: 0;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
}

.loading-state p {
  margin-top: 16px;
  font-size: 16px;
  color: #5f6368;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
}
</style>