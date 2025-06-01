<template>
<div class="job-listing">
  <!-- Header -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 class="mb-1 fw-bold">Job Listings</h2>
      <p class="text-muted mb-0">Manage all your job postings</p>
    </div>
    <button class="btn btn-primary" @click="postNewJob">
      <i class="bi bi-plus me-2"></i>Post New Job
    </button>
  </div>

  <!-- Filters and Search -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body p-4">
      <div class="row g-3 align-items-center">
        <div class="col-md-4">
          <div class="position-relative">
            <i class="bi bi-search position-absolute search-icon"></i>
            <input 
              type="text" 
              class="form-control search-input" 
              placeholder="Search jobs..."
              v-model="searchQuery"
            >
          </div>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="statusFilter">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Paused">Paused</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="departmentFilter">
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="typeFilter">
            <option value="">All Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div class="col-md-2">
          <button class="btn btn-outline-secondary w-100" @click="clearFilters">
            <i class="bi bi-x-circle me-1"></i>Clear
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Jobs Grid -->
  <div class="row g-4">
    <div v-for="job in filteredJobs" :key="job.id" class="col-lg-6">
      <div class="card border-0 shadow-sm job-card h-100">
        <div class="card-body p-4">
          <!-- Job Header -->
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="d-flex align-items-start">
              <div class="job-icon bg-primary-subtle text-primary rounded-3 p-3 me-3">
                <i class="bi bi-briefcase fs-4"></i>
              </div>
              <div>
                <h5 class="mb-1 fw-bold">{{ job.title }}</h5>
                <p class="text-muted mb-2">{{ job.department }} • {{ job.location }}</p>
                <div class="d-flex flex-wrap gap-2">
                  <span class="badge bg-primary-subtle text-primary border border-primary px-2 py-1">{{ job.type }}</span>
                  <span class="badge" :class="getStatusBadgeClass(job.status)">{{ job.status }}</span>
                </div>
              </div>
            </div>
            <div class="dropdown">
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                <i class="bi bi-three-dots"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click="viewJob(job.id)">View Details</a></li>
                <li><a class="dropdown-item" href="#" @click="editJob(job.id)">Edit Job</a></li>
                <li><a class="dropdown-item" href="#" @click="duplicateJob(job.id)">Duplicate</a></li>
                <li><a class="dropdown-item" href="#" @click="viewAnalytics(job.id)">View Analytics</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click="pauseJob(job.id)" v-if="job.status === 'Active'">Pause Job</a></li>
                <li><a class="dropdown-item" href="#" @click="activateJob(job.id)" v-if="job.status === 'Paused'">Activate Job</a></li>
                <li><a class="dropdown-item text-danger" href="#" @click="deleteJob(job.id)">Delete</a></li>
              </ul>
            </div>
          </div>

          <!-- Job Stats -->
          <div class="row g-3 mb-3">
            <div class="col-4">
              <div class="text-center">
                <h6 class="mb-1 fw-bold text-primary">{{ job.applicants }}</h6>
                <small class="text-muted">Applicants</small>
              </div>
            </div>
            <div class="col-4">
              <div class="text-center">
                <h6 class="mb-1 fw-bold text-success">{{ job.views }}</h6>
                <small class="text-muted">Views</small>
              </div>
            </div>
            <div class="col-4">
              <div class="text-center">
                <h6 class="mb-1 fw-bold text-warning">{{ job.shortlisted || 0 }}</h6>
                <small class="text-muted">Shortlisted</small>
              </div>
            </div>
          </div>

          <!-- Job Description Preview -->
          <p class="text-muted small mb-3">{{ job.description.substring(0, 120) }}...</p>

          <!-- Job Footer -->
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-muted">Posted {{ job.postedDate }}</small>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary" @click="viewApplicants(job.id)">
                <i class="bi bi-people me-1"></i>{{ job.applicants }} Applicants
              </button>
              <button class="btn btn-sm btn-primary" @click="viewJob(job.id)">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div v-if="filteredJobs.length === 0" class="text-center py-5">
    <i class="bi bi-briefcase text-muted" style="font-size: 4rem;"></i>
    <h4 class="mt-3 mb-2">No jobs found</h4>
    <p class="text-muted mb-4">{{ searchQuery ? 'Try adjusting your search criteria' : 'Get started by posting your first job' }}</p>
    <button class="btn btn-primary" @click="postNewJob" v-if="!searchQuery">
      <i class="bi bi-plus me-2"></i>Post Your First Job
    </button>
  </div>

  <!-- Pagination -->
  <div class="d-flex justify-content-center mt-4" v-if="filteredJobs.length > 0">
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navigate = inject('navigate')

const searchQuery = ref('')
const statusFilter = ref('')
const departmentFilter = ref('')
const typeFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(6)

