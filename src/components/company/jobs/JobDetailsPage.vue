<template>
<div class="job-details">
  <!-- Header -->
  <div class="d-flex align-items-center justify-content-between mb-4">
    <div class="d-flex align-items-center">
      <button class="btn btn-link text-dark p-0 me-3" @click="goBack">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <div>
        <h2 class="mb-1 fw-bold">{{ job.title }}</h2>
        <p class="text-muted mb-0">{{ job.company }} • {{ job.location }}</p>
      </div>
    </div>
    <div class="dropdown">
      <button class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
        <i class="bi bi-gear me-1"></i>Manage Job
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#" @click="editJob">Edit Job</a></li>
        <li><a class="dropdown-item" href="#" @click="duplicateJob">Duplicate Job</a></li>
        <li><a class="dropdown-item" href="#" @click="pauseJob">Pause Job</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item text-danger" href="#" @click="deleteJob">Delete Job</a></li>
      </ul>
    </div>
  </div>

  <div class="row g-4">
    <!-- Main Content -->
    <div class="col-lg-8">
      <!-- Job Overview -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <div class="d-flex align-items-start justify-content-between mb-4">
            <div class="d-flex align-items-start">
              <div class="company-logo rounded-3 p-3 me-4 d-flex align-items-center justify-content-center" 
                   style="background-color: #6366f1; width: 80px; height: 80px;">
                <i class="bi bi-briefcase text-white fs-3"></i>
              </div>
              <div>
                <h3 class="mb-2 fw-bold">{{ job.title }}</h3>
                <p class="text-muted mb-2">{{ job.company }} • {{ job.location }}</p>
                <div class="d-flex flex-wrap gap-2">
                  <span class="badge bg-primary-subtle text-primary border border-primary px-3 py-2">{{ job.type }}</span>
                  <span class="badge bg-secondary-subtle text-secondary border border-secondary px-3 py-2">{{ job.department }}</span>
                  <span class="badge bg-success-subtle text-success border border-success px-3 py-2">{{ job.status }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4 mb-4">
            <div class="col-md-3">
              <div class="text-center">
                <h4 class="mb-1 fw-bold text-primary">{{ job.applicants }}</h4>
                <small class="text-muted">Total Applicants</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="text-center">
                <h4 class="mb-1 fw-bold text-success">{{ job.views }}</h4>
                <small class="text-muted">Job Views</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="text-center">
                <h4 class="mb-1 fw-bold text-warning">{{ job.shortlisted || 8 }}</h4>
                <small class="text-muted">Shortlisted</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="text-center">
                <h4 class="mb-1 fw-bold text-info">{{ job.interviewed || 3 }}</h4>
                <small class="text-muted">Interviewed</small>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-medium">Application Progress</span>
              <span class="text-muted">{{ job.applicants }} of {{ job.capacity }} applications</span>
            </div>
            <div class="progress" style="height: 8px;">
              <div 
                class="progress-bar bg-success" 
                :style="{ width: (job.applicants / job.capacity * 100) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Job Description -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h5 class="mb-3 fw-bold">Job Description</h5>
          <p class="text-muted mb-4">{{ job.description }}</p>
          
          <h6 class="mb-3 fw-bold">Requirements</h6>
          <ul class="list-unstyled">
            <li v-for="requirement in job.requirements" :key="requirement" class="mb-2">
              <i class="bi bi-check-circle text-success me-2"></i>{{ requirement }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Recent Applicants -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0 fw-bold">Recent Applicants</h5>
            <button class="btn btn-outline-primary btn-sm" @click="viewAllApplicants">
              View All Applicants
            </button>
          </div>
          
          <div class="applicants-list">
            <div v-for="applicant in recentApplicants" :key="applicant.id" class="d-flex align-items-center justify-content-between p-3 border rounded-3 mb-3">
              <div class="d-flex align-items-center">
                <img :src="applicant.avatar" :alt="applicant.name" class="rounded-circle me-3" style="width: 48px; height: 48px;">
                <div>
                  <h6 class="mb-1 fw-medium">{{ applicant.name }}</h6>
                  <p class="text-muted small mb-0">Applied {{ applicant.appliedDate }}</p>
                </div>
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-warning-subtle text-warning">{{ applicant.stage }}</span>
                <div class="d-flex align-items-center">
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <span class="fw-medium">{{ applicant.score }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
      <!-- Job Analytics -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Job Analytics</h6>
          <div class="analytics-chart" style="height: 200px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <p class="text-muted mb-0">Analytics Chart Placeholder</p>
          </div>
        </div>
      </div>

      <!-- Job Details -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Job Details</h6>
          <div class="job-details-list">
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Posted Date:</span>
              <span class="fw-medium">{{ job.postedDate }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Deadline:</span>
              <span class="fw-medium">{{ job.deadline || 'No deadline' }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Salary:</span>
              <span class="fw-medium">{{ job.salary }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Experience:</span>
              <span class="fw-medium">{{ job.experience || '3-5 years' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Quick Actions</h6>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="viewAllApplicants">
              <i class="bi bi-people me-2"></i>View All Applicants
            </button>
            <button class="btn btn-success" @click="scheduleInterviews">
              <i class="bi bi-calendar-plus me-2"></i>Schedule Interviews
            </button>
            <button class="btn btn-outline-primary" @click="shareJob">
              <i class="bi bi-share me-2"></i>Share Job
            </button>
            <button class="btn btn-outline-secondary" @click="downloadReport">
              <i class="bi bi-download me-2"></i>Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const goBack = inject('goBack')
const navigate = inject('navigate')

const job = ref({
  id: route.params.id,
  title: 'Senior Frontend Developer',
  company: 'TechCorp Solutions',
  location: 'San Francisco, CA',
  type: 'Full-Time',
  department: 'Engineering',
  status: 'Active',
  applicants: 24,
  views: 1250,
  capacity: 50,
  postedDate: '2024-01-15',
  deadline: '2024-02-15',
  salary: '$120,000 - $150,000',
  experience: '5+ years',
  description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features, ensuring the technical feasibility of UI/UX designs, and optimizing applications for maximum speed and scalability.',
  requirements: [
    '5+ years of experience in frontend development',
    'Expert knowledge of React, TypeScript, and modern JavaScript',
    'Experience with state management libraries (Redux, Zustand)',
    'Strong understanding of responsive design and CSS frameworks',
    'Experience with testing frameworks (Jest, Cypress)',
    'Knowledge of build tools and CI/CD pipelines'
  ]
})

const recentApplicants = ref([
  {
    id: 1,
    name: 'Jake Gyll',
    appliedDate: '2 days ago',
    stage: 'In Review',
    score: '4.0',
    avatar: '/placeholder.svg?height=48&width=48&query=professional+man+jake'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    appliedDate: '3 days ago',
    stage: 'Shortlisted',
    score: '4.2',
    avatar: '/placeholder.svg?height=48&width=48&query=professional+woman+sarah'
  },
  {
    id: 3,
    name: 'Mike Chen',
    appliedDate: '5 days ago',
    stage: 'Interview',
    score: '4.5',
    avatar: '/placeholder.svg?height=48&width=48&query=professional+man+mike'
  }
])

const editJob = () => {
  console.log('Edit job')
  if (navigate) {
    navigate('post-job')
  }
}

const duplicateJob = () => {
  console.log('Duplicate job')
}

const pauseJob = () => {
  console.log('Pause job')
}

const deleteJob = () => {
  console.log('Delete job')
  if (confirm('Are you sure you want to delete this job?')) {
    if (navigate) {
      navigate('job-listing')
    }
  }
}

const viewAllApplicants = () => {
  if (navigate) {
    navigate('all-applicants')
  }
}

const scheduleInterviews = () => {
  console.log('Schedule interviews')
}

const shareJob = () => {
  console.log('Share job')
}

const downloadReport = () => {
  console.log('Download report')
}
</script>

<style scoped>
.company-logo {
  transition: transform 0.2s ease;
}

.card:hover .company-logo {
  transform: scale(1.05);
}

.progress-bar {
  transition: width 0.5s ease;
}

.applicants-list .border:hover {
  border-color: #6366f1 !important;
  background-color: #f8fafc;
}
</style>
