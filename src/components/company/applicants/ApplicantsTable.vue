<template>
<div class="applicants-table">
  <!-- Header Section -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="mb-0 fw-bold">All Applicants</h2>
    
    <div class="d-flex align-items-center gap-3">
      <!-- Search Bar -->
      <div class="position-relative search-container">
        <i class="bi bi-search position-absolute search-icon"></i>
        <input 
          type="text" 
          class="form-control search-input" 
          placeholder="Search Applicants"
          v-model="searchQuery"
        >
      </div>
      
      <!-- Filter Button -->
      <button class="btn btn-outline-secondary d-flex align-items-center" @click="toggleFilters">
        <i class="bi bi-funnel me-2"></i>Filter
      </button>
      
      <!-- View Toggle -->
      <div class="btn-group" role="group">
        <button 
          type="button" 
          class="btn"
          :class="viewMode === 'pipeline' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="$emit('switchView', 'pipeline')"
        >
          Pipeline View
        </button>
        <button 
          type="button" 
          class="btn"
          :class="viewMode === 'table' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="$emit('switchView', 'table')"
        >
          Table View
        </button>
      </div>
    </div>
  </div>

  <!-- Applicants Table -->
  <div class="card border-0 shadow-sm">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th class="border-0 fw-medium text-muted">
              <input type="checkbox" class="form-check-input" @change="selectAll">
            </th>
            <th class="border-0 fw-medium text-muted">Full Name</th>
            <th class="border-0 fw-medium text-muted">Email</th>
            <th class="border-0 fw-medium text-muted">Job Title</th>
            <th class="border-0 fw-medium text-muted">Stage</th>
            <th class="border-0 fw-medium text-muted">Applied Date</th>
            <th class="border-0 fw-medium text-muted">Score</th>
            <th class="border-0 fw-medium text-muted">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="applicant in filteredApplicants" :key="applicant.id" class="align-middle">
            <td>
              <input type="checkbox" class="form-check-input" v-model="selectedApplicants" :value="applicant.id">
            </td>
            <td>
              <div class="d-flex align-items-center">
                <AvatarWithFallback
                  :src="applicant.avatar"
                  :name="applicant.name || 'User'"
                  :alt="applicant.name"
                  size="sm"
                  :circle="true"
                  class="me-3"
                />
                <div>
                  <div class="fw-medium">{{ applicant.name }}</div>
                  <small class="text-muted">{{ applicant.location }}</small>
                </div>
              </div>
            </td>
            <td class="text-muted">{{ applicant.email }}</td>
            <td>
              <div>
                <div class="fw-medium">{{ applicant.jobTitle }}</div>
                <small class="text-muted">{{ applicant.department }}</small>
              </div>
            </td>
            <td>
              <span class="badge px-3 py-2" :class="getStageClass(applicant.stage)">
                {{ applicant.stage }}
              </span>
            </td>
            <td class="text-muted">{{ applicant.appliedDate }}</td>
            <td>
              <div class="d-flex align-items-center">
                <i class="bi bi-star-fill text-warning me-1"></i>
                <span class="fw-medium">{{ applicant.score }}</span>
              </div>
            </td>
            <td>
              <div class="dropdown">
                <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                  Actions
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item" @click="viewProfile(applicant.id)">
                      View Profile
                    </button>
                  </li>
                  <li><a class="dropdown-item" href="#" @click="scheduleInterview(applicant.id)">Schedule Interview</a></li>
                  <li><a class="dropdown-item" href="#" @click="moveToShortlist(applicant.id)">Move to Shortlist</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-danger" href="#" @click="rejectApplicant(applicant.id)">Reject</a></li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
      <div class="text-muted small">
        Showing {{ Math.min((currentPage - 1) * itemsPerPage + 1, totalApplicants) }} to {{ Math.min(currentPage * itemsPerPage, totalApplicants) }} of {{ totalApplicants }} results
      </div>
      <nav>
        <ul class="pagination pagination-sm mb-0">
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
</div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import AvatarWithFallback from '../../common/AvatarWithFallback.vue'