const jobs = ref([
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    status: 'Active',
    applicants: 24,
    views: 1250,
    shortlisted: 8,
    postedDate: '2 weeks ago',
    description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features, ensuring the technical feasibility of UI/UX designs, and optimizing applications for maximum speed and scalability.'
  },
  {
    id: 2,
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-Time',
    status: 'Active',
    applicants: 18,
    views: 890,
    shortlisted: 6,
    postedDate: '1 week ago',
    description: 'Join our design team as a UX Designer and help create intuitive and engaging user experiences. You will work closely with product managers and developers to design user-centered solutions.'
  },
  {
    id: 3,
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-Time',
    status: 'Active',
    applicants: 15,
    views: 756,
    shortlisted: 5,
    postedDate: '3 days ago',
    description: 'We need a skilled Backend Developer to build and maintain our server-side applications. You will work with databases, APIs, and cloud services to ensure our platform runs smoothly.'
  },
  {
    id: 4,
    title: 'Product Manager',
    department: 'Product',
    location: 'Austin, TX',
    type: 'Full-Time',
    status: 'Paused',
    applicants: 12,
    views: 623,
    shortlisted: 4,
    postedDate: '1 month ago',
    description: 'Lead product strategy and development as our Product Manager. You will define product roadmaps, work with cross-functional teams, and drive product success from conception to launch.'
  },
  {
    id: 5,
    title: 'Marketing Intern',
    department: 'Marketing',
    location: 'Remote',
    type: 'Internship',
    status: 'Active',
    applicants: 8,
    views: 445,
    shortlisted: 3,
    postedDate: '5 days ago',
    description: 'Join our marketing team as an intern and gain hands-on experience in digital marketing, content creation, and campaign management. Perfect opportunity for students and recent graduates.'
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Seattle, WA',
    type: 'Contract',
    status: 'Draft',
    applicants: 0,
    views: 0,
    shortlisted: 0,
    postedDate: 'Draft',
    description: 'We are seeking a DevOps Engineer to help us scale our infrastructure and improve our deployment processes. You will work with cloud platforms, CI/CD pipelines, and monitoring tools.'
  }
])

const filteredJobs = computed(() => {
  let filtered = jobs.value

  if (searchQuery.value) {
    filtered = filtered.filter(job => 
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(job => job.status === statusFilter.value)
  }

  if (departmentFilter.value) {
    filtered = filtered.filter(job => job.department === departmentFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(job => job.type === typeFilter.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredJobs.value.length / itemsPerPage.value))

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-success-subtle text-success border border-success px-2 py-1'
    case 'Paused':
      return 'bg-warning-subtle text-warning border border-warning px-2 py-1'
    case 'Draft':
      return 'bg-secondary-subtle text-secondary border border-secondary px-2 py-1'
    case 'Closed':
      return 'bg-danger-subtle text-danger border border-danger px-2 py-1'
    default:
      return 'bg-secondary-subtle text-secondary border border-secondary px-2 py-1'
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  departmentFilter.value = ''
  typeFilter.value = ''
}

const postNewJob = () => {
  if (navigate) {
    navigate('post-job')
  } else {
    router.push('/company/post-job')
  }
}

const viewJob = (jobId) => {
  if (navigate) {
    navigate('job-details', { id: jobId })
  } else {
    router.push(`/company/job-details/${jobId}`)
  }
}

const editJob = (jobId) => {
  console.log('Edit job:', jobId)
  if (navigate) {
    navigate('post-job', { id: jobId })
  }
}

const duplicateJob = (jobId) => {
  console.log('Duplicate job:', jobId)
}

const viewAnalytics = (jobId) => {
  console.log('View analytics:', jobId)
  if (navigate) {
    navigate('job-analytics', { id: jobId })
  }
}

const pauseJob = (jobId) => {
  console.log('Pause job:', jobId)
  const job = jobs.value.find(j => j.id === jobId)
  if (job) job.status = 'Paused'
}

const activateJob = (jobId) => {
  console.log('Activate job:', jobId)
  const job = jobs.value.find(j => j.id === jobId)
  if (job) job.status = 'Active'
}

const deleteJob = (jobId) => {
  if (confirm('Are you sure you want to delete this job?')) {
    const index = jobs.value.findIndex(j => j.id === jobId)
    if (index !== -1) jobs.value.splice(index, 1)
  }
}

const viewApplicants = (jobId) => {
  if (navigate) {
    navigate('all-applicants', { jobId })
  } else {
    router.push(`/company/all-applicants?job=${jobId}`)
  }
}
</script>

<style scoped>
.search-input {
  padding-left: 2.5rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

.search-input:focus {
  background-color: white;
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.search-icon {
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 0.875rem;
  z-index: 5;
}

.job-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.job-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.page-link {
  color: #6366f1;
  border-color: #e2e8f0;
}

.page-link:hover {
  color: #4f46e5;
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.page-item.active .page-link {
  background-color: #6366f1;
  border-color: #6366f1;
}
</style>
