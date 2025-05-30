<template>
<div class="dashboard">
  <!-- Welcome Section -->
  <div class="row align-items-center mb-4">
    <div class="col-md-8">
      <h2 class="mb-1 fw-bold">Welcome back, John! 👋</h2>
      <p class="text-muted mb-0">Here's what's happening with your hiring process today.</p>
    </div>
    <div class="col-md-4 text-md-end">
      <button class="btn btn-primary" @click="postNewJob">
        <i class="bi bi-plus me-2"></i>Post New Job
      </button>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="row g-4 mb-4">
    <div class="col-lg-3 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center">
            <div class="stat-icon bg-primary-subtle text-primary rounded-circle me-3">
              <i class="bi bi-briefcase fs-4"></i>
            </div>
            <div>
              <h3 class="mb-1 fw-bold">{{ stats.activeJobs }}</h3>
              <p class="text-muted small mb-0">Active Jobs</p>
            </div>
          </div>
          <div class="mt-3">
            <small class="text-success">
              <i class="bi bi-arrow-up"></i> +2 this week
            </small>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center">
            <div class="stat-icon bg-success-subtle text-success rounded-circle me-3">
              <i class="bi bi-people fs-4"></i>
            </div>
            <div>
              <h3 class="mb-1 fw-bold">{{ stats.totalApplicants }}</h3>
              <p class="text-muted small mb-0">Total Applicants</p>
            </div>
          </div>
          <div class="mt-3">
            <small class="text-success">
              <i class="bi bi-arrow-up"></i> +15 this week
            </small>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center">
            <div class="stat-icon bg-warning-subtle text-warning rounded-circle me-3">
              <i class="bi bi-calendar-check fs-4"></i>
            </div>
            <div>
              <h3 class="mb-1 fw-bold">{{ stats.scheduledInterviews }}</h3>
              <p class="text-muted small mb-0">Scheduled Interviews</p>
            </div>
          </div>
          <div class="mt-3">
            <small class="text-info">
              <i class="bi bi-calendar"></i> 3 today
            </small>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center">
            <div class="stat-icon bg-info-subtle text-info rounded-circle me-3">
              <i class="bi bi-person-check fs-4"></i>
            </div>
            <div>
              <h3 class="mb-1 fw-bold">{{ stats.hiredThisMonth }}</h3>
              <p class="text-muted small mb-0">Hired This Month</p>
            </div>
          </div>
          <div class="mt-3">
            <small class="text-success">
              <i class="bi bi-arrow-up"></i> +3 from last month
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row g-4">
    <!-- Recent Applications -->
    <div class="col-lg-8">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0 fw-bold">Recent Applications</h5>
            <router-link to="/company/all-applicants" class="btn btn-outline-primary btn-sm">
              View All
            </router-link>
          </div>

          <div class="applications-list">
            <div v-for="application in recentApplications" :key="application.id" class="d-flex align-items-center justify-content-between p-3 border rounded-3 mb-3">
              <div class="d-flex align-items-center">
                <img :src="application.avatar" :alt="application.name" class="rounded-circle me-3" style="width: 48px; height: 48px;">
                <div>
                  <h6 class="mb-1 fw-medium">{{ application.name }}</h6>
                  <p class="text-muted small mb-0">Applied for {{ application.position }}</p>
                </div>
              </div>
              <div class="d-flex align-items-center gap-3">
                <span class="badge" :class="getStatusBadgeClass(application.status)">{{ application.status }}</span>
                <small class="text-muted">{{ application.appliedDate }}</small>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    Actions
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" @click="viewApplication(application.id)">View Profile</a></li>
                    <li><a class="dropdown-item" href="#" @click="scheduleInterview(application.id)">Schedule Interview</a></li>
                    <li><a class="dropdown-item" href="#" @click="moveToShortlist(application.id)">Shortlist</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
      <!-- Today's Schedule -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0 fw-bold">Today's Schedule</h6>
            <router-link to="/company/schedule" class="text-decoration-none small">View All</router-link>
          </div>

          <div class="schedule-list">
            <div v-for="event in todaySchedule" :key="event.id" class="d-flex align-items-center mb-3 p-3 border rounded-3">
              <div class="time-badge me-3">
                <div class="fw-bold text-primary">{{ event.time }}</div>
              </div>
              <div class="flex-grow-1">
                <div class="fw-medium">{{ event.title }}</div>
                <small class="text-muted">{{ event.candidate }}</small>
              </div>
              <button class="btn btn-sm btn-outline-primary" @click="joinMeeting(event.id)">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Quick Actions</h6>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="postNewJob">
              <i class="bi bi-plus me-2"></i>Post New Job
            </button>
            <button class="btn btn-outline-primary" @click="viewAllApplicants">
              <i class="bi bi-people me-2"></i>View All Applicants
            </button>
            <button class="btn btn-outline-secondary" @click="scheduleInterview">
              <i class="bi bi-calendar-plus me-2"></i>Schedule Interview
            </button>
          </div>
        </div>
      </div>

      <!-- Job Performance -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Top Performing Jobs</h6>
          <div class="performance-list">
            <div v-for="job in topJobs" :key="job.id" class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div class="fw-medium">{{ job.title }}</div>
                <small class="text-muted">{{ job.applicants }} applicants</small>
              </div>
              <div class="text-end">
                <div class="fw-bold text-success">{{ job.views }}</div>
                <small class="text-muted">views</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navigate = inject('navigate')

