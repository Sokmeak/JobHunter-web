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

    <!-- Stats Cards -->
    <div class="row mb-4">
      <div class="col-lg-3 col-md-6 mb-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <h6 class="text-muted mb-1">Total Applications</h6>
                <h3 class="fw-bold mb-0">{{ stats.totalApplications }}</h3>
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
                <h3 class="fw-bold mb-0">{{ stats.activeJobs }}</h3>
                <small class="text-success">
                  <i class="bi bi-arrow-up"></i>
                  +3 new this week
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
                <h3 class="fw-bold mb-0">{{ stats.interviewsScheduled }}</h3>
                <small class="text-info">
                  <i class="bi bi-calendar"></i>
                  {{ stats.interviewsToday }} today
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
                <h3 class="fw-bold mb-0">{{ stats.hiredThisMonth }}</h3>
                <small class="text-warning">
                  <i class="bi bi-trophy"></i>
                  {{ stats.hireRate }}% hire rate
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
            <div class="table-responsive">
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
                          :src="application.avatar"
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
                    <td class="text-muted">{{ application.appliedDate }}</td>
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
        <!-- Job Analytics -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white border-bottom">
            <h5 class="mb-0 fw-bold">Job Performance</h5>
          </div>
          <div class="card-body">
            <JobAnalytics />
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
            <div class="list-group list-group-flush">
              <div
                class="list-group-item border-0 py-3"
                v-for="interview in upcomingInterviews"
                :key="interview.id"
              >
                <div class="d-flex align-items-center">
                  <img
                    :src="interview.candidateAvatar"
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
            <div class="timeline">
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
                  <small class="text-muted">{{ activity.time }}</small>
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
import { ref, onMounted } from "vue";
import JobAnalytics from "@/components/company/jobs/JobAnalytics.vue";

export default {
  name: "Dashboard",
  components: {
    JobAnalytics,
  },
  setup() {
    const stats = ref({
      totalApplications: 1247,
      activeJobs: 23,
      interviewsScheduled: 45,
      interviewsToday: 8,
      hiredThisMonth: 12,
      hireRate: 15,
    });

    const companyJobStore = useCompanyJobStore();

    const recentApplications = ref([
      {
        id: 1,
        name: "Jake Gyll",
        email: "jake.gyll@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        position: "Social Media Assistant",
        department: "Marketing",
        appliedDate: "2 hours ago",
        status: "New",
      },
      {
        id: 2,
        name: "Guy Hawkins",
        email: "guy.hawkins@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        position: "Frontend Developer",
        department: "Engineering",
        appliedDate: "5 hours ago",
        status: "In Review",
      },
      {
        id: 3,
        name: "Cyndy Lillibridge",
        email: "cyndy.l@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        position: "UX Designer",
        department: "Design",
        appliedDate: "1 day ago",
        status: "Shortlisted",
      },
      {
        id: 4,
        name: "Rodney Stratton",
        email: "rodney.s@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        position: "Product Manager",
        department: "Product",
        appliedDate: "2 days ago",
        status: "Interview",
      },
    ]);

    const upcomingInterviews = ref([
      {
        id: 1,
        candidateName: "Sarah Johnson",
        candidateAvatar: "/placeholder.svg?height=40&width=40",
        position: "Frontend Developer",
        date: "Today",
        time: "2:00 PM",
        type: "Video",
      },
      {
        id: 2,
        candidateName: "Michael Chen",
        candidateAvatar: "/placeholder.svg?height=40&width=40",
        position: "UX Designer",
        date: "Tomorrow",
        time: "10:30 AM",
        type: "In-Person",
      },
      {
        id: 3,
        candidateName: "Emily Davis",
        candidateAvatar: "/placeholder.svg?height=40&width=40",
        position: "Product Manager",
        date: "Dec 18",
        time: "3:00 PM",
        type: "Phone",
      },
    ]);

    const recentActivity = ref([
      {
        id: 1,
        type: "application",
        title: "New Application Received",
        description: "Jake Gyll applied for Social Media Assistant position",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "interview",
        title: "Interview Scheduled",
        description:
          "Interview scheduled with Sarah Johnson for Frontend Developer",
        time: "4 hours ago",
      },
      {
        id: 3,
        type: "job",
        title: "Job Posted",
        description: "Senior Backend Developer position was published",
        time: "1 day ago",
      },
      {
        id: 4,
        type: "hire",
        title: "Candidate Hired",
        description: "Alex Thompson was hired for Marketing Manager position",
        time: "2 days ago",
      },
    ]);

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
      // Load dashboard data
      const alljobs = companyJobStore.fetchJobs();
      console.log("All jobs fetched:", alljobs);
      console.log("Dashboard mounted");
    });

    return {
      companyJobStore,
      stats,
      recentApplications,
      upcomingInterviews,
      recentActivity,
      getStatusBadgeClass,
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
</style>
