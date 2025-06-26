<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">Dashboard</h2>
        <p class="text-muted mb-0">
          Welcome back! Here's what's happening with your recruitment.
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary">
          <i class="bi bi-download me-1"></i>
          Export Report
        </button>
        <router-link to="/company/post-job" class="btn btn-primary">
          <i class="bi bi-plus me-1"></i>
          Post New Job
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading dashboard data...</p>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Cards -->
      <div class="row mb-4">
        <div class="col-lg-3 col-md-6 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h6 class="text-muted mb-1">Total Applications</h6>
                  <h3 class="fw-bold mb-0">
                    {{ stats.totalApplications || 0 }}
                  </h3>
                  <small class="text-success">
                    <i class="bi bi-arrow-up"></i>
                    +12% from last month
                  </small>
                </div>
                <div class="bg-primary bg-opacity-10 p-3 rounded">
                  <i
                    class="bi bi-people text-primary"
                    style="font-size: 1.5rem"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h6 class="text-muted mb-1">Active Jobs</h6>
                  <h3 class="fw-bold mb-0">{{ stats.activeJobs || 0 }}</h3>
                  <small class="text-success">
                    <i class="bi bi-arrow-up"></i>
                    {{ newJobsThisWeek }} new this week
                  </small>
                </div>
                <div class="bg-success bg-opacity-10 p-3 rounded">
                  <i
                    class="bi bi-briefcase text-success"
                    style="font-size: 1.5rem"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h6 class="text-muted mb-1">Interviews Scheduled</h6>
                  <h3 class="fw-bold mb-0">
                    {{ stats.interviewsScheduled || 0 }}
                  </h3>
                  <small class="text-info">
                    <i class="bi bi-calendar"></i>
                    {{ stats.interviewsToday || 0 }} today
                  </small>
                </div>
                <div class="bg-info bg-opacity-10 p-3 rounded">
                  <i
                    class="bi bi-calendar-check text-info"
                    style="font-size: 1.5rem"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h6 class="text-muted mb-1">Hired This Month</h6>
                  <h3 class="fw-bold mb-0">{{ stats.hiredThisMonth || 0 }}</h3>
                  <small class="text-warning">
                    <i class="bi bi-trophy"></i>
                    {{ stats.hireRate || 0 }}% hire rate
                  </small>
                </div>
                <div class="bg-warning bg-opacity-10 p-3 rounded">
                  <i
                    class="bi bi-person-check text-warning"
                    style="font-size: 1.5rem"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Recent Applications -->
        <div class="col-lg-8 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold">Recent Applications</h5>
                <router-link
                  to="/company/all-applicants"
                  class="text-primary text-decoration-none"
                >
                  View All
                </router-link>
              </div>
            </div>
            <div class="card-body p-0">
              <div
                v-if="recentApplications.length === 0"
                class="text-center py-4"
              >
                <i class="bi bi-inbox display-4 text-muted mb-3"></i>
                <h5 class="text-muted">No applications yet</h5>
                <p class="text-muted">
                  Applications will appear here when candidates apply to your
                  jobs.
                </p>
              </div>
              <div v-else class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">Candidate</th>
                      <th class="border-0">Position</th>
                      <th class="border-0">Applied</th>
                      <th class="border-0">Status</th>
                      <th class="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="application in recentApplications"
                      :key="application.id"
                    >
                      <td>
                        <div class="d-flex align-items-center">
                          <img
                            :src="
                              application.avatar ||
                              '/placeholder.svg?height=40&width=40'
                            "
                            class="rounded-circle me-3"
                            width="40"
                            height="40"
                            :alt="application.name"
                          />
                          <div>
                            <h6 class="mb-0 fw-semibold">
                              {{ application.name }}
                            </h6>
                            <small class="text-muted">{{
                              application.email
                            }}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <h6 class="mb-0">{{ application.position }}</h6>
                          <small class="text-muted">{{
                            application.department
                          }}</small>
                        </div>
                      </td>
                      <td class="text-muted">
                        {{ formatDate(application.appliedDate) }}
                      </td>
                      <td>
                        <span :class="getStatusBadgeClass(application.status)">
                          {{ application.status }}
                        </span>
                      </td>
                      <td>
                        <div class="d-flex gap-1">
                          <button class="btn btn-outline-primary btn-sm">
                            <i class="bi bi-eye"></i>
                          </button>
                          <button class="btn btn-outline-success btn-sm">
                            <i class="bi bi-check"></i>
                          </button>
                          <button class="btn btn-outline-danger btn-sm">
                            <i class="bi bi-x"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats & Upcoming -->
        <div class="col-lg-4">
          <!-- Recent Jobs -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white border-bottom">
              <h5 class="mb-0 fw-bold">Recent Jobs</h5>
            </div>
            <div class="card-body p-0">
              <div v-if="recentJobs.length === 0" class="text-center py-4">
                <i class="bi bi-briefcase display-6 text-muted mb-2"></i>
                <p class="text-muted mb-0">No jobs posted yet</p>
              </div>
              <div v-else class="list-group list-group-flush">
                <div
                  class="list-group-item border-0 py-3"
                  v-for="job in recentJobs"
                  :key="job.id"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                      <h6 class="mb-1 fw-semibold">{{ job.title }}</h6>
                      <div class="small text-muted">
                        {{ job.department }} • {{ job.location }}
                      </div>
                      <div class="small text-success">
                        <i class="bi bi-eye me-1"></i>
                        {{ job.views || 0 }} views •
                        {{ job.applications || 0 }} applications
                      </div>
                    </div>
                    <div class="text-end">
                      <span :class="getJobStatusBadge(job.status)">
                        {{ job.status }}
                      </span>
                      <div class="small text-muted mt-1">
                        {{ formatDate(job.createdAt) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Interviews -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold">Upcoming Interviews</h5>
                <router-link
                  to="/company/schedule"
                  class="text-primary text-decoration-none"
                >
                  View Calendar
                </router-link>
              </div>
            </div>
            <div class="card-body p-0">
              <div
                v-if="upcomingInterviews.length === 0"
                class="text-center py-4"
              >
                <i class="bi bi-calendar-check display-6 text-muted mb-2"></i>
                <p class="text-muted mb-0">No interviews scheduled</p>
              </div>
              <div v-else class="list-group list-group-flush">
                <div
                  class="list-group-item border-0 py-3"
                  v-for="interview in upcomingInterviews"
                  :key="interview.id"
                >
                  <div class="d-flex align-items-center">
                    <img
                      :src="
                        interview.candidateAvatar ||
                        '/placeholder.svg?height=40&width=40'
                      "
                      class="rounded-circle me-3"
                      width="40"
                      height="40"
                      :alt="interview.candidateName"
                    />
                    <div class="flex-grow-1">
                      <h6 class="mb-1 fw-semibold">
                        {{ interview.candidateName }}
                      </h6>
                      <div class="small text-muted">
                        {{ interview.position }} • {{ interview.time }}
                      </div>
                      <div class="small text-primary">
                        <i class="bi bi-calendar me-1"></i>
                        {{ interview.date }}
                      </div>
                    </div>
                    <div class="text-end">
                      <span :class="getInterviewTypeBadge(interview.type)">
                        {{ interview.type }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom">
              <h5 class="mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div class="card-body">
              <div v-if="recentActivity.length === 0" class="text-center py-4">
                <i class="bi bi-activity display-6 text-muted mb-2"></i>
                <p class="text-muted mb-0">No recent activity</p>
              </div>
              <div v-else class="timeline">
                <div
                  class="timeline-item"
                  v-for="activity in recentActivity"
                  :key="activity.id"
                >
                  <div
                    class="timeline-marker"
                    :class="getActivityMarkerClass(activity.type)"
                  >
                    <i :class="getActivityIcon(activity.type)"></i>
                  </div>
                  <div class="timeline-content">
                    <h6 class="mb-1">{{ activity.title }}</h6>
                    <p class="text-muted mb-1">{{ activity.description }}</p>
                    <small class="text-muted">{{
                      formatDate(activity.time)
                    }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCompanyJobStore } from "@/stores/company/companyJob";
import { ref, onMounted, computed, watch } from "vue";
import JobAnalytics from "@/components/company/jobs/JobAnalytics.vue";

export default {
  name: "Dashboard",
  components: {
    JobAnalytics,
  },
  setup() {
    const companyJobStore = useCompanyJobStore();
    const loading = ref(true);
    const error = ref(null);

    // Real stats computed from store data
    const stats = ref({
      totalApplications: 0,
      activeJobs: 0,
      interviewsScheduled: 0,
      interviewsToday: 0,
      hiredThisMonth: 0,
      hireRate: 0,
    });

    const recentApplications = ref([]);
    const recentJobs = ref([]);
    const upcomingInterviews = ref([]);
    const recentActivity = ref([]);

    // Computed values from store
    const newJobsThisWeek = computed(() => {
      if (!companyJobStore.jobs) return 0;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      return companyJobStore.jobs.filter((job) => {
        const jobDate = new Date(job.createdAt || job.created_at);
        return jobDate >= oneWeekAgo;
      }).length;
    });

    // Watch for changes in store data
    watch(
      () => companyJobStore.jobs,
      (newJobs) => {
        if (newJobs) {
          updateDashboardData();
        }
      },
      { deep: true }
    );

    const updateDashboardData = () => {
      if (companyJobStore.jobs) {
        // Update stats based on real data
        stats.value.activeJobs = companyJobStore.jobs.filter(
          (job) => job.status === "active" || job.status === "open"
        ).length;

        // Get recent jobs (last 5)
        recentJobs.value = companyJobStore.jobs
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.created_at) -
              new Date(a.createdAt || a.created_at)
          )
          .slice(0, 5)
          .map((job) => ({
            id: job.id,
            title: job.title || job.job_title,
            department: job.department || "General",
            location: job.location || job.job_location || "Remote",
            status: job.status || "active",
            views: job.views || Math.floor(Math.random() * 100), // Mock data
            applications:
              job.applications?.length || Math.floor(Math.random() * 20), // Mock data
            createdAt: job.createdAt || job.created_at,
          }));

        // Add activity for new jobs
        const jobActivities = companyJobStore.jobs
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.created_at) -
              new Date(a.createdAt || a.created_at)
          )
          .slice(0, 3)
          .map((job) => ({
            id: `job-${job.id}`,
            type: "job",
            title: "Job Posted",
            description: `${job.title || job.job_title} position was published`,
            time: job.createdAt || job.created_at,
          }));

        recentActivity.value = jobActivities;
      }
    };

    const loadDashboardData = async () => {
      try {
        loading.value = true;
        error.value = null;

        console.log("📊 Loading dashboard data...");

        // Fetch jobs from store
        await companyJobStore.fetchJobs();

        // Update dashboard with real data
        updateDashboardData();

        // TODO: Fetch other data when endpoints are available
        // - Applications
        // - Interviews
        // - Analytics

        console.log("✅ Dashboard data loaded successfully");
        console.log("📈 Active jobs:", stats.value.activeJobs);
        console.log("📋 Recent jobs:", recentJobs.value.length);
      } catch (err) {
        console.error("❌ Failed to load dashboard data:", err);
        error.value = err.message || "Failed to load dashboard data";
      } finally {
        loading.value = false;
      }
    };

    // Utility functions
    const formatDate = (dateString) => {
      if (!dateString) return "Unknown";

      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffTime / (1000 * 60));

      if (diffMinutes < 60) {
        return `${diffMinutes} minutes ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hours ago`;
      } else if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString();
      }
    };

    const getStatusBadgeClass = (status) => {
      const classes = {
        New: "badge bg-primary",
        "In Review": "badge bg-warning",
        Shortlisted: "badge bg-info",
        Interview: "badge bg-success",
        Rejected: "badge bg-danger",
      };
      return classes[status] || "badge bg-secondary";
    };

    const getJobStatusBadge = (status) => {
      const classes = {
        active: "badge bg-success",
        open: "badge bg-success",
        closed: "badge bg-danger",
        draft: "badge bg-warning",
        paused: "badge bg-secondary",
      };
      return classes[status] || "badge bg-primary";
    };

    const getInterviewTypeBadge = (type) => {
      const classes = {
        Video: "badge bg-primary",
        "In-Person": "badge bg-success",
        Phone: "badge bg-info",
      };
      return classes[type] || "badge bg-secondary";
    };

    const getActivityMarkerClass = (type) => {
      const classes = {
        application: "bg-primary",
        interview: "bg-success",
        job: "bg-info",
        hire: "bg-warning",
      };
      return classes[type] || "bg-secondary";
    };

    const getActivityIcon = (type) => {
      const icons = {
        application: "bi bi-person-plus",
        interview: "bi bi-calendar-check",
        job: "bi bi-briefcase",
        hire: "bi bi-trophy",
      };
      return icons[type] || "bi bi-circle";
    };

    onMounted(() => {
      loadDashboardData();
    });

    return {
      loading,
      error,
      stats,
      recentApplications,
      recentJobs,
      upcomingInterviews,
      recentActivity,
      newJobsThisWeek,
      formatDate,
      getStatusBadgeClass,
      getJobStatusBadge,
      getInterviewTypeBadge,
      getActivityMarkerClass,
      getActivityIcon,
    };
  },
};
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e9ecef;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
}

.timeline-content {
  margin-left: 1rem;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.bg-opacity-10 {
  --bs-bg-opacity: 0.1;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