const stats = ref({
  activeJobs: 12,
  totalApplicants: 248,
  scheduledInterviews: 8,
  hiredThisMonth: 5
})

const recentApplications = ref([
  {
    id: 1,
    name: 'Jake Gyll',
    position: 'Senior Frontend Developer',
    status: 'In Review',
    appliedDate: '2 hours ago',
    avatar: '/placeholder.svg?height=48&width=48&query=professional+man+jake'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'UX Designer',
    status: 'Shortlisted',
    appliedDate: '4 hours ago',
    avatar: '/placeholder.svg?height=48&width=48&query=professional+woman+sarah'
  },
  {
    id: 3,
    name: 'Mike Chen',
    position: 'Backend Developer',
    status: 'Interview',
    appliedDate: '1 day ago',
    avatar: '/placeholder.svg?height=48&width=48&query=professional+man+mike'
  },
  {
    id: 4,
    name: 'Emily Davis',
    position: 'Product Manager',
    status: 'In Review',
    appliedDate: '2 days ago',
    avatar: '/placeholder.svg?height=48&width=48&query=professional+woman+emily'
  }
])

const todaySchedule = ref([
  {
    id: 1,
    time: '10:00',
    title: 'Technical Interview',
    candidate: 'Jake Gyll'
  },
  {
    id: 2,
    time: '14:00',
    title: 'HR Interview',
    candidate: 'Sarah Johnson'
  },
  {
    id: 3,
    time: '16:00',
    title: 'Final Interview',
    candidate: 'Mike Chen'
  }
])

const topJobs = ref([
  {
    id: 1,
    title: 'Senior Frontend Developer',
    applicants: 24,
    views: 1250
  },
  {
    id: 2,
    title: 'UX Designer',
    applicants: 18,
    views: 890
  },
  {
    id: 3,
    title: 'Product Manager',
    applicants: 15,
    views: 756
  }
])

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'In Review':
      return 'bg-warning-subtle text-warning'
    case 'Shortlisted':
      return 'bg-primary-subtle text-primary'
    case 'Interview':
      return 'bg-info-subtle text-info'
    case 'Hired':
      return 'bg-success-subtle text-success'
    default:
      return 'bg-secondary-subtle text-secondary'
  }
}

const postNewJob = () => {
  if (navigate) {
    navigate('post-job')
  } else {
    router.push('/company/post-job')
  }
}

const viewAllApplicants = () => {
  if (navigate) {
    navigate('all-applicants')
  } else {
    router.push('/company/all-applicants')
  }
}

const viewApplication = (applicationId) => {
  console.log('View application:', applicationId)
}

const scheduleInterview = (applicationId = null) => {
  console.log('Schedule interview:', applicationId)
}

const moveToShortlist = (applicationId) => {
  console.log('Move to shortlist:', applicationId)
}

const joinMeeting = (eventId) => {
  console.log('Join meeting:', eventId)
}
</script>

<style scoped>
.stat-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.applications-list .border:hover {
  border-color: #6366f1 !important;
  background-color: #f8fafc;
}

.time-badge {
  min-width: 60px;
  text-align: center;
}

.schedule-list .border:hover {
  border-color: #6366f1 !important;
  background-color: #f8fafc;
}
</style>