defineEmits(['switchView'])

const viewApplicantDetails = inject('viewApplicantDetails')
const searchQuery = ref('')
const selectedApplicants = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const viewMode = ref('table')

const applicants = ref([
  {
    id: 1,
    name: 'Jake Gyll',
    email: 'jake.gyll@email.com',
    location: 'New York, USA',
    jobTitle: 'Senior Frontend Developer',
    department: 'Engineering',
    stage: 'In Review',
    appliedDate: '13 July, 2021',
    score: '4.0',
    avatar: '/placeholder.svg?height=40&width=40&query=professional+man+jake'
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    email: 'jenny.wilson@email.com',
    location: 'San Francisco, CA',
    jobTitle: 'UX Designer',
    department: 'Design',
    stage: 'Shortlisted',
    appliedDate: '12 July, 2021',
    score: '4.2',
    avatar: '/placeholder.svg?height=40&width=40&query=professional+woman+jenny'
  },
  {
    id: 3,
    name: 'Jacob Jones',
    email: 'jacob.jones@email.com',
    location: 'Austin, TX',
    jobTitle: 'Backend Developer',
    department: 'Engineering',
    stage: 'Interview',
    appliedDate: '11 July, 2021',
    score: '3.8',
    avatar: '/placeholder.svg?height=40&width=40&query=professional+man+jacob'
  },
  {
    id: 4,
    name: 'Wade Warren',
    email: 'wade.warren@email.com',
    location: 'Seattle, WA',
    jobTitle: 'Product Manager',
    department: 'Product',
    stage: 'Hired',
    appliedDate: '10 July, 2021',
    score: '4.5',
    avatar: '/placeholder.svg?height=40&width=40&query=professional+man+wade'
  },
  {
    id: 5,
    name: 'Jane Cooper',
    email: 'jane.cooper@email.com',
    location: 'Boston, MA',
    jobTitle: 'Marketing Manager',
    department: 'Marketing',
    stage: 'In Review',
    appliedDate: '09 July, 2021',
    score: '3.9',
    avatar: '/placeholder.svg?height=40&width=40&query=professional+woman+jane'
  }
])

const filteredApplicants = computed(() => {
  if (!searchQuery.value) return applicants.value

  return applicants.value.filter(applicant => 
    applicant.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    applicant.jobTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalApplicants = computed(() => filteredApplicants.value.length)
const totalPages = computed(() => Math.ceil(totalApplicants.value / itemsPerPage.value))

const toggleFilters = () => {
  console.log('Toggle filters')
}

const getStageClass = (stage) => {
  switch (stage) {
    case 'In Review':
      return 'bg-warning-subtle text-warning border border-warning'
    case 'Shortlisted':
      return 'bg-primary-subtle text-primary border border-primary'
    case 'Interview':
      return 'bg-info-subtle text-info border border-info'
    case 'Hired':
      return 'bg-success-subtle text-success border border-success'
    default:
      return 'bg-secondary-subtle text-secondary border border-secondary'
  }
}

const selectAll = (event) => {
  if (event.target.checked) {
    selectedApplicants.value = applicants.value.map(a => a.id)
  } else {
    selectedApplicants.value = []
  }
}

const viewProfile = (applicantId) => {
  console.log('Viewing profile for applicant:', applicantId)
  if (viewApplicantDetails) {
    viewApplicantDetails(applicantId)
  }
}

const scheduleInterview = (applicantId) => {
  console.log('Schedule interview for:', applicantId)
}

const moveToShortlist = (applicantId) => {
  console.log('Move to shortlist:', applicantId)
}

const rejectApplicant = (applicantId) => {
  console.log('Reject applicant:', applicantId)
}
</script>

<style scoped>
.search-container {
  width: 300px;
}

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

.applicant-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.table th {
  font-weight: 500;
  color: #64748b;
  font-size: 0.875rem;
  padding: 1rem 0.75rem;
}

.table td {
  padding: 1rem 0.75rem;
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: #f8fafc;
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

.dropdown-item {
  text-decoration: none;
}
</style>
